import Link from 'next/link';
import { Locale } from '@/types';
import { Home, ArrowLeft } from 'lucide-react';
import { getMessages, getTranslations } from '@/lib/i18n/messages';

interface NotFoundProps {
  params?: Promise<{ locale: Locale }>;
}

export default async function NotFound({ params }: NotFoundProps) {
  const locale = (await params?.then(p => p?.locale)) || 'fr';
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-secondary-950 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-primary-500/20 dark:text-primary-500/10 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
          {t('notFound.title') || 'Page non trouvée'}
        </h2>
        <p className="text-secondary-600 dark:text-secondary-400 mb-8">
          {t('notFound.description') || 'Cette page n\'existe pas ou a été déplacée.'}
        </p>
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
          <ArrowLeft className="h-5 w-5" />
          {t('notFound.backHome') || 'Retour à l\'accueil'}
        </Link>
      </div>
    </div>
  );
}