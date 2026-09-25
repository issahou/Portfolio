'use client';

import Link from 'next/link';
import { ArrowDown, Download, Mail, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Locale } from '@/types';

interface HeroProps {
  locale: Locale;
  profile: {
    name: string;
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
  };
  t: (key: string) => string;
}

export function Hero({ locale, profile, t }: HeroProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-50/50 to-transparent dark:from-secondary-900/50 dark:to-transparent">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/30 dark:bg-accent-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <ScrollReveal delay={0} direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/80 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
                </span>
                <span className="text-sm font-medium text-primary-700 dark:text-primary-400">
                  {t('hero.scrollDown')}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100} direction="up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-secondary-900 dark:text-white mb-6">
                {profile.name}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200} direction="up">
              <p className="text-xl sm:text-2xl text-secondary-600 dark:text-secondary-300 mb-4 font-medium">
                {profile.title}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300} direction="up">
              <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8 max-w-xl leading-relaxed">
                {profile.tagline}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={400} direction="up">
              <div className="flex flex-wrap items-center gap-4">
                <Link href={profile.cv.url} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="group">
                    <Download className="h-5 w-5 mr-2" />
                    {t('hero.downloadCV')}
                    <ChevronRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href={`/${locale}/contact`}>
                  <Button variant="outline" size="lg">
                    <Mail className="h-5 w-5 mr-2" />
                    {t('hero.contactMe')}
                  </Button>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={500} direction="up">
              <div className="flex items-center gap-6 mt-10 pt-6 border-t border-secondary-100 dark:border-secondary-800">
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a
                  href={`mailto:${profile.social.email}`}
                  className="text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors"
                  aria-label="Email"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </a>
              </div>
            </ScrollReveal>
          </div>

          <div className="relative">
            <ScrollReveal delay={200} direction="right">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-3xl blur-2xl" />
                <div className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden border-4 border-primary-200 dark:border-primary-800 bg-secondary-100 dark:bg-secondary-800">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30">
                    <svg className="h-32 w-32 text-primary-300 dark:text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <motion.button
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)' }}
            >
              <button
                onClick={() => scrollToSection('about')}
                className="text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors p-2"
                aria-label="Défiler vers la section À propos"
              >
                <ArrowDown className="h-8 w-8" />
              </button>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}