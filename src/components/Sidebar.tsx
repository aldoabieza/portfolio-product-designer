import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewType, CaseStudy } from '../types';

interface SidebarProps {
  activeView: ViewType;
  currentCaseStudy?: CaseStudy | null;
  onNavigate: (view: ViewType) => void;
  onBack?: () => void;
  canGoBack?: boolean;
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
  onBack,
  canGoBack = false,
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
    { view: 'experience', label: 'Experience' }
  ];

  return (
    <>
      <motion.aside
        className={`sidebar ${isMenuOpen ? 'is-menu-open' : ''} ${isCaseStudy ? 'is-case-study' : ''}`}
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top/Navbar Header Row */}
        <div className="sidebar__header-row">
          {/* Ujung Kiri Navbar: Return CTA when canGoBack / Logo on intro */}
          <div className="sidebar__brand">
            {canGoBack ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    if (onBack) {
                      onBack();
                    } else {
                      onNavigate('intro');
                    }
                    setIsMenuOpen(false);
                  }}
                  className="sidebar__back hero__company-link sidebar__back-responsive"
                  aria-label="Return to previous page"
                  title="Return to previous page"
                >
                  <span className="sidebar__back-icon" aria-hidden="true">←</span>
                  <span className="sidebar__back-text">Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate('intro');
                    setIsMenuOpen(false);
                  }}
                  className="sidebar__logo sidebar__logo--desktop-only"
                  aria-label="Go to Aldo Abieza home"
                >
                  Aldo Abieza
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onNavigate('intro');
                  setIsMenuOpen(false);
                }}
                className="sidebar__logo"
                aria-label="Go to Aldo Abieza home"
              >
                Aldo Abieza
              </button>
            )}
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
                className="sidebar__back hero__company-link"
              >
                <span className="sidebar__back-icon" aria-hidden="true">←</span>
                <span className="sidebar__back-text">Back</span>
              </button>
            </div>
          )}

          <div className="sidebar__bottom">
            {!isCaseStudy ? (
              <div className="sidebar__timezone" aria-label="Current Jakarta Time">
                Jakarta; {timeString} GMT+7
              </div>
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
                {canGoBack && (
                  <div className="sidebar__case-nav mb-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (onBack) {
                          onBack();
                        } else {
                          onNavigate('work');
                        }
                        setIsMenuOpen(false);
                      }}
                      className="sidebar__back hero__company-link"
                    >
                      <span className="sidebar__back-icon" aria-hidden="true">←</span>
                      <span className="sidebar__back-text">Back</span>
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

                {/* Timezone component matching existing desktop sidebar */}
                <div className="sidebar__collapsible-footer">
                  <div className="sidebar__timezone" aria-label="Current Jakarta Time">
                    Jakarta; {timeString} GMT+7
                  </div>
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
