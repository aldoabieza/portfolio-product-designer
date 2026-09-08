import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CaseStudy, CaseStudyImage } from '../types';
import { CASE_STUDIES, CASE_STUDY_ORDER } from '../data/portfolioData';

interface CaseStudyViewProps {
  caseStudy: CaseStudy;
  onBackToWork: () => void;
  onSelectCaseStudy: (id: string) => void;
}

export default function CaseStudyView({
  caseStudy,
  onBackToWork,
  onSelectCaseStudy
}: CaseStudyViewProps) {
  const [activeImage, setActiveImage] = useState<CaseStudyImage | null>(null);

  const currentIndex = CASE_STUDY_ORDER.indexOf(caseStudy.id);
  const prevIndex = (currentIndex - 1 + CASE_STUDY_ORDER.length) % CASE_STUDY_ORDER.length;
  const nextIndex = (currentIndex + 1) % CASE_STUDY_ORDER.length;

  const prevProject = CASE_STUDIES[CASE_STUDY_ORDER[prevIndex]];
  const nextProject = CASE_STUDIES[CASE_STUDY_ORDER[nextIndex]];

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="section case-study">
      {/* Back button */}
      <motion.button
        onClick={onBackToWork}
        className="case__back"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        ← Back to work
      </motion.button>

      {/* Case Header */}
      <motion.div
        className="case__head"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="case__tag-badge">
          <span className="case__badge-pill">{caseStudy.client}</span>
          <span className="case__badge-sep">•</span>
          <span className="case__badge-category">{caseStudy.tag}</span>
        </div>
        <h1 className="case__title">{caseStudy.title}</h1>
        <p className="case__intro">{caseStudy.summary}</p>
      </motion.div>

      {/* Cover Image */}
      <motion.div
        className="case__cover"
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={caseStudy.coverImage} alt={caseStudy.title} />
      </motion.div>

      {/* Case Study Detailed Body */}
      <div className="case__body">
        {caseStudy.sections && caseStudy.sections.length > 0 ? (
          caseStudy.sections.map((section, sIndex) => (
            <motion.section
              key={section.number || sIndex}
              className="case__section"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="case__section-header">
                <span className="case__section-badge">{section.badge}</span>
                <h2 className="case__section-title">{section.title}</h2>
                {section.summary && (
                  <p className="case__section-summary">{section.summary}</p>
                )}
              </div>

              {/* Section Paragraphs */}
              {section.paragraphs && section.paragraphs.length > 0 && (
                <div className="case__section-paragraphs">
                  {section.paragraphs.map((p, pIndex) => (
                    <p key={pIndex} className="case__block-text">{p}</p>
                  ))}
                </div>
              )}

              {/* Callouts (Disclaimers / Key Insights / Alerts) */}
              {section.callouts && section.callouts.length > 0 && (
                <div className="case__callouts">
                  {section.callouts.map((callout, cIndex) => {
                    const isAlert =
                      callout.icon === '⚠️' ||
                      callout.label?.toLowerCase().includes('disclaimer') ||
                      callout.label?.toLowerCase().includes('alert');
                    return (
                      <div
                        key={cIndex}
                        className={`case__callout-card ${
                          isAlert ? 'case__callout-card--alert' : 'case__callout-card--info'
                        }`}
                        role={isAlert ? 'alert' : 'note'}
                      >
                        <div className="case__callout-icon-box">
                          {callout.icon || (isAlert ? '⚠️' : '💡')}
                        </div>
                        <div className="case__callout-content">
                          {callout.label && (
                            <div className="case__callout-header">
                              <span className="case__callout-label">{callout.label}</span>
                            </div>
                          )}
                          <p className="case__callout-text">{callout.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Structured Key Points Cards */}
              {section.keyPoints && section.keyPoints.length > 0 && (
                <div className="case__key-points-grid">
                  {section.keyPoints.map((point, kIndex) => (
                    <div key={kIndex} className="case__key-point-card">
                      <div className="case__key-point-header">
                        <span className="case__key-point-number">0{kIndex + 1}</span>
                        <h3 className="case__key-point-title">{point.title}</h3>
                      </div>
                      <p className="case__key-point-desc">{point.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Section Figures & Visuals */}
              {section.images && section.images.length > 0 && (
                <div className={`case__section-images case__section-images--${section.images.length === 1 ? 'single' : 'grid'}`}>
                  {section.images.map((img, iIndex) => (
                    <figure
                      key={iIndex}
                      className="case__image-figure"
                      onClick={() => setActiveImage(img)}
                    >
                      <div className="case__image-container">
                        <img
                          src={img.url}
                          alt={img.caption || `${section.title} visual ${iIndex + 1}`}
                          loading="lazy"
                        />
                        <div className="case__image-zoom-indicator">
                          <span>🔍 Click to expand</span>
                        </div>
                      </div>
                      {img.caption && (
                        <figcaption className="case__image-caption">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              )}
            </motion.section>
          ))
        ) : (
          /* Fallback for basic case studies */
          <>
            <motion.div
              className="case__block"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="case__block-label">01. Overview</p>
              <h2 className="case__block-title">Context & Challenge</h2>
              <p className="case__block-text">{caseStudy.overview}</p>
            </motion.div>

            <motion.div
              className="case__block"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="case__block-label">02. The Friction</p>
              <h2 className="case__block-title">Identifying Core Bottlenecks</h2>
              <p className="case__block-text">{caseStudy.problem}</p>
            </motion.div>

            <motion.div
              className="case__block"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="case__block-label">03. The Solution</p>
              <h2 className="case__block-title">Modular & Responsive Redesign</h2>
              <p className="case__block-text">{caseStudy.solution}</p>
            </motion.div>
          </>
        )}

        {/* Lesson Learned / Design Reflections */}
        {caseStudy.lessonLearned && (
          <motion.div
            className="case__lesson-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="case__lesson-header">
              <span className="case__lesson-badge">Takeaways & Reflection</span>
              <h3 className="case__lesson-title">{caseStudy.lessonLearned.title || 'Design Reflections'}</h3>
            </div>
            <p className="case__lesson-text">{caseStudy.lessonLearned.text}</p>
            {caseStudy.lessonLearned.bullets && (
              <ul className="case__lesson-list">
                {caseStudy.lessonLearned.bullets.map((bullet, bIndex) => (
                  <li key={bIndex}>{bullet}</li>
                ))}
              </ul>
            )}
          </motion.div>
        )}

        {/* Testimonial if present */}
        {caseStudy.testimonial && (
          <motion.blockquote
            className="case__quote"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
          >
            "{caseStudy.testimonial.quote}"
            <span>
              — {caseStudy.testimonial.author}, {caseStudy.testimonial.role}
            </span>
          </motion.blockquote>
        )}
      </div>

      {/* Fullscreen Lightbox for Figure Inspection */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="case__lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              className="case__lightbox-dialog"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="case__lightbox-close"
                onClick={() => setActiveImage(null)}
                aria-label="Close zoomed image"
              >
                ✕ Close
              </button>
              <img src={activeImage.url} alt={activeImage.caption || 'Project visual'} />
              {activeImage.caption && (
                <p className="case__lightbox-caption">{activeImage.caption}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case Footer Navigation */}
      <footer className="case__footer">
        <div className="case__nav">
          {prevProject && (
            <button
              onClick={() => {
                onSelectCaseStudy(prevProject.id);
                handleScrollTop();
              }}
              className="case__nav-btn case__nav-btn--prev"
            >
              <span className="case__nav-dir">← Previous Project</span>
              <span className="case__nav-title">{prevProject.title}</span>
            </button>
          )}

          {nextProject && (
            <button
              onClick={() => {
                onSelectCaseStudy(nextProject.id);
                handleScrollTop();
              }}
              className="case__nav-btn case__nav-btn--next"
            >
              <span className="case__nav-dir">Next Project →</span>
              <span className="case__nav-title">{nextProject.title}</span>
            </button>
          )}
        </div>

        <button onClick={handleScrollTop} className="case__scroll-top">
          ↑ Back to top
        </button>
      </footer>
    </section>
  );
}
