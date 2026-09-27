import { Locale } from '@/types';
import { contentRepository } from '@/lib/content/repository';
import { Hero } from '@/components/sections/Hero';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  
  const profile = await contentRepository.getProfile(locale);

  return (
    <>
      <Hero locale={locale} profile={profile} />
    </>
  );
}