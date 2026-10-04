import type { Metadata } from 'next';
import { Eyebrow, Reveal, GlassCard, StatBlock, CTASection, SectionHeading } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us | Zentrion Technologies',
  description:
    'Zentrion Technologies is building the zero-trust infrastructure for the next generation of autonomous AI and enterprise security.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/about', label: 'About' }]} />
      
      {/* Hero Section */}
      <section className="container-x pt-20 pb-16">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <Eyebrow>Our Mission</Eyebrow>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-semibold max-w-4xl text-ink leading-[1.1]">
              Engineering absolute <span className="text-cyan">security</span> in an autonomous world.
            </h1>
            <p className="mt-8 max-w-2xl text-mute leading-relaxed text-lg sm:text-xl">
              Zentrion Technologies builds the zero-trust infrastructure required for the next generation of enterprise AI, secure development, and automated cybersecurity.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Stats Section */}
      <section className="container-x py-16 border-t border-line">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatBlock value="100%" label="Engineer-Led" />
          <StatBlock value="Zero" label="Implicit Trust" />
          <StatBlock value="Native" label="Architecture" />
          <StatBlock value="India" label="Headquarters" />
        </div>
      </section>

      {/* The Story Section */}
      <section className="container-x py-24 border-t border-line">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-6">
              Security built by people who’d rather find the breach first.
            </h2>
            <div className="space-y-6 text-mute leading-relaxed text-lg">
              <p>
                Zentrion Technologies started with a simple frustration: most cybersecurity vendors sell static audits that nobody reads, and dashboards that nobody watches.
              </p>
              <p>
                As cloud architectures evolved from simple virtual machines into ephemeral AI agents and complex orchestration layers, the legacy tools broke down. We decided to build the opposite &mdash; native, high-performance security platforms that enforce behavior at the kernel level.
              </p>
              <p>
                Today, we operate at the bleeding edge of security, artificial intelligence, and software engineering. We don't just find vulnerabilities; we build the next-generation infrastructure that makes them mathematically impossible.
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <div className="relative aspect-square md:aspect-auto md:h-[500px] rounded-3xl border border-line bg-surface/50 overflow-hidden flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan/10 to-violet/10 opacity-50" />
              <div className="relative w-full h-full glass-card rounded-2xl flex flex-col items-center justify-center border border-glass-border shadow-2xl">
                 <Image src="/logo-mark.png" alt="Zentrion Logo" width={80} height={80} className="mb-6 drop-shadow-xl" />
                 <h3 className="font-mono text-xl font-bold tracking-widest text-ink">ZENTRION</h3>
                 <p className="text-sm text-cyan mt-2 tracking-widest uppercase">Intelligence that protects</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Principles Section */}
      <section className="container-x py-24 border-t border-line bg-surface/30">
        <div className="text-center mb-16">
          <SectionHeading 
            eyebrow="What we believe" 
            title="Principles we build against" 
            center 
          />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: '🛡️',
              title: 'Prove it, don’t claim it',
              text: 'We reject generic checkboxes. Every security platform we build is cryptographically verifiable, and every audit we perform ships with reproducible findings.',
            },
            {
              icon: '⚡',
              title: 'Native Performance',
              text: 'Security should not slow down engineering. We build in Rust and leverage deep OS APIs to provide zero-trust execution without the overhead of heavy virtualization.',
            },
            {
              icon: '🧠',
              title: 'Autonomous Scale',
              text: 'The future of cybersecurity is AI vs AI. We build platforms that automate the boring tasks so human engineers can focus on architecture and strategy.',
            },
          ].map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <GlassCard className="h-full p-8 flex flex-col items-start border-t-2 hover:border-t-cyan transition-colors">
                <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-2xl border border-line mb-6">
                  {v.icon}
                </div>
                <h3 className="font-display font-semibold text-xl text-ink mb-3">{v.title}</h3>
                <p className="text-mute leading-relaxed">{v.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to build the future?"
        description="We are hiring engineers and taking on a limited number of consulting engagements each quarter."
        primary={{ href: '/careers', label: 'View Careers' }}
        secondary={{ href: '/contact', label: 'Contact Us' }}
      />
    </>
  );
}
