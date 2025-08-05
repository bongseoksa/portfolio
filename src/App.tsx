import type React from 'react';
import { useEffect } from 'react';
import './lib/i18n';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import CareerSection from './components/CareerSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import { postVitals } from './api/vitals';

const App: React.FC = () => {
  useEffect(() => {
    postVitals();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <SkillsSection />
        <CareerSection />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
