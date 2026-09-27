import { Metadata } from 'next';
import { Locale } from '@/types';
import { contentRepository } from '@/lib/content/repository';
import { SkillsSection } from '@/components/sections/SkillsSection';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { getMessages, getTranslations } from '@/lib/i18n/messages';

interface SkillsPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: SkillsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);
  
  return {
    title: t('skills.title'),
    description: 'Mes compétences techniques en développement web, frameworks, bases de données et outils DevOps.',
  };
}

export default async function SkillsPage({ params }: SkillsPageProps) {
  const { locale } = await params;
  const t = getTranslations(locale);
  
  const [profile, skills] = await Promise.all([
    contentRepository.getProfile(locale),
    contentRepository.getSkills(locale),
  ]);

  return (
    <div className="min-h-screen">
      <section className="py-20 lg:py-32 bg-gradient-to-b from-primary-50/50 to-transparent dark:from-secondary-900/50 dark:to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
            {t('skills.title')}
          </h1>
          <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
            Technologies et outils que j'utilise au quotidien pour construire des applications modernes et performantes.
          </p>
        </div>
      </section>
      
      <SkillsSection locale={locale} categories={skills} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={`/${locale}`}>
            <Button variant="outline" size="lg" className="group w-full sm:w-auto">
              <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
              {t('navigation.previousTo', { page: t('nav.home') })}
            </Button>
          </Link>
          <Link href={`/${locale}/experiences`}>
            <Button size="lg" className="group w-full sm:w-auto">
              {t('navigation.nextTo', { page: t('nav.experience') })}
              <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <p className="mt-4 text-center text-sm text-secondary-500 dark:text-secondary-400">
          {t('navigation.step')} 2 {t('navigation.of')} 5
        </p>
      </div>
    </div>
  );
}