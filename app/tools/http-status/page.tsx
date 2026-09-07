'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface HttpStatusResult {
  url: string;
  status: number;
  statusText: string;
  redirected: boolean;
  responseTimeMs: number;
}

export default function HttpStatusPage() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<HttpStatusResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Re-using the http-headers proxy from Phase 3 since it returns status codes too
      const res = await fetch(`/api/network/http-headers?url=${encodeURIComponent(url.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to check HTTP status.');
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

  const getStatusDescription = (status: number) => {
    if (status >= 200 && status < 300) return 'Success. The request was successfully received, understood, and accepted.';
    if (status >= 300 && status < 400) return 'Redirection. The client must take additional action to complete the request.';
    if (status >= 400 && status < 500) return 'Client Error. The request contains bad syntax or cannot be fulfilled.';
    if (status >= 500) return 'Server Error. The server failed to fulfill a valid request.';
    return 'Unknown Status Code.';
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">HTTP Status Checker</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Quickly verify the HTTP response status code and redirection behavior of any URL.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[rgb(var(--c-mute))]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full pl-12 pr-4 py-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
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
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Checking...
                </span>
              ) : 'Check Status'}
            </button>
          </form>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <div>
              <h3 className="text-red-400 font-semibold">Check Failed</h3>
              <p className="text-red-400/80 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                <h3 className="text-[rgb(var(--c-mute))] text-sm font-semibold uppercase tracking-widest mb-4">Response Status</h3>
                <div className={`text-6xl font-bold font-mono ${getStatusColor(result.status).split(' ')[0]}`}>
                  {result.status}
                </div>
                <div className={`mt-4 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase border ${getStatusColor(result.status)}`}>
                  {result.statusText || 'Unknown'}
                </div>
                <p className="mt-6 text-[rgb(var(--c-mute))] max-w-sm">
                  {getStatusDescription(result.status)}
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6">
                  <h3 className="text-[rgb(var(--c-mute))] text-sm font-semibold uppercase tracking-widest mb-4">Resolution Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-[rgb(var(--c-mute))] text-xs mb-1">Target URL</div>
                      <div className="font-mono text-sm text-white break-all bg-[rgba(255,255,255,0.02)] p-2 rounded border border-[rgba(255,255,255,0.05)]">
                        {result.url}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.05)]">
                      <span className="text-[rgb(var(--c-mute))]">Response Time</span>
                      <span className="font-mono text-white flex items-center gap-2">
                        <svg className="w-4 h-4 text-[rgb(var(--c-accent))]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {result.responseTimeMs}ms
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.05)]">
                      <span className="text-[rgb(var(--c-mute))]">Redirected</span>
                      <span className={`font-mono ${result.redirected ? 'text-blue-400' : 'text-white'}`}>
                        {result.redirected ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>

                <Link href={`/tools/http-headers?url=${encodeURIComponent(url)}`} className="block w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] hover:border-[rgb(var(--c-accent))] hover:bg-[rgba(var(--c-accent-rgb),0.05)] transition-all rounded-2xl p-6 group cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold flex items-center gap-2">
                        <svg className="w-5 h-5 text-[rgb(var(--c-accent))]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                        Inspect HTTP Headers
                      </h3>
                      <p className="text-[rgb(var(--c-mute))] text-sm mt-1">Dive deeper into the response headers for this URL.</p>
                    </div>
                    <svg className="w-5 h-5 text-[rgb(var(--c-mute))] group-hover:text-[rgb(var(--c-accent))] transform group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
