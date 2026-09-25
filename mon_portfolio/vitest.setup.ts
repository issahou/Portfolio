import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  getTranslations: () => Promise.resolve((key: string) => key),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/fr',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'system',
    resolvedTheme: 'light',
    setTheme: vi.fn(),
    toggleTheme: vi.fn(),
  }),
}));