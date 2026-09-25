'use client';

import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/lib/theme/ThemeProvider';
import { Button } from './Button';
import { cn } from '@/lib/utils/cn';

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  const themeOptions = [
    { value: 'light' as const, label: 'Mode clair', icon: Sun },
    { value: 'dark' as const, label: 'Mode sombre', icon: Moon },
    { value: 'system' as const, label: 'Système', icon: Monitor },
  ];

  return (
    <div className="relative inline-block">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        aria-label={`Thème actuel: ${theme}. Cliquer pour changer.`}
        className="relative h-9 w-9 p-0"
      >
        {resolvedTheme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </Button>
      
      <div className="absolute right-0 top-full mt-2 z-50 hidden group-hover:block animate-fade-in">
        <div className="bg-white dark:bg-secondary-900 rounded-xl shadow-lg border border-secondary-100 dark:border-secondary-800 p-2 min-w-[160px]">
          {themeOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                theme === value
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'text-secondary-700 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800'
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span>{label}</span>
              {theme === value && <span className="ml-auto text-primary-600 dark:text-primary-400">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}