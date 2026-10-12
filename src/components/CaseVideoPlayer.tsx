import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { CaseStudyVideo } from '../types';

interface CaseVideoPlayerProps {
  video: CaseStudyVideo;
  hideHeader?: boolean;
}

export const CaseVideoPlayer: React.FC<CaseVideoPlayerProps> = ({ video, hideHeader = false }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const activeUrl = video.url;

  // Guarantee continuous looping, reliable loading, and autoplay without freezing
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // Strict muted setup required by modern browsers for autoplay
    el.defaultMuted = true;
    el.muted = true;
    el.playsInline = true;

    const playVideo = () => {
      if (el.paused) {
        const p = el.play();
        if (p !== undefined) {
          p.then(() => {
            setIsPlaying(true);
            setHasStarted(true);
          }).catch(() => {
            setIsPlaying(false);
          });
        }
      }
    };

    if (el.readyState >= 2) {
      playVideo();
    } else {
      el.addEventListener('canplay', playVideo, { once: true });
    }

    // Intersection observer ensures playback whenever user scrolls into this section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideo();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      el.removeEventListener('canplay', playVideo);
      observer.disconnect();
    };
  }, [activeUrl]);

  const handleTimeUpdate = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    if (videoRef.current && videoRef.current.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch(() => {});
    }
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      const p = el.play();
      if (p !== undefined) {
        p.then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        }).catch(() => {});
      }
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const handleRestart = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    const p = el.play();
    if (p !== undefined) {
      p.then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch(() => {});
    }
  };

  const isEmbed =
    activeUrl.includes('youtube.com') ||
    activeUrl.includes('youtu.be') ||
    activeUrl.includes('loom.com') ||
    activeUrl.includes('jam.dev') ||
    activeUrl.includes('drive.google.com') ||
    activeUrl.includes('vimeo.com');

  const getEmbedUrl = (url: string) => {
    if (url.includes('loom.com/share/')) {
      return url.replace('loom.com/share/', 'loom.com/embed/');
    }
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'www.youtube.com/embed/');
    }
    if (url.includes('drive.google.com')) {
      const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
      return url.replace(/\/view(\?.*)?$/, '/preview');
    }
    if (url.includes('vimeo.com/') && !url.includes('player.vimeo.com')) {
      const id = url.split('vimeo.com/')[1]?.split(/[?#/]/)[0];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
    return url;
  };

  const webmUrl = activeUrl.endsWith('.mp4')
    ? activeUrl.replace(/\.mp4$/, '.webm')
    : undefined;

  return (
    <figure className="case__video-figure">
      {!hideHeader && (video.label || (video.title && video.title !== video.label)) && (
        <div className="case__video-header">
          {video.label && (
            <span
              className={`case__video-label-badge case__video-label-badge--${video.label
                .toLowerCase()
                .replace(/\s+/g, '-')}`}
            >
              <span className="case__video-label-dot" />
              {video.label}
            </span>
          )}
          {video.title && video.title !== video.label && (
            <h5 className="case__video-header-title">{video.title}</h5>
          )}
        </div>
      )}

      <div
        className="case__video-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isEmbed ? (
          <iframe
            src={getEmbedUrl(activeUrl)}
            title={video.title || 'Video Player'}
            className="w-full aspect-video border-0 block"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <video
              ref={videoRef}
              src={activeUrl}
              poster={video.poster}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
              onPlay={() => {
                setIsPlaying(true);
                setHasStarted(true);
              }}
              onPause={() => setIsPlaying(false)}
              className="case__video-element"
              onClick={togglePlay}
              aria-label={video.caption || video.title || 'Product interaction demo video'}
            />

            {/* Bottom Control Bar */}
            <div className={`case__video-controls ${isHovered ? 'case__video-controls--visible' : ''}`}>
              <div className="case__video-progress-bar" aria-hidden="true">
                <div
                  className="case__video-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="case__video-controls-row">
                <div className="case__video-controls-left">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="case__video-btn"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                  </button>
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="case__video-btn"
                    aria-label="Restart video from beginning"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {video.caption && (
        <figcaption className="case__image-caption case__video-caption">
          <span className="case__video-caption-text">{video.caption}</span>
        </figcaption>
      )}
    </figure>
  );
};
