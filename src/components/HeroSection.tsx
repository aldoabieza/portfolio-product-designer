import { motion } from 'motion/react';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__inner">
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
          Currently designing at{' '}
          <a
            href="https://www.doku.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__company-link"
          >
            DOKU
          </a>
          . Formerly at{' '}
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
      </div>
    </section>
  );
}
