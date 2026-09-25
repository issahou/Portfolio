'use client';

import { useProjects } from '@/hooks/useProjects';
import { cn } from '@/lib/utils/cn';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Project, ProjectType } from '@/types';
import { PROJECT_TYPES } from '@/lib/constants';
import { Locale } from '@/types';
import { ChevronRight, Filter, X } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

interface ProjectsSectionProps {
  locale: Locale;
  projects: Project[];
}

const techColors: Record<string, string> = {
  'Next.js': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'React': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  'TypeScript': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Tailwind': 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
  'Node.js': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'PostgreSQL': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  'Python': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  'Docker': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
};

export function ProjectsSection({ locale, projects }: ProjectsSectionProps) {
  const t = useTranslations(locale);
  const {
    projects: filteredProjects,
    allTechnologies,
    filters,
    projectTypes,
    hasActiveFilters,
  } = useProjects({ initialProjects: projects, locale });

  const getTypeLabel = (type: ProjectType) => {
    const found = PROJECT_TYPES.find(p => p.value === type);
    return found ? t(`projects.type.${type}`) : type;
  };

  return (
    <section id="projects" className="py-20 lg:py-32 bg-white dark:bg-secondary-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal delay={0} direction="up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-2">
                {t('projects.title')}
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400">
                {filteredProjects.length} {filteredProjects.length > 1 ? t('projects.projects') : t('projects.project')}
              </p>
            </div>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={filters.clearFilters}>
                <X className="h-4 w-4 mr-1" />
                {t('projects.clearFilters')}
              </Button>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100} direction="up">
          <div className="space-y-6 mb-10">
            <div>
              <label htmlFor="type-filter" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                {t('projects.byType')}
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => filters.setSelectedType('all')}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    filters.selectedType === 'all'
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700'
                  )}
                >
                  {t('projects.all')}
                </button>
                {projectTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => filters.setSelectedType(type.value as ProjectType)}
                    className={cn(
                      'px-4 py-2 rounded-full text-sm font-medium transition-all',
                      filters.selectedType === type.value
                        ? 'bg-primary-600 text-white'
                        : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700'
                    )}
                  >
                    {getTypeLabel(type.value as ProjectType)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="tech-filter" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                {t('projects.byTech')} ({allTechnologies.length})
              </label>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-2">
                {allTechnologies.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => filters.toggleTech(tech)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-sm transition-all',
                      filters.selectedTechs.includes(tech)
                        ? 'bg-primary-600 text-white'
                        : `bg-secondary-100 text-secondary-700 hover:bg-secondary-200 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700 ${techColors[tech] || ''}`
                    )}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} direction="up">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <article
                key={project.slug}
                className="group bg-white dark:bg-secondary-900 rounded-2xl border border-secondary-100 dark:border-secondary-800 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="h-16 w-16 text-primary-200 dark:text-primary-800 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" size="sm" className="bg-white/90 dark:bg-secondary-900/90 backdrop-blur">
                      {getTypeLabel(project.type)}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 6).map((tech, i) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        size="sm"
                        className={cn(techColors[tech], 'group-hover:border-primary-300 dark:group-hover:border-primary-700 transition-colors')}
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 6 && (
                      <Badge variant="outline" size="sm" className="text-secondary-500 dark:text-secondary-400">
                        +{project.technologies.length - 6}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-secondary-100 dark:border-secondary-800">
                    <a
                      href={`/${locale}/projets/${project.slug}`}
                      className="flex-1 text-center"
                    >
                      <Button variant="outline" size="sm" className="w-full group">
                        {t('projects.viewProject')}
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </a>
                    {(project.github || project.demo) && (
                      <div className="flex gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800"
                            aria-label={t('projects.viewGitHub')}
                          >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800"
                            aria-label={t('projects.viewDemo')}
                          >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/></svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>

        {filteredProjects.length === 0 && (
          <ScrollReveal delay={200} direction="up">
            <div className="text-center py-12">
              <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                {t('projects.noResults')}
              </p>
              <Button variant="outline" onClick={filters.clearFilters}>
                {t('projects.clearFilters')}
              </Button>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}