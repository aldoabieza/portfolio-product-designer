import { useEffect } from 'react';

export default function Spotlight() {
  useEffect(() => {
    // Only on pointer-capable screens (desktop / laptop)
    if (window.matchMedia('(pointer: fine)').matches) {
      const handleMouseMove = (e: MouseEvent) => {
        document.documentElement.style.setProperty('--x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--y', `${e.clientY}px`);
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return <div className="spotlight" aria-hidden="true" />;
}
