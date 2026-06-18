import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Blocks, Cpu, Database, Server, Smartphone } from 'lucide-react';
import { Github } from '../components/SocialIcons';
import tacostaImg from '../assets/tacosta.jpeg';
import promanageImg from '../assets/promanage.png';
import fripiniImg from '../assets/fripini.png';
import './Pages.css';

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Web', 'Full Stack', 'E-Commerce'];

  const projectsData = [
    {
      id: 'tacosta',
      title: 'Tacosta Coffee Menu',
      category: 'Web',
      desc: 'Designed and developed an elegant digital menu website with responsive design and smooth user experience for a coffee shop.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      image: tacostaImg,
      github: 'https://github.com/karim05246/tacosta',
      demo: 'https://tacosta.vercel.app',
      icon: <Blocks size={22} />
    },
    {
      id: 'promanage',
      title: 'ProManage',
      category: 'Full Stack',
      desc: 'Developed a project management platform that helps teams organize tasks and improve productivity with intuitive UI.',
      tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'MERN Stack'],
      image: promanageImg,
      github: 'https://github.com/karim05246/promanage-frontend',
      demo: 'https://demo.com',
      icon: <Cpu size={22} />
    },
    {
      id: 'fripini',
      title: 'Fripini.tn',
      category: 'E-Commerce',
      desc: 'Created a second-hand clothing marketplace with modern UI, optimized shopping experience, and full backend integration.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'PHP', 'MySQL'],
      image: fripiniImg,
      github: 'https://github.com/karim05246/fripini.tn',
      demo: 'https://demo.com',
      icon: <Database size={22} />
    }
  ];

  const filteredProjects = filter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === filter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container page-container"
    >
      <div className="section-title-wrap">
        <span className="section-tagline">My Shipments</span>
        <h2 className="section-title">Production-Ready Solutions</h2>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="projects-grid">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              key={project.id}
              whileHover={{ y: -6 }}
              className="project-card glass-panel"
              style={{ padding: '0', borderRadius: '12px' }}
            >
              <div className="project-img-wrapper" style={{ width: '100%', height: filter === 'All' ? '240px' : 'auto', margin: '0', borderBottomLeftRadius: '0', borderBottomRightRadius: '0', overflow: 'hidden', background: filter === 'All' ? 'transparent' : 'rgba(0,0,0,0.2)' }}>
                <img src={project.image} alt={project.title} className="project-img" style={{ width: '100%', height: filter === 'All' ? '100%' : 'auto', maxHeight: '700px', display: 'block', objectFit: filter === 'All' ? 'cover' : 'contain' }} />
              </div>
              <div style={{ padding: '24px' }}>
                <div className="project-header">
                  <div className="service-icon-wrap" style={{ color: index % 2 === 0 ? 'var(--accent-cyan)' : 'var(--accent-purple)', width: '36px', height: '36px' }}>
                    {project.icon}
                  </div>
                  <div className="project-actions" style={{ paddingTop: '0', borderTop: 'none' }}>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-btn" title="Github Repository">
                      <Github size={18} />
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-btn" title="Live Deploy">
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>

                <div className="project-tags">
                  {project.tech.map((tag) => (
                    <span key={tag} className="badge">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
