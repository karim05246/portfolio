import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { TerminalIcon, GitBranch, Wifi, AlertCircle, ChevronDown, Folder, FileCode2, FileJson, FileText, Clock, Menu, X } from 'lucide-react';
import './index.css';
import './App.css';
import Terminal from './components/Terminal';
import WelcomeScreen from './components/WelcomeScreen';
import WelcomePage   from './pages/WelcomePage';
import HomePage      from './pages/Home';
import AboutPage     from './pages/About';
import ProjectsPage  from './pages/Projects';
import ServicesPage  from './pages/Services';
import ExperiencePage from './pages/Experience';
import ContactPage   from './pages/Contact';

/* ─── file tree data ─── */
const FILE_TREE = [
  {
    folder: 'portfolio/', icon: <Folder size={15}/>, open: true,
    files: [
      { label: 'welcome.md',     path: '/welcome',    icon: <FileText  size={14}/>, color: '#f1fa8c' },
      { label: 'home.jsx',       path: '/',           icon: <FileCode2 size={14}/>, color: '#61afef' },
      { label: 'about.json',     path: '/about',      icon: <FileJson  size={14}/>, color: '#e5c07b' },
      { label: 'projects.ts',    path: '/projects',   icon: <FileCode2 size={14}/>, color: '#4ec9b0' },
      { label: 'services.ts',    path: '/services',   icon: <FileCode2 size={14}/>, color: '#4ec9b0' },
      { label: 'experience.md',  path: '/experience', icon: <FileText  size={14}/>, color: '#c586c0' },
      { label: 'contact.sh',     path: '/contact',    icon: <FileText  size={14}/>, color: '#f1fa8c' },
    ]
  }
];

/* ─── page tabs state ─── */
const DEFAULT_TABS = [
  { label: 'home.jsx',      path: '/' }
];

function LiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

/* ─── IDE Shell (uses router context) ─── */
function IDEShell({ theme, setTheme, terminalOpen, setTerminalOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [tabs, setTabs] = useState(DEFAULT_TABS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const FILE_MAP = FILE_TREE[0].files;

  const currentFile = FILE_MAP.find(f => f.path === location.pathname) || FILE_MAP[0];

  /* open tab on navigation */
  useEffect(() => {
    const file = FILE_MAP.find(f => f.path === location.pathname);
    if (!file) return;
    setTabs(prev => {
      if (prev.find(t => t.path === file.path)) return prev;
      return [...prev, { label: file.label, path: file.path }];
    });
  }, [location.pathname]);

  const closeTab = (e, path) => {
    e.stopPropagation();
    setTabs(prev => {
      const next = prev.filter(t => t.path !== path);
      if (location.pathname === path && next.length > 0) navigate(next[next.length - 1].path);
      return next;
    });
  };

  const navigateFromExplorer = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };
  /* line numbers — 60 lines covers any page */
  const lineNums = Array.from({ length: 60 }, (_, i) => i + 1);

  return (
    <div className="ide-shell">

      {/* ── Title bar ── */}
      <div className="ide-titlebar">
        <div className="titlebar-dots">
          <span className="dot red"   onClick={() => setTerminalOpen(false)} />
          <span className="dot yellow"/>
          <span className="dot green" onClick={() => setTerminalOpen(true)}/>
        </div>

        <button
          className="mobile-explorer-toggle"
          onClick={() => setSidebarOpen(prev => !prev)}
          aria-label={sidebarOpen ? 'Close explorer' : 'Open explorer'}
          aria-expanded={sidebarOpen}
          aria-controls="portfolio-explorer"
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="titlebar-name" onClick={() => navigateFromExplorer('/welcome')} style={{ cursor: 'pointer' }} title="Go to Welcome Page">
          <span className="acc">portfolio</span>
          <span className="path-sep">/</span>
          <span style={{ color: currentFile?.color || 'var(--text-muted)' }}>{currentFile?.label}</span>
        </div>

        <div className="titlebar-controls">
          <select
            className="theme-select"
            value={theme}
            onChange={e => setTheme(e.target.value)}
            aria-label="Select theme"
          >
            <option value="dracula">Dracula</option>
            <option value="one-dark">One Dark</option>
            <option value="monokai">Monokai</option>
            <option value="nord">Nord</option>
          </select>

          <button className="titlebar-btn" onClick={() => setTerminalOpen(prev => !prev)}>
            <TerminalIcon size={15}/> Terminal
          </button>
        </div>
      </div>

      {/* ── Workspace ── */}
      <div className="ide-workspace">

        {/* ── Sidebar ── */}
        <aside id="portfolio-explorer" className={`ide-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
          <div className="sidebar-header">Explorer</div>
          <div className="explorer-tree">
            {FILE_TREE.map(group => (
              <div key={group.folder}>
                <div className="tree-folder-row" onClick={() => navigateFromExplorer('/welcome')} style={{ cursor: 'pointer' }} title="Go to Welcome Page">
                  <ChevronDown size={14}/> {group.icon} {group.folder}
                </div>
                {group.files.map(file => (
                  <div
                    key={file.path}
                    className={`tree-file-row ${location.pathname === file.path ? 'active' : ''}`}
                    onClick={() => navigateFromExplorer(file.path)}
                  >
                    <span style={{ color: file.color }}>{file.icon}</span>
                    <span>{file.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="sidebar-footer">
            <span className="com">// v2.0.26-stable</span>
          </div>
        </aside>
        {sidebarOpen && <button className="mobile-sidebar-backdrop" aria-label="Close explorer" onClick={() => setSidebarOpen(false)} />}

        {/* ── Editor ── */}
        <div className="ide-editor-panel">

          {/* Tabs */}
          <div className="ide-tabs" role="tablist">
            {tabs.map(tab => {
              const file = FILE_MAP.find(f => f.path === tab.path);
              return (
                <div
                  key={tab.path}
                  role="tab"
                  className={`ide-tab ${location.pathname === tab.path ? 'active' : ''}`}
                  onClick={() => navigate(tab.path)}
                >
                  {file && <span style={{ color: file.color }}>{file.icon}</span>}
                  <span>{tab.label}</span>
                  {tabs.length > 1 && (
                    <span className="tab-close" onClick={e => closeTab(e, tab.path)}>×</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Body: line numbers + content */}
          <div className="editor-body">
            <div className="line-numbers" aria-hidden="true">
              {lineNums.map(n => <span key={n}>{n}</span>)}
            </div>
            <div className="editor-content">
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/welcome"    element={<WelcomePage />} />
                  <Route path="/"           element={<HomePage />} />
                  <Route path="/about"      element={<AboutPage />} />
                  <Route path="/projects"   element={<ProjectsPage />} />
                  <Route path="/services"   element={<ServicesPage />} />
                  <Route path="/experience" element={<ExperiencePage />} />
                  <Route path="/contact"    element={<ContactPage />} />
                </Routes>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* ── Status bar ── */}
      <div className="ide-statusbar">
        <div className="statusbar-left">
          <span className="statusbar-item"><GitBranch size={13}/> main</span>
          <span className="statusbar-item"><AlertCircle size={13}/> 0 errors</span>
        </div>
        <div className="statusbar-right">
          <span className="statusbar-item"><Wifi size={13}/> available for hire</span>
          <span className="statusbar-item"><Clock size={13}/><LiveClock/></span>
          <span className="statusbar-item">UTF-8</span>
          <span className="statusbar-item">JSX</span>
        </div>
      </div>

    </div>
  );
}

/* ─── Root App ─── */
export default function App() {
  const [theme, setTheme] = useState('dracula');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <AnimatePresence>
        {showWelcome && <WelcomeScreen onComplete={() => setShowWelcome(false)} />}
      </AnimatePresence>
      
      {!showWelcome && (
        <>
          <IDEShell
            theme={theme}
            setTheme={setTheme}
            terminalOpen={terminalOpen}
            setTerminalOpen={setTerminalOpen}
          />
          <AnimatePresence>
            {terminalOpen && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <Terminal setTerminalMode={setTerminalOpen} />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </Router>
  );
}

