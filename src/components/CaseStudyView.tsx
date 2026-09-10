import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CaseStudy, CaseStudyImage } from '../types';
import { CASE_STUDIES, CASE_STUDY_ORDER } from '../data/portfolioData';
import { InconsistencyCards } from './InconsistencyCards';

interface CaseStudyViewProps {
  caseStudy: CaseStudy;
  onBackToWork?: () => void;
  onSelectCaseStudy: (id: string) => void;
}

interface CaseImageProps {
  key?: string | number;
  img: CaseStudyImage;
  title: string;
  index: number;
  onExpand: (img: CaseStudyImage) => void;
}

function CaseImageItem({ img, title, index, onExpand }: CaseImageProps) {
  const [currentSrc, setCurrentSrc] = useState(img.url);
  const [loadFailed, setLoadFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const getNextFallback = (url: string, attemptCount: number): string | null => {
    const encoded = encodeURI(url);
    if (attemptCount === 0 && encoded !== url) return encoded;

    const filename = decodeURIComponent(url.split('/').pop() || '');
    const dir = url.substring(0, url.lastIndexOf('/'));
    
    // Lowercase with hyphens
    const kebab = filename.toLowerCase().replace(/\s+/g, '-');
    const kebabUrl = `${dir}/${kebab}`;
    if (attemptCount <= 1 && kebabUrl !== url) return kebabUrl;

    // Inverted names support (Missing Component Update vs Missing Update Component)
    if (attemptCount === 2) {
      if (filename.includes('Missing Component Update')) {
        return `${dir}/${filename.replace('Missing Component Update', 'Missing Update Component')}`;
      }
      if (filename.includes('Missing Update Component')) {
        return `${dir}/${filename.replace('Missing Update Component', 'Missing Component Update')}`;
      }
    }

    // Alternative extensions: png, jpg, jpeg, webp
    const baseName = filename.replace(/\.[^/.]+$/, '');
    const ext = filename.split('.').pop()?.toLowerCase();
    const exts = ['png', 'jpg', 'jpeg', 'webp'].filter(e => e !== ext);
    if (attemptCount - 3 < exts.length && attemptCount >= 3) {
      return `${dir}/${baseName}.${exts[attemptCount - 3]}`;
    }

    return null;
  };

  const handleError = () => {
    const next = getNextFallback(img.url, attempt);
    if (next) {
      setAttempt(prev => prev + 1);
      setCurrentSrc(next);
    } else {
      setLoadFailed(true);
    }
  };

  const filename = decodeURIComponent(img.url.split('/').pop() || '');

  if (loadFailed) {
    return (
      <figure className="case__image-figure" style={{ width: '100%' }}>
        <div
          className="case__image-container"
          style={{
            padding: '36px 24px',
            border: '1.5px dashed var(--line)',
            borderRadius: '12px',
            background: 'var(--surface)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '12px',
            minHeight: '200px'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(0, 128, 128, 0.08)',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}
          >
            🖼️
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--ink)', marginBottom: '4px' }}>
              Menunggu File: <code style={{ background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '4px' }}>{filename}</code>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--ink-soft)', maxWidth: '460px', lineHeight: 1.5 }}>
              File belum terdeteksi di server. Silakan upload file asli ke folder <code style={{ color: 'var(--accent)' }}>public/assets/projects/doku/</code> lewat File Explorer.
            </div>
          </div>
        </div>
      </figure>
    );
  }

  return (
    <figure
      className="case__image-figure"
      role="button"
      tabIndex={0}
      aria-label={`Expand visual: ${img.caption || `${title} visual ${index + 1}`}`}
      onClick={() => onExpand({ ...img, url: currentSrc })}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onExpand({ ...img, url: currentSrc });
        }
      }}
    >
      <div className="case__image-container">
        <img
          src={currentSrc}
          alt={img.caption || `${title} visual ${index + 1}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={handleError}
        />
        <div className="case__image-zoom-indicator" aria-hidden="true">
          <span>🔍 Click to expand</span>
        </div>
      </div>
    </figure>
  );
}

export default function CaseStudyView({
  caseStudy,
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
      {/* Case Header */}
      <motion.div
        className="case__head"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="case__title">{caseStudy.title}</h1>
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
              {section.title && (
                <div className="case__section-header">
                  <h4 className="case__section-title">{section.title}</h4>
                </div>
              )}

              {/* Section Paragraphs */}
              {section.paragraphs && section.paragraphs.length > 0 && (
                <div className="case__section-paragraphs">
                  {section.paragraphs.map((p, pIndex) => (
                    <p key={pIndex} className="case__block-text">{p}</p>
                  ))}
                </div>
              )}

              {/* Section Figures & Visuals (rendered before points if imagesBeforePoints is true) */}
              {section.imagesBeforePoints && section.images && section.images.length > 0 && (
                <div className={`case__section-images case__section-images--${section.images.length === 1 ? 'single' : 'grid'}`}>
                  {section.images.map((img, iIndex) => (
                    <CaseImageItem
                      key={iIndex}
                      img={img}
                      title={section.title}
                      index={iIndex}
                      onExpand={setActiveImage}
                    />
                  ))}
                </div>
              )}

              {/* Structured Key Points Cards */}
              {section.keyPoints && section.keyPoints.length > 0 && (
                <div
                  className="case__key-points-grid"
                  role="list"
                  aria-label={section.title ? `Key takeaways for ${section.title}` : 'Key takeaways'}
                >
                  {section.keyPoints.map((point, kIndex) => {
                    const pointId = `key-point-${sIndex}-${kIndex}`;
                    return (
                      <article
                        key={kIndex}
                        className="case__key-point-card"
                        role="listitem"
                        aria-labelledby={pointId}
                      >
                        <div className="case__key-point-header">
                          <span className="case__key-point-number" aria-hidden="true">
                            0{kIndex + 1}
                          </span>
                          <h5 id={pointId} className="case__key-point-title">
                            {point.title}
                          </h5>
                        </div>
                        <p className="case__key-point-desc">{point.description}</p>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* Custom Variant: Inconsistency Cards */}
              {section.customVariant === 'inconsistency-cards' ? (
                <InconsistencyCards
                  onExpand={(url, caption) =>
                    setActiveImage({
                      url: url || section.images?.[0]?.url || '/assets/projects/doku/doku-product-inconsistency-breakdown.png',
                      caption: caption || section.images?.[0]?.caption || 'Cross-Product Inconsistency Breakdown'
                    })
                  }
                />
              ) : (
                /* Section Figures & Visuals (rendered after points if not imagesBeforePoints) */
                !section.imagesBeforePoints && section.images && section.images.length > 0 && (
                  <div className={`case__section-images case__section-images--${section.images.length === 1 ? 'single' : 'grid'}`}>
                    {section.images.map((img, iIndex) => (
                      <CaseImageItem
                        key={iIndex}
                        img={img}
                        title={section.title}
                        index={iIndex}
                        onExpand={setActiveImage}
                      />
                    ))}
                  </div>
                )
              )}

              {/* Section Paragraphs (rendered below image) */}
              {section.afterImageParagraphs && section.afterImageParagraphs.length > 0 && (
                <div className="case__section-paragraphs case__section-paragraphs--after-image">
                  {section.afterImageParagraphs.map((p, pIndex) => (
                    <p key={pIndex} className="case__block-text">{p}</p>
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
              <h4 className="case__block-title">Context & Challenge</h4>
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
              <h4 className="case__block-title">Identifying Core Bottlenecks</h4>
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
              <h4 className="case__block-title">Modular & Responsive Redesign</h4>
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
              <h4 className="case__lesson-title">{caseStudy.lessonLearned.title || 'Design Reflections'}</h4>
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
              <img src={activeImage.url} alt={activeImage.caption || 'Project visual'} referrerPolicy="no-referrer" />
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
