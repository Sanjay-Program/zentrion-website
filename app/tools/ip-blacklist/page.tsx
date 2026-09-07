'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface BlacklistProvider {
  name: string;
  domain: string;
  description: string;
}

const BLACKLISTS: BlacklistProvider[] = [
  { name: 'Spamhaus ZEN', domain: 'zen.spamhaus.org', description: 'Major aggregate of spam sources' },
  { name: 'Barracuda', domain: 'b.barracudacentral.org', description: 'Barracuda Reputation Block List' },
  { name: 'Sorbs (Spam)', domain: 'spam.dnsbl.sorbs.net', description: 'Spam sources and hijacked networks' },
  { name: 'SpamCop', domain: 'bl.spamcop.net', description: 'Reported spam sources' },
  { name: 'CBL', domain: 'cbl.abuseat.org', description: 'Composite Blocking List (botnets/malware)' },
  { name: 'UCEPROTECT 1', domain: 'dnsbl-1.uceprotect.net', description: 'Single IP blocklist' },
  { name: 'DroneBL', domain: 'dnsbl.dronebl.org', description: 'Abused VPNs, proxies, and botnets' },
  { name: 'JustSpam', domain: 'dnsbl.justspam.org', description: 'Known spammer IPs' },
];

interface BlacklistResult {
  provider: BlacklistProvider;
  status: 'pending' | 'clean' | 'listed' | 'error';
  records?: string[];
  responseTime?: number;
}

export default function IpBlacklistPage() {
  const [ip, setIp] = useState('');
  const [results, setResults] = useState<Record<string, BlacklistResult>>({});
  const [isQuerying, setIsQuerying] = useState(false);
  const [error, setError] = useState('');

  const reverseIp = (ipAddr: string) => {
    // Basic IPv4 support for now
    if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(ipAddr)) {
      throw new Error('Please enter a valid IPv4 address.');
    }
    return ipAddr.split('.').reverse().join('.');
  };

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ip.trim()) return;

    setIsQuerying(true);
    setError('');
    
    let reversedIp = '';
    try {
      reversedIp = reverseIp(ip.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid IP');
      setIsQuerying(false);
      return;
    }

    const initialResults: Record<string, BlacklistResult> = {};
    BLACKLISTS.forEach(b => {
      initialResults[b.domain] = { provider: b, status: 'pending' };
    });
    setResults(initialResults);

    const promises = BLACKLISTS.map(async (blacklist) => {
      const startTime = Date.now();
      try {
        const query = `${reversedIp}.${blacklist.domain}`;
        // Using Cloudflare DoH
        const url = `https://cloudflare-dns.com/dns-query?name=${query}&type=A`;
        const res = await fetch(url, {
          headers: { 'Accept': 'application/dns-json' },
          signal: AbortSignal.timeout(8000)
        });
        
        if (!res.ok) throw new Error('DNS resolution failed');
        
        const data = await res.json();
        const records = data.Answer ? data.Answer.map((a: any) => a.data).filter(Boolean) : [];
        const isListed = records.length > 0 && records[0].startsWith('127.');

        setResults(prev => ({
          ...prev,
          [blacklist.domain]: {
            provider: blacklist,
            status: isListed ? 'listed' : 'clean',
            records: records,
            responseTime: Date.now() - startTime
          }
        }));
      } catch (err) {
        setResults(prev => ({
          ...prev,
          [blacklist.domain]: {
            provider: blacklist,
            status: 'error',
            responseTime: Date.now() - startTime
          }
        }));
      }
    });

    await Promise.allSettled(promises);
    setIsQuerying(false);
  };

  const hasResults = Object.keys(results).length > 0;
  const listedCount = Object.values(results).filter(r => r.status === 'listed').length;

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">IP Blacklist Checker</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Scan an IP address across {BLACKLISTS.length} major anti-spam and malware DNSBL databases.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[rgb(var(--c-mute))]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              </div>
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="e.g. 192.168.1.1"
                className="w-full pl-12 pr-4 py-4 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isQuerying || !ip}
              className="btn-primary py-4 px-8 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
            >
              {isQuerying ? 'Scanning...' : 'Scan Blacklists'}
            </button>
          </form>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <div>
              <h3 className="text-red-400 font-semibold">Error</h3>
              <p className="text-red-400/80 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {hasResults && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={`p-6 rounded-2xl border ${listedCount > 0 ? 'bg-red-500/10 border-red-500/20 text-red-400' : (isQuerying ? 'bg-[var(--c-glass-bg)] border-[var(--c-glass-border)] text-white' : 'bg-green-500/10 border-green-500/20 text-green-400')} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${listedCount > 0 ? 'bg-red-500/20' : (isQuerying ? 'bg-[rgba(255,255,255,0.05)]' : 'bg-green-500/20')}`}>
                  {isQuerying ? (
                    <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : listedCount > 0 ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display">
                    {isQuerying ? 'Scanning in progress...' : listedCount > 0 ? 'IP Address Listed!' : 'IP Address is Clean!'}
                  </h3>
                  <p className="opacity-80 text-sm mt-1">
                    Listed on {listedCount} out of {BLACKLISTS.length} blacklists.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--c-glass-bg)] border-b border-[var(--c-glass-border)]">
                    <th className="py-4 px-6 text-[rgb(var(--c-mute))] font-semibold text-sm">DNSBL Provider</th>
                    <th className="py-4 px-6 text-[rgb(var(--c-mute))] font-semibold text-sm w-32">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--c-glass-border)]">
                  {Object.values(results).map((res) => (
                    <tr key={res.provider.domain} className="hover:bg-[var(--c-glass-bg)] transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-[rgb(var(--c-ink))] mb-1">{res.provider.name}</div>
                        <div className="text-xs text-[rgb(var(--c-mute))]">{res.provider.domain}</div>
                      </td>
                      <td className="py-4 px-6 align-middle">
                        {res.status === 'pending' && (
                          <span className="inline-flex items-center gap-2 text-[rgb(var(--c-mute))] text-sm">
                            <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                            Checking
                          </span>
                        )}
                        {res.status === 'clean' && (
                          <span className="inline-flex items-center gap-1.5 text-green-400 font-medium text-sm">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Clean
                          </span>
                        )}
                        {res.status === 'listed' && (
                          <span className="inline-flex items-center gap-1.5 text-red-400 font-bold text-sm bg-red-400/10 px-2 py-1 rounded border border-red-400/20">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            Listed
                          </span>
                        )}
                        {res.status === 'error' && (
                          <span className="inline-flex items-center gap-1.5 text-yellow-400 font-medium text-sm">
                            Timeout
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
