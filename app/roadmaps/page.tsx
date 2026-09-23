import { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading, Reveal, GlassCard } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Cybersecurity Learning Roadmaps',
  description: 'Structured learning paths for mastering cybersecurity from beginner to advanced.',
};

const roadmaps = [
  {
    id: 'beginner',
    title: 'Cybersecurity Fundamentals',
    description: 'The essential starting point. Learn networking, web protocols, and basic security hygiene.',
    duration: '4-6 weeks',
    steps: [
      { name: 'Networking Basics', link: '/guides/networking-basics' },
      { name: 'DNS & Domains', link: '/guides/check-dns-records' },
      { name: 'Phishing Fundamentals', link: '/quizzes/phishing-fundamentals' },
    ]
  },
  {
    id: 'ethical-hacker',
    title: 'Ethical Hacker (Offensive)',
    description: 'Learn how attackers exploit systems so you can secure them. Covers pentesting, web exploitation, and reconnaissance.',
    duration: '10-12 weeks',
    steps: [
      { name: 'Network Reconnaissance', link: '/labs/network-recon' },
      { name: 'Nmap Scanning', link: '/guides/nmap-scanning-tutorial' },
      { name: 'Web Exploitation (SQLi, XSS)', link: '/guides/sql-injection-tutorial' },
    ]
  },
  {
    id: 'soc-analyst',
    title: 'SOC Analyst (Defensive)',
    description: 'Build the skills to monitor networks, analyze malware, and respond to active incidents.',
    duration: '8-10 weeks',
    steps: [
      { name: 'Wireshark & Packet Analysis', link: '/guides/wireshark-packet-analysis' },
      { name: 'Detecting Intrusions', link: '/guides/detect-intrusions' },
      { name: 'Log Analysis', link: '/guides/log-analysis-tutorial' },
    ]
  },
  {
    id: 'ai-security',
    title: 'AI & LLM Security',
    description: 'Understand the vulnerabilities of modern AI systems and how to secure Agentic pipelines.',
    duration: '4-6 weeks',
    steps: [
      { name: 'OWASP LLM Top 10', link: '/guides/owasp-llm-top-10-2026' },
      { name: 'Prompt Injection Lab', link: '/labs/prompt-injection' },
      { name: 'Securing AI Workflows', link: '/guides/secure-ai-workflows' },
    ]
  }
];

export default function RoadmapsPage() {
  return (
    <div className="pt-32 pb-24 container-x min-h-screen">
      <Reveal>
        <SectionHeading
          eyebrow="Learning Paths"
          title="Cybersecurity Roadmaps"
          description="Don't know where to start? Follow our structured learning paths that combine guides, labs, and quizzes to take you from zero to practitioner."
        />
      </Reveal>

      <div className="mt-16 space-y-12">
        {roadmaps.map((roadmap, i) => (
          <Reveal key={roadmap.id} delay={i * 0.1}>
            <div id={roadmap.id} className="scroll-mt-32">
              <GlassCard className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-10">
                  
                  {/* Left Column: Info */}
                  <div className="md:w-1/3 shrink-0">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan mb-2 block">Path {i + 1}</span>
                    <h2 className="text-2xl font-display font-semibold mb-4 text-ink">{roadmap.title}</h2>
                    <p className="text-mute leading-relaxed mb-6">{roadmap.description}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-line text-sm text-mute font-mono">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/></svg>
                      {roadmap.duration}
                    </div>
                  </div>
                  
                  {/* Right Column: Steps */}
                  <div className="md:w-2/3">
                    <div className="relative border-l border-line ml-4 md:ml-0 pl-8 space-y-8">
                      {roadmap.steps.map((step, stepIdx) => (
                        <div key={stepIdx} className="relative group">
                          {/* Node Dot */}
                          <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full border-2 border-void bg-line group-hover:bg-cyan transition-colors" />
                          
                          {/* Step Content */}
                          <div className="flex flex-col items-start">
                            <span className="text-[10px] font-mono text-mute mb-1">STEP {stepIdx + 1}</span>
                            <Link href={step.link} className="text-lg font-medium text-ink group-hover:text-cyan transition-colors">
                              {step.name}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </GlassCard>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
