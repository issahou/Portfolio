import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { Project, ProjectType, SkillCategory, Profile, CVData, Locale } from '@/types';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');
const PROJECTS_DIR = path.join(CONTENT_DIR, 'projects');

function getLocaleFile(baseName: string, locale: Locale): string {
  if (locale === 'fr') return `${baseName}.json`;
  if (locale === 'en') return `${baseName}.en.json`;
  // Fallback to French for invalid locales
  return `${baseName}.json`;
}

async function readJson<T>(fileName: string, locale: Locale): Promise<T> {
  const filePath = path.join(CONTENT_DIR, getLocaleFile(fileName, locale));
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

async function readMdxFiles(locale: Locale): Promise<Project[]> {
  const files = await fs.readdir(PROJECTS_DIR);
  const mdxFiles = files.filter(f => f.endsWith('.mdx') || f.endsWith(`.${locale}.mdx`));
  
  const projects: Project[] = [];
  
  for (const file of mdxFiles) {
    const filePath = path.join(PROJECTS_DIR, file);
    const content = await fs.readFile(filePath, 'utf-8');
    const { data, content: mdxContent } = matter(content);
    
    // Only include projects for current locale (or default to fr)
    const projectLocale = file.includes(`.${locale}.`) ? locale : 'fr';
    if (projectLocale !== locale && locale !== 'fr') continue;
    
    projects.push({
      slug: file.replace(/\.mdx$/, '').replace(`.${locale}`, ''),
      locale,
      content: mdxContent, // Raw MDX content - will be compiled client-side
      ...data,
    } as Project);
  }
  
  return projects.sort((a, b) => a.order - b.order);
}

export class LocalContentRepository {
  private projectsCache: Map<Locale, Project[]> = new Map();
  private skillsCache: Map<Locale, SkillCategory[]> = new Map();
  private profileCache: Map<Locale, Profile> = new Map();
  private cvCache: Map<Locale, CVData> = new Map();

  async getProjects(locale: Locale = 'fr'): Promise<Project[]> {
    if (!this.projectsCache.has(locale)) {
      this.projectsCache.set(locale, await readMdxFiles(locale));
    }
    return this.projectsCache.get(locale)!;
  }

  async getProjectBySlug(slug: string, locale: Locale = 'fr'): Promise<Project | null> {
    const projects = await this.getProjects(locale);
    return projects.find(p => p.slug === slug) || null;
  }

  async getProjectsByType(type: ProjectType, locale: Locale = 'fr'): Promise<Project[]> {
    const projects = await this.getProjects(locale);
    return projects.filter(p => p.type === type);
  }

  async getFeaturedProjects(locale: Locale = 'fr'): Promise<Project[]> {
    const projects = await this.getProjects(locale);
    return projects.filter(p => p.featured);
  }

  async getSkills(locale: Locale = 'fr'): Promise<SkillCategory[]> {
    if (!this.skillsCache.has(locale)) {
      const data = await readJson<{ categories: SkillCategory[] }>('skills', locale);
      this.skillsCache.set(locale, data.categories);
    }
    return this.skillsCache.get(locale)!;
  }

  async getProfile(locale: Locale = 'fr'): Promise<Profile> {
    if (!this.profileCache.has(locale)) {
      this.profileCache.set(locale, await readJson<Profile>('profile', locale));
    }
    return this.profileCache.get(locale)!;
  }

  async getCV(locale: Locale = 'fr'): Promise<CVData> {
    if (!this.cvCache.has(locale)) {
      this.cvCache.set(locale, await readJson<CVData>('cv', locale));
    }
    return this.cvCache.get(locale)!;
  }

  clearCache(): void {
    this.projectsCache.clear();
    this.skillsCache.clear();
    this.profileCache.clear();
    this.cvCache.clear();
  }
}

export const contentRepository = new LocalContentRepository();