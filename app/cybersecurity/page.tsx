import type { Metadata } from 'next';
import { Eyebrow, Reveal, GlassCard, CTASection, SectionHeading, StatBlock } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'AI-Powered Cybersecurity',
  description:
    'Vulnerability assessment, penetration testing, network security, cloud security, endpoint security, and security audits from Zentrion Technologies.',
  alternates: { canonical: '/cybersecurity' },
};

const offerings = [
  {
    title: 'Vulnerability Assessment',
    text: 'Systematic scanning and manual review to find exploitable weaknesses before attackers do.',
  },
  {
    title: 'Penetration Testing',
    text: 'Simulated real-world attacks against your applications, network, and cloud environment.',
  },
  {
    title: 'Network Security',
    text: 'Segmentation, firewall review, and traffic monitoring built around your actual topology.',
  },
  {
    title: 'Cloud Security',
    text: 'Configuration review, IAM audit, and workload hardening across your cloud provider.',
  },
  {
    title: 'Endpoint Security',
    text: 'Device hardening, EDR deployment, and monitoring for the devices attackers target first.',
  },
  {
    title: 'Security Audits',
    text: 'A full-organization review mapped to the frameworks your industry or clients require.',
  },
];

export default function CybersecurityPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/cybersecurity', label: 'Cybersecurity' }]} />
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <Eyebrow>Cybersecurity</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
            Find the breach before it finds you.
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg">
            AI-assisted threat detection paired with hands-on offensive testing &mdash; because
            automated scanners alone miss what a determined attacker finds.
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-8 grid sm:grid-cols-3 gap-8 max-w-xl">
        <StatBlock value="150+" label="Audits completed" />
        <StatBlock value="24/7" label="Monitoring available" />
        <StatBlock value="0" label="Missed critical CVEs" />
      </section>

      <section className="container-x py-20 border-t border-line">
        <SectionHeading eyebrow="What's included" title="A defense program, not a one-off scan" />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {offerings.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.05}>
              <GlassCard>
                <p className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 font-display font-semibold text-lg">{o.title}</h3>
                <p className="mt-3 text-sm text-mute leading-relaxed">{o.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-20 border-t border-line">
        <SectionHeading
          eyebrow="Engagement model"
          title="Fixed-scope audits or ongoing coverage"
          description="Choose a single assessment for a launch or compliance deadline, or move to continuous monitoring once your baseline is fixed."
        />
        <div className="mt-12 grid md:grid-cols-2 gap-5">
          <Reveal>
            <GlassCard>
              <h3 className="font-display font-semibold text-lg">One-time Assessment</h3>
              <p className="mt-3 text-sm text-mute leading-relaxed">
                A scoped vulnerability assessment or penetration test with a written report and
                remediation walkthrough. Typical turnaround: 2&ndash;4 weeks.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.06}>
            <GlassCard>
              <h3 className="font-display font-semibold text-lg">Continuous Coverage</h3>
              <p className="mt-3 text-sm text-mute leading-relaxed">
                Ongoing monitoring, quarterly re-testing, and a direct line to our team when
                something looks wrong. Billed monthly.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Get a real picture of your attack surface."
        description="A short call is enough for us to scope the right assessment for your systems."
        primary={{ href: '/book-consultation', label: 'Book Consultation' }}
        secondary={{ href: '/contact', label: 'Talk to Our Team' }}
      />
    </>
  );
}
