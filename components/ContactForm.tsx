'use client';

import { useState, FormEvent } from 'react';
import { buildMailtoLink, buildWhatsAppLink } from '@/lib/contact';

const labelMap: Record<string, { label: string; type: string }> = {
  name: { label: 'Full name', type: 'text' },
  email: { label: 'Email address', type: 'email' },
  phone: { label: 'Phone number', type: 'tel' },
  company: { label: 'Company / Institution', type: 'text' },
  role: { label: 'Role / Course of study', type: 'text' },
  message: { label: 'Message', type: 'textarea' },
};

export default function ContactForm({
  fields = ['name', 'email', 'phone', 'message'],
  submitLabel = 'Send Message',
  context = 'New website inquiry',
}: {
  fields?: string[];
  submitLabel?: string;
  context?: string;
}) {
  const [sent, setSent] = useState(false);
  const [waLink, setWaLink] = useState('');
  const [mailLink, setMailLink] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const lines = fields.map((f) => {
      const meta = labelMap[f] ?? { label: f };
      const value = String(data.get(f) ?? '').trim();
      return `${meta.label}: ${value}`;
    });

    const body = `${context} — submitted via zentriontechnologies.com\n\n${lines.join('\n')}`;
    const subject = context;

    const wa = buildWhatsAppLink(body);
    const mail = buildMailtoLink(subject, body);
    setWaLink(wa);
    setMailLink(mail);
    setSent(true);

    // Open WhatsApp directly since this runs inside the submit click (a user gesture),
    // so it isn't treated as a blocked popup in most browsers.
    window.open(wa, '_blank', 'noopener,noreferrer');
  }

  if (sent) {
    return (
      <div className="glass-card rounded-xl p-8 text-center">
        <p className="font-display text-lg font-semibold">Message ready to send.</p>
        <p className="mt-2 text-sm text-mute">
          We opened WhatsApp with your details filled in — just hit send. If it didn’t
          open, use the buttons below.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Continue on WhatsApp
          </a>
          <a href={mailLink} className="btn-ghost">
            Send via Email Instead
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 md:p-8 space-y-5">
      {fields.map((f) => {
        const meta = labelMap[f] ?? { label: f, type: 'text' };
        return (
          <div key={f}>
            <label className="block text-sm text-mute mb-2" htmlFor={f}>
              {meta.label}
            </label>
            {meta.type === 'textarea' ? (
              <textarea
                id={f}
                name={f}
                required
                rows={4}
                className="w-full bg-ink/[0.03] border border-line rounded-lg px-4 py-3 text-sm text-ink placeholder:text-mute/60 focus:border-cyan/50 outline-none"
              />
            ) : (
              <input
                id={f}
                name={f}
                type={meta.type}
                required
                className="w-full bg-ink/[0.03] border border-line rounded-lg px-4 py-3 text-sm text-ink placeholder:text-mute/60 focus:border-cyan/50 outline-none"
              />
            )}
          </div>
        );
      })}
      <button type="submit" className="btn-primary w-full justify-center">
        {submitLabel}
      </button>
      <p className="text-xs text-mute text-center">
        Sending opens WhatsApp with your message pre-filled — you just tap send.
      </p>
    </form>
  );
}
