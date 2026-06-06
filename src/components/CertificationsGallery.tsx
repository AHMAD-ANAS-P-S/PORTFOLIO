import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Eye, Sparkles } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';
import { Lightbox } from './Lightbox';

// Safe imports of existing certification images
import ibmDeepLearning from '../assets/certificates/courses/ibm-deep-learning.png';
import ibmMlBasics from '../assets/certificates/courses/ibm-ml-basics.png';
import nptelPython from '../assets/certificates/courses/nptel-python.png';
import nptelDbms from '../assets/certificates/courses/nptel-dbms.jpeg';
import diplomaC from '../assets/certificates/courses/diploma-c.jpeg';
import typewritingCert from '../assets/certificates/courses/typewriting.jpeg';
import ciscoDataScience from '../assets/certificates/courses/cisco-data-science.png';

const certificateMap: Record<string, string> = {
  "/src/assets/certificates/courses/ibm-deep-learning.png": ibmDeepLearning,
  "/src/assets/certificates/courses/ibm-ml-basics.png": ibmMlBasics,
  "/src/assets/certificates/courses/nptel-python.png": nptelPython,
  "/src/assets/certificates/courses/nptel-dbms.jpeg": nptelDbms,
  "/src/assets/certificates/courses/diploma-c.jpeg": diplomaC,
  "/src/assets/certificates/courses/typewriting.jpeg": typewritingCert,
  "/src/assets/certificates/courses/cisco-data-science.png": ciscoDataScience
};

export const CertificationsGallery: React.FC = () => {
  const { certifications } = usePortfolio();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Split into Completed and In Progress
  const completedCerts = certifications.filter((c) => c.status === 'completed');
  const inProgressCerts = certifications.filter((c) => c.status === 'in-progress');

  // Prepare images list for Lightbox from completed certificates
  const lightboxImages = completedCerts.map((c) => ({
    src: certificateMap[c.image] || "",
    caption: c.badge ? `${c.name} (${c.badge})` : c.name
  }));

  const handleOpenLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section
      id="certifications"
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-20 px-6 border-b border-white/5 bg-cyber-bg"
    >
      {/* Background Glow */}
      <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] rounded-full bg-cyber-cyan/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl w-full">
        {/* Section Title */}
        <div className="flex flex-col items-start mb-16">
          <span className="font-mono text-xs text-cyber-cyan tracking-widest uppercase mb-2">
            07 // CERTIFICATE_DATA
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-wide">
            Certifications & Courses
          </h2>
          <div className="h-[2px] w-16 bg-cyber-cyan mt-2 shadow-[0_0_8px_rgba(0,212,255,0.7)]" />
        </div>

        {/* 1. Completed Certifications Group */}
        <div className="mb-16">
          <div className="flex items-center gap-2.5 mb-8">
            <span className="font-mono text-xs text-cyber-cyan font-bold tracking-wider uppercase">
              COMPLETED_CREDENTIALS
            </span>
            <div className="h-[1px] flex-grow bg-white/5" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {completedCerts.map((cert, index) => {
              const certSrc = certificateMap[cert.image];

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="glass-card flex flex-col h-full overflow-hidden group"
                >
                  {/* Image Trigger */}
                  <div
                    onClick={() => handleOpenLightbox(index)}
                    className="relative aspect-[4/3] w-full bg-cyber-bg border-b border-white/5 overflow-hidden flex justify-center items-center cursor-pointer select-none"
                  >
                    {certSrc ? (
                      <>
                        <img
                          src={certSrc}
                          alt={cert.name}
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
                      <div className="cert-placeholder w-full m-2">
                        <span>Image coming soon</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col justify-between flex-grow text-left select-text">
                    <div>
                      <h3 className="font-display font-bold text-sm sm:text-base text-white mb-2 leading-snug group-hover:text-cyber-cyan transition-colors">
                        {cert.name}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                      <div className="flex items-center gap-1 font-mono text-[9px] text-gray-500">
                        <Award size={10} className="text-cyber-cyan" />
                        <span>VERIFIED_CRED</span>
                      </div>
                      
                      {cert.badge && (
                        <span className={`font-mono text-[9px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                          cert.badge.includes('First') || cert.badge.includes('Distinction')
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                            : 'bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan'
                        }`}>
                          <Sparkles size={8} />
                          {cert.badge.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 2. In Progress Group */}
        {inProgressCerts.length > 0 && (
          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <span className="font-mono text-xs text-cyber-amber font-bold tracking-wider uppercase">
                IN_PROGRESS_STUDIES
              </span>
              <div className="h-[1px] flex-grow bg-white/5" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 select-text">
              {inProgressCerts.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 flex flex-col justify-between items-start text-left bg-cyber-bg border border-dashed border-cyber-amber/30 hover:border-cyber-amber/60 bg-cyber-amber/[0.01] hover:bg-cyber-amber/[0.03] transition-all duration-300 rounded-lg min-h-[160px]"
                >
                  <div className="w-full flex justify-between items-center mb-4">
                    <span className="p-2 rounded bg-cyber-amber/10 border border-cyber-amber/20 text-cyber-amber">
                      <Clock size={16} />
                    </span>
                    <span className="font-mono text-[9px] font-semibold text-cyber-amber px-2.5 py-0.5 rounded-full bg-cyber-amber/10 border border-cyber-amber/20 uppercase tracking-wider">
                      IN PROGRESS
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-white mb-2 leading-snug">
                      {cert.name}
                    </h3>
                    <p className="font-mono text-[9px] text-gray-500">
                      SYS_COURSE_ID // {cert.id.toUpperCase()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
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
export default CertificationsGallery;
