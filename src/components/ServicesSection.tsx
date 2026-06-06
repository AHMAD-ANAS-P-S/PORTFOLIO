import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, Terminal, Search } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';

const iconMap: Record<string, React.ComponentType<any>> = {
  "01": Shield,
  "02": Brain,
  "03": Terminal,
  "04": Search,
};

export const ServicesSection: React.FC = () => {
  const { services } = usePortfolio();

  return (
    <section
      id="services"
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-20 px-6 border-b border-white/5 bg-cyber-bg"
    >
      {/* Background Glows */}
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] rounded-full bg-cyber-cyan/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl w-full">
        {/* Section Title */}
        <div className="flex flex-col items-start mb-16">
          <span className="font-mono text-xs text-cyber-cyan tracking-widest uppercase mb-2">
            03 // SERVICES_DATA
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-wide">
            Services & Expertise
          </h2>
          <div className="h-[2px] w-16 bg-cyber-cyan mt-2 shadow-[0_0_8px_rgba(0,212,255,0.7)]" />
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 select-text">
          {services.map((svc, index) => {
            const Icon = iconMap[svc.number] || Shield;

            return (
              <motion.div
                key={svc.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="glass-card p-8 flex flex-col justify-between items-start text-left min-h-[220px]"
              >
                <div className="scan-line-overlay" />
                
                {/* Header row: Icon + Number */}
                <div className="w-full flex justify-between items-start mb-6">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-cyber-cyan shadow-[0_0_15px_rgba(0,212,255,0.05)]">
                    <Icon size={24} className="stroke-[1.5]" />
                  </div>
                  <span className="font-mono text-3xl font-bold bg-gradient-to-r from-cyber-cyan to-cyber-violet bg-clip-text text-transparent opacity-60">
                    {svc.number}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-display font-bold text-xl text-white mb-3 tracking-wide">
                    {svc.title}
                  </h3>
                  <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed overflow-wrap-normal word-break-normal">
                    {svc.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default ServicesSection;
