import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Code } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';
import { SocialLinks } from './SocialLinks';

// Import local assets
import photoImg from '../assets/img/photo_working.jpg';
import resumePdf from '../assets/resume/AhmadAnas_Resume.pdf';

export const HeroSection: React.FC = () => {
  const { profile } = usePortfolio();
  const [typedTagline, setTypedTagline] = useState('');
  const fullTagline = "I build systems that think and defend.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      const char = fullTagline.charAt(index);
      setTypedTagline((prev) => prev + char);
      index++;
      if (index >= fullTagline.length) {
        clearInterval(interval);
      }
    }, 85); // speed of typing

    return () => clearInterval(interval);
  }, []);

  const handleProjectsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.querySelector('#projects');
    if (target) {
      const offsetTop = (target as HTMLElement).offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', '#projects');
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-24 px-6 hero-grid"
    >
      {/* Subtle background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-cyber-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyber-violet/5 blur-[120px] pointer-events-none" />

      {/* Cyberpunk Scanline overlay */}
      <div className="scan-line-overlay absolute inset-0 z-0" />

      {/* Hero content container */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/5 mb-8 max-w-full select-none"
        >
          <span className="pulse-dot" />
          <span className="font-mono text-[9px] min-[400px]:text-[10px] sm:text-xs tracking-wider text-green-400 font-medium whitespace-normal sm:whitespace-nowrap text-center">
            Open to Internships – Cybersecurity | AI/ML | Python
          </span>
        </motion.div>

        {/* Name Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="hero-heading select-none mb-4 tracking-tight"
          id="hero-name"
        >
          {profile.name.toUpperCase()}
        </motion.h1>

        {/* Animated Typewriter Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="min-h-[40px] mb-8"
        >
          <p className="font-mono text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl select-text">
            <span>{typedTagline}</span>
            <span className="cursor inline-block" />
          </p>
        </motion.div>

        {/* Floating Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100, delay: 0.4 }}
          className="relative mb-10 w-[200px] h-[200px] md:w-[280px] md:h-[280px] flex justify-center items-center"
        >
          <motion.img
            src={photoImg}
            alt={profile.name}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 24px rgba(0,212,255,0.45))" }}
            className="w-full h-full object-cover rounded-full relative z-10"
            id="hero-avatar"
          />
        </motion.div>

        {/* Social Pill Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-10"
        >
          <SocialLinks />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6"
        >
          <button
            onClick={handleProjectsClick}
            className="btn-cyan justify-center"
            id="hero-cta-projects"
          >
            <Code size={18} />
            VIEW PROJECTS
          </button>
          
          <a
            href={resumePdf}
            download="AhmadAnas_Resume.pdf"
            className="btn-outline-cyan justify-center"
            id="hero-cta-resume"
          >
            <Download size={18} />
            DOWNLOAD RESUME
          </a>
        </motion.div>
      </div>
    </section>
  );
};
export default HeroSection;
