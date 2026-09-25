'use client';

import { useSkills } from '@/hooks/useSkills';
import { cn } from '@/lib/utils/cn';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui';
import { SkillCategory } from '@/types';
import { Locale } from '@/types';
import { useTranslations } from '@/hooks/useTranslations';

const skillIcons: Record<string, () => React.ReactNode> = {
  code: () => <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>,
  layout: () => <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>,
  server: () => <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"/></svg>,
  database: () => <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/></svg>,
  tool: () => <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  users: () => <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
};

interface SkillsSectionProps {
  locale: Locale;
  categories: SkillCategory[];
}

export function SkillsSection({ locale, categories }: SkillsSectionProps) {
  const t = useTranslations(locale);
  const { categories: skillsCategories, expandedCategories, toggleCategory, isExpanded, expandAll, collapseAll } = useSkills(categories);

  return (
    <section id="skills" className="py-20 lg:py-32 bg-secondary-50 dark:bg-secondary-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal delay={0} direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              {t('skills.title')}
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400">
              {t('skills.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={expandAll}
            className="px-4 py-2 text-sm text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            {t('skills.expandAll')}
          </button>
          <button
            onClick={collapseAll}
            className="px-4 py-2 text-sm text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            {t('skills.collapseAll')}
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsCategories.map((category, index) => (
            <ScrollReveal key={category.name} delay={index * 50} direction="up">
              <div className="bg-white dark:bg-secondary-900 rounded-2xl border border-secondary-100 dark:border-secondary-800 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="w-full p-5 flex items-center justify-between hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-colors"
                  aria-expanded={isExpanded(category.name)}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-xl text-primary-600 dark:text-primary-400">
                      {skillIcons[category.icon]?.() || skillIcons.code?.()}
                    </div>
                    <h3 className="font-semibold text-secondary-900 dark:text-white">{category.name}</h3>
                    <span className="text-sm text-secondary-500 dark:text-secondary-400">
                      {category.items.length} compétences
                    </span>
                  </div>
                  <svg
                    className={cn(
                      'h-5 w-5 text-secondary-500 transition-transform duration-200',
                      isExpanded(category.name) && 'rotate-180'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    isExpanded(category.name) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className="px-5 pb-5 pt-0 border-t border-secondary-100 dark:border-secondary-800">
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item, itemIndex) => (
                        <Badge
                          key={item.name}
                          variant="outline"
                          size="sm"
                          className="group hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-700 transition-all"
                        >
                          <span className="font-medium">{item.name}</span>
                          <div className="flex items-center gap-1 ml-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={cn(
                                  'w-3 h-3 rounded-full transition-colors',
                                  i < item.level
                                    ? 'bg-primary-500'
                                    : 'bg-secondary-200 dark:bg-secondary-700'
                                )}
                              />
                            ))}
                          </div>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}