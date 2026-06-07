import React, { useState } from 'react';
import { Copy, Check, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';
import { SocialLinks } from './SocialLinks';

// Import local assets
import resumePdf from '../assets/resume/AhmadAnas_Resume.pdf';

export const Footer: React.FC = () => {
  const { profile } = usePortfolio();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = (target as HTMLElement).offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', href);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative bg-black/60 border-t border-white/5 py-16 px-6 overflow-hidden w-full select-text"
    >
      {/* Subtle scan-line overlay */}
      <div className="scan-line-overlay absolute inset-0 z-0 opacity-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-12">
          {/* Column 1: Profile Summary (Left) */}
          <div className="col-span-1 md:col-span-5 flex flex-col items-start text-left">
            <h2 className="font-display font-bold text-2xl mb-3 bg-gradient-to-r from-cyber-cyan to-cyber-violet bg-clip-text text-transparent select-none">
              {profile.name}
            </h2>
            <p className="text-gray-400 font-sans text-xs sm:text-sm leading-relaxed mb-4">
              {profile.tagline}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-6">
              <MapPin size={12} className="text-cyber-cyan" />
              <span>{profile.location}</span>
            </div>
            
            {/* Download Resume Button */}
            <a
              href={resumePdf}
              download="AhmadAnas_Resume.pdf"
              className="btn-outline-cyan !py-2 !px-4 !text-xs inline-flex"
              id="footer-cta-resume"
            >
              DOWNLOAD RESUME
            </a>
          </div>

          {/* Column 2: Navigation Links (Center) */}
          <div className="col-span-1 md:col-span-3 flex flex-col items-start text-left">
            <h3 className="font-mono text-xs text-cyber-cyan tracking-widest uppercase mb-5 font-bold">
              // NAVIGATION
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 font-mono text-xs text-gray-400">
              <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="hover:text-white transition-colors">HOME</a>
              <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-white transition-colors">ABOUT</a>
              <a href="#experience" onClick={(e) => handleLinkClick(e, '#experience')} className="hover:text-white transition-colors">EXPERIENCE</a>
              <a href="#projects" onClick={(e) => handleLinkClick(e, '#projects')} className="hover:text-white transition-colors">PROJECTS</a>
              <a href="#skills" onClick={(e) => handleLinkClick(e, '#skills')} className="hover:text-white transition-colors">SKILLS</a>
              <a href="#internships" onClick={(e) => handleLinkClick(e, '#internships')} className="hover:text-white transition-colors">INTERNSHIPS</a>
              <a href="#achievements" onClick={(e) => handleLinkClick(e, '#achievements')} className="hover:text-white transition-colors">ACHIEVEMENTS</a>
              <a href="#certifications" onClick={(e) => handleLinkClick(e, '#certifications')} className="hover:text-white transition-colors">COURSES</a>
            </div>
          </div>

          {/* Column 3: Contact details (Right) */}
          <div className="col-span-1 md:col-span-4 flex flex-col items-start text-left">
            <h3 className="font-mono text-xs text-cyber-violet tracking-widest uppercase mb-5 font-bold">
              // CONTACT_INFO
            </h3>
            
            <div className="flex flex-col gap-4 w-full">
              {/* Email block with Copy Button */}
              <div className="w-full flex items-center justify-between p-3 rounded bg-white/5 border border-white/5 font-mono text-xs text-gray-300">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Mail size={14} className="text-cyber-cyan shrink-0" />
                  <span className="truncate">{profile.social.email}</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded hover:bg-white/5 text-gray-400 hover:text-cyber-cyan transition-all shrink-0 ml-2"
                  title="Copy email to clipboard"
                  id="btn-copy-email"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Phone Block */}
              {profile.social.phone && (
                <a
                  href={`tel:${profile.social.phone}`}
                  className="w-full flex items-center gap-2.5 p-3 rounded bg-white/5 border border-white/5 font-mono text-xs text-gray-300 hover:border-cyber-cyan/35 transition-colors"
                >
                  <Phone size={14} className="text-cyber-cyan" />
                  <span>{profile.social.phone}</span>
                </a>
              )}

              {/* Social Row */}
              <div className="mt-2">
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          {/* Copyright */}
          <p className="font-mono text-[10px] text-gray-600">
            &copy; {currentYear} {profile.name}. All rights reserved.
          </p>

          {/* Back to Top */}
          <button
            onClick={handleScrollToTop}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan transition-all"
            title="Scroll to Top"
            id="btn-scroll-top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
