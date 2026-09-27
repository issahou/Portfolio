'use client';

import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/lib/theme/ThemeProvider';
import { cn } from '@/lib/utils/cn';

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  const themeOptions = [
    { value: 'light' as const, label: 'Mode clair', icon: Sun },
    { value: 'dark' as const, label: 'Mode sombre', icon: Moon },
    { value: 'system' as const, label: 'Système', icon: Monitor },
  ];

  return (
    <div className="relative inline-block group" suppressHydrationWarning>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label=" Changer de thème"
        className="relative h-9 w-9 p-0 rounded-xl text-secondary-600 hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800 transition-colors inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        suppressHydrationWarning
      >
        <Sun
          className={cn(
            'h-5 w-5 transition-opacity duration-200',
            resolvedTheme === 'dark' ? 'opacity-0' : 'opacity-100'
          )}
          suppressHydrationWarning
        />
        <Moon
          className={cn(
            'h-5 w-5 transition-opacity duration-200 absolute inset-0',
            resolvedTheme === 'dark' ? 'opacity-100' : 'opacity-0'
          )}
          suppressHydrationWarning
        />
      </button>
      
      <div className="absolute right-0 top-full mt-2 z-50 hidden group-hover:block animate-fade-in" suppressHydrationWarning>
        <div className="bg-white dark:bg-secondary-900 rounded-xl shadow-lg border border-secondary-100 dark:border-secondary-800 p-2 min-w-[160px]">
          {themeOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTheme(value)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                theme === value
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800'
              )}
              suppressHydrationWarning
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span>{label}</span>
              <span
                className={cn(
                  'ml-auto text-primary-600 dark:text-primary-400 transition-opacity',
                  theme === value ? 'opacity-100' : 'opacity-0'
                )}
                suppressHydrationWarning
              >
                ✓
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
