'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('CRITICAL GLOBAL EXCEPTION:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden px-4">
          <div className="relative z-10 max-w-2xl w-full text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-bold uppercase tracking-wider mb-8 mx-auto text-red-500">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Critical System Failure
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black font-sans tracking-tighter mb-4">
              Fatal Exception
            </h1>
            
            <p className="text-lg text-gray-400 max-w-md mx-auto mb-10 leading-relaxed">
              A fatal error has brought down the application rendering tree. Please reset.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => reset()}
                className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto"
              >
                Reset Application
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
