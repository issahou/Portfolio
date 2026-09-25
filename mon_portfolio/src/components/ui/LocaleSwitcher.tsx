'use client';

import { Globe, ChevronDown } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import { Button } from './Button';
import { cn } from '@/lib/utils/cn';
import { Locale } from '@/types';

const localeLabels: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
};

const localeFlags: Record<Locale, string> = {
  fr: '🇫🇷',
  en: '🇬🇧',
};

export function LocaleSwitcher() {
  const { locale, locales, changeLocale, isLocale } = useLocale();

  return (
    <div className="relative inline-block group">
      <Button
        variant="ghost"
        size="sm"
        className="relative h-9 w-9 p-0 gap-1.5"
        aria-label={`Langue actuelle: ${localeLabels[locale]}. Cliquer pour changer.`}
      >
        <Globe className="h-5 w-5" />
        <span className="text-lg">{localeFlags[locale]}</span>
        <ChevronDown className="h-3.5 w-3.5 text-secondary-500" />
      </Button>
      
      <div className="absolute right-0 top-full mt-2 z-50 hidden group-hover:block animate-fade-in">
        <div className="bg-white dark:bg-secondary-900 rounded-xl shadow-lg border border-secondary-100 dark:border-secondary-800 p-2 min-w-[140px]">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => changeLocale(loc)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                isLocale(loc)
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800'
              )}
            >
              <span className="text-lg">{localeFlags[loc]}</span>
              <span>{localeLabels[loc]}</span>
              {isLocale(loc) && <span className="ml-auto text-primary-600 dark:text-primary-400">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}