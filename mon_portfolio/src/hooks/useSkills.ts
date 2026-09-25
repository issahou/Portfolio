'use client';

import { useState } from 'react';
import { SkillCategory } from '@/types';

export function useSkills(categories: SkillCategory[]) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    categories.map(c => c.name)
  );

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const expandAll = () => setExpandedCategories(categories.map(c => c.name));
  const collapseAll = () => setExpandedCategories([]);

  return {
    categories,
    expandedCategories,
    toggleCategory,
    expandAll,
    collapseAll,
    isExpanded: (categoryName: string) => expandedCategories.includes(categoryName),
  };
}