'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface DmarcResult {
  domain: string;
  record: string | null;
  isValid: boolean;
  warnings: string[];
  tags: Record<string, string>;
  responseTime: number;
}

export default function DmarcCheckerPage() {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState<DmarcResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const parseDmarcRecord = (record: string): Pick<DmarcResult, 'isValid' | 'warnings' | 'tags'> => {
    const parts = record.split(';').map(p => p.trim()).filter(Boolean);
    const tags: Record<string, string> = {};
    const warnings: string[] = [];
    let isValid = true;

    parts.forEach(part => {
      const [key, ...valueParts] = part.split('=');
      if (key && valueParts.length > 0) {
        tags[key.trim().toLowerCase()] = valueParts.join('=').trim();
      }
    });

    if (tags['v'] !== 'DMARC1') {
      isValid = false;
      warnings.push('Record does not start with "v=DMARC1".');
    }

    if (!tags['p']) {
      isValid = false;
      warnings.push('Missing required "p" (policy) tag.');
    } else {
      const policy = tags['p'].toLowerCase();
      if (policy === 'none') {
        warnings.push('Policy is set to "none". This provides monitoring only, but no protection against spoofing.');
      } else if (policy !== 'quarantine' && policy !== 'reject') {
        isValid = false;
        warnings.push(`Invalid policy "${policy}". Must be none, quarantine, or reject.`);
      }
    }

    if (tags['pct']) {
      const pct = parseInt(tags['pct'], 10);
      if (isNaN(pct) || pct < 0 || pct > 100) {
        isValid = false;
        warnings.push('Invalid "pct" (percentage) tag. Must be between 0 and 100.');
      } else if (pct < 100 && tags['p'] !== 'none') {
        warnings.push(`Policy enforcement is only applied to ${pct}% of emails. Remaining emails are treated as p=none.`);
      }
    }

    if (tags['rua'] && !tags['rua'].startsWith('mailto:')) {
      warnings.push('The "rua" (aggregate reports) URI should start with "mailto:".');
    }

    return { isValid, warnings, tags };
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;

    let cleanDomain = domain.trim().toLowerCase();
    cleanDomain = cleanDomain.replace(/^https?:\/\//, '').split('/')[0];
    setDomain(cleanDomain);

    setLoading(true);
    setError('');
    setResult(null);
    const startTime = Date.now();

    try {
      // DMARC is stored at _dmarc.domain.com
      const dmarcDomain = `_dmarc.${cleanDomain}`;
      
      const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(dmarcDomain)}&type=TXT`, {
        headers: { 'Accept': 'application/dns-json' }
      });

      if (!res.ok) {
        throw new Error('DNS query failed.');
      }

      const data = await res.json();
      
      let dmarcRecord = null;
      let dmarcCount = 0;
      
      if (data.Answer) {
        data.Answer.forEach((a: any) => {
          const txtData = a.data.replace(/(^"|"$)/g, '').replace(/""/g, ''); // Unescape TXT chunks
          if (txtData.toLowerCase().startsWith('v=dmarc1')) {
            dmarcRecord = txtData;
            dmarcCount++;
          }
        });
      }

      if (dmarcCount > 1) {
        setResult({
          domain: cleanDomain,
          record: dmarcRecord,
          isValid: false,
          warnings: ['CRITICAL: Multiple DMARC records found! A domain MUST only have ONE DMARC record.'],
          tags: {},
          responseTime: Date.now() - startTime
        });
        return;
      }

      if (!dmarcRecord) {
        setResult({
          domain: cleanDomain,
          record: null,
          isValid: false,
          warnings: ['No DMARC record found.'],
          tags: {},
          responseTime: Date.now() - startTime
        });
        return;
      }

      const parsed = parseDmarcRecord(dmarcRecord);

      setResult({
        domain: cleanDomain,
        record: dmarcRecord,
        isValid: parsed.isValid,
        warnings: parsed.warnings,
        tags: parsed.tags,
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
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">DMARC Checker</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Validate your DMARC records to protect your domain from email spoofing and phishing.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[rgb(var(--c-mute))]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
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
              {loading ? 'Checking...' : 'Check DMARC'}
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
            
            <div className={`p-6 rounded-2xl border ${result.isValid && result.warnings.length === 0 ? 'bg-green-500/10 border-green-500/20 text-green-400' : (!result.isValid || !result.record ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500')} flex items-start gap-4`}>
              <div className={`mt-1 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${result.isValid && result.warnings.length === 0 ? 'bg-green-500/20' : (!result.isValid || !result.record ? 'bg-red-500/20' : 'bg-yellow-500/20')}`}>
                {result.isValid && result.warnings.length === 0 ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold font-display">
                  {result.isValid && result.warnings.length === 0 
                    ? 'DMARC Record is Valid' 
                    : !result.record 
                      ? 'No DMARC Record Found'
                      : !result.isValid 
                        ? 'DMARC Record is Invalid'
                        : 'DMARC Record has Warnings'}
                </h3>
                <div className="mt-4 space-y-2">
                  {result.warnings.length > 0 ? (
                    <ul className="space-y-1 list-disc list-inside">
                      {result.warnings.map((w, i) => (
                        <li key={i} className="text-sm opacity-90">{w}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm opacity-90">No formatting issues or vulnerabilities detected.</p>
                  )}
                </div>
              </div>
            </div>

            {result.record && (
              <>
                <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-2xl overflow-hidden">
                  <div className="border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] px-6 py-4 flex justify-between items-center">
                    <h2 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-semibold">Raw TXT Record (_dmarc.{result.domain})</h2>
                    <span className="text-xs text-[rgb(var(--c-mute))] flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {result.responseTime}ms
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="font-mono text-lg text-white bg-[var(--c-glass-bg)] p-4 rounded-xl border border-[var(--c-glass-border)] break-all leading-relaxed">
                      {result.record}
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-2xl overflow-hidden">
                  <div className="border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] px-6 py-4 flex justify-between items-center">
                    <h2 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-semibold">Parsed Tags</h2>
                    <span className="bg-[rgba(255,255,255,0.1)] text-[rgb(var(--c-ink))] text-xs px-2 py-0.5 rounded-full">{Object.keys(result.tags).length}</span>
                  </div>
                  <table className="w-full text-left border-collapse">
                    <tbody className="divide-y divide-[var(--c-glass-border)]">
                      {Object.entries(result.tags).map(([key, val], idx) => (
                        <tr key={idx} className="hover:bg-[var(--c-glass-bg)] transition-colors">
                          <td className="py-4 px-6 text-sm font-mono text-[rgb(var(--c-accent))] font-bold w-1/4">
                            {key}
                          </td>
                          <td className="py-4 px-6 font-mono text-[rgb(var(--c-ink))] text-sm w-1/3 break-all">
                            {val}
                          </td>
                          <td className="py-4 px-6 text-[rgb(var(--c-mute))] text-sm">
                            {key === 'v' && 'Protocol version (Must be DMARC1)'}
                            {key === 'p' && 'Policy applied to emails failing DMARC'}
                            {key === 'sp' && 'Policy applied to subdomains'}
                            {key === 'pct' && 'Percentage of messages subjected to filtering'}
                            {key === 'rua' && 'Reporting URI of aggregate reports'}
                            {key === 'ruf' && 'Reporting URI for forensic reports'}
                            {key === 'adkim' && 'DKIM alignment mode (s=strict, r=relaxed)'}
                            {key === 'aspf' && 'SPF alignment mode (s=strict, r=relaxed)'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
