'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function MacLookupPage() {
  const [mac, setMac] = useState('');
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mac.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/network/mac?mac=${encodeURIComponent(mac)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch OUI data.');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const isMulticast = () => {
    const cleanMac = mac.replace(/[^a-fA-F0-9]/g, '');
    if (cleanMac.length < 2) return false;
    const firstOctet = parseInt(cleanMac.substring(0, 2), 16);
    return (firstOctet & 0x01) === 0x01;
  };

  const isLocallyAdministered = () => {
    const cleanMac = mac.replace(/[^a-fA-F0-9]/g, '');
    if (cleanMac.length < 2) return false;
    const firstOctet = parseInt(cleanMac.substring(0, 2), 16);
    return (firstOctet & 0x02) === 0x02;
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
            Hardware Fingerprinting
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">MAC Address Lookup</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Identify the hardware vendor and manufacturer of any device based on its MAC address (OUI).</p>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[rgb(var(--c-mute))]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              </div>
              <input
                type="text"
                value={mac}
                onChange={(e) => setMac(e.target.value)}
                placeholder="e.g. 00:1A:2B:3C:4D:5E"
                className="w-full pl-12 pr-4 py-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !mac}
              className="btn-primary py-4 px-8 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Searching...
                </span>
              ) : 'Lookup MAC'}
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
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl overflow-hidden flex items-stretch">
              <div className="bg-green-500/20 flex items-center justify-center p-6 shrink-0 border-r border-green-500/20">
                <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
              </div>
              <div className="p-6">
                <div className="text-green-400 text-sm font-semibold uppercase tracking-wider mb-1">Hardware Vendor Found</div>
                <h2 className="text-3xl font-display font-bold text-white">{result.company}</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden">
                <div className="border-b border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-6 py-4">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    Company Details
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Company Name</div>
                    <div className="text-white">{result.company}</div>
                  </div>
                  <div>
                    <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Mac Prefix (OUI)</div>
                    <div className="font-mono text-[rgb(var(--c-accent))]">{result.macPrefix}</div>
                  </div>
                  <div>
                    <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Registered Address</div>
                    <div className="text-white text-sm leading-relaxed">{result.address || 'Address not registered in IEEE database.'}</div>
                  </div>
                  <div>
                    <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Country</div>
                    <div className="text-white text-sm">{result.country || 'Unknown'}</div>
                  </div>
                </div>
              </div>

              <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden">
                <div className="border-b border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-6 py-4">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    Network Transmission Analysis
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-2">Transmission Type (Bit 0)</div>
                    {isMulticast() ? (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold">
                        Multicast (Broadcast)
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold">
                        Unicast (Single Device)
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-2">Administration Type (Bit 1)</div>
                    {isLocallyAdministered() ? (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        Locally Administered (LAA) - Likely Spoofed / Virtual
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Universally Administered (UAA) - Factory Burned
                      </div>
                    )}
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
