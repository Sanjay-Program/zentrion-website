'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface DnsProvider {
  name: string;
  id: string;
  endpoint: string;
  location: string;
  headers?: Record<string, string>;
}

const PROVIDERS: DnsProvider[] = [
  { name: 'Google DNS', id: 'google', endpoint: 'https://dns.google/resolve', location: 'Global' },
  { name: 'Cloudflare', id: 'cloudflare', endpoint: 'https://cloudflare-dns.com/dns-query', location: 'Global', headers: { 'Accept': 'application/dns-json' } },
  { name: 'Quad9', id: 'quad9', endpoint: 'https://dns.quad9.net:5053/dns-query', location: 'Switzerland', headers: { 'Accept': 'application/dns-json' } },
  { name: 'AdGuard', id: 'adguard', endpoint: 'https://dns.adguard-dns.com/resolve', location: 'Cyprus' },
  { name: 'OpenDNS', id: 'opendns', endpoint: 'https://doh.opendns.com/dns-query', location: 'USA', headers: { 'Accept': 'application/dns-json' } }
];

interface PropagationResult {
  provider: DnsProvider;
  status: 'pending' | 'success' | 'error';
  records?: string[];
  error?: string;
  responseTime?: number;
}

export default function DnsPropagationPage() {
  const [domain, setDomain] = useState('');
  const [recordType, setRecordType] = useState('A');
  const [results, setResults] = useState<Record<string, PropagationResult>>({});
  const [isQuerying, setIsQuerying] = useState(false);

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;

    let cleanDomain = domain.trim().toLowerCase();
    cleanDomain = cleanDomain.replace(/^https?:\/\//, '').split('/')[0];
    setDomain(cleanDomain);

    setIsQuerying(true);
    
    const initialResults: Record<string, PropagationResult> = {};
    PROVIDERS.forEach(p => {
      initialResults[p.id] = { provider: p, status: 'pending' };
    });
    setResults(initialResults);

    const promises = PROVIDERS.map(async (provider) => {
      const startTime = Date.now();
      try {
        const url = `${provider.endpoint}?name=${encodeURIComponent(cleanDomain)}&type=${recordType}`;
        const res = await fetch(url, {
          headers: provider.headers,
          signal: AbortSignal.timeout(10000)
        });
        
        if (!res.ok) throw new Error('DNS resolution failed');
        
        const data = await res.json();
        const records = data.Answer 
          ? data.Answer.map((a: any) => a.data).filter(Boolean)
          : [];

        setResults(prev => ({
          ...prev,
          [provider.id]: {
            provider,
            status: 'success',
            records: records.length ? records : ['No records found'],
            responseTime: Date.now() - startTime
          }
        }));
      } catch (err) {
        setResults(prev => ({
          ...prev,
          [provider.id]: {
            provider,
            status: 'error',
            error: err instanceof Error ? err.message : 'Timeout or Error',
            responseTime: Date.now() - startTime
          }
        }));
      }
    });

    await Promise.allSettled(promises);
    setIsQuerying(false);
  };

  const getRecordTypes = () => ['A', 'AAAA', 'MX', 'TXT', 'CNAME', 'NS'];

  const getConsensusColor = () => {
    const successResults = Object.values(results).filter(r => r.status === 'success');
    if (successResults.length === 0) return 'text-gray-400';
    
    const allRecords = successResults.map(r => r.records?.sort().join(',') || '');
    const isPropagated = allRecords.every(val => val === allRecords[0]);
    
    return isPropagated ? 'text-green-400' : 'text-yellow-400';
  };

  const hasResults = Object.keys(results).length > 0;

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[700px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">DNS Propagation Checker</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Verify globally how your DNS records have propagated across major DNS resolvers.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <form onSubmit={handleQuery} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="w-full px-4 py-4 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
                required
              />
            </div>
            
            <div className="md:w-48 relative">
              <select
                value={recordType}
                onChange={(e) => setRecordType(e.target.value)}
                className="w-full px-4 py-4 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] appearance-none focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono cursor-pointer"
              >
                {getRecordTypes().map(type => (
                  <option key={type} value={type} className="bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))]">{type} Record</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[rgb(var(--c-mute))]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            <button
              type="submit"
              disabled={isQuerying || !domain}
              className="btn-primary py-4 px-8 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
            >
              {isQuerying ? 'Querying...' : 'Check DNS'}
            </button>
          </form>
        </div>

        {hasResults && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl p-4">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-[rgb(var(--c-ink))]">Global Consensus Status:</h3>
                {!isQuerying && (
                  <span className={`font-bold ${getConsensusColor()} flex items-center gap-2`}>
                    {getConsensusColor() === 'text-green-400' ? (
                      <><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Fully Propagated</>
                    ) : getConsensusColor() === 'text-yellow-400' ? (
                      <><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> Partially Propagated</>
                    ) : (
                      'Unable to Determine'
                    )}
                  </span>
                )}
                {isQuerying && <span className="text-[rgb(var(--c-mute))] animate-pulse">Waiting for resolvers...</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(results).map((res) => (
                <div key={res.provider.id} className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl overflow-hidden flex flex-col">
                  <div className="border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] px-5 py-3 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-[rgb(var(--c-ink))]">{res.provider.name}</h3>
                      <p className="text-[10px] text-[rgb(var(--c-mute))] uppercase tracking-wider">{res.provider.location}</p>
                    </div>
                    {res.status === 'pending' && (
                      <div className="w-4 h-4 border-2 border-[rgb(var(--c-accent))] border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {res.status === 'success' && (
                      <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    )}
                    {res.status === 'error' && (
                      <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    )}
                  </div>
                  <div className="p-5 flex-grow">
                    {res.status === 'pending' ? (
                      <div className="h-full flex items-center justify-center text-[rgb(var(--c-mute))] text-sm italic">
                        Querying...
                      </div>
                    ) : res.status === 'error' ? (
                      <div className="text-red-400 text-sm">
                        {res.error}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {res.records?.map((record, idx) => (
                          <div key={idx} className="font-mono text-sm text-[rgb(var(--c-accent))] bg-[var(--c-glass-bg)] p-2 rounded border border-[var(--c-glass-border)] break-all">
                            {record}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="px-5 py-2 border-t border-[rgba(255,255,255,0.02)] bg-[rgba(255,255,255,0.01)] flex justify-between items-center">
                    <span className="text-[10px] text-[rgb(var(--c-mute))] uppercase font-bold tracking-wider">DoH Lookup</span>
                    {res.responseTime && (
                      <span className="text-xs text-[rgb(var(--c-mute))]">{res.responseTime}ms</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
