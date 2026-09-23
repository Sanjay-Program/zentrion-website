import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal, SectionHeading, GlassCard } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';
import Accordion, { AccordionItem } from '@/components/Accordion';

export const metadata: Metadata = {
  title: 'Cloud Solutions & Architecture Services | Zentrion Technologies',
  description: 'Enterprise AWS, Azure, and Google Cloud infrastructure, migration, and deployment services engineered for scale and security.',
  keywords: ['cloud architecture services', 'aws migration', 'azure development', 'gcp architecture', 'cloud devops services'],
  alternates: { canonical: 'https://zentriontechnologies.com/services/cloud-solutions' },
  openGraph: {
    title: 'Cloud Solutions & Architecture Services | Zentrion',
    description: 'Enterprise AWS, Azure, and GCP infrastructure and migration services.',
    url: 'https://zentriontechnologies.com/services/cloud-solutions',
    siteName: 'Zentrion Technologies',
    type: 'website',
  }
};

const faqs: AccordionItem[] = [
  { title: 'Which cloud providers do you specialize in?', meta: 'Platforms', content: 'Our primary expertise lies in the "Big Three": Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). We also extensively utilize Cloudflare for edge computing, WAF, and global content delivery.' },
  { title: 'Can you migrate our legacy on-premise servers to the cloud?', meta: 'Migration', content: 'Yes. We perform a complete architecture audit, design the target cloud environment, and execute a phased "lift-and-shift" or full refactoring migration to ensure zero data loss and minimal downtime.' },
  { title: 'Do you use Infrastructure as Code (IaC)?', meta: 'DevOps', content: 'Always. We never configure servers manually via the console. Every piece of infrastructure we build is defined in code using Terraform or AWS CloudFormation, ensuring environments are reproducible, version-controlled, and immutable.' },
  { title: 'How do you control runaway cloud costs?', meta: 'Optimization', content: 'We conduct rigorous FinOps audits. We identify orphaned resources, right-size over-provisioned EC2/VM instances, implement spot instances for non-critical workloads, and architect serverless solutions to ensure you only pay for what you compute.' },
];

const providers = [
  "Amazon Web Services (AWS)", "Microsoft Azure", "Google Cloud (GCP)", "Cloudflare"
];

export default function CloudSolutionsPage() {
  return (
    <>
      <Breadcrumbs items={[
        { href: '/services', label: 'Services' },
        { href: '/services/cloud-solutions', label: 'Cloud Solutions' }
      ]} />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <h1 className="font-display text-4xl md:text-5xl font-semibold max-w-4xl mb-6">
            Enterprise <span className="text-cyan">Cloud Solutions</span>
          </h1>
          <p className="max-w-2xl text-mute leading-relaxed text-lg mb-8">
            Build resilient, scalable, and secure infrastructure. Whether you are migrating legacy systems or building cloud-native applications from scratch, we architect environments that optimize performance and minimize costs.
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-24">
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-3">
            {providers.map((step, i) => (
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
          title="Cloud Engineering Services"
          description="Infrastructure as Code (IaC) and modern deployment methodologies."
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Cloud Architecture", desc: "Designing secure VPCs, subnet routing, and scalable multi-AZ or multi-region environments." },
            { title: "Cloud Migration", desc: "Safely transitioning on-premise or legacy workloads to modern cloud infrastructure." },
            { title: "Serverless & Containers", desc: "Deploying highly scalable applications via AWS Lambda, EKS, Azure Functions, or Cloud Run." },
            { title: "Cost Optimization", desc: "Auditing over-provisioned resources and implementing cost-aware architectural changes." },
            { title: "Cloud Security", desc: "Enforcing least-privilege IAM, logging, monitoring, and compliance from day one." }
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
          description="Everything you need to know about our cloud architecture."
        />
        <div className="mt-12 max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </section>

      <section className="container-x pb-24">
         <div className="bg-surface/50 border border-line p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto">
           <h2 className="text-3xl font-display font-bold text-white mb-4">Architect Your Infrastructure</h2>
           <p className="text-mute mb-8 max-w-xl mx-auto">
             Discuss your multi-cloud or hybrid deployment requirements.
           </p>
           <Link href="/contact/project?service=cloud-solutions" className="btn-primary inline-flex">
             Discuss Your Cloud Requirements
           </Link>
           <div className="mt-6 pt-6 border-t border-line text-sm text-mute">
             Related Capabilities: <Link href="/services/devops" className="text-cyan hover:underline">DevOps</Link> · <Link href="/services/cloud-security" className="text-cyan hover:underline">Cloud Security Assessment</Link>
           </div>
         </div>
      </section>
    </>
  );
}
