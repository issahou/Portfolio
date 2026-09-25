import { format, parseISO } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { Locale } from '@/types';

export function formatDate(dateString: string, locale: Locale = 'fr', pattern: string = 'MMMM yyyy'): string {
  try {
    const date = parseISO(dateString + '-01');
    return format(date, pattern, { locale: locale === 'fr' ? fr : enUS });
  } catch {
    return dateString;
  }
}

export function formatDateRange(start: string, end: string, locale: Locale = 'fr'): string {
  const startDate = formatDate(start, locale);
  const endDate = end.toLowerCase() === 'present' || end.toLowerCase() === 'présent' 
    ? (locale === 'fr' ? 'Présent' : 'Present')
    : formatDate(end, locale);
  return `${startDate} - ${endDate}`;
}