import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';

export interface SmartImageProps extends React.ComponentPropsWithoutRef<'img'> {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  reloadDescription?: string;
  maxAutoRetries?: number;
  timeoutMs?: number;
  showReloadPrompt?: boolean;
  loading?: 'lazy' | 'eager';
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export function SmartImage({
  src,
  alt,
  className = '',
  style = {},
  containerClassName = '',
  containerStyle = {},
  objectFit,
  objectPosition,
  reloadDescription = 'Reload image',
  maxAutoRetries = 2,
  timeoutMs = 20000,
  showReloadPrompt = true,
  onLoad,
  onError,
  ...rest
}: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [autoRetryCount, setAutoRetryCount] = useState<number>(0);
  const [isManualRetrying, setIsManualRetrying] = useState<boolean>(false);
  const [isFreshlyLoaded, setIsFreshlyLoaded] = useState<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Fallback URL generator for different common path variations & extensions
  const getAlternativeUrl = useCallback((originalUrl: string, retryIdx: number): string | null => {
    try {
      const cleanUrl = originalUrl.split('?')[0];
      const filename = decodeURIComponent(cleanUrl.split('/').pop() || '');
      const dir = cleanUrl.substring(0, cleanUrl.lastIndexOf('/'));
      const ext = filename.split('.').pop()?.toLowerCase();
      const baseName = filename.replace(/\.[^/.]+$/, '');

      // 1. If filename has a hash suffix like IMG_3418_ac1eb977, try clean base without hash: IMG_3418
      const hashMatch = baseName.match(/^(IMG_\d+)(_[a-z0-9]+)$/i);
      if (retryIdx === 0 && hashMatch) {
        return `${dir}/${hashMatch[1]}.${ext}`;
      }

      // 2. Try _opt variant or remove _opt
      if (retryIdx === 1) {
        if (baseName.endsWith('_opt')) {
          return `${dir}/${baseName.replace('_opt', '')}.${ext}`;
        }
        return `${dir}/${baseName}_opt.${ext}`;
      }

      // 3. Alternative extensions: webp <-> png <-> jpg
      const altExts = ['png', 'jpg', 'jpeg', 'webp'].filter((e) => e !== ext);
      const extIndex = retryIdx - 2;
      if (extIndex >= 0 && extIndex < altExts.length) {
        return `${dir}/${baseName}.${altExts[extIndex]}`;
      }

      // 4. Cache-buster query param as last automated resort
      return `${cleanUrl}?retry=${Date.now()}`;
    } catch {
      return null;
    }
  }, []);

  // Sync when prop src changes
  useEffect(() => {
    setCurrentSrc(src);
    setStatus('loading');
    setAutoRetryCount(0);
    setIsManualRetrying(false);
    setIsFreshlyLoaded(false);
  }, [src]);

  // Handle timeout detection
  useEffect(() => {
    if (status === 'loading' && timeoutMs > 0) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (status === 'loading') {
          if (autoRetryCount < maxAutoRetries) {
            const nextUrl = getAlternativeUrl(src, autoRetryCount);
            if (nextUrl) {
              setAutoRetryCount((prev) => prev + 1);
              setCurrentSrc(nextUrl);
              return;
            }
          }
          setStatus('error');
        }
      }, timeoutMs);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [status, timeoutMs, autoRetryCount, maxAutoRetries, src, getAlternativeUrl]);

  // Online listener to automatically retry failed images when network reconnects
  useEffect(() => {
    const handleOnline = () => {
      if (status === 'error') {
        handleManualRetry();
      }
    };
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [status]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setStatus('loaded');
    setIsManualRetrying(false);
    onLoad?.(e);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Try automated fallbacks first
    if (autoRetryCount < maxAutoRetries) {
      const nextUrl = getAlternativeUrl(src, autoRetryCount);
      if (nextUrl && nextUrl !== currentSrc) {
        setAutoRetryCount((prev) => prev + 1);
        setCurrentSrc(nextUrl);
        return;
      }
    }

    // After automated retries exhausted, show reload UI
    setStatus('error');
    setIsManualRetrying(false);
    onError?.(e);
  };

  // Manual Reload with interaction feedback and image preload animation
  const handleManualRetry = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isManualRetrying) return;

    setIsManualRetrying(true);
    setAutoRetryCount(0);

    const cleanUrl = src.split('?')[0];
    const timestampUrl = `${cleanUrl}?t=${Date.now()}`;

    // Preload image in memory with tactile feedback delay
    const preloadImage = (targetUrl: string, fallbackUrl?: string) => {
      const img = new Image();
      img.src = targetUrl;
      img.onload = () => {
        // Keep spin animation visible for ~400ms so user clearly perceives the reload interaction
        setTimeout(() => {
          setCurrentSrc(targetUrl);
          setStatus('loaded');
          setIsManualRetrying(false);
          setIsFreshlyLoaded(true);
          // Remove animation flag after animation completes
          setTimeout(() => setIsFreshlyLoaded(false), 900);
        }, 420);
      };
      img.onerror = () => {
        if (fallbackUrl) {
          preloadImage(fallbackUrl);
        } else {
          // If fallback fails, try unhashed clean name or opt
          const alt = getAlternativeUrl(src, 0);
          if (alt && alt !== targetUrl) {
            preloadImage(alt);
          } else {
            setTimeout(() => {
              setIsManualRetrying(false);
              setStatus('error');
            }, 450);
          }
        }
      };
    };

    preloadImage(timestampUrl, src);
  };

  // If in error state (or during manual retry while still showing prompt)
  if ((status === 'error' || isManualRetrying) && showReloadPrompt) {
    return (
      <div
        className={`smart-image-fallback ${isManualRetrying ? 'smart-image-fallback--retrying' : ''} ${containerClassName}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          minHeight: '140px',
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none',
          borderRadius: 'inherit',
          boxSizing: 'border-box',
          textAlign: 'center',
          color: '#FFFFFF',
          padding: '16px',
          ...containerStyle
        }}
        role="region"
        aria-label={`Image failed to load: ${alt}`}
      >
        <button
          type="button"
          onClick={handleManualRetry}
          disabled={isManualRetrying}
          className={`smart-image-reload-btn ${isManualRetrying ? 'is-retrying' : ''}`}
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: 'transparent',
            border: 'none',
            borderRadius: '0',
            padding: '8px 12px',
            cursor: isManualRetrying ? 'default' : 'pointer',
            color: '#FFFFFF',
            boxShadow: 'none',
            outline: 'none',
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease'
          }}
          title="Click to reload image"
          aria-label={`Reload image ${alt}`}
        >
          {/* Reload icon 24px in pure white (#FFFFFF), spins on click/retry */}
          <RotateCcw
            size={24}
            className={`smart-image-reload-icon ${isManualRetrying ? 'is-spinning' : ''}`}
            style={{
              width: 24,
              height: 24,
              strokeWidth: 2.3,
              color: '#FFFFFF'
            }}
            aria-hidden="true"
          />

          {/* Description reload image in pure white (#FFFFFF) */}
          <span
            className="smart-image-reload-text"
            style={{
              fontFamily: 'var(--font-body, inherit)',
              fontSize: '13px',
              fontWeight: 500,
              lineHeight: 1.3,
              color: '#FFFFFF',
              letterSpacing: '0.01em'
            }}
          >
            {isManualRetrying ? 'Reloading...' : reloadDescription}
          </span>
        </button>
      </div>
    );
  }

  // Combined style for standard image element
  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(objectFit ? { objectFit } : {}),
    ...(objectPosition ? { objectPosition } : {})
  };

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      className={`${className} ${isFreshlyLoaded ? 'smart-image--reloaded' : ''}`.trim()}
      style={combinedStyle}
      onLoad={handleImageLoad}
      onError={handleImageError}
      {...rest}
    />
  );
}
