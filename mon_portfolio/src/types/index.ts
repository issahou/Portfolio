export type Locale = 'fr' | 'en';

export type ProjectType = 'academique' | 'personnel' | 'professionnel' | 'hackathon';

export interface SkillItem {
  name: string;
  level: number; // 1-5
  icon?: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  items: SkillItem[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  role: string;
  type: ProjectType;
  github?: string;
  demo?: string;
  images: string[];
  featured: boolean;
  order: number;
  content: string; // MDX content
  locale: Locale;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  avatar: string;
  about: string;
  social: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    twitter?: string;
  };
  cv: {
    filename: string;
    url: string;
  };
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  start: string; // YYYY-MM
  end: string; // YYYY-MM or 'Present'
  description: string[];
  technologies: string[];
}

export interface Formation {
  degree: string;
  school: string;
  location: string;
  start: string; // YYYY
  end: string; // YYYY
  honors?: string;
}

export interface Certification {
  name: string;
  year: number;
  url?: string;
}

export interface CVData {
  experiences: Experience[];
  formation: Formation[];
  certifications: Certification[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string; // Spam protection
}

export interface EmailResult {
  success: boolean;
  error?: string;
}