import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllCheatsheets, getCheatsheetBySlug } from '@/lib/content-parser';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize from 'rehype-sanitize';
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

        <div className="prose prose-invert prose-cyan max-w-5xl mx-auto prose-pre:bg-surface/50 prose-pre:border prose-pre:border-glass-border">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </article>
    </>
  );
}
