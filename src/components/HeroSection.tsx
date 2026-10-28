import { useState } from 'react';
import { motion } from 'motion/react';
import { AvailableOpportunityBadge } from './AvailableOpportunity';

export default function HeroSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('aldo.abieza30@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="hero">
      <div className="hero__inner">
        {/* Status Badge: Option 1 (Available for Opportunity) */}
        <motion.div
          className="hero__status"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
        >
          <AvailableOpportunityBadge />
        </motion.div>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero__title-intro">
            Hi, I'm <span className="hero__title--em">Aldo Abieza</span>,
          </span>{' '}
          <span className="hero__title-role">Product Designer</span>{' '}
          <span className="hero__title-origin">
            based in{' '}
            <motion.span
              className="hero__location"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            >
              <span className="hero__flag" role="img" aria-label="Indonesia">
                <svg
                  className="hero__flag-svg"
                  viewBox="0 0 24 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect width="24" height="8" fill="#E70011" />
                  <rect y="8" width="24" height="8" fill="#FFFFFF" />
                  <rect
                    width="24"
                    height="16"
                    fill="none"
                    stroke="rgba(0,0,0,0.15)"
                    strokeWidth="1"
                  />
                </svg>
              </span>
              Indonesia
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          className="hero__desc"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          I have 4+ years of working experience as a digital product designer.
          Formerly at{' '}
          <a
            href="https://www.doku.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__company-link"
          >
            DOKU
          </a>
          ,{' '}
          <a
            href="https://orderonline.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__company-link"
          >
            OrderOnline.id
          </a>{' '}
          and{' '}
          <a
            href="https://trawlbens.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__company-link"
          >
            Trawlbens
          </a>
          . I translate complex problems into elegant solutions with better
          experiences — and design scalable design systems along the way.
        </motion.p>

        {/* Let's Connect Section */}
        <motion.div
          className="hero__connect"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero__connect-text">Let's Connect!</span>
          <div className="hero__connect-buttons">
            {/* Secondary Button: LinkedIn (Icon only with existing button roll interaction) */}
            <a
              href="https://www.linkedin.com/in/aldo-abieza/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary btn--icon-only btn--sm"
              aria-label="Aldo Abieza on LinkedIn"
              title="LinkedIn"
            >
              <span className="btn__icon">
                <span className="btn__icon-viewport">
                  <span className="btn__icon-roll">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </span>
                </span>
              </span>
            </a>

            {/* Secondary Button: Email (Icon only with existing button roll interaction & copy feedback) */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className={`btn btn--secondary btn--icon-only btn--sm btn--copy ${copied ? 'is-copied' : ''}`}
              aria-label={copied ? 'Email address copied to clipboard' : 'Copy Aldo Abieza email address'}
              title={copied ? 'Copied: aldo.abieza30@gmail.com' : 'Copy email (aldo.abieza30@gmail.com)'}
            >
              <span className="btn__icon">
                <span className="btn__icon-default">
                  <span className="btn__icon-viewport">
                    <span className="btn__icon-roll">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </span>
                  </span>
                </span>
                <span className="btn__icon-check">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              </span>
              {copied && <span className="hero__connect-tooltip">Copied!</span>}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
