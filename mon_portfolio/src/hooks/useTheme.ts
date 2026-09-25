'use client';

import { useTheme as useThemeContext } from '@/lib/theme/ThemeProvider';

export function useTheme() {
  return useThemeContext();
}