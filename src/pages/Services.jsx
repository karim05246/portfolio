import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Server, Shield, Sparkles, CheckCircle } from 'lucide-react';
import './Pages.css';

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  const serviceOffers = [
    {
      title: 'Full-Stack Web Dev',
      desc: 'Building modern, responsive web applications using React, Next.js, Laravel, and Node.js with clean architecture.',
      bullets: ['React / Next.js SPAs', 'PHP / Laravel backends', 'Responsive & mobile-first design', 'REST API development'],
      icon: <Layers size={22} />
    },
    {
      title: 'E-Commerce & Business Sites',
      desc: 'Creating professional business websites, landing pages, and e-commerce platforms with optimized shopping experiences.',
      bullets: ['E-Commerce platforms', 'Portfolio & business websites', 'Landing page design', 'Database-driven applications'],
      icon: <Shield size={22} />
    },
    {
      title: 'API & Backend Engineering',
      desc: 'Developing secure, scalable backend systems with Node.js, Express, Laravel, and database integrations.',
      bullets: ['RESTful API design', 'JWT authentication & authorization', 'MySQL / PostgreSQL / MongoDB', 'API integration & third-party services'],
      icon: <Server size={22} />
    },
    {
      title: 'UI/UX Design',
      desc: 'Designing intuitive, visually stunning user interfaces with focus on user experience and modern design principles.',
      bullets: ['Responsive website design', 'Modern UI components', 'Smooth animations & transitions', 'Cross-browser compatibility'],
      icon: <Sparkles size={22} />
    }
  ];

  const statBadges = [
    { value: '98+', label: 'PageSpeed Score' },
    { value: '< 200ms', label: 'Average Server Latency' },
    { value: '100%', label: 'Production Build Rating' }
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
        <span className="section-tagline">My Offerings</span>
        <h2 className="section-title">Technical Service Options</h2>
      </div>

      {/* Services Grid */}
      <motion.div variants={itemVariants} className="services-grid">
        {serviceOffers.map((service, index) => (
          <div key={index} className="service-card glass-panel">
            <div className="service-icon-wrap" style={{ color: index % 2 === 0 ? 'var(--accent-cyan)' : 'var(--accent-purple)' }}>
              {service.icon}
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.desc}</p>
            <ul className="service-bullets">
              {service.bullets.map((bullet) => (
                <li key={bullet}>
                  <CheckCircle size={14} className="service-check" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>

      {/* ROI / Performance Metrics */}
      <motion.div variants={itemVariants} className="benefits-box glass-panel pulse-neon">
        <h3>Performance Guidelines</h3>
        <p style={{ marginBottom: '30px', fontSize: '1rem' }}>
          I focus on clean code, performance optimization, and delivering high-quality digital products that meet modern web standards.
        </p>
        <div className="benefits-grid">
          {statBadges.map((badge, idx) => (
            <div key={idx} className="benefit-item">
              <span className="benefit-value">{badge.value}</span>
              <span className="benefit-label">{badge.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
