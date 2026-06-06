import React from 'react';
import { motion } from 'framer-motion';
import { Download, Briefcase, GraduationCap, MapPin } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';

// Import local assets
import photoImg from '../assets/img/photo_to_upload.jpg';
import resumePdf from '../assets/resume/AhmadAnas_Resume.pdf';

export const AboutSection: React.FC = () => {
  const { profile, projects } = usePortfolio();

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-20 px-6 border-b border-white/5 bg-cyber-bg"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-10 w-[300px] h-[300px] rounded-full bg-cyber-violet/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl w-full">
        {/* Section Title */}
        <div className="flex flex-col items-start mb-12">
          <span className="font-mono text-xs text-cyber-cyan tracking-widest uppercase mb-2">
            01 // PROFILE_DATA
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-wide">
            About Me
          </h2>
          <div className="h-[2px] w-16 bg-cyber-cyan mt-2 shadow-[0_0_8px_rgba(0,212,255,0.7)]" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Left Column: Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="col-span-1 md:col-span-5 flex justify-center"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 group">
              {/* Outer decorative glowing borders */}
              <div className="absolute inset-0 rounded-full border border-cyber-cyan/30 scale-105 group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
              <div className="absolute inset-0 rounded-full border border-cyber-violet/20 scale-110 group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
              
              <div className="absolute inset-0 rounded-full bg-cyber-cyan/5 blur-md group-hover:bg-cyber-cyan/15 transition-colors duration-500" />
              <img
                src={photoImg}
                alt={profile.name}
                className="w-full h-full object-cover rounded-full border-3 border-cyber-cyan shadow-[0_0_20px_rgba(0,212,255,0.3)] relative z-10 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Right Column: Bio & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="col-span-1 md:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Quick Education Info */}
            <div className="flex flex-col gap-2.5 mb-6 text-sm text-gray-400 font-mono">
              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-cyber-cyan" />
                <span className="text-white font-sans font-medium">{profile.role}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-cyber-cyan" />
                <span>{profile.college}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-cyber-cyan" />
                <span>{profile.location} (Graduation: {profile.graduationYear})</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-300 leading-relaxed font-sans mb-8 select-text overflow-wrap-normal word-break-normal text-sm sm:text-base">
              {profile.bio}
            </p>

            {/* Stat Pills */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="glass-card p-4 flex flex-col items-start">
                <span className="font-mono text-xs text-cyber-cyan tracking-wider uppercase mb-1">
                  ACADEMIC_CGPA
                </span>
                <span className="font-display font-bold text-2xl text-white">
                  {profile.cgpa}
                </span>
              </div>

              <div className="glass-card p-4 flex flex-col items-start">
                <span className="font-mono text-xs text-cyber-violet tracking-wider uppercase mb-1">
                  INTERNSHIPS
                </span>
                <span className="font-display font-bold text-2xl text-white">
                  4
                </span>
              </div>

              <div className="glass-card p-4 flex flex-col items-start">
                <span className="font-mono text-xs text-cyber-cyan tracking-wider uppercase mb-1">
                  PROJECTS
                </span>
                <span className="font-display font-bold text-2xl text-white">
                  {projects.length} Systems
                </span>
              </div>

              <div className="glass-card p-4 flex flex-col items-start">
                <span className="font-mono text-xs text-cyber-violet tracking-wider uppercase mb-1">
                  HACKATHONS
                </span>
                <span className="font-display font-bold text-2xl text-white">
                  2x National Finalist
                </span>
              </div>
            </div>

            {/* CTA */}
            <div>
              <a
                href={resumePdf}
                download="AhmadAnas_Resume.pdf"
                className="btn-outline-cyan inline-flex"
                id="about-cta-resume"
              >
                <Download size={18} />
                DOWNLOAD RESUME
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default AboutSection;
