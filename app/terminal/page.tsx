import Link from 'next/link';
import {
  Reveal,
  SectionHeading,
  GlassCard,
  CTASection,
  ArrowIcon,
} from '@/components/ui';

export const metadata = {
  title: 'ZENTRION TERMINAL | Secure Execution Broker',
  description: "The world's most advanced cross-platform developer, cybersecurity, and AI runtime.",
};

const FEATURES = [
  {
    title: 'The execution broker that trusts absolutely nothing.',
    desc: "ZENTRION is not a bash replacement; it is a secure execution broker. Whether a command is typed by a human, executed by a CI pipeline, or hallucinated by an AI, it is intercepted. Our Deny-by-Default YAML policy engine validates every file read, network request, and process spawn before issuing a single-use capability token.",
    icon: '🛡️'
  },
  {
    title: 'Deep OS Sandboxing without Virtual Machines.',
    desc: 'Virtual machines are slow, and Docker containers can be escaped. ZENTRION leverages the bleeding edge of native OS APIs. We use Linux Landlock & Seccomp, macOS Seatbelt, and Windows Job Objects to bind untrusted binaries directly to the host OS with zero virtualization overhead.',
    icon: '⚡'
  },
  {
    title: 'The AI Bill of Materials (AI-BOM).',
    desc: 'The AI supply chain is a black box. Not anymore. ZENTRION automatically generates an AI-BOM for every project, mapping exactly which Large Language Models, Autonomous Agents, and Model Context Protocol (MCP) servers are running in your workspace. Achieve instant compliance and shut down Shadow AI.',
    icon: '🧾'
  },
  {
    title: 'Tamper-Evident Cryptographic Auditing.',
    desc: 'If it happened on your machine, ZENTRION proves it. Every terminal event is logged into an AES-256 hash-chained local ledger. If an attacker or a rogue agent attempts to modify history, `z audit verify` will instantly detect the broken hash chain.',
    icon: '⛓️'
  },
  {
    title: 'Safe Monolithic Utilities.',
    desc: 'Tired of supply chain attacks targeting basic tools? ZENTRION ships with memory-safe, Rust-native implementations of essential diagnostics (z-curl, z-sysinfo, z-ping) compiled directly into the monolithic binary.',
    icon: '🦀'
  },
  {
    title: 'Over-The-Air (OTA) Self-Healing.',
    desc: 'Push updates to 10,000 developers without fear. Our built-in OTA engine downloads cryptographically verified binaries, stages them securely, and if an update breaks a local environment, a single `z upgrade rollback` instantly restores the system to the previous known-good state.',
    icon: '🔄'
  }
];

const FAQS = [
  {
    q: 'Do I need to be root/admin to run ZENTRION?',
    a: 'Absolutely not. ZENTRION installs to your local user directory (~/.local/bin/z or %LOCALAPPDATA%) and utilizes user-space sandboxing APIs like Landlock and Job Objects.'
  },
  {
    q: 'Does ZENTRION replace my current shell?',
    a: 'ZENTRION runs alongside your existing shell (Bash, Zsh, PowerShell). You invoke it by typing `z run <command>`. It acts as a secure execution broker, not a shell replacement.'
  },
  {
    q: 'How does the AI sandbox prevent rogue commands?',
    a: 'ZENTRION does not trust AI models. If an AI agent attempts to execute a command, it is intercepted by the Execution Broker. The broker checks your strict YAML policy. If the action (e.g., net.connect) isn\'t explicitly whitelisted, ZENTRION blocks it at the OS kernel level and flags an audit violation.'
  },
  {
    q: 'Is it fast?',
    a: 'ZENTRION is written in pure Rust. Because it leverages native Kernel APIs instead of spinning up Virtual Machines or Docker daemon containers, execution overhead is virtually zero. It is lightning fast.'
  },
  {
    q: 'How does the Interactive Dashboard (TUI) work?',
    a: 'By running `z ui`, you launch our beautiful ratatui-powered Terminal User Interface. It provides a split-pane dashboard to monitor running AI agents, view real-time sandbox health metrics, and watch live audit logs streaming directly in your terminal.'
  }
];

export default function TerminalPage() {
  return (
    <>
      <section className="pt-32 pb-20 container-x">
        <Reveal>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink">
            ZENTRION TERMINAL
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-mute leading-relaxed">
            The world's most advanced cross-platform developer, cybersecurity, and AI runtime.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/terminal/download" className="btn-primary">
              Download Now (v1.14.0) <ArrowIcon />
            </Link>
            <Link href="/terminal/architecture" className="btn-ghost text-cyan border-cyan/20 hover:bg-cyan/10">
              View Architecture
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Navigation Sub-menu for Terminal Ecosystem */}
      <section className="container-x mb-16">
        <div className="flex flex-wrap gap-2 p-1 bg-surface/50 rounded-lg border border-line inline-flex">
          <Link href="/terminal" className="px-4 py-2 rounded-md bg-white/10 text-ink font-medium text-sm">Overview</Link>
          <Link href="/terminal/architecture" className="px-4 py-2 rounded-md text-mute hover:text-ink transition-colors text-sm">Architecture</Link>
          <Link href="/terminal/use-cases" className="px-4 py-2 rounded-md text-mute hover:text-ink transition-colors text-sm">Use Cases</Link>
          <Link href="/terminal/compare" className="px-4 py-2 rounded-md text-mute hover:text-ink transition-colors text-sm">Compare</Link>
        </div>
      </section>

      <section className="container-x py-16 border-t border-line">
        <SectionHeading
          eyebrow="Core Features"
          title="Engineered for Absolute Security"
        />
        
        <div className="mt-12 space-y-12">
          {FEATURES.map((feat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="grid md:grid-cols-[100px,1fr] gap-6 items-start">
                <div className="w-16 h-16 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-3xl">
                  {feat.icon}
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold mb-3">{feat.title}</h3>
                  <p className="text-mute leading-relaxed max-w-3xl">{feat.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-20 border-t border-line">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
        />
        <div className="mt-12 grid gap-6 max-w-4xl">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <GlassCard className="p-8">
                <h4 className="text-lg font-bold text-ink mb-3">{faq.q}</h4>
                <p className="text-mute leading-relaxed">{faq.a}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Ready to secure your execution environment?"
        description="Download Zentrion Terminal today and experience the next generation of sandboxed execution."
        primary={{ href: '/terminal/download', label: 'Download v1.14.0' }}
        secondary={{ href: '/terminal/use-cases', label: 'Explore Use Cases' }}
      />
    </>
  );
}
