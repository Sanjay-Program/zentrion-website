import type { Metadata } from 'next';
import { Eyebrow, Reveal, GlassCard, CTASection, SectionHeading } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'AI Automation & Generative AI',
  description:
    'Generative AI solutions, LLM development, agentic AI, chatbots, and RAG systems from Zentrion Technologies.',
  alternates: { canonical: '/ai' },
};

const offerings = [
  { title: 'Generative AI Solutions', text: 'Custom generation pipelines for text, document, and workflow automation.' },
  { title: 'LLM Development', text: 'Fine-tuning, evaluation, and deployment of language models for your domain.' },
  { title: 'Agentic AI', text: 'Multi-step autonomous agents that take real actions across your tools.' },
  { title: 'AI Chatbots', text: 'Support and sales assistants that actually resolve issues, not just deflect.' },
  { title: 'RAG Systems', text: 'Retrieval-augmented pipelines grounded in your own documents and data.' },
];

export default function AiPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/ai', label: 'AI & Automation' }]} />
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <Eyebrow>AI Automation</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-2xl">
            AI systems built to ship, not to demo.
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg">
            We design and deploy production AI &mdash; agentic workflows, retrieval systems, and
            custom LLM applications &mdash; with the same security discipline we bring to
            everything else.
          </p>
        </Reveal>
      </section>

      <section className="container-x py-20 border-t border-line">
        <SectionHeading eyebrow="What we build" title="From prototype to production AI" />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {offerings.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.05}>
              <GlassCard>
                <p className="font-mono text-xs text-violet">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 font-display font-semibold text-lg">{o.title}</h3>
                <p className="mt-3 text-sm text-mute leading-relaxed">{o.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-20 border-t border-line">
        <SectionHeading
          eyebrow="Why security-first AI"
          title="Every AI system is a new attack surface"
          description="Prompt injection, data leakage, and agent over-permissioning are real risks. We threat-model every AI system we build &mdash; the same way we’d audit a network."
        />
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {[
            { title: 'Data boundaries', text: 'Explicit scoping of what a model or agent can read and touch.' },
            { title: 'Prompt injection defense', text: 'Input validation and output filtering built into the pipeline.' },
            { title: 'Human-in-the-loop', text: 'Approval gates on any action with real-world consequences.' },
          ].map((v) => (
            <Reveal key={v.title}>
              <GlassCard>
                <h3 className="font-display font-semibold text-lg">{v.title}</h3>
                <p className="mt-3 text-sm text-mute leading-relaxed">{v.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Have an AI idea that needs a security-minded team?"
        description="We’ll scope a pilot in one conversation."
        primary={{ href: '/book-consultation', label: 'Book Consultation' }}
        secondary={{ href: '/request-demo', label: 'Request a Demo' }}
      />
    </>
  );
}
