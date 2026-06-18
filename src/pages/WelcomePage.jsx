import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Cpu, Database, Sparkles } from 'lucide-react';

export default function WelcomePage() {
  // Animation variants for floating background icons
  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container page-container"
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '75vh', position: 'relative', overflow: 'hidden' }}
    >
      {/* Decorative background glows */}
      <div style={{ position: 'absolute', top: '10%', left: '20%', width: '300px', height: '300px', background: 'var(--accent-purple)', filter: 'blur(120px)', opacity: 0.15, borderRadius: '50%', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: '300px', height: '300px', background: 'var(--accent-cyan)', filter: 'blur(120px)', opacity: 0.15, borderRadius: '50%', zIndex: 0 }} />

      {/* Floating background icons */}
      <motion.div variants={floatVariants} animate="animate" style={{ position: 'absolute', top: '15%', right: '15%', color: 'var(--accent-cyan)', opacity: 0.2, zIndex: 0 }}>
        <Code size={48} />
      </motion.div>
      <motion.div variants={floatVariants} animate="animate" style={{ position: 'absolute', bottom: '25%', left: '15%', color: 'var(--accent-purple)', opacity: 0.2, zIndex: 0 }}>
        <Database size={64} />
      </motion.div>
      <motion.div variants={floatVariants} animate="animate" style={{ position: 'absolute', top: '40%', left: '10%', color: 'var(--text-light)', opacity: 0.1, zIndex: 0 }}>
        <Cpu size={56} />
      </motion.div>

      {/* Main Content Card */}
      <div className="welcome-content beautiful-glass" style={{ padding: '80px 60px', borderRadius: '24px', textAlign: 'center', maxWidth: '700px', width: '100%', zIndex: 1, position: 'relative', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          className="welcome-icon-container"
          style={{ width: '90px', height: '90px', margin: '0 auto 32px auto', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(6, 182, 212, 0.3)', boxShadow: '0 0 30px rgba(6, 182, 212, 0.2)' }}
        >
          <Sparkles size={40} style={{ color: 'var(--accent-cyan)' }} />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="welcome-title glow-text"
          style={{ fontSize: '4rem', marginBottom: '16px', letterSpacing: '-1px', lineHeight: '1.1' }}
        >
          Welcome to my world
        </motion.h1>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: "circOut" }}
          className="welcome-divider"
          style={{ width: '120px', height: '4px', background: 'linear-gradient(90deg, transparent, var(--accent-cyan), var(--accent-purple), transparent)', margin: '24px auto', borderRadius: '4px' }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="welcome-subtitle"
          style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto' }}
        >
          System successfully initialized. Explore my digital portfolio by selecting a file from the explorer on the left.
        </motion.p>
      </div>
    </motion.div>
  );
}
