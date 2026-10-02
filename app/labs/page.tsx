import { Metadata } from 'next';
import Link from 'next/link';
import { Reveal, GlassCard, ArrowIcon } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Zentrion Cyber Range',
  description: 'Practice real cybersecurity skills in browser-based environments and isolated Linux targets.',
};

const labCategories = [
  {
    title: 'Web Security',
    labs: [
      { id: 'web-enumeration', title: 'Web Enumeration & Discovery', desc: 'Find hidden directories and sensitive files.', diff: 'Beginner' },
      { id: 'sql-injection', title: 'SQL Injection (Auth Bypass)', desc: 'Bypass a login portal using raw SQL.', diff: 'Intermediate' },
      { id: 'xss-simulation', title: 'Cross-Site Scripting (XSS)', desc: 'Steal admin cookies via stored payload.', diff: 'Intermediate' },
    ]
  },
  {
    title: 'Reconnaissance',
    labs: [
      { id: 'network-recon', title: 'Nmap Practice Range', desc: 'Perform port scanning and service detection.', diff: 'Beginner' },
      { id: 'dns-recon', title: 'DNS Reconnaissance', desc: 'Query records and find subdomains.', diff: 'Beginner' },
    ]
  },
  {
    title: 'AI Security',
    labs: [
      { id: 'prompt-injection', title: 'Prompt Injection', desc: 'Extract secrets from an LLM system prompt.', diff: 'Beginner' },
      { id: 'rag-poisoning', title: 'RAG Poisoning', desc: 'Manipulate a knowledge base to exploit AI.', diff: 'Intermediate' },
    ]
  },
  {
    title: 'Network Defense',
    labs: [
      { id: 'wireshark-analysis', title: 'Packet Analysis', desc: 'Inspect PCAP files for cleartext credentials.', diff: 'Beginner' },
      { id: 'soc-analyst', title: 'SOC Log Analysis', desc: 'Investigate a cyber attack in server logs.', diff: 'Intermediate' },
    ]
  }
];

export default function LabsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <section className="container-x mb-20">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <span className="eyebrow text-cyan mb-4 block">Zentrion Cyber Range</span>
            <h1 className="font-display text-4xl md:text-6xl font-semibold mb-6">
              Practice Real Skills
            </h1>
            <p className="text-mute text-lg md:text-xl leading-relaxed">
              Learn → Recon → Exploit → Analyze → Fix. <br className="hidden md:block"/>
              Choose an isolated environment below to begin testing your methodology safely.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="container-x mb-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Reveal delay={0.1}>
            <GlassCard className="h-full border-cyan/30 bg-cyan/5 p-8 relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span>
                <h3 className="font-bold text-xl">Zentrion Web Range</h3>
              </div>
              <p className="text-sm text-mute leading-relaxed mb-6">
                Browser-native labs that work instantly on any device. No installation required. Perfect for API testing, Recon, XSS, and Web Security fundamentals.
              </p>
              <span className="text-xs font-mono text-cyan bg-cyan/10 px-3 py-1.5 rounded-md inline-block">Active Mode</span>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.2}>
            <GlassCard className="h-full opacity-70 relative p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 rounded-full bg-gray-500"></span>
                <h3 className="font-bold text-xl">Zentrion Kali Range</h3>
              </div>
              <p className="text-sm text-mute leading-relaxed mb-6">
                Isolated, disposable Linux VMs containing real security tooling (Burp, Hashcat, Metasploit). Requires a desktop browser and stable connection.
              </p>
              <span className="text-xs font-mono text-mute bg-surface border border-line px-3 py-1.5 rounded-md inline-block">Coming Q1 2027</span>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="container-x">
        <div className="grid lg:grid-cols-2 gap-x-12 gap-y-16 max-w-5xl mx-auto">
          {labCategories.map((category, catIdx) => (
            <div key={category.title}>
              <Reveal delay={catIdx * 0.1}>
                <h2 className="font-display text-2xl font-semibold mb-6 pb-2 border-b border-line">
                  {category.title}
                </h2>
                <div className="space-y-4">
                  {category.labs.map((lab) => (
                    <Link href={`/labs/${lab.id}`} key={lab.id} className="block group">
                      <div className="bg-surface/30 border border-line rounded-lg p-5 hover:border-cyan/50 hover:bg-surface/50 transition-all flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold group-hover:text-cyan transition-colors text-lg">{lab.title}</h3>
                            <span className={`text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded ${
                              lab.diff === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' :
                              lab.diff === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                              'bg-red-500/10 text-red-400'
                            }`}>
                              {lab.diff}
                            </span>
                          </div>
                          <p className="text-sm text-mute">{lab.desc}</p>
                        </div>
                        <ArrowIcon className="text-mute group-hover:text-cyan transition-colors transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
