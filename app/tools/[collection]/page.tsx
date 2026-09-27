import { notFound } from 'next/navigation';
import { CATEGORIES } from '@/lib/tools-data';
import Link from 'next/link';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

type Props = {
  params: Promise<{
    collection: string;
  }>;
};

// Map URL slugs back to original names
const collectionMap: Record<string, string> = {
  'networking': 'Network',
  'dns-domains': 'DNS & Domains',
  'web-security': 'Web Security',
  'email-security': 'Email Security',
  'threat-intelligence': 'Threat Intelligence',
  'osint': 'OSINT',
  'recon': 'OSINT',
  'developer': 'Developer Security',
  'cryptography': 'Developer Security', // Alias
  'api-security': 'Web Security', // Alias
  'privacy': 'Web Security',
  'forensics': 'Threat Intelligence',
  'soc': 'Threat Intelligence',
  'ai-security': 'Web Security',
};

export async function generateStaticParams() {
  return Object.keys(collectionMap).map((collection) => ({
    collection,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const originalName = collectionMap[params.collection];
  if (!originalName) return {};

  const category = CATEGORIES.find(c => c.name === originalName);
  if (!category) return {};

  return {
    title: `${category.name} Tools`,
    description: category.description,
  };
}

export default async function ToolCollectionPage(props: Props) {
  const params = await props.params;
  const originalName = collectionMap[params.collection];
  if (!originalName) notFound();

  const category = CATEGORIES.find(c => c.name === originalName);
  if (!category) notFound();

  return (
    <>
      <Breadcrumbs />
      <div className="container-x py-16 md:py-24">
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[rgb(var(--c-accent))]/10 border border-[rgb(var(--c-accent))]/20 mb-6 text-[rgb(var(--c-accent))]">
             {/* category.icon */}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[rgb(var(--c-ink))]">
            {category.name} Tools
          </h1>
          <p className="text-xl text-[rgb(var(--c-mute))] max-w-2xl">
            {category.description}. All processing happens securely and locally in your browser.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.tools.map(tool => (
            <Link href={tool.url} key={tool.url} className="group flex flex-col h-full">
              <div className="flex-1 glass-card rounded-2xl p-6 border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.1)] transition-all">
                <h3 className="font-semibold text-lg text-[rgb(var(--c-ink))] group-hover:text-[rgb(var(--c-accent))] transition-colors mb-2">
                  {tool.name}
                </h3>
                <p className="text-sm text-[rgb(var(--c-mute))] line-clamp-2">
                  Launch the {tool.name.toLowerCase()} tool directly in your browser. No server required.
                </p>
                <div className="mt-6 flex justify-between items-center text-xs font-mono uppercase tracking-widest text-[rgb(var(--c-accent))]">
                  <span>Open Tool</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
