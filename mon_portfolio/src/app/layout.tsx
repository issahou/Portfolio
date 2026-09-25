import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Portfolio - Votre Nom',
    template: '%s | Portfolio',
  },
  description: 'Développeur Full Stack - Étudiant Ingénieur Informatique 5ème année',
  keywords: ['développeur', 'full stack', 'react', 'next.js', 'typescript', 'portfolio'],
  authors: [{ name: 'Votre Nom' }],
  creator: 'Votre Nom',
  publisher: 'Votre Nom',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://portfolio-nom.vercel.app',
    siteName: 'Portfolio - Votre Nom',
    title: 'Portfolio - Votre Nom',
    description: 'Développeur Full Stack passionné par la création d\'applications web modernes et performantes.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio - Votre Nom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Votre Nom',
    description: 'Développeur Full Stack - Étudiant Ingénieur Informatique 5ème année',
    images: ['/images/og-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${geistMono.variable} h-full`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className="min-h-full bg-white dark:bg-secondary-950 text-secondary-900 dark:text-white antialiased">
        {children}
      </body>
    </html>
  );
}