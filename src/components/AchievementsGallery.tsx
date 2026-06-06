import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Eye, EyeOff } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';
import { Lightbox } from './Lightbox';

// Safe imports of existing hackathon certificates
import smartathon1Cert from '../assets/certificates/hackathons/smartathon1.png';
import makeathon1Cert from '../assets/certificates/hackathons/makeathon1.png';
import policeHackathonCert from '../assets/certificates/hackathons/police-hackathon.png';
import aiHackathonCert from '../assets/certificates/hackathons/ai-hackathon.jpeg';
import hackOHertzCert from '../assets/certificates/hackathons/hack-o-hertz.jpeg';
import mechovateCert from '../assets/certificates/hackathons/mechovate.jpeg';
import smartathon2Cert from '../assets/certificates/hackathons/smartathon2.jpeg';
import genesisHackathonCert from '../assets/certificates/hackathons/genesis-hackathon.jpeg';

const certificateMap: Record<string, string> = {
  "/src/assets/certificates/hackathons/smartathon1.png": smartathon1Cert,
  "/src/assets/certificates/hackathons/makeathon1.png": makeathon1Cert,
  "/src/assets/certificates/hackathons/police-hackathon.png": policeHackathonCert,
  "/src/assets/certificates/hackathons/ai-hackathon.jpeg": aiHackathonCert,
  "/src/assets/certificates/hackathons/hack-o-hertz.jpeg": hackOHertzCert,
  "/src/assets/certificates/hackathons/mechovate.jpeg": mechovateCert,
  "/src/assets/certificates/hackathons/smartathon2.jpeg": smartathon2Cert,
  "/src/assets/certificates/hackathons/genesis-hackathon.jpeg": genesisHackathonCert
};

export const AchievementsGallery: React.FC = () => {
  const { achievements, hackathons } = usePortfolio();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Sort hackathons in the exact requested order:
  // SMARTATHON 1.0 (h1) -> MAKE-A-THON 1.0 (h2) -> Thoothukudi District Police Hackathon (h3) -> AI HACKATHON (h4) -> HACK-O-HERTZ (h5) -> Mechovate (h6) -> SMARTATHON 2.0 (h7) -> GENESIS HACKATHON (h8)
  const orderedHackathons = [...hackathons].sort((a, b) => {
    const order = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'];
    return order.indexOf(a.id) - order.indexOf(b.id);
  });

  // Prepare images list for Lightbox
  const lightboxImages = orderedHackathons.map((hack) => ({
    src: certificateMap[hack.certificate] || "",
    caption: `${hack.name} Certificate`
  }));

  const handleOpenLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section
      id="achievements"
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-20 px-6 border-b border-white/5 bg-cyber-bg"
    >
      {/* Background Glows */}
      <div className="absolute top-1/3 left-10 w-[350px] h-[350px] rounded-full bg-cyber-violet/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl w-full">
        {/* Section Title */}
        <div className="flex flex-col items-start mb-16">
          <span className="font-mono text-xs text-cyber-cyan tracking-widest uppercase mb-2">
            06 // ACHIEVEMENTS_DATA
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-wide">
            Hackathon & Achievement Gallery
          </h2>
          <div className="h-[2px] w-16 bg-cyber-cyan mt-2 shadow-[0_0_8px_rgba(0,212,255,0.7)]" />
        </div>

        {/* 1. Achievements Text Cards Grid (at the top) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 select-text">
          {achievements.map((ach, index) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 flex flex-col items-start text-left h-full"
            >
              <div className="scan-line-overlay" />
              <div className="p-3 rounded-lg bg-cyber-cyan/5 border border-cyber-cyan/15 text-cyber-cyan mb-5 shadow-[0_0_15px_rgba(0,212,255,0.05)]">
                <Trophy size={20} className="stroke-[1.5]" />
              </div>
              <h3 className="font-display font-bold text-base text-white mb-2 leading-snug">
                {ach.title}
              </h3>
              <p className="text-gray-400 font-sans text-xs sm:text-sm leading-relaxed overflow-wrap-normal word-break-normal">
                {ach.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 2. Hackathon Certificates Grid (below) */}
        <div className="flex flex-col items-start mb-8">
          <h3 className="font-mono text-xs text-cyber-cyan tracking-wider uppercase mb-1">
            HACKATHON_CERTIFICATES
          </h3>
          <div className="h-[1px] w-12 bg-cyber-cyan/40" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {orderedHackathons.map((hack, index) => {
            const certSrc = certificateMap[hack.certificate];
            const hasCert = !!certSrc;

            return (
              <motion.div
                key={hack.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-card flex flex-col h-full overflow-hidden group"
              >
                {/* Certificate Image Trigger */}
                <div 
                  onClick={() => handleOpenLightbox(index)}
                  className="relative aspect-[4/3] w-full bg-cyber-bg border-b border-white/5 overflow-hidden flex justify-center items-center cursor-pointer select-none"
                >
                  {hasCert ? (
                    <>
                      <img
                        src={certSrc}
                        alt={hack.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-cyber-bg/65 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-all duration-300">
                        <span className="btn-cyan !py-1.5 !px-3.5 text-xs">
                          <Eye size={12} />
                          VIEW LARGER
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full p-4 flex flex-col items-center justify-center border border-dashed border-cyber-cyan/30 bg-cyber-cyan/[0.01] hover:bg-cyber-cyan/[0.03] transition-colors rounded-lg m-2">
                      <EyeOff size={24} className="text-cyber-cyan/40 mb-2" />
                      <span className="font-mono text-[10px] text-cyber-cyan font-bold tracking-wider uppercase mb-1">
                        Certificate coming soon
                      </span>
                      <span className="font-mono text-[9px] text-gray-500">
                        Not uploaded yet
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Title */}
                <div className="p-5 flex flex-col justify-between flex-grow text-left select-text">
                  <h4 className="font-display font-bold text-sm text-white leading-snug group-hover:text-cyber-cyan transition-colors">
                    {hack.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-4 font-mono text-[9px] text-gray-500">
                    <Calendar size={10} />
                    <span>HACKATHON // {hack.id.toUpperCase()}</span>
                  </div>
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
export default AchievementsGallery;
