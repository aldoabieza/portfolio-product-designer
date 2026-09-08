import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CaseStudy } from '../types';
import { CASE_STUDIES, CASE_STUDY_ORDER } from '../data/portfolioData';

interface WorkSectionProps {
  onSelectCaseStudy: (id: string) => void;
}

interface WorkCardProps {
  key?: string;
  item: CaseStudy;
  index: number;
  onSelectCaseStudy: (id: string) => void;
}

function WorkCard({ item, index, onSelectCaseStudy }: WorkCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  // Subtle image parallax inside the media container frame (does not affect layout or text)
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <motion.article
      ref={cardRef}
      className="work-item"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08
      }}
    >
      {/* Left Column: Clean Focused Portfolio Information */}
      <div className="work-item__info">
        <div className="work-item__meta">
          <span className="work-item__client">{item.client}</span>
          <span className="work-item__meta-sep">•</span>
          <span className="work-item__category">{item.category}</span>
        </div>

        <h3 className="work-item__title">
          {item.title}
        </h3>

        <button
          className="btn btn--ghost"
          onClick={() => onSelectCaseStudy(item.id)}
          aria-label={`See case study for ${item.title}`}
        >
          <span className="btn__label">See Case Study</span>
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
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
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
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </span>
          </span>
        </button>
      </div>

      {/* Right Column: Visual Preview Media with automatic zoom on hover (display only) */}
      <div className="work-item__media">
        <motion.div
          className="work-item__media-inner"
          style={{ y: imageY }}
        >
          <img
            src={item.coverImage}
            alt={item.title}
            loading="lazy"
            className="work-item__img"
          />
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function WorkSection({ onSelectCaseStudy }: WorkSectionProps) {
  return (
    <section className="section work">
      <motion.div
        className="section__head"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <h4 className="section__title section__title--h4">Selected Work</h4>
      </motion.div>

      <div className="work-list">
        {CASE_STUDY_ORDER.map((key, index) => {
          const item: CaseStudy = CASE_STUDIES[key];
          if (!item) return null;
          return (
            <WorkCard
              key={item.id}
              item={item}
              index={index}
              onSelectCaseStudy={onSelectCaseStudy}
            />
          );
        })}
      </div>
    </section>
  );
}
