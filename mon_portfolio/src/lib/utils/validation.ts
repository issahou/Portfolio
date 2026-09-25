import { z } from 'zod';
import { ContactFormData } from '@/types';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'validation.nameRequired' }),
  email: z.string().email({ message: 'validation.emailInvalid' }),
  subject: z.string().min(5, { message: 'validation.subjectRequired' }),
  message: z.string().min(20, { message: 'validation.messageRequired' }),
  honeypot: z.string().optional(),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;

export function validateContactForm(data: ContactFormData): { success: boolean; errors?: Partial<Record<keyof ContactFormData, string>> } {
  const result = contactFormSchema.safeParse(data);
  
  if (!result.success) {
    const errors: Partial<Record<keyof ContactFormData, string>> = {};
    result.error.issues.forEach(issue => {
      const path = issue.path[0] as keyof ContactFormData;
      errors[path] = issue.message;
    });
    return { success: false, errors };
  }
  
  // Honeypot check
  if (data.honeypot && data.honeypot.length > 0) {
    return { success: false, errors: { honeypot: 'Spam detected' } };
  }
  
  return { success: true };
}