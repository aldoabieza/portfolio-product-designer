import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export type OpportunityOption = 'option-1' | 'option-2' | 'option-3';

export function AvailableOpportunity() {
  const [selectedOption, setSelectedOption] = useState<OpportunityOption>(() => {
    try {
      const saved = localStorage.getItem('opportunity_option') as OpportunityOption;
      if (saved && ['option-1', 'option-2', 'option-3'].includes(saved)) {
        return saved;
      }
      return 'option-1';
    } catch {
      return 'option-1';
    }
  });

  const [showAll, setShowAll] = useState(false);

  const handleSelectOption = (opt: OpportunityOption) => {
    setSelectedOption(opt);
    try {
      localStorage.setItem('opportunity_option', opt);
    } catch {}
  };

  return (
    <div className="avail-wrapper">
      {/* Mini Options Switcher */}
      <div className="avail-switcher-header">
        <span className="avail-switcher-label">Design Options</span>
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className={`avail-switcher-toggle ${showAll ? 'is-active' : ''}`}
          title="Toggle view all 3 options together"
        >
          {showAll ? 'Single View' : 'Compare All 3'}
        </button>
      </div>

      {!showAll && (
        <div className="avail-tabs" role="tablist" aria-label="Available for Opportunity Design Options">
          {(['option-1', 'option-2', 'option-3'] as const).map((opt, i) => (
            <button
              key={opt}
              type="button"
              role="tab"
              aria-selected={selectedOption === opt}
              onClick={() => handleSelectOption(opt)}
              className={`avail-tab ${selectedOption === opt ? 'avail-tab--active' : ''}`}
            >
              Option {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Render Options */}
      {showAll ? (
        <div className="avail-stack">
          {/* Option 1 Preview */}
          <div className="avail-stack-item">
            <span className="avail-stack-tag">Option 1 — Clean Minimal Badge</span>
            <Option1Component />
          </div>

          {/* Option 2 Preview */}
          <div className="avail-stack-item">
            <span className="avail-stack-tag">Option 2 — Soft Floating Card</span>
            <Option2Component />
          </div>

          {/* Option 3 Preview */}
          <div className="avail-stack-item">
            <span className="avail-stack-tag">Option 3 — Dark Editorial Capsule</span>
            <Option3Component />
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedOption}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {selectedOption === 'option-1' && <Option1Component />}
            {selectedOption === 'option-2' && <Option2Component />}
            {selectedOption === 'option-3' && <Option3Component />}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

/**
 * Option 1: Clean Minimal Badge
 * A light, refined capsule with crisp typography and an ambient glowing emerald dot.
 */
export function Option1Component() {
  return (
    <div className="avail-opt-1" role="status" aria-label="Status: Available for Opportunity">
      <span className="avail-opt-1__dot-wrapper" aria-hidden="true">
        <span className="avail-opt-1__dot" />
        <span className="avail-opt-1__ring" />
      </span>
      <span className="avail-opt-1__text">Available for Opportunity</span>
    </div>
  );
}

export { Option1Component as AvailableOpportunityBadge };

/**
 * Option 2: Soft Floating Card
 * A card-style status indicator with dual-wave radar ripple and subtle border.
 */
function Option2Component() {
  return (
    <div className="avail-opt-2" role="status" aria-label="Status: Available for Opportunity">
      <div className="avail-opt-2__header">
        <span className="avail-opt-2__beacon" aria-hidden="true">
          <span className="avail-opt-2__dot" />
          <span className="avail-opt-2__wave avail-opt-2__wave--1" />
          <span className="avail-opt-2__wave avail-opt-2__wave--2" />
        </span>
        <span className="avail-opt-2__title">Available for Opportunity</span>
      </div>
      <p className="avail-opt-2__subtitle">Open for design leadership & projects</p>
    </div>
  );
}

/**
 * Option 3: Dark Editorial Capsule
 * High-contrast architectural capsule with a vibrant breathing neon dot.
 */
function Option3Component() {
  return (
    <div className="avail-opt-3" role="status" aria-label="Status: Available for Opportunity">
      <span className="avail-opt-3__dot" aria-hidden="true" />
      <span className="avail-opt-3__text">Available for Opportunity</span>
      <span className="avail-opt-3__badge">Active</span>
    </div>
  );
}
