'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface WafResult {
  url: string;
  wafDetected: string[];
  server: string | null;
  responseCode: number;
  headers: Record<string, string>;
  tls: boolean;
}

interface WafError {
  error: string;
  details?: string;
}

const WAF_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Cloudflare':            { bg: 'rgba(249,115,22,0.15)', text: '#f97316', border: 'rgba(249,115,22,0.4)' },
  'AWS WAF / CloudFront':  { bg: 'rgba(234,179,8,0.15)',  text: '#eab308', border: 'rgba(234,179,8,0.4)'  },
  'Akamai':                { bg: 'rgba(59,130,246,0.15)', text: '#3b82f6', border: 'rgba(59,130,246,0.4)' },
  'Sucuri':                { bg: 'rgba(34,197,94,0.15)',  text: '#22c55e', border: 'rgba(34,197,94,0.4)'  },
  'Imperva':               { bg: 'rgba(239,68,68,0.15)',  text: '#ef4444', border: 'rgba(239,68,68,0.4)'  },
  'Fastly':                { bg: 'rgba(168,85,247,0.15)', text: '#a855f7', border: 'rgba(168,85,247,0.4)' },
  'Varnish':               { bg: 'rgba(20,184,166,0.15)', text: '#14b8a6', border: 'rgba(20,184,166,0.4)' },
  'Barracuda':             { bg: 'rgba(251,146,60,0.15)', text: '#fb923c', border: 'rgba(251,146,60,0.4)' },
  'F5 BIG-IP':             { bg: 'rgba(99,102,241,0.15)', text: '#6366f1', border: 'rgba(99,102,241,0.4)' },
  'Nginx':                 { bg: 'rgba(20,184,166,0.15)', text: '#14b8a6', border: 'rgba(20,184,166,0.4)' },
  'Apache':                { bg: 'rgba(234,88,12,0.15)',  text: '#ea580c', border: 'rgba(234,88,12,0.4)'  },
};

const DEFAULT_COLOR = { bg: 'rgba(148,163,184,0.15)', text: '#94a3b8', border: 'rgba(148,163,184,0.4)' };

export default function WafDetectorPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WafResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [headersOpen, setHeadersOpen] = useState(false);

  const analyze = async () => {
    const trimmed = url.trim();
    if (!trimmed) return;

    setLoading(true);
    setResult(null);
    setError(null);
    setHeadersOpen(false);

    try {
      const res = await fetch(`/api/network/waf?url=${encodeURIComponent(trimmed)}`);
      const data: WafResult | WafError = await res.json();

      if ('error' in data) {
        setError((data as WafError).error + ((data as WafError).details ? ` — ${(data as WafError).details}` : ''));
      } else {
        setResult(data as WafResult);
      }
    } catch {
      setError('Network error: could not reach the API.');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') analyze();
  };

  const statusColor = (code: number) => {
    if (code >= 200 && code < 300) return '#22c55e';
    if (code >= 300 && code < 400) return '#eab308';
    if (code >= 400 && code < 500) return '#f97316';
    return '#ef4444';
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500 opacity-[0.02] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Back link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)' }}>
              <svg className="w-5 h-5" style={{ color: '#f97316' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight">WAF Detector</h1>
          </div>
          <p className="text-xl text-[rgb(var(--c-mute))] max-w-2xl">
            Detect Web Application Firewalls, CDN providers, and server software by fingerprinting HTTP response headers.
          </p>
        </div>

        {/* Input */}
        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <label htmlFor="waf-url-input" className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-3">
            Target URL
          </label>
          <div className="flex gap-3">
            <input
              id="waf-url-input"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKey}
              placeholder="https://example.com"
              className="flex-1 px-4 py-3 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono text-sm"
            />
            <button
              id="waf-analyze-btn"
              onClick={analyze}
              disabled={loading || !url.trim()}
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              style={{ background: 'rgb(var(--c-accent))', color: '#0a0a0f' }}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Scanning...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Analyze
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-[rgb(var(--c-mute))] mt-2">Press Enter or click Analyze. HTTPS is automatically assumed if no protocol is provided.</p>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-2xl border p-5 mb-6 flex items-start gap-3" style={{ background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.3)' }}>
            <svg className="w-5 h-5 mt-0.5 shrink-0" style={{ color: '#ef4444' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L3.07 16.5C2.3 17.333 3.262 19 4.802 19z" />
            </svg>
            <div>
              <p className="font-semibold text-sm" style={{ color: '#ef4444' }}>Scan Failed</p>
              <p className="text-sm text-[rgb(var(--c-mute))] mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-5">
            {/* Main WAF Badge */}
            <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--c-mute))] mb-1">Scan Target</p>
                  <p className="font-mono text-sm text-[rgb(var(--c-ink))] break-all">{result.url}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-lg"
                    style={{ color: statusColor(result.responseCode), background: `${statusColor(result.responseCode)}22`, border: `1px solid ${statusColor(result.responseCode)}55` }}
                  >
                    HTTP {result.responseCode}
                  </span>
                  {result.tls ? (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ color: '#22c55e', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.35)' }}>
                      🔒 TLS/HTTPS
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ color: '#f97316', background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.35)' }}>
                      ⚠ HTTP Only
                    </span>
                  )}
                </div>
              </div>

              {/* WAF Detection Result */}
              {result.wafDetected.length === 0 ? (
                <div className="rounded-xl p-5 flex items-center gap-4" style={{ background: 'rgba(148,163,184,0.08)', border: '1px solid rgba(148,163,184,0.2)' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(148,163,184,0.1)' }}>
                    <svg className="w-6 h-6 text-[rgb(var(--c-mute))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-lg text-[rgb(var(--c-mute))]">No WAF Detected</p>
                    <p className="text-sm text-[rgb(var(--c-mute))] opacity-70 mt-0.5">No known WAF or CDN signatures were found in the response headers.</p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--c-mute))] mb-3">Detected Signatures</p>
                  <div className="flex flex-wrap gap-3">
                    {result.wafDetected.map((waf) => {
                      const c = WAF_COLORS[waf] ?? DEFAULT_COLOR;
                      return (
                        <span
                          key={waf}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm"
                          style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {waf}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Server Software */}
              <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--c-mute))] mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                  Server Software
                </p>
                <p className="font-mono text-sm text-[rgb(var(--c-ink))]">
                  {result.server ?? <span className="text-[rgb(var(--c-mute))] italic">Not disclosed</span>}
                </p>
              </div>

              {/* TLS */}
              <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--c-mute))] mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Encryption
                </p>
                {result.tls ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm font-semibold" style={{ color: '#22c55e' }}>TLS/HTTPS Enabled</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                    <span className="text-sm font-semibold" style={{ color: '#f97316' }}>Unencrypted (HTTP)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Collapsible Response Headers */}
            <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md overflow-hidden">
              <button
                id="waf-headers-toggle"
                onClick={() => setHeadersOpen(!headersOpen)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-[rgba(255,255,255,0.02)] transition-colors"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--c-mute))] flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Response Headers
                  <span className="ml-1 px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgb(var(--c-mute))' }}>
                    {Object.keys(result.headers).length}
                  </span>
                </span>
                <svg
                  className={`w-4 h-4 text-[rgb(var(--c-mute))] transition-transform duration-200 ${headersOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {headersOpen && (
                <div className="border-t border-[var(--c-glass-border)] overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--c-glass-border)]" style={{ background: 'rgba(0,0,0,0.2)' }}>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-widest text-[rgb(var(--c-mute))] w-2/5">Header</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-widest text-[rgb(var(--c-mute))]">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(result.headers).map(([key, val], i) => (
                        <tr
                          key={key}
                          className="border-b border-[var(--c-glass-border)] last:border-b-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                          style={i % 2 === 0 ? {} : { background: 'rgba(0,0,0,0.1)' }}
                        >
                          <td className="px-6 py-3 font-mono text-xs text-[rgb(var(--c-accent))] align-top">{key}</td>
                          <td className="px-6 py-3 font-mono text-xs text-[rgb(var(--c-ink))] break-all">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
