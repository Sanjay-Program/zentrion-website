'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface PtrResult {
  ip: string;
  arpaDomain: string;
  hostnames: string[];
  responseTime: number;
}

export default function ReverseDnsPage() {
  const [ip, setIp] = useState('');
  const [result, setResult] = useState<PtrResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const reverseIp = (ipAddr: string) => {
    // Check IPv4
    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(ipAddr)) {
      return ipAddr.split('.').reverse().join('.') + '.in-addr.arpa';
    }
    // Very basic IPv6 check (expand fully before reversing in a real app, but for simplicity here:)
    if (ipAddr.includes(':')) {
      // Throw error for simplified demo; full IPv6 expansion requires complex parsing
      throw new Error('IPv6 is not fully supported in this client-side demo yet. Please use IPv4.');
    }
    throw new Error('Please enter a valid IPv4 address.');
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ip.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);
    const startTime = Date.now();

    try {
      const cleanIp = ip.trim();
      const arpaDomain = reverseIp(cleanIp);

      const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${arpaDomain}&type=PTR`, {
        headers: { 'Accept': 'application/dns-json' }
      });

      if (!res.ok) {
        throw new Error('DNS query failed.');
      }

      const data = await res.json();
      
      const hostnames = data.Answer 
        ? data.Answer.map((a: any) => a.data).filter(Boolean)
        : [];

      setResult({
        ip: cleanIp,
        arpaDomain,
        hostnames,
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
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Reverse DNS Lookup</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Perform a PTR record lookup to find the hostname associated with an IP address.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[rgb(var(--c-mute))]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </div>
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="e.g. 8.8.8.8"
                className="w-full pl-12 pr-4 py-4 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !ip}
              className="btn-primary py-4 px-8 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
            >
              {loading ? 'Looking up...' : 'Lookup PTR'}
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
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-2xl overflow-hidden">
            <div className="border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] px-6 py-4 flex justify-between items-center">
              <h2 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                PTR Record Analysis
              </h2>
              <span className="text-xs text-[rgb(var(--c-mute))] flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {result.responseTime}ms
              </span>
            </div>
            
            <div className="p-6 md:p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-[rgb(var(--c-mute))] text-sm font-medium mb-2">Original IP</h3>
                  <div className="font-mono text-lg text-white bg-[var(--c-glass-bg)] p-3 rounded-lg border border-[var(--c-glass-border)]">
                    {result.ip}
                  </div>
                </div>
                <div>
                  <h3 className="text-[rgb(var(--c-mute))] text-sm font-medium mb-2">ARPA Domain</h3>
                  <div className="font-mono text-sm text-[rgb(var(--c-accent))] bg-[rgba(var(--c-accent-rgb),0.05)] p-3 rounded-lg border border-[rgba(var(--c-accent-rgb),0.1)] break-all">
                    {result.arpaDomain}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[rgb(var(--c-ink))] font-display font-semibold text-lg mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[rgb(var(--c-accent))]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                  Resolved Hostnames
                </h3>
                
                {result.hostnames.length > 0 ? (
                  <div className="space-y-3">
                    {result.hostnames.map((host, i) => (
                      <div key={i} className="flex items-center justify-between bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl p-4 hover:border-[rgb(var(--c-accent))] transition-colors">
                        <span className="font-mono text-lg text-[rgb(var(--c-ink))] break-all">{host.replace(/\.$/, '')}</span>
                        <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-bold uppercase tracking-wide shrink-0 ml-4">
                          PTR Match
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl p-8 text-center">
                    <svg className="w-12 h-12 text-[rgb(var(--c-mute))] mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-[rgb(var(--c-mute))]">No PTR records found for this IP address.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
