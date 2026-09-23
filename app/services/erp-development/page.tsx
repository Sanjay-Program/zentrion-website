import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal, SectionHeading, GlassCard } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'ERP Development Services',
  description: 'Enterprise Resource Planning (ERP) systems built for modern, complex business operations.',
};

const modules = [
  "Finance", "HR", "Payroll", "Inventory", "Procurement", "Sales", "Projects", "Operations"
];

export default function ERPPage() {
  return (
    <>
      <Breadcrumbs items={[
        { href: '/services', label: 'Services' },
        { href: '/services/erp-development', label: 'ERP Development' }
      ]} />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <h1 className="font-display text-4xl md:text-5xl font-semibold max-w-4xl mb-6">
            Custom <span className="text-cyan">ERP Development</span>
          </h1>
          <p className="max-w-2xl text-mute leading-relaxed text-lg mb-8">
            Unify your entire business under one secure, custom-built roof. We engineer modular Enterprise Resource Planning systems that scale with your operations without the licensing fees of traditional providers.
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
          title="Modular Enterprise Architecture"
          description="Build only the modules you need, integrated seamlessly together."
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Finance & Accounting", desc: "General ledger, accounts payable/receivable, and real-time financial reporting." },
            { title: "Inventory & Procurement", desc: "Multi-warehouse management, automated reordering, and supplier portals." },
            { title: "HR & Payroll", desc: "Employee records, attendance tracking, compliance, and automated payroll processing." },
            { title: "Operations & Manufacturing", desc: "Production scheduling, bill of materials (BOM), and quality control tracking." },
            { title: "Enterprise Security", desc: "Strict RBAC, audit logging, and data encryption built in from day one." }
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
           <h2 className="text-3xl font-display font-bold text-white mb-4">Digitize Your Enterprise</h2>
           <p className="text-mute mb-8 max-w-xl mx-auto">
             Discuss your operational bottlenecks and ERP requirements.
           </p>
           <Link href="/contact/project?service=erp-development" className="btn-primary inline-flex">
             Discuss Your ERP Requirements
           </Link>
           <div className="mt-6 pt-6 border-t border-line text-sm text-mute">
             Related Capabilities: <Link href="/services/api-development" className="text-cyan hover:underline">APIs</Link> · <Link href="/services/automation" className="text-cyan hover:underline">Automation</Link> · <Link href="/services/database-development" className="text-cyan hover:underline">Data Architecture</Link>
           </div>
         </div>
      </section>
    </>
  );
}
