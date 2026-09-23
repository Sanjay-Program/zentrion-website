import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal, SectionHeading, GlassCard } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';
import Accordion, { AccordionItem } from '@/components/Accordion';

export const metadata: Metadata = {
  title: 'Custom CRM Development Company | Zentrion Technologies',
  description: 'Bespoke Customer Relationship Management (CRM) systems built for your unique business workflows, sales pipelines, and support teams.',
  keywords: ['crm development company', 'custom crm development', 'sales pipeline software', 'bespoke crm system', 'customer relationship management development'],
  alternates: { canonical: 'https://zentriontechnologies.com/services/crm-development' },
  openGraph: {
    title: 'Custom CRM Development Company | Zentrion',
    description: 'Bespoke CRM systems built for your unique workflows.',
    url: 'https://zentriontechnologies.com/services/crm-development',
    siteName: 'Zentrion Technologies',
    type: 'website',
  }
};

const faqs: AccordionItem[] = [
  { title: 'Why build a custom CRM instead of using Salesforce or HubSpot?', meta: 'Strategy', content: 'Off-the-shelf CRMs often bloat with features you do not need, charge expensive per-seat licenses, and force you to adapt your workflow to their software. A custom CRM is built exactly around your specific sales process with no recurring per-user licensing fees.' },
  { title: 'Can you integrate the CRM with our existing tools?', meta: 'Integrations', content: 'Yes. We build custom API bridges to connect your new CRM with your ERP, marketing automation platforms, email providers, telephony systems, and accounting software.' },
  { title: 'Do you include workflow automation?', meta: 'Automation', content: 'Absolutely. We can engineer rule-based triggers to automate lead assignment, send follow-up emails, alert account executives of dormant deals, and generate tasks automatically based on pipeline stages.' },
  { title: 'Is the CRM data secure?', meta: 'Security', content: 'Data security is paramount. We implement strict Role-Based Access Control (RBAC) so users only see what they are authorized to see, alongside data encryption, audit logging, and regular vulnerability assessments.' },
];

const modules = [
  "Sales Pipeline", "Lead Management", "Customer Support", "Email Integration", "Dashboards", "Automations"
];

export default function CRMPage() {
  return (
    <>
      <Breadcrumbs items={[
        { href: '/services', label: 'Services' },
        { href: '/services/crm-development', label: 'CRM Development' }
      ]} />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <h1 className="font-display text-4xl md:text-5xl font-semibold max-w-4xl mb-6">
            Custom <span className="text-cyan">CRM Development</span>
          </h1>
          <p className="max-w-2xl text-mute leading-relaxed text-lg mb-8">
            Off-the-shelf CRMs often force you to change your business to fit their software. We build bespoke Customer Relationship Management platforms designed exactly around how your sales and support teams actually operate.
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-24">
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-3">
            {modules.map((step, i) => (
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
          title="Beyond Contact Management"
          description="We build intelligent CRMs that actively drive your business forward."
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Intelligent Sales Pipelines", desc: "Custom deal stages, weighted forecasting, and automated task generation for sales reps." },
            { title: "Omnichannel Communication", desc: "Integrate Email, SMS, and WhatsApp (where compliant) directly into the customer timeline." },
            { title: "Workflow Automation", desc: "Rule-based engines to automatically assign leads, send follow-ups, and trigger alerts." },
            { title: "Role-Based Dashboards", desc: "Distinct views for SDRs, Account Executives, Support Agents, and Management." },
            { title: "Support & Ticketing", desc: "Integrated helpdesk capabilities linked directly to the customer's sales history." }
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
          description="Everything you need to know about our custom CRM engineering."
        />
        <div className="mt-12 max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </section>

      <section className="container-x pb-24">
         <div className="bg-surface/50 border border-line p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto">
           <h2 className="text-3xl font-display font-bold text-white mb-4">Upgrade Your Operations</h2>
           <p className="text-mute mb-8 max-w-xl mx-auto">
             Discuss your custom CRM requirements and workflows.
           </p>
           <Link href="/contact/project?service=crm-development" className="btn-primary inline-flex">
             Discuss Your CRM Requirements
           </Link>
           <div className="mt-6 pt-6 border-t border-line text-sm text-mute">
             Related Capabilities: <Link href="/services/automation" className="text-cyan hover:underline">Automation</Link> · <Link href="/services/ai-chatbots" className="text-cyan hover:underline">AI Integration</Link> · <Link href="/services/system-integration" className="text-cyan hover:underline">System Integration</Link>
           </div>
         </div>
      </section>
    </>
  );
}
