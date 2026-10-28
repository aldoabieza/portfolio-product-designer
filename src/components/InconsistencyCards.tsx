import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { CaseVideoPlayer } from './CaseVideoPlayer';

interface InconsistencyCardsProps {
  onExpand?: (imageUrl: string, caption?: string) => void;
}

type TabType = 'foundation' | 'behaviour';
type DesignerId = 'card-1' | 'card-2';

interface DesignerData {
  id: DesignerId;
  label: string;
  description: string;
  caption: string;
  imageSrc: string;
  videoSrc: string;
}

const DESIGNERS: DesignerData[] = [
  {
    id: 'card-1',
    label: 'Designer 1',
    description:
      'First designer have approach to designing foundation of the child menu, and design the behaviour for user navigation return to parent menu using the breadcrumb.',
    caption: 'Detail Page: Without Return Navigation (Checkout Page Configuration)',
    imageSrc: '/assets/projects/doku/screenshot-1-checkout.png',
    videoSrc: '/assets/projects/doku/doku-component-1-without-return.mp4'
  },
  {
    id: 'card-2',
    label: 'Designer 2',
    description:
      'Second designer have different approach to designing the behaviour for user navigation return by close button',
    caption: 'Detail Page: With Return Navigation (Payment Link Settings)',
    imageSrc: '/assets/projects/doku/screenshot-2-payment-link.png',
    videoSrc: '/assets/projects/doku/doku-component-2-with-return.mp4'
  }
];

export function InconsistencyCards({ onExpand }: InconsistencyCardsProps) {
  // Which parent menu accordion is currently open (Designer 1 is open by default)
  const [openDesigner, setOpenDesigner] = useState<DesignerId | null>('card-1');

  // Which designer and child menu is currently selected / active
  const [selectedDesigner, setSelectedDesigner] = useState<DesignerId>('card-1');
  const [selectedTab, setSelectedTab] = useState<TabType>('foundation');

  const currentDesigner =
    DESIGNERS.find((d) => d.id === selectedDesigner) || DESIGNERS[0];

  const storageKey = `custom_foundation_image_${currentDesigner.id}`;
  const customImage = (() => {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  })();

  const activeImageSrc = customImage || currentDesigner.imageSrc;

  const handleSelectSubTab = (designerId: DesignerId, tab: TabType) => {
    setSelectedDesigner(designerId);
    setSelectedTab(tab);
  };

  const handleToggleDesigner = (designerId: DesignerId) => {
    if (openDesigner === designerId) {
      setOpenDesigner(null);
    } else {
      // 1. When user clicks Designer 2, Designer 1 collapses and Designer 2 expands
      // 2. The right panel content continues showing the currently active view (e.g. Designer 1 Foundation)
      //    until the user explicitly selects a child menu in Designer 2
      setOpenDesigner(designerId);
    }
  };

  return (
    <div className="inconsistency-merged">
      {/* LEFT: Accordion Parent & Sub Menu */}
      <div className="inconsistency-menu-card" role="tablist" aria-label="Design Inconsistency Switcher">
        {DESIGNERS.map((designer, index) => {
          const isOpen = openDesigner === designer.id;
          const isSelected = selectedDesigner === designer.id;

          return (
            <React.Fragment key={designer.id}>
              {index > 0 && <div className="inconsistency-menu-divider" />}
              <div className="inconsistency-menu-group">
                {/* Parent Menu Header */}
                <button
                  type="button"
                  onClick={() => handleToggleDesigner(designer.id)}
                  className={`inconsistency-menu-header ${isOpen ? 'inconsistency-menu-header--active' : ''}`}
                  aria-expanded={isOpen}
                >
                  <span className="inconsistency-menu-title">{designer.label}</span>
                  <ChevronDown
                    className={`inconsistency-menu-chevron ${isOpen ? 'inconsistency-menu-chevron--open' : ''}`}
                    aria-hidden="true"
                  />
                </button>

                {/* Sub-menu (Foundation / Behaviour) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="inconsistency-menu-subitems">
                        {/* Foundation Sub-tab */}
                        <button
                          type="button"
                          role="tab"
                          aria-selected={isOpen && isSelected && selectedTab === 'foundation'}
                          onClick={() => handleSelectSubTab(designer.id, 'foundation')}
                          className={`inconsistency-menu-subitem ${
                            isOpen && isSelected && selectedTab === 'foundation'
                              ? 'inconsistency-menu-subitem--active'
                              : ''
                          }`}
                        >
                          {isOpen && isSelected && selectedTab === 'foundation' && (
                            <span className="inconsistency-menu-indicator" aria-hidden="true" />
                          )}
                          <span className="inconsistency-menu-subitem-label">Foundation</span>
                        </button>

                        {/* Behaviour Sub-tab */}
                        <button
                          type="button"
                          role="tab"
                          aria-selected={isOpen && isSelected && selectedTab === 'behaviour'}
                          onClick={() => handleSelectSubTab(designer.id, 'behaviour')}
                          className={`inconsistency-menu-subitem ${
                            isOpen && isSelected && selectedTab === 'behaviour'
                              ? 'inconsistency-menu-subitem--active'
                              : ''
                          }`}
                        >
                          {isOpen && isSelected && selectedTab === 'behaviour' && (
                            <span className="inconsistency-menu-indicator" aria-hidden="true" />
                          )}
                          <span className="inconsistency-menu-subitem-label">Behaviour</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* RIGHT: Description & Visual Content */}
      <div className="inconsistency-merged__content">
        {/* Description text on top */}
        <p className="inconsistency-merged__desc">
          {currentDesigner.description}
        </p>

        {/* Visual Frame */}
        <div className="inconsistency-merged__visual">
          <AnimatePresence mode="wait">
            {selectedTab === 'foundation' ? (
              <motion.div
                key={`${selectedDesigner}-foundation`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                <figure
                  className="case__image-figure !m-0 !p-0 cursor-zoom-in"
                  role="button"
                  tabIndex={0}
                  aria-label={`Expand visual: ${currentDesigner.caption}`}
                  onClick={() => onExpand?.(activeImageSrc, currentDesigner.caption)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onExpand?.(activeImageSrc, currentDesigner.caption);
                    }
                  }}
                >
                  <div className="case__image-container">
                    <InconsistencyImage
                      src={activeImageSrc}
                      alt={currentDesigner.caption}
                    />
                  </div>
                </figure>
              </motion.div>
            ) : (
              <motion.div
                key={`${selectedDesigner}-behaviour`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                <BehaviourVideoSection designer={currentDesigner} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------------
// INCONSISTENCY IMAGE WITH FALLBACK
// ----------------------------------------------------------------------------------
function InconsistencyImage({
  src,
  alt
}: {
  src: string;
  alt: string;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  const handleError = () => {
    if (src.includes('checkout') || src.includes('10.35.13')) {
      setCurrentSrc('/assets/projects/doku/Screenshot%202026-09-22%20at%2010.35.13.png');
    } else if (src.includes('payment-link') || src.includes('10.43.25')) {
      setCurrentSrc('/assets/projects/doku/Screenshot%202026-09-22%20at%2010.43.25.png');
    } else {
      setCurrentSrc(encodeURI(src));
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="lazy"
      className="case__image"
      onError={handleError}
    />
  );
}

// ----------------------------------------------------------------------------------
// BEHAVIOUR VIDEO SECTION
// ----------------------------------------------------------------------------------
function BehaviourVideoSection({ designer }: { designer: DesignerData }) {
  const videoData = {
    title:
      designer.id === 'card-1'
        ? 'Checkout Page Configuration (Detail Page)'
        : 'Payment Link Settings Modal (Detail Page)',
    label: designer.id === 'card-1' ? 'Without Return Nav' : 'With Return Nav',
    url: designer.videoSrc,
    poster:
      designer.id === 'card-1'
        ? '/assets/projects/doku/doku-component-1-poster.webp'
        : '/assets/projects/doku/doku-component-2-poster.webp',
    caption:
      designer.id === 'card-1'
        ? 'Walkthrough perilaku interaksi: Halaman konfigurasi checkout tidak menyediakan kontrol navigasi kembali di header sehingga pengguna terpaksa mencari dan mengklik breadcrumb "Settings".'
        : 'Walkthrough perilaku interaksi: Modal konfigurasi Payment Link menyediakan kontrol navigasi kembali eksplisit berupa tombol silang (X) di pojok header untuk menutup dan kembali ke daftar.'
  };

  return (
    <div className="flex flex-col w-full">
      <div className="case__section-video-wrapper !mt-0 !border-0">
        <CaseVideoPlayer video={videoData} hideHeader />
      </div>
    </div>
  );
}
