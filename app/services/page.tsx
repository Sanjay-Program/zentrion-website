import type { Metadata } from 'next';
import Link from 'next/link';
import { Eyebrow, Reveal, ServiceCard, CTASection, SectionHeading, GlassCard, ArrowIcon, StatBlock } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Enterprise Cybersecurity & AI Services',
  description:
    'Cybersecurity, AI automation, cloud consulting, and enterprise software development from Zentrion Technologies. We build defenses that scale.',
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
      
      {/* HERO SECTION */}
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 mb-6">
            <span className="h-2 w-2 rounded-full bg-cyan animate-pulseDot" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-cyan">
              Enterprise Engineering
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-semibold max-w-3xl leading-[1.1]">
            Everything you need to <span className="text-gradient">build, defend, and scale.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-xl">
            We are engineers, not salespeople. We build automation that actually works and security defenses that actually protect.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/book-consultation" className="btn-primary text-lg px-8 py-3.5">
              Book Architecture Review <ArrowIcon />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* METRICS / SOCIAL PROOF */}
      <section className="container-x pb-20">
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-void border border-line rounded-2xl">
            <StatBlock value="0" label="Breaches under our MDR" />
            <StatBlock value="150+" label="Security Audits Completed" />
            <StatBlock value="99.99%" label="Uptime Maintained" />
            <StatBlock value="24/7" label="Active Threat Hunting" />
          </div>
        </Reveal>
      </section>

      {/* CORE SERVICES - PREMIUM BENTO */}
      <section className="container-x pb-24">
        <SectionHeading 
          eyebrow="Core Disciplines" 
          title="Security & Intelligence Services"
          description="We do not just send PDF reports. We find the vulnerabilities, architect the solutions, and deploy the fixes."
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            eyebrow="Security"
            title="Managed Security (MDR)"
            description="Continuous monitoring, threat hunting, and incident response for your entire infrastructure."
            href="/contact"
            points={['24/7 Threat monitoring', 'Endpoint protection', 'Rapid incident response']}
          />
          <div className="md:col-span-2 lg:col-span-3">
            <Reveal>
              <div className="glass-card p-10 rounded-2xl border-cyan/30 relative overflow-hidden group flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div className="relative z-10 max-w-2xl">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-cyan px-2 py-1 bg-cyan/10 rounded mb-4 inline-block">Flagship Service</span>
                  <h3 className="font-display text-3xl font-semibold text-ink">Website Security Audit</h3>
                  <p className="mt-4 text-lg text-mute leading-relaxed">
                    Full SSL/TLS, headers, DNS, and open port scan. Identify misconfigurations and vulnerabilities before they are exploited. Includes a comprehensive mitigation roadmap.
                  </p>
                  <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-ink font-medium">
                    <li className="flex items-center gap-2"><span className="text-cyan">✓</span> Security headers audit</li>
                    <li className="flex items-center gap-2"><span className="text-cyan">✓</span> DNS security (SPF/DKIM/DMARC)</li>
                    <li className="flex items-center gap-2"><span className="text-cyan">✓</span> Known vulnerability checks</li>
                    <li className="flex items-center gap-2"><span className="text-cyan">✓</span> Priority remediation plan</li>
                  </ul>
                </div>
                <div className="relative z-10 shrink-0">
                  <Link href="/services/website-security-audit" className="btn-primary whitespace-nowrap">
                    View Audit Details
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 border-y border-line bg-surface/50">
        <div className="container-x">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading 
                eyebrow="The Zentrion Difference" 
                title="Does your security team actually build defenses?"
                description="Or do they just run automated scanners and send you 100-page PDF reports full of false positives?"
              />
              <div className="mt-8 space-y-6">
                {[
                  { title: 'Engineer-Led Engagements', desc: 'You speak directly with the engineers securing your systems, not account managers.' },
                  { title: 'Zero-Noise Reporting', desc: 'We filter out the theoretical risks and focus on what can actually be exploited today.' },
                  { title: 'Built to Scale', desc: 'We architect defenses that grow with your user base without exponentially increasing costs.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="mt-1 w-6 h-6 rounded bg-cyan/10 text-cyan flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-ink">{item.title}</h4>
                      <p className="text-sm text-mute mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-8 rounded-2xl relative">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan to-violet opacity-20 blur-xl rounded-2xl z-[-1]" />
              <h3 className="font-display text-2xl font-semibold mb-4 text-ink">Ready to stop guessing?</h3>
              <p className="text-mute mb-8">Book a 30-minute technical discovery call. We will review your current architecture and tell you exactly where your blind spots are.</p>
              <Link href="/book-consultation" className="btn-primary w-full justify-center">
                Book Technical Discovery <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-24">
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
    </>
  );
}
