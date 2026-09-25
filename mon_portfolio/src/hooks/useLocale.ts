'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Locale } from '@/types';
import { locales } from '@/lib/i18n/routing';
import { useCallback } from 'react';

export function useLocale() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentLocale = (pathname?.split('/')[1] as Locale) || 'fr';

  const changeLocale = useCallback((locale: Locale) => {
    const pathSegments = pathname?.split('/') || [];
    pathSegments[1] = locale;
    const newPath = pathSegments.join('/') || '/';
    router.push(newPath);
  }, [pathname, router]);

  return {
    locale: currentLocale,
    locales,
    changeLocale,
    isLocale: (locale: Locale) => currentLocale === locale,
  };
}