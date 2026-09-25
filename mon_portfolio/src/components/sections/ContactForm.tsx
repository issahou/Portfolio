'use client';

import { useContactForm } from '@/hooks/useContactForm';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Locale } from '@/types';

interface ContactFormProps {
  locale: Locale;
  t: (key: string) => string;
  profile: {
    social: {
      email: string;
      phone: string;
      linkedin: string;
      github: string;
      twitter?: string;
    };
  };
}

export function ContactForm({ locale, t, profile }: ContactFormProps) {
  const {
    form,
    onSubmit,
    submitStatus,
    errorMessage,
    resetStatus,
    isSubmitting,
    isSuccess,
    isError,
  } = useContactForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-white dark:bg-secondary-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal delay={0} direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400">
              {t('contact.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          <ScrollReveal delay={100} direction="up">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  {t('contact.form.name')} <span className="text-error-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...form.register('name')}
                    id="name"
                    type="text"
                    autoComplete="name"
                    className={cn(
                      'w-full px-4 py-3 rounded-xl border transition-colors bg-white dark:bg-secondary-900',
                      'text-secondary-900 dark:text-white placeholder-secondary-400',
                      form.formState.errors.name
                        ? 'border-error-500 focus:ring-error-500 focus:border-error-500'
                        : 'border-secondary-200 dark:border-secondary-700 focus:ring-primary-500 focus:border-primary-500'
                    )}
                    placeholder="Votre nom"
                    aria-invalid={form.formState.errors.name ? 'true' : 'false'}
                    aria-describedby={form.formState.errors.name ? 'name-error' : undefined}
                  />
                  {form.formState.errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-error-500" role="alert">
                      {t(form.formState.errors.name.message as string)}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  {t('contact.form.email')} <span className="text-error-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...form.register('email')}
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={cn(
                      'w-full px-4 py-3 rounded-xl border transition-colors bg-white dark:bg-secondary-900',
                      'text-secondary-900 dark:text-white placeholder-secondary-400',
                      form.formState.errors.email
                        ? 'border-error-500 focus:ring-error-500 focus:border-error-500'
                        : 'border-secondary-200 dark:border-secondary-700 focus:ring-primary-500 focus:border-primary-500'
                    )}
                    placeholder="vous@email.com"
                    aria-invalid={form.formState.errors.email ? 'true' : 'false'}
                    aria-describedby={form.formState.errors.email ? 'email-error' : undefined}
                  />
                  {form.formState.errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-error-500" role="alert">
                      {t(form.formState.errors.email.message as string)}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  {t('contact.form.subject')} <span className="text-error-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...form.register('subject')}
                    id="subject"
                    type="text"
                    className={cn(
                      'w-full px-4 py-3 rounded-xl border transition-colors bg-white dark:bg-secondary-900',
                      'text-secondary-900 dark:text-white placeholder-secondary-400',
                      form.formState.errors.subject
                        ? 'border-error-500 focus:ring-error-500 focus:border-error-500'
                        : 'border-secondary-200 dark:border-secondary-700 focus:ring-primary-500 focus:border-primary-500'
                    )}
                    placeholder="Sujet de votre message"
                    aria-invalid={form.formState.errors.subject ? 'true' : 'false'}
                    aria-describedby={form.formState.errors.subject ? 'subject-error' : undefined}
                  />
                  {form.formState.errors.subject && (
                    <p id="subject-error" className="mt-1 text-sm text-error-500" role="alert">
                      {t(form.formState.errors.subject.message as string)}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  {t('contact.form.message')} <span className="text-error-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    {...form.register('message')}
                    id="message"
                    rows={5}
                    className={cn(
                      'w-full px-4 py-3 rounded-xl border transition-colors bg-white dark:bg-secondary-900 resize-none',
                      'text-secondary-900 dark:text-white placeholder-secondary-400',
                      form.formState.errors.message
                        ? 'border-error-500 focus:ring-error-500 focus:border-error-500'
                        : 'border-secondary-200 dark:border-secondary-700 focus:ring-primary-500 focus:border-primary-500'
                    )}
                    placeholder="Votre message..."
                    aria-invalid={form.formState.errors.message ? 'true' : 'false'}
                    aria-describedby={form.formState.errors.message ? 'message-error' : undefined}
                  />
                  {form.formState.errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-error-500" role="alert">
                      {t(form.formState.errors.message.message as string)}
                    </p>
                  )}
                </div>
              </div>

              <input type="hidden" {...form.register('honeypot')} tabIndex={-1} autoComplete="off" />

              <Button type="submit" className="w-full sm:w-auto" size="lg" loading={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    {t('contact.form.sending')}
                  </>
                ) : (
                  t('contact.form.send')
                )}
              </Button>

              {isSuccess && (
                <div className="flex items-center gap-2 p-4 bg-success-50 dark:bg-success-50/20 border border-success-200 dark:border-success-900/30 rounded-xl text-success-700 dark:text-success-400 animate-fade-in" role="status">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <span>{t('contact.form.success')}</span>
                </div>
              )}

              {isError && (
                <div className="flex items-center gap-2 p-4 bg-error-50 dark:bg-error-50/20 border border-error-200 dark:border-error-900/30 rounded-xl text-error-700 dark:text-error-400 animate-fade-in" role="alert">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span>{errorMessage || t('contact.form.error')}</span>
                </div>
              )}
            </form>
          </ScrollReveal>

          <ScrollReveal delay={200} direction="up">
            <div className="bg-secondary-50 dark:bg-secondary-900 rounded-2xl border border-secondary-100 dark:border-secondary-800 p-8">
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-6">
                {t('contact.direct')}
              </h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${profile.social.email}`}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-secondary-950 border border-secondary-100 dark:border-secondary-800 hover:border-primary-300 dark:hover:border-primary-700 transition-colors group"
                >
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">Email</p>
                    <p className="font-medium text-secondary-900 dark:text-white">{profile.social.email}</p>
                  </div>
                </a>

                <a
                  href={`tel:${profile.social.phone}`}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-secondary-950 border border-secondary-100 dark:border-secondary-800 hover:border-primary-300 dark:hover:border-primary-700 transition-colors group"
                >
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">Téléphone</p>
                    <p className="font-medium text-secondary-900 dark:text-white">{profile.social.phone}</p>
                  </div>
                </a>

                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-secondary-950 border border-secondary-100 dark:border-secondary-800 hover:border-primary-300 dark:hover:border-primary-700 transition-colors group"
                >
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">LinkedIn</p>
                    <p className="font-medium text-secondary-900 dark:text-white">Profil professionnel</p>
                  </div>
                </a>

                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-secondary-950 border border-secondary-100 dark:border-secondary-800 hover:border-primary-300 dark:hover:border-primary-700 transition-colors group"
                >
                  <div className="p-3 bg-secondary-100 dark:bg-secondary-800 rounded-xl text-secondary-600 dark:text-secondary-400 group-hover:scale-110 transition-transform">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">GitHub</p>
                    <p className="font-medium text-secondary-900 dark:text-white">Repositories & Code</p>
                  </div>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}