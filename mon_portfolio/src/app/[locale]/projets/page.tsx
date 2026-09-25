import { Metadata } from 'next';
import { Locale } from '@/types';
import { contentRepository } from '@/lib/content/repository';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
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
      <section className="py-20 lg:py-32 bg-gradient-to-b from-primary-50/50 to-transparent dark:from-secondary-900/50 dark:to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
            {t('projects.title')}
          </h1>
          <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
            Une sélection de mes réalisations : applications web, projets académiques, hackathons et contributions open source.
          </p>
        </div>
      </section>
      
      <ProjectsSection locale={locale} projects={projects} />
    </div>
  );
}