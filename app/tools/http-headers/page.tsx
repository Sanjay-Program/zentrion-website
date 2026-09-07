'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface HeaderResult {
  url: string;
  status: number;
  statusText: string;
  redirected: boolean;
  responseTimeMs: number;
  headers: Record<string, string>;
}

export default function HttpHeadersPage() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<HeaderResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInspect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/network/http-headers?url=${encodeURIComponent(url.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to inspect headers.');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-400 bg-green-400/10 border-green-400/20';
    if (status >= 300 && status < 400) return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    if (status >= 400 && status < 500) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-red-400 bg-red-400/10 border-red-400/20';
  };

  const getHeaderCategory = (headerName: string) => {
    const securityHeaders = ['strict-transport-security', 'content-security-policy', 'x-frame-options', 'x-content-type-options', 'referrer-policy', 'permissions-policy'];
    const cacheHeaders = ['cache-control', 'expires', 'pragma', 'etag', 'last-modified'];
    
    const lower = headerName.toLowerCase();
    if (securityHeaders.includes(lower)) return 'security';
    if (cacheHeaders.includes(lower)) return 'cache';
    return 'standard';
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">HTTP Headers Inspector</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Analyze HTTP response headers to debug CORS, security, and caching policies.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <form onSubmit={handleInspect} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[rgb(var(--c-mute))]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="example.com or https://api.example.com"
                className="w-full pl-12 pr-4 py-4 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !url}
              className="btn-primary py-4 px-8 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Inspecting...
                </span>
              ) : 'Inspect Headers'}
            </button>
          </form>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <div>
              <h3 className="text-red-400 font-semibold">Inspection Failed</h3>
              <p className="text-red-400/80 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Status Bar */}
            <div className="flex flex-wrap items-center gap-4 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl p-4">
              <div className={`px-4 py-2 rounded-lg border font-mono font-bold text-lg flex items-center gap-2 ${getStatusColor(result.status)}`}>
                <div className="w-2 h-2 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
                {result.status} {result.statusText}
              </div>
              <div className="px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] text-[rgb(var(--c-mute))] text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {result.responseTimeMs}ms
              </div>
              {result.redirected && (
                <div className="px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] text-blue-400 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  Followed Redirects
                </div>
              )}
              <div className="ml-auto text-sm text-[rgb(var(--c-mute))] font-mono truncate max-w-full">
                {result.url}
              </div>
            </div>

            {/* Headers Table */}
            <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--c-glass-bg)] border-b border-[var(--c-glass-border)]">
                    <th className="py-4 px-6 text-[rgb(var(--c-mute))] font-semibold text-sm w-1/3">Header Name</th>
                    <th className="py-4 px-6 text-[rgb(var(--c-mute))] font-semibold text-sm">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--c-glass-border)]">
                  {Object.entries(result.headers)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([key, value]) => {
                      const category = getHeaderCategory(key);
                      return (
                        <tr key={key} className="hover:bg-[var(--c-glass-bg)] transition-colors">
                          <td className="py-4 px-6 align-top">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[rgb(var(--c-accent))] break-all">{key}</span>
                              {category === 'security' && (
                                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-green-500/20 text-green-400 border border-green-500/30">Security</span>
                              )}
                              {category === 'cache' && (
                                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30">Cache</span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6 font-mono text-sm break-all leading-relaxed text-[rgb(var(--c-mute))]">
                            {value}
                          </td>
                        </tr>
                      );
                  })}
                </tbody>
              </table>
              {Object.keys(result.headers).length === 0 && (
                <div className="p-8 text-center text-[rgb(var(--c-mute))]">
                  No headers returned.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
