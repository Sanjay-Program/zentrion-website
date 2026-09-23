import Link from 'next/link';
import ShaderHero from '@/components/ShaderHero';
import Marquee from '@/components/Marquee';
import HeroVideoBackground from '@/components/HeroVideoBackground';
import WorldMapGraph from '@/components/WorldMapGraph';
import {
  Reveal,
  StatBlock,
  SectionHeading,
  GlassCard,
  CTASection,
  ArrowIcon,
} from '@/components/ui';

const stack = [
  'AWS',
  'Microsoft Azure',
  'Google Cloud',
  'Kubernetes',
  'OWASP',
  'MITRE ATT&CK',
  'Docker',
  'Terraform',
];

const bentoServices = [
  { icon: '01', title: 'AI Automation', text: 'Agentic workflows and generative pipelines that adapt to how your team actually works.', color: 'bg-signal/10 text-signal' },
  { icon: '02', title: 'Cybersecurity', text: 'Offensive testing and defensive monitoring built on zero-trust fundamentals.', color: 'bg-cyan/10 text-cyan' },
  { icon: '03', title: 'Cloud Consulting', text: 'Multi-cloud architecture and cost review that scales with real growth.', color: 'bg-violet/10 text-violet' },
  { icon: '04', title: 'Blockchain', text: 'Solidity smart contracts and on-chain systems for transparent auditing.', color: 'bg-signal/10 text-signal' },
  { icon: '05', title: 'Threat Analytics', text: 'Forensic analysis of logs and traffic to surface what dashboards miss.', color: 'bg-cyan/10 text-cyan' },
  { icon: '06', title: 'API & Endpoint Security', text: 'Hardened gateways and device policies for the surfaces attackers hit first.', color: 'bg-violet/10 text-violet' },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="force-dark relative overflow-hidden min-h-[100vh] flex items-center pt-28 pb-16 bg-void">
        <HeroVideoBackground opacity="opacity-25" />
        <ShaderHero className="opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-void/20 via-void/60 to-void" />

        <div className="container-x relative z-10">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20">
                <span className="h-2 w-2 rounded-full bg-cyan animate-pulseDot" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-cyan">
                  Monitoring active
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 font-display font-semibold text-4xl sm:text-5xl md:text-[3.6rem] leading-[1.05] text-white">
                Intelligence That <span className="text-gradient-hero">Protects.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-lg text-mute leading-relaxed">
                Free practical cybersecurity guides, interactive labs, security tools, challenges, research, and learning paths — built by Zentrion Technologies.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link href="/guides" className="btn-primary">
                  Start Learning <ArrowIcon />
                </Link>
                <Link href="/tools" className="btn-ghost">
                  Explore Free Tools
                </Link>
                <Link href="/labs" className="btn-ghost">
                  Try Cyber Labs
                </Link>
                <Link href="/guides" className="btn-ghost text-[rgb(var(--c-accent))] border-[rgba(47,107,255,0.2)] hover:bg-[rgba(47,107,255,0.1)]">
                  Explore Security Guides
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl">
                <StatBlock value="24/7" label="Threat monitoring" />
                <StatBlock value="150+" label="Security audits shipped" />
                <StatBlock value="40+" label="AI systems deployed" />
                <StatBlock value="500+" label="Learners trained" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ACADEMY - FEATURED GUIDES */}
      <section className="container-x py-20 md:py-28 border-t border-line">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-14">
          <SectionHeading
            eyebrow="Learn Cybersecurity"
            title="Featured Security Guides"
            description="Deep-dive tutorials with real commands, code examples, and practical labs. Completely free."
          />
          <Link href="/guides" className="hidden md:inline-flex items-center gap-2 text-cyan font-medium hover:gap-3 transition-all shrink-0">
            View all guides <ArrowIcon />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { title: 'Nmap Scanning Tutorial', text: '50+ practical commands for network reconnaissance and security auditing.', href: '/guides/nmap-scanning-tutorial', category: 'Networking' },
            { title: 'Wireshark Packet Analysis', text: 'Learn to capture, filter, and analyze network traffic like a SOC analyst.', href: '/guides/wireshark-packet-analysis', category: 'Defense' },
            { title: 'LLM Prompt Injection', text: 'Understand AI security vulnerabilities and how to defend Agentic systems.', href: '/guides/owasp-llm-top-10-2026', category: 'AI Security' },
          ].map((g, i) => (
            <Reveal key={g.title} delay={i * 0.05}>
              <Link href={g.href} className="group block">
                <GlassCard>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-cyan px-2 py-1 bg-cyan/10 rounded">
                    {g.category}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold group-hover:text-cyan transition-colors">{g.title}</h3>
                  <p className="mt-3 text-sm text-mute leading-relaxed">{g.text}</p>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ACADEMY - LABS & TOOLS TEASER */}
      <section className="container-x py-20 md:py-28 border-t border-line">
        <div className="grid lg:grid-cols-2 gap-10">
          <Reveal>
            <div className="glass-card p-10 h-full rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold">Interactive Cyber Labs</h3>
              <p className="mt-4 text-mute leading-relaxed">
                Practice what you learn in safe, browser-based environments. Analyze PCAPs, detect SQL injection, and identify AI vulnerabilities.
              </p>
              <Link href="/labs" className="mt-8 inline-flex items-center gap-2 text-cyan font-medium hover:gap-3 transition-all">
                Try a free lab <ArrowIcon />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass-card p-10 h-full rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-violet">
                  <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 9h18M9 21V9" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold">Browser-Native Tools</h3>
              <p className="mt-4 text-mute leading-relaxed">
                Over 30+ free tools for security auditing, network reconnaissance, encoding, and forensics that run entirely in your browser.
              </p>
              <Link href="/tools" className="mt-8 inline-flex items-center gap-2 text-violet font-medium hover:gap-3 transition-all">
                Explore tools <ArrowIcon />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ACADEMY - ROADMAPS */}
      <section className="container-x py-20 md:py-28 border-t border-line">
        <SectionHeading
          eyebrow="Learning Paths"
          title="Cybersecurity Roadmaps"
          description="Structured paths to take you from fundamentals to advanced engineering."
        />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'Beginner', href: '/roadmaps#beginner' },
            { title: 'Ethical Hacker', href: '/roadmaps#ethical-hacker' },
            { title: 'SOC Analyst', href: '/roadmaps#soc-analyst' },
            { title: 'AI Security', href: '/roadmaps#ai-security' },
          ].map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <Link href={r.href} className="block text-center p-6 border border-line rounded-xl bg-ink/[0.02] hover:bg-ink/[0.05] transition-colors">
                <span className="font-mono text-sm text-cyan tracking-wide">{r.title}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <section className="py-14 border-y border-line bg-surface/50 overflow-hidden">
        <p className="container-x eyebrow text-center mb-8">Built on tools security teams trust</p>
        <Marquee items={stack} />
      </section>

      {/* SERVICES — BENTO GRID */}
      <section className="container-x py-20 md:py-28">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-14">
          <SectionHeading
            eyebrow="What we build"
            title="Six disciplines, one defense system"
            description="Every engagement starts from the same question: what protects this organization's data, uptime, and reputation five years from now?"
          />
          <Link href="/services" className="hidden md:inline-flex items-center gap-2 text-cyan font-medium hover:gap-3 transition-all shrink-0">
            View all services <ArrowIcon />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {bentoServices.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <GlassCard>
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center font-mono text-sm ${s.color}`}>
                  {s.icon}
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm text-mute leading-relaxed">{s.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRODUCT SPOTLIGHT */}
      <section className="container-x py-20 md:py-28">
        <Reveal>
          <div className="glass-card rounded-[32px] p-8 md:p-14 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-signal/20 rounded-full blur-[110px] pointer-events-none" />
            <div className="relative grid lg:grid-cols-2 gap-14 items-center">
              <div className="order-2 lg:order-1 glass-card rounded-2xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-breach/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  </div>
                  <span className="font-mono text-[11px] text-mute/60">ZENTRION_SHIELD_UI</span>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-mute">Alerts triaged today</p>
                    <p className="mt-1 text-4xl font-display font-semibold text-gradient">247</p>
                  </div>
                  <span className="font-mono text-sm text-emerald-400">&minus;18% noise</span>
                </div>

                <div className="mt-6 grid grid-cols-5 gap-3 h-24 items-end">
                  {[35, 55, 40, 80, 60].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className={`rounded-t-md ${i === 3 ? 'bg-signal shadow-glow' : 'bg-signal/30'}`}
                    />
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-line grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-ink/[0.03] border border-line">
                    <p className="text-xs text-mute uppercase mb-2">Network health</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-ink/10 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan w-[97%]" />
                      </div>
                      <span className="font-mono text-xs">97%</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-ink/[0.03] border border-line">
                    <p className="text-xs text-mute uppercase mb-2">Response latency</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-ink/10 rounded-full overflow-hidden">
                        <div className="h-full bg-violet w-[14%]" />
                      </div>
                      <span className="font-mono text-xs">14ms</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 space-y-7">
                <div className="w-12 h-1 bg-signal" />
                <h2 className="font-display text-3xl md:text-4xl font-semibold">
                  The Zentrion <span className="text-gradient">Cyber Shield</span>
                </h2>
                <p className="text-mute leading-relaxed">
                  A single view into your infrastructure&apos;s posture &mdash; concept mockup of
                  the monitoring layer we build into every continuous-coverage engagement.
                </p>
                <ul className="space-y-3">
                  {['Real-time alert triage', 'Automated first-response actions', 'Consolidated log intelligence'].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-ink">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/request-demo" className="btn-ghost inline-flex">
                  Request Demo Walkthrough
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* UPCOMING PRODUCTS TEASER */}
      <section className="container-x py-20 md:py-28 border-t border-line">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-14">
          <SectionHeading
            eyebrow="On the roadmap"
            title="Two platforms we're building right now"
            description="Everything we've learned running audits and AI engagements, going into product. Both are open for early access design partners."
          />
          <Link href="/products" className="hidden md:inline-flex items-center gap-2 text-cyan font-medium hover:gap-3 transition-all shrink-0">
            See both products <ArrowIcon />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              name: 'BehaviorDNA',
              tagline: 'Intelligence engine for cloud & AI identity security',
              text: 'Correlates every machine identity and AI agent in your stack into one graph, scoring behavioral drift in real time.',
            },
            {
              name: 'Zentrion Command Center',
              tagline: 'One SOC. 55+ tools. One pipeline.',
              text: 'Unifies dozens of security tools into a single normalized pipeline with autonomous AI triage and a live command dashboard.',
            },
          ].map((p) => (
            <Link key={p.name} href={`/products#${p.name === 'BehaviorDNA' ? 'behaviordna' : 'command-center'}`} className="group block">
              <GlassCard>
                <span className="inline-flex items-center gap-2 eyebrow !text-cyan">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulseDot" />
                  In development
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-cyan">{p.tagline}</p>
                <p className="mt-3 text-sm text-mute leading-relaxed">{p.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-cyan group-hover:gap-2.5 transition-all">
                  Learn more <ArrowIcon />
                </span>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="container-x py-20 md:py-28 border-t border-line">
        <SectionHeading
          eyebrow="How an engagement runs"
          title="From first audit to standing defense"
        />
        <div className="mt-12 grid md:grid-cols-4 gap-8">
          {[
            { step: 'Assess', text: 'We map your real attack surface &mdash; infrastructure, endpoints, code, and people.' },
            { step: 'Design', text: 'A remediation and architecture plan scoped to your risk tolerance and budget.' },
            { step: 'Build', text: 'Engineers implement fixes, automation, and monitoring &mdash; not just a report.' },
            { step: 'Defend', text: 'Ongoing monitoring and response so new threats get caught before impact.' },
          ].map((s, i) => (
            <Reveal key={s.step} delay={i * 0.08}>
              <div className="relative pl-6 border-l border-line">
                <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-signal" />
                <p className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, '0')}</p>
                <p className="mt-2 font-display font-semibold text-lg">{s.step}</p>
                <p className="mt-2 text-sm text-mute leading-relaxed" dangerouslySetInnerHTML={{ __html: s.text }} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="container-x py-20 md:py-28 border-t border-line">
        <SectionHeading
          eyebrow="Who we work with"
          title="Enterprises, startups, and organizations"
          description="We secure operations and accelerate workflows for organizations across multiple sectors, ensuring compliance and robust defense."
        />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            { title: 'Tech Startups & SaaS', text: 'Secure cloud architectures, AI integration, and automated CI/CD security pipelines.' },
            { title: 'Financial Services', text: 'Fintech compliance, secure API gateways, and real-time fraud detection systems.' },
            { title: 'Healthcare & Enterprises', text: 'Data privacy compliance, endpoint security, and automated incident response.' },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <GlassCard>
                <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-3 text-sm text-mute leading-relaxed">{c.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GLOBAL INTELLIGENCE / WORLD MAP */}
      <section className="border-t border-line" id="intel">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[360px] lg:min-h-[520px] border-b lg:border-b-0 lg:border-r border-line bg-surface/40">
            <WorldMapGraph />
          </div>
          <div className="container-x lg:px-14 py-16 md:py-20">
            <Reveal>
              <p className="eyebrow">Global Intelligence Feed</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold leading-tight">
                Watching the whole board
              </h2>
              <p className="mt-4 text-mute leading-relaxed max-w-xl">
                Zentrion correlates attack patterns across every client environment we protect.
                A technique used against one target hardens defenses for all others within
                minutes.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 max-w-lg">
                <StatBlock value="24,847" label="Active AI sensors" />
                <StatBlock value="72" label="Countries monitored" />
                <StatBlock value="12,406" label="Threats blocked / hour" />
                <StatBlock value="1.2M+" label="BehaviorDNA profiles" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to see where your defenses actually stand?"
        description="Book a consultation and walk away with a real picture of your risk &mdash; not a sales pitch."
        primary={{ href: '/book-consultation', label: 'Book Consultation' }}
        secondary={{ href: '/request-demo', label: 'Request a Demo' }}
      />
    </>
  );
}
