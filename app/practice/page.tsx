import type { Metadata } from 'next';
import Link from 'next/link';
import { Eyebrow, Reveal, GlassCard, SectionHeading } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Practice | Zentrion Technologies',
  description: 'Apply your knowledge in browser-native simulations and tools.',
};

export default function HubPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/practice', label: 'Practice' }]} />
      <section className="container-x pt-10 pb-16 min-h-[60vh]">
        <Reveal>
          <Eyebrow>Cyber Range & Labs</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-3xl leading-tight">
            Practice Ecosystem
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg mb-12">
            Apply your knowledge in browser-native simulations and tools.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Reveal delay={0.1}>
            <Link href="/labs" className="block h-full">
              <GlassCard hover className="h-full flex flex-col cursor-pointer">
                <h3 className="text-xl font-bold mb-2">Labs</h3>
                <p className="text-mute text-sm flex-1 mb-4">Explore our labs section.</p>
                <div className="text-cyan text-sm font-semibold flex items-center gap-1">Explore &rarr;</div>
              </GlassCard>
            </Link>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/ctf" className="block h-full">
              <GlassCard hover className="h-full flex flex-col cursor-pointer">
                <h3 className="text-xl font-bold mb-2">CTF</h3>
                <p className="text-mute text-sm flex-1 mb-4">Explore our ctf section.</p>
                <div className="text-cyan text-sm font-semibold flex items-center gap-1">Explore &rarr;</div>
              </GlassCard>
            </Link>
          </Reveal>
          <Reveal delay={0.30000000000000004}>
            <Link href="/tools" className="block h-full">
              <GlassCard hover className="h-full flex flex-col cursor-pointer">
                <h3 className="text-xl font-bold mb-2">Tools</h3>
                <p className="text-mute text-sm flex-1 mb-4">Explore our tools section.</p>
                <div className="text-cyan text-sm font-semibold flex items-center gap-1">Explore &rarr;</div>
              </GlassCard>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
