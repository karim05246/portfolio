import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import './Pages.css';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="code-block"
    >
      <div className="code-file-header">
        <span className="com">// Reading file: about.json ... SUCCESS</span>
      </div>

      <div className="terminal-command-wrap">
        <span className="prompt-prefix">visitor@karim-elbourai:~$</span> <span className="var">cat about.json</span>
      </div>

      <motion.div variants={itemVariants} className="json-wrapper beautiful-glass" style={{ padding: '30px', marginTop: '16px' }}>
        <span className="var">&#123;</span>
        
        {/* Profile Details */}
        <div className="json-indent">
          <span className="kw">"profile"</span>: <span className="var">&#123;</span>
          <div className="json-indent">
            <span className="kw">"name"</span>: <span className="str">"Karim Elbourai"</span>,<br />
            <span className="kw">"degree"</span>: <span className="str">"Business Information Systems (BIS) — ISG Gabes"</span>,<br />
            <span className="kw">"focus"</span>: <span className="str">"Designing and developing modern, scalable and user-friendly web applications with clean code and exceptional UX."</span>
          </div>
          <span className="var">&#125;</span>,
        </div>

        {/* Skills Stack */}
        <div className="json-indent">
          <span className="kw">"technicalStack"</span>: <span className="var">&#123;</span>
          <div className="json-indent">
            <span className="kw">"frontend"</span>: <span className="var">[</span>
            <span className="str">"React.js"</span>, <span className="str">"Next.js"</span>, <span className="str">"TypeScript"</span>, <span className="str">"Tailwind CSS"</span>, <span className="str">"Bootstrap"</span>
            <span className="var">]</span>,<br />
            
            <span className="kw">"backend"</span>: <span className="var">[</span>
            <span className="str">"PHP / Laravel"</span>, <span className="str">"Node.js (Express)"</span>, <span className="str">"REST APIs"</span>, <span className="str">"JWT Auth"</span>
            <span className="var">]</span>,<br />
            
            <span className="kw">"databases"</span>: <span className="var">[</span>
            <span className="str">"MySQL"</span>, <span className="str">"PostgreSQL"</span>, <span className="str">"MongoDB"</span>, <span className="str">"Firebase"</span>
            <span className="var">]</span>,<br />
            
            <span className="kw">"tools"</span>: <span className="var">[</span>
            <span className="str">"Git & GitHub"</span>, <span className="str">"Docker"</span>, <span className="str">"Vercel"</span>, <span className="str">"Postman"</span>
            <span className="var">]</span>
          </div>
          <span className="var">&#125;</span>,
        </div>

        {/* Consulting / Soft Skills */}
        <div className="json-indent">
          <span className="kw">"methodologies"</span>: <span className="var">[</span>
          <div className="json-indent">
            <span className="str">"OOP & MVC Architecture (clean, maintainable codebases)"</span>,<br />
            <span className="str">"Responsive Design (mobile-first, cross-browser compatibility)"</span>,<br />
            <span className="str">"Agile Methodology (iterative development and fast delivery)"</span>
          </div>
          <span className="var">]</span>
        </div>

        <span className="var">&#125;</span>
      </motion.div>

      {/* Visual representation of stack tags underneath code block */}
      <motion.div variants={itemVariants} className="about-visual-overlay beautiful-glass" style={{ padding: '24px', marginTop: '24px' }}>
        <span className="com" style={{ display: 'block', marginBottom: '16px' }}># Rendering quick visual tags:</span>
        <div className="about-tags-row">
          <span className="visual-badge">React.js</span>
          <span className="visual-badge">Next.js</span>
          <span className="visual-badge">Laravel</span>
          <span className="visual-badge">Node.js</span>
          <span className="visual-badge">MySQL</span>
          <span className="visual-badge">TypeScript</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
