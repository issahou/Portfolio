import { Locale } from '@/types';
import { contentRepository } from '@/lib/content/repository';
import { Hero } from '@/components/sections/Hero';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';
import { ContactForm } from '@/components/sections/ContactForm';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  
  const [profile, skills, projects, cvData, featuredProjects] = await Promise.all([
    contentRepository.getProfile(locale),
    contentRepository.getSkills(locale),
    contentRepository.getProjects(locale),
    contentRepository.getCV(locale),
    contentRepository.getFeaturedProjects(locale),
  ]);

  return (
    <>
      <Hero locale={locale} profile={profile} />
      <AboutSection locale={locale} profile={profile} cvData={cvData} />
      <SkillsSection locale={locale} categories={skills} />
      <ProjectsSection locale={locale} projects={featuredProjects} />
      <ExperienceTimeline locale={locale} experiences={cvData.experiences} formation={cvData.formation} certifications={cvData.certifications} />
      <ContactForm locale={locale} profile={profile} />
    </>
  );
}