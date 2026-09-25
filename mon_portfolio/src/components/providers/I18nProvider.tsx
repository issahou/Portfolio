'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { Locale } from '@/types';

interface I18nProviderProps {
  locale: Locale;
  messages: Record<string, unknown>;
  children: ReactNode;
}

export function I18nProvider({ locale, messages, children }: I18nProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}