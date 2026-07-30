import type { Metadata } from 'next';
import { Eyebrow, Reveal, ServiceCard, CTASection, SectionHeading, GlassCard } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Cybersecurity, AI automation, cloud consulting, and enterprise software development from Zentrion Technologies.',
  alternates: { canonical: '/services' },
};

const otherServices = [
  { title: 'Full Stack Development', text: 'Web applications built on modern, maintainable stacks.' },
  { title: 'Mobile App Development', text: 'Native-feel apps for iOS and Android from one codebase.' },
  { title: 'Blockchain Development', text: 'Solidity smart contracts and on-chain infrastructure.' },
  { title: 'Enterprise Software', text: 'Internal tools and systems built for scale and audit trails.' },
];

export default function ServicesPage() {
  return (
    <>
      <section className="container-x pt-36 pb-16">
        <Reveal>
          <Eyebrow>Services</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
            Everything you need to build, defend, and scale.
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg">
            Four core disciplines, delivered by the same engineers who’ll be on the call when
            something breaks at 2am.
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-20">
        <div className="grid md:grid-cols-2 gap-5">
          <ServiceCard
            eyebrow="Cybersecurity"
            title="AI-Powered Cybersecurity"
            description="Vulnerability assessment, penetration testing, network, cloud, and endpoint security, and audits your team can act on."
            href="/cybersecurity"
            points={['Vulnerability assessment', 'Penetration testing', 'Cloud & endpoint security', 'Security audits']}
          />
          <ServiceCard
            eyebrow="AI"
            title="AI Automation"
            description="Generative AI solutions, LLM development, agentic AI, chatbots, and RAG systems built for real workloads."
            href="/ai"
            points={['Generative AI solutions', 'Agentic AI', 'AI chatbots', 'RAG systems']}
          />
          <ServiceCard
            eyebrow="Cloud"
            title="Cloud Consulting"
            description="Architecture, migration, and security review across your cloud footprint."
            href="/cloud"
            points={['Cloud migration', 'Cost optimization', 'Cloud security review']}
          />
          <ServiceCard
            eyebrow="Training"
            title="Training & Internships"
            description="Cybersecurity awareness training, certifications, and structured internship programs."
            href="/training"
            points={['Cybersecurity awareness', 'Certifications', 'Internships & placement training']}
          />
        </div>
      </section>

      <section className="container-x py-20 border-t border-line">
        <SectionHeading eyebrow="Also available" title="Software & blockchain engineering" />
        <div className="mt-12 grid md:grid-cols-4 gap-5">
          {otherServices.map((s) => (
            <Reveal key={s.title}>
              <GlassCard>
                <h3 className="font-display font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm text-mute leading-relaxed">{s.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Not sure which service fits?"
        description="Tell us what you’re building or defending and we’ll point you to the right team."
        primary={{ href: '/book-consultation', label: 'Book Consultation' }}
        secondary={{ href: '/contact', label: 'Contact Us' }}
      />
    </>
  );
}
