import Link from 'next/link';
import { Reveal, GlassCard, SectionHeading, ArrowIcon } from '@/components/ui';

export const metadata = {
  title: 'ZENTRION TERMINAL | The World\'s #1 Next-Generation Terminal',
  description: "We combined the speed of tmux, the smarts of an AI Copilot, the collaboration of Slack, and the toolchain of Kali Linux into a single, massively fast Rust binary.",
};

const FEATURES = [
  {
    title: 'Context-Aware AI Copilot',
    desc: 'Stop Googling error messages. Our AI Copilot lives directly inside your terminal (press `Alt+C`). It reads your terminal output, explains errors in plain English, and writes the exact command to fix it.',
    icon: '🧠'
  },
  {
    title: 'Zero-Config P2P LAN Chat',
    desc: 'Collaborate with your team instantly. Press `0` in the UI to discover other developers on your Wi-Fi and send AES-256-GCM encrypted messages peer-to-peer. No internet required. No servers. Unbreakable security.',
    icon: '💬'
  },
  {
    title: 'Built-in Mini IDE',
    desc: 'Never break your flow to open VS Code again. Press `Alt+E` to slide out our native Code Editor pane, complete with highly visible AI auto-complete overlays.',
    icon: '💻'
  },
  {
    title: 'Enterprise Cloud Sync',
    desc: 'Run `z cloud login` to authenticate securely. Your entire ZENTRION environment—including custom keybindings, chat history, and active dynamic themes—synchronizes instantly across your Mac, Windows, and Linux machines.',
    icon: '☁️'
  },
  {
    title: 'Agentic Deep Research',
    desc: 'Press `9` and type a complex query. ZENTRION spawns autonomous background agents that scrape the web, synthesize answers, and generate pristine markdown reports directly into your workspace.',
    icon: '🔍'
  },
  {
    title: 'Universal Security Package Manager',
    desc: 'Type `z install nmap` or `z install chrome`. ZENTRION securely pulls from its own audited cybersecurity registry, or falls back seamlessly to your OS package manager (`apt`, `brew`, `winget`).',
    icon: '🛡️'
  }
];

export default function TerminalPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 container-x">
        <Reveal>
          <div className="max-w-4xl">
            <h1 className="font-display font-semibold text-5xl sm:text-6xl md:text-7xl text-ink leading-tight">
              The World's #1<br />
              <span className="text-cyan">Next-Generation Terminal.</span>
            </h1>
            <p className="mt-8 text-xl text-mute leading-relaxed max-w-3xl">
              We combined the speed of <code className="text-cyan bg-cyan/10 px-1.5 py-0.5 rounded">tmux</code>, the smarts of an AI Copilot, the collaboration of Slack, and the toolchain of Kali Linux into a single, massively fast Rust binary. No subscriptions, no telemetry, just raw terminal power.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#download" className="btn-primary text-lg px-6 py-3">
                Download for Linux / Mac
              </a>
              <a href="#download" className="btn-ghost text-cyan border-cyan/20 hover:bg-cyan/10 text-lg px-6 py-3">
                Download for Windows
              </a>
            </div>
            <div className="mt-6">
              <a href="https://github.com/Sanjay-Program/ZENTRION-TERMINAL" target="_blank" rel="noopener noreferrer" className="text-mute hover:text-cyan text-sm flex items-center gap-2 transition-colors inline-flex">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                View Source on GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 border-t border-line bg-surface/30">
        <div className="container-x">
          <SectionHeading 
            eyebrow="Power at your fingertips" 
            title="Feature Highlights" 
          />
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <GlassCard hover className="h-full">
                  <div className="text-3xl mb-4 bg-surface w-12 h-12 flex items-center justify-center rounded-xl border border-line">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-bold font-display text-ink mb-3">{feat.title}</h3>
                  <p className="text-mute leading-relaxed">{feat.desc}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Design & Customization */}
      <section className="py-20 border-t border-line">
        <div className="container-x text-center max-w-4xl mx-auto">
          <Reveal>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink">
              Your Terminal. Your Aesthetic.
            </h2>
            <p className="mt-6 text-lg text-mute leading-relaxed">
              We threw away the complex, hard-to-remember Linux shortcuts. ZENTRION uses familiar desktop bindings (<code className="text-cyan bg-cyan/10 px-1.5 py-0.5 rounded">Ctrl+P</code> for Command Palette, <code className="text-cyan bg-cyan/10 px-1.5 py-0.5 rounded">Alt+S</code> for System Monitor). Want a new look? Type <code className="text-cyan bg-cyan/10 px-1.5 py-0.5 rounded">z theme apply cyberpunk</code> or <code className="text-cyan bg-cyan/10 px-1.5 py-0.5 rounded">z theme apply dracula</code> to instantly reskin the entire interface.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Universal Download Section */}
      <section id="download" className="py-24 border-t border-line bg-surface/50 scroll-mt-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading 
              eyebrow="Get Started" 
              title="1-Click Universal Deployment" 
              description="Zentrion Technologies provides seamless installers for all major Operating Systems. You do not need to install complex dependencies; our automated scripts handle the toolchains, environment paths, and strict security sandboxing for you."
            />
          </Reveal>

          <div className="mt-16 grid lg:grid-cols-2 gap-8">
            {/* Unix Installer */}
            <Reveal delay={0.1}>
              <GlassCard className="h-full border border-cyan/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <span className="text-6xl">🐧 🍏</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-ink flex items-center gap-2">
                  Linux & macOS
                </h3>
                <p className="text-cyan text-sm font-mono mt-1">Universal Unix Installer</p>
                <p className="text-mute mt-4 mb-6">Works natively on Ubuntu, Debian, Fedora, Arch, Alpine, and macOS.</p>
                
                <div className="bg-[#0a0a0a] rounded-xl border border-line overflow-hidden font-mono text-sm shadow-xl">
                  <div className="px-4 py-2 border-b border-line bg-surface/80 flex justify-between items-center">
                    <div className="flex gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                    </div>
                    <span className="text-xs text-mute uppercase tracking-widest">Terminal</span>
                  </div>
                  <div className="p-4 sm:p-5 text-gray-300 overflow-x-auto whitespace-pre">
                    <span className="text-mute"># Run this single command:</span><br/>
                    <span className="text-cyan">curl</span> -sSL https://raw.githubusercontent.com/Sanjay-Program/ZENTRION-TERMINAL/main/releases/install.sh | <span className="text-cyan">bash</span>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="https://raw.githubusercontent.com/Sanjay-Program/ZENTRION-TERMINAL/main/releases/zentrion-linux-x64.tar.gz" className="text-sm font-mono text-mute hover:text-cyan underline">Direct Linux .tar.gz</a>
                  <a href="https://raw.githubusercontent.com/Sanjay-Program/ZENTRION-TERMINAL/main/releases/zentrion-macos-universal.tar.gz" className="text-sm font-mono text-mute hover:text-cyan underline">Direct macOS .tar.gz</a>
                </div>
              </GlassCard>
            </Reveal>

            {/* Windows Installer */}
            <Reveal delay={0.2}>
              <GlassCard className="h-full border border-line">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <span className="text-6xl">🪟</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-ink flex items-center gap-2">
                  Windows 10 & 11
                </h3>
                <p className="text-mute text-sm font-mono mt-1">Native Installer</p>
                <p className="text-mute mt-4 mb-6">Automatically handles execution policies, Access Control Lists (ACL), and C++ build tools.</p>
                
                <div className="bg-[#0a0a0a] rounded-xl border border-line overflow-hidden font-mono text-sm shadow-xl">
                  <div className="px-4 py-2 border-b border-line bg-[#012456] flex justify-between items-center">
                    <div className="flex gap-2 font-sans font-semibold text-white text-xs">
                      <span className="text-blue-400 mr-1">❱_</span> Administrator: PowerShell
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 text-gray-300 overflow-x-auto whitespace-pre">
                    <span className="text-mute"># Open PowerShell as Administrator and run:</span><br/>
                    <span className="text-blue-400">Set-ExecutionPolicy</span> Bypass -Scope Process -Force; <span className="text-blue-400">Invoke-Expression</span> ((New-Object System.Net.WebClient).DownloadString(<span className="text-green-400">'https://raw.githubusercontent.com/Sanjay-Program/ZENTRION-TERMINAL/main/releases/install.ps1'</span>))
                  </div>
                </div>
                <div className="mt-6">
                  <a href="https://raw.githubusercontent.com/Sanjay-Program/ZENTRION-TERMINAL/main/releases/Zentrion-Windows-x64.msi" className="text-sm font-mono text-mute hover:text-cyan underline">Direct Windows .msi Installer</a>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Community & Documentation */}
      <section className="py-20 border-t border-line">
        <div className="container-x">
          <SectionHeading 
            eyebrow="Resources" 
            title="Backed by Crystal-Clear Documentation" 
            description="Dive into the world's most capable terminal runtime. Whether you are an absolute beginner taking your first steps or a cybersecurity expert auditing policy execution, we have a guide for you."
          />
          <div className="mt-12 max-w-3xl">
            <ul className="space-y-4">
              <li>
                <a href="https://github.com/Sanjay-Program/ZENTRION-TERMINAL/blob/main/docs/GETTING_STARTED.md" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-line hover:border-cyan/50 hover:bg-cyan/5 transition-all group">
                  <span className="text-2xl">🆕</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-ink group-hover:text-cyan transition-colors">Getting Started Guide</h4>
                    <p className="text-sm text-mute">For beginners installing ZENTRION for the first time.</p>
                  </div>
                  <ArrowIcon />
                </a>
              </li>
              <li>
                <a href="https://github.com/Sanjay-Program/ZENTRION-TERMINAL/blob/main/docs/1000-COMMANDS-REFERENCE.md" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-line hover:border-cyan/50 hover:bg-cyan/5 transition-all group">
                  <span className="text-2xl">📖</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-ink group-hover:text-cyan transition-colors">The 1000 Commands Reference</h4>
                    <p className="text-sm text-mute">Complete manual for power users and sysadmins.</p>
                  </div>
                  <ArrowIcon />
                </a>
              </li>
              <li>
                <a href="https://github.com/Sanjay-Program/ZENTRION-TERMINAL" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-line hover:border-cyan/50 hover:bg-cyan/5 transition-all group">
                  <span className="text-2xl">💻</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-ink group-hover:text-cyan transition-colors">GitHub Repository</h4>
                    <p className="text-sm text-mute">View source code, report issues, and contribute.</p>
                  </div>
                  <ArrowIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
