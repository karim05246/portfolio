import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, X, Eye, HelpCircle } from 'lucide-react';
import './Terminal.css';

// Native Synthesizer to create retro terminal sounds without asset file dependencies
const playTerminalSound = (type = 'click') => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'click') {
      // Vintage mechanical key sound
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'enter') {
      // Modulated retro console notification
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === 'error') {
      // Error buzz
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch (e) {
    // Audio context not allowed or supported
  }
};

export default function Terminal({ setTerminalMode }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { text: '==================================================', type: 'system' },
    { text: '   KARIM ELBOURAI // CORE TERMINAL DEPLOYMENT v2.0.26', type: 'system' },
    { text: '   SYSTEM LOG: ACTIVE DEVELOPER SHELL ENABLED', type: 'system' },
    { text: '==================================================', type: 'system' },
    { text: 'Type "help" to see available commands.', type: 'info' },
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus terminal input automatically on mount
    inputRef.current?.focus();
    // Scroll to bottom on updates
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    playTerminalSound('click');

    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIndex = historyIndex + 1;
      if (newIndex < cmdHistory.length) {
        setHistoryIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      if (newIndex >= 0) {
        setHistoryIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-complete suggestion
      const commands = ['help', 'about', 'skills', 'experience', 'projects', 'services', 'contact', 'clear', 'gui'];
      const matches = commands.filter(c => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  const executeCommand = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const cmd = trimmedInput.toLowerCase();
    const newHistory = [...history, { text: `visitor@karim-elbourai:~$ ${trimmedInput}`, type: 'prompt' }];
    const newCmdHistory = [...cmdHistory, trimmedInput];

    setCmdHistory(newCmdHistory);
    setHistoryIndex(-1);
    setInput('');

    playTerminalSound('enter');

    switch (cmd) {
      case 'help':
        newHistory.push({
          text: `
Available commands:
  about      - Background & Biography
  skills     - Technical core stack layout
  experience - Work experience & internships
  projects   - View my portfolio projects
  services   - Client services & offerings
  contact    - Get in touch with me
  clear      - Clear console screen buffer
  gui        - Exit CLI and return to Visual Mode
          `,
          type: 'info'
        });
        break;

      case 'about':
        newHistory.push({
          text: `
[BIOGRAPHY - KARIM ELBOURAI]
I am a Business Information Systems student at ISG Gabes & Full Stack Developer.
I enjoy designing and developing modern, scalable and user-friendly web applications.
Combining technical competency (React, Next.js, Laravel, Node.js) with clean code and performance.

- CURRENT: Freelance Full Stack Developer
- FOCUS: Web Applications, E-Commerce, UI/UX Design
- LOCATION: Gabes, Tunisia
          `,
          type: 'text'
        });
        break;

      case 'skills':
        newHistory.push({
          text: `
[CORE COMPETENCIES]
React / Next.js    [========================] 95%
HTML/CSS/JS        [========================] 95%
PHP / Laravel      [======================] 90%
Node.js / Express  [====================] 85%
MySQL / MongoDB    [======================] 90%
TypeScript         [====================] 80%
          `,
          type: 'text'
        });
        break;

      case 'experience':
        newHistory.push({
          text: `
[WORK EXPERIENCE]
- Freelance Web Developer (Current)
  Building modern web applications, UI/UX design, and custom digital solutions.

- BeeCoders - Summer Internship
  Developed full-stack features, optimized application performance, and improved system reliability.
          `,
          type: 'text'
        });
        break;

      case 'projects':
        newHistory.push({
          text: `
[SHIPPED PLATFORMS]
1. Tacosta Coffee Menu
   - Tech: HTML5, CSS3, JavaScript, Bootstrap
   - Info: Elegant digital menu website with responsive design and smooth UX.

2. ProManage
   - Tech: React, Node.js, Express.js, MongoDB, MERN Stack
   - Info: Project management platform helping teams organize tasks and improve productivity.

3. Fripini.tn
   - Tech: HTML5, CSS3, JavaScript, Bootstrap, PHP, MySQL
   - Info: Second-hand clothing marketplace with modern UI and optimized shopping experience.
          `,
          type: 'text'
        });
        break;

      case 'services':
        newHistory.push({
          text: `
[SERVICES RENDERED]
- Full-Stack Web Development: Building modern React/Next.js/Laravel applications.
- E-Commerce & Business Sites: Professional websites and online stores.
- API & Backend Engineering: Secure REST APIs with Node.js, Express, and Laravel.
- UI/UX Design: Stunning, responsive interfaces with smooth animations.
          `,
          type: 'text'
        });
        break;

      case 'contact':
        newHistory.push({
          text: `
[COMMUNICATION SOCKETS]
- Email: medkarimelbourai@gmail.com
- Phone: +216 25 341 423
- Location: Gabes, Tunisia
- Status: Open for freelance projects, internships & international opportunities.
          `,
          type: 'info'
        });
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'gui':
      case 'exit':
      case 'visual':
        newHistory.push({ text: 'Closing terminal connection...', type: 'system' });
        setTerminalMode(false);
        break;

      default:
        playTerminalSound('error');
        newHistory.push({ text: `bash: command not found: ${trimmedInput}. Type "help" for a list of commands.`, type: 'error' });
    }

    setHistory(newHistory);
  };

  return (
    <div className="terminal-overlay" onClick={handleTerminalClick}>
      <div className="terminal-window glass-panel">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red" onClick={() => setTerminalMode(false)}></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="terminal-title">
            <TerminalIcon size={14} className="terminal-title-icon" />
            <span>karim@elbourai-terminal:~ (bash)</span>
          </div>
          <button className="terminal-gui-btn" onClick={() => setTerminalMode(false)}>
            <Eye size={12} />
            <span>Visual Mode</span>
          </button>
        </div>

        <div className="terminal-body">
          <div className="terminal-log">
            {history.map((log, index) => (
              <div key={index} className={`log-line ${log.type}`}>
                <pre>{log.text}</pre>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          <div className="terminal-input-line">
            <span className="terminal-prompt">visitor@karim-elbourai:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              maxLength="50"
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
