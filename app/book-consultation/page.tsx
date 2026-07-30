import type { Metadata } from 'next';
import { Eyebrow, Reveal, GlassCard } from '@/components/ui';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Book a Consultation',
  description: 'Book a consultation with Zentrion Technologies for cybersecurity, AI, or cloud needs.',
  alternates: { canonical: '/book-consultation' },
};

export default function BookConsultationPage() {
  return (
    <section className="container-x pt-36 pb-24">
      <Reveal>
        <Eyebrow>Book Consultation</Eyebrow>
        <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
          A 30-minute call to scope your engagement.
        </h1>
        <p className="mt-6 max-w-xl text-mute leading-relaxed text-lg">
          Tell us what you’re trying to protect, build, or automate. We’ll come back with
          a scoped recommendation, not a generic pitch.
        </p>
      </Reveal>

      <div className="mt-14 grid md:grid-cols-[1fr,1.2fr] gap-10">
        <Reveal delay={0.06} className="space-y-4">
          <GlassCard hover={false}>
            <p className="font-display font-semibold">What to expect</p>
            <ul className="mt-3 space-y-2 text-sm text-mute">
              <li>A short discovery conversation about your systems and goals</li>
              <li>A follow-up scope and estimate within 2 business days</li>
              <li>No obligation to proceed</li>
            </ul>
          </GlassCard>
        </Reveal>
        <Reveal>
          <ContactForm
            fields={['name', 'email', 'phone', 'company', 'message']}
            submitLabel="Book Consultation"
            context="Consultation booking"
          />
        </Reveal>
      </div>
    </section>
  );
}
