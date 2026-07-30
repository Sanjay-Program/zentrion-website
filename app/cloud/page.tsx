import type { Metadata } from 'next';
import { Eyebrow, Reveal, GlassCard, CTASection, SectionHeading } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Cloud Consulting',
  description: 'Cloud migration, cost optimization, and cloud security review from Zentrion Technologies.',
  alternates: { canonical: '/cloud' },
};

export default function CloudPage() {
  return (
    <>
      <section className="container-x pt-36 pb-16">
        <Reveal>
          <Eyebrow>Cloud Consulting</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
            Cloud infrastructure that scales without surprises.
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg">
            We design, migrate, and secure cloud environments so growth doesn’t come with a
            matching spike in cost or risk.
          </p>
        </Reveal>
      </section>

      <section className="container-x py-20 border-t border-line">
        <SectionHeading eyebrow="Engagements" title="Where we typically start" />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            { title: 'Migration', text: 'Moving workloads to the cloud, or between providers, with minimal downtime.' },
            { title: 'Architecture Review', text: 'An honest assessment of what’s over-built, under-secured, or overpriced.' },
            { title: 'Security Hardening', text: 'IAM, network, and configuration review aligned to cloud security best practice.' },
          ].map((v) => (
            <Reveal key={v.title}>
              <GlassCard>
                <h3 className="font-display font-semibold text-lg">{v.title}</h3>
                <p className="mt-3 text-sm text-mute leading-relaxed">{v.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Get a second opinion on your cloud bill and your risk."
        description="Most reviews surface both cost savings and security gaps in the same pass."
        primary={{ href: '/book-consultation', label: 'Book Consultation' }}
        secondary={{ href: '/contact', label: 'Contact Us' }}
      />
    </>
  );
}
