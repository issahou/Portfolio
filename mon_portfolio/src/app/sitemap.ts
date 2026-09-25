import { MetadataRoute } from 'next';
import { locales, defaultLocale, pathnames } from '@/lib/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://portfolio-nom.vercel.app';
  const currentDate = new Date();

  const routes = [
    '/',
    '/competences',
    '/projets',
    '/experiences',
    '/contact',
  ] as const;

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      const pathnamesLocalized = pathnames[route];
      let pathname: string;
      
      if (typeof pathnamesLocalized === 'string') {
        pathname = pathnamesLocalized;
      } else {
        pathname = pathnamesLocalized[locale];
      }
      
      sitemap.push({
        url: `${baseUrl}/${locale}${pathname}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: route === '/' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${baseUrl}/${l}${typeof pathnamesLocalized === 'string' ? pathnamesLocalized : pathnamesLocalized[l]}`])
          ),
        },
      });
    }
  }

  return sitemap;
}