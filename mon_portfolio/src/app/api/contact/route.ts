import { NextRequest, NextResponse } from 'next/server';
import { validateContactForm } from '@/lib/utils/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validation = validateContactForm(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Données invalides', errors: validation.errors },
        { status: 400 }
      );
    }

    // Honeypot check
    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Spam détecté' },
        { status: 400 }
      );
    }

    // Here you would integrate with your email service
    // For example: Nodemailer, Resend, SendGrid, etc.
    
    // Example with Resend (uncomment and configure):
    /*
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: ['vous@email.com'],
      subject: `[Portfolio] ${body.subject}`,
      html: `
        <h2>Nouveau message depuis le portfolio</h2>
        <p><strong>Nom:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Sujet:</strong> ${body.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message.replace(/\n/g, '<br>')}</p>
      `,
    });
    */

    // For now, simulate success
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}