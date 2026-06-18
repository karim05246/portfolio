import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, Sun, Moon, Menu, X, Sparkles } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ theme, toggleTheme, isTerminalMode, setTerminalMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/services', label: 'Services' },
    { path: '/experience', label: 'Experience' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <Sparkles className="logo-icon" size={22} />
          </motion.div>
          <span className="logo-text">Karim.Dev<span className="logo-dot">()</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links-desktop">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path} className={`nav-link ${isActive ? 'active' : ''}`}>
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="nav-link-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Controls */}
        <div className="navbar-controls">
          <button
            onClick={toggleTheme}
            className="control-btn"
            aria-label="Toggle Theme"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button
            onClick={() => setTerminalMode(true)}
            className="control-btn terminal-toggle-btn pulse-neon"
            aria-label="Developer Mode"
            title="Launch Interactive Terminal"
          >
            <Terminal size={18} />
            <span className="terminal-btn-label">DevMode</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="control-btn mobile-menu-btn"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="navbar-mobile-drawer glass-panel"
        >
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </motion.div>
      )}
    </nav>
  );
}
