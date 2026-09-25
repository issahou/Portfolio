import { notFound } from 'next/navigation';
import { Locale } from '@/types';

export const locales: Locale[] = ['fr', 'en'];
export const defaultLocale: Locale = 'fr';
export const localePrefix = 'always' as const;

export const pathnames = {
  '/': '/',
  '/competences': {
    fr: '/competences',
    en: '/skills',
  },
  '/projets': {
    fr: '/projets',
    en: '/projects',
  },
  '/projets/[slug]': {
    fr: '/projets/[slug]',
    en: '/projects/[slug]',
  },
  '/experiences': {
    fr: '/experiences',
    en: '/experience',
  },
  '/contact': {
    fr: '/contact',
    en: '/contact',
  },
} as const;