import Link from 'next/link';
import React from 'react';

interface Tool { name: string; url: string; }
interface GuideLink { title: string; url: string; }

interface GuideLayoutProps {
  title: string;
  description: string;
  timeToRead: string;
  lastUpdated: string;
  tags: string[];
  tools?: Tool[];
  relatedGuides?: GuideLink[];
  headings?: { id: string; label: string }[];
  children: React.ReactNode;
}

export default function GuideLayout({
  title, description, timeToRead, lastUpdated, tags,
  tools = [], relatedGuides = [], headings = [], children,
}: GuideLayoutProps) {
  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))]">
      {/* Hero */}
      <div className="relative overflow-hidden pt-32 pb-12 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[rgb(var(--c-mute))] mb-6">
            <Link href="/" className="hover:text-[rgb(var(--c-ink))] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-[rgb(var(--c-ink))] transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-[rgb(var(--c-ink))] truncate">{title}</span>
          </nav>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full text-xs font-bold bg-[rgba(47,107,255,0.15)] text-[rgb(var(--c-accent))] border border-[rgba(47,107,255,0.25)]">{t}</span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 max-w-4xl leading-tight">{title}</h1>
          <p className="text-lg text-[rgb(var(--c-mute))] max-w-3xl mb-6">{description}</p>
          <div className="flex items-center gap-5 text-sm text-[rgb(var(--c-mute))]">
            <span>⏱ {timeToRead}</span>
            <span>📅 Updated {lastUpdated}</span>
            <span>✍️ Zentrion Security Team</span>
          </div>
        </div>
      </div>

      {/* Main content + sidebar */}
      <div className="max-w-6xl mx-auto px-4 pb-24">
        <div className="flex gap-10 items-start">
          {/* Article */}
          <article className="flex-1 min-w-0 guide-content">
            {children}
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-28">
            {headings.length > 0 && (
              <div className="mb-6 p-5 rounded-2xl bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)]">
                <div className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--c-mute))] mb-3">On This Page</div>
                <ul className="space-y-1.5">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-sm text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-ink))] transition-colors block py-0.5">
                        {h.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tools.length > 0 && (
              <div className="mb-6 p-5 rounded-2xl bg-[rgba(47,107,255,0.08)] border border-[rgba(47,107,255,0.2)]">
                <div className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--c-accent))] mb-3">🛠 Try Our Tools</div>
                <ul className="space-y-2">
                  {tools.map((t) => (
                    <li key={t.url}>
                      <Link href={t.url} className="text-sm text-[rgb(var(--c-ink))] hover:text-[rgb(var(--c-accent))] transition-colors flex items-center gap-2">
                        <span className="text-[rgb(var(--c-accent))]">→</span> {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {relatedGuides.length > 0 && (
              <div className="p-5 rounded-2xl bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)]">
                <div className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--c-mute))] mb-3">Related Guides</div>
                <ul className="space-y-2">
                  {relatedGuides.map((g) => (
                    <li key={g.url}>
                      <Link href={g.url} className="text-sm text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-ink))] transition-colors leading-snug block">
                        {g.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {/* Mobile related guides */}
        {relatedGuides.length > 0 && (
          <div className="lg:hidden mt-12 p-5 rounded-2xl bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)]">
            <div className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--c-mute))] mb-4">Continue Learning</div>
            <div className="grid sm:grid-cols-2 gap-3">
              {relatedGuides.map((g) => (
                <Link key={g.url} href={g.url} className="text-sm p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--c-glass-border)] hover:border-[rgba(47,107,255,0.4)] transition-colors">
                  {g.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .guide-content h2 { font-size: 1.5rem; font-weight: 800; margin: 2.5rem 0 1rem; padding-top: 0.5rem; }
        .guide-content h3 { font-size: 1.125rem; font-weight: 700; margin: 1.75rem 0 0.75rem; }
        .guide-content p { color: rgb(var(--c-mute)); line-height: 1.8; margin-bottom: 1rem; }
        .guide-content ul, .guide-content ol { color: rgb(var(--c-mute)); line-height: 1.8; margin-bottom: 1rem; padding-left: 1.5rem; }
        .guide-content li { margin-bottom: 0.35rem; }
        .guide-content a { color: rgb(var(--c-accent)); text-decoration: underline; text-underline-offset: 3px; }
        .guide-content pre { background: #0d1117; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1.25rem; overflow-x: auto; margin: 1.25rem 0; }
        .guide-content code { font-family: 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace; font-size: 0.875rem; color: #e6edf3; }
        .guide-content :not(pre) > code { background: rgba(255,255,255,0.08); padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.85em; color: rgb(var(--c-ink)); }
        .guide-content table { width: 100%; border-collapse: collapse; margin: 1.25rem 0; }
        .guide-content th { background: rgba(255,255,255,0.05); padding: 0.6rem 0.9rem; text-align: left; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: rgb(var(--c-mute)); border-bottom: 1px solid rgba(255,255,255,0.08); }
        .guide-content td { padding: 0.6rem 0.9rem; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.875rem; color: rgb(var(--c-mute)); }
        .guide-content td:first-child { font-family: monospace; color: rgb(var(--c-ink)); }
        .guide-content .callout-tool { border-left: 3px solid rgb(var(--c-accent)); background: rgba(47,107,255,0.08); padding: 1rem 1.25rem; border-radius: 0 8px 8px 0; margin: 1.25rem 0; }
        .guide-content .callout-warn { border-left: 3px solid #f59e0b; background: rgba(245,158,11,0.08); padding: 1rem 1.25rem; border-radius: 0 8px 8px 0; margin: 1.25rem 0; }
        .guide-content .callout-info { border-left: 3px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.04); padding: 1rem 1.25rem; border-radius: 0 8px 8px 0; margin: 1.25rem 0; }
        .guide-content hr { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 2rem 0; }
        .guide-content .cmd-comment { color: #6a737d; }
        .guide-content .cmd-flag { color: #79c0ff; }
      `}</style>
    </div>
  );
}
