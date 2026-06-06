import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { InternshipGallery } from './components/InternshipGallery';
import { AchievementsGallery } from './components/AchievementsGallery';
import { CertificationsGallery } from './components/CertificationsGallery';
import { SkillsSection } from './components/SkillsSection';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="relative bg-cyber-bg min-h-screen text-cyber-gray">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Internship Gallery */}
      <InternshipGallery />

      {/* Achievements Gallery */}
      <AchievementsGallery />

      {/* Certifications Gallery */}
      <CertificationsGallery />

      {/* Skills Section */}
      <SkillsSection />

      {/* Footer / Contact */}
      <Footer />
    </div>
  );
};

export default App;
