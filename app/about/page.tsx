import type { Metadata } from 'next';
import { Eyebrow, Reveal, GlassCard, StatBlock, CTASection, SectionHeading } from '@/components/ui';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Zentrion Technologies is an AI-powered cybersecurity and automation company based in Chennai, building for enterprises, schools, and colleges.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <section className="container-x pt-36 pb-16">
        <Reveal>
          <Eyebrow>About Zentrion</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
            Security built by people who’d rather find the breach first.
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg">
            Zentrion Technologies started with a simple frustration: most cybersecurity vendors
            sell audits nobody reads and dashboards nobody watches. We build the opposite &mdash;
            AI-assisted defense that’s actually operated, and automation that actually ships.
          </p>
        </Reveal>
      </section>

      <section className="container-x py-16 border-t border-line grid md:grid-cols-4 gap-8">
        <StatBlock value="2" label="Founding engineers" />
        <StatBlock value="6+" label="Service lines" />
        <StatBlock value="TN, India" label="Based in Chennai" />
        <StatBlock value="24/7" label="Monitoring posture" />
      </section>

      <section className="container-x py-20 border-t border-line">
        <SectionHeading eyebrow="What we believe" title="Principles we build against" />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            {
              title: 'Prove it, don’t claim it',
              text: 'Every audit ships with reproducible findings, not a PDF of generic checkboxes.',
            },
            {
              title: 'Automate the boring, escalate the real',
              text: 'AI should remove noise for security teams, not add another dashboard to babysit.',
            },
            {
              title: 'Teach the next generation',
              text: 'Every intern and student we train is a future defender of the systems we all rely on.',
            },
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
        title="Want to work on problems like this with us?"
        description="We’re hiring engineers and taking on a limited number of consulting engagements each quarter."
        primary={{ href: '/careers', label: 'View Careers' }}
        secondary={{ href: '/contact', label: 'Contact Us' }}
      />
    </>
  );
}
