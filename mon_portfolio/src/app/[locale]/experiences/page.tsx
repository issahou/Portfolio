import { Metadata } from 'next';
import { Locale } from '@/types';
import { contentRepository } from '@/lib/content/repository';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { getMessages, getTranslations } from '@/lib/i18n/messages';

interface ExperiencePageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: ExperiencePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);
  
  return {
    title: t('experience.title'),
    description: 'Mon parcours professionnel : stages, expériences freelance et formation académique.',
  };
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { locale } = await params;
  const t = getTranslations(locale);
  
  const [profile, cvData] = await Promise.all([
    contentRepository.getProfile(locale),
    contentRepository.getCV(locale),
  ]);

  return (
    <div className="min-h-screen">
      
      <ExperienceTimeline 
        locale={locale} 
        experiences={cvData.experiences} 
        formation={cvData.formation} 
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={`/${locale}/competences`}>
            <Button variant="outline" size="lg" className="group w-full sm:w-auto">
              <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
              {t('navigation.previousTo', { page: t('nav.skills') })}
            </Button>
          </Link>
          <Link href={`/${locale}/projets`}>
            <Button size="lg" className="group w-full sm:w-auto">
              {t('navigation.nextTo', { page: t('nav.projects') })}
              <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <p className="mt-4 text-center text-sm text-secondary-500 dark:text-secondary-400">
          {t('navigation.step')} 3 {t('navigation.of')} 5
        </p>
      </div>
    </div>
  );
}