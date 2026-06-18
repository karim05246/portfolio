import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import './Pages.css';

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const timelineItems = [
    {
      id: 1,
      role: 'Freelance Full Stack Developer',
      org: 'Self-Employed',
      period: 'Present',
      type: 'work',
      desc: 'Designing and developing modern, scalable web applications for clients. Building full stack solutions using React, Next.js, Laravel, Node.js, and various databases. Delivering high-quality digital products with focus on clean code and exceptional UX.'
    },
    {
      id: 2,
      role: 'Web Development Intern',
      org: 'BeeCoders',
      period: 'Summer Internship',
      type: 'work',
      desc: 'Worked as a Web Development Intern, gaining hands-on experience in full stack development, collaborating with the team on real-world projects, and improving skills in modern web technologies.'
    },
    {
      id: 3,
      role: "Bachelor's Degree in Business Information Systems (BIS)",
      org: 'Higher Institute of Management of Gabes (ISG Gabes)',
      period: 'Current',
      type: 'education',
      desc: 'Studying Business Information Systems, acquiring knowledge in software engineering, database design, web development, ERP systems, and business technology.'
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="container page-container"
    >
      <div className="section-title-wrap">
        <span className="section-tagline">Track Record</span>
        <h2 className="section-title">Timeline & Milestones</h2>
      </div>

      <div className="timeline-container">
        {/* Vertical Center Line */}
        <div className="timeline-line" />

        {/* Timeline Items */}
        {timelineItems.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            key={item.id}
            className="timeline-item"
          >
            {/* Timeline Dot Indicator */}
            <div className={`timeline-dot ${item.type === 'education' ? 'education' : ''}`}>
              {item.type === 'education' ? (
                <GraduationCap size={10} style={{ color: 'var(--accent-purple)', margin: '1px' }} />
              ) : (
                <Briefcase size={10} style={{ color: 'var(--accent-cyan)', margin: '1px' }} />
              )}
            </div>

            <div className="timeline-card glass-panel">
              <div className="timeline-header">
                <div className="timeline-meta">
                  <h3>{item.role}</h3>
                  <span className="timeline-org">{item.org}</span>
                </div>
                <span className="timeline-period">{item.period}</span>
              </div>
              <div className="timeline-body">
                <p>{item.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
