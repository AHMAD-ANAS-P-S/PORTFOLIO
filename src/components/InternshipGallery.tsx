import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Eye, EyeOff } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';
import { Lightbox } from './Lightbox';

// Safe imports of existing internship certificates
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

export const InternshipGallery: React.FC = () => {
  const { experience } = usePortfolio();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Filter & sort experiences in order: amasQis.ai (1), Big Bucks (2), Cappricio (3), Edunet (4), Internshala (5)
  const sortedInternships = [...experience].sort((a, b) => a.order - b.order);

  // Prepare images list for Lightbox
  const lightboxImages = sortedInternships.map((exp) => ({
    src: certificateMap[exp.certificate] || "",
    caption: `${exp.company} — ${exp.role} Certificate`
  }));

  const handleOpenLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section
      id="internships"
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-20 px-6 border-b border-white/5 bg-cyber-bg"
    >
      <div className="max-w-5xl w-full">
        {/* Section Title */}
        <div className="flex flex-col items-start mb-16">
          <span className="font-mono text-xs text-cyber-cyan tracking-widest uppercase mb-2">
            05 // INTERN_GALLERY
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-wide">
            Internship Certificates
          </h2>
          <div className="h-[2px] w-16 bg-cyber-cyan mt-2 shadow-[0_0_8px_rgba(0,212,255,0.7)]" />
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedInternships.map((intern, index) => {
            const certSrc = certificateMap[intern.certificate];
            const hasCert = !!certSrc;

            return (
              <motion.div
                key={intern.order}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card flex flex-col h-full overflow-hidden group"
              >
                {/* Certificate Thumbnail / Placeholder */}
                <div 
                  onClick={() => handleOpenLightbox(index)}
                  className="relative aspect-[4/3] w-full bg-cyber-bg border-b border-white/5 overflow-hidden flex justify-center items-center cursor-pointer select-none"
                >
                  {hasCert ? (
                    <>
                      <img
                        src={certSrc}
                        alt={`${intern.company} Certificate`}
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

                {/* Card Info */}
                <div className="p-5 flex flex-col justify-between flex-grow text-left select-text">
                  <div>
                    <h3 className="font-display font-bold text-base text-white mb-1 group-hover:text-cyber-cyan transition-colors">
                      {intern.company}
                    </h3>
                    <p className="font-sans text-xs text-cyber-cyan/85 font-medium mb-3">
                      {intern.role}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-auto font-mono text-[10px] text-gray-500">
                    <Calendar size={10} />
                    <span>{intern.period}</span>
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
export default InternshipGallery;
