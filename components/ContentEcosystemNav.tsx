import Link from 'next/link';
import { ArrowIcon } from '@/components/ui';

interface NavItem {
  label: string;
  href: string;
}

export interface ContentEcosystemNavProps {
  relatedGuides?: NavItem[];
  relatedTools?: NavItem[];
  relatedLabs?: NavItem[];
  cheatsheet?: NavItem;
  roadmap?: NavItem;
  service?: NavItem;
}

export default function ContentEcosystemNav({
  relatedGuides,
  relatedTools,
  relatedLabs,
  cheatsheet,
  roadmap,
  service,
}: ContentEcosystemNavProps) {
  return (
    <div className="mt-16 pt-10 border-t border-line">
      <h3 className="font-display text-2xl font-semibold mb-8 text-center">Continue Learning</h3>
      
      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {/* LEARN */}
        {relatedGuides && relatedGuides.length > 0 && (
          <div className="glass-card p-6 rounded-xl border border-glass-border">
            <h4 className="text-xs font-bold uppercase tracking-widest text-cyan mb-4">Learn</h4>
            <ul className="space-y-3">
              {relatedGuides.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="text-sm hover:text-cyan transition-colors flex items-center gap-2 group">
                    <span className="text-cyan opacity-50 group-hover:opacity-100">→</span> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* USE */}
        {relatedTools && relatedTools.length > 0 && (
          <div className="glass-card p-6 rounded-xl border border-glass-border">
            <h4 className="text-xs font-bold uppercase tracking-widest text-violet mb-4">Use</h4>
            <ul className="space-y-3">
              {relatedTools.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="text-sm hover:text-violet transition-colors flex items-center gap-2 group">
                    <span className="text-violet opacity-50 group-hover:opacity-100">→</span> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* PRACTICE */}
        {relatedLabs && relatedLabs.length > 0 && (
          <div className="glass-card p-6 rounded-xl border border-glass-border">
            <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">Practice</h4>
            <ul className="space-y-3">
              {relatedLabs.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="text-sm hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    <span className="text-emerald-400 opacity-50 group-hover:opacity-100">→</span> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* MASTER */}
        {(cheatsheet || roadmap) && (
          <div className="glass-card p-6 rounded-xl border border-glass-border">
            <h4 className="text-xs font-bold uppercase tracking-widest text-yellow-500 mb-4">Master</h4>
            <ul className="space-y-3">
              {cheatsheet && (
                <li>
                  <Link href={cheatsheet.href} className="text-sm hover:text-yellow-500 transition-colors flex items-center gap-2 group">
                    <span className="text-yellow-500 opacity-50 group-hover:opacity-100">→</span> {cheatsheet.label} (Cheatsheet)
                  </Link>
                </li>
              )}
              {roadmap && (
                <li>
                  <Link href={roadmap.href} className="text-sm hover:text-yellow-500 transition-colors flex items-center gap-2 group">
                    <span className="text-yellow-500 opacity-50 group-hover:opacity-100">→</span> {roadmap.label} (Roadmap)
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* SECURE & BUILD */}
      {service && (
        <div className="mt-6 max-w-4xl mx-auto">
          <Link href={service.href} className="block group">
            <div className="glass-card p-6 rounded-xl border border-glass-border hover:border-signal/50 transition-colors flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-signal mb-2">Build / Secure</h4>
                <p className="font-display text-lg font-medium group-hover:text-signal transition-colors">{service.label}</p>
              </div>
              <div className="shrink-0 flex items-center gap-2 text-sm font-medium text-signal bg-signal/10 px-4 py-2 rounded-full group-hover:bg-signal/20 transition-colors">
                View Service <ArrowIcon />
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
