import Link from 'next/link';
import {
  Reveal,
  SectionHeading,
  CTASection,
} from '@/components/ui';

export const metadata = {
  title: 'Compare | ZENTRION TERMINAL',
  description: 'See how ZENTRION TERMINAL mathematically outperforms legacy solutions like Bash and Kali Linux.',
};

export default function ComparePage() {
  return (
    <>
      <section className="pt-32 pb-12 container-x">
        <Reveal>
          <div className="mb-6 flex items-center gap-2 text-sm text-cyan">
            <Link href="/terminal" className="hover:underline">Terminal</Link>
            <span>/</span>
            <span className="text-mute">Compare</span>
          </div>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink">
            Beyond Legacy Environments.
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-mute leading-relaxed">
            See how ZENTRION TERMINAL mathematically outperforms legacy solutions across every critical security and execution metric.
          </p>
        </Reveal>
      </section>

      {/* Navigation Sub-menu for Terminal Ecosystem */}
      <section className="container-x mb-16">
        <div className="flex flex-wrap gap-2 p-1 bg-surface/50 rounded-lg border border-line inline-flex">
          <Link href="/terminal" className="px-4 py-2 rounded-md text-mute hover:text-ink transition-colors text-sm">Overview</Link>
          <Link href="/terminal/architecture" className="px-4 py-2 rounded-md text-mute hover:text-ink transition-colors text-sm">Architecture</Link>
          <Link href="/terminal/use-cases" className="px-4 py-2 rounded-md text-mute hover:text-ink transition-colors text-sm">Use Cases</Link>
          <Link href="/terminal/compare" className="px-4 py-2 rounded-md bg-white/10 text-ink font-medium text-sm">Compare</Link>
        </div>
      </section>

      <section className="container-x py-16 border-t border-line">
        <SectionHeading
          eyebrow="Competitive Comparison"
          title="The Technical Matrix"
        />
        
        <Reveal delay={0.1}>
          <div className="mt-12 overflow-x-auto pb-6">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="p-4 border-b border-line text-mute font-medium text-sm w-1/4">Feature</th>
                  <th className="p-4 border-b border-cyan border-l border-r border-t bg-cyan/10 text-cyan font-bold rounded-t-lg">ZENTRION TERMINAL</th>
                  <th className="p-4 border-b border-line text-mute font-medium text-sm">Traditional Shells (Bash/Zsh)</th>
                  <th className="p-4 border-b border-line text-mute font-medium text-sm">Kali Linux (VM/Docker)</th>
                  <th className="p-4 border-b border-line text-mute font-medium text-sm">Unconstrained AI Agents</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="p-4 border-b border-line font-medium text-ink">OS-Level Sandboxing</td>
                  <td className="p-4 border-b border-cyan border-l border-r bg-cyan/5 text-emerald-400 font-medium">✅ Built-in (Landlock, Seccomp)</td>
                  <td className="p-4 border-b border-line text-mute">❌ None</td>
                  <td className="p-4 border-b border-line text-yellow-400">⚠️ Requires VM overhead</td>
                  <td className="p-4 border-b border-line text-mute">❌ None</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-line font-medium text-ink">Deny-by-Default Policy</td>
                  <td className="p-4 border-b border-cyan border-l border-r bg-cyan/5 text-emerald-400 font-medium">✅ Yes</td>
                  <td className="p-4 border-b border-line text-mute">❌ No</td>
                  <td className="p-4 border-b border-line text-mute">❌ No</td>
                  <td className="p-4 border-b border-line text-mute">❌ No</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-line font-medium text-ink">Cross-Platform Native</td>
                  <td className="p-4 border-b border-cyan border-l border-r bg-cyan/5 text-emerald-400 font-medium">✅ Linux, macOS, Windows</td>
                  <td className="p-4 border-b border-line text-yellow-400">⚠️ Emulated or WSL</td>
                  <td className="p-4 border-b border-line text-mute">❌ Linux Only</td>
                  <td className="p-4 border-b border-line text-yellow-400">⚠️ Varies</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-line font-medium text-ink">Tamper-Evident Auditing</td>
                  <td className="p-4 border-b border-cyan border-l border-r bg-cyan/5 text-emerald-400 font-medium">✅ AES-256 Hash Chained</td>
                  <td className="p-4 border-b border-line text-mute">❌ Bash History (Editable)</td>
                  <td className="p-4 border-b border-line text-mute">❌ Standard Syslog</td>
                  <td className="p-4 border-b border-line text-mute">❌ None</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-line font-medium text-ink">AI Resource Governors</td>
                  <td className="p-4 border-b border-cyan border-l border-r bg-cyan/5 text-emerald-400 font-medium">✅ Strict Memory & CPU caps</td>
                  <td className="p-4 border-b border-line text-mute">❌ N/A</td>
                  <td className="p-4 border-b border-line text-mute">❌ N/A</td>
                  <td className="p-4 border-b border-line text-mute">❌ Unbounded</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-line font-medium text-ink">AI Supply Chain (BOM)</td>
                  <td className="p-4 border-b border-cyan border-l border-r bg-cyan/5 text-emerald-400 font-medium">✅ Built-in Tracking</td>
                  <td className="p-4 border-b border-line text-mute">❌ N/A</td>
                  <td className="p-4 border-b border-line text-mute">❌ N/A</td>
                  <td className="p-4 border-b border-line text-mute">❌ Black Box</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-line font-medium text-ink">OTA Self-Healing</td>
                  <td className="p-4 border-b border-cyan border-l border-r bg-cyan/5 text-emerald-400 font-medium">✅ Yes, instant rollback</td>
                  <td className="p-4 border-b border-line text-mute">❌ Relies on OS manager</td>
                  <td className="p-4 border-b border-line text-mute">❌ Breakable</td>
                  <td className="p-4 border-b border-line text-mute">❌ N/A</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-line font-medium text-ink">Safe Embedded Tools</td>
                  <td className="p-4 border-b border-cyan border-l border-r border-b rounded-b-lg bg-cyan/5 text-emerald-400 font-medium">✅ Native memory-safe bundle</td>
                  <td className="p-4 border-b border-line text-mute">❌ Vulnerable binaries</td>
                  <td className="p-4 border-b border-line text-mute">❌ Heavy dependencies</td>
                  <td className="p-4 border-b border-line text-mute">❌ None</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      <CTASection
        title="Stop compromising on execution safety."
        description="Replace legacy shells and vulnerable VMs with a mathematically verified execution broker."
        primary={{ href: '/terminal/download', label: 'Download v1.14.0' }}
      />
    </>
  );
}
