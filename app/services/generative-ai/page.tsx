import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal, SectionHeading, GlassCard } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';
import Accordion, { AccordionItem } from '@/components/Accordion';

export const metadata: Metadata = {
  title: 'Generative AI & LLM Development Company | Zentrion Technologies',
  description: 'Custom Generative AI applications, RAG systems, and AI workflows engineered for enterprise security and data privacy.',
  keywords: ['generative ai development company', 'llm development', 'rag architecture', 'enterprise ai solutions', 'ai document intelligence'],
  alternates: { canonical: 'https://zentriontechnologies.com/services/generative-ai' },
  openGraph: {
    title: 'Generative AI & LLM Development Company | Zentrion',
    description: 'Custom LLM applications and RAG systems engineered for enterprise.',
    url: 'https://zentriontechnologies.com/services/generative-ai',
    siteName: 'Zentrion Technologies',
    type: 'website',
  }
};

const faqs: AccordionItem[] = [
  { title: 'What is RAG (Retrieval-Augmented Generation)?', meta: 'Technology', content: 'RAG is a technique that connects a Large Language Model (like GPT-4 or Claude) to your private knowledge base. Instead of answering from general knowledge, the AI retrieves specific documents from your database and uses them to generate accurate, context-aware answers without hallucinations.' },
  { title: 'Is our corporate data sent to OpenAI for training?', meta: 'Privacy', content: 'No. When using enterprise APIs (like Azure OpenAI or Anthropic API), strict data privacy agreements guarantee your prompts and data are never used to train their base models. For extreme security, we can deploy open-source models (like Llama 3) entirely within your private cloud.' },
  { title: 'How do you prevent prompt injection attacks?', meta: 'Security', content: 'We implement rigorous input sanitization, semantic filtering, and output validation guardrails. We treat AI applications exactly like traditional web applications: never trust user input.' },
  { title: 'Can the AI analyze our internal PDFs and contracts?', meta: 'Capabilities', content: 'Yes. Our Document Intelligence pipelines can ingest thousands of unstructured PDFs, OCR them, chunk the text, and vectorize it for instant semantic search and analysis by the LLM.' },
];

const architecture = [
  "Data", "Processing", "Retrieval", "Model", "Tools", "Guardrails", "Application", "Evaluation", "Monitoring"
];

export default function GenerativeAIPage() {
  return (
    <>
      <Breadcrumbs items={[
        { href: '/services', label: 'Services' },
        { href: '/services/generative-ai', label: 'Generative AI' }
      ]} />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <h1 className="font-display text-4xl md:text-5xl font-semibold max-w-4xl mb-6">
            <span className="text-cyan">Generative AI</span> Development
          </h1>
          <p className="max-w-2xl text-mute leading-relaxed text-lg mb-8">
            Move beyond simple API wrappers. We engineer robust, enterprise-grade AI applications using Retrieval-Augmented Generation (RAG), fine-tuned models, and strict security guardrails.
          </p>
        </Reveal>
      </section>

      <section className="container-x pb-24">
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-3">
            {architecture.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="px-4 py-2 bg-surface border border-line rounded font-mono text-sm text-ink">
                  {step}
                </div>
                {i < architecture.length - 1 && (
                  <div className="text-cyan">→</div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-24">
        <SectionHeading 
          eyebrow="Capabilities" 
          title="Enterprise AI Solutions"
          description="Applying artificial intelligence to solve complex business problems securely."
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "RAG Systems", desc: "Retrieval-Augmented Generation connecting LLMs to your private, proprietary knowledge bases." },
            { title: "Document Intelligence", desc: "Automated extraction, summarization, and reasoning over complex PDFs and contracts." },
            { title: "AI Search", desc: "Semantic vector search replacing keyword matching for internal platforms and e-commerce." },
            { title: "AI Workflow Automation", desc: "Replacing manual data entry and triage with intelligent, deterministic AI pipelines." },
            { title: "Secure AI Architecture", desc: "Data boundaries, PII redacting, and prompt injection defenses built-in by default." }
          ].map((item, i) => (
            <GlassCard key={i} className="p-6">
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
          description="Everything you need to know about enterprise Gen AI."
        />
        <div className="mt-12 max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </section>

      <section className="container-x pb-24">
         <div className="bg-surface/50 border border-line p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto">
           <h2 className="text-3xl font-display font-bold text-white mb-4">Build an AI Solution</h2>
           <p className="text-mute mb-8 max-w-xl mx-auto">
             Discuss your data and how AI can optimize your workflows.
           </p>
           <Link href="/contact/project?service=generative-ai" className="btn-primary inline-flex">
             Discuss Your AI Project
           </Link>
           <div className="mt-6 pt-6 border-t border-line text-sm text-mute">
             Related Capabilities: <Link href="/services/ai-security" className="text-cyan hover:underline">AI Security</Link> · <Link href="/services/cloud-solutions" className="text-cyan hover:underline">Cloud Infrastructure</Link>
           </div>
         </div>
      </section>
    </>
  );
}
