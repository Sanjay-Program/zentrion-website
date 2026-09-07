'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AsnLookupPage() {
  const [asn, setAsn] = useState('');
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!asn.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const cleanAsn = asn.replace(/^as/i, '');
      const res = await fetch(`https://api.bgpview.io/asn/${encodeURIComponent(cleanAsn)}`);
      
      if (!res.ok) {
        if (res.status === 404 || res.status === 400) {
            throw new Error('ASN not found in BGP database.');
        }
        if (res.status === 429) {
            throw new Error('Rate limit exceeded for BGP database. Try again later.');
        }
        throw new Error('Failed to fetch ASN data.');
      }

      const json = await res.json();
      if (json.status !== 'ok' || !json.data) {
        throw new Error('ASN data unavailable.');
      }
      setResult(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
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
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            BGP Intelligence
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">BGP ASN Lookup</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Retrieve deep intelligence on Autonomous System Numbers (ASN), including owners, prefixes, and BGP routing data.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[rgb(var(--c-mute))] font-mono font-bold">
                AS
              </div>
              <input
                type="text"
                value={asn}
                onChange={(e) => setAsn(e.target.value.replace(/^as/i, ''))}
                placeholder="15169"
                className="w-full pl-12 pr-4 py-4 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !asn}
              className="btn-primary py-4 px-8 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Querying...
                </span>
              ) : 'Lookup ASN'}
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl p-5">
                <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">ASN</div>
                <div className="text-2xl font-mono text-[rgb(var(--c-ink))] font-bold">AS{result.asn}</div>
              </div>
              <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl p-5 lg:col-span-2">
                <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Entity Name</div>
                <div className="text-lg font-mono text-[rgb(var(--c-accent))] font-bold truncate" title={result.name}>{result.name}</div>
                <div className="text-sm text-[rgb(var(--c-ink))]/70 truncate mt-1">{result.description_short || result.description}</div>
              </div>
              <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl p-5">
                <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Country</div>
                <div className="text-2xl font-mono text-[rgb(var(--c-ink))] font-bold flex items-center gap-2">
                  {result.country_code}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-2xl overflow-hidden">
                <div className="border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] px-6 py-4">
                  <h2 className="text-[rgb(var(--c-ink))] font-bold flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    Owner / Contact Details
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Organization</div>
                    <div className="text-[rgb(var(--c-ink))]">{result.owner_address ? result.owner_address.join(', ') : 'No data available'}</div>
                  </div>
                  <div>
                    <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Email Contacts</div>
                    {result.email_contacts && result.email_contacts.length > 0 ? (
                      <ul className="text-[rgb(var(--c-ink))] font-mono text-sm space-y-1">
                        {result.email_contacts.map((email: string, idx: number) => (
                          <li key={idx}><a href={`mailto:${email}`} className="hover:text-[rgb(var(--c-accent))]">{email}</a></li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-[rgb(var(--c-mute))] italic text-sm">No emails found</div>
                    )}
                  </div>
                  <div>
                    <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Abuse Contacts</div>
                    {result.abuse_contacts && result.abuse_contacts.length > 0 ? (
                      <ul className="text-[rgb(var(--c-ink))] font-mono text-sm space-y-1">
                        {result.abuse_contacts.map((email: string, idx: number) => (
                          <li key={idx}><a href={`mailto:${email}`} className="text-red-400 hover:text-red-300">{email}</a></li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-[rgb(var(--c-mute))] italic text-sm">No abuse contacts found</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-2xl overflow-hidden">
                <div className="border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] px-6 py-4">
                  <h2 className="text-[rgb(var(--c-ink))] font-bold flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Network Resources
                  </h2>
                </div>
                <div className="p-6">
                  
                  <div className="mb-6">
                     <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-2">Regional Internet Registry (RIR)</div>
                     <div className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded font-bold font-mono">
                       {result.rir_allocation?.rir_name || result.rir_name || 'Unknown'}
                     </div>
                  </div>

                  {result.date_updated && (
                    <div className="mb-6">
                      <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Last Updated</div>
                      <div className="text-[rgb(var(--c-ink))] font-mono">{new Date(result.date_updated).toLocaleDateString()}</div>
                    </div>
                  )}
                  
                  <div className="p-4 bg-[rgba(17,17,17,0.05)] dark:bg-[rgba(0,0,0,0.3)] rounded-xl border border-[var(--c-glass-border)]">
                    <p className="text-sm text-[rgb(var(--c-mute))] italic">
                      Autonomous Systems (AS) are large networks or groups of networks that have a unified routing policy. Every AS is assigned a globally unique ASN, which is used in BGP routing to direct traffic across the internet.
                    </p>
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
