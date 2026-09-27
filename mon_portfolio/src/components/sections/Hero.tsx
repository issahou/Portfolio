'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Send, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { Locale } from '@/types';
import { useTranslations } from '@/hooks/useTranslations';

interface HeroProps {
  locale: Locale;
  profile: {
    name: string;
    handle?: string;
    title: string;
    tagline: string;
    avatar: string;
    social: {
      email: string;
      linkedin: string;
      github: string;
    };
    cv: {
      filename: string;
      url: string;
    };
    stats?: {
      projects: number;
      stacks: string[];
      focus: string[];
    };
  };
}

const skillCategories = [
  {
    name: 'Analyse & Architecture Logicielle',
    items: ['UML', 'Merise', 'Arch. Log.', 'Design Ptns', 'Clean Arch', 'Microserv.'],
  },
  {
    name: 'Développement Full Stack',
    items: ['Java', 'TypeScript', 'JavaScript', 'HTML5/CSS3', 'NestJS', 'Node.js', 'Express', 'REST API', 'Git/GitHub'],
  },
];

export function Hero({ locale, profile }: HeroProps) {
  const t = useTranslations(locale);

  return (
    <section id="hero" className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-50/50 to-transparent dark:from-secondary-900/50 dark:to-transparent py-12">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/30 dark:bg-accent-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-secondary-950 border border-secondary-200 dark:border-secondary-800 rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-secondary-200 dark:border-secondary-700">
                    <Image
                      src={profile.avatar || '/images/avatar/photo-profil.png'}
                      alt={profile.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                      priority
                      onError={(e: any) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-secondary-900 dark:text-white">
                      {profile.name}
                    </h1>
                    {profile.handle && (
                      <p className="text-xs text-secondary-500 dark:text-secondary-400 font-mono">
                        {profile.handle}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  className="p-1.5 rounded-xl text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 hover:bg-secondary-100 dark:hover:bg-secondary-900 transition-colors"
                  aria-label="Settings"
                >
                  <Settings className="h-4 w-4" />
                </button>
              </div>

              <p className="text-secondary-600 dark:text-secondary-300 mb-6 text-xs">
                {profile.title}
              </p>

              <div className="grid grid-cols-3 gap-2 border-b border-secondary-200 dark:border-secondary-800 pb-5 mb-5">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {profile.stats?.projects ?? '12'}
                  </div>
                  <div className="text-[10px] font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider mt-0.5">
                    Projets
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-600 dark:text-accent-400">
                    {profile.stats?.stacks?.join(', ') ?? 'Full-stack'}
                  </div>
                  <div className="text-[10px] font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider mt-0.5">
                    Stacks
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary-700 dark:text-secondary-300">
                    {profile.stats?.focus?.join(' & ') ?? 'Data & Sec'}
                  </div>
                  <div className="text-[10px] font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider mt-0.5">
                    Focus
                  </div>
                </div>
              </div>

              <h2 className="text-lg font-bold text-secondary-900 dark:text-white mb-3">
                QUI SUIS-JE ?
              </h2>

              <p className="text-secondary-600 dark:text-secondary-400 mb-5 leading-relaxed text-sm">
                {profile.tagline}
              </p>

              <div className="flex justify-center gap-3 pt-4 border-t border-secondary-200 dark:border-secondary-800">
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-medium text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-lg transition-colors"
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </a>
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-medium text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-lg transition-colors"
                  aria-label="GitHub"
                >
                  GitHub
                </a>
                <a
                  href={`mailto:${profile.social.email}`}
                  className="px-3 py-1.5 text-xs font-medium text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-lg transition-colors"
                  aria-label="Email"
                >
                  Email
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-4 text-center">
              Langages, compétences & technologies
            </h3>

            {skillCategories.map((category, catIndex) => (
              <div key={category.name}>
                <h4 className="text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-3">
                  {category.name}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {category.items.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: catIndex * 0.1 + skillIndex * 0.03 }}
                      className="bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-800 rounded-xl p-3 text-center hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                    >
                      <div className="w-6 h-6 mx-auto mb-1.5 flex items-center justify-center text-secondary-500 dark:text-secondary-400">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" strokeWidth={2} />
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-secondary-700 dark:text-secondary-300">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
