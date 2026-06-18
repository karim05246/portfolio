import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Blocks, Cpu, Database } from 'lucide-react';
import { Github } from '../components/SocialIcons';
import './Pages.css';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } }
  };

  const featuredProjects = [
    {
      id: 'tacosta',
      title: 'Tacosta Coffee Menu',
      desc: 'Elegant digital menu website with responsive design and smooth user experience for a coffee shop.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      github: 'https://github.com/karim05246/tacosta',
      demo: 'https://tacosta.vercel.app',
      icon: <Blocks size={18} />
    },
    {
      id: 'promanage',
      title: 'ProManage',
      desc: 'Project management platform helping teams organize tasks and improve productivity.',
      tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'MERN Stack'],
      github: 'https://github.com/karim05246/promanage-frontend',
      demo: 'https://demo.com',
      icon: <Cpu size={18} />
    },
    {
      id: 'fripini',
      title: 'Fripini.tn',
      desc: 'Second-hand clothing marketplace with modern UI and optimized shopping experience.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
      github: 'https://github.com/karim05246/fripini.tn',
      demo: 'https://demo.com',
      icon: <Database size={18} />
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="code-block"
    >
      {/* File Header */}
      <div className="code-file-header">
        <span className="com">#!/bin/bash</span><br />
        <span className="com"># Executing home.sh ... System startup complete.</span>
      </div>

      {/* Terminal Command Output */}
      <div className="terminal-command-wrap">
        <span className="prompt-prefix">visitor@karim-elbourai:~$</span> <span className="var">./init_portfolio.sh</span>
      </div>

      {/* Main Intro Info */}
      <motion.section variants={itemVariants} className="code-hero-intro beautiful-glass" style={{ padding: '40px', borderRadius: '16px', marginTop: '24px' }}>
        <h1 className="code-hero-name">
          <span className="kw">const</span> <span className="ent">developer</span> = <span className="str glow-text">"Karim Elbourai"</span>;
        </h1>

        <div className="code-console-log">
          <span className="com">// Role: Full Stack Developer | Business Information Systems Student</span><br />
          <span className="com">// Focus: Clean code, performance & exceptional user experiences</span>
        </div>

        <p className="code-hero-tagline" style={{ color: 'var(--text-light)', marginTop: '20px' }}>
          Building <span className="ent glow-text">modern</span>, scalable, and user-friendly web applications.
        </p>

        <div className="code-hero-actions">
          <Link to="/projects" className="ide-btn btn-accent">
            <span>cat projects.json</span>
            <ArrowRight size={14} />
          </Link>
          <Link to="/contact" className="ide-btn btn-muted">
            <span>./contact.sh</span>
          </Link>
        </div>
      </motion.section>

      {/* Featured Section */}
      <motion.section variants={itemVariants} style={{ marginTop: '48px' }}>
        <div className="code-section-header">
          <span className="com"># query --select=featured --limit=3</span><br />
          <span className="kw">const</span> <span className="ent">featuredSystems</span> = [
        </div>

        <div className="code-projects-grid">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -4, borderColor: 'var(--syntax-accent)' }}
              className="code-project-card"
            >
              <div className="code-card-header">
                <span className="ent">{project.title}</span>
                <div className="code-card-actions">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="code-link-btn" title="Github Code">
                    <Github size={16} />
                  </a>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="code-link-btn" title="Live Site">
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              <p className="code-card-desc"><span className="com">// {project.desc}</span></p>

              <div className="code-card-tags">
                <span className="kw">tech:</span> [
                {project.tech.map((tag, idx) => (
                  <span key={tag} className="str">
                    "{tag}"{idx < project.tech.length - 1 ? ', ' : ''}
                  </span>
                ))}
                ]
              </div>
            </motion.div>
          ))}
        </div>

        <div className="code-section-footer">
          ];
        </div>
      </motion.section>
    </motion.div>
  );
}
