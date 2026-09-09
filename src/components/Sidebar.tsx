import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ViewType, CaseStudy } from '../types';

interface SidebarProps {
  activeView: ViewType;
  currentCaseStudy?: CaseStudy | null;
  onNavigate: (view: ViewType) => void;
  onOpenResume?: () => void;
}

function getJakartaTimeString(): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(new Date());
  } catch {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const jkt = new Date(utc + 3600000 * 7);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(jkt.getHours())}:${pad(jkt.getMinutes())}:${pad(jkt.getSeconds())}`;
  }
}

export default function Sidebar({
  activeView,
  currentCaseStudy,
  onNavigate,
  onOpenResume
}: SidebarProps) {
  const [copied, setCopied] = useState(false);
  const [timeString, setTimeString] = useState<string>(() => getJakartaTimeString());
  const isCaseStudy = Boolean(currentCaseStudy);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeString(getJakartaTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@aldoabieza.com');
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.aside
      className="sidebar"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="sidebar__top">
        {!isCaseStudy ? (
          <>
            <div className="sidebar__brand">
              <button
                onClick={() => onNavigate('intro')}
                className="sidebar__logo"
                aria-label="Go to Aldo Abieza home"
              >
                Aldo Abieza
              </button>
              <div className="sidebar__timezone" aria-label="Current Jakarta Time">
                Jakarta; {timeString} GMT+7
              </div>
            </div>

            <nav className="sidebar__nav" aria-label="Main Navigation">
              <button
                onClick={() => onNavigate('intro')}
                className={activeView === 'intro' ? 'is-active' : ''}
              >
                Intro
              </button>
              <button
                onClick={() => onNavigate('work')}
                className={activeView === 'work' ? 'is-active' : ''}
              >
                Work
              </button>
              <button
                onClick={() => onNavigate('experiment')}
                className={activeView === 'experiment' ? 'is-active' : ''}
              >
                Experiment
              </button>
              <button
                onClick={() => onNavigate('experience')}
                className={activeView === 'experience' ? 'is-active' : ''}
              >
                Experience
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className={activeView === 'contact' ? 'is-active' : ''}
              >
                Contact
              </button>
            </nav>
          </>
        ) : (
          <div className="sidebar__case-nav">
            <button
              onClick={() => onNavigate('work')}
              className="sidebar__back"
            >
              ← Back to work
            </button>
          </div>
        )}
      </div>

      <div className="sidebar__bottom">
        {!isCaseStudy ? (
          <>
            <button
              onClick={() => {
                if (onOpenResume) {
                  onOpenResume();
                }
              }}
              className="btn btn--primary"
              title="Download Aldo Abieza CV"
            >
              <span className="btn__label">Download Resume</span>
              <span className="btn__icon">
                <span className="btn__icon-viewport">
                  <span className="btn__icon-roll">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M 12 2 C 17.523 2 22 6.477 22 12 C 22 17.523 17.523 22 12 22 C 6.477 22 2 17.523 2 12 C 2 6.477 6.477 2 12 2 Z" />
                      <path d="M 8 12 L 12 16 L 16 12" />
                      <path d="M 12 8 L 12 16" />
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M 12 2 C 17.523 2 22 6.477 22 12 C 22 17.523 17.523 22 12 22 C 6.477 22 2 17.523 2 12 C 2 6.477 6.477 2 12 2 Z" />
                      <path d="M 8 12 L 12 16 L 16 12" />
                      <path d="M 12 8 L 12 16" />
                    </svg>
                  </span>
                </span>
              </span>
            </button>

            <button
              onClick={handleCopyEmail}
              className={`btn btn--ghost btn--copy ${copied ? 'is-copied' : ''}`}
              aria-label="Copy email to clipboard"
            >
              <span className="btn__label">{copied ? 'Copied' : 'Copy Email'}</span>
              <span className="btn__icon">
                <span className="btn__icon-default">
                  <span className="btn__icon-viewport">
                    <span className="btn__icon-roll">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    </span>
                  </span>
                </span>
                <span className="btn__icon-check">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              </span>
            </button>
          </>
        ) : (
          currentCaseStudy && (
            <div className="sidebar__case-meta">
              <div className="case__meta-item">
                <p className="case__meta-label">Client</p>
                <p className="case__meta-value">{currentCaseStudy.client}</p>
              </div>
              <div className="case__meta-item">
                <p className="case__meta-label">Role</p>
                <p className="case__meta-value">{currentCaseStudy.role}</p>
              </div>
              <div className="case__meta-item">
                <p className="case__meta-label">Year</p>
                <p className="case__meta-value">{currentCaseStudy.year}</p>
              </div>
              <div className="case__meta-item">
                <p className="case__meta-label">Timeline</p>
                <p className="case__meta-value">{currentCaseStudy.timeline}</p>
              </div>
            </div>
          )
        )}
      </div>
    </motion.aside>
  );
}
