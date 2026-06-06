import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldAlert } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';

export const Navbar: React.FC = () => {
  const { profile } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'INTERNSHIPS', href: '#internships' },
    { name: 'ACHIEVEMENTS', href: '#achievements' },
    { name: 'CONTACT', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Scrolled state for backdrop filter
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.querySelector(link.href);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          const height = (el as HTMLElement).offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.href.slice(1));
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = (target as HTMLElement).offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      // Force update hash in url silently
      window.history.pushState(null, '', href);
      setActiveSection(href.slice(1));
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-cyber-bg/75 backdrop-blur-md border-white/5 py-4'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="flex items-center gap-2 font-display font-bold text-lg tracking-wider text-white hover:text-cyber-cyan transition-colors"
          id="nav-logo"
        >
          <ShieldAlert size={20} className="text-cyber-cyan" />
          <span className="bg-gradient-to-r from-cyber-cyan to-cyber-violet bg-clip-text text-transparent">
            {profile.name}
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`px-4 py-2 font-mono text-xs tracking-widest font-medium transition-all duration-200 relative ${
                activeSection === link.href.slice(1)
                  ? 'text-cyber-cyan'
                  : 'text-gray-400 hover:text-white'
              }`}
              id={`nav-link-${link.name.toLowerCase()}`}
            >
              {link.name}
              {activeSection === link.href.slice(1) && (
                <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-cyber-cyan shadow-[0_0_10px_rgba(0,212,255,0.7)]" />
              )}
            </a>
          ))}
        </div>

        {/* Hamburger Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
          id="nav-menu-toggle"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-cyber-bg/95 backdrop-blur-lg border-b border-white/5 flex flex-col p-6 gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`py-3 font-mono text-sm tracking-widest font-medium border-b border-white/5 ${
                activeSection === link.href.slice(1)
                  ? 'text-cyber-cyan'
                  : 'text-gray-400 hover:text-white'
              }`}
              id={`nav-link-mobile-${link.name.toLowerCase()}`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
