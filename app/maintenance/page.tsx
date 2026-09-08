import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Service Unavailable | Zentrion Technologies',
  description: 'Zentrion Technologies is currently undergoing scheduled maintenance.',
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500 opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.05)] border border-[var(--c-glass-border)] text-sm font-bold uppercase tracking-wider mb-8 mx-auto text-yellow-500">
          <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
          System Maintenance
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-black font-display tracking-tighter mb-4">
          Service Not Available
        </h1>
        
        {/* Description */}
        <p className="text-lg text-[rgb(var(--c-mute))] max-w-md mx-auto mb-10 leading-relaxed">
          Zentrion Technologies is currently undergoing scheduled infrastructure upgrades to improve security and performance. We will be back online shortly.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="mailto:consultancy@zentriontechnologies.com"
            className="px-8 py-4 bg-[rgb(var(--c-ink))] text-[rgb(var(--c-void))] font-bold rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto"
          >
            Contact Support
          </Link>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[rgba(255,255,255,0.02)] border border-[var(--c-glass-border)] text-[rgb(var(--c-ink))] font-bold rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition-colors w-full sm:w-auto"
          >
            Check Status Updates
          </a>
        </div>
      </div>
    </div>
  );
}
