'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eyebrow, Reveal } from '@/components/ui';
import { buildMailtoLink, buildWhatsAppLink } from '@/lib/contact';

const demoSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  company: z.string().min(2, 'Company name is required'),
  usecase: z.string().min(10, 'Please describe your use case briefly'),
});

type DemoForm = z.infer<typeof demoSchema>;

export default function RequestDemoPage() {
  const [sent, setSent] = useState(false);
  const [waLink, setWaLink] = useState('');
  const [mailLink, setMailLink] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DemoForm>({
    resolver: zodResolver(demoSchema),
  });

  const onSubmit = (data: DemoForm) => {
    const body = `Demo request via website:\n\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\nUse Case: ${data.usecase}`;
    const subject = 'New Demo Request';

    const wa = buildWhatsAppLink(body);
    const mail = buildMailtoLink(subject, body);
    
    setWaLink(wa);
    setMailLink(mail);
    setSent(true);

    window.open(wa, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="container-x pt-36 pb-24 max-w-xl">
      <Reveal>
        <Eyebrow>Request Demo</Eyebrow>
        <h1 className="mt-4 font-display text-4xl font-semibold">See it running on your data.</h1>
        <p className="mt-6 text-mute leading-relaxed text-lg">
          We’ll walk you through a live demo tailored to your use case &mdash; security
          monitoring, an AI agent, or a cloud review.
        </p>
      </Reveal>
      <div className="mt-10">
        <Reveal>
          {sent ? (
            <div className="glass-card rounded-xl p-8 text-center border-t-4 border-t-cyan">
              <div className="w-16 h-16 bg-cyan/10 border border-cyan/20 text-cyan rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message ready to send</h3>
              <p className="mt-2 text-sm text-mute">
                We opened WhatsApp with your details filled in — just hit send. If it didn’t open, use the buttons below.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Continue on WhatsApp
                </a>
                <a href={mailLink} className="btn-ghost">
                  Send via Email Instead
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="glass-card rounded-xl p-6 md:p-8 space-y-5">
              <div>
                <label className="block text-sm text-mute mb-2">Full Name</label>
                <input 
                  {...register('name')}
                  type="text" 
                  className={`w-full bg-ink/[0.03] border rounded-lg px-4 py-3 text-sm text-ink placeholder:text-mute/60 focus:outline-none transition-colors ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`} 
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm text-mute mb-2">Work Email</label>
                <input 
                  {...register('email')}
                  type="email" 
                  className={`w-full bg-ink/[0.03] border rounded-lg px-4 py-3 text-sm text-ink placeholder:text-mute/60 focus:outline-none transition-colors ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`} 
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm text-mute mb-2">Company</label>
                <input 
                  {...register('company')}
                  type="text" 
                  className={`w-full bg-ink/[0.03] border rounded-lg px-4 py-3 text-sm text-ink placeholder:text-mute/60 focus:outline-none transition-colors ${errors.company ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`} 
                />
                {errors.company && <p className="mt-1 text-xs text-red-400">{errors.company.message}</p>}
              </div>

              <div>
                <label className="block text-sm text-mute mb-2">Describe Your Use Case</label>
                <textarea 
                  {...register('usecase')}
                  rows={4}
                  className={`w-full bg-ink/[0.03] border rounded-lg px-4 py-3 text-sm text-ink placeholder:text-mute/60 focus:outline-none transition-colors resize-y ${errors.usecase ? 'border-red-500 focus:border-red-500' : 'border-line focus:border-cyan'}`} 
                />
                {errors.usecase && <p className="mt-1 text-xs text-red-400">{errors.usecase.message}</p>}
              </div>

              <button type="submit" className="btn-primary w-full justify-center">
                Request Demo
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
