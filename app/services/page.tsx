import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal, SectionHeading, GlassCard, ArrowIcon } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Professional Cybersecurity Services',
  description: 'Zentrion Technologies helps organizations understand, assess, detect, investigate, respond to, and improve their cybersecurity posture.',
  alternates: { canonical: '/services' },
};

const domains = [
  {
    category: "Security Assessment & VAPT",
    services: [
      { name: "Security Assessment", desc: "Understand your security posture with comprehensive architecture and controls reviews.", url: "/contact" },
      { name: "VAPT", desc: "Vulnerability Assessment and Penetration Testing across web, API, network, and cloud.", url: "/services/vapt" },
      { name: "Application Security", desc: "Secure SDLC, threat modeling, and deep code security reviews.", url: "/contact" },
      { name: "API Security", desc: "Authentication, authorization (IDOR/BOLA), and business logic testing for APIs.", url: "/contact" },
      { name: "Network Security", desc: "Internal/external attack surface assessments and segmentation reviews.", url: "/contact" }
    ]
  },
  {
    category: "Detection & Response",
    services: [
      { name: "SOC & Security Monitoring", desc: "Log analysis, detection engineering, and incident management.", url: "/contact" },
      { name: "Threat Hunting", desc: "Proactive hypothesis-driven investigations mapped to MITRE ATT&CK.", url: "/services/threat-hunting" },
      { name: "Incident Response", desc: "Rapid triage, containment, eradication, and forensic reconstruction.", url: "/services/incident-response" },
      { name: "Digital Forensics", desc: "Memory analysis, timeline reconstruction, and evidence preservation.", url: "/contact" },
      { name: "Threat Intelligence", desc: "IOC enrichment, TTP analysis, and campaign tracking.", url: "/contact" }
    ]
  },
  {
    category: "Engineering & Cloud",
    services: [
      { name: "Cloud Security", desc: "Configuration, identity, and architecture reviews for AWS, Azure, and GCP.", url: "/services/cloud-security" },
      { name: "Security Engineering", desc: "Zero Trust architecture, least privilege design, and system hardening.", url: "/contact" },
      { name: "DevSecOps", desc: "SAST, DAST, SCA, and CI/CD pipeline security automation.", url: "/contact" },
      { name: "AI Security", desc: "LLM red-teaming, prompt injection defense, and RAG architecture security.", url: "/contact" },
      { name: "Security Automation", desc: "Custom SOAR playbooks and infrastructure-as-code security gating.", url: "/contact" }
    ]
  },
  {
    category: "Governance & Research",
    services: [
      { name: "Privacy & Compliance", desc: "Data protection readiness, control mapping, and risk registers.", url: "/contact" },
      { name: "Security Architecture", desc: "Strategic defense-in-depth design and identity architecture planning.", url: "/contact" },
      { name: "Security Awareness", desc: "Organizational defense against phishing, social engineering, and device risks.", url: "/contact" },
      { name: "Security Research", desc: "Zero-day vulnerability discovery, reverse engineering, and exploit analysis.", url: "/contact" }
    ]
  }
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
              Enterprise Engagement Platform
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-semibold max-w-4xl leading-[1.1]">
            Zentrion Technologies helps organizations <span className="text-gradient">assess, detect, and respond</span> to modern threats.
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-xl">
            We provide deep technical expertise across all major domains of information security—from offensive penetration testing to defensive threat hunting and incident response.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/book-consultation" className="btn-primary text-lg px-8 py-3.5">
              Discuss an Engagement <ArrowIcon />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* EDUCATIONAL TO PROFESSIONAL FUNNEL EXPLANATION */}
      <section className="container-x pb-24">
        <Reveal delay={0.1}>
          <div className="bg-surface/30 border border-line rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-2xl font-bold mb-4 font-display text-white">From Education to Enterprise Protection</h2>
              <p className="text-mute mb-8 leading-relaxed">
                Zentrion Technologies believes in transparency and continuous education. We provide free educational resources and simulated lab environments to developers and security students worldwide. For organizations, we offer professional, authorized security engagements to protect real-world infrastructure.
              </p>
              
              <div className="hidden md:flex items-center gap-4 text-sm font-mono mt-8 p-4 bg-void border border-line rounded-xl">
                <div className="flex-1 text-center p-3 bg-surface/50 rounded border border-line/50">
                  <div className="text-cyan mb-1">Learn</div>
                  <div className="text-xs text-mute font-sans">Free Guides</div>
                </div>
                <div className="text-mute">→</div>
                <div className="flex-1 text-center p-3 bg-surface/50 rounded border border-line/50">
                  <div className="text-cyan mb-1">Practice</div>
                  <div className="text-xs text-mute font-sans">Simulated Labs</div>
                </div>
                <div className="text-mute">→</div>
                <div className="flex-1 text-center p-3 bg-emerald-500/10 rounded border border-emerald-500/30">
                  <div className="text-emerald-500 mb-1">Assess</div>
                  <div className="text-xs text-mute font-sans">Readiness Questionnaires</div>
                </div>
                <div className="text-mute">→</div>
                <div className="flex-1 text-center p-3 bg-indigo-500/20 rounded border border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                  <div className="text-white font-bold mb-1">Protect</div>
                  <div className="text-xs text-indigo-200 font-sans">Professional Engagement</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* THE 20 CORE CAPABILITIES */}
      <section className="container-x pb-24">
        <SectionHeading 
          eyebrow="Capabilities" 
          title="Professional Capabilities"
          description="Zentrion understands cybersecurity from fundamentals through real security engineering, assessment, detection, response, cloud, and AI."
        />
        
        <div className="mt-16 space-y-16">
          {domains.map((domain, index) => (
            <div key={index}>
              <h3 className="text-2xl font-display font-bold text-white mb-6 border-b border-line pb-4">{domain.category}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {domain.services.map((service, sIndex) => (
                  <Reveal key={sIndex} delay={sIndex * 0.05}>
                    <GlassCard className="h-full p-6 flex flex-col group hover:border-cyan/50 transition-colors">
                      <h4 className="font-bold text-lg text-white mb-2 group-hover:text-cyan transition-colors">{service.name}</h4>
                      <p className="text-sm text-mute leading-relaxed mb-6 flex-1">{service.desc}</p>
                      <Link href={service.url} className="text-xs font-mono text-cyan uppercase tracking-widest flex items-center gap-2 mt-auto">
                        Learn More <ArrowIcon />
                      </Link>
                    </GlassCard>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 border-y border-line bg-surface/50">
        <div className="container-x">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading 
                eyebrow="Professional Methodology" 
                title="Engineering-Led Security"
                description="Our engagements are driven by deep technical expertise and strict adherence to industry methodologies."
              />
              <div className="mt-8 space-y-6">
                {[
                  { title: 'Authorized Execution', desc: 'All testing and assessment is performed only with explicit, documented authorization and strictly within agreed scope.' },
                  { title: 'Zero-Noise Reporting', desc: 'We deliver findings based on technical evidence, clear severity rankings, and actionable remediation guidance.' },
                  { title: 'Full Lifecycle Support', desc: 'From initial threat modeling to post-incident recovery, we architect defenses that scale.' },
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
              <h3 className="font-display text-2xl font-semibold mb-4 text-ink">Ready to assess your posture?</h3>
              <p className="text-mute mb-8">Speak directly with our security engineers to discuss an engagement tailored to your organization's threat landscape.</p>
              <Link href="/book-consultation" className="btn-primary w-full justify-center">
                Request a Consultation <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
