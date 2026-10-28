import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BentoGallery } from './BentoGallery';
import { PhotographyGallery } from './PhotographyGallery';

type PlaygroundTab = 'design' | 'photography';

interface TabItem {
  id: PlaygroundTab;
  label: string;
}

const TABS: TabItem[] = [
  { id: 'design', label: 'Design & Visuals' },
  { id: 'photography', label: 'Photography' }
];

export default function ExperimentSection() {
  const [activeTab, setActiveTab] = useState<PlaygroundTab>('design');

  return (
    <section className="section experimental">
      <motion.div
        className="section__head"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <h4 className="section__title">Playground &amp; Explorations</h4>
        <p className="section__sub">
          A space for creative experiments and visual discoveries, both on and beyond the screen
        </p>

        {/* Category Tabs: Design & Visuals / Photography directly beneath Header */}
        <div
          className="inconsistency-card__tabs work-filter-tabs"
          role="tablist"
          aria-label="Playground Categories"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`inconsistency-card__tab ${
                  isActive ? 'inconsistency-card__tab--active' : ''
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileTap={!isActive ? { scale: 0.96 } : undefined}
                transition={{ duration: 0.15 }}
              >
                <span className="inconsistency-card__tab-label">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="playground-tab-indicator"
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

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        {activeTab === 'design' ? (
          <motion.div
            key="section-design"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <BentoGallery />
          </motion.div>
        ) : (
          <motion.div
            key="section-photography"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <PhotographyGallery />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
