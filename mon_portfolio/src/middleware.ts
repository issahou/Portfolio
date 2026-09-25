import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['fr', 'en'],
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

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*|sw\\.js|manifest\\.json).*)'],
};