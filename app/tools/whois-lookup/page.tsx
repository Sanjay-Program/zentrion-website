'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function WhoisLookupPage() {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState<any | null>(null);
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

    try {
      const res = await fetch(`/api/network/whois?domain=${encodeURIComponent(cleanDomain)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch WHOIS/RDAP data.');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const getRegistrar = () => {
    if (!result?.entities) return 'Unknown';
    const registrarEntity = result.entities.find((e: any) => e.roles?.includes('registrar'));
    if (registrarEntity?.vcardArray?.[1]) {
      const fn = registrarEntity.vcardArray[1].find((v: any) => v[0] === 'fn');
      if (fn) return fn[3];
    }
    return 'Unknown';
  };

  const getNameServers = () => {
    if (!result?.nameservers) return [];
    return result.nameservers.map((ns: any) => ns.ldhName).filter(Boolean);
  };

  const getStatus = () => {
    if (!result?.status) return [];
    return result.status;
  };

  const getDates = () => {
    const dates: Record<string, string> = {
      registration: 'Unknown',
      expiration: 'Unknown',
      lastChanged: 'Unknown'
    };
    if (result?.events) {
      result.events.forEach((event: any) => {
        if (event.eventAction === 'registration') dates.registration = new Date(event.eventDate).toLocaleDateString();
        if (event.eventAction === 'expiration') dates.expiration = new Date(event.eventDate).toLocaleDateString();
        if (event.eventAction === 'last changed') dates.lastChanged = new Date(event.eventDate).toLocaleDateString();
      });
    }
    return dates;
  };

  const dates = result ? getDates() : null;

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            OSINT / Reconnaissance
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">WHOIS / RDAP Lookup</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Retrieve deep registration details, nameservers, and registrar data for any domain using the modern RDAP protocol.</p>
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
                placeholder="e.g. google.com"
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
                  Querying...
                </span>
              ) : 'Lookup Domain'}
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

        {result && dates && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl p-5">
                <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Handle</div>
                <div className="text-lg font-mono text-[rgb(var(--c-ink))] font-bold truncate">{result.handle || result.ldhName}</div>
              </div>
              <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl p-5">
                <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Registration Date</div>
                <div className="text-lg font-mono text-[rgb(var(--c-ink))] font-bold">{dates.registration}</div>
              </div>
              <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl p-5">
                <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Expiration Date</div>
                <div className="text-lg font-mono text-[rgb(var(--c-accent))] font-bold">{dates.expiration}</div>
              </div>
              <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl p-5">
                <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Last Updated</div>
                <div className="text-lg font-mono text-[rgb(var(--c-ink))] font-bold">{dates.lastChanged}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-2xl overflow-hidden">
                <div className="border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] px-6 py-4">
                  <h2 className="text-[rgb(var(--c-ink))] font-bold flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    Registrar Details
                  </h2>
                </div>
                <div className="p-6">
                  <div className="font-mono text-lg text-[rgb(var(--c-ink))] mb-2">{getRegistrar()}</div>
                  <div className="text-[rgb(var(--c-mute))] text-sm">The organization responsible for managing the reservation of this domain name.</div>
                </div>
              </div>

              <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-2xl overflow-hidden">
                <div className="border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] px-6 py-4">
                  <h2 className="text-[rgb(var(--c-ink))] font-bold flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
                    Nameservers
                  </h2>
                </div>
                <div className="p-6">
                  {getNameServers().length > 0 ? (
                    <ul className="space-y-2">
                      {getNameServers().map((ns: string, idx: number) => (
                        <li key={idx} className="font-mono text-[rgb(var(--c-ink))] text-sm bg-[rgba(17,17,17,0.05)] dark:bg-[rgba(0,0,0,0.3)] border border-[var(--c-glass-border)] rounded-lg p-3">
                          {ns}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-[rgb(var(--c-mute))] italic">No nameservers found.</div>
                  )}
                </div>
              </div>

            </div>

            <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-2xl overflow-hidden">
              <div className="border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] px-6 py-4 flex justify-between items-center">
                <h2 className="text-[rgb(var(--c-ink))] font-bold flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  Domain Status Codes
                </h2>
              </div>
              <div className="p-6">
                {getStatus().length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {getStatus().map((status: string, idx: number) => (
                      <span key={idx} className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] border border-[var(--c-glass-border)] rounded-lg text-sm text-[rgb(var(--c-mute))] font-mono">
                        {status}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-[rgb(var(--c-mute))] italic">No status codes reported.</div>
                )}
                <div className="mt-4 text-xs text-[rgb(var(--c-mute))] opacity-80">
                  Status codes define the state of the domain (e.g. clientTransferProhibited prevents unauthorized domain transfers).
                </div>
              </div>
            </div>

            <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-2xl overflow-hidden">
              <div className="border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] px-6 py-4 flex justify-between items-center">
                <h2 className="text-[rgb(var(--c-ink))] font-bold flex items-center gap-2">
                  <svg className="w-5 h-5 text-[rgb(var(--c-mute))]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  Raw RDAP JSON
                </h2>
              </div>
              <div className="p-0">
                <pre className="text-[rgb(var(--c-mute))] text-xs font-mono p-6 bg-[rgba(17,17,17,0.05)] dark:bg-[rgba(0,0,0,0.3)] overflow-x-auto max-h-[400px] custom-scrollbar">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
