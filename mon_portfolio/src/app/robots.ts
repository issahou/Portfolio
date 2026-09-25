import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/static/'],
    },
    sitemap: 'https://portfolio-nom.vercel.app/sitemap.xml',
    host: 'https://portfolio-nom.vercel.app',
  };
}