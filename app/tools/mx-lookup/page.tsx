'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface MxRecord {
  priority: number;
  target: string;
}

interface MxResult {
  domain: string;
  records: MxRecord[];
  responseTime: number;
}

export default function MxLookupPage() {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState<MxResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;

    let cleanDomain = domain.trim().toLowerCase();
    cleanDomain = cleanDomain.replace(/^https?:\/\//, '').split('/')[0];
    setDomain(cleanDomain);

    setLoading(true);
    setError('');
    setResult(null);
    const startTime = Date.now();

    try {
      const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(cleanDomain)}&type=MX`, {
        headers: { 'Accept': 'application/dns-json' }
      });

      if (!res.ok) {
        throw new Error('DNS query failed.');
      }

      const data = await res.json();
      
      const records: MxRecord[] = [];
      
      if (data.Answer) {
        data.Answer.forEach((a: any) => {
          // DoH MX records are returned as "10 mail.example.com."
          if (a.data) {
            const parts = a.data.split(' ');
            if (parts.length >= 2) {
              records.push({
                priority: parseInt(parts[0], 10),
                target: parts[1].replace(/\.$/, '') // remove trailing dot
              });
            }
          }
        });
      }

      // Sort by priority (lowest first)
      records.sort((a, b) => a.priority - b.priority);

      setResult({
        domain: cleanDomain,
        records,
        responseTime: Date.now() - startTime
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">MX Lookup</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Discover and verify the Mail Exchange (MX) records responsible for routing email for a domain.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[rgb(var(--c-mute))]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g. gmail.com"
                className="w-full pl-12 pr-4 py-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !domain}
              className="btn-primary py-4 px-8 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
            >
              {loading ? 'Querying...' : 'Lookup MX'}
            </button>
          </form>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <div>
              <h3 className="text-red-400 font-semibold">Lookup Failed</h3>
              <p className="text-red-400/80 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden shadow-xl">
            <div className="border-b border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-6 py-4 flex justify-between items-center">
              <h2 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                Mail Exchange Records
              </h2>
              <span className="text-xs text-[rgb(var(--c-mute))] flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {result.responseTime}ms
              </span>
            </div>
            
            <div className="p-0">
              {result.records.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="bg-[rgba(255,255,255,0.01)] border-b border-[rgba(255,255,255,0.05)]">
                        <th className="py-4 px-6 text-[rgb(var(--c-mute))] font-semibold text-sm w-32">Priority</th>
                        <th className="py-4 px-6 text-[rgb(var(--c-mute))] font-semibold text-sm">Mail Server (Target)</th>
                        <th className="py-4 px-6 text-[rgb(var(--c-mute))] font-semibold text-sm w-48 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                      {result.records.map((rec, i) => (
                        <tr key={i} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] font-mono text-lg font-bold text-[rgb(var(--c-accent))]">
                              {rec.priority}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-mono text-[rgba(255,255,255,0.9)] text-base">{rec.target}</span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            {i === 0 && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-green-500/20 border border-green-500/30 text-green-400">
                                Primary
                              </span>
                            )}
                            {i > 0 && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                Backup
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/10 text-yellow-500 mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No MX Records Found</h3>
                  <p className="text-[rgb(var(--c-mute))] max-w-md mx-auto">
                    The domain <strong>{result.domain}</strong> does not have any Mail Exchange records configured. It cannot receive emails.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
