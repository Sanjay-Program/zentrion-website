import type { Metadata } from 'next';
import { Eyebrow, Reveal, ServiceCard, CTASection, SectionHeading, GlassCard } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

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
      <Breadcrumbs items={[{ href: '/services', label: 'Services' }]} />
      <section className="container-x pt-10 pb-16">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ServiceCard
            eyebrow="Security"
            title="Website Security Audit"
            description="Full SSL/TLS, headers, DNS, and open port scan. Identify misconfigurations and vulnerabilities before they are exploited."
            href="/services/website-security-audit"
            points={['Security headers audit', 'DNS security (SPF/DKIM/DMARC)', 'Known vulnerability checks']}
          />
          <ServiceCard
            eyebrow="Security"
            title="Penetration Testing"
            description="Deep-dive manual and automated exploitation of your web applications, networks, and cloud infrastructure."
            href="/contact"
            points={['Web & API Pentesting', 'Network exploitation', 'Detailed remediation reports']}
          />
          <ServiceCard
            eyebrow="AI"
            title="AI Security Assessment"
            description="Evaluate your LLMs and AI agents against prompt injection, data leakage, and the OWASP Top 10."
            href="/contact"
            points={['Prompt injection testing', 'Agentic architecture review', 'Data leakage prevention']}
          />
          <ServiceCard
            eyebrow="AI"
            title="AI Automation"
            description="Custom generative AI solutions, agentic workflows, and RAG systems built to automate repetitive enterprise tasks."
            href="/contact"
            points={['Custom LLM workflows', 'Agentic automation', 'Enterprise RAG systems']}
          />
          <ServiceCard
            eyebrow="Security"
            title="Managed Security (MDR)"
            description="Continuous monitoring, threat hunting, and incident response for your entire infrastructure."
            href="/contact"
            points={['24/7 Threat monitoring', 'Endpoint protection', 'Rapid incident response']}
          />
          <ServiceCard
            eyebrow="Compliance"
            title="DPDP Compliance"
            description="Ensure your data handling practices comply with India's Digital Personal Data Protection Act."
            href="/contact"
            points={['Data mapping', 'Privacy impact assessments', 'Compliance auditing']}
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
