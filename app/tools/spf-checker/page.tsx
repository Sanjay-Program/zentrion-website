'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface SpfResult {
  domain: string;
  record: string | null;
  isValid: boolean;
  warnings: string[];
  mechanisms: string[];
  responseTime: number;
}

export default function SpfCheckerPage() {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState<SpfResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const parseSpfRecord = (record: string): Pick<SpfResult, 'isValid' | 'warnings' | 'mechanisms'> => {
    const mechanisms = record.split(/\s+/).filter(Boolean);
    const warnings: string[] = [];
    let isValid = true;

    // Check strict formatting
    if (mechanisms[0] !== 'v=spf1') {
      isValid = false;
      warnings.push('Record does not exactly start with "v=spf1"');
    }

    // Check for multiple 'all' mechanisms or missing 'all'
    const allMechanisms = mechanisms.filter(m => m.endsWith('all'));
    if (allMechanisms.length > 1) {
      isValid = false;
      warnings.push('Record contains multiple "all" mechanisms.');
    }
    
    // Check for +all
    if (allMechanisms.includes('+all') || allMechanisms.includes('all')) {
      warnings.push('CRITICAL: Record ends with "+all". This allows ANY IP to spoof emails from your domain.');
    } else if (allMechanisms.includes('?all')) {
      warnings.push('Record ends with "?all" (Neutral). SPF is essentially disabled for enforcement.');
    } else if (!allMechanisms.includes('-all') && !allMechanisms.includes('~all')) {
      warnings.push('Record is missing a recommended strict termination ("-all" or "~all").');
    }

    // Check DNS lookup limits (rough estimation without recursively fetching includes)
    const lookups = mechanisms.filter(m => m.startsWith('include:') || m.startsWith('a') || m.startsWith('mx') || m.startsWith('ptr') || m.startsWith('exists:')).length;
    if (lookups > 10) {
      warnings.push(`Record has ${lookups} DNS lookups. The absolute maximum allowed by RFC is 10. Email will fail SPF.`);
      isValid = false;
    } else if (lookups >= 8) {
      warnings.push(`Approaching the 10 DNS lookup limit (${lookups}/10). Consider flattening your SPF.`);
    }

    if (record.includes('ptr')) {
      warnings.push('The "ptr" mechanism is deprecated by RFC 7208 and should not be used.');
    }

    return { isValid, warnings, mechanisms };
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
      const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(cleanDomain)}&type=TXT`, {
        headers: { 'Accept': 'application/dns-json' }
      });

      if (!res.ok) {
        throw new Error('DNS query failed.');
      }

      const data = await res.json();
      
      let spfRecord = null;
      let spfCount = 0;
      
      if (data.Answer) {
        data.Answer.forEach((a: any) => {
          // DoH TXT records are returned wrapped in quotes: "\"v=spf1 include:_spf.google.com ~all\""
          const txtData = a.data.replace(/(^"|"$)/g, '').replace(/""/g, ''); // Unescape TXT chunks
          if (txtData.toLowerCase().startsWith('v=spf1')) {
            spfRecord = txtData;
            spfCount++;
          }
        });
      }

      if (spfCount > 1) {
        setResult({
          domain: cleanDomain,
          record: spfRecord,
          isValid: false,
          warnings: ['CRITICAL: Multiple SPF records found! A domain MUST only have ONE SPF record. Email delivery will completely fail.'],
          mechanisms: [],
          responseTime: Date.now() - startTime
        });
        return;
      }

      if (!spfRecord) {
        setResult({
          domain: cleanDomain,
          record: null,
          isValid: false,
          warnings: ['No SPF record found.'],
          mechanisms: [],
          responseTime: Date.now() - startTime
        });
        return;
      }

      const parsed = parseSpfRecord(spfRecord);

      setResult({
        domain: cleanDomain,
        record: spfRecord,
        isValid: parsed.isValid,
        warnings: parsed.warnings,
        mechanisms: parsed.mechanisms,
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
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">SPF Checker</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Validate your Sender Policy Framework (SPF) records to prevent email spoofing and spam folder issues.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-8 mb-8">
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
                className="w-full pl-12 pr-4 py-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !domain}
              className="btn-primary py-4 px-8 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
            >
              {loading ? 'Checking...' : 'Check SPF'}
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
                    ? 'SPF Record is Valid' 
                    : !result.record 
                      ? 'No SPF Record Found'
                      : !result.isValid 
                        ? 'SPF Record is Invalid'
                        : 'SPF Record has Warnings'}
                </h3>
                <div className="mt-4 space-y-2">
                  {result.warnings.length > 0 ? (
                    <ul className="space-y-1 list-disc list-inside">
                      {result.warnings.map((w, i) => (
                        <li key={i} className="text-sm opacity-90">{w}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm opacity-90">No formatting issues or syntax errors detected.</p>
                  )}
                </div>
              </div>
            </div>

            {result.record && (
              <>
                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden">
                  <div className="border-b border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-6 py-4 flex justify-between items-center">
                    <h2 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-semibold">Raw TXT Record</h2>
                    <span className="text-xs text-[rgb(var(--c-mute))] flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {result.responseTime}ms
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="font-mono text-lg text-white bg-[rgba(255,255,255,0.02)] p-4 rounded-xl border border-[rgba(255,255,255,0.05)] break-all leading-relaxed">
                      {result.record}
                    </div>
                  </div>
                </div>

                <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden">
                  <div className="border-b border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-6 py-4 flex justify-between items-center">
                    <h2 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-semibold">Parsed Mechanisms</h2>
                    <span className="bg-[rgba(255,255,255,0.1)] text-white text-xs px-2 py-0.5 rounded-full">{result.mechanisms.length}</span>
                  </div>
                  <table className="w-full text-left border-collapse">
                    <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                      {result.mechanisms.map((mech, idx) => (
                        <tr key={idx} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                          <td className="py-4 px-6 text-sm font-mono text-[rgb(var(--c-accent))] font-bold w-1/3">
                            {mech}
                          </td>
                          <td className="py-4 px-6 text-[rgb(var(--c-mute))] text-sm">
                            {mech.startsWith('v=') && 'Protocol version (Must be v=spf1)'}
                            {mech.startsWith('include:') && `Authorizes IPs from ${mech.replace('include:', '')}`}
                            {mech.startsWith('a') && 'Authorizes the A record (IP) of the domain'}
                            {mech.startsWith('mx') && 'Authorizes all MX servers of the domain'}
                            {mech.startsWith('ip4:') && 'Authorizes specific IPv4 range'}
                            {mech.startsWith('ip6:') && 'Authorizes specific IPv6 range'}
                            {mech === '-all' && 'Strict Fail: Reject emails not explicitly authorized'}
                            {mech === '~all' && 'Soft Fail: Accept but mark as spam if not authorized'}
                            {mech === '?all' && 'Neutral: Do not enforce SPF'}
                            {mech === '+all' && 'Pass: Authorize ANY IP (Highly dangerous!)'}
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
