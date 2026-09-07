'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface WhoisResult {
  domain?: string;
  domain_id?: string;
  status?: string;
  create_date?: string;
  update_date?: string;
  expire_date?: string;
  domain_age?: number;
  whois_server?: string;
  registrar?: {
    iana_id?: string;
    name?: string;
    url?: string;
  };
  registrant?: {
    name?: string;
    organization?: string;
    street_address?: string;
    city?: string;
    region?: string;
    zip_code?: string;
    country?: string;
    phone?: string;
    fax?: string;
    email?: string;
  };
  nameservers?: string[];
  _mock?: boolean;
  _message?: string;
}

export default function WhoisLookupPage() {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState<WhoisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;

    // strip https:// if accidentally pasted
    let cleanDomain = domain.trim().toLowerCase();
    cleanDomain = cleanDomain.replace(/^https?:\/\//, '');
    cleanDomain = cleanDomain.split('/')[0];

    setDomain(cleanDomain);
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/network/whois?domain=${encodeURIComponent(cleanDomain)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'WHOIS lookup failed.');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[700px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">WHOIS Lookup</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Discover domain registration records, ownership data, and expiration dates.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[rgb(var(--c-mute))] font-mono">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              </div>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g. example.com"
                className="w-full pl-12 pr-4 py-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !domain}
              className="btn-primary py-4 px-8 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
            >
              {loading ? 'Querying...' : 'Query WHOIS'}
            </button>
          </form>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <div>
              <h3 className="text-red-400 font-semibold">Query Failed</h3>
              <p className="text-red-400/80 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {result._mock && (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div>
                  <h3 className="text-yellow-500 font-semibold">Simulation Mode Active</h3>
                  <p className="text-yellow-500/80 text-sm mt-1">{result._message}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Domain Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden">
                  <div className="border-b border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-6 py-5">
                    <h2 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                      Domain Registration
                    </h2>
                  </div>
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider mb-1">Domain Name</h3>
                      <p className="font-mono text-xl text-white font-bold">{result.domain}</p>
                    </div>
                    <div>
                      <h3 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider mb-1">Status</h3>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {result.status?.split(' ').map((status, i) => (
                          <span key={i} className="px-2 py-1 rounded bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-xs font-mono text-[rgb(var(--c-accent))]">
                            {status}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="sm:col-span-2 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                          <h3 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider mb-1">Registered On</h3>
                          <p className="text-white font-medium">{formatDate(result.create_date)}</p>
                        </div>
                        <div>
                          <h3 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider mb-1">Expires On</h3>
                          <p className="text-white font-medium">{formatDate(result.expire_date)}</p>
                        </div>
                        <div>
                          <h3 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider mb-1">Last Updated</h3>
                          <p className="text-[rgb(var(--c-mute))] text-sm">{formatDate(result.update_date)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registrant / Ownership */}
                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden">
                  <div className="border-b border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-6 py-5">
                    <h2 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      Registrant Contact
                    </h2>
                  </div>
                  <div className="p-6">
                    {result.registrant?.organization === 'DATA REDACTED' || !result.registrant?.organization ? (
                      <div className="flex items-center gap-3 text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
                        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        <span className="text-sm">Registrant data is redacted for privacy (GDPR / WHOIS Privacy).</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider mb-1">Organization</h3>
                          <p className="text-white font-medium">{result.registrant.organization}</p>
                        </div>
                        <div>
                          <h3 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider mb-1">Name</h3>
                          <p className="text-white font-medium">{result.registrant.name || 'N/A'}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <h3 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider mb-1">Address</h3>
                          <p className="text-[rgb(var(--c-mute))]">
                            {[result.registrant.street_address, result.registrant.city, result.registrant.region, result.registrant.country].filter(Boolean).join(', ')}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6">
                  <h3 className="text-white font-display font-semibold mb-4">Registrar</h3>
                  <div className="space-y-3">
                    <p className="text-[rgb(var(--c-accent))] font-medium">{result.registrar?.name || 'Unknown'}</p>
                    {result.registrar?.url && (
                      <a href={result.registrar.url} target="_blank" rel="noreferrer" className="text-sm text-[rgb(var(--c-mute))] hover:text-white flex items-center gap-1 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        {result.registrar.url}
                      </a>
                    )}
                  </div>
                </div>

                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6">
                  <h3 className="text-white font-display font-semibold mb-4">Nameservers</h3>
                  {result.nameservers && result.nameservers.length > 0 ? (
                    <ul className="space-y-2">
                      {result.nameservers.map((ns, i) => (
                        <li key={i} className="font-mono text-sm text-[rgb(var(--c-mute))] bg-[rgba(255,255,255,0.03)] px-3 py-2 rounded">
                          {ns}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-[rgb(var(--c-mute))]">No nameservers found.</p>
                  )}
                </div>

                {result.whois_server && (
                  <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6">
                    <h3 className="text-white font-display font-semibold mb-2">WHOIS Server</h3>
                    <p className="font-mono text-sm text-[rgb(var(--c-mute))]">{result.whois_server}</p>
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
