import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, ChevronsRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { CaseStudy, CaseStudyImage } from '../types';
import { CASE_STUDIES, CASE_STUDY_ORDER } from '../data/portfolioData';
import { InconsistencyCards } from './InconsistencyCards';
import { CaseVideoPlayer } from './CaseVideoPlayer';

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

  useEffect(() => {
    setCurrentSrc(img.url);
    setLoadFailed(false);
    setAttempt(0);
  }, [img.url]);

  const getNextFallback = (url: string, attemptCount: number): string | null => {
    const encoded = encodeURI(url);
    if (attemptCount === 0 && encoded !== url) return encoded;

    const filename = decodeURIComponent(url.split('/').pop() || '');
    const dir = url.substring(0, url.lastIndexOf('/'));
    
    // Lowercase with hyphens
    const kebab = filename.toLowerCase().replace(/\s+/g, '-');
    const kebabUrl = `${dir}/${kebab}`;
    if (attemptCount <= 1 && kebabUrl !== url) return kebabUrl;

    // Spaces <-> underscores support
    if (attemptCount === 2) {
      if (filename.includes('_')) {
        const spaced = filename.replace(/_/g, ' ');
        return encodeURI(`${dir}/${spaced}`);
      }
      if (filename.includes(' ')) {
        const underscored = filename.replace(/\s+/g, '_');
        return `${dir}/${underscored}`;
      }
    }

    // Inverted names support (Missing Component Update vs Missing Update Component)
    if (attemptCount === 3) {
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
    if (attemptCount - 4 < exts.length && attemptCount >= 4) {
      return encodeURI(`${dir}/${baseName}.${exts[attemptCount - 4]}`);
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
      <figure className="case__image-figure-failed" style={{ width: '100%', cursor: 'default' }}>
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
              Menunggu File: <code style={{ background: 'rgba(0,0,0,0.06)', padding: '4px 8px', borderRadius: '4px' }}>{filename}</code>
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
      </div>
    </figure>
  );
}

function renderParagraph(p: string, pIndex: number, isPrimaryTitle: boolean = false) {
  const colonIndex = p.indexOf(': ');
  if (colonIndex > 0 && colonIndex <= 60 && !p.startsWith('http')) {
    const title = p.slice(0, colonIndex).trim();
    const desc = p.slice(colonIndex + 2).trim();
    return (
      <div key={pIndex} className="case__block-text case__block-item">
        <h5 className={`case__block-item-title ${isPrimaryTitle ? 'case__block-item-title--primary' : ''}`}>{title}</h5>
        <span className="case__block-item-desc">{desc}</span>
      </div>
    );
  }
  return (
    <p key={pIndex} className="case__block-text">{p}</p>
  );
}

function renderParagraphs(paragraphs: string[], isPrimaryTitle: boolean = false) {
  const elements: React.ReactNode[] = [];
  let currentGroup: { p: string; index: number }[] = [];

  const flushGroup = () => {
    if (currentGroup.length > 0) {
      const groupKey = `group-${currentGroup[0].index}`;
      elements.push(
        <div key={groupKey} className="case__block-items-group">
          {currentGroup.map(({ p, index }) => renderParagraph(p, index, isPrimaryTitle))}
        </div>
      );
      currentGroup = [];
    }
  };

  paragraphs.forEach((p, pIndex) => {
    const colonIndex = p.indexOf(': ');
    const isBlockItem = colonIndex > 0 && colonIndex <= 60 && !p.startsWith('http');
    if (isBlockItem) {
      currentGroup.push({ p, index: pIndex });
    } else {
      flushGroup();
      elements.push(renderParagraph(p, pIndex, isPrimaryTitle));
    }
  });

  flushGroup();
  return elements;
}

function renderQuotePoint(q: string, qIndex: number, hideIcon: boolean = false, isPrimaryTitle: boolean = false) {
  const cleanText = q.replace(/^\d+\s*/, '');
  const colonIndex = cleanText.indexOf(': ');
  if (colonIndex > 0 && colonIndex <= 60 && !cleanText.startsWith('http')) {
    const title = cleanText.slice(0, colonIndex).trim();
    const desc = cleanText.slice(colonIndex + 2).trim();
    return (
      <div key={qIndex} className={`case__point-item case__point-item--structured ${hideIcon ? 'case__point-item--no-icon' : ''}`}>
        {!hideIcon && (
          <span className="case__point-icon" aria-hidden="true">
            <ChevronsRight size={18} strokeWidth={2.5} />
          </span>
        )}
        <div className="case__point-content">
          <strong className={`case__point-title ${isPrimaryTitle ? 'case__point-title--primary' : ''}`}>{title}</strong>
          <span className="case__point-desc">{desc}</span>
        </div>
      </div>
    );
  }
  return (
    <div key={qIndex} className={`case__point-item ${hideIcon ? 'case__point-item--no-icon' : ''}`}>
      {!hideIcon && (
        <span className="case__point-icon" aria-hidden="true">
          <ChevronsRight size={18} strokeWidth={2.5} />
        </span>
      )}
      <p className="case__point-text">{cleanText}</p>
    </div>
  );
}

export default function CaseStudyView({
  caseStudy,
  onSelectCaseStudy
}: CaseStudyViewProps) {
  const [activeImage, setActiveImage] = useState<CaseStudyImage | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const activeImageRef = useRef<CaseStudyImage | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  activeImageRef.current = activeImage;

  const hideCursor = () => {
    if (cursorRef.current) {
      cursorRef.current.classList.remove('case__preview-cursor--visible');
    }
  };

  const showCursor = (x: number, y: number) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      cursorRef.current.classList.add('case__preview-cursor--visible');
    }
  };

  // Keyboard shortcut (Escape) for lightbox
  useEffect(() => {
    if (!activeImage) return;
    setIsZoomed(false);
    hideCursor();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveImage(null);
        setIsZoomed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage]);

  // Robust Global Pointer & Scroll Listeners for the preview cursor pill
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      // Ignore touch gestures
      if (e.pointerType === 'touch') {
        hideCursor();
        return;
      }

      lastPosRef.current = { x: e.clientX, y: e.clientY };

      // If lightbox modal is open, do not show preview cursor
      if (activeImageRef.current) {
        hideCursor();
        return;
      }

      // Check if the pointer target is strictly inside a .case__image-figure or .case__cover
      const target = (e.target as Element | null)?.closest?.('.case__image-figure, .case__cover');
      if (target && sectionRef.current?.contains(target)) {
        showCursor(e.clientX, e.clientY);
      } else {
        hideCursor();
      }
    };

    // When scrolling with wheel/touchpad, immediately update cursor visibility
    const handleScroll = () => {
      if (!lastPosRef.current || activeImageRef.current) {
        hideCursor();
        return;
      }
      const el = document.elementFromPoint(lastPosRef.current.x, lastPosRef.current.y);
      const target = el?.closest?.('.case__image-figure, .case__cover');
      if (target && sectionRef.current?.contains(target)) {
        showCursor(lastPosRef.current.x, lastPosRef.current.y);
      } else {
        hideCursor();
      }
    };

    const handleWindowBlur = () => {
      hideCursor();
    };

    const handleDocumentMouseLeave = () => {
      hideCursor();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('mouseleave', handleDocumentMouseLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('mouseleave', handleDocumentMouseLeave);
      hideCursor();
    };
  }, [caseStudy.id]);

  const currentIndex = CASE_STUDY_ORDER.indexOf(caseStudy.id);
  const prevIndex = (currentIndex - 1 + CASE_STUDY_ORDER.length) % CASE_STUDY_ORDER.length;
  const nextIndex = (currentIndex + 1) % CASE_STUDY_ORDER.length;

  const prevProject = CASE_STUDIES[CASE_STUDY_ORDER[prevIndex]];
  const nextProject = CASE_STUDIES[CASE_STUDY_ORDER[nextIndex]];

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="section case-study"
    >
      {/* Case Header */}
      <motion.div
        className="case__head"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="case__title">
          {caseStudy.title}
        </h1>
      </motion.div>

      {/* Cover Image */}
      <motion.div
        className="case__cover"
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => {
          setActiveImage({ url: caseStudy.coverImage, caption: caseStudy.title });
        }}
        style={{ cursor: 'zoom-in' }}
        role="button"
        tabIndex={0}
        aria-label={`Expand cover visual: ${caseStudy.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setActiveImage({ url: caseStudy.coverImage, caption: caseStudy.title });
          }
        }}
      >
        <img
          src={caseStudy.coverImage}
          alt={caseStudy.title}
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Case Study Detailed Body */}
      <div className="case__body">
        {caseStudy.sections && caseStudy.sections.length > 0 ? (
          caseStudy.sections.map((section, sIndex) => (
            <motion.section
              key={section.number || sIndex}
              className={`case__section ${section.hideBorderBottom ? 'case__section--no-border' : ''}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {section.title && (
                <div className="case__section-header">
                  <h4 className={`case__section-title ${section.isPrimaryTitle ? 'case__section-title--primary' : ''}`}>{section.title}</h4>
                </div>
              )}

              {/* Section Paragraphs */}
              {section.paragraphs && section.paragraphs.length > 0 && (
                <div className="case__section-paragraphs">
                  {renderParagraphs(section.paragraphs, !!section.primaryPointTitles)}
                </div>
              )}

              {/* Section Quotes / Key Problem Points */}
              {section.quotes && section.quotes.length > 0 && (
                <div className={`case__quotes ${section.hidePointIcons ? 'case__quotes--no-icon' : ''}`}>
                  {section.quotes.map((q, qIndex) => renderQuotePoint(q, qIndex, !!section.hidePointIcons, !!section.primaryPointTitles))}
                </div>
              )}

              {/* Section Callouts / Alert Component */}
              {section.callouts && section.callouts.length > 0 && (
                <div className="case__callouts">
                  {section.callouts.map((c, cIndex) => (
                    <aside key={cIndex} className="case__alert-box" role="note" aria-label="Information">
                      <div className="case__alert-icon" aria-hidden="true">
                        <Info size={16} strokeWidth={2} />
                      </div>
                      <div className="case__alert-content">
                        <p className="case__alert-text">{c.text}</p>
                      </div>
                    </aside>
                  ))}
                </div>
              )}

              {/* Section Lists */}
              {section.lists && section.lists.length > 0 && (
                <div className="case__lists">
                  {section.lists.map((lst, lIndex) => (
                    lst.type === 'number' ? (
                      <ol key={lIndex} className="case__numbered-list">
                        {lst.items.map((item, iIndex) => (
                          <li key={iIndex}>{item}</li>
                        ))}
                      </ol>
                    ) : (
                      <ul key={lIndex} className="case__bulleted-list">
                        {lst.items.map((item, iIndex) => (
                          <li key={iIndex}>{item}</li>
                        ))}
                      </ul>
                    )
                  ))}
                </div>
              )}

              {/* Section Figures & Visuals (rendered before points if imagesBeforePoints is true) */}
              {section.imagesBeforePoints && section.images && section.images.length > 0 && (
                <div className={`case__section-images case__section-images--${section.imageLayout === 'vertical' ? 'vertical' : (section.images.length === 1 ? 'single' : 'grid')}`}>
                  {section.images.map((img, iIndex) => (
                    <CaseImageItem
                      key={iIndex}
                      img={img}
                      title={section.title || ''}
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

              {/* How Might We Cards */}
              {section.howMightWe && section.howMightWe.length > 0 && (
                <div
                  className="case__hmw-grid"
                  role="list"
                  aria-label={section.title ? `${section.title} cards` : 'How Might We cards'}
                >
                  {section.howMightWe.map((hmw, hIndex) => (
                    <article key={hIndex} className="case__hmw-card" role="listitem">
                      <span className="case__hmw-number" aria-hidden="true">{hmw.number}</span>
                      <p className="case__hmw-text">{hmw.text}</p>
                    </article>
                  ))}
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
                  <div className={`case__section-images case__section-images--${section.imageLayout === 'vertical' ? 'vertical' : (section.images.length === 1 ? 'single' : 'grid')}`}>
                    {section.images.map((img, iIndex) => (
                      <CaseImageItem
                        key={iIndex}
                        img={img}
                        title={section.title || ''}
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
                  {renderParagraphs(section.afterImageParagraphs, !!section.primaryPointTitles)}
                </div>
              )}

              {/* Section Lists (rendered below image paragraphs) */}
              {section.afterImageLists && section.afterImageLists.length > 0 && (
                <div className="case__lists case__lists--after-image">
                  {section.afterImageLists.map((lst, lIndex) => (
                    lst.type === 'number' ? (
                      <ol key={lIndex} className="case__numbered-list">
                        {lst.items.map((item, iIndex) => (
                          <li key={iIndex}>{item}</li>
                        ))}
                      </ol>
                    ) : (
                      <ul key={lIndex} className="case__bulleted-list">
                        {lst.items.map((item, iIndex) => (
                          <li key={iIndex}>{item}</li>
                        ))}
                      </ul>
                    )
                  ))}
                </div>
              )}

              {/* Section Points / Quotes (rendered below image paragraphs) */}
              {section.afterImageQuotes && section.afterImageQuotes.length > 0 && (
                <div className={`case__quotes case__quotes--sub-points ${section.hidePointIcons ? 'case__quotes--no-icon' : ''}`}>
                  {section.afterImageQuotes.map((q, qIndex) => renderQuotePoint(q, qIndex, !!section.hidePointIcons, !!section.primaryPointTitles))}
                </div>
              )}

              {/* Section Figures & Visuals (rendered below afterImage content) */}
              {section.afterImages && section.afterImages.length > 0 && (
                <div className={`case__section-images case__section-images--${section.imageLayout === 'vertical' ? 'vertical' : (section.afterImages.length === 1 ? 'single' : 'grid')}`}>
                  {section.afterImages.map((img, iIndex) => (
                    <CaseImageItem
                      key={iIndex}
                      img={img}
                      title={section.title || ''}
                      index={iIndex}
                      onExpand={setActiveImage}
                    />
                  ))}
                </div>
              )}

              {/* Section Video(s) */}
              {section.video && !section.videos && (
                <div className="case__section-video-wrapper">
                  <CaseVideoPlayer video={section.video} />
                </div>
              )}
              {section.videos && section.videos.length > 0 && (
                <div className="case__section-videos-list">
                  {section.videos.map((vid, vIdx) => (
                    <div key={vIdx} className="case__section-video-wrapper">
                      <CaseVideoPlayer video={vid} />
                    </div>
                  ))}
                </div>
              )}

              {/* Sub-sections (H3 from Notion) */}
              {section.subSections && section.subSections.length > 0 && (
                <div className="case__subsections">
                  {section.subSections.map((sub, subIndex) => (
                    <div key={subIndex} className="case__subsection">
                      {sub.title && (
                        <h5 className={`case__subsection-title ${sub.isPrimaryTitle ? 'case__subsection-title--primary' : ''}`}>{sub.title}</h5>
                      )}
                      {sub.paragraphs && sub.paragraphs.length > 0 && (
                        <div className="case__section-paragraphs">
                          {renderParagraphs(sub.paragraphs, !!sub.primaryPointTitles)}
                        </div>
                      )}
                      {sub.quotes && sub.quotes.length > 0 && (
                        <div className={`case__quotes ${sub.hidePointIcons ? 'case__quotes--no-icon' : ''}`}>
                          {sub.quotes.map((q, qIndex) => renderQuotePoint(q, qIndex, !!sub.hidePointIcons, !!sub.primaryPointTitles))}
                        </div>
                      )}
                      {sub.howMightWe && sub.howMightWe.length > 0 && (
                        <div
                          className="case__hmw-grid"
                          role="list"
                          aria-label={sub.title ? `${sub.title} cards` : 'How Might We cards'}
                        >
                          {sub.howMightWe.map((hmw, hIndex) => (
                            <article key={hIndex} className="case__hmw-card" role="listitem">
                              <span className="case__hmw-number" aria-hidden="true">{hmw.number}</span>
                              <p className="case__hmw-text">{hmw.text}</p>
                            </article>
                          ))}
                        </div>
                      )}
                      {sub.callouts && sub.callouts.length > 0 && (
                        <div className="case__callouts">
                          {sub.callouts.map((c, cIndex) => (
                            <aside key={cIndex} className="case__alert-box" role="note" aria-label="Information">
                              <div className="case__alert-icon" aria-hidden="true">
                                <Info size={16} strokeWidth={2} />
                              </div>
                              <div className="case__alert-content">
                                <p className="case__alert-text">{c.text}</p>
                              </div>
                            </aside>
                          ))}
                        </div>
                      )}
                      {sub.lists && sub.lists.length > 0 && (
                        <div className="case__lists">
                          {sub.lists.map((lst, lIndex) => (
                            lst.type === 'number' ? (
                              <ol key={lIndex} className="case__numbered-list">
                                {lst.items.map((item, iIndex) => (
                                  <li key={iIndex}>{item}</li>
                                ))}
                              </ol>
                            ) : (
                              <ul key={lIndex} className="case__bulleted-list">
                                {lst.items.map((item, iIndex) => (
                                  <li key={iIndex}>{item}</li>
                                ))}
                              </ul>
                            )
                          ))}
                        </div>
                      )}
                      {sub.images && sub.images.length > 0 && (
                        <div className={`case__section-images case__section-images--${sub.imageLayout === 'vertical' ? 'vertical' : (sub.images.length === 1 ? 'single' : 'grid')}`}>
                          {sub.images.map((img, iIndex) => (
                            <CaseImageItem
                              key={iIndex}
                              img={img}
                              title={sub.title || ''}
                              index={iIndex}
                              onExpand={setActiveImage}
                            />
                          ))}
                        </div>
                      )}
                      {/* Sub-section Paragraphs (rendered below image) */}
                      {sub.afterImageParagraphs && sub.afterImageParagraphs.length > 0 && (
                        <div className="case__section-paragraphs case__section-paragraphs--after-image">
                          {renderParagraphs(sub.afterImageParagraphs, !!sub.primaryPointTitles)}
                        </div>
                      )}
                      {/* Sub-section Images (rendered below afterImageParagraphs) */}
                      {sub.afterImages && sub.afterImages.length > 0 && (
                        <div className={`case__section-images case__section-images--${sub.imageLayout === 'vertical' ? 'vertical' : (sub.afterImages.length === 1 ? 'single' : 'grid')}`}>
                          {sub.afterImages.map((img, iIndex) => (
                            <CaseImageItem
                              key={iIndex}
                              img={img}
                              title={sub.title || ''}
                              index={iIndex}
                              onExpand={setActiveImage}
                            />
                          ))}
                        </div>
                      )}
                      {/* Sub-section Blocks */}
                      {sub.blocks && sub.blocks.length > 0 && (
                        <div className="case__sub-blocks">
                          {sub.blocks.map((block, bIndex) => (
                            <div key={bIndex} className="case__sub-block">
                              {block.title && (
                                <h6 className={`case__sub-block-title ${block.isPrimaryTitle ? 'case__sub-block-title--primary' : ''}`}>
                                  {block.title}
                                </h6>
                              )}
                              {block.paragraphs && block.paragraphs.length > 0 && (
                                <div className="case__section-paragraphs">
                                  {renderParagraphs(block.paragraphs, false)}
                                </div>
                              )}
                              {block.images && block.images.length > 0 && (
                                <div className="case__section-images case__section-images--vertical">
                                  {block.images.map((img, iIndex) => (
                                    <CaseImageItem
                                      key={iIndex}
                                      img={img}
                                      title={block.title || sub.title || ''}
                                      index={iIndex}
                                      onExpand={setActiveImage}
                                    />
                                  ))}
                                </div>
                              )}
                              {block.afterImageParagraphs && block.afterImageParagraphs.length > 0 && (
                                <div className="case__section-paragraphs case__section-paragraphs--after-image">
                                  {renderParagraphs(block.afterImageParagraphs, false)}
                                </div>
                              )}
                              {block.afterImages && block.afterImages.length > 0 && (
                                <div className="case__section-images case__section-images--vertical">
                                  {block.afterImages.map((img, iIndex) => (
                                    <CaseImageItem
                                      key={iIndex}
                                      img={img}
                                      title={block.title || sub.title || ''}
                                      index={iIndex}
                                      onExpand={setActiveImage}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Sub-section Quotes (rendered below image) */}
                      {sub.afterImageQuotes && sub.afterImageQuotes.length > 0 && (
                        <div className="case__quotes case__quotes--sub-points">
                          {sub.afterImageQuotes.map((q, qIndex) => renderQuotePoint(q, qIndex, !!sub.hidePointIcons, !!sub.primaryPointTitles))}
                        </div>
                      )}
                      {/* Sub-section Custom Variant */}
                      {sub.customVariant === 'inconsistency-cards' && (
                        <InconsistencyCards
                          onExpand={(url, caption) =>
                            setActiveImage({
                              url: url || '/assets/projects/doku/doku-product-inconsistency-breakdown.png',
                              caption: caption || 'Cross-Product Inconsistency Breakdown'
                            })
                          }
                        />
                      )}
                      {/* Sub-section Video (rendered below relocated description) */}
                      {sub.video && !sub.videos && (
                        <div className="case__section-video-wrapper">
                          <CaseVideoPlayer video={sub.video} />
                        </div>
                      )}
                      {sub.videos && sub.videos.length > 0 && (
                        <div className="case__section-videos-list">
                          {sub.videos.map((vid, vIndex) => (
                            <div key={vIndex} className="case__section-video-wrapper">
                              <CaseVideoPlayer video={vid} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
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

            {caseStudy.problem && (
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
            )}

            {caseStudy.solution && (
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
            )}
          </>
        )}

        {/* Coming Soon Project Banner */}
        {caseStudy.isComingSoon && (
          <motion.div
            className="case__coming-soon-banner"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="case__coming-soon-badge">🚀 In Development</span>
            <h3 className="case__coming-soon-title">Coming Soon Project</h3>
            <p className="case__coming-soon-desc">
              This case study is currently being documented and prepared for showcase. Stay tuned for the complete visual breakdown!
            </p>
          </motion.div>
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
            {caseStudy.lessonLearned.paragraphs && caseStudy.lessonLearned.paragraphs.length > 0 ? (
              <div className="case__lesson-paragraphs">
                {caseStudy.lessonLearned.paragraphs.map((para, pIndex) => (
                  <p key={pIndex} className="case__lesson-text">{para}</p>
                ))}
              </div>
            ) : caseStudy.lessonLearned.text ? (
              <div className="case__lesson-paragraphs">
                {caseStudy.lessonLearned.text.split(/\n\n+/).map((para, pIndex) => (
                  <p key={pIndex} className="case__lesson-text">{para}</p>
                ))}
              </div>
            ) : null}
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
            className={`case__lightbox ${isZoomed ? 'case__lightbox--zoomed' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setActiveImage(null);
              setIsZoomed(false);
            }}
          >
            {/* Top Lightbox Actions */}
            <div className="case__lightbox-toolbar" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="case__lightbox-zoom-btn"
                onClick={() => setIsZoomed((prev) => !prev)}
                aria-label={isZoomed ? "Fit to screen" : "View 100% actual size"}
                title={isZoomed ? "Fit to screen" : "View 100% actual size"}
              >
                {isZoomed ? <ZoomOut size={15} /> : <ZoomIn size={15} />}
                <span>{isZoomed ? 'Fit to Screen' : '100% Actual Size'}</span>
              </button>

              <button
                type="button"
                className="case__lightbox-close"
                onClick={() => {
                  setActiveImage(null);
                  setIsZoomed(false);
                }}
                aria-label="Close image preview"
                title="Close (Esc)"
              >
                <X size={20} strokeWidth={2.2} />
              </button>
            </div>

            <motion.div
              className={`case__lightbox-dialog ${isZoomed ? 'case__lightbox-dialog--zoomed' : ''}`}
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeImage.url}
                alt={activeImage.caption || 'Project visual'}
                referrerPolicy="no-referrer"
                className={`case__lightbox-img ${isZoomed ? 'case__lightbox-img--zoomed' : ''}`}
                onClick={() => setIsZoomed((prev) => !prev)}
                title={isZoomed ? 'Click to fit to screen' : 'Click to view 100% full details'}
              />
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

      {/* Floating Custom Cursor Pill for Image Preview with Glassmorphism & Zoom-In */}
      <div
        ref={cursorRef}
        className="case__preview-cursor"
        aria-hidden="true"
      >
        <div className="case__preview-cursor-glass">
          <span className="case__preview-cursor-icon">
            <ZoomIn size={15} strokeWidth={2.4} />
          </span>
          <span className="case__preview-cursor-text">preview image</span>
        </div>
      </div>
    </section>
  );
}
