import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Eye } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';
import { Lightbox } from './Lightbox';

// Safe imports for existing certificate assets to prevent Vite compile errors on missing files
import amasqisCert from '../assets/certificates/internships/amasqis.jpeg';
import bigbucksCert from '../assets/certificates/internships/bigbucks.png';
import cappricioCert from '../assets/certificates/internships/cappricio.jpeg';
import edunetCert from '../assets/certificates/internships/edunet.jpeg';
import internshalaCert from '../assets/certificates/internships/internshala.png';

const certificateMap: Record<string, string> = {
  "/src/assets/certificates/internships/amasqis.jpeg": amasqisCert,
  "/src/assets/certificates/internships/bigbucks.png": bigbucksCert,
  "/src/assets/certificates/internships/cappricio.jpeg": cappricioCert,
  "/src/assets/certificates/internships/edunet.jpeg": edunetCert,
  "/src/assets/certificates/internships/internshala.png": internshalaCert
};

export const ExperienceSection: React.FC = () => {
  const { experience } = usePortfolio();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Filter and sort experiences in order 1 to 5
  const sortedExperience = [...experience].sort((a, b) => a.order - b.order);

  // Prepare images list for Lightbox
  const lightboxImages = sortedExperience.map((exp) => ({
    src: certificateMap[exp.certificate] || "",
    caption: `${exp.company} — ${exp.role}`
  }));

  const handleOpenLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section
      id="experience"
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-20 px-6 border-b border-white/5 bg-cyber-bg"
    >
      <div className="max-w-4xl w-full">
        {/* Section Title */}
        <div className="flex flex-col items-start mb-16">
          <span className="font-mono text-xs text-cyber-cyan tracking-widest uppercase mb-2">
            02 // TIMELINE_DATA
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-wide">
            Work Experience
          </h2>
          <div className="h-[2px] w-16 bg-cyber-cyan mt-2 shadow-[0_0_8px_rgba(0,212,255,0.7)]" />
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-white/10 ml-4 md:ml-32 pl-8 md:pl-12 flex flex-col gap-16">
          {sortedExperience.map((exp, index) => {
            const isCurrent = exp.type === 'current';
            const formattedIndex = String(index + 1).padStart(2, '0');

            return (
              <motion.div
                key={exp.order}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                {/* Timeline Node Number */}
                <div className="absolute -left-[53px] md:-left-[85px] top-0 flex items-center justify-center">
                  <div className="font-mono text-xs text-cyber-cyan/50 bg-cyber-bg px-2 py-1 border border-white/10 rounded z-10 md:w-12 text-center md:flex hidden justify-center items-center">
                    {formattedIndex}
                  </div>
                  {/* Small round indicator dot on the line */}
                  <div className={`w-3.5 h-3.5 rounded-full border-2 border-cyber-bg absolute left-[31px] md:-left-[23px] top-1.5 ${
                    isCurrent ? 'bg-cyber-cyan shadow-[0_0_10px_rgba(0,212,255,0.8)]' : 'bg-white/20'
                  }`} />
                </div>

                {/* Card */}
                <div className="glass-card p-6 md:p-8 flex flex-col items-start text-left select-text">
                  <div className="scan-line-overlay" />
                  
                  {/* Header Row */}
                  <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-display font-bold text-xl text-white tracking-wide">
                        {exp.role} <span className="text-cyber-cyan">@ {exp.company}</span>
                      </h3>
                      {/* Sub-header meta info */}
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-400 font-mono">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/5">
                          <Calendar size={12} className="text-cyber-cyan" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-cyber-violet" />
                          <span>{exp.location}</span>
                        </div>
                        {isCurrent && (
                          <div className="flex items-center gap-1.5 text-green-400 px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 font-medium">
                            <span className="pulse-dot-cyan" />
                            <span>Present</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* View Certificate CTA */}
                    <div>
                      <button
                        onClick={() => handleOpenLightbox(index)}
                        className="btn-outline-cyan !py-2 !px-3.5 text-xs inline-flex"
                        id={`btn-view-cert-${exp.company.toLowerCase().replace('.', '')}`}
                      >
                        <Eye size={14} />
                        VIEW CERTIFICATE
                      </button>
                    </div>
                  </div>

                  {/* Summary bio */}
                  <p className="text-gray-300 font-sans text-sm sm:text-base leading-relaxed mb-4 overflow-wrap-normal word-break-normal">
                    {exp.summary}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="flex flex-col gap-2.5 list-none pl-0">
                    {exp.highlights.slice(0, 3).map((hl, hlIdx) => (
                      <li key={hlIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
                        <span className="text-cyber-cyan mt-1 select-none font-mono">▶</span>
                        <span className="overflow-wrap-normal word-break-normal">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Rendering */}
      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          startIndex={activeImageIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
};
export default ExperienceSection;
