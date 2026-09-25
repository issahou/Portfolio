'use client';

import Link from 'next/link';
import { Download, ChevronRight, GraduationCap, Briefcase, Heart, Languages, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Locale } from '@/types';
import { useTranslations } from '@/hooks/useTranslations';

interface AboutSectionProps {
  locale: Locale;
  profile: {
    name: string;
    about: string;
    cv: {
      filename: string;
      url: string;
    };
  };
  cvData: {
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
  };
}

const sections = [
  { id: 'journey', icon: Briefcase, title: 'about.journey' },
  { id: 'education', icon: GraduationCap, title: 'about.education' },
  { id: 'softSkills', icon: Heart, title: 'about.softSkills' },
  { id: 'languages', icon: Languages, title: 'about.languages' },
  { id: 'interests', icon: Star, title: 'about.interests' },
];

export function AboutSection({ locale, profile, cvData }: AboutSectionProps) {
  const t = useTranslations(locale);
  return (
    <section id="about" className="py-20 lg:py-32 bg-white dark:bg-secondary-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal delay={0} direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              {t('about.title')}
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400">
              {profile.about.split('\n\n')[0]}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            {sections.map((section, index) => (
              <ScrollReveal key={section.id} delay={100 + index * 50} direction="up">
                <button
                  className={cn(
                    'w-full text-left p-4 rounded-xl transition-all duration-200',
                    'bg-secondary-50 dark:bg-secondary-900 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <section.icon className="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                    <span className="font-medium text-secondary-900 dark:text-white">{t(section.title)}</span>
                  </div>
                </button>
              </ScrollReveal>
            ))}
            
            <ScrollReveal delay={400} direction="up">
              <Link href={profile.cv.url} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" className="w-full" size="lg">
                  <Download className="h-5 w-5 mr-2" />
                  {t('cv.download')}
                </Button>
              </Link>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <ScrollReveal delay={100} direction="up">
              <div className="prose prose-secondary dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: profile.about.split('\n\n').slice(1).map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('') }} />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200} direction="up">
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-6 flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  {t('experience.experiences')}
                </h3>
                <div className="space-y-6">
                  {cvData.experiences.map((exp, index) => (
                    <motion.div
                      key={`${exp.company}-${exp.start}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="p-6 bg-secondary-50 dark:bg-secondary-900 rounded-xl border border-secondary-100 dark:border-secondary-800">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                          <div>
                            <h4 className="font-semibold text-secondary-900 dark:text-white">{exp.title}</h4>
                            <p className="text-primary-600 dark:text-primary-400">{exp.company}</p>
                          </div>
                          <div className="text-right text-sm text-secondary-500 dark:text-secondary-400 whitespace-nowrap">
                            <span>{exp.location}</span>
                            <br />
                            <span>{exp.start} - {exp.end === 'Present' || exp.end === 'Présent' ? 'Présent' : exp.end}</span>
                          </div>
                        </div>
                        <ul className="space-y-1 text-secondary-600 dark:text-secondary-400 text-sm">
                          {exp.description.map((desc, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary-500">•</span>
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
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300} direction="up">
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-6 flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  {t('experience.education')}
                </h3>
                <div className="space-y-4">
                  {cvData.formation.map((edu, index) => (
                    <motion.div
                      key={`${edu.school}-${edu.start}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="p-5 bg-secondary-50 dark:bg-secondary-900 rounded-xl border border-secondary-100 dark:border-secondary-800">
                        <h4 className="font-semibold text-secondary-900 dark:text-white">{edu.degree}</h4>
                        <p className="text-primary-600 dark:text-primary-400">{edu.school}</p>
                        <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">
                          {edu.location} · {edu.start} - {edu.end}
                          {edu.honors && ` · ${edu.honors}`}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400} direction="up">
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-6 flex items-center gap-2">
                  <Star className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  {t('experience.certifications')}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {cvData.certifications.map((cert, index) => (
                    <motion.div
                      key={cert.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-50 dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 rounded-xl text-sm text-secondary-700 dark:text-secondary-300 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                      >
                        <span className="font-medium">{cert.name}</span>
                        <span className="text-secondary-500 dark:text-secondary-400">({cert.year})</span>
                        {cert.url && <ChevronRight className="h-4 w-4" />}
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}