import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isCaseStudy = Boolean(currentCaseStudy);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeString(getJakartaTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Automatically close collapsible menu on view changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [activeView, currentCaseStudy]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('aldo.abieza30@gmail.com');
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const navItems: { view: ViewType; label: string }[] = [
    { view: 'intro', label: 'Intro' },
    { view: 'work', label: 'Work' },
    { view: 'experiment', label: 'Experiment' },
    { view: 'experience', label: 'Experience' },
    { view: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <motion.aside
        className={`sidebar ${isMenuOpen ? 'is-menu-open' : ''}`}
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top/Navbar Header Row */}
        <div className="sidebar__header-row">
          {/* Ujung Kiri Navbar: Logo + Timezone */}
          <div className="sidebar__brand">
            <button
              onClick={() => {
                onNavigate('intro');
                setIsMenuOpen(false);
              }}
              className="sidebar__logo"
              aria-label="Go to Aldo Abieza home"
            >
              Aldo Abieza
            </button>
            <div className="sidebar__timezone" aria-label="Current Jakarta Time">
              Jakarta; {timeString} GMT+7
            </div>
          </div>

          {/* Ujung Kanan Navbar (Responsive only): Download Button & Hamburger Menu */}
          <div className="sidebar__actions">
            <button
              type="button"
              onClick={() => {
                if (onOpenResume) {
                  onOpenResume();
                }
              }}
              className="btn btn--primary sidebar__download-btn"
              title="Download Aldo Abieza CV"
              aria-label="Download Resume"
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
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className={`sidebar__menu-toggle ${isMenuOpen ? 'is-open' : ''}`}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
            >
              <span className="sidebar__menu-icon" aria-hidden="true">
                <span className="sidebar__menu-bar sidebar__menu-bar--top" />
                <span className="sidebar__menu-bar sidebar__menu-bar--bottom" />
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Body (Navigation links + bottom action buttons) */}
        <div className="sidebar__desktop-body">
          {!isCaseStudy ? (
            <nav className="sidebar__nav" aria-label="Main Navigation">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => onNavigate(item.view)}
                  className={activeView === item.view ? 'is-active' : ''}
                >
                  {item.label}
                </button>
              ))}
            </nav>
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
                    <p className="case__meta-label">Role</p>
                    <p className="case__meta-value">{currentCaseStudy.role}</p>
                  </div>
                  <div className="case__meta-item">
                    <p className="case__meta-label">Platform</p>
                    <p className="case__meta-value">
                      {currentCaseStudy.platform || currentCaseStudy.metaDetails?.platform || 'Web & Mobile'}
                    </p>
                  </div>
                  <div className="case__meta-item">
                    <p className="case__meta-label">Timeline</p>
                    <p className="case__meta-value">{currentCaseStudy.timeline}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Responsive Collapsible Panel (Uses exact same .sidebar__nav design & .btn--copy) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="sidebar__collapsible-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sidebar__collapsible-inner">
                {isCaseStudy && (
                  <div className="sidebar__case-nav mb-2">
                    <button
                      onClick={() => {
                        onNavigate('work');
                        setIsMenuOpen(false);
                      }}
                      className="sidebar__back"
                    >
                      ← Back to work
                    </button>
                  </div>
                )}

                {/* Identical design to desktop navigation (.sidebar__nav) */}
                <nav className="sidebar__nav" aria-label="Mobile Navigation">
                  {navItems.map((item) => (
                    <button
                      key={item.view}
                      onClick={() => {
                        onNavigate(item.view);
                        setIsMenuOpen(false);
                      }}
                      className={activeView === item.view ? 'is-active' : ''}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>

                {/* Download CV & Copy Email actions */}
                <div className="sidebar__collapsible-footer">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenResume) {
                        onOpenResume();
                      }
                      setIsMenuOpen(false);
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
                    type="button"
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
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>

      {/* Backdrop overlay for outside tap */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="sidebar__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
