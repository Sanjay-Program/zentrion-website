import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal, SectionHeading, GlassCard } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';
import Accordion, { AccordionItem } from '@/components/Accordion';

export const metadata: Metadata = {
  title: 'SaaS Development Company | Zentrion Technologies',
  description: 'Custom Software-as-a-Service (SaaS) platform development with multi-tenant architecture, secure billing, and scalable infrastructure.',
  keywords: ['saas development company', 'software as a service development', 'multi-tenant architecture', 'saas billing integration', 'custom saas platform'],
  alternates: { canonical: 'https://zentriontechnologies.com/services/saas-development' },
  openGraph: {
    title: 'SaaS Development Company | Zentrion',
    description: 'Custom SaaS platform development with enterprise multi-tenant architecture.',
    url: 'https://zentriontechnologies.com/services/saas-development',
    siteName: 'Zentrion Technologies',
    type: 'website',
  }
};

const faqs: AccordionItem[] = [
  { title: 'How do you handle multi-tenant data security?', meta: 'Architecture', content: 'We employ rigorous data isolation strategies. Depending on compliance requirements, this ranges from row-level security (RLS) in a shared database to entirely separate schemas or databases per tenant to guarantee data never crosses boundaries.' },
  { title: 'Can you integrate subscription billing?', meta: 'Payments', content: 'Yes. We natively integrate with enterprise billing providers like Stripe, Paddle, and Chargebee to handle complex metered billing, tiered subscriptions, prorations, and tax compliance globally.' },
  { title: 'Do you build admin dashboards?', meta: 'Features', content: 'Every SaaS platform we build includes a secure "Super Admin" portal. This allows your team to monitor global usage, manage tenant subscriptions, impersonate users for support, and track core platform analytics.' },
  { title: 'What is the typical timeline for an MVP?', meta: 'Timeline', content: 'A robust Minimum Viable Product (MVP) typically takes 3 to 5 months depending on complexity. We focus on shipping the core value proposition rapidly while ensuring the underlying architecture can scale without a future rewrite.' },
];

const capabilities = [
  "Multi-tenant Architecture", "Organizations & Roles", "Subscriptions & Billing", "Admin Panels", "Usage Tracking", "API Gateways"
];

export default function SaaSPage() {
  return (
    <>
      <Breadcrumbs items={[
        { href: '/services', label: 'Services' },
        { href: '/services/saas-development', label: 'SaaS Development' }
      ]} />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <h1 className="font-display text-4xl md:text-5xl font-semibold max-w-4xl mb-6">
            <span className="text-cyan">SaaS</span> Platform Development
          </h1>
          <p className="max-w-2xl text-mute leading-relaxed text-lg mb-8">
            Build scalable, secure Software-as-a-Service applications. We engineer complex multi-tenant architectures, subscription billing integrations, and powerful admin dashboards required to run modern SaaS businesses.
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-24">
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-3">
            {capabilities.map((step, i) => (
              <div key={i} className="px-4 py-2 bg-surface border border-line rounded font-mono text-sm text-ink">
                {step}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-24">
        <SectionHeading 
          eyebrow="Capabilities" 
          title="SaaS Engineering Core"
          description="The critical infrastructure required for any successful SaaS application."
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Multi-tenant Data Security", desc: "Data isolation strategies (row-level security, separate schemas) to ensure tenant data never bleeds." },
            { title: "Identity & Access (RBAC)", desc: "Complex role-based access controls for organizations, teams, and individual users." },
            { title: "Subscription Billing", desc: "Integration with Stripe or Paddle for metered billing, tiers, and subscription lifecycle management." },
            { title: "Audit Logs & Compliance", desc: "Enterprise-ready audit trails capturing all critical user and system actions." },
            { title: "API-First Architecture", desc: "Developer-friendly public APIs with rate-limiting, documentation, and secure authentication." }
          ].map((item, i) => (
            <GlassCard key={i} className="p-6">
              <h3 className="font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-mute leading-relaxed">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="container-x pb-24">
        <SectionHeading 
          eyebrow="FAQ"
          title="Common Questions"
          description="Everything you need to know about our SaaS development methodology."
        />
        <div className="mt-12 max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </section>

      <section className="container-x pb-24">
         <div className="bg-surface/50 border border-line p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto">
           <h2 className="text-3xl font-display font-bold text-white mb-4">Launch Your SaaS</h2>
           <p className="text-mute mb-8 max-w-xl mx-auto">
             Discuss your SaaS architecture and development requirements.
           </p>
           <Link href="/contact/project?service=saas-development" className="btn-primary inline-flex">
             Build Your SaaS Product With Zentrion
           </Link>
           <div className="mt-6 pt-6 border-t border-line text-sm text-mute">
             Related Capabilities: <Link href="/services/full-stack-development" className="text-cyan hover:underline">Full-Stack</Link> · <Link href="/services/cloud-solutions" className="text-cyan hover:underline">Cloud</Link> · <Link href="/services/application-security" className="text-cyan hover:underline">Security</Link>
           </div>
         </div>
      </section>
    </>
  );
}
