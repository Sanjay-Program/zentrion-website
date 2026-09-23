import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal, SectionHeading, GlassCard } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Incident Response & Digital Forensics',
  description: 'Rapid response services for ransomware, data breaches, and insider threats.',
};

const lifecycle = [
  "Preparation", "Detection", "Analysis", "Containment", "Eradication", "Recovery", "Lessons Learned"
];

export default function IncidentResponsePage() {
  return (
    <>
      <Breadcrumbs items={[
        { href: '/services', label: 'Services' },
        { href: '/services/incident-response', label: 'Incident Response' }
      ]} />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <h1 className="font-display text-4xl md:text-5xl font-semibold max-w-4xl mb-6">
            Incident Response & <span className="text-cyan">Digital Forensics</span>
          </h1>
          <p className="max-w-2xl text-mute leading-relaxed text-lg mb-8">
            When a breach occurs, time is critical. Our digital forensics and incident response (DFIR) teams rapidly contain active threats, eradicate adversaries from your network, and forensically reconstruct the attack path.
          </p>
        </Reveal>
      </section>

      {/* LIFECYCLE WORKFLOW */}
      <section className="container-x pb-24">
        <Reveal delay={0.1}>
          <h2 className="text-2xl font-display font-bold text-white mb-8">Incident Response Lifecycle</h2>
          
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
          title="DFIR Engagements"
          description="We provide comprehensive investigative and recovery capabilities."
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Ransomware Response", desc: "Containment of ransomware spread, negotiation advisory, and infrastructure rebuilding." },
            { title: "Business Email Compromise", desc: "Forensic analysis of Office 365 and Google Workspace to determine access scope and data exfiltration." },
            { title: "Cloud Intrusions", desc: "Investigation of compromised AWS, Azure, and GCP environments and stolen IAM credentials." },
            { title: "Digital Forensics", desc: "Disk and memory forensics to recover deleted artifacts and reconstruct adversary timelines." },
            { title: "Root Cause Analysis", desc: "Detailed technical reporting on how the breach occurred to prevent recurrence." }
          ].map((item, i) => (
            <GlassCard key={i} className="p-6">
              <h3 className="font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-mute leading-relaxed">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="container-x pb-24">
         <div className="bg-red-500/10 border border-red-500/30 p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto">
           <h2 className="text-3xl font-display font-bold text-red-400 mb-4">Experiencing an Active Incident?</h2>
           <p className="text-red-200/70 mb-8 max-w-xl mx-auto">
             Do not reboot affected systems. Disconnect them from the network and contact our response team immediately.
           </p>
           <Link href="/contact" className="px-8 py-3 bg-red-600 text-white font-bold rounded shadow-lg hover:bg-red-700 transition-colors inline-flex">
             Request Emergency Assistance
           </Link>
         </div>
      </section>
    </>
  );
}
