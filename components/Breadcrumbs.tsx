import Link from 'next/link';

export type Crumb = { href: string; label: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const full = [{ href: '/', label: 'Home' }, ...items];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: full.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: `https://zentriontechnologies.com${c.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="container-x pt-28 text-xs text-mute">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5">
        {full.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1.5">
            {i > 0 && <span className="opacity-50">/</span>}
            {i === full.length - 1 ? (
              <span className="text-ink/70">{c.label}</span>
            ) : (
              <Link href={c.href} className="hover:text-ink transition-colors">
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
