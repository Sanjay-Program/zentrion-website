import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal, SectionHeading, GlassCard } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Threat Hunting Services',
  description: 'Proactive cyber threat hunting mapped to the MITRE ATT&CK framework.',
};

const lifecycle = [
  "Hypothesis", "Data", "Investigation", "TTP Mapping", "Detection", "Validation", "Reporting"
];

export default function ThreatHuntingPage() {
  return (
    <>
      <Breadcrumbs items={[
        { href: '/services', label: 'Services' },
        { href: '/services/threat-hunting', label: 'Threat Hunting' }
      ]} />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <h1 className="font-display text-4xl md:text-5xl font-semibold max-w-4xl mb-6">
            Proactive <span className="text-cyan">Threat Hunting</span>
          </h1>
          <p className="max-w-2xl text-mute leading-relaxed text-lg mb-8">
            Do not wait for a SIEM alert to fire. Our Threat Hunting teams proactively search through your networks, endpoints, and datasets to detect advanced persistent threats (APTs) that have bypassed automated security controls.
          </p>
        </Reveal>
      </section>

      {/* LIFECYCLE WORKFLOW */}
      <section className="container-x pb-24">
        <Reveal delay={0.1}>
          <h2 className="text-2xl font-display font-bold text-white mb-8">Hunt Methodology</h2>
          
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
          title="Hunt Focus Areas"
          description="We investigate the subtle indicators of compromise (IOCs) and behaviors."
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Lateral Movement", desc: "Identifying adversaries moving between systems using compromised credentials and living-off-the-land binaries (LOLBins)." },
            { title: "Persistence Mechanisms", desc: "Searching for hidden scheduled tasks, registry modifications, and rogue services designed to survive reboots." },
            { title: "Command and Control (C2)", desc: "Analyzing network flow data and DNS requests to identify beaconing behavior to malicious infrastructure." },
            { title: "Credential Abuse", desc: "Detecting anomalous authentication patterns, impossible travel, and Kerberoasting attacks." },
            { title: "Data Exfiltration", desc: "Identifying abnormal outbound data transfers and unauthorized use of cloud storage APIs." }
          ].map((item, i) => (
            <GlassCard key={i} className="p-6 border-t-2 border-t-indigo-500/50">
              <h3 className="font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-mute leading-relaxed">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="container-x pb-24">
         <div className="bg-surface/50 border border-line p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto">
           <h2 className="text-3xl font-display font-bold text-white mb-4">Assume Compromise</h2>
           <p className="text-mute mb-8 max-w-xl mx-auto">
             Discuss a proactive threat hunting engagement to ensure your environment is clean.
           </p>
           <Link href="/book-consultation" className="btn-primary inline-flex">
             Request a Consultation
           </Link>
         </div>
      </section>
    </>
  );
}
