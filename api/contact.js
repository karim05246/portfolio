export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      success: false,
      error: 'Email service is not configured on the server.',
    });
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and message.',
      });
    }

    const receiver = process.env.RECEIVER_EMAIL || 'medkarimelbourai@gmail.com';
    const sender =
      process.env.EMAIL_FROM || 'Portfolio Contact <onboarding@resend.dev>';

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: sender,
        to: [receiver],
        reply_to: email,
        subject: `New contact from ${name} via Portfolio`,
        html: `<p>You have received a new message from your portfolio website.</p>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`,
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error('Resend error:', data);
      return res.status(500).json({
        success: false,
        error: data.message || 'Failed to send email.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully!',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.',
    });
  }
}
