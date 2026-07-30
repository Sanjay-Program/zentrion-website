import type { Metadata } from 'next';
import { Eyebrow, Reveal, GlassCard, CTASection, SectionHeading } from '@/components/ui';
import { buildWhatsAppLink } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'BehaviorDNA and the Zentrion Command Center — the two security platforms Zentrion Technologies is currently building. Get early access.',
  alternates: { canonical: '/products' },
};

const products = [
  {
    slug: 'behaviordna',
    name: 'BehaviorDNA',
    tagline: 'The intelligence engine for modern cloud and AI identity security',
    summary:
      'As cloud architectures move from static IAM roles to ephemeral Kubernetes workload identities and autonomous LLM agents, traditional SIEMs can’t keep up. BehaviorDNA correlates every identity in your stack into a single graph and scores behavioral drift in real time — before it becomes an incident.',
    stack: ['Rust', 'Python', 'Neo4j', 'Kafka', 'ONNX'],
    capabilities: [
      {
        title: 'Sub-millisecond stream processing',
        text: 'A Rust-backed pipeline built on Kafka, processing millions of cloud events per minute with a minimal footprint.',
      },
      {
        title: 'AI agent & machine identity native',
        text: 'Kubernetes service accounts, OAuth clients, and autonomous AI agents are tracked as first-class identities with dynamic trust scores — not an afterthought bolted onto human-user IAM.',
      },
      {
        title: 'Identity graph correlation',
        text: 'Multi-hop serverless dependencies and cross-cluster access are mapped instantly on a graph, so a compromised credential’s real blast radius is visible immediately.',
      },
      {
        title: 'Autonomous, surgical response',
        text: 'Executes targeted containment — pausing an AI agent, rotating a secret — instead of blunt IP bans that break production.',
      },
      {
        title: 'Digital twin blast-radius simulation',
        text: 'Run proactive chaos-engineering simulations to see the exact financial and operational impact if a given identity were compromised, before it happens.',
      },
      {
        title: 'Real-time posture fusion',
        text: 'Cross-references live behavioral drift with static cloud misconfigurations to sharpen threat scores instantly, cutting false positives.',
      },
    ],
  },
  {
    slug: 'command-center',
    name: 'Zentrion Command Center',
    tagline: 'One SOC. 55+ tools. A single normalized pipeline.',
    summary:
      'A high-performance, autonomous Security Operations Center platform that unifies 55+ disparate security tools — network scanners, SAST, cloud and container scanners, threat intel feeds, and AI infrastructure monitors — into one structured intelligence pipeline, with an AI layer that triages and can act on what it finds.',
    stack: ['Next.js', 'LangGraph', 'PostgreSQL', 'RabbitMQ', 'Qdrant'],
    capabilities: [
      {
        title: '55+ integrated security tools',
        text: 'Network discovery, web application testing, cloud & container scanning, SAST/secrets detection, and threat intel feeds, normalized into one consistent finding schema.',
      },
      {
        title: 'Microsecond-latency ingestion core',
        text: 'A high-throughput backend built for enterprise telemetry volume, with multi-tenant authentication and strict tenant isolation.',
      },
      {
        title: 'Autonomous AI triage',
        text: 'An AI engine automatically triages high-severity alerts against historical context and recommends — or, where authorized, executes — immediate mitigations.',
      },
      {
        title: 'Command Center dashboard',
        text: 'A real-time view for human analysts: live telemetry, Kanban-style alert management, and a forensic workstation for deeper investigation.',
      },
      {
        title: 'Built for MSSPs and enterprise SOC teams',
        text: 'Multi-tenant and zero-trust from the ground up, designed for teams running security operations for more than one organization at a time.',
      },
    ],
  },
];

export default function ProductsPage() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@graph': products.map((p) => ({
      '@type': 'SoftwareApplication',
      name: p.name,
      description: p.summary,
      applicationCategory: 'SecurityApplication',
      operatingSystem: 'Cloud',
      publisher: {
        '@type': 'Organization',
        name: 'Zentrion Technologies',
      },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/PreOrder',
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <section className="container-x pt-36 pb-16">
        <Reveal>
          <Eyebrow>Products</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
            What we&apos;re building next.
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg">
            Two platforms currently in active development, built on everything we&apos;ve learned
            running audits and AI engagements for clients. Both are open for early access design
            partners.
          </p>
        </Reveal>
      </section>

      {products.map((p, pi) => {
        const waLink = buildWhatsAppLink(
          `Hi Zentrion Technologies, I’d like early access to ${p.name}. Could you tell me more about the design partner program?`,
        );
        return (
          <section key={p.slug} id={p.slug} className="container-x py-16 border-t border-line scroll-mt-24">
            <div className="grid lg:grid-cols-[1fr,1.3fr] gap-12">
              <Reveal>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 eyebrow !text-cyan">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulseDot" />
                  In development · Early access
                </span>
                <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold">{p.name}</h2>
                <p className="mt-3 text-cyan font-medium">{p.tagline}</p>
                <p className="mt-5 text-mute leading-relaxed">{p.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-xs px-2.5 py-1 rounded-md border border-line text-mute"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">
                  Get Early Access
                </a>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="grid sm:grid-cols-2 gap-4">
                  {p.capabilities.map((c, i) => (
                    <GlassCard key={c.title} hover={false}>
                      <p className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, '0')}</p>
                      <h3 className="mt-2 font-display font-semibold">{c.title}</h3>
                      <p className="mt-2 text-sm text-mute leading-relaxed">{c.text}</p>
                    </GlassCard>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      <section className="container-x py-16 border-t border-line">
        <SectionHeading
          eyebrow="Design partner program"
          title="Help shape these before general release"
        />
        <p className="mt-4 max-w-2xl text-mute leading-relaxed">
          A small number of design partners get direct input into the roadmap, priority support,
          and preferred pricing at general availability. Reach out with your environment and
          what you’d want either platform to solve first.
        </p>
      </section>

      <CTASection
        title="Want a walkthrough of either platform?"
        description="We’ll show you where each one stands today and where it’s headed."
        primary={{ href: '/request-demo', label: 'Request a Walkthrough' }}
        secondary={{ href: '/contact', label: 'Contact Us' }}
      />
    </>
  );
}
