import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCheatsheets } from '@/lib/content-parser';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Cheatsheets',
  description: 'Quick reference guides and commands for cybersecurity tools.',
};

export default function CheatsheetsIndexPage() {
  const cheatsheets = getAllCheatsheets();

  return (
    <>
      <Breadcrumbs items={[{ href: '/cheatsheets', label: 'Cheatsheets' }]} />
      <div className="container-x py-16 md:py-24">
        <header className="mb-14 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4">
            Security Cheatsheets
          </h1>
          <p className="text-xl text-[rgb(var(--c-mute))] max-w-2xl mx-auto">
            Quick reference commands, flags, and syntax for essential cybersecurity tools.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cheatsheets.map(sheet => (
            <Link href={`/cheatsheets/${sheet.metadata.slug}`} key={sheet.metadata.slug} className="block group">
              <div className="glass-card p-6 rounded-xl border border-line bg-surface/30 hover:bg-surface/50 transition-colors h-full">
                <h2 className="text-xl font-bold text-cyan mb-2 group-hover:underline">{sheet.metadata.title}</h2>
                <p className="text-sm text-mute">{sheet.metadata.description}</p>
                <div className="mt-4 text-xs font-mono uppercase tracking-widest text-cyan">
                  View Reference &rarr;
                </div>
              </div>
            </Link>
          ))}
          {cheatsheets.length === 0 && (
            <div className="col-span-full text-center py-12 text-mute italic">
              No cheatsheets published yet. Check back soon!
            </div>
          )}
        </div>
      </div>
    </>
  );
}
