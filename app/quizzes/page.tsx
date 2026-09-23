import { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading, Reveal, GlassCard, ArrowIcon } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Cybersecurity Quizzes & Assessments',
  description: 'Test your cybersecurity knowledge with free, interactive quizzes built by Zentrion Technologies.',
};

const quizzes = [
  {
    id: 'phishing-fundamentals',
    title: 'Phishing Detection Fundamentals',
    description: 'Test your ability to spot malicious emails, spoofed domains, and social engineering tactics.',
    questions: 5,
    difficulty: 'Beginner',
    time: '5 min',
  },
  {
    id: 'password-security',
    title: 'Password Security & Cracking',
    description: 'Test your knowledge on hash algorithms, salting, cracking tools (Hashcat/John), and password policies.',
    questions: 10,
    difficulty: 'Beginner',
    time: '10 min',
  },
  {
    id: 'owasp-top-10',
    title: 'Web Application Vulnerabilities',
    description: 'Assess your understanding of the OWASP Top 10, including SQLi, XSS, SSRF, and broken access control.',
    questions: 15,
    difficulty: 'Intermediate',
    time: '15 min',
  },
  {
    id: 'network-reconnaissance',
    title: 'Network Reconnaissance & Nmap',
    description: 'Validate your knowledge of TCP/IP handshakes, port scanning techniques, and network mapping flags.',
    questions: 10,
    difficulty: 'Intermediate',
    time: '10 min',
  },
  {
    id: 'cloud-security',
    title: 'Cloud Security Fundamentals',
    description: 'Test your understanding of IAM roles, S3 bucket misconfigurations, and VPC security in AWS and Azure.',
    questions: 12,
    difficulty: 'Intermediate',
    time: '12 min',
  },
  {
    id: 'active-directory',
    title: 'Active Directory Exploitation',
    description: 'Advanced quiz covering Kerberoasting, AS-REP Roasting, BloodHound, and Windows domain privilege escalation.',
    questions: 15,
    difficulty: 'Advanced',
    time: '20 min',
  },
  {
    id: 'llm-security',
    title: 'LLM & Generative AI Security',
    description: 'Evaluate your knowledge of the OWASP LLM Top 10, RAG poisoning, data leakage, and model denial of service.',
    questions: 10,
    difficulty: 'Intermediate',
    time: '10 min',
  },
  {
    id: 'prompt-injection',
    title: 'Advanced Prompt Injection',
    description: 'A deep dive into system prompt bypasses, natural language exploits, and defensive filtering techniques.',
    questions: 8,
    difficulty: 'Advanced',
    time: '15 min',
  },
  {
    id: 'incident-response',
    title: 'Incident Response & Forensics',
    description: 'Test your skills in log analysis, memory forensics, chain of custody, and ransomware containment strategies.',
    questions: 20,
    difficulty: 'Advanced',
    time: '25 min',
  },
];

export default function QuizzesIndex() {
  return (
    <div className="pt-32 pb-24 container-x min-h-screen">
      <Reveal>
        <SectionHeading
          eyebrow="Assessments"
          title="Cybersecurity Quizzes"
          description="Test your knowledge on various security domains. Track your progress entirely in your browser."
        />
      </Reveal>

      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz, i) => (
          <Reveal key={quiz.id} delay={i * 0.1}>
            <Link href={`/quizzes/${quiz.id}`} className="block group">
              <GlassCard>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] uppercase font-mono tracking-wider px-2 py-1 rounded ${
                    quiz.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' :
                    quiz.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {quiz.difficulty}
                  </span>
                  <span className="text-xs text-mute font-mono">{quiz.questions} Qs • {quiz.time}</span>
                </div>
                
                <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-cyan transition-colors">
                  {quiz.title}
                </h3>
                <p className="text-sm text-mute leading-relaxed mb-6">
                  {quiz.description}
                </p>

                <div className="flex items-center gap-2 text-sm font-medium text-cyan group-hover:gap-3 transition-all">
                  Start Quiz <ArrowIcon />
                </div>
              </GlassCard>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
