import React from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, Terminal, Cpu, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';

// Color map for different skill categories
const categoryStyleMap: Record<string, {
  borderClass: string;
  pillClass: string;
  icon: React.ComponentType<any>;
}> = {
  "Languages": {
    borderClass: "border-cyber-cyan/20 hover:border-cyber-cyan/40",
    pillClass: "bg-cyber-cyan/10 border-cyber-cyan/25 text-cyber-cyan shadow-[0_0_8px_rgba(0,212,255,0.04)]",
    icon: Code
  },
  "AI & ML": {
    borderClass: "border-cyber-violet/20 hover:border-cyber-violet/40",
    pillClass: "bg-cyber-violet/10 border-cyber-violet/25 text-cyber-violet shadow-[0_0_8px_rgba(124,58,237,0.04)]",
    icon: Brain
  },
  "Frameworks": {
    borderClass: "border-teal-500/20 hover:border-teal-500/40",
    pillClass: "bg-teal-500/10 border-teal-500/25 text-teal-400 shadow-[0_0_8px_rgba(20,184,166,0.04)]",
    icon: Terminal
  },
  "Tools & Platforms": {
    borderClass: "border-white/5 hover:border-white/20",
    pillClass: "bg-white/5 border-white/10 text-gray-300",
    icon: Cpu
  },
  "Cybersecurity": {
    borderClass: "border-cyber-red/20 hover:border-cyber-red/40",
    pillClass: "bg-cyber-red/10 border-cyber-red/25 text-cyber-red shadow-[0_0_8px_rgba(255,69,96,0.04)]",
    icon: ShieldCheck
  }
};

export const SkillsSection: React.FC = () => {
  const { skills } = usePortfolio();

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-20 px-6 border-b border-white/5 bg-cyber-bg"
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] rounded-full bg-cyber-violet/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl w-full">
        {/* Section Title */}
        <div className="flex flex-col items-start mb-16">
          <span className="font-mono text-xs text-cyber-cyan tracking-widest uppercase mb-2">
            08 // SKILL_MATRIX
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-wide">
            Technical Skills
          </h2>
          <div className="h-[2px] w-16 bg-cyber-cyan mt-2 shadow-[0_0_8px_rgba(0,212,255,0.7)]" />
        </div>

        {/* Skill Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 select-text">
          {skills.categories.map((cat, index) => {
            const style = categoryStyleMap[cat.name] || {
              borderClass: "border-white/5 hover:border-white/20",
              pillClass: "bg-white/5 border-white/10 text-gray-300",
              icon: Code
            };
            const Icon = style.icon;

            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass-card p-6 flex flex-col items-start text-left h-full border ${style.borderClass}`}
              >
                <div className="scan-line-overlay" />
                
                {/* Header: Title + Icon */}
                <div className="w-full flex justify-between items-center mb-6">
                  <h3 className="font-display font-bold text-base text-white tracking-wide">
                    {cat.name}
                  </h3>
                  <div className="text-gray-500 opacity-60">
                    <Icon size={18} className="stroke-[1.5]" />
                  </div>
                </div>

                {/* Items Grid */}
                <div className="flex flex-wrap gap-2.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className={`font-mono text-xs px-3 py-1 rounded-md border transition-all duration-300 hover:scale-105 ${style.pillClass}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default SkillsSection;
