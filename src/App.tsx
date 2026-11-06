/**
 * Aldo Abieza — Product Designer Portfolio
 * Modern portfolio layout with interactive views, rich parallax scroll
 * on long content sections, and live Jakarta time.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewType } from './types';
import { CASE_STUDIES } from './data/portfolioData';
import Sidebar from './components/Sidebar';
import Spotlight from './components/Spotlight';
import HeroSection from './components/HeroSection';
import WorkSection from './components/WorkSection';
import ExperimentSection from './components/ExperimentSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import CaseStudyView from './components/CaseStudyView';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('intro');
  const [viewHistory, setViewHistory] = useState<ViewType[]>(['intro']);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Sync with URL hash on initial load and when hash changes
  useEffect(() => {
    const initialHash = window.location.hash.replace('#', '').toLowerCase();
    
    // Direct case study deep-links (e.g. #doku) or standard menu views
    if (initialHash in CASE_STUDIES) {
      setActiveView(initialHash as ViewType);
      setViewHistory(['intro', initialHash as ViewType]);
    } else if (['work', 'experiment', 'experience', 'contact'].includes(initialHash)) {
      setActiveView(initialHash as ViewType);
      setViewHistory(['intro', initialHash as ViewType]);
    } else {
      setActiveView('intro');
      setViewHistory(['intro']);
    }

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash in CASE_STUDIES) {
        setActiveView(hash as ViewType);
        setViewHistory((prev) => (prev[prev.length - 1] === hash ? prev : [...prev, hash as ViewType]));
      } else if (['work', 'experiment', 'experience', 'contact'].includes(hash)) {
        setActiveView(hash as ViewType);
        setViewHistory((prev) => (prev[prev.length - 1] === hash ? prev : [...prev, hash as ViewType]));
      } else {
        setActiveView('intro');
        setViewHistory(['intro']);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const currentCaseStudy = CASE_STUDIES[activeView];

  // Update page title according to active view
  useEffect(() => {
    if (currentCaseStudy) {
      document.title = `${currentCaseStudy.title} — Aldo Abieza`;
      return;
    }
    switch (activeView) {
      case 'intro':
        document.title = 'Aldo Abieza — Product Designer';
        break;
      case 'work':
        document.title = 'Work — Aldo Abieza';
        break;
      case 'experiment':
        document.title = 'Playground — Aldo Abieza';
        break;
      case 'experience':
        document.title = 'Experience — Aldo Abieza';
        break;
      case 'contact':
        document.title = 'Contact — Aldo Abieza';
        break;
      default:
        document.title = 'Aldo Abieza — Product Designer';
    }
  }, [activeView, currentCaseStudy]);

  const handleNavigate = (view: ViewType | string) => {
    const target = view as ViewType;
    setViewHistory((prev) => {
      if (prev[prev.length - 1] === target) return prev;
      return [...prev, target];
    });
    setActiveView(target);
    if (target === 'intro') {
      try {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch {
        window.location.hash = '';
      }
    } else {
      window.location.hash = target;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBack = () => {
    if (viewHistory.length > 1) {
      const updated = [...viewHistory];
      updated.pop();
      const prev = updated[updated.length - 1] || 'intro';
      setViewHistory(updated);
      setActiveView(prev);
      if (prev === 'intro') {
        try {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        } catch {
          window.location.hash = '';
        }
      } else {
        window.location.hash = prev;
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      if (currentCaseStudy) {
        handleNavigate('work');
      } else {
        handleNavigate('intro');
      }
    }
  };

  return (
    <>
      {/* Subtle Grain Texture Overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Fixed Grid Pattern - only visible on Intro, hidden on Work, Experiment, Experience, Contact */}
      {activeView === 'intro' && !currentCaseStudy && <div className="site-grid" aria-hidden="true" />}

      {/* Desktop Cursor Spotlight Glow - disabled on case study details page for improved readability */}
      {!currentCaseStudy && <Spotlight />}

      {/* Fixed Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        currentCaseStudy={currentCaseStudy}
        onNavigate={handleNavigate}
        onBack={handleBack}
        canGoBack={activeView !== 'intro' || !!currentCaseStudy}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Area: Each menu has its own distinct view */}
      <main className="content">
        <AnimatePresence mode="wait">
          {currentCaseStudy ? (
            <motion.div
              key={currentCaseStudy.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <CaseStudyView
                caseStudy={currentCaseStudy}
                onBackToWork={() => handleNavigate('work')}
                onSelectCaseStudy={(id) => handleNavigate(id)}
              />
            </motion.div>
          ) : (
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeView === 'intro' && <HeroSection />}

              {activeView === 'work' && (
                <WorkSection onSelectCaseStudy={(id) => handleNavigate(id)} />
              )}

              {activeView === 'experiment' && <ExperimentSection />}

              {activeView === 'experience' && <ExperienceSection />}

              {activeView === 'contact' && <ContactSection />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Resume Viewer / Print Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </>
  );
}
