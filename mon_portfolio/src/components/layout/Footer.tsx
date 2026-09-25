import Link from 'next/link';
import { GitFork, Link as LinkIcon, Mail, X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface FooterProps {
  locale: 'fr' | 'en';
  profile: {
    name: string;
    social: {
      email: string;
      linkedin: string;
      github: string;
      twitter?: string;
    };
    cv: {
      filename: string;
      url: string;
    };
  };
}

export function Footer({ locale, profile }: FooterProps) {
  const socialLinks = [
    { href: profile.social.github, icon: GitFork, label: 'GitHub', ariaLabel: 'Profil GitHub' },
    { href: profile.social.linkedin, icon: LinkIcon, label: 'LinkedIn', ariaLabel: 'Profil LinkedIn' },
    { href: profile.social.twitter, icon: X, label: 'Twitter/X', ariaLabel: 'Profil Twitter' },
    { href: `mailto:${profile.social.email}`, icon: Mail, label: 'Email', ariaLabel: 'Envoyer un email' },
  ].filter(link => link.href);

  return (
    <footer className="bg-secondary-50 dark:bg-secondary-950 border-t border-secondary-100 dark:border-secondary-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              {profile.name}
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400 text-sm leading-relaxed mb-6">
              Développeur Full Stack passionné, créant des applications web modernes et performantes.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className={cn(
                    'text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors',
                    'h-5 w-5'
                  )}
                >
                  <link.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-secondary-900 dark:text-white mb-4">Navigation</h4>
            <nav aria-label="Navigation du pied de page">
              <ul className="space-y-2 text-sm">
                <li><Link href={`/${locale}`} className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors">Accueil</Link></li>
                <li><Link href={`/${locale}/competences`} className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors">Compétences</Link></li>
                <li><Link href={`/${locale}/projets`} className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors">Projets</Link></li>
                <li><Link href={`/${locale}/experiences`} className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors">Expériences</Link></li>
                <li><Link href={`/${locale}/contact`} className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors">Contact</Link></li>
              </ul>
            </nav>
          </div>

          <div>
            <h4 className="font-medium text-secondary-900 dark:text-white mb-4">Ressources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={profile.cv.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  Télécharger le CV
                </a>
              </li>
              <li>
                <Link href={`/${locale}/projets`} className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors">
                  Voir tous les projets
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors">
                  Me contacter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-200 dark:border-secondary-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-secondary-500 dark:text-secondary-500">
              © {new Date().getFullYear()} {profile.name}. Tous droits réservés.
            </p>
            <p className="text-sm text-secondary-500 dark:text-secondary-500">
              Construit avec Next.js, TypeScript, Tailwind CSS & déployé sur Vercel
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}