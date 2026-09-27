'use client';

import Link from 'next/link';
import { Download, ChevronRight, Briefcase, Heart, Languages, Star, ArrowRight } from 'lucide-react';
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
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  delay?: number;
}

function InfoCard({ icon, title, items, delay = 0 }: InfoCardProps) {
  return (
    <ScrollReveal delay={delay} direction="up">
      <div className="bg-white dark:bg-secondary-900 border border-secondary-100 dark:border-secondary-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">{title}</h3>
        </div>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-secondary-600 dark:text-secondary-400">
              <span className="text-primary-500 mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}

function parseAboutSections(about: string) {
  const sections: { title: string; items: string[] }[] = [];
  const lines = about.split('\n');
  let currentTitle: string | null = null;
  let currentItems: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      if (currentTitle && currentItems.length > 0) {
        sections.push({ title: currentTitle, items: currentItems });
      }
      currentTitle = trimmed.slice(2, -2);
      currentItems = [];
    } else if (trimmed.startsWith('-')) {
      currentItems.push(trimmed.slice(1).trim());
    }
  }

  if (currentTitle && currentItems.length > 0) {
    sections.push({ title: currentTitle, items: currentItems });
  }

  return sections;
}

const iconMap: Record<string, React.ReactNode> = {
  'Parcours & Formation': <Briefcase className="h-5 w-5 text-primary-600 dark:text-primary-400" />,
  'Soft Skills': <Heart className="h-5 w-5 text-accent-600 dark:text-accent-400" />,
  Langues: <Languages className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
  'Centres d\'intérêt': <Star className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
};

export function AboutSection({ locale, profile }: AboutSectionProps) {
  const t = useTranslations(locale);
  const sections = parseAboutSections(profile.about);

  return (
    <section id="about" className="py-20 lg:py-32 bg-white dark:bg-secondary-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal delay={0} direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              À propos
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400">
              {profile.about.split('\n\n')[0]}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {sections.map((section, index) => (
            <InfoCard
              key={section.title}
              icon={iconMap[section.title] || <Briefcase className="h-5 w-5 text-primary-600 dark:text-primary-400" />}
              title={section.title}
              items={section.items}
              delay={100 + index * 50}
            />
          ))}
        </div>

        <div className="text-center">
          <ScrollReveal delay={500} direction="up">
            <Link href={profile.cv.url} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg" className="group">
                <Download className="h-5 w-5 mr-2" />
                Télécharger CV
                <ChevronRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={600} direction="up">
            <Link href={`/${locale}/competences`}>
              <Button size="lg" className="group w-full sm:w-auto mt-6" variant="outline">
                {t('navigation.nextTo', { page: t('nav.skills') })}
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-secondary-500 dark:text-secondary-400">
              {t('navigation.step')} 1 {t('navigation.of')} 5
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
