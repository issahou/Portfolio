'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormSchema } from '@/lib/utils/validation';
import { getEmailService } from '@/lib/email/service';
import { EmailResult } from '@/types';

export function useContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      honeypot: '',
    },
  });

  const onSubmit = useCallback(async (data: ContactFormSchema) => {
    setSubmitStatus('submitting');
    setErrorMessage(null);

    const emailService = getEmailService();
    const result: EmailResult = await emailService.sendContactForm(data);

    if (result.success) {
      setSubmitStatus('success');
      form.reset();
    } else {
      setSubmitStatus('error');
      setErrorMessage(result.error || 'Failed to send message');
    }
  }, [form]);

  const resetStatus = useCallback(() => {
    setSubmitStatus('idle');
    setErrorMessage(null);
  }, []);

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    submitStatus,
    errorMessage,
    resetStatus,
    isSubmitting: submitStatus === 'submitting',
    isSuccess: submitStatus === 'success',
    isError: submitStatus === 'error',
  };
}