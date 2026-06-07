import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';
import { ProjectCard } from './ProjectCard';

export const ProjectsSection: React.FC = () => {
  const { projects } = usePortfolio();

  // Pin highlighted projects first, then sort by year descending (or preserve JSON order)
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.highlight && !b.highlight) return -1;
    if (!a.highlight && b.highlight) return 1;
    return 0; // Preserve order for same status
  });

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-20 px-6 border-b border-white/5 bg-cyber-bg"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 right-10 w-[350px] h-[350px] rounded-full bg-cyber-cyan/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl w-full">
        {/* Section Title */}
        <div className="flex flex-col items-start mb-16">
          <span className="font-mono text-xs text-cyber-cyan tracking-widest uppercase mb-2">
            04 // PROJECT_REPOS
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-wide">
            Featured ProJects
          </h2>
          <div className="h-[2px] w-16 bg-cyber-cyan mt-2 shadow-[0_0_8px_rgba(0,212,255,0.7)]" />
        </div>

        {/* Stacked Cards Container */}
        <div className="flex flex-col gap-16 relative">
          {sortedProjects.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="w-full transition-transform duration-300"
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default ProjectsSection;
