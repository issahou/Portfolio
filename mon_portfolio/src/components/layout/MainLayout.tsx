import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: ReactNode;
  locale: 'fr' | 'en';
  profile: {
    name: string;
    social: {
      email: string;
      linkedin: string;
      github: string;
      twitter?: string;
    };
    cv: {
      filename: string;
      url: string;
    };
  };
}

export function MainLayout({ children, locale, profile }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-secondary-950">
      <Header locale={locale} />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer locale={locale} profile={profile} />
    </div>
  );
}