import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllCheatsheets, getCheatsheetBySlug } from '@/lib/content-parser';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import Breadcrumbs from '@/components/Breadcrumbs';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const cheatsheets = getAllCheatsheets();
  return cheatsheets.map((sheet) => ({
    slug: sheet.metadata.slug,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const sheet = getCheatsheetBySlug(params.slug);
  if (!sheet) return {};

  return {
    title: `${sheet.metadata.title} | Cheatsheet`,
    description: sheet.metadata.description,
  };
}

export default async function CheatsheetDynamicPage(props: Props) {
  const params = await props.params;
  const sheet = getCheatsheetBySlug(params.slug);

  if (!sheet) {
    notFound();
  }

  const { metadata, content } = sheet;

  return (
    <>
      <Breadcrumbs />
      <article className="container-x py-10 md:py-16">
        <header className="mb-14 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4">
            {metadata.title}
          </h1>
          <p className="text-xl text-[rgb(var(--c-mute))] max-w-2xl mx-auto">
            {metadata.description}
          </p>
        </header>
      <div className="mt-8">
        <div className="prose max-w-5xl mx-auto prose-headings:text-ink prose-p:text-mute prose-a:text-accent prose-strong:text-ink prose-code:text-ink prose-code:bg-surface/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-surface/50 prose-pre:border prose-pre:border-glass-border prose-pre:text-mute prose-td:text-mute prose-th:text-ink prose-li:text-mute text-ink">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeRaw, 
              [rehypeSanitize, defaultSchema], 
              rehypeHighlight
            ]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
      </article>
    </>
  );
}
