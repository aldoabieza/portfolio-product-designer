import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, ZoomOut, X } from 'lucide-react';

export interface BentoPhoto {
  id: string;
  imageUrl: string;
  alt: string;
  colSpan: 'wide' | 'narrow';
  bgTone?: string;
  objectFit?: 'cover' | 'contain';
  objectPosition?: string;
}

export const BENTO_PHOTOS: BentoPhoto[] = [
  {
    id: 'photo-1',
    imageUrl: '/assets/aistudio/illustration_aldo_ceba0920.webp',
    alt: 'Character Vector Illustration',
    colSpan: 'wide',
    objectFit: 'cover',
    objectPosition: 'center 35%'
  },
  {
    id: 'photo-2',
    imageUrl: '/assets/aistudio/original-d091b048d60984e8e988dcd3af652d90_ac246c11.webp',
    alt: 'NFT Mobile App Design Concept',
    colSpan: 'narrow',
    objectFit: 'cover',
    objectPosition: 'top center'
  },
  {
    id: 'photo-3',
    imageUrl: '/assets/aistudio/eksplorasicon2_d2a06aae.png',
    alt: 'Custom Iconography System Exploration',
    colSpan: 'narrow',
    bgTone: '#FFF2F2',
    objectFit: 'contain',
    objectPosition: 'center center'
  },
  {
    id: 'photo-4',
    imageUrl: '/assets/aistudio/original-c440fccf8a1b0f9ddad2dbb3986573bf_65cf09ca.webp',
    alt: 'Health & Task Management Ecosystem Screens',
    colSpan: 'wide',
    objectFit: 'cover',
    objectPosition: 'center center'
  }
];

interface BentoGalleryProps {
  photos?: BentoPhoto[];
}

export function BentoGallery({ photos = BENTO_PHOTOS }: BentoGalleryProps) {
  const [activePhoto, setActivePhoto] = useState<BentoPhoto | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activePhotoRef = useRef<BentoPhoto | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  activePhotoRef.current = activePhoto;

  const hideCursor = () => {
    if (cursorRef.current) {
      cursorRef.current.classList.remove('bento-preview-cursor--visible');
    }
  };

  const showCursor = (x: number, y: number) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      cursorRef.current.classList.add('bento-preview-cursor--visible');
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
      // Ignore touch devices
      if (e.pointerType === 'touch') {
        hideCursor();
        return;
      }

      lastPosRef.current = { x: e.clientX, y: e.clientY };

      // If lightbox is open, hide custom cursor
      if (activePhotoRef.current) {
        hideCursor();
        return;
      }

      const target = (e.target as Element | null)?.closest?.('.bento-photo-card');
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
      const target = el?.closest?.('.bento-photo-card');
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
    <div className="bento-photo-gallery" ref={containerRef}>
      {/* Pure Image Bento Grid: Only images provided by the user */}
      <div
        className="bento-photo-grid"
        role="region"
        aria-label="Photo Bento Gallery"
      >
        {photos.map((photo, index) => {
          const isWide = photo.colSpan === 'wide';

          return (
            <motion.div
              key={photo.id}
              className={`bento-photo-card ${
                isWide ? 'bento-photo-card--wide' : 'bento-photo-card--narrow'
              }`}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
              onClick={() => setActivePhoto(photo)}
              role="button"
              tabIndex={0}
              aria-label={`View photo ${index + 1} in full resolution`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePhoto(photo);
                }
              }}
            >
              <div
                className="bento-photo-card__frame"
                style={{ backgroundColor: photo.bgTone || '#0B0D0F' }}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.alt}
                  className={`bento-photo-card__img ${
                    photo.objectFit === 'contain'
                      ? 'bento-photo-card__img--contain'
                      : 'bento-photo-card__img--cover'
                  }`}
                  style={{
                    objectPosition: photo.objectPosition || 'center center'
                  }}
                  loading="lazy"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Custom Cursor Pill for Image Preview with Glassmorphism & "See Details" Copy */}
      <div
        ref={cursorRef}
        className="bento-preview-cursor"
        aria-hidden="true"
      >
        <div className="bento-preview-cursor-glass">
          <span className="bento-preview-cursor-icon">
            <ZoomIn size={15} strokeWidth={2.4} />
          </span>
          <span className="bento-preview-cursor-text">See Details</span>
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
            aria-label="Photo full preview"
          >
            {/* Top Minimalist Controls Toolbar */}
            <div
              className="bento-photo-lightbox__toolbar"
              onClick={(e) => e.stopPropagation()}
            >
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
                style={{
                  backgroundColor: activePhoto.bgTone || 'transparent'
                }}
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

export default BentoGallery;
