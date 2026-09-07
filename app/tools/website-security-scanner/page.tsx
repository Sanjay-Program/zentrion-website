'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function WebsiteScannerPage() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/network/website-scanner?url=${encodeURIComponent(domain)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to scan website.');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade === 'A') return 'text-green-500 border-green-500/20 bg-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.3)]';
    if (grade === 'B') return 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10 shadow-[0_0_30px_rgba(52,211,153,0.3)]';
    if (grade === 'C') return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10 shadow-[0_0_30px_rgba(250,204,21,0.3)]';
    if (grade === 'D') return 'text-orange-500 border-orange-500/20 bg-orange-500/10 shadow-[0_0_30px_rgba(249,115,22,0.3)]';
    return 'text-red-500 border-red-500/20 bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.3)]';
  };

  const headersMap = [
    { key: 'strict-transport-security', label: 'Strict-Transport-Security (HSTS)', desc: 'Forces secure (HTTP over SSL/TLS) connections to the server' },
    { key: 'content-security-policy', label: 'Content-Security-Policy', desc: 'Prevents cross-site scripting (XSS) and data injection attacks' },
    { key: 'x-frame-options', label: 'X-Frame-Options', desc: 'Prevents clickjacking attacks by forbidding iframe embedding' },
    { key: 'x-content-type-options', label: 'X-Content-Type-Options', desc: 'Prevents MIME-sniffing vulnerabilities' }
  ];

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-12 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.05)] border border-[var(--c-glass-border)] text-sm font-bold uppercase tracking-wider mb-4">
            🛡️ Security Audit
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Website Security Scanner</h1>
          <p className="text-xl text-[rgb(var(--c-mute))] max-w-2xl">
            Run a rapid edge-based audit checking DNS status and critical security headers to generate a unified security score for any domain.
          </p>
        </div>

        <form onSubmit={handleScan} className="max-w-3xl mb-12 relative flex items-center">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="e.g. google.com"
            className="w-full bg-[rgba(255,255,255,0.02)] border border-[var(--c-glass-border)] rounded-2xl px-6 py-5 text-lg outline-none focus:border-[rgb(var(--c-accent))] focus:bg-[rgba(255,255,255,0.05)] transition-all pr-48 placeholder:text-[rgb(var(--c-mute))]"
            required
          />
          <button
            type="submit"
            disabled={loading || !domain}
            className="absolute right-2 px-8 py-3.5 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Scanning...' : 'Scan Target'}
          </button>
        </form>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 mb-8 max-w-3xl flex items-start gap-3">
             <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             <div>{error}</div>
          </div>
        )}

        {result && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className={`glass-card rounded-3xl border flex flex-col items-center justify-center p-12 text-center transition-colors ${getGradeColor(result.grade)}`}>
                <div className="text-sm font-bold uppercase tracking-widest opacity-80 mb-4">Security Grade</div>
                <div className="text-8xl font-black font-display leading-none mb-2">{result.grade}</div>
                <div className="text-lg font-bold opacity-90">{result.security_score}/100 Score</div>
              </div>

              <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] p-6 mt-6">
                 <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-bold mb-4">Target Details</div>
                 <div className="space-y-4 text-sm">
                   <div>
                     <div className="text-[rgb(var(--c-mute))]">Domain</div>
                     <div className="font-bold truncate">{result.domain}</div>
                   </div>
                   <div>
                     <div className="text-[rgb(var(--c-mute))]">DNS Status</div>
                     <div className="font-bold flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${result.dns_status === 'Online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                       {result.dns_status}
                     </div>
                   </div>
                 </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
               {headersMap.map((h, i) => {
                 const isPresent = !!(result.headers && result.headers[h.key]);
                 return (
                   <div key={i} className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] p-6 flex items-start gap-4">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1 ${isPresent ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                       {isPresent ? (
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                       ) : (
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                       )}
                     </div>
                     <div>
                       <h3 className="font-bold text-lg mb-1">{h.label}</h3>
                       <p className="text-[rgb(var(--c-mute))] text-sm">{h.desc}</p>
                       <div className={`mt-3 text-xs font-bold uppercase tracking-wider inline-block px-2 py-1 rounded border ${isPresent ? 'text-green-500 border-green-500/30 bg-green-500/10' : 'text-red-500 border-red-500/30 bg-red-500/10'}`}>
                         {isPresent ? 'Present' : 'Missing'}
                       </div>
                     </div>
                   </div>
                 );
               })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
