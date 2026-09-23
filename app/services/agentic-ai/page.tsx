import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal, SectionHeading, GlassCard } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';
import Accordion, { AccordionItem } from '@/components/Accordion';

export const metadata: Metadata = {
  title: 'Agentic AI Development Company | Zentrion Technologies',
  description: 'Autonomous AI agents and multi-agent systems built for complex business workflows with strict enterprise security boundaries.',
  keywords: ['agentic ai development', 'ai agents', 'multi-agent systems', 'autonomous ai workflows', 'secure ai agent development'],
  alternates: { canonical: 'https://zentriontechnologies.com/services/agentic-ai' },
  openGraph: {
    title: 'Agentic AI Development Company | Zentrion',
    description: 'Autonomous AI agents built for complex enterprise workflows.',
    url: 'https://zentriontechnologies.com/services/agentic-ai',
    siteName: 'Zentrion Technologies',
    type: 'website',
  }
};

const faqs: AccordionItem[] = [
  { title: 'What is the difference between Generative AI and Agentic AI?', meta: 'Definitions', content: 'Generative AI (like ChatGPT) waits for a human prompt, generates text, and stops. Agentic AI acts autonomously. It receives a high-level goal, creates a step-by-step plan, uses tools (APIs, browsers, databases) to gather information, and takes actions to complete the goal without constant human intervention.' },
  { title: 'Is it safe to let AI take actions in our systems?', meta: 'Security', content: 'Only with strict boundaries. We implement "Human-in-the-Loop" architectures where the AI can draft an email or prepare a database query, but a human must click "Approve" before execution. We also strictly scope API keys (least-privilege) so the agent cannot perform unauthorized actions.' },
  { title: 'What is a Multi-Agent System?', meta: 'Architecture', content: 'Instead of one massive AI trying to do everything, a multi-agent system orchestrates several specialized AI agents. For example, a "Researcher Agent" gathers data, hands it to a "Writer Agent" to draft a report, which hands it to a "Reviewer Agent" to fact-check.' },
  { title: 'What tools can you equip an AI Agent with?', meta: 'Tools', content: 'Almost anything with an API. We can equip agents to read/write to your CRM, query SQL databases, search the web, execute terminal commands in sandboxes, read internal Confluence wikis, or send Slack messages.' },
];

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
        <SectionHeading 
          eyebrow="FAQ"
          title="Common Questions"
          description="Understanding autonomous AI agents and security."
        />
        <div className="mt-12 max-w-3xl">
          <Accordion items={faqs} />
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
