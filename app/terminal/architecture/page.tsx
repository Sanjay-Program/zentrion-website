import Link from 'next/link';
import {
  Reveal,
  SectionHeading,
  GlassCard,
  CTASection,
  ArrowIcon,
} from '@/components/ui';

export const metadata = {
  title: 'Architecture | ZENTRION TERMINAL',
  description: 'Engineered for absolute security. Discover the 14-phase Rust architecture that powers Zentrion Terminal.',
};

export default function ArchitecturePage() {
  return (
    <>
      <section className="pt-32 pb-12 container-x">
        <Reveal>
          <div className="mb-6 flex items-center gap-2 text-sm text-cyan">
            <Link href="/terminal" className="hover:underline">Terminal</Link>
            <span>/</span>
            <span className="text-mute">Architecture</span>
          </div>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink">
            Engineered for Absolute Security.
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-mute leading-relaxed">
            Discover the 14-phase Rust architecture that powers the ZENTRION TERMINAL.
          </p>
        </Reveal>
      </section>

      {/* Navigation Sub-menu for Terminal Ecosystem */}
      <section className="container-x mb-16">
        <div className="flex flex-wrap gap-2 p-1 bg-surface/50 rounded-lg border border-line inline-flex">
          <Link href="/terminal" className="px-4 py-2 rounded-md text-mute hover:text-ink transition-colors text-sm">Overview</Link>
          <Link href="/terminal/architecture" className="px-4 py-2 rounded-md bg-white/10 text-ink font-medium text-sm">Architecture</Link>
          <Link href="/terminal/use-cases" className="px-4 py-2 rounded-md text-mute hover:text-ink transition-colors text-sm">Use Cases</Link>
          <Link href="/terminal/compare" className="px-4 py-2 rounded-md text-mute hover:text-ink transition-colors text-sm">Compare</Link>
        </div>
      </section>

      <section className="container-x py-16 border-t border-line">
        <SectionHeading
          eyebrow="The Execution Pipeline"
          title="A 6-Step Verification Flowchart"
          description="Every command passes through a strict gauntlet before it reaches the OS kernel."
        />
        
        <div className="mt-12 grid gap-6">
          <Reveal delay={0}>
            <GlassCard className="p-6 md:p-8 border-l-4 border-l-cyan">
              <h3 className="font-display text-2xl font-semibold mb-2">1. The Caller</h3>
              <p className="text-mute">Human CLI, AI Agent, or IDE Extension (via the IPC Daemon) initiates a request.</p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="p-6 md:p-8 border-l-4 border-l-cyan">
              <h3 className="font-display text-2xl font-semibold mb-2">2. Execution Broker (z-exec)</h3>
              <p className="text-mute">Authenticates the caller cryptographically and drops any unauthorized payload attempts immediately.</p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.2}>
            <GlassCard className="p-6 md:p-8 border-l-4 border-l-cyan">
              <h3 className="font-display text-2xl font-semibold mb-2">3. Policy Engine (z-policy)</h3>
              <p className="text-mute">Checks the project's strict YAML configuration to ensure the requested action is explicitly allowed by the local team or admin.</p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.3}>
            <GlassCard className="p-6 md:p-8 border-l-4 border-l-cyan">
              <h3 className="font-display text-2xl font-semibold mb-2">4. Capability Store (z-capability)</h3>
              <p className="text-mute">If approved, issues a short-lived capability token tied to the specific process ID.</p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.4}>
            <GlassCard className="p-6 md:p-8 border-l-4 border-l-cyan">
              <h3 className="font-display text-2xl font-semibold mb-2">5. Sandbox (z-sandbox)</h3>
              <p className="text-mute">Spawns an isolated OS-level context using Landlock, Seatbelt, or Windows Job Objects, clamping down filesystem and network access.</p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.5}>
            <GlassCard className="p-6 md:p-8 border-l-4 border-l-cyan">
              <h3 className="font-display text-2xl font-semibold mb-2">6. Execution & Audit (z-audit)</h3>
              <p className="text-mute">Runs the action, generates an AES-256 hash of the execution state, and appends the immutable event to the local ledger.</p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-20 border-t border-line">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Reveal>
              <h2 className="font-display text-3xl font-semibold mb-4 text-ink">The AI Gateway (z-ai)</h2>
              <p className="text-lg text-mute mb-6">Zentrion intercepts LLM traffic before it hits the cloud.</p>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-signal/10 flex items-center justify-center text-signal">🛡️</div>
                  <div>
                    <h4 className="font-bold text-ink">Prompt Injection Detection</h4>
                    <p className="text-mute text-sm mt-1">Automatically blocks malicious inputs designed to hijack agents.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-signal/10 flex items-center justify-center text-signal">🔐</div>
                  <div>
                    <h4 className="font-bold text-ink">Secret Redaction</h4>
                    <p className="text-mute text-sm mt-1">Scrubs API keys and passwords before they leave your machine.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-signal/10 flex items-center justify-center text-signal">🛑</div>
                  <div>
                    <h4 className="font-bold text-ink">Tool-Call Validation</h4>
                    <p className="text-mute text-sm mt-1">Ensures that if an LLM hallucinates a dangerous command, it is destroyed before reaching the execution broker.</p>
                  </div>
                </li>
              </ul>
            </Reveal>
          </div>

          <div className="space-y-12">
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-semibold mb-4 text-ink">The Secrets Vault (z-identity)</h2>
              <p className="text-mute leading-relaxed">
                Never put an API key in an `.env` file again. ZENTRION stores secrets securely in the native OS Keyring (Linux Secret Service, macOS Keychain, Windows Credential Manager) via AES-256 encryption. Secrets are injected directly into sandboxed processes at runtime—meaning they are never exposed to the shell or written to disk.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <h2 className="font-display text-3xl font-semibold mb-4 text-ink">The IPC SDK Daemon (z-daemon)</h2>
              <p className="text-mute leading-relaxed">
                How do IDEs and Python scripts interact securely? They don't bypass ZENTRION; they connect to the local `z daemon`. This background JSON-RPC socket enforces identical security policies for programmatic API clients as it does for human CLI users.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection
        title="Explore the Code"
        description="ZENTRION TERMINAL is built natively in Rust. Read the source, star the repository, and contribute."
        primary={{ href: 'https://github.com/Sanjay-Program/ZENTRION-TERMINAL', label: 'View on GitHub' }}
        secondary={{ href: '/terminal/download', label: 'Download Binary' }}
      />
    </>
  );
}
