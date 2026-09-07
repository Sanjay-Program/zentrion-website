'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface MacVendorResult {
  result?: {
    company: string;
    mac_prefix: string;
    address: string;
    start_hex?: string;
    end_hex?: string;
    country?: string;
    type?: string;
  };
  error?: string;
}

export default function MacVendorPage() {
  const [mac, setMac] = useState('');
  const [result, setResult] = useState<MacVendorResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mac.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/network/mac-vendor?mac=${encodeURIComponent(mac.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Lookup failed.');
      }

      if (data.error) {
        throw new Error(data.error);
      }
      
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">MAC Vendor Lookup</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Identify the hardware manufacturer of any device from its MAC address.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[rgb(var(--c-mute))] font-mono">
                MAC:
              </div>
              <input
                type="text"
                value={mac}
                onChange={(e) => setMac(e.target.value)}
                placeholder="e.g. 00:1A:2B:3C:4D:5E or 00-1A-2B-3C-4D-5E"
                className="w-full pl-14 pr-4 py-4 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono uppercase"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !mac}
              className="btn-primary py-4 px-8 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
            >
              {loading ? 'Searching...' : 'Lookup Vendor'}
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

        {result && !error && result.result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-2xl overflow-hidden">
              <div className="border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] px-6 py-5">
                <h2 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-semibold">Organization Unit Identifier (OUI) Match</h2>
                <div className="mt-2 flex items-center gap-4">
                  <div className="text-3xl font-display font-bold text-[rgb(var(--c-ink))]">
                    {result.result.company || 'Unknown Vendor'}
                  </div>
                  {result.result.company && (
                    <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      Verified OUI
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-[rgb(var(--c-mute))] text-sm font-medium mb-1">MAC Prefix Range</h3>
                    <p className="font-mono text-lg text-[rgb(var(--c-ink))]">{result.result.mac_prefix}</p>
                  </div>
                  <div>
                    <h3 className="text-[rgb(var(--c-mute))] text-sm font-medium mb-1">Block Type</h3>
                    <p className="text-[rgb(var(--c-ink))] capitalize">{result.result.type || 'MA-L (MAC Address Block Large)'}</p>
                  </div>
                  {result.result.start_hex && result.result.end_hex && (
                    <div>
                      <h3 className="text-[rgb(var(--c-mute))] text-sm font-medium mb-1">Hex Allocation Range</h3>
                      <p className="font-mono text-sm text-[rgb(var(--c-accent))]">
                        {result.result.start_hex} — {result.result.end_hex}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-[rgb(var(--c-mute))] text-sm font-medium mb-2">Registered Address</h3>
                    <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-lg p-4">
                      <p className="text-[rgb(var(--c-mute))] whitespace-pre-wrap leading-relaxed">
                        {result.result.address || 'Address not registered.'}
                      </p>
                      {result.result.country && (
                        <div className="mt-3 inline-flex items-center gap-2 text-sm text-[rgb(var(--c-ink))] font-medium bg-[rgba(255,255,255,0.05)] px-3 py-1.5 rounded">
                          <svg className="w-4 h-4 text-[rgb(var(--c-accent))]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {result.result.country}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
