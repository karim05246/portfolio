import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Sparkles, CheckCircle } from 'lucide-react';
import { Github, Linkedin } from '../components/SocialIcons';
import './Pages.css';

const API_BASE =
  import.meta.env.VITE_API_URL || 'https://portfolio-backend-2-7hvn.onrender.com';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', msg: 'Please check that all fields are filled out.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', msg: '' });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    try {
      await fetch(`${API_BASE}/api/health`, { signal: controller.signal }).catch(() => {});

      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus({ type: 'success', msg: 'Message received! I will get back to you shortly.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          msg: data.error || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      const msg =
        error.name === 'AbortError'
          ? 'Request timed out. The server may be waking up — please try again.'
          : error.message === 'Failed to fetch'
          ? 'Could not connect to server. Please try again later.'
          : 'Something went wrong. Please try again.';

      setStatus({ type: 'error', msg });
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container page-container"
    >
      <div className="section-title-wrap">
        <span className="section-tagline">Launch Sockets</span>
        <h2 className="section-title">Let's Build Something Amazing</h2>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <h3 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Get In Touch</h3>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
            Have a project in mind, need a freelance developer, or looking for a full-stack intern? Send a message and let's start collaborating.
          </p>

          <div className="contact-cards-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="contact-card-wrap glass-panel">
              <div className="contact-icon-box">
                <Mail size={20} />
              </div>
              <div className="contact-details">
                <h4>Direct Email</h4>
                <p><a href="mailto:medkarimelbourai@gmail.com" className="gradient-text">medkarimelbourai@gmail.com</a></p>
              </div>
            </div>

            <div className="contact-card-wrap glass-panel">
              <div className="contact-icon-box" style={{ color: 'var(--accent-purple)', background: 'rgba(139, 92, 246, 0.1)' }}>
                <Linkedin size={20} />
              </div>
              <div className="contact-details">
                <h4>LinkedIn Network</h4>
                <p><a href="https://www.linkedin.com/in/mohamed-karim-elborai-52b49429a/" target="_blank" rel="noopener noreferrer">linkedin.com/in/karim-elbourai</a></p>
              </div>
            </div>

            <div className="contact-card-wrap glass-panel">
              <div className="contact-icon-box" style={{ color: '#ffffff', background: 'rgba(255,255,255,0.05)' }}>
                <Github size={20} />
              </div>
              <div className="contact-details">
                <h4>Open Source Core</h4>
                <p><a href="https://github.com" target="_blank" rel="noopener noreferrer">github.com/karim-elbourai</a></p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="contact-form-card glass-panel">
          <AnimatePresence mode="wait">
            {status.type === 'success' ? (
              <motion.div
                key="success-msg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="contact-success-state"
                style={{ textAlign: 'center', padding: '2rem 1rem' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10, delay: 0.1 }}
                  style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--accent-cyan)' }}
                >
                  <CheckCircle size={64} />
                </motion.div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-light)' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setStatus({ type: '', msg: '' })}
                  className="btn btn-primary"
                  style={{ margin: '0 auto' }}
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="contact-form"
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="form-input"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Socket</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. name@domain.com"
                    className="form-input"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Payload Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Brief summary of project requirements or request..."
                    className="form-input"
                    required
                    disabled={loading}
                  />
                </div>

                {status.type === 'error' && status.msg && (
                  <div className={`form-status ${status.type}`}>
                    {status.msg}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ justifyContent: 'center', width: '100%', gap: '10px' }}
                  disabled={loading}
                >
                  {loading ? (
                    <span>Transmitting Data...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
