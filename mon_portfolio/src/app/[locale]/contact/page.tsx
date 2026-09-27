import { Metadata } from 'next';
import { Locale } from '@/types';
import { contentRepository } from '@/lib/content/repository';
import { ContactForm } from '@/components/sections/ContactForm';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import { getMessages, getTranslations } from '@/lib/i18n/messages';

interface ContactPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);
  
  return {
    title: t('contact.title'),
    description: 'Contactez-moi pour vos projets, opportunités de stage ou toute question technique.',
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = getTranslations(locale);
  
  const [profile, cvData] = await Promise.all([
    contentRepository.getProfile(locale),
    contentRepository.getCV(locale),
  ]);

  return (
    <div className="min-h-screen">
      <section className="py-20 lg:py-32 bg-gradient-to-b from-primary-50/50 to-transparent dark:from-secondary-900/50 dark:to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>
      
      <ContactForm locale={locale} profile={profile} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center">
          <Link href={`/${locale}/projets`}>
            <Button variant="outline" size="lg" className="group w-full sm:w-auto">
              <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
              {t('navigation.previousTo', { page: t('nav.projects') })}
            </Button>
          </Link>
          <p className="mt-4 text-sm text-secondary-500 dark:text-secondary-400">
            {t('navigation.step')} 5 {t('navigation.of')} 5
          </p>
        </div>
      </div>
    </div>
  );
}