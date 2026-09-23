import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal, SectionHeading, GlassCard } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Cloud Security Assessments',
  description: 'Professional security assessments for AWS, Azure, and Google Cloud (GCP) environments.',
};

const lifecycle = [
  "Discovery", "Configuration Review", "Identity Review", "Network Review", "Data Review", "Detection Review", "Risk", "Remediation", "Validation"
];

export default function CloudSecurityPage() {
  return (
    <>
      <Breadcrumbs items={[
        { href: '/services', label: 'Services' },
        { href: '/services/cloud-security', label: 'Cloud Security' }
      ]} />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <h1 className="font-display text-4xl md:text-5xl font-semibold max-w-4xl mb-6">
            Enterprise <span className="text-cyan">Cloud Security</span>
          </h1>
          <p className="max-w-2xl text-mute leading-relaxed text-lg mb-8">
            Identify critical misconfigurations, overly permissive IAM roles, and exposed data across your Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP) environments.
          </p>
        </Reveal>
      </section>

      {/* LIFECYCLE WORKFLOW */}
      <section className="container-x pb-24">
        <Reveal delay={0.1}>
          <h2 className="text-2xl font-display font-bold text-white mb-8">Assessment Methodology</h2>
          
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
          title="Cloud Focus Areas"
          description="We review your cloud control plane and data plane against industry benchmarks."
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Identity & Access Management", desc: "Reviewing IAM roles, policies, and cross-account trust relationships to enforce least privilege." },
            { title: "Storage Security", desc: "Identifying publicly accessible S3 buckets, Azure Blobs, and unencrypted critical datastores." },
            { title: "Network Architecture", desc: "Assessing VPC configurations, Security Groups, NACLs, and exposed management interfaces." },
            { title: "Secrets Management", desc: "Ensuring API keys, passwords, and tokens are stored securely in services like AWS Secrets Manager or HashiCorp Vault." },
            { title: "Kubernetes & Containers", desc: "Evaluating EKS, AKS, and GKE cluster security, RBAC, and pod security admission controls." }
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
           <h2 className="text-3xl font-display font-bold text-white mb-4">Secure Your Cloud Infrastructure</h2>
           <p className="text-mute mb-8 max-w-xl mx-auto">
             Discuss your multi-cloud or hybrid architecture with our cloud security engineers.
           </p>
           <Link href="/book-consultation" className="btn-primary inline-flex">
             Request a Cloud Security Assessment
           </Link>
         </div>
      </section>
    </>
  );
}
