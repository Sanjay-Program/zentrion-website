import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllGuides, getGuideBySlug } from '@/lib/content-parser';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize from 'rehype-sanitize';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';

type Props = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({
    category: guide.metadata.category,
    slug: guide.metadata.slug,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const guide = getGuideBySlug(params.category, params.slug);
  if (!guide) return {};

  return {
    title: guide.metadata.title,
    description: guide.metadata.description,
    keywords: guide.metadata.tags.join(', '),
  };
}

export default async function GuideDynamicPage(props: Props) {
  const params = await props.params;
  const guide = getGuideBySlug(params.category, params.slug);

  if (!guide) {
    notFound();
  }

  const { metadata, content } = guide;

  // JSON-LD Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: metadata.title,
    description: metadata.description,
    author: {
      '@type': 'Person',
      name: metadata.author,
    },
    datePublished: metadata.publishedDate,
    dateModified: metadata.updatedDate || metadata.publishedDate,
    publisher: {
      '@type': 'Organization',
      name: 'Zentrion Technologies',
      logo: {
        '@type': 'ImageObject',
        url: 'https://zentriontechnologies.com/icon.png',
      },
    },
  };

  return (
    <>
      <Breadcrumbs />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="container-x py-10 md:py-16">
        <header className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 mb-6">
            <span className="font-mono text-[11px] uppercase tracking-widest text-cyan">
              {metadata.category} {metadata.subcategory && ` / ${metadata.subcategory}`}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-6">
            {metadata.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-mute items-center border-b border-line pb-8">
            <span>By {metadata.author}</span>
            <span>&bull;</span>
            <span>{metadata.publishedDate}</span>
            {metadata.updatedDate && (
              <>
                <span>&bull;</span>
                <span>Updated: {metadata.updatedDate}</span>
              </>
            )}
            <span>&bull;</span>
            <span>{metadata.readingTime} read</span>
            <span>&bull;</span>
            <span className="px-2 py-0.5 rounded bg-surface/50 text-ink text-xs font-medium">
              {metadata.difficulty}
            </span>
          </div>
        </header>

        <div className="grid lg:grid-cols-[1fr,320px] gap-16 items-start">
          {/* Main Content Area */}
          <div className="prose dark:prose-invert prose-headings:text-ink prose-p:text-mute prose-strong:text-ink prose-li:text-mute prose-a:text-cyan max-w-full prose-pre:bg-surface/50 prose-pre:border prose-pre:border-glass-border">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
            >
              {content}
            </ReactMarkdown>

            <div className="mt-16 pt-8 border-t border-line flex flex-col md:flex-row justify-between items-center gap-6 bg-surface/30 p-8 rounded-2xl">
              <div>
                <p className="font-semibold text-lg">Building a production web application?</p>
                <p className="text-sm text-mute mt-1">Discuss your project architecture and security requirements with us.</p>
              </div>
              <Link href="/contact/project" className="btn-primary shrink-0">
                Discuss Your Project
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="sticky top-32 space-y-8 border-l border-line pl-8 hidden lg:block">
            {metadata.relatedGuides && metadata.relatedGuides.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-mute mb-4">Related Guides</h3>
                <ul className="space-y-3">
                  {metadata.relatedGuides.map(slug => (
                    <li key={slug}>
                      <Link href={`/guides/${metadata.category}/${slug}`} className="text-sm text-cyan hover:underline">
                        {slug.replace(/-/g, ' ')}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {metadata.relatedTools && metadata.relatedTools.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-mute mb-4">Related Tools</h3>
                <ul className="space-y-3">
                  {metadata.relatedTools.map(slug => (
                    <li key={slug}>
                      <Link href={`/tools/${slug}`} className="text-sm text-cyan hover:underline">
                        {slug.replace(/-/g, ' ')}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {metadata.relatedLabs && metadata.relatedLabs.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-mute mb-4">Related Labs</h3>
                <ul className="space-y-3">
                  {metadata.relatedLabs.map(slug => (
                    <li key={slug}>
                      <Link href={`/labs/${slug}`} className="text-sm text-cyan hover:underline">
                        {slug.replace(/-/g, ' ')}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-surface/50 p-6 rounded-xl border border-line">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-mute mb-2">Need Help?</h3>
              <p className="text-sm text-mute mb-4">Are you securing a production system?</p>
              <Link href="/contact" className="text-sm text-cyan hover:underline font-medium">
                Talk to our experts &rarr;
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
