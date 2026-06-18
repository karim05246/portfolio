import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Heart } from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import './Footer.css';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Africa/Tunis', // Tunisia time
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat('fr-FR', options);
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer glass-panel">
      <div className="footer-container">
        <div className="footer-branding">
          <span className="footer-logo">Karim.Dev<span className="logo-dot">()</span></span>
          <p className="footer-desc">
            Designing and developing modern, scalable web applications to deliver high-quality digital products.
          </p>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-title">Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/experience">Experience</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-social-group">
          <h4 className="footer-title">Socials</h4>
          <div className="footer-social-icons">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-badge-btn" aria-label="GitHub">
              <Github size={16} />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-badge-btn" aria-label="LinkedIn">
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>
          </div>
          <div className="footer-clock">
            <Clock size={14} className="clock-icon" />
            <span>Gabes, Tunisia: {time}</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copy-text">
          &copy; {new Date().getFullYear()} Karim Elbourai. Crafted with <Heart size={10} className="heart-icon" /> and React.
        </p>
        <span className="badge font-mono">v2.0.26_STABLE</span>
      </div>
    </footer>
  );
}
