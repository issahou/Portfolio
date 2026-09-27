'use client';

import { useMemo } from 'react';
import { Locale } from '@/types';
import messagesFr from '../../messages/fr.json';
import messagesEn from '../../messages/en.json';

const messages: Record<string, typeof messagesFr> = {
  fr: messagesFr,
  en: messagesEn,
};

export function useTranslations(locale: Locale) {
  const msgs = useMemo(() => messages[locale] || messages.fr, [locale]);

  const t = useMemo(() => {
    return (key: string, params?: Record<string, string>): string => {
      const keys = key.split('.');
      let value: unknown = msgs;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }
      let result = value as string;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          result = result.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
        });
      }
      return result;
    };
  }, [msgs]);

  return t;
}