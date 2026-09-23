import { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading, Reveal, GlassCard, ArrowIcon } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Cybersecurity Frameworks (OWASP & MITRE)',
  description: 'Explore the OWASP Top 10 and MITRE ATT&CK frameworks. Learn industry-standard security models.',
};

export default function FrameworkExplorer() {
  return (
    <div className="pt-32 pb-24 container-x min-h-screen">
      <Reveal>
        <SectionHeading
          eyebrow="Industry Standards"
          title="Security Frameworks"
          description="Explore the global standards used by cybersecurity professionals to classify, track, and mitigate cyber threats."
        />
      </Reveal>

      <div className="mt-16 space-y-24">
        
        {/* OWASP Section */}
        <section>
          <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
            <div className="flex-1">
              <h2 className="text-3xl font-display font-bold text-white mb-4">OWASP Top 10</h2>
              <p className="text-mute leading-relaxed">
                The Open Worldwide Application Security Project (OWASP) Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications.
              </p>
            </div>
            <div className="w-32 h-32 bg-surface/50 rounded-2xl border border-line flex items-center justify-center shrink-0">
              <span className="text-4xl font-black text-cyan">O10</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: "A01", name: "Broken Access Control", desc: "Failures in access control allow attackers to act as users or administrators." },
              { id: "A02", name: "Cryptographic Failures", desc: "Failures related to cryptography which often lead to sensitive data exposure." },
              { id: "A03", name: "Injection", desc: "Cross-site Scripting, SQL Injection, and OS Command Injection. Practice this in our labs." },
              { id: "A04", name: "Insecure Design", desc: "Risks related to design flaws, emphasizing the need for threat modeling." },
              { id: "A05", name: "Security Misconfiguration", desc: "Insecure default settings, open cloud storage, or verbose error messages." },
              { id: "A06", name: "Vulnerable and Outdated Components", desc: "Using libraries, frameworks, or software modules with known vulnerabilities." }
            ].map((item) => (
              <GlassCard key={item.id} className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 bg-cyan/10 text-cyan text-xs font-bold rounded">{item.id}</span>
                  <h3 className="font-bold text-white text-sm">{item.name}</h3>
                </div>
                <p className="text-xs text-mute leading-relaxed mb-4">{item.desc}</p>
                {item.id === "A03" && (
                  <Link href="/labs/sql-injection" className="inline-block text-xs font-semibold text-cyan hover:underline">
                    Try Injection Lab →
                  </Link>
                )}
              </GlassCard>
            ))}
          </div>
        </section>

        {/* MITRE Section */}
        <section>
          <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
            <div className="flex-1">
              <h2 className="text-3xl font-display font-bold text-white mb-4">MITRE ATT&CK</h2>
              <p className="text-mute leading-relaxed">
                The MITRE ATT&CK® framework is a globally-accessible knowledge base of adversary tactics and techniques based on real-world observations. It is used as a foundation for the development of threat models and methodologies.
              </p>
            </div>
            <div className="w-32 h-32 bg-surface/50 rounded-2xl border border-line flex items-center justify-center shrink-0">
              <span className="text-3xl font-black text-emerald-500">ATT&CK</span>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { tactic: "Reconnaissance", tech: "Active Scanning", desc: "Adversaries may execute active scans to gather information that can be used during targeting." },
              { tactic: "Initial Access", tech: "Phishing", desc: "Adversaries may send phishing messages to gain access to victim systems." },
              { tactic: "Execution", tech: "Command and Scripting Interpreter", desc: "Adversaries may abuse command and script interpreters to execute commands, scripts, or binaries." },
              { tactic: "Defense Evasion", tech: "Rootkit", desc: "Adversaries may use rootkits to hide the presence of programs, files, network connections, etc." }
            ].map((item, i) => (
              <GlassCard key={i} className="p-5 border-t-2 border-t-emerald-500/50">
                <div className="text-[10px] uppercase tracking-widest text-mute mb-1">{item.tactic}</div>
                <h3 className="font-bold text-white text-sm mb-3">{item.tech}</h3>
                <p className="text-xs text-mute leading-relaxed mb-4">{item.desc}</p>
                {item.tactic === "Reconnaissance" && (
                  <Link href="/labs/network-recon" className="inline-block text-[10px] font-semibold text-emerald-400 hover:underline mt-auto">
                    Try Recon Lab →
                  </Link>
                )}
              </GlassCard>
            ))}
          </div>
        </section>
        
      </div>
    </div>
  );
}
