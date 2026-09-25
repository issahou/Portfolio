'use client';

import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui';
import { Badge } from '@/components/ui';
import { PROJECT_TYPES } from '@/lib/constants';
import { ProjectType } from '@/types';
import { X, Filter } from 'lucide-react';
import { Locale } from '@/types';

interface ProjectFiltersProps {
  locale: Locale;
  selectedType: ProjectType | 'all';
  setSelectedType: (type: ProjectType | 'all') => void;
  selectedTechs: string[];
  toggleTech: (tech: string) => void;
  allTechnologies: string[];
  clearFilters: () => void;
  hasActiveFilters: boolean;
  t: (key: string) => string;
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

export function ProjectFilters({
  locale,
  selectedType,
  setSelectedType,
  selectedTechs,
  toggleTech,
  allTechnologies,
  clearFilters,
  hasActiveFilters,
  t,
}: ProjectFiltersProps) {
  const getTypeLabel = (type: ProjectType) => {
    const found = PROJECT_TYPES.find(p => p.value === type);
    return found ? t(`projects.type.${type}`) : type;
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="type-filter" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
          <Filter className="h-4 w-4 inline mr-1" />
          {t('projects.byType')}
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedType('all')}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              selectedType === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700'
            )}
          >
            {t('projects.all')}
          </button>
          {PROJECT_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                selectedType === type.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700'
              )}
            >
              {getTypeLabel(type.value)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="tech-filter" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
          <Filter className="h-4 w-4 inline mr-1" />
          {t('projects.byTech')} ({allTechnologies.length})
        </label>
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2">
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => toggleTech(tech)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm transition-all',
                selectedTechs.includes(tech)
                  ? 'bg-primary-600 text-white'
                  : `bg-secondary-100 text-secondary-700 hover:bg-secondary-200 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700 ${techColors[tech] || ''}`
              )}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="pt-4 border-t border-secondary-100 dark:border-secondary-800">
          <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full sm:w-auto">
            <X className="h-4 w-4 mr-1" />
            Effacer tous les filtres
          </Button>
        </div>
      )}
    </div>
  );
}