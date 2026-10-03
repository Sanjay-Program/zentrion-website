import type { Metadata } from 'next';
import Link from 'next/link';
import { Eyebrow, Reveal, GlassCard, SectionHeading } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Company | Zentrion Technologies',
  description: 'Our enterprise services, research, and mission.',
};

export default function HubPage() {
  return (
    <>
      <Breadcrumbs items={[{ href: '/company', label: 'Company' }]} />
      <section className="container-x pt-10 pb-16 min-h-[60vh]">
        <Reveal>
          <Eyebrow>Zentrion Technologies</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-3xl leading-tight">
            Company Ecosystem
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg mb-12">
            Our enterprise services, research, and mission.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Reveal delay={0.1}>
            <Link href="/services" className="block h-full">
              <GlassCard hover className="h-full flex flex-col cursor-pointer">
                <h3 className="text-xl font-bold mb-2">Services</h3>
                <p className="text-mute text-sm flex-1 mb-4">Explore our services section.</p>
                <div className="text-cyan text-sm font-semibold flex items-center gap-1">Explore &rarr;</div>
              </GlassCard>
            </Link>
          </Reveal>
          <Reveal delay={0.2}>
            <Link href="/about" className="block h-full">
              <GlassCard hover className="h-full flex flex-col cursor-pointer">
                <h3 className="text-xl font-bold mb-2">About Us</h3>
                <p className="text-mute text-sm flex-1 mb-4">Explore our about us section.</p>
                <div className="text-cyan text-sm font-semibold flex items-center gap-1">Explore &rarr;</div>
              </GlassCard>
            </Link>
          </Reveal>
          <Reveal delay={0.30000000000000004}>
            <Link href="/contact" className="block h-full">
              <GlassCard hover className="h-full flex flex-col cursor-pointer">
                <h3 className="text-xl font-bold mb-2">Contact</h3>
                <p className="text-mute text-sm flex-1 mb-4">Explore our contact section.</p>
                <div className="text-cyan text-sm font-semibold flex items-center gap-1">Explore &rarr;</div>
              </GlassCard>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
