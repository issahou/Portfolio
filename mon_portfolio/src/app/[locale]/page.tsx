import { Locale } from '@/types';
import { contentRepository } from '@/lib/content/repository';
import { Hero } from '@/components/sections/Hero';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';
import { ContactForm } from '@/components/sections/ContactForm';
import { getMessages, getTranslations } from '@/lib/i18n/messages';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = getTranslations(locale);
  
  const [profile, skills, projects, cvData, featuredProjects] = await Promise.all([
    contentRepository.getProfile(locale),
    contentRepository.getSkills(locale),
    contentRepository.getProjects(locale),
    contentRepository.getCV(locale),
    contentRepository.getFeaturedProjects(locale),
  ]);

  return (
    <>
      <Hero locale={locale} profile={profile} t={t} />
      <AboutSection locale={locale} profile={profile} cvData={cvData} t={t} />
      <SkillsSection locale={locale} categories={skills} t={t} />
      <ProjectsSection locale={locale} projects={featuredProjects} t={t} />
      <ExperienceTimeline locale={locale} experiences={cvData.experiences} formation={cvData.formation} certifications={cvData.certifications} t={t} />
      <ContactForm locale={locale} t={t} profile={profile} />
    </>
  );
}