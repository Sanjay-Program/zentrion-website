import type { Metadata } from 'next';
import { Eyebrow, Reveal, GlassCard } from '@/components/ui';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Book a Technical Discovery | Zentrion',
  description: 'Book a consultation with Zentrion Technologies for cybersecurity, AI, or cloud needs.',
  alternates: { canonical: '/book-consultation' },
};

export default function BookConsultationPage() {
  return (
    <section className="container-x pt-36 pb-24">
      <Reveal>
        <Eyebrow>Technical Discovery</Eyebrow>
        <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
          A 30-minute call to find your blind spots.
        </h1>
        <p className="mt-6 max-w-xl text-mute leading-relaxed text-lg">
          We do not employ salespeople. You will be speaking directly with a Senior Security Engineer. We'll review your architecture and tell you exactly where you are vulnerable.
        </p>
      </Reveal>

      <div className="mt-14 grid md:grid-cols-[1fr,1.2fr] gap-10">
        <Reveal delay={0.06} className="space-y-6">
          <GlassCard hover={false} className="border-cyan/30 bg-cyan/5">
            <p className="font-display font-semibold text-cyan">What you get on this call:</p>
            <ul className="mt-4 space-y-3 text-sm text-ink font-medium">
              <li className="flex items-start gap-3">
                <span className="text-cyan mt-0.5">✓</span> 
                <div>
                  Immediate Architecture Review
                  <p className="text-mute font-normal text-xs mt-1">We'll identify obvious structural flaws in your current setup.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan mt-0.5">✓</span> 
                <div>
                  High-Level Threat Modeling
                  <p className="text-mute font-normal text-xs mt-1">We'll tell you exactly how an attacker would target you today.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan mt-0.5">✓</span> 
                <div>
                  Clear Remediation Scope
                  <p className="text-mute font-normal text-xs mt-1">A scoped estimate for our engineering team to fix it.</p>
                </div>
              </li>
            </ul>
          </GlassCard>
          
          <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
            <p className="text-sm text-red-400 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Limited Capacity
            </p>
            <p className="text-xs text-mute mt-2">
              Because all discoveries are led by senior engineers, we only accept 5 new consultations per week. Please provide accurate details below.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <ContactForm
            fields={['name', 'email', 'phone', 'company', 'message']}
            submitLabel="Request Discovery Call"
            context="Consultation booking"
          />
        </Reveal>
      </div>
    </section>
  );
}
