import type { Metadata } from 'next';
import { Eyebrow, Reveal } from '@/components/ui';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Request a Demo',
  description: 'Request a demo of Zentrion Technologies’ AI and security products.',
  alternates: { canonical: '/request-demo' },
};

export default function RequestDemoPage() {
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
          <ContactForm
            fields={['name', 'email', 'company', 'message']}
            submitLabel="Request Demo"
            context="Demo request"
          />
        </Reveal>
      </div>
    </section>
  );
}
