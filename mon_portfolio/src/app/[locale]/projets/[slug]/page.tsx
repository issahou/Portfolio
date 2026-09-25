import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Locale } from '@/types';
import { contentRepository } from '@/lib/content/repository';
import { ProjectDetail } from '@/components/projects/ProjectDetail';
import { getMessages, getTranslations } from '@/lib/i18n/messages';
import { compileMDX } from 'next-mdx-remote/rsc';

interface ProjectDetailPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = getTranslations(locale);
  
  const project = await contentRepository.getProjectBySlug(slug, locale);
  
  if (!project) {
    return { title: 'Projet non trouvé' };
  }
  
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.images.length > 0 ? [project.images[0]] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: project.images.length > 0 ? [project.images[0]] : [],
    },
  };
}

export async function generateStaticParams() {
  const locales = ['fr', 'en'] as const;
  const params = [];
  
  for (const locale of locales) {
    const projects = await contentRepository.getProjects(locale);
    for (const project of projects) {
      params.push({ locale, slug: project.slug });
    }
  }
  
  return params;
}

function ProjectDetailSkeleton() {
  return (
    <article className="min-h-screen bg-white dark:bg-secondary-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4" />
          <div className="aspect-video bg-secondary-200 dark:bg-secondary-700 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-1/2" />
            <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4" />
            <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-1/2" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="h-64 bg-secondary-200 dark:bg-secondary-700 rounded-xl" />
            <div className="h-64 bg-secondary-200 dark:bg-secondary-700 rounded-xl" />
            <div className="h-64 bg-secondary-200 dark:bg-secondary-700 rounded-xl" />
          </div>
        </div>
      </div>
    </article>
  );
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

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale, slug } = await params;
  const t = getTranslations(locale);
  
  const project = await contentRepository.getProjectBySlug(slug, locale);
  
  if (!project) {
    notFound();
  }

  const { content: mdxContent } = await compileMDX({
    source: project.content,
    components,
    options: { parseFrontmatter: true },
  });

  return (
    <Suspense fallback={<ProjectDetailSkeleton />}>
      <ProjectDetail 
        project={project} 
        locale={locale} 
        mdxContent={mdxContent}
      />
    </Suspense>
  );
}