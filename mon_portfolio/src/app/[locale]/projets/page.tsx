import { Metadata } from 'next';
import { Locale } from '@/types';
import { contentRepository } from '@/lib/content/repository';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { getMessages, getTranslations } from '@/lib/i18n/messages';

interface ProjectsPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);
  
  return {
    title: t('projects.title'),
    description: 'Découvrez mes projets académiques, personnels et professionnels avec détails techniques et démonstrations.',
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const t = getTranslations(locale);
  
  const [profile, projects] = await Promise.all([
    contentRepository.getProfile(locale),
    contentRepository.getProjects(locale),
  ]);

  return (
    <div className="min-h-screen">
      
      <ProjectsSection locale={locale} projects={projects} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={`/${locale}/experiences`}>
            <Button variant="outline" size="lg" className="group w-full sm:w-auto">
              <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
              {t('navigation.previousTo', { page: t('nav.experience') })}
            </Button>
          </Link>
          <Link href={`/${locale}/contact`}>
            <Button size="lg" className="group w-full sm:w-auto">
              {t('navigation.nextTo', { page: t('nav.contact') })}
              <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <p className="mt-4 text-center text-sm text-secondary-500 dark:text-secondary-400">
          {t('navigation.step')} 4 {t('navigation.of')} 5
        </p>
      </div>
    </div>
  );
}