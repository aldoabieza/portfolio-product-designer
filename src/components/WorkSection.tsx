import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CaseStudy } from '../types';
import { CASE_STUDIES, CASE_STUDY_ORDER } from '../data/portfolioData';

type WorkCategory = 'All' | 'Design System' | 'Website' | 'Mobile Apps';

const WORK_CATEGORIES: WorkCategory[] = [
  'All',
  'Design System',
  'Website',
  'Mobile Apps'
];

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

  return (
    <motion.article
      ref={cardRef}
      layout
      className="work-item"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.05
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
          <span className="btn__label">
            {item.isComingSoon ? 'Coming Soon' : 'See Case Study'}
          </span>
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

      {/* Right Column: Visual Preview Media without click action (display only with hover zoom) */}
      <div className="work-item__media">
        <div className="work-item__media-inner">
          <img
            src={item.coverImage}
            alt={item.title}
            loading="lazy"
            className="work-item__img"
            style={{
              objectPosition: item.coverObjectPosition || 'center center'
            }}
          />

          {(item.isOnProgress || item.id === 'doku') && (
            <div className="work-item__overlay" aria-label="On Progress project">
              <div className="work-item__progress-badge">
                <span className="work-item__progress-dot" aria-hidden="true" />
                <span className="work-item__progress-text">On Progress</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function WorkSection({ onSelectCaseStudy }: WorkSectionProps) {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('All');

  const filteredKeys = CASE_STUDY_ORDER.filter((key) => {
    const item: CaseStudy = CASE_STUDIES[key];
    if (!item) return false;
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <section className="section work">
      <motion.div
        className="section__head"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <h4 className="section__title section__title--h4">Selected Work</h4>

        {/* Tab Filter Component (Consistent with details of portfolio tabs) */}
        <div
          className="inconsistency-card__tabs work-filter-tabs"
          role="tablist"
          aria-label="Work Categories"
        >
          {WORK_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <motion.button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`inconsistency-card__tab ${
                  isActive ? 'inconsistency-card__tab--active' : ''
                }`}
                onClick={() => setActiveCategory(category)}
                whileTap={!isActive ? { scale: 0.96 } : undefined}
                transition={{ duration: 0.15 }}
              >
                <span className="inconsistency-card__tab-label">{category}</span>
                {isActive && (
                  <motion.div
                    layoutId="work-category-tab-indicator"
                    className="inconsistency-card__tab-indicator"
                    transition={{
                      type: 'spring',
                      stiffness: 450,
                      damping: 32,
                      mass: 0.75
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <div className="work-list">
        <AnimatePresence mode="popLayout">
          {filteredKeys.map((key, index) => {
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
        </AnimatePresence>
      </div>
    </section>
  );
}
