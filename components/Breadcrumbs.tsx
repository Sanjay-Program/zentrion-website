'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type Crumb = { href: string; label: string };

function formatLabel(slug: string) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function Breadcrumbs({ items, className = '' }: { items?: Crumb[], className?: string }) {
  const pathname = usePathname();
  
  let dynamicItems: Crumb[] = [];
  if (!items && pathname && pathname !== '/') {
    const segments = pathname.split('/').filter(Boolean);
    let currentPath = '';
    
    dynamicItems = segments.map((segment) => {
      currentPath += `/${segment}`;
      return {
        href: currentPath,
        label: formatLabel(segment)
      };
    });
  }

  const finalItems = items || dynamicItems;
  if (finalItems.length === 0) return null;

  const full = [{ href: '/', label: 'Home' }, ...finalItems];
  
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
    <nav aria-label="Breadcrumb" className={`container-x pt-28 pb-4 text-xs text-mute ${className}`}>
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
              <span className="text-ink/70" aria-current="page">{c.label}</span>
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
