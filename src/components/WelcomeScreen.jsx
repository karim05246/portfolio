import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';
import './WelcomeScreen.css';

export default function WelcomeScreen({ onComplete }) {
  useEffect(() => {
    // Automatically close the welcome screen after 3 seconds
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="welcome-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="welcome-content">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="welcome-icon-container"
          >
            <Terminal size={48} className="welcome-icon" />
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="welcome-title"
          >
            Welcome to my world
          </motion.h1>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 1, ease: "circOut" }}
            className="welcome-divider"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="welcome-subtitle"
          >
            Initializing Developer Environment...
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
