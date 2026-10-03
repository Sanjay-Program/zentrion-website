import type { Metadata } from 'next';
import Link from 'next/link';
import { Eyebrow, Reveal, GlassCard, SectionHeading } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Learn | Zentrion Technologies',
  description: 'Explore guides, knowledge base, cheatsheets and structured roadmaps.',
};

export default function HubPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/learn', label: 'Learn' }]} />
      <section className="container-x pt-10 pb-16 min-h-[60vh]">
        <Reveal>
          <Eyebrow>Cybersecurity Education Hub</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-3xl leading-tight">
            Learn Ecosystem
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg mb-12">
            Explore guides, knowledge base, cheatsheets and structured roadmaps.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Reveal delay={0.1}>
            <Link href="/guides" className="block h-full">
              <GlassCard hover className="h-full flex flex-col cursor-pointer">
                <h3 className="text-xl font-bold mb-2">Guides</h3>
                <p className="text-mute text-sm flex-1 mb-4">Explore our guides section.</p>
                <div className="text-cyan text-sm font-semibold flex items-center gap-1">Explore &rarr;</div>
              </GlassCard>
            </Link>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/knowledge" className="block h-full">
              <GlassCard hover className="h-full flex flex-col cursor-pointer">
                <h3 className="text-xl font-bold mb-2">Knowledge Base</h3>
                <p className="text-mute text-sm flex-1 mb-4">Explore our knowledge base section.</p>
                <div className="text-cyan text-sm font-semibold flex items-center gap-1">Explore &rarr;</div>
              </GlassCard>
            </Link>
          </Reveal>
          <Reveal delay={0.30000000000000004}>
            <Link href="/cheatsheets" className="block h-full">
              <GlassCard hover className="h-full flex flex-col cursor-pointer">
                <h3 className="text-xl font-bold mb-2">Cheatsheets</h3>
                <p className="text-mute text-sm flex-1 mb-4">Explore our cheatsheets section.</p>
                <div className="text-cyan text-sm font-semibold flex items-center gap-1">Explore &rarr;</div>
              </GlassCard>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
