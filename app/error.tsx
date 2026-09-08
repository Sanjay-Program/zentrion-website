'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500 opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.05)] border border-[var(--c-glass-border)] text-sm font-bold uppercase tracking-wider mb-8 mx-auto text-red-500">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          System Failure
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-black font-display tracking-tighter mb-4">
          Runtime Exception
        </h1>
        
        {/* Description */}
        <p className="text-lg text-[rgb(var(--c-mute))] max-w-md mx-auto mb-10 leading-relaxed">
          An unexpected error interrupted the process. Our systems have logged the anomaly. Please attempt to reboot the module.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-8 py-4 bg-[rgb(var(--c-ink))] text-[rgb(var(--c-void))] font-bold rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Reboot Module
          </button>
          <Link
            href="/"
            className="px-8 py-4 bg-[rgba(255,255,255,0.02)] border border-[var(--c-glass-border)] text-[rgb(var(--c-ink))] font-bold rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition-colors w-full sm:w-auto"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
