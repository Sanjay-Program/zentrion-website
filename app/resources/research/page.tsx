import { getSortedResearchData } from '@/lib/mdx';
import Link from 'next/link';
import { Eyebrow, Reveal, GlassCard } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function DeepResearchIndex() {
  const allResearch = getSortedResearchData();

  return (
    <>
      <Breadcrumbs 
        items={[
          { href: '/resources', label: 'Resources' },
          { href: '/resources/research', label: 'Deep Research' },
        ]} 
      />
      
      <section className="container-x pt-10 pb-16">
        <Reveal>
          <Eyebrow>Research Hub</Eyebrow>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-semibold max-w-3xl leading-tight">
            Cybersecurity Deep Research
          </h1>
          <p className="mt-6 max-w-2xl text-mute leading-relaxed text-lg mb-12">
            Independent research briefs from the Zentrion Technologies security team on the expanding attack surface, AI-driven attacks, and the future of identity-centric continuous defense.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8">
          {allResearch.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.1}>
              <Link href={`/resources/research/${article.slug}`} className="block">
                <GlassCard hover className="p-8">
                  <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-mono uppercase tracking-wider text-cyan bg-cyan/10 px-2 py-1 rounded">
                          {article.category}
                        </span>
                        <span className="text-mute text-sm">&middot;</span>
                        <span className="text-mute text-sm">{article.readTime}</span>
                      </div>
                      <h3 className="text-2xl font-bold font-display mb-3 group-hover:text-cyan transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-mute leading-relaxed mb-4">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-mute">
                        <span className="font-medium text-ink">{article.author}</span>
                        <span className="hidden sm:inline">&middot;</span>
                        <time>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                      </div>
                    </div>
                    
                    <div className="hidden md:flex items-center text-cyan opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                      <span className="mr-2 font-semibold text-sm">Read Report</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
          
          {allResearch.length === 0 && (
            <div className="text-center py-20 border border-line rounded-2xl bg-surface/30">
              <p className="text-mute text-lg mb-2">No research publications found.</p>
              <p className="text-mute text-sm">Check back later for new deep research articles.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
