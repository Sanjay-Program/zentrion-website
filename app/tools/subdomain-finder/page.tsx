'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface SubdomainResult {
  domain: string;
  count: number;
  subdomains: string[];
}

export default function SubdomainFinderPage() {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState<SubdomainResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;

    let cleanDomain = domain.trim().toLowerCase();
    cleanDomain = cleanDomain.replace(/^https?:\/\//, '').split('/')[0];
    setDomain(cleanDomain);

    setLoading(true);
    setError('');
    setResult(null);
    setSearch('');

    try {
      const res = await fetch(`/api/network/subdomains?domain=${encodeURIComponent(cleanDomain)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch subdomains.');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const filteredSubdomains = result?.subdomains.filter(sub => 
    sub.includes(search.toLowerCase())
  ) || [];

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.subdomains.join('\n'));
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            Passive Reconnaissance
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Subdomain Finder</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Discover hidden subdomains by querying public Certificate Transparency (CT) logs.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[rgb(var(--c-mute))]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              </div>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g. netflix.com"
                className="w-full pl-12 pr-4 py-4 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !domain}
              className="btn-primary py-4 px-8 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Scanning...
                </span>
              ) : 'Scan Domain'}
            </button>
          </form>
          <div className="mt-4 flex items-start gap-2 text-sm text-[rgb(var(--c-mute))]">
            <svg className="w-5 h-5 text-[rgb(var(--c-mute))] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p>This tool passively aggregates historical SSL/TLS certificates issued for the target domain via crt.sh. It does not actively probe the target servers.</p>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <div>
              <h3 className="text-red-400 font-semibold">Scan Failed</h3>
              <p className="text-red-400/80 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-2xl overflow-hidden shadow-xl">
            <div className="border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <h2 className="text-[rgb(var(--c-ink))] font-bold text-lg">
                  Reconnaissance Results
                </h2>
                <span className="px-3 py-1 bg-[rgba(255,255,255,0.1)] rounded-full text-sm font-mono text-[rgb(var(--c-accent))]">
                  {result.count} subdomains
                </span>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter results..."
                  className="w-full sm:w-48 px-3 py-1.5 bg-[rgba(0,0,0,0.2)] border border-[var(--c-glass-border)] rounded-lg text-sm text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] transition-all"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] rounded-lg text-sm text-[rgb(var(--c-ink))] transition-colors flex items-center gap-2 shrink-0"
                  title="Copy All to Clipboard"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  Copy
                </button>
              </div>
            </div>
            
            <div className="p-0">
              {result.subdomains.length > 0 ? (
                <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-[#0d1117] shadow-sm z-10 border-b border-[var(--c-glass-border)]">
                      <tr>
                        <th className="py-3 px-6 text-[rgb(var(--c-mute))] font-semibold text-sm">#</th>
                        <th className="py-3 px-6 text-[rgb(var(--c-mute))] font-semibold text-sm">Subdomain</th>
                        <th className="py-3 px-6 text-[rgb(var(--c-mute))] font-semibold text-sm text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgba(255,255,255,0.02)]">
                      {filteredSubdomains.map((sub, i) => (
                        <tr key={i} className="hover:bg-[rgba(255,255,255,0.01)] transition-colors group">
                          <td className="py-3 px-6 text-[rgb(var(--c-mute))] text-sm w-16">{i + 1}</td>
                          <td className="py-3 px-6">
                            <span className="font-mono text-[rgba(255,255,255,0.9)] text-sm break-all">{sub}</span>
                          </td>
                          <td className="py-3 px-6 text-right">
                            <a 
                              href={`http://${sub}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center w-8 h-8 rounded bg-[rgba(255,255,255,0.05)] hover:bg-[rgb(var(--c-accent))] hover:text-black text-[rgb(var(--c-mute))] transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                              title="Open in new tab"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredSubdomains.length === 0 && (
                    <div className="p-8 text-center text-[rgb(var(--c-mute))]">
                      No subdomains match your filter.
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(255,255,255,0.05)] text-[rgb(var(--c-mute))] mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-[rgb(var(--c-ink))] mb-2">No Subdomains Discovered</h3>
                  <p className="text-[rgb(var(--c-mute))] max-w-md mx-auto">
                    We couldn't find any historical SSL certificates for <strong>{result.domain}</strong> in the public Certificate Transparency logs.
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
