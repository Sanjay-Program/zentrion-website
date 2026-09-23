import { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading, Reveal, GlassCard, ArrowIcon } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Interactive Cybersecurity Labs',
  description: 'Practice your cybersecurity skills in free, browser-based interactive labs.',
};

const labs = [
  {
    id: 'network-recon',
    title: 'Network Reconnaissance Lab',
    description: 'Use basic CLI tools to investigate a suspicious domain. Learn how to map infrastructure safely.',
    difficulty: 'Beginner',
    category: 'Networking',
  },
  {
    id: 'prompt-injection',
    title: 'Prompt Injection (AI Security)',
    description: 'Bypass a system prompt by using natural language exploits to extract a secret key from an LLM.',
    difficulty: 'Beginner',
    category: 'AI Security',
  },
  {
    id: 'rag-poisoning',
    title: 'RAG Poisoning (Indirect Injection)',
    description: 'Manipulate an AI assistant by injecting malicious instructions into the corporate knowledge base it reads from.',
    difficulty: 'Intermediate',
    category: 'AI Security',
  },
  {
    id: 'sql-injection',
    title: 'SQL Injection (Auth Bypass)',
    description: 'Bypass a login portal by executing raw SQL queries against a real in-browser SQLite database engine.',
    difficulty: 'Intermediate',
    category: 'Web Security',
  },
];

export default function LabsIndex() {
  return (
    <div className="pt-32 pb-24 container-x min-h-screen">
      <Reveal>
        <SectionHeading
          eyebrow="Interactive Practice"
          title="Cybersecurity Labs"
          description="Learn by doing. These browser-based labs simulate real-world scenarios without requiring complex virtual machines."
        />
      </Reveal>

      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labs.map((lab, i) => (
          <Reveal key={lab.id} delay={i * 0.1}>
            <Link href={`/labs/${lab.id}`} className="block group">
              <GlassCard>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-1 rounded bg-cyan/10 text-cyan">
                    {lab.category}
                  </span>
                  <span className={`text-[10px] uppercase font-mono tracking-wider px-2 py-1 rounded ${
                    lab.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' :
                    lab.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {lab.difficulty}
                  </span>
                </div>
                
                <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-cyan transition-colors">
                  {lab.title}
                </h3>
                <p className="text-sm text-mute leading-relaxed mb-6">
                  {lab.description}
                </p>

                <div className="flex items-center gap-2 text-sm font-medium text-cyan group-hover:gap-3 transition-all">
                  Launch Lab <ArrowIcon />
                </div>
              </GlassCard>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
