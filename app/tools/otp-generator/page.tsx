'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

// ─── Base32 decode (RFC 4648) ───────────────────────────────────────────────

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function base32Decode(encoded: string): Uint8Array {
  const input = encoded.toUpperCase().replace(/=+$/, '').replace(/\s/g, '');
  const output: number[] = [];
  let bits = 0;
  let value = 0;

  for (const char of input) {
    const idx = BASE32_ALPHABET.indexOf(char);
    if (idx === -1) throw new Error(`Invalid Base32 character: ${char}`);
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      output.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return new Uint8Array(output);
}

// ─── TOTP (RFC 6238) ───────────────────────────────────────────────────────

const TOTP_PERIOD = 30;
const TOTP_DIGITS = 6;

function getTimeCounter(offset = 0): number {
  return Math.floor((Date.now() / 1000 + offset) / TOTP_PERIOD);
}

function counterToBytes(counter: number): Uint8Array {
  const buf = new Uint8Array(8);
  // Big-endian 64-bit integer
  let c = counter;
  for (let i = 7; i >= 0; i--) {
    buf[i] = c & 0xff;
    c = Math.floor(c / 256);
  }
  return buf;
}

async function computeHOTP(secret: Uint8Array, counter: number): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    secret,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );
  const msg = counterToBytes(counter);
  const sigBuf = await crypto.subtle.sign('HMAC', key, msg);
  const sig = new Uint8Array(sigBuf);

  // Dynamic truncation
  const offset = sig[sig.length - 1] & 0x0f;
  const code =
    ((sig[offset] & 0x7f) << 24) |
    ((sig[offset + 1] & 0xff) << 16) |
    ((sig[offset + 2] & 0xff) << 8) |
    (sig[offset + 3] & 0xff);

  return String(code % Math.pow(10, TOTP_DIGITS)).padStart(TOTP_DIGITS, '0');
}

async function getTOTP(secretB32: string, counterOffset = 0): Promise<string> {
  const secret = base32Decode(secretB32);
  const counter = getTimeCounter(counterOffset * TOTP_PERIOD);
  return computeHOTP(secret, counter);
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function getSecondsRemaining(): number {
  return TOTP_PERIOD - (Math.floor(Date.now() / 1000) % TOTP_PERIOD);
}

function formatCode(code: string): string {
  return `${code.slice(0, 3)} ${code.slice(3)}`;
}

// ─── Component ─────────────────────────────────────────────────────────────

type Tab = 'totp' | 'static';

const DIGIT_OPTIONS = [4, 6, 8, 10] as const;

export default function OtpGeneratorPage() {
  const [activeTab, setActiveTab] = useState<Tab>('totp');

  // TOTP state
  const [totpSecret, setTotpSecret] = useState('JBSWY3DPEHPK3PXP');
  const [totpCode, setTotpCode] = useState('');
  const [totpNext, setTotpNext] = useState('');
  const [totpError, setTotpError] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(getSecondsRemaining());
  const [totpCopied, setTotpCopied] = useState(false);
  const totpIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Static OTP state
  const [staticDigits, setStaticDigits] = useState<(typeof DIGIT_OPTIONS)[number]>(6);
  const [staticOtp, setStaticOtp] = useState('');
  const [staticCopied, setStaticCopied] = useState(false);

  // ── TOTP logic ────────────────────────────────────────────────────────────

  const refreshTOTP = useCallback(async (secret: string) => {
    setTotpError('');
    if (!secret.trim()) { setTotpCode(''); setTotpNext(''); return; }
    try {
      const [current, next] = await Promise.all([
        getTOTP(secret),
        getTOTP(secret, 1),
      ]);
      setTotpCode(current);
      setTotpNext(next);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setTotpError(`Invalid Base32 secret: ${msg}`);
      setTotpCode('');
      setTotpNext('');
    }
  }, []);

  // Refresh on mount and whenever secret changes
  useEffect(() => {
    refreshTOTP(totpSecret);
  }, [totpSecret, refreshTOTP]);

  // Tick every second; refresh TOTP on period boundary
  useEffect(() => {
    totpIntervalRef.current = setInterval(() => {
      const secs = getSecondsRemaining();
      setSecondsLeft(secs);
      if (secs === TOTP_PERIOD) {
        refreshTOTP(totpSecret);
      }
    }, 1000);
    return () => {
      if (totpIntervalRef.current) clearInterval(totpIntervalRef.current);
    };
  }, [totpSecret, refreshTOTP]);

  const handleCopyTotp = async () => {
    if (!totpCode) return;
    await navigator.clipboard.writeText(totpCode.replace(' ', ''));
    setTotpCopied(true);
    setTimeout(() => setTotpCopied(false), 2000);
  };

  // ── Static OTP logic ──────────────────────────────────────────────────────

  const generateStaticOTP = () => {
    const max = Math.pow(10, staticDigits);
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    const code = String(arr[0] % max).padStart(staticDigits, '0');
    setStaticOtp(code);
    setStaticCopied(false);
  };

  const handleCopyStatic = async () => {
    if (!staticOtp) return;
    await navigator.clipboard.writeText(staticOtp);
    setStaticCopied(true);
    setTimeout(() => setStaticCopied(false), 2000);
  };

  // ── Progress bar percentage ───────────────────────────────────────────────
  const progressPct = ((TOTP_PERIOD - secondsLeft) / TOTP_PERIOD) * 100;
  const isUrgent = secondsLeft <= 5;

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.04] blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Back link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[rgba(var(--c-accent),0.15)] border border-[rgba(var(--c-accent),0.3)] flex items-center justify-center">
              <svg className="w-5 h-5 text-[rgb(var(--c-accent))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--c-accent))] opacity-70">RFC 6238 · HMAC-SHA1 · PBKDF2-free</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-3">OTP / TOTP Generator</h1>
          <p className="text-lg text-[rgb(var(--c-mute))]">
            Generate Time-Based or Static one-time passwords — 100% client-side.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-2 mb-6 flex gap-2">
          {([['totp', '⏱ TOTP (Time-Based)'], ['static', '🔢 Static OTP']] as [Tab, string][]).map(([tab, label]) => (
            <button
              key={tab}
              id={`otp-tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))] shadow-lg'
                  : 'text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-ink))] hover:bg-[rgba(255,255,255,0.04)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── TOTP Tab ── */}
        {activeTab === 'totp' && (
          <div className="space-y-5">
            {/* Secret input */}
            <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8">
              <label htmlFor="totp-secret" className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-2">
                Base32 Secret Key
              </label>
              <input
                id="totp-secret"
                type="text"
                value={totpSecret}
                onChange={(e) => setTotpSecret(e.target.value.replace(/\s/g, '').toUpperCase())}
                placeholder="e.g. JBSWY3DPEHPK3PXP"
                spellCheck={false}
                autoComplete="off"
                className="w-full px-4 py-3 bg-[rgba(0,0,0,0.25)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono text-sm tracking-widest"
              />
              <p className="mt-2 text-xs text-[rgb(var(--c-mute))]">
                Copy from your authenticator app's secret / setup key. Spaces are ignored.
              </p>
            </div>

            {/* Error */}
            {totpError && (
              <div className="flex items-start gap-3 p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 text-sm">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{totpError}</span>
              </div>
            )}

            {/* Current code + timer */}
            {totpCode && !totpError && (
              <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md overflow-hidden">
                {/* Timer bar */}
                <div className="relative h-1 bg-[rgba(255,255,255,0.06)] overflow-hidden">
                  <div
                    className="h-full transition-all duration-1000 ease-linear"
                    style={{
                      width: `${progressPct}%`,
                      background: isUrgent
                        ? 'rgb(239 68 68)'
                        : 'rgb(var(--c-accent))',
                    }}
                  />
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--c-mute))]">Current Code</span>
                    <div className="flex items-center gap-2">
                      {/* Countdown ring */}
                      <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="13" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                        <circle
                          cx="16"
                          cy="16"
                          r="13"
                          fill="none"
                          stroke={isUrgent ? 'rgb(239 68 68)' : 'rgb(var(--c-accent))'}
                          strokeWidth="3"
                          strokeDasharray={`${2 * Math.PI * 13}`}
                          strokeDashoffset={`${2 * Math.PI * 13 * (1 - secondsLeft / TOTP_PERIOD)}`}
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
                        />
                      </svg>
                      <span
                        className="text-2xl font-bold font-mono tabular-nums"
                        style={{ color: isUrgent ? 'rgb(239 68 68)' : 'rgb(var(--c-accent))' }}
                      >
                        {secondsLeft}
                      </span>
                    </div>
                  </div>

                  {/* Code display */}
                  <div className="flex items-center justify-between">
                    <span
                      id="totp-current-code"
                      className="text-5xl sm:text-6xl font-bold font-mono tracking-[0.2em] tabular-nums"
                      style={{ color: isUrgent ? 'rgb(239 68 68)' : 'rgb(var(--c-ink))' }}
                    >
                      {formatCode(totpCode)}
                    </span>
                    <button
                      id="totp-copy-btn"
                      onClick={handleCopyTotp}
                      className="ml-4 px-4 py-2 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] rounded-xl text-sm transition-all flex items-center gap-2"
                    >
                      {totpCopied ? (
                        <><svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-green-400">Copied!</span></>
                      ) : (
                        <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy</>
                      )}
                    </button>
                  </div>

                  {/* Next code */}
                  <div className="mt-6 pt-5 border-t border-[var(--c-glass-border)] flex items-center justify-between">
                    <span className="text-xs text-[rgb(var(--c-mute))] uppercase tracking-widest font-semibold">Next Code</span>
                    <span id="totp-next-code" className="text-2xl font-mono text-[rgb(var(--c-mute))] tracking-[0.2em] tabular-nums">
                      {formatCode(totpNext)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Info */}
            <div className="p-5 rounded-2xl border border-[var(--c-glass-border)] bg-[rgba(var(--c-accent),0.03)]">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--c-accent))] mb-3">How TOTP works</h4>
              <ul className="space-y-1.5 text-xs text-[rgb(var(--c-mute))]">
                <li>• <strong className="text-[rgb(var(--c-ink))]">Standard:</strong> RFC 6238 (TOTP) / RFC 4226 (HOTP)</li>
                <li>• <strong className="text-[rgb(var(--c-ink))]">Algorithm:</strong> HMAC-SHA1 with 30-second time windows</li>
                <li>• <strong className="text-[rgb(var(--c-ink))]">Digits:</strong> 6-digit code, compatible with Google Authenticator</li>
                <li>• <strong className="text-[rgb(var(--c-ink))]">Privacy:</strong> Your secret never leaves your browser</li>
              </ul>
            </div>
          </div>
        )}

        {/* ── Static OTP Tab ── */}
        {activeTab === 'static' && (
          <div className="space-y-5">
            <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 space-y-6">
              {/* Digit length selector */}
              <div>
                <label className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-3">
                  OTP Length
                </label>
                <div className="flex gap-3 flex-wrap">
                  {DIGIT_OPTIONS.map((d) => (
                    <button
                      key={d}
                      id={`static-digits-${d}`}
                      onClick={() => { setStaticDigits(d); setStaticOtp(''); }}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                        staticDigits === d
                          ? 'bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))] shadow-lg scale-105'
                          : 'bg-[rgba(255,255,255,0.05)] border border-[var(--c-glass-border)] text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-ink))] hover:bg-[rgba(255,255,255,0.08)]'
                      }`}
                    >
                      {d} digits
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate button */}
              <button
                id="static-generate-btn"
                onClick={generateStaticOTP}
                className="w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))] hover:opacity-90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Generate OTP
              </button>
            </div>

            {/* Output */}
            {staticOtp && (
              <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md overflow-hidden">
                <div className="px-6 py-4 border-b border-[var(--c-glass-border)] flex justify-between items-center">
                  <h3 className="text-[rgb(var(--c-accent))] font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Generated OTP ({staticDigits} digits)
                  </h3>
                  <button
                    id="static-copy-btn"
                    onClick={handleCopyStatic}
                    className="text-xs px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] rounded-lg text-[rgb(var(--c-ink))] transition-all flex items-center gap-1.5"
                  >
                    {staticCopied ? (
                      <><svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-green-400">Copied!</span></>
                    ) : (
                      <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy</>
                    )}
                  </button>
                </div>
                <div className="p-8 bg-[rgba(0,0,0,0.2)] flex justify-center">
                  <span
                    id="static-otp-display"
                    className="text-5xl sm:text-6xl font-bold font-mono tracking-[0.25em] tabular-nums text-[rgb(var(--c-ink))]"
                  >
                    {staticOtp}
                  </span>
                </div>
              </div>
            )}

            {/* Info */}
            <div className="p-5 rounded-2xl border border-[var(--c-glass-border)] bg-[rgba(var(--c-accent),0.03)]">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--c-accent))] mb-3">Security note</h4>
              <ul className="space-y-1.5 text-xs text-[rgb(var(--c-mute))]">
                <li>• Uses <strong className="text-[rgb(var(--c-ink))]">crypto.getRandomValues()</strong> — cryptographically secure randomness</li>
                <li>• Static OTPs are single-use by convention; do not reuse them</li>
                <li>• For authentication systems, prefer TOTP over static OTPs</li>
                <li>• 100% client-side — no data is sent to any server</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
