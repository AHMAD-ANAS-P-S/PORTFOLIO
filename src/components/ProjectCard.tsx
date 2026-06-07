import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import type { ProjectItem } from '../types/portfolio';

const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="12"
    height="12"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <div className="glass-card w-full p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-stretch select-text">
      <div className="scan-line-overlay" />

      {/* Left Column: Image or Dark Grid Fallback */}
      <div className="w-full md:w-2/5 min-h-[180px] rounded-lg border border-cyber-cyan/25 bg-cyber-bg/60 relative overflow-hidden flex flex-col justify-center items-center p-6 select-none group-hover:border-cyber-cyan/50 transition-all duration-300">
        {project.image ? (
          <>
            {/* Project Image */}
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-contain p-2 opacity-85 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
            />
            {/* Cyberpunk grid texture pattern overlay on top of the image */}
            <div className="absolute inset-0 bg-cover bg-center opacity-10 hero-grid pointer-events-none" />
            {/* Color overlay to integrate with theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-transparent opacity-60 pointer-events-none" />
          </>
        ) : (
          <>
            {/* Subtle grid background for the thumbnail */}
            <div className="absolute inset-0 bg-cover bg-center opacity-20 hero-grid" />
            {/* Fallback Icon & Title overlay */}
            <ShieldCheck className="text-cyber-cyan w-10 h-10 mb-2 relative z-10 filter drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]" />
            <h4 className="font-display font-bold text-sm text-center text-white relative z-10 px-2 tracking-wide uppercase">
              {project.title.split('–')[0]}
            </h4>
            <span className="font-mono text-[9px] text-cyber-cyan mt-1 px-2.5 py-0.5 rounded bg-cyber-cyan/10 border border-cyber-cyan/20 z-10">
              CORE_MODULE
            </span>
          </>
        )}
        
        {/* Cyberpunk decoration elements overlay */}
        <div className="absolute top-2 left-2 font-mono text-[9px] text-cyber-cyan/60 bg-cyber-bg/85 px-1.5 py-0.5 rounded border border-cyber-cyan/15 z-10 backdrop-blur-sm">
          SYS_SEC_PORT: {formattedIndex}
        </div>
        <div className="absolute bottom-2 right-2 font-mono text-[9px] text-cyber-cyan/60 bg-cyber-bg/85 px-1.5 py-0.5 rounded border border-cyber-cyan/15 z-10 backdrop-blur-sm">
          STATUS: ACTIVE
        </div>
      </div>

      {/* Right Column: Project details */}
      <div className="w-full md:w-3/5 flex flex-col justify-between items-start text-left">
        <div className="w-full">
          {/* Header Row: Index / Featured Badge */}
          <div className="w-full flex justify-between items-center mb-3">
            <span className="font-mono text-xs text-cyber-cyan">
              PROJECT // {formattedIndex}
            </span>
            {project.highlight && (
              <span className="font-mono text-[10px] text-cyber-bg font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-cyber-cyan shadow-[0_0_10px_rgba(0,212,255,0.4)] uppercase">
                FEATURED
              </span>
            )}
          </div>

          {/* Title & Subtitle */}
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-1.5 tracking-wide leading-snug">
            {project.title}
          </h3>
          <p className="font-sans font-medium text-xs sm:text-sm text-cyber-cyan mb-4">
            {project.subtitle}
          </p>

          {/* Description */}
          <p className="text-gray-400 font-sans text-sm leading-relaxed mb-6 overflow-wrap-normal word-break-normal">
            {project.description}
          </p>
        </div>

        {/* Footer info: Tech Stack + Details + Link */}
        <div className="w-full">
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] text-cyber-cyan px-2.5 py-1 rounded bg-cyber-cyan/5 border border-cyber-cyan/15 hover:border-cyber-cyan/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Meta Info Row */}
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/5 font-mono text-xs text-gray-500">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <div>
                ROLE: <span className="text-gray-300">{project.role}</span>
              </div>
              <div className="sm:border-l sm:border-white/10 sm:pl-4">
                YEAR: <span className="text-gray-300">{project.year}</span>
              </div>
            </div>

            {/* GitHub Button - Hidden when empty */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-cyan !py-1.5 !px-3.5 !text-xs self-start sm:self-auto inline-flex items-center gap-2 group"
                id={`project-link-${project.id}`}
              >
                <GithubIcon className="transition-transform group-hover:scale-110" />
                VIEW ON GITHUB
                <ExternalLink size={10} className="opacity-50" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;
