import { getResearchData, getSortedResearchData } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { Eyebrow, Reveal } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export async function generateStaticParams() {
  const posts = getSortedResearchData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function ResearchArticlePage({ params }: { params: { slug: string } }) {
  const article = await getResearchData(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs 
        items={[
          { href: '/resources', label: 'Resources' },
          { href: '/resources/research', label: 'Deep Research' },
          { href: `/resources/research/${article.slug}`, label: article.title }
        ]} 
      />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <Eyebrow>{article.category}</Eyebrow>
          <h1 className="mt-4 font-display text-3xl md:text-5xl font-semibold max-w-4xl leading-tight">
            {article.title}
          </h1>
          
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-mute border-y border-line py-4">
            <div className="flex items-center gap-2">
              <span className="font-medium text-ink">{article.author}</span>
            </div>
            <span className="hidden sm:inline">&middot;</span>
            <time>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            <span className="hidden sm:inline">&middot;</span>
            <span>{article.readTime}</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {/* Prose styles for markdown content */}
          <article 
            className="mt-12 max-w-3xl prose prose-slate prose-invert:prose-invert prose-headings:font-display prose-headings:font-semibold prose-a:text-cyan prose-p:leading-relaxed prose-p:text-mute prose-li:text-mute"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 pt-8 border-t border-line max-w-3xl flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span key={tag} className="text-xs font-mono bg-surface border border-line px-3 py-1 rounded-full text-mute">
                #{tag}
              </span>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
