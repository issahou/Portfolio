'use client';

import { useState, useMemo, useCallback } from 'react';
import { Project, ProjectType } from '@/types';
import { PROJECT_TYPES } from '@/lib/constants';

interface UseProjectsOptions {
  initialProjects: Project[];
  locale: 'fr' | 'en';
}

export function useProjects({ initialProjects, locale }: UseProjectsOptions) {
  const [selectedType, setSelectedType] = useState<ProjectType | 'all'>('all');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    initialProjects.forEach(p => p.technologies.forEach(t => techs.add(t)));
    return Array.from(techs).sort();
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    return initialProjects.filter(project => {
      // Type filter
      if (selectedType !== 'all' && project.type !== selectedType) return false;
      
      // Technology filter
      if (selectedTechs.length > 0 && !selectedTechs.every(tech => project.technologies.includes(tech))) {
        return false;
      }
      
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchable = `${project.title} ${project.description} ${project.technologies.join(' ')} ${project.role}`.toLowerCase();
        if (!searchable.includes(query)) return false;
      }
      
      return true;
    });
  }, [initialProjects, selectedType, selectedTechs, searchQuery]);

  const toggleTech = useCallback((tech: string) => {
    setSelectedTechs(prev => prev.includes(tech) 
      ? prev.filter(t => t !== tech) 
      : [...prev, tech]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedType('all');
    setSelectedTechs([]);
    setSearchQuery('');
  }, []);

  const projectTypes = PROJECT_TYPES.map(t => ({ value: t.value, label: t.label }));

  return {
    projects: filteredProjects,
    allProjects: initialProjects,
    allTechnologies,
    filters: {
      selectedType,
      setSelectedType,
      selectedTechs,
      toggleTech,
      searchQuery,
      setSearchQuery,
      clearFilters,
    },
    projectTypes,
    hasActiveFilters: selectedType !== 'all' || selectedTechs.length > 0 || searchQuery !== '',
  };
}