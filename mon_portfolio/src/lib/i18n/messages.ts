import messagesFr from '../../../messages/fr.json';
import messagesEn from '../../../messages/en.json';

export const messages: Record<string, typeof messagesFr> = {
  fr: messagesFr,
  en: messagesEn,
};

export function getMessages(locale: string) {
  return messages[locale] || messages.fr;
}

export function getTranslations(locale: string) {
  const msgs = getMessages(locale);
  return (key: string) => {
    const keys = key.split('.');
    let value: unknown = msgs;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return value as string;
  };
}