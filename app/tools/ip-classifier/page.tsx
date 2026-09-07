import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'IP Classifier | Zentrion Cyber Tools',
  description: 'Validate and classify IPv4 and IPv6 addresses.',
};

export default function IpClassifierPage() {
  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">IP Classifier</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Validate and classify IPv4 and IPv6 addresses.</p>
          <div className="mt-4">
            <span className="inline-block px-3 py-1 bg-[rgba(255,255,255,0.05)] text-xs font-mono tracking-wider rounded-md border border-[rgba(255,255,255,0.1)]">
              LOCAL ONLY
            </span>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 md:p-8">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(255,255,255,0.05)] mb-4">
              <span className="text-2xl">🚧</span>
            </div>
            <h2 className="text-2xl font-bold font-display mb-2">Tool Under Construction</h2>
            <p className="text-[rgb(var(--c-mute))] max-w-md mx-auto">
              This tool is currently being ported to our new Next.js architecture or awaits API integration. Check back soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
