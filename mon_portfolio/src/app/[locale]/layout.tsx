import { ReactNode, Suspense } from 'react';
import { Locale } from '@/types';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { MainLayout } from '@/components/layout/MainLayout';
import { contentRepository } from '@/lib/content/repository';
import { getMessages } from '@/lib/i18n/messages';

function LayoutSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-secondary-950">
      <header className="animate-pulse h-16 bg-secondary-100 dark:bg-secondary-900" />
      <main className="px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="h-32 bg-secondary-200 dark:bg-secondary-800 rounded-xl" />
          <div className="h-64 bg-secondary-200 dark:bg-secondary-800 rounded-xl" />
          <div className="grid md:grid-cols-3 gap-6">
            <div className="h-64 bg-secondary-200 dark:bg-secondary-800 rounded-xl" />
            <div className="h-64 bg-secondary-200 dark:bg-secondary-800 rounded-xl" />
            <div className="h-64 bg-secondary-200 dark:bg-secondary-800 rounded-xl" />
          </div>
        </div>
      </main>
      <footer className="animate-pulse h-20 bg-secondary-100 dark:bg-secondary-900" />
    </div>
  );
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const messages = getMessages(locale);
  const profile = await contentRepository.getProfile(locale as Locale);

  return (
    <ThemeProvider>
      <Suspense fallback={<LayoutSkeleton />}>
        <MainLayout locale={locale as Locale} profile={profile}>
          {children}
        </MainLayout>
      </Suspense>
    </ThemeProvider>
  );
}