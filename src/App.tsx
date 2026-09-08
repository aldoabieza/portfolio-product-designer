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
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('intro');
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Sync with URL hash on initial load and when hash changes
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validCaseStudies = ['doku', 'orderonline', 'orderonline-settings', 'trawlbens'];

      if (validCaseStudies.includes(hash)) {
        setActiveView(hash as ViewType);
      } else if (['work', 'experiment', 'experience', 'contact'].includes(hash)) {
        setActiveView(hash as ViewType);
      } else {
        setActiveView('intro');
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
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
    setActiveView(view as ViewType);
    window.location.hash = view === 'intro' ? '' : view;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <>
      {/* Subtle Grain Texture Overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Fixed Site-wide Grid Pattern */}
      <div className="site-grid" aria-hidden="true" />

      {/* Desktop Cursor Spotlight Glow */}
      <Spotlight />

      {/* Fixed Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        currentCaseStudy={currentCaseStudy}
        onNavigate={handleNavigate}
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
              {activeView === 'intro' && (
                <>
                  <HeroSection />
                  <Footer standalone={true} />
                </>
              )}

              {activeView === 'work' && (
                <>
                  <WorkSection onSelectCaseStudy={(id) => handleNavigate(id)} />
                  <Footer standalone={true} />
                </>
              )}

              {activeView === 'experiment' && (
                <>
                  <ExperimentSection />
                  <Footer standalone={true} />
                </>
              )}

              {activeView === 'experience' && (
                <>
                  <ExperienceSection />
                  <Footer standalone={true} />
                </>
              )}

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
