export interface Project {
  title: string;
  description: string;
  link: string;
  technologies: string[];
}

export interface Experience {
  company: string;
  title: string;
  duration: string;
  description: string;
}

export interface PortfolioData {
  name: string;
  bio: string;
  skills: string[];
  projects: Project[];
  experience: Experience[];
  contact: { email: string; linkedin: string; github: string; twitter: string };
  photoURL: string;
}
