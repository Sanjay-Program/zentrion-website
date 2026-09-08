import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[rgb(var(--c-accent))] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.05)] border border-[var(--c-glass-border)] text-sm font-bold uppercase tracking-wider mb-8 mx-auto">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          Error 404
        </div>

        {/* Glitch-like Title */}
        <h1 className="text-8xl md:text-9xl font-black font-display text-[rgb(var(--c-ink))] tracking-tighter mb-4 opacity-90">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold font-display text-[rgb(var(--c-accent))] tracking-tight mb-6">
          Signal Lost
        </h2>

        {/* Description */}
        <p className="text-lg text-[rgb(var(--c-mute))] max-w-md mx-auto mb-10 leading-relaxed">
          The transmission you are looking for has been moved, removed, or never existed in our database. Let’s get you back on the secure network.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-4 bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))] font-bold rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto"
          >
            Return to Dashboard
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 bg-[rgba(255,255,255,0.02)] border border-[var(--c-glass-border)] text-[rgb(var(--c-ink))] font-bold rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition-colors w-full sm:w-auto"
          >
            Report Issue
          </Link>
        </div>
      </div>
    </div>
  );
}
