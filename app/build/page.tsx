import type { Metadata } from 'next';
import Link from 'next/link';
import { Eyebrow, Reveal, GlassCard, SectionHeading } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Build | Zentrion Technologies',
  description: 'Secure coding practices, DevSecOps, and cloud architecture.',
};

export default function HubPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/build', label: 'Build' }]} />
      <section className="container-x pt-10 pb-16 min-h-[60vh]">
        <Reveal>
          <Eyebrow>Secure Development & AppSec</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-3xl leading-tight">
            Build Ecosystem
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg mb-12">
            Secure coding practices, DevSecOps, and cloud architecture.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Reveal delay={0.1}>
            <Link href="/secure-development" className="block h-full">
              <GlassCard hover className="h-full flex flex-col cursor-pointer">
                <h3 className="text-xl font-bold mb-2">Secure Coding</h3>
                <p className="text-mute text-sm flex-1 mb-4">Explore our secure coding section.</p>
                <div className="text-cyan text-sm font-semibold flex items-center gap-1">Explore &rarr;</div>
              </GlassCard>
            </Link>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/cloud" className="block h-full">
              <GlassCard hover className="h-full flex flex-col cursor-pointer">
                <h3 className="text-xl font-bold mb-2">Cloud Security</h3>
                <p className="text-mute text-sm flex-1 mb-4">Explore our cloud security section.</p>
                <div className="text-cyan text-sm font-semibold flex items-center gap-1">Explore &rarr;</div>
              </GlassCard>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
