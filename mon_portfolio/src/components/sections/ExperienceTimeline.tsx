'use client';

import { cn } from '@/lib/utils/cn';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { formatDateRange } from '@/lib/utils/date';
import { Locale } from '@/types';
import { useTranslations } from '@/hooks/useTranslations';
import { Briefcase, GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

interface ExperienceTimelineProps {
  locale: Locale;
  experiences: Array<{
    title: string;
    company: string;
    location: string;
    start: string;
    end: string;
    description: string[];
    technologies: string[];
  }>;
  formation: Array<{
    degree: string;
    school: string;
    location: string;
    start: string;
    end: string;
    honors?: string;
  }>;
}

export function ExperienceTimeline({ locale, experiences, formation }: ExperienceTimelineProps) {
  const t = useTranslations(locale);

  return (
    <section id="experience" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal delay={0} direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              {t('experience.title')}
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400">
              {t('experience.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {experiences.length > 0 && (
          <div className="mb-24">
            <ScrollReveal delay={0} direction="up">
              <h3 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-8 flex items-center gap-3">
                <Briefcase className="h-6 w-6 text-primary-500" />
                {t('experience.experiences')}
              </h3>
            </ScrollReveal>

            <div className="relative">
              <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 via-accent-400 to-secondary-400 dark:from-primary-500 dark:via-accent-500 dark:to-secondary-500" />

              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <ScrollReveal key={`exp-${exp.company}-${exp.start}`} delay={index * 100} direction="left">
                    <div className="relative flex lg:justify-end">
                      <div className="absolute left-4 lg:left-1/2 top-4 -translate-x-1/2 lg:-translate-x-1/2 z-10">
                        <div className="w-5 h-5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full border-4 border-white dark:border-secondary-950 shadow-lg ring-2 ring-primary-200 dark:ring-primary-900/30" />
                      </div>
                      <div className={cn(
                        'w-full lg:w-1/2 bg-white dark:bg-secondary-900 border border-secondary-100 dark:border-secondary-800 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300 group',
                        index % 2 === 0 ? 'lg:mr-auto lg:pl-12 lg:pr-0' : 'lg:ml-auto lg:pl-0 lg:pr-12'
                      )}>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-xl text-primary-600 dark:text-primary-400">
                              <Briefcase className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-secondary-900 dark:text-white text-lg group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                                {exp.title}
                              </h4>
                              <p className="text-primary-600 dark:text-primary-400 font-medium">
                                {exp.company}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-start sm:items-end text-sm text-secondary-500 dark:text-secondary-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDateRange(exp.start, exp.end, locale)}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-0.5">
                              <MapPin className="h-3 w-3" />
                              <span>{exp.location}</span>
                            </div>
                          </div>
                        </div>

                        <ul className="space-y-2 text-secondary-600 dark:text-secondary-400 text-sm mb-4">
                          {exp.description.map((desc, i) => (
                            <li key={i} className="flex items-start gap-2 group-hover:translate-x-1 transition-transform">
                              <span className="text-primary-500 mt-0.5 flex-shrink-0">▹</span>
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 text-primary-700 dark:text-primary-300 rounded-full border border-primary-100 dark:border-primary-800"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        )}

        {formation.length > 0 && (
          <div>
            <ScrollReveal delay={experiences.length * 100} direction="up">
              <h3 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-8 flex items-center gap-3">
                <GraduationCap className="h-6 w-6 text-accent-500" />
                {t('experience.education')}
              </h3>
            </ScrollReveal>

            <div className="relative">
              <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-400 via-purple-400 to-secondary-400 dark:from-accent-500 dark:via-purple-500 dark:to-secondary-500" />

              <div className="space-y-12">
                {formation.map((edu, index) => (
                  <ScrollReveal key={`edu-${edu.school}-${edu.start}`} delay={(experiences.length + index) * 100} direction="left">
                    <div className="relative flex lg:justify-end">
                      <div className="absolute left-4 lg:left-1/2 top-4 -translate-x-1/2 lg:-translate-x-1/2 z-10">
                        <div className="w-5 h-5 bg-gradient-to-r from-accent-500 to-purple-500 rounded-full border-4 border-white dark:border-secondary-950 shadow-lg ring-2 ring-accent-200 dark:ring-accent-900/30" />
                      </div>
                      <div className={cn(
                        'w-full lg:w-1/2 bg-white dark:bg-secondary-900 border border-secondary-100 dark:border-secondary-800 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-accent-200 dark:hover:border-accent-800 transition-all duration-300 group',
                        (experiences.length + index) % 2 === 0 ? 'lg:mr-auto lg:pl-12 lg:pr-0' : 'lg:ml-auto lg:pl-0 lg:pr-12'
                      )}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-xl text-accent-600 dark:text-accent-400">
                            <GraduationCap className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-secondary-900 dark:text-white text-lg group-hover:text-accent-700 dark:group-hover:text-accent-400 transition-colors">
                              {edu.degree}
                            </h4>
                            <p className="text-accent-600 dark:text-accent-400 font-medium">
                              {edu.school}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-secondary-500 dark:text-secondary-400 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{edu.location}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1 sm:mt-0">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDateRange(edu.start, edu.end, locale)}</span>
                          </div>
                        </div>

                        {edu.honors && (
                          <div className="flex items-center gap-2 text-sm">
                            <Award className="h-4 w-4 text-accent-600 dark:text-accent-400" />
                            <span className="text-accent-700 dark:text-accent-300 font-medium">
                              {edu.honors}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
