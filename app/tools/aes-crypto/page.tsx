'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';

// ─── Crypto helpers (Web Crypto API only) ──────────────────────────────────

const PBKDF2_ITERATIONS = 100_000;
const SALT_BYTES = 16;
const IV_BYTES = 12;

function buf2b64(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

function b64toBuf(b64: string): Uint8Array {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

async function deriveKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function encryptText(plaintext: string, passphrase: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const key = await deriveKey(passphrase, salt);
  const enc = new TextEncoder();
  const cipherBuf = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(plaintext)
  );
  // Format: base64(salt) + '.' + base64(iv) + '.' + base64(ciphertext)
  return `${buf2b64(salt)}.${buf2b64(iv)}.${buf2b64(cipherBuf)}`;
}

async function decryptText(payload: string, passphrase: string): Promise<string> {
  const parts = payload.trim().split('.');
  if (parts.length !== 3) throw new Error('Invalid ciphertext format.');
  const [saltB64, ivB64, cipherB64] = parts;
  const salt = b64toBuf(saltB64);
  const iv = b64toBuf(ivB64);
  const cipher = b64toBuf(cipherB64);
  const key = await deriveKey(passphrase, salt);
  const decBuf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, cipher);
  return new TextDecoder().decode(decBuf);
}

// ─── Component ─────────────────────────────────────────────────────────────

type Mode = 'encrypt' | 'decrypt';

export default function AesCryptoPage() {
  const [mode, setMode] = useState<Mode>('encrypt');
  const [inputText, setInputText] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleProcess = useCallback(async () => {
    setError('');
    setOutput('');
    if (!inputText.trim()) { setError('Please enter some text.'); return; }
    if (!passphrase) { setError('Please enter a passphrase.'); return; }
    setLoading(true);
    try {
      if (mode === 'encrypt') {
        const result = await encryptText(inputText, passphrase);
        setOutput(result);
      } else {
        const result = await decryptText(inputText, passphrase);
        setOutput(result);
      }
    } catch {
      setError(
        mode === 'decrypt'
          ? 'Decryption failed — wrong passphrase or corrupted ciphertext.'
          : 'Encryption failed — unexpected error.'
      );
    } finally {
      setLoading(false);
    }
  }, [mode, inputText, passphrase]);

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setInputText('');
    setOutput('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.04] blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--c-accent))] opacity-70">AES-GCM · 256-bit · PBKDF2</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-3">AES Encrypt / Decrypt</h1>
          <p className="text-lg text-[rgb(var(--c-mute))]">
            Military-grade AES-GCM 256-bit encryption using PBKDF2 key derivation — entirely in your browser.
          </p>
        </div>

        {/* Mode toggle */}
        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-2 mb-6 flex gap-2">
          {(['encrypt', 'decrypt'] as Mode[]).map((m) => (
            <button
              key={m}
              id={`aes-mode-${m}`}
              onClick={() => switchMode(m)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold uppercase tracking-widest transition-all duration-200 ${
                mode === m
                  ? 'bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))] shadow-lg'
                  : 'text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-ink))] hover:bg-[rgba(255,255,255,0.04)]'
              }`}
            >
              {m === 'encrypt' ? '🔒 Encrypt' : '🔓 Decrypt'}
            </button>
          ))}
        </div>

        {/* Input card */}
        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 mb-5 space-y-6">
          {/* Plaintext / Ciphertext */}
          <div>
            <label htmlFor="aes-input" className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-2">
              {mode === 'encrypt' ? 'Plaintext' : 'Ciphertext'}
            </label>
            <textarea
              id="aes-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                mode === 'encrypt'
                  ? 'Enter the text you want to encrypt…'
                  : 'Paste the encrypted payload (salt.iv.ciphertext)…'
              }
              rows={6}
              className="w-full px-4 py-4 bg-[rgba(0,0,0,0.25)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono text-sm resize-none"
            />
          </div>

          {/* Passphrase */}
          <div>
            <label htmlFor="aes-passphrase" className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-2">
              Passphrase
            </label>
            <div className="relative">
              <input
                id="aes-passphrase"
                type={showPass ? 'text' : 'password'}
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="Enter a strong passphrase…"
                className="w-full px-4 py-3 pr-12 bg-[rgba(0,0,0,0.25)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono text-sm"
              />
              <button
                id="aes-toggle-pass"
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-ink))] transition-colors p-1"
                aria-label={showPass ? 'Hide passphrase' : 'Show passphrase'}
              >
                {showPass ? (
                  // Eye-off
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  // Eye
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <p className="mt-2 text-xs text-[rgb(var(--c-mute))]">
              Key derived via PBKDF2-SHA256 · 100,000 iterations · random 128-bit salt
            </p>
          </div>

          {/* Action button */}
          <button
            id="aes-process-btn"
            onClick={handleProcess}
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))] hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Processing…
              </>
            ) : mode === 'encrypt' ? (
              '🔒 Encrypt'
            ) : (
              '🔓 Decrypt'
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 flex items-start gap-3 p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 text-sm">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Output card */}
        {output && (
          <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--c-glass-border)] flex justify-between items-center">
              <h3 className="text-[rgb(var(--c-accent))] font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                {mode === 'encrypt' ? 'Encrypted Output' : 'Decrypted Output'}
              </h3>
              <button
                id="aes-copy-btn"
                onClick={handleCopy}
                className="text-xs px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] rounded-lg text-[rgb(var(--c-ink))] transition-all flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="p-6 bg-[rgba(0,0,0,0.2)]">
              <p className="font-mono text-[rgb(var(--c-ink))] text-sm break-all leading-relaxed">{output}</p>
            </div>
          </div>
        )}

        {/* Info footer */}
        <div className="mt-8 p-5 rounded-2xl border border-[var(--c-glass-border)] bg-[rgba(var(--c-accent),0.03)]">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--c-accent))] mb-3">How it works</h4>
          <ul className="space-y-1.5 text-xs text-[rgb(var(--c-mute))]">
            <li>• <strong className="text-[rgb(var(--c-ink))]">Algorithm:</strong> AES-GCM 256-bit with authenticated encryption (prevents tampering)</li>
            <li>• <strong className="text-[rgb(var(--c-ink))]">Key derivation:</strong> PBKDF2 with SHA-256, 100,000 iterations, 128-bit random salt</li>
            <li>• <strong className="text-[rgb(var(--c-ink))]">IV:</strong> 96-bit random initialisation vector, unique per encryption</li>
            <li>• <strong className="text-[rgb(var(--c-ink))]">Output format:</strong> <code className="font-mono bg-[rgba(255,255,255,0.06)] px-1 py-0.5 rounded">base64(salt).base64(iv).base64(ciphertext+tag)</code></li>
            <li>• <strong className="text-[rgb(var(--c-ink))]">Privacy:</strong> 100% client-side — nothing is transmitted or stored</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
