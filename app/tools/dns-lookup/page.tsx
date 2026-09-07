'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function DnsLookupPage() {
  const [domain, setDomain] = useState('');
  const [recordType, setRecordType] = useState('A');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any[] | null>(null);

  const typeMap: Record<number, string> = {
    1: 'A', 2: 'NS', 5: 'CNAME', 6: 'SOA', 15: 'MX', 16: 'TXT', 28: 'AAAA', 257: 'CAA'
  };

  const performLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResults(null);
    setLoading(true);

    try {
      let cleanDomain = domain.trim().replace(/^https?:\/\//, '').split('/')[0];
      if (!cleanDomain || !/^[a-zA-Z0-9.-]+$/.test(cleanDomain)) {
        throw new Error('Invalid domain format.');
      }

      const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(cleanDomain)}&type=${recordType}`, {
        headers: { 'Accept': 'application/dns-json' }
      });

      if (!response.ok) throw new Error(`DNS Query failed: HTTP ${response.status}`);
      const data = await response.json();

      if (data.Status !== 0) {
        const errorCodes: Record<number, string> = {
          1: 'FormErr', 2: 'ServFail', 3: 'NXDomain (Not Found)', 4: 'NotImp', 5: 'Refused'
        };
        throw new Error(`DNS Error: ${errorCodes[data.Status] || `Code ${data.Status}`}`);
      }

      setResults(data.Answer || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">DNS Lookup</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Query global DNS records directly from your browser using Cloudflare DNS-over-HTTPS (DoH).</p>
          <div className="mt-4">
            <span className="inline-block px-3 py-1 bg-[rgba(255,255,255,0.05)] text-xs font-mono tracking-wider rounded-md border border-[var(--c-glass-border)]">
              EXTERNAL API
            </span>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 md:p-8">
          <form onSubmit={performLookup} className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-grow">
              <label className="block text-sm font-medium mb-2">Domain Name</label>
              <input 
                type="text" 
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="w-full bg-[rgba(17,17,17,0.05)] dark:bg-[rgba(0,0,0,0.3)] border border-[var(--c-glass-border)] rounded-lg px-4 py-3 focus:outline-none focus:border-[rgb(var(--c-accent))] transition-colors"
                required
              />
            </div>
            <div className="w-full md:w-48">
              <label className="block text-sm font-medium mb-2">Record Type</label>
              <select 
                value={recordType}
                onChange={(e) => setRecordType(e.target.value)}
                className="w-full bg-[rgba(17,17,17,0.05)] dark:bg-[rgba(0,0,0,0.3)] border border-[var(--c-glass-border)] rounded-lg px-4 py-3 focus:outline-none focus:border-[rgb(var(--c-accent))] transition-colors"
              >
                <option value="A">A (IPv4)</option>
                <option value="AAAA">AAAA (IPv6)</option>
                <option value="MX">MX (Mail)</option>
                <option value="NS">NS (Name Server)</option>
                <option value="TXT">TXT (Text)</option>
                <option value="CNAME">CNAME (Canonical)</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-auto bg-[rgb(var(--c-accent))] text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Querying...' : 'Lookup'}
              </button>
            </div>
          </form>

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 mb-6">
              {error}
            </div>
          )}

          {results && (
            <div className="overflow-x-auto">
              {results.length === 0 ? (
                <div className="p-4 bg-yellow-900/20 border border-yellow-500/50 rounded-lg text-yellow-200">
                  No {recordType} records found for this domain.
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--c-glass-border)] text-[rgb(var(--c-mute))]">
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">TTL</th>
                      <th className="py-3 px-4">Value / Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((ans, idx) => (
                      <tr key={idx} className="border-b border-[var(--c-glass-border)] hover:bg-[var(--c-glass-bg)] transition-colors">
                        <td className="py-3 px-4 font-mono text-sm">{ans.name}</td>
                        <td className="py-3 px-4 font-mono text-sm">{typeMap[ans.type] || ans.type}</td>
                        <td className="py-3 px-4 font-mono text-sm">{ans.TTL}</td>
                        <td className="py-3 px-4 font-mono text-sm text-[rgb(var(--c-accent))] break-all">{ans.data}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
