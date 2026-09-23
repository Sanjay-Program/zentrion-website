import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal, SectionHeading, GlassCard } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Agentic AI Development',
  description: 'Autonomous AI agents and multi-agent systems for complex business workflows.',
};

export default function AgenticAIPage() {
  return (
    <>
      <Breadcrumbs items={[
        { href: '/services', label: 'Services' },
        { href: '/services/agentic-ai', label: 'Agentic AI' }
      ]} />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <h1 className="font-display text-4xl md:text-5xl font-semibold max-w-4xl mb-6">
            <span className="text-cyan">Agentic AI</span> Systems
          </h1>
          <p className="max-w-2xl text-mute leading-relaxed text-lg mb-8">
            Move from chat interfaces to autonomous action. We build AI agents capable of planning, using tools (APIs, databases, browsers), and executing complex multi-step workflows with strict security boundaries.
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-24">
        <SectionHeading 
          eyebrow="Capabilities" 
          title="Autonomous Enterprise Tools"
          description="Security must be built into the architecture when models take action."
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Tool-Using Agents", desc: "Equipping LLMs with secure access to your internal APIs, databases, and SaaS tools." },
            { title: "Multi-Agent Systems", desc: "Orchestrating specialized agents (e.g., Researcher, Coder, Reviewer) to collaborate on complex tasks." },
            { title: "Workflow Automation Agents", desc: "Replacing brittle script-based automation with resilient AI that can handle edge cases." },
            { title: "Human-in-the-Loop", desc: "Mandatory human approval checkpoints for sensitive actions to prevent excessive agency." },
            { title: "Agent Security", desc: "Strict RBAC, prompt injection defenses, and isolated execution environments for safe AI operations." }
          ].map((item, i) => (
            <GlassCard key={i} className="p-6 border-t-2 border-t-purple-500/50">
              <h3 className="font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-mute leading-relaxed">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="container-x pb-24">
         <div className="bg-surface/50 border border-line p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto">
           <h2 className="text-3xl font-display font-bold text-white mb-4">Deploy Agentic Workflows</h2>
           <p className="text-mute mb-8 max-w-xl mx-auto">
             Discuss an AI Agent project and the necessary security guardrails.
           </p>
           <Link href="/contact/project?service=agentic-ai" className="btn-primary inline-flex">
             Discuss an AI Agent Project
           </Link>
           <div className="mt-6 pt-6 border-t border-line text-sm text-mute">
             Related Capabilities: <Link href="/services/ai-security" className="text-cyan hover:underline">AI Security</Link> · <Link href="/services/api-development" className="text-cyan hover:underline">API Development</Link>
           </div>
         </div>
      </section>
    </>
  );
}
