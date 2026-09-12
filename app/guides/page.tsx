import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security Guides & Tutorials – Free Cybersecurity Learning | Zentrion',
  description: 'Free cybersecurity guides with real commands, full walkthroughs, and hands-on tutorials. Nmap, Wireshark, Kali Linux, SQL injection, CTF, and more.',
  keywords: 'cybersecurity guides, nmap tutorial, wireshark tutorial, kali linux guide, sql injection tutorial, ctf walkthrough, penetration testing guide',
};

const HOW_TO_GUIDES = [
  { title: 'How to Check if Your Website is Hacked', url: '/guides/check-if-website-hacked', icon: '🔍', time: '10 min read', tags: ['Website Security', 'Malware'] },
  { title: 'How to Check if Your Email Has Been Leaked', url: '/guides/email-leak-check', icon: '📧', time: '8 min read', tags: ['Data Breach', 'HIBP'] },
  { title: 'How to Find Open Ports on Your Network', url: '/guides/find-open-ports', icon: '🔌', time: '12 min read', tags: ['Nmap', 'Network'] },
  { title: 'How to Check DNS Records of a Domain', url: '/guides/check-dns-records', icon: '🌐', time: '8 min read', tags: ['DNS', 'dig'] },
  { title: 'How to Detect Phishing Emails', url: '/guides/detect-phishing-email', icon: '🎣', time: '10 min read', tags: ['Phishing', 'Email Security'] },
  { title: 'How to Secure Your Home Wi-Fi in 10 Steps', url: '/guides/secure-wifi-home', icon: '📶', time: '8 min read', tags: ['WiFi', 'WPA3'] },
  { title: 'How to Check if a Website is Safe', url: '/guides/check-website-safe', icon: '✅', time: '7 min read', tags: ['URL Safety', 'SSL'] },
  { title: 'Phone OSINT & SIM Intelligence', url: '/guides/phone-intelligence-osint', icon: '📱', time: '15 min read', tags: ['OSINT', 'Telecom'] },
];

const TUTORIALS = [
  { title: 'Nmap Scanning Tutorial – 50+ Commands with Examples', url: '/guides/nmap-scanning-tutorial', icon: '🗺️', time: '45 min', difficulty: 'Beginner' },
  { title: 'Wireshark Packet Analysis – 30 Real-World Exercises', url: '/guides/wireshark-packet-analysis', icon: '📡', time: '60 min', difficulty: 'Intermediate' },
  { title: 'Kali Linux Pentesting from Zero – Full Walkthrough', url: '/guides/kali-linux-pentesting-tutorial', icon: '💀', time: '90 min', difficulty: 'Intermediate' },
  { title: 'Password Cracking with Hashcat & John the Ripper', url: '/guides/password-cracking-tutorial', icon: '🔓', time: '50 min', difficulty: 'Intermediate' },
  { title: 'SQL Injection from A to Z – Manual + sqlmap', url: '/guides/sql-injection-tutorial', icon: '💉', time: '60 min', difficulty: 'Intermediate' },
  { title: 'CTF Walkthrough – 10 Beginner Challenges Solved', url: '/guides/ctf-walkthrough-beginner', icon: '🏴', time: '40 min', difficulty: 'Beginner' },
  { title: 'Home Lab Setup for Cybersecurity (Free)', url: '/guides/home-lab-cybersecurity', icon: '🏠', time: '30 min', difficulty: 'Beginner' },
  { title: 'Python Security Scripts – 20 Scripts in 10 Min Each', url: '/guides/python-cybersecurity-scripts', icon: '🐍', time: '45 min', difficulty: 'Intermediate' },
  { title: 'Ransomware Incident Response Playbook', url: '/guides/ransomware-incident-response', icon: '🚨', time: '25 min', difficulty: 'Advanced' },
  { title: 'Home SOC Setup with Wazuh + Suricata (Free)', url: '/guides/home-soc-setup', icon: '🖥️', time: '40 min', difficulty: 'Advanced' },
  { title: 'Google Dorking & OSINT – 100+ Dorks That Expose Everything', url: '/guides/google-dorking-osint', icon: '🕵️', time: '25 min', difficulty: 'Beginner' },
  { title: 'Burp Suite Complete Guide – Web App Pentesting (40+ Techniques)', url: '/guides/burp-suite-web-pentesting', icon: '🕷️', time: '45 min', difficulty: 'Intermediate' },
  { title: 'Active Directory Attacks – Kerberoasting, BloodHound, AD CS', url: '/guides/active-directory-attacks', icon: '🏢', time: '50 min', difficulty: 'Advanced' },
  { title: 'Bug Bounty from Zero – Recon to Report (Complete Workflow)', url: '/guides/bug-bounty-tutorial', icon: '💰', time: '35 min', difficulty: 'Intermediate' },
  { title: 'Malware Analysis – Static & Dynamic (Full Lab Setup)', url: '/guides/malware-analysis-tutorial', icon: '🦠', time: '40 min', difficulty: 'Advanced' },
  { title: 'Cloud Security – AWS/Azure Misconfigurations (40+ Checks)', url: '/guides/cloud-security-tutorial', icon: '☁️', time: '30 min', difficulty: 'Intermediate' },
  { title: 'Linux Privilege Escalation – 30+ Methods (Full Guide)', url: '/guides/linux-privilege-escalation', icon: '🐧', time: '45 min', difficulty: 'Advanced' },
  { title: 'Phishing Attack Lab – Gophish + SET (Build, Launch, Analyze)', url: '/guides/phishing-attack-lab', icon: '🎣', time: '25 min', difficulty: 'Intermediate' },
];

const DIFF_COLORS: Record<string, string> = {
  Beginner: 'bg-green-500/20 text-green-400 border border-green-500/30',
  Intermediate: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  Advanced: 'bg-red-500/20 text-red-400 border border-red-500/30',
};

export default function GuidesIndexPage() {
  return (
    <main className="force-dark min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))]">
      {/* Hero */}
      <div className="relative overflow-hidden pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/10 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500 opacity-[0.06] blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[var(--c-glass-border)] text-sm font-bold uppercase tracking-widest mb-6 text-[rgb(var(--c-mute))]">
            📚 Free Learning Resources
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-5 bg-gradient-to-br from-white via-white/90 to-white/60 bg-clip-text text-transparent">
            Security Guides &amp; Tutorials
          </h1>
          <p className="text-xl text-[rgb(var(--c-mute))] max-w-2xl mx-auto mb-10">
            In-depth cybersecurity guides with real commands, code examples, and step-by-step walkthroughs. No fluff — just working techniques.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-5 py-2.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[var(--c-glass-border)] text-sm">
              <span className="font-bold text-[rgb(var(--c-accent))]">17</span> <span className="text-[rgb(var(--c-mute))]">Guides & Tutorials</span>
            </div>
            <div className="px-5 py-2.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[var(--c-glass-border)] text-sm">
              <span className="font-bold text-[rgb(var(--c-accent))]">200+</span> <span className="text-[rgb(var(--c-mute))]">Real Commands</span>
            </div>
            <div className="px-5 py-2.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[var(--c-glass-border)] text-sm">
              <span className="font-bold text-[rgb(var(--c-accent))]">100%</span> <span className="text-[rgb(var(--c-mute))]">Free</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-24">
        {/* How-To Guides */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 rounded-full bg-[rgb(var(--c-accent))]" />
            <h2 className="text-2xl font-black tracking-tight">How-To Guides</h2>
            <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[rgba(255,255,255,0.06)] text-[rgb(var(--c-mute))]">{HOW_TO_GUIDES.length}</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOW_TO_GUIDES.map((g) => (
              <Link
                key={g.url}
                href={g.url}
                className="group flex flex-col p-6 rounded-2xl bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] hover:border-[rgba(47,107,255,0.4)] hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200"
              >
                <div className="text-3xl mb-4">{g.icon}</div>
                <h3 className="font-bold text-base mb-2 group-hover:text-[rgb(var(--c-accent))] transition-colors leading-snug">{g.title}</h3>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="text-xs text-[rgb(var(--c-mute))]">{g.time}</span>
                  <div className="flex gap-1.5 flex-wrap justify-end">
                    {g.tags.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.05)] text-[rgb(var(--c-mute))]">{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Deep-Dive Tutorials */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 rounded-full bg-purple-500" />
            <h2 className="text-2xl font-black tracking-tight">Deep-Dive Tutorials</h2>
            <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[rgba(255,255,255,0.06)] text-[rgb(var(--c-mute))]">{TUTORIALS.length}</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {TUTORIALS.map((t) => (
              <Link
                key={t.url}
                href={t.url}
                className="group flex items-start gap-5 p-6 rounded-2xl bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] hover:border-[rgba(47,107,255,0.4)] hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200"
              >
                <div className="text-4xl shrink-0">{t.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base mb-2 group-hover:text-[rgb(var(--c-accent))] transition-colors leading-snug">{t.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[rgb(var(--c-mute))]">⏱ {t.time}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${DIFF_COLORS[t.difficulty]}`}>{t.difficulty}</span>
                  </div>
                </div>
                <svg className="w-5 h-5 text-[rgb(var(--c-mute))] group-hover:text-[rgb(var(--c-accent))] shrink-0 mt-0.5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            ))}
          </div>
        </section>

        {/* Cheat Sheet CTA */}
        <section>
          <Link
            href="/resources/cybersecurity-commands"
            className="group flex flex-col sm:flex-row items-center gap-6 p-8 rounded-3xl bg-gradient-to-r from-blue-900/30 to-purple-900/20 border border-blue-500/20 hover:border-blue-500/40 transition-all"
          >
            <div className="text-5xl">📋</div>
            <div className="flex-1 text-center sm:text-left">
              <div className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--c-accent))] mb-1">Bonus Resource</div>
              <h3 className="text-xl font-black mb-1">Cybersecurity Commands Cheat Sheet</h3>
              <p className="text-[rgb(var(--c-mute))] text-sm">100+ commands for Nmap, dig, openssl, curl, hashcat, and more — all on one page.</p>
            </div>
            <div className="px-6 py-3 rounded-xl bg-white text-black font-bold text-sm group-hover:bg-gray-100 transition-colors whitespace-nowrap">
              View Cheat Sheet →
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
}
