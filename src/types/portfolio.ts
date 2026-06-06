export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  phone: string;
  instagram: string;
  website: string;
}

export interface Profile {
  name: string;
  shortName: string;
  tagline: string;
  role: string;
  specialization: string;
  location: string;
  yearsOfExperience: string;
  cgpa: string;
  college: string;
  graduationYear: string;
  bio: string;
  photo: string;
  resumePdf: string;
  social: SocialLinks;
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface Skills {
  categories: SkillCategory[];
}

export interface ExperienceItem {
  order: number;
  company: string;
  role: string;
  period: string;
  location: string;
  type: 'current' | 'completed';
  summary: string;
  certificate: string;
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  role: string;
  year: string;
  link: string;
  image: string;
  highlight: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
}

export interface HackathonItem {
  id: string;
  name: string;
  certificate: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  status: 'completed' | 'in-progress';
  image: string;
  badge?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
  status: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

export interface PortfolioData {
  profile: Profile;
  skills: Skills;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  achievements: AchievementItem[];
  hackathons: HackathonItem[];
  certifications: CertificationItem[];
  education: EducationItem[];
  services: ServiceItem[];
}
