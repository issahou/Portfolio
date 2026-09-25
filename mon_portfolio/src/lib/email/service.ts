import { EmailResult, ContactFormData } from '@/types';

export interface IEmailService {
  sendContactForm(data: ContactFormData): Promise<EmailResult>;
}

export class EmailJSService implements IEmailService {
  private serviceId: string;
  private templateId: string;
  publicKey: string;

  constructor() {
    this.serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
    this.templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
    this.publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';
  }

  async sendContactForm(data: ContactFormData): Promise<EmailResult> {
    if (typeof window === 'undefined') {
      return { success: false, error: 'EmailJS only works in browser' };
    }

    if (!this.serviceId || !this.templateId || !this.publicKey) {
      console.warn('EmailJS not configured, using mock');
      await new Promise(r => setTimeout(r, 1000));
      return { success: true };
    }

    try {
      const emailjs = await import('@emailjs/browser');
      
      const result = await emailjs.send(
        this.serviceId,
        this.templateId,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
        },
        this.publicKey
      );

      if (result.status === 200) {
        return { success: true };
      }
      
      return { success: false, error: 'Failed to send email' };
    } catch (error) {
      console.error('EmailJS error:', error);
      return { success: false, error: 'Failed to send email' };
    }
  }
}

export class ApiRouteEmailService implements IEmailService {
  async sendContactForm(data: ContactFormData): Promise<EmailResult> {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API Route email error:', error);
      return { success: false, error: 'Failed to send email' };
    }
  }
}

export function getEmailService(): IEmailService {
  if (typeof window !== 'undefined') {
    return new EmailJSService();
  }
  return new ApiRouteEmailService();
}