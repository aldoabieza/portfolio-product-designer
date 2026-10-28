import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, ZoomOut, X } from 'lucide-react';

export interface PhotoItem {
  id: string;
  imageUrl: string;
  alt: string;
  title: string;
  subtitle?: string;
  gridSpan?: string;
  rotation: number;
  objectPosition?: string;
}

export const PHOTOGRAPHY_ITEMS: PhotoItem[] = [
  {
    id: 'photo-1',
    imageUrl: '/assets/aistudio/IMG_2430_9240b802.jpg',
    alt: 'Da Vinci neoclassical architecture facade with rosette stained window and city red bus',
    title: 'Da Vinci',
    subtitle: 'Jakarta, Indonesia',
    gridSpan: 'wide',
    rotation: -1.2,
    objectPosition: 'center 40%'
  },
  {
    id: 'photo-2',
    imageUrl: '/assets/aistudio/IMG_0794_b2330370.jpg',
    alt: 'Traditional morning street market alleyway with golden atmospheric sunbeams',
    title: 'Morning Rays',
    subtitle: 'Pasar Pagi',
    gridSpan: 'narrow',
    rotation: 1.5,
    objectPosition: 'center center'
  },
  {
    id: 'photo-3',
    imageUrl: '/assets/aistudio/IMG_3418_ac1eb977.jpg',
    alt: 'Gelora Bung Karno stadium exterior with Indonesian red and white flag fluttering under blue sky',
    title: 'Gelora Bung Karno',
    subtitle: 'Senayan Stadium',
    gridSpan: 'narrow',
    rotation: -1.6,
    objectPosition: 'center center'
  },
  {
    id: 'photo-4',
    imageUrl: '/assets/aistudio/IMG_0357_9d5aaedf.jpg',
    alt: 'One Pacific Place and SCBD curved glass architectural towers towering toward blue sky',
    title: 'Pacific Place',
    subtitle: 'SCBD District',
    gridSpan: 'wide',
    rotation: 1.2,
    objectPosition: 'center 35%'
  },
  {
    id: 'photo-5',
    imageUrl: '/assets/aistudio/IMG_1323_151ee3e9.jpg',
    alt: 'Monochrome architectural shot of FWD high-rise skyscraper with overcast moody skies',
    title: 'FWD Tower',
    subtitle: 'Monochrome Series',
    gridSpan: 'half',
    rotation: -0.8,
    objectPosition: 'center center'
  },
  {
    id: 'photo-6',
    imageUrl: '/assets/aistudio/IMG_3145_a39121da.jpg',
    alt: 'Monochrome paved stone courtyard garden with tropical palms and peaceful architectural framing',
    title: 'Courtyard',
    subtitle: 'Quiet Corners',
    gridSpan: 'half',
    rotation: 1.4,
    objectPosition: 'center center'
  }
];

interface PhotographyGalleryProps {
  photos?: PhotoItem[];
}

export function PhotographyGallery({ photos = PHOTOGRAPHY_ITEMS }: PhotographyGalleryProps) {
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activePhotoRef = useRef<PhotoItem | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  activePhotoRef.current = activePhoto;

  const hideCursor = () => {
    if (cursorRef.current) {
      cursorRef.current.classList.remove('photo-preview-cursor--visible');
    }
  };

  const showCursor = (x: number, y: number) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      cursorRef.current.classList.add('photo-preview-cursor--visible');
    }
  };

  // Close on Escape key
  useEffect(() => {
    if (!activePhoto) return;
    hideCursor();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto]);

  // Lock scroll when lightbox is opened
  useEffect(() => {
    if (activePhoto) {
      document.body.style.overflow = 'hidden';
      setZoomLevel(1);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activePhoto]);

  // Smooth floating cursor matching CaseStudyView details portfolio image component
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        hideCursor();
        return;
      }

      lastPosRef.current = { x: e.clientX, y: e.clientY };

      if (activePhotoRef.current) {
        hideCursor();
        return;
      }

      const target = (e.target as Element | null)?.closest?.('.polaroid-bento-card');
      if (target && containerRef.current?.contains(target)) {
        showCursor(e.clientX, e.clientY);
      } else {
        hideCursor();
      }
    };

    const handleScroll = () => {
      if (!lastPosRef.current || activePhotoRef.current) {
        hideCursor();
        return;
      }
      const el = document.elementFromPoint(lastPosRef.current.x, lastPosRef.current.y);
      const target = el?.closest?.('.polaroid-bento-card');
      if (target && containerRef.current?.contains(target)) {
        showCursor(lastPosRef.current.x, lastPosRef.current.y);
      } else {
        hideCursor();
      }
    };

    const handleWindowBlur = () => hideCursor();
    const handleDocumentMouseLeave = () => hideCursor();

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
  }, []);

  return (
    <div className="photo-bento-section" ref={containerRef}>
      {/* Bento Layout Grid with Polaroid Instant Frames */}
      <div
        className="photo-bento-grid"
        role="region"
        aria-label="Photography Bento Collection"
      >
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            className={`polaroid-bento-card polaroid-bento-card--${photo.gridSpan || 'half'}`}
            initial={{ opacity: 0, y: 24, rotate: photo.rotation }}
            animate={{ opacity: 1, y: 0, rotate: photo.rotation }}
              whileHover={{
                rotate: 0,
                y: -6,
                scale: 1.015,
                transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1]
              }}
              onClick={() => setActivePhoto(photo)}
              role="button"
              tabIndex={0}
              aria-label={`View photo: ${photo.title} (${photo.alt})`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePhoto(photo);
                }
              }}
            >
              {/* Authentic Polaroid Frame with Inset Window & Bottom Chin */}
              <div className="polaroid-frame">
                {/* Image Window */}
                <div className="polaroid-frame__window">
                  <img
                    src={photo.imageUrl}
                    alt={photo.alt}
                    className="polaroid-frame__img"
                    style={{ objectPosition: photo.objectPosition || 'center center' }}
                    loading="lazy"
                  />
                  {/* Subtle photographic sheen reflection overlay */}
                  <div className="polaroid-frame__sheen" aria-hidden="true" />
                </div>

                {/* Polaroid Chin with Handwritten Title */}
                <div className="polaroid-frame__chin">
                  <span className="polaroid-frame__caption">{photo.title}</span>
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Floating Custom Cursor Pill for Image Preview with Glassmorphism & "See Details" Copy */}
      <div
        ref={cursorRef}
        className="photo-preview-cursor"
        aria-hidden="true"
      >
        <div className="photo-preview-cursor-glass">
          <span className="photo-preview-cursor-icon">
            <ZoomIn size={15} strokeWidth={2.4} />
          </span>
          <span className="photo-preview-cursor-text">See Details</span>
        </div>
      </div>

      {/* Full-resolution Lightbox Inspection Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            className="bento-photo-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setActivePhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${activePhoto.title} full view`}
          >
            {/* Top Minimalist Controls Toolbar */}
            <div
              className="bento-photo-lightbox__toolbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bento-photo-lightbox__title-meta">
                <span className="bento-photo-lightbox__photo-title">{activePhoto.title}</span>
                {activePhoto.subtitle && (
                  <span className="bento-photo-lightbox__photo-sub">{activePhoto.subtitle}</span>
                )}
              </div>

              <div className="bento-photo-lightbox__controls">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.25))}
                  className="bento-photo-lightbox__btn"
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <ZoomOut size={16} />
                </button>
                <span className="bento-photo-lightbox__zoom-indicator">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                  className="bento-photo-lightbox__btn"
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setActivePhoto(null)}
                  className="bento-photo-lightbox__btn bento-photo-lightbox__btn--close"
                  title="Close (Esc)"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Viewport Canvas */}
            <div
              className="bento-photo-lightbox__viewport"
              onClick={() => setActivePhoto(null)}
            >
              <motion.div
                className="bento-photo-lightbox__frame"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: zoomLevel, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.alt}
                  className="bento-photo-lightbox__img"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PhotographyGallery;
