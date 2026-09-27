'use client';

import Link from 'next/link';
import { GitFork, Link as LinkIcon, Mail, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Locale } from '@/types';
import { useTranslations } from '@/hooks/useTranslations';

interface FooterProps {
  locale: Locale;
  profile: {
    name: string;
    handle?: string;
    social: {
      email: string;
      linkedin: string;
      github: string;
      twitter?: string;
    };
    techStack?: string[];
  };
}

export function Footer({ locale, profile }: FooterProps) {
  const t = useTranslations(locale);
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: t('nav.projects'), href: `/${locale}/projets`, clickable: true },
    { label: t('nav.experience'), href: `/${locale}/experiences`, clickable: true },
    { label: t('nav.certifications'), href: '#certifications', clickable: false },
    { label: t('nav.interests'), href: '#interests', clickable: false },
    { label: t('nav.contact'), href: `/${locale}/contact`, clickable: true },
  ];

  const socialLinks = [
    { href: profile.social.github, label: 'GitHub', icon: GitFork, ariaLabel: 'Profil GitHub' },
    { href: profile.social.linkedin, label: 'LinkedIn', icon: LinkIcon, ariaLabel: 'Profil LinkedIn' },
    { href: `mailto:${profile.social.email}`, label: 'Email', icon: Mail, ariaLabel: 'Envoyer un email' },
  ].filter(link => link.href);

  const techStack = profile.techStack || ['Python', 'React', 'Three.js', 'Tailwind'];

  return (
    <footer className="bg-secondary-50 dark:bg-secondary-950 border-t border-secondary-100 dark:border-secondary-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-sm mx-auto">
        <div className="border border-secondary-200 dark:border-secondary-800 rounded-3xl p-5 sm:p-6">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-5 text-xs sm:text-sm">
              {navLinks.map((link) =>
                link.clickable ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <span
                    key={link.label}
                    className="text-secondary-400 dark:text-secondary-500"
                  >
                    {link.label}
                  </span>
                )
              )}
            </div>

            <div className="flex justify-center gap-3 mb-5">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={link.ariaLabel}
                  className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-lg transition-colors"
                >
                  <span>(</span>
                  {link.icon && <link.icon className="h-3 w-3" />}
                  <span>{link.label}</span>
                  <span>)</span>
                </a>
              ))}
            </div>

            <div className="text-center space-y-1 text-xs text-secondary-500 dark:text-secondary-400">
              <p>
                &copy; {currentYear} {profile.name} · {t('footer.rights')}
              </p>
              <p>{techStack.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
