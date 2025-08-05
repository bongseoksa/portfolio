import type React from 'react';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './lib/i18n';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import CareerSection from './components/CareerSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import Dashboard from './app/dashboard/page';
import { postVitals } from './api/vitals';

const HomePage: React.FC = () => {
  return (
    <>
      <main>
        <HeroSection />
        <SkillsSection />
        <CareerSection />
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    postVitals();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
