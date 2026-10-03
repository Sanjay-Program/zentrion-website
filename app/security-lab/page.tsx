import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ClientTester from './ClientTester';

export const metadata: Metadata = {
  title: 'Internal Security Lab | Zentrion',
  description: 'Internal testing ground for security experiments and regressions.',
  robots: 'noindex, nofollow', // Ensure this is not indexed
};

export default function SecurityLabPage() {
  return (
    <>
      <Breadcrumbs />
      <div className="container-x py-10 md:py-16 min-h-[60vh]">
        <header className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
            <span className="font-mono text-[11px] uppercase tracking-widest text-red-500">
              INTERNAL USE ONLY
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
            Security Testing Lab
          </h1>
          <p className="text-lg text-[rgb(var(--c-mute))] max-w-2xl">
            This environment is used for isolated testing of security primitives (e.g. CSP violation reporting, postMessage bounds, React sanitization).
          </p>
        </header>

        <ClientTester />
      </div>
    </>
  );
}
