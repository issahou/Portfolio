'use client';

import { cn } from '@/lib/utils/cn';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { formatDateRange } from '@/lib/utils/date';
import { Locale } from '@/types';

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
  certifications: Array<{
    name: string;
    year: number;
    url?: string;
  }>;
  t: (key: string) => string;
}

export function ExperienceTimeline({ locale, experiences, formation, certifications, t }: ExperienceTimelineProps) {
  return (
    <section id="experience" className="py-20 lg:py-32 bg-secondary-50 dark:bg-secondary-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal delay={0} direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              {t('experience.title')}
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400">
              Mon parcours professionnel et académique
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 to-accent-400" />
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ScrollReveal key={`exp-${exp.company}-${exp.start}`} delay={index * 100} direction="left">
                <div className="relative flex lg:flex-row-reverse">
                  <div className="absolute left-4 lg:left-1/2 top-2 -translate-x-1/2 lg:-translate-x-1/2 z-10">
                    <div className="w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-secondary-950 shadow-lg" />
                  </div>
                  <div className={cn(
                    'w-full lg:w-1/2 px-4 lg:pr-8 lg:pl-0',
                    index % 2 === 0 ? 'lg:pl-8 lg:pr-0' : ''
                  )}>
                    <div className="bg-white dark:bg-secondary-900 rounded-2xl border border-secondary-100 dark:border-secondary-800 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-semibold text-secondary-900 dark:text-white">{exp.title}</h3>
                          <p className="text-primary-600 dark:text-primary-400">{exp.company}</p>
                        </div>
                        <div className="text-right text-sm text-secondary-500 dark:text-secondary-400 whitespace-nowrap">
                          <span>{exp.location}</span>
                          <br />
                          <span>{formatDateRange(exp.start, exp.end, locale)}</span>
                        </div>
                      </div>
                      <ul className="space-y-1 text-secondary-600 dark:text-secondary-400 text-sm">
                        {exp.description.map((desc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary-500 mt-1">•</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.technologies.map((tech, i) => (
                          <span key={i} className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            {formation.map((edu, index) => (
              <ScrollReveal key={`edu-${edu.school}-${edu.start}`} delay={(experiences.length + index) * 100} direction="left">
                <div className="relative flex lg:flex-row-reverse">
                  <div className="absolute left-4 lg:left-1/2 top-2 -translate-x-1/2 lg:-translate-x-1/2 z-10">
                    <div className="w-4 h-4 bg-accent-500 rounded-full border-4 border-white dark:border-secondary-950 shadow-lg" />
                  </div>
                  <div className={cn(
                    'w-full lg:w-1/2 px-4 lg:pr-8 lg:pl-0',
                    (experiences.length + index) % 2 === 0 ? 'lg:pl-8 lg:pr-0' : ''
                  )}>
                    <div className="bg-white dark:bg-secondary-900 rounded-2xl border border-secondary-100 dark:border-secondary-800 p-6 shadow-sm">
                      <h3 className="font-semibold text-secondary-900 dark:text-white">{edu.degree}</h3>
                      <p className="text-accent-600 dark:text-accent-400">{edu.school}</p>
                      <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">
                        {edu.location} · {formatDateRange(edu.start, edu.end, locale)}
                        {edu.honors && ` · ${edu.honors}`}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {certifications.length > 0 && (
          <ScrollReveal delay={(experiences.length + formation.length) * 100} direction="up">
            <div className="mt-16">
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-6 text-center">
                {t('experience.certifications')}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {certifications.map((cert) => (
                  <a
                    key={cert.name}
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 rounded-xl text-sm text-secondary-700 dark:text-secondary-300 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                  >
                    <span className="font-medium">{cert.name}</span>
                    <span className="text-secondary-500 dark:text-secondary-400">({cert.year})</span>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}