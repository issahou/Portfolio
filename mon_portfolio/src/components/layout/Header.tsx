'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui';
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Locale } from '@/types';

const navigation = [
  { name: 'nav.home', href: '/' },
  { name: 'nav.skills', href: '/competences' },
  { name: 'nav.projects', href: '/projets' },
  { name: 'nav.experience', href: '/experiences' },
  { name: 'nav.contact', href: '/contact' },
];

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[300] transition-all duration-300',
        scrolled
          ? 'bg-white/90 dark:bg-secondary-950/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Navigation principale">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href={`/${locale}`} className="text-xl font-bold text-secondary-900 dark:text-white" aria-label="Accueil">
              Portfolio
            </Link>
            
            <div className="hidden md:flex md:gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={`/${locale}${item.href}`}
                  className={cn(
                    'text-sm font-medium transition-colors relative',
                    pathname === `/${locale}${item.href}` || (item.href !== '/' && pathname.startsWith(`/${locale}${item.href}`))
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LocaleSwitcher />
            <ThemeToggle />
            
            <Link
              href={`/${locale}/contact`}
              className="hidden sm:inline-flex"
            >
              <Button size="sm">Contact</Button>
            </Link>

            <button
              className="md:hidden p-2 rounded-lg text-secondary-600 hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="py-4 space-y-2 border-t border-secondary-100 dark:border-secondary-800">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={`/${locale}${item.href}`}
                className={cn(
                  'block px-2 py-3 text-base font-medium rounded-lg transition-colors',
                  pathname === `/${locale}${item.href}`
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                    : 'text-secondary-600 hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 flex items-center gap-3">
              <Link href={`/${locale}/contact`} className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Me contacter</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}