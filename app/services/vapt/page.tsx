import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal, SectionHeading, GlassCard } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Vulnerability Assessment & Penetration Testing (VAPT)',
  description: 'Professional VAPT services for web applications, APIs, network infrastructure, and cloud environments.',
};

const lifecycle = [
  "Planning", "Scope", "Recon", "Scanning", "Validation", "Exploitation", "Analysis", "Reporting", "Remediation", "Retest"
];

export default function VaptServicePage() {
  return (
    <>
      <Breadcrumbs items={[
        { href: '/services', label: 'Services' },
        { href: '/services/vapt', label: 'VAPT' }
      ]} />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <h1 className="font-display text-4xl md:text-5xl font-semibold max-w-4xl mb-6">
            Vulnerability Assessment & Penetration Testing <span className="text-cyan">(VAPT)</span>
          </h1>
          <p className="max-w-2xl text-mute leading-relaxed text-lg mb-8">
            Identify, validate, and exploit vulnerabilities across your external attack surface, internal networks, web applications, and APIs before adversaries do.
          </p>
          <div className="p-4 border border-cyan/30 bg-cyan/10 rounded text-cyan text-sm max-w-xl">
            <strong>Note:</strong> All penetration testing is performed only with explicit, documented authorization and strictly within agreed scope.
          </div>
        </Reveal>
      </section>

      {/* LIFECYCLE WORKFLOW */}
      <section className="container-x pb-24">
        <Reveal delay={0.1}>
          <h2 className="text-2xl font-display font-bold text-white mb-8">Professional Engagement Lifecycle</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            {lifecycle.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="px-4 py-2 bg-surface border border-line rounded font-mono text-sm text-ink">
                  {step}
                </div>
                {i < lifecycle.length - 1 && (
                  <div className="text-cyan">→</div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-24">
        <SectionHeading 
          eyebrow="Capabilities" 
          title="VAPT Delivery Areas"
          description="We deliver comprehensive security assessments across your entire technology stack."
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Web Application VAPT", desc: "Deep-dive manual assessment against the OWASP Top 10, including complex business logic flaws." },
            { title: "API VAPT", desc: "Targeted testing for REST and GraphQL APIs, focusing on IDOR, BOLA, and authorization bypasses." },
            { title: "Network VAPT", desc: "External and internal infrastructure testing to identify exposed services and misconfigurations." },
            { title: "Cloud VAPT", desc: "Assessment of AWS, Azure, and GCP environments, targeting IAM misconfigurations and open storage." },
            { title: "Mobile App Security", desc: "Static and dynamic analysis of iOS and Android applications and their backend communications." }
          ].map((item, i) => (
            <GlassCard key={i} className="p-6">
              <h3 className="font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-mute leading-relaxed">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="container-x pb-24">
         <div className="bg-surface/50 border border-line p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto">
           <h2 className="text-3xl font-display font-bold text-white mb-4">Request a Consultation</h2>
           <p className="text-mute mb-8 max-w-xl mx-auto">
             Discuss your scope, compliance requirements, and architecture with our security engineering team.
           </p>
           <Link href="/book-consultation" className="btn-primary inline-flex">
             Discuss Your Security Requirements
           </Link>
         </div>
      </section>
    </>
  );
}
