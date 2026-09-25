'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Project } from '@/types';
import { Locale } from '@/types';
import { ChevronLeft, GitFork, ExternalLink, ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';
import { useTranslations } from '@/hooks/useTranslations';

interface ProjectDetailProps {
  project: Project;
  locale: Locale;
  mdxContent: React.ReactNode;
}

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4 mt-8 first:mt-0" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-3 mt-8" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2 mt-6" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed mb-4" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc list-inside space-y-2 text-secondary-600 dark:text-secondary-400 mb-4" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal list-inside space-y-2 text-secondary-600 dark:text-secondary-400 mb-4" {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="text-primary-600 dark:text-primary-400 hover:underline" {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => <code className="bg-secondary-100 dark:bg-secondary-800 px-1.5 py-0.5 rounded text-sm font-mono text-primary-700 dark:text-primary-400" {...props} />,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre className="bg-secondary-900 dark:bg-secondary-950 rounded-xl p-4 overflow-x-auto mb-4"><code {...props} /></pre>,
  blockquote: (props: React.QuoteHTMLAttributes<HTMLQuoteElement>) => <blockquote className="border-l-4 border-primary-500 pl-4 italic text-secondary-600 dark:text-secondary-400 my-4" {...props} />,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img className="rounded-xl w-full h-auto mb-4" {...props} />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => <strong className="font-semibold text-secondary-900 dark:text-white" {...props} />,
  em: (props: React.HTMLAttributes<HTMLElement>) => <em className="italic" {...props} />,
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => <hr className="border-secondary-200 dark:border-secondary-700 my-8" {...props} />,
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => <div className="overflow-x-auto mb-4"><table className="w-full border-collapse" {...props} /></div>,
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => <th className="border border-secondary-200 dark:border-secondary-700 px-4 py-2 bg-secondary-100 dark:bg-secondary-800 font-semibold text-left" {...props} />,
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => <td className="border border-secondary-200 dark:border-secondary-700 px-4 py-2" {...props} />,
};

function SkeletonFallback() {
  return (
    <div className="animate-pulse space-y-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="h-8 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4" />
      <div className="aspect-video bg-secondary-200 dark:bg-secondary-700 rounded-2xl" />
      <div className="space-y-4">
        <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-1\/2" />
        <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-3\/4" />
        <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-1\/2" />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="h-64 bg-secondary-200 dark:bg-secondary-700 rounded-xl" />
        <div className="h-64 bg-secondary-200 dark:bg-secondary-700 rounded-xl" />
        <div className="h-64 bg-secondary-200 dark:bg-secondary-700 rounded-xl" />
      </div>
    </div>
  );
}

export function ProjectDetail({ project, locale, mdxContent }: ProjectDetailProps) {
  const t = useTranslations(locale);
  return (
    <Suspense fallback={<SkeletonFallback />}>
      <article className="min-h-screen bg-white dark:bg-secondary-950">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6" aria-label="Fil d'Ariane">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href={`/${locale}`} className="text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
                Accueil
              </Link>
            </li>
            <li className="text-secondary-300 dark:text-secondary-600">/</li>
            <li>
              <Link href={`/${locale}/projets`} className="text-secondary-500 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400">
                {t('projects.title')}
              </Link>
            </li>
            <li className="text-secondary-300 dark:text-secondary-600">/</li>
            <li className="text-secondary-900 dark:text-white truncate max-w-[200px]" aria-current="page">
              {project.title}
            </li>
          </ol>
        </nav>

        <header className="relative">
          <div className="aspect-video w-full bg-gradient-to-br from-primary-100 via-accent-100/50 to-transparent dark:from-primary-900/30 dark:via-accent-900/20 dark:to-transparent">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="h-24 w-24 text-primary-200 dark:text-primary-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 002-2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-12 mb-12">
            <div className="bg-white dark:bg-secondary-900 rounded-2xl border border-secondary-100 dark:border-secondary-800 shadow-xl p-6 sm:p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" size="sm">
                  {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                </Badge>
                {project.role && (
                  <Badge variant="secondary" size="sm">{project.role}</Badge>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
                {project.title}
              </h1>

              <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {project.technologies.map((tech, i) => (
                  <Badge key={tech} variant="outline" size="sm">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Button variant="outline" size="md">
                      <GitFork className="h-5 w-5 mr-2" />
                      GitHub
                    </Button>
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Button variant="primary" size="md">
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Démo en ligne
                    </Button>
                  </a>
                )}
                <Link href={`/${locale}/projets`}>
                  <Button variant="ghost" size="md">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Retour aux projets
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
          <div className="prose prose-secondary dark:prose-invert max-w-none">
            {mdxContent}
          </div>

          {project.images.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-6">
                Captures d'écran
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {project.images.map((image, index) => (
                  <div key={index} className="rounded-xl overflow-hidden border border-secondary-100 dark:border-secondary-800">
                    <img
                      src={image}
                      alt={`${project.title} - Capture ${index + 1}`}
                      className="w-full h-auto hover:scale-[1.02] transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </Suspense>
  );
}