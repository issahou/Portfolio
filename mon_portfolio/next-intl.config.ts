import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'] as const,
  defaultLocale: 'fr',
  localePrefix: 'always',
  pathnames: {
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
  },
});

export type Locale = (typeof routing.locales)[number];