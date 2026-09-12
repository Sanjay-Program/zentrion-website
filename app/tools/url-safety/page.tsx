'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, AlertTriangle, HelpCircle, Check, X, AlertTriangle as AlertTriangleIcon } from 'lucide-react';

interface UrlSafetyResult {
  url: string;
  urlhaus: {
    listed: boolean;
    threat: string | null;
    tags: string[];
  };
  phishtank: {
    listed: boolean;
    verified: boolean;
  } | null;
  verdict: 'safe' | 'unsafe' | 'suspicious' | 'unknown';
}

interface ApiError {
  error: string;
}

const VERDICT_CONFIG = {
  safe: {
    label: 'SAFE',
    icon: <CheckCircle2 className="w-[1em] h-[1em]" />,
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.25)',
    glow: 'rgba(34,197,94,0.12)',
    desc: 'No threats detected across checked databases.',
  },
  unsafe: {
    label: 'MALICIOUS',
    icon: <XCircle className="w-[1em] h-[1em]" />,
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.25)',
    glow: 'rgba(239,68,68,0.12)',
    desc: 'This URL has been flagged as malicious. Avoid visiting it.',
  },
  suspicious: {
    label: 'SUSPICIOUS',
    icon: <AlertTriangle className="w-[1em] h-[1em]" />,
    color: '#eab308',
    bg: 'rgba(234,179,8,0.08)',
    border: 'rgba(234,179,8,0.25)',
    glow: 'rgba(234,179,8,0.12)',
    desc: 'This URL shows potential risk indicators. Proceed with caution.',
  },
  unknown: {
    label: 'UNKNOWN',
    icon: <HelpCircle className="w-[1em] h-[1em]" />,
    color: '#94a3b8',
    bg: 'rgba(148,163,184,0.08)',
    border: 'rgba(148,163,184,0.25)',
    glow: 'rgba(148,163,184,0.12)',
    desc: 'Unable to determine the safety of this URL.',
  },
} as const;

const TAG_COLORS = [
  { bg: 'rgba(239,68,68,0.12)',   text: '#ef4444',  border: 'rgba(239,68,68,0.3)'   },
  { bg: 'rgba(249,115,22,0.12)',  text: '#f97316',  border: 'rgba(249,115,22,0.3)'  },
  { bg: 'rgba(234,179,8,0.12)',   text: '#eab308',  border: 'rgba(234,179,8,0.3)'   },
  { bg: 'rgba(168,85,247,0.12)',  text: '#a855f7',  border: 'rgba(168,85,247,0.3)'  },
  { bg: 'rgba(59,130,246,0.12)',  text: '#3b82f6',  border: 'rgba(59,130,246,0.3)'  },
];

export default function UrlSafetyPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UrlSafetyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const check = async () => {
    const trimmed = url.trim();
    if (!trimmed) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch(`/api/network/url-safety?url=${encodeURIComponent(trimmed)}`);
      const data: UrlSafetyResult | ApiError = await res.json();

      if ('error' in data) {
        setError((data as ApiError).error);
      } else {
        setResult(data as UrlSafetyResult);
      }
    } catch {
      setError('Network error: could not reach the API.');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') check();
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-red-500 opacity-[0.02] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Breadcrumbs */}
        <div className="mb-8 flex items-center gap-2 text-sm font-medium">
          <Link href="/" className="text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] transition-colors">
            Home
          </Link>
          <span className="text-[rgb(var(--c-mute))]">/</span>
          <Link href="/tools" className="text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] transition-colors">
            Tools
          </Link>
          <span className="text-[rgb(var(--c-mute))]">/</span>
          <span className="text-[rgb(var(--c-ink))]">URL Safety</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}>
              <svg className="w-5 h-5" style={{ color: '#ef4444' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight">URL Safety Checker</h1>
          </div>
          <p className="text-xl text-[rgb(var(--c-mute))] max-w-2xl">
            Check any URL against URLhaus and PhishTank threat intelligence databases to detect malware, phishing, and scam sites.
          </p>
        </div>

        {/* Input */}
        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <label htmlFor="url-safety-input" className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-3">
            URL to Check
          </label>
          <div className="flex gap-3">
            <input
              id="url-safety-input"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKey}
              placeholder="https://suspicious-site.com"
              className="flex-1 px-4 py-3 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono text-sm"
            />
            <button
              id="url-safety-check-btn"
              onClick={check}
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
                  Checking...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Check URL
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-[rgb(var(--c-mute))] mt-2">URLs are checked against URLhaus (malware) and PhishTank (phishing) databases.</p>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-2xl border p-5 mb-6 flex items-start gap-3" style={{ background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.3)' }}>
            <svg className="w-5 h-5 mt-0.5 shrink-0" style={{ color: '#ef4444' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L3.07 16.5C2.3 17.333 3.262 19 4.802 19z" />
            </svg>
            <div>
              <p className="font-semibold text-sm" style={{ color: '#ef4444' }}>Check Failed</p>
              <p className="text-sm text-[rgb(var(--c-mute))] mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (() => {
          const vc = VERDICT_CONFIG[result.verdict];
          return (
            <div className="space-y-5">
              {/* Verdict Card */}
              <div
                className="glass-card rounded-2xl border backdrop-blur-md p-8 flex flex-col items-center text-center"
                style={{ background: vc.bg, borderColor: vc.border, boxShadow: `0 0 60px ${vc.glow}` }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-4 text-3xl font-black"
                  style={{ background: `${vc.color}22`, border: `2px solid ${vc.color}55`, color: vc.color }}
                >
                  {vc.icon}
                </div>
                <p className="text-4xl font-black tracking-widest mb-2" style={{ color: vc.color }}>{vc.label}</p>
                <p className="text-sm text-[rgb(var(--c-mute))] max-w-md">{vc.desc}</p>
                <p className="font-mono text-xs text-[rgb(var(--c-mute))] mt-3 opacity-60 break-all max-w-full">{result.url}</p>
              </div>

              {/* Tags & Threat */}
              {(result.urlhaus.tags.length > 0 || result.urlhaus.threat) && (
                <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--c-mute))] mb-4">Threat Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {result.urlhaus.threat && (
                      <span
                        className="px-3 py-1.5 rounded-lg text-sm font-semibold"
                        style={{ background: 'rgba(239,68,68,0.12)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}
                      >
                        {result.urlhaus.threat}
                      </span>
                    )}
                    {result.urlhaus.tags.map((tag, i) => {
                      const tc = TAG_COLORS[i % TAG_COLORS.length];
                      return (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium"
                          style={{ background: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Source Rows */}
              <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md overflow-hidden">
                <div className="px-6 py-4 border-b border-[var(--c-glass-border)]" style={{ background: 'rgba(0,0,0,0.2)' }}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--c-mute))]">Intelligence Sources</p>
                </div>

                {/* URLhaus row */}
                <div className="px-6 py-5 border-b border-[var(--c-glass-border)] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)' }}>
                      <svg className="w-4 h-4" style={{ color: '#ef4444' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[rgb(var(--c-ink))]">URLhaus</p>
                      <p className="text-xs text-[rgb(var(--c-mute))]">abuse.ch malware URL database</p>
                    </div>
                  </div>
                  {result.urlhaus.listed ? (
                    <span className="text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5" style={{ color: '#ef4444', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}>
                      <X className="w-3.5 h-3.5" /> Listed
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5" style={{ color: '#22c55e', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)' }}>
                      <Check className="w-3.5 h-3.5" /> Not Listed
                    </span>
                  )}
                </div>

                {/* PhishTank row */}
                <div className="px-6 py-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.1)' }}>
                      <svg className="w-4 h-4" style={{ color: '#3b82f6' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[rgb(var(--c-ink))]">PhishTank</p>
                      <p className="text-xs text-[rgb(var(--c-mute))]">Community phishing URL database</p>
                    </div>
                  </div>
                  {result.phishtank === null ? (
                    <span className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ color: '#94a3b8', background: 'rgba(148,163,184,0.1)', border: '1px solid rgba(148,163,184,0.25)' }}>
                      — Unavailable
                    </span>
                  ) : result.phishtank.listed && result.phishtank.verified ? (
                    <span className="text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5" style={{ color: '#ef4444', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}>
                      <X className="w-3.5 h-3.5" /> Phishing (Verified)
                    </span>
                  ) : result.phishtank.listed ? (
                    <span className="text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5" style={{ color: '#eab308', background: 'rgba(234,179,8,0.12)', border: '1px solid rgba(234,179,8,0.3)' }}>
                      <AlertTriangleIcon className="w-3.5 h-3.5" /> In Database (Unverified)
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5" style={{ color: '#22c55e', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)' }}>
                      <Check className="w-3.5 h-3.5" /> Not Listed
                    </span>
                  )}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-[rgb(var(--c-mute))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-[rgb(var(--c-mute))]">
                  Results are based on third-party threat intelligence databases and may not be exhaustive. A &quot;Safe&quot; result does not guarantee a URL is harmless. Use caution when visiting unknown sites.
                </p>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
