import Link from 'next/link';
import {
  Reveal,
  SectionHeading,
  GlassCard,
  CTASection,
} from '@/components/ui';

export const metadata = {
  title: 'Use Cases | ZENTRION TERMINAL',
  description: 'How Cybersecurity Teams, Software Developers, AI & Data Teams, and Enterprise IT use Zentrion Terminal.',
};

const USE_CASES = [
  {
    title: '🛡️ For Cybersecurity Teams',
    problem: 'Setting up penetration testing environments requires heavy VMs or vulnerable bare-metal installations of Kali Linux.',
    solution: 'Run security tools safely inside ZENTRION\'s sandbox on your host OS. Every action is cryptographically audited, making compliance and forensic reporting automatic.',
  },
  {
    title: '💻 For Software Developers',
    problem: '"It works on my machine" issues, scattered environment variables, and accidental secret commits.',
    solution: 'Use `z init` to scaffold unified environments. ZENTRION securely injects secrets and runs DevSecOps scanners (SAST, Secrets Detection, SBOM generation) automatically before executing code.',
  },
  {
    title: '🤖 For AI & Data Teams',
    problem: 'Giving AI agents terminal access is incredibly dangerous, risking data exfiltration or catastrophic deletion.',
    solution: 'Deploy agents through the ZENTRION AI Gateway. Apply strict read/write boundaries, block network egress, and instantly kill rogue processes with `z lockdown`.',
  },
  {
    title: '🏢 For Enterprise IT & Fleet Managers',
    problem: 'Enforcing security policies across thousands of remote developer laptops is nearly impossible.',
    solution: 'Use `z enterprise sync` to push unified YAML security policies via SSO. Automatically forward all local tamper-evident audit logs to your central SIEM.',
  },
];

export default function UseCasesPage() {
  return (
    <>
      <section className="pt-32 pb-12 container-x">
        <Reveal>
          <div className="mb-6 flex items-center gap-2 text-sm text-cyan">
            <Link href="/terminal" className="hover:underline">Terminal</Link>
            <span>/</span>
            <span className="text-mute">Use Cases</span>
          </div>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink">
            Built for Modern Teams.
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-mute leading-relaxed">
            Discover how ZENTRION TERMINAL solves the most critical security and execution challenges across your organization.
          </p>
        </Reveal>
      </section>

      {/* Navigation Sub-menu for Terminal Ecosystem */}
      <section className="container-x mb-16">
        <div className="flex flex-wrap gap-2 p-1 bg-surface/50 rounded-lg border border-line inline-flex">
          <Link href="/terminal" className="px-4 py-2 rounded-md text-mute hover:text-ink transition-colors text-sm">Overview</Link>
          <Link href="/terminal/architecture" className="px-4 py-2 rounded-md text-mute hover:text-ink transition-colors text-sm">Architecture</Link>
          <Link href="/terminal/use-cases" className="px-4 py-2 rounded-md bg-white/10 text-ink font-medium text-sm">Use Cases</Link>
          <Link href="/terminal/compare" className="px-4 py-2 rounded-md text-mute hover:text-ink transition-colors text-sm">Compare</Link>
        </div>
      </section>

      <section className="container-x py-16 border-t border-line">
        <div className="grid md:grid-cols-2 gap-8">
          {USE_CASES.map((uc, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <GlassCard className="h-full p-8 flex flex-col">
                <h3 className="font-display text-2xl font-semibold mb-6 text-ink">{uc.title}</h3>
                
                <div className="mb-6 flex-1">
                  <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-2">The Problem</h4>
                  <p className="text-mute">{uc.problem}</p>
                </div>
                
                <div className="pt-6 border-t border-line">
                  <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">The Zentrion Solution</h4>
                  <p className="text-mute">{uc.solution}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Compare Zentrion"
        description="See how ZENTRION TERMINAL mathematically outperforms legacy solutions."
        primary={{ href: '/terminal/compare', label: 'View Comparison' }}
        secondary={{ href: '/terminal/download', label: 'Download Now' }}
      />
    </>
  );
}
