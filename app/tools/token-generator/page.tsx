'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TokenGeneratorPage() {
  const [length, setLength] = useState(64);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [token, setToken] = useState('');
  const [copied, setCopied] = useState(false);

  const generateToken = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      setToken('');
      return;
    }

    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset[randomValues[i] % charset.length];
    }

    setToken(result);
    setCopied(false);
  };

  useEffect(() => {
    generateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    if (!token) return;
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
            Security Utility
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">API Key & Token Generator</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Generate cryptographically secure randomized tokens for API keys, salts, and nonces.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-10 mb-8">
          
          <div className="mb-8 p-6 bg-[rgba(0,0,0,0.3)] rounded-xl border border-[rgba(255,255,255,0.05)] relative group break-all min-h-[100px] flex items-center justify-center">
            {token ? (
              <div className="font-mono text-2xl md:text-3xl text-[rgb(var(--c-accent))] text-center tracking-wider">
                {token}
              </div>
            ) : (
              <div className="text-[rgb(var(--c-mute))]">Please select at least one character set.</div>
            )}

            <button
              onClick={copyToClipboard}
              disabled={!token}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-all ${
                copied 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.2)] opacity-0 group-hover:opacity-100'
              }`}
            >
              {copied ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-semibold text-white mb-4">Token Length ({length})</label>
              <input
                type="range"
                min="16"
                max="256"
                step="8"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full accent-[rgb(var(--c-accent))]"
              />
              <div className="flex justify-between text-xs text-[rgb(var(--c-mute))] mt-2">
                <span>16 chars</span>
                <span>128 chars</span>
                <span>256 chars</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} className="sr-only" />
                  <div className={`block w-10 h-6 rounded-full transition-colors ${includeUppercase ? 'bg-[rgb(var(--c-accent))]' : 'bg-[rgba(255,255,255,0.1)]'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${includeUppercase ? 'translate-x-4' : ''}`}></div>
                </div>
                <span className="text-sm text-white font-medium">Uppercase (A-Z)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} className="sr-only" />
                  <div className={`block w-10 h-6 rounded-full transition-colors ${includeLowercase ? 'bg-[rgb(var(--c-accent))]' : 'bg-[rgba(255,255,255,0.1)]'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${includeLowercase ? 'translate-x-4' : ''}`}></div>
                </div>
                <span className="text-sm text-white font-medium">Lowercase (a-z)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} className="sr-only" />
                  <div className={`block w-10 h-6 rounded-full transition-colors ${includeNumbers ? 'bg-[rgb(var(--c-accent))]' : 'bg-[rgba(255,255,255,0.1)]'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${includeNumbers ? 'translate-x-4' : ''}`}></div>
                </div>
                <span className="text-sm text-white font-medium">Numbers (0-9)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} className="sr-only" />
                  <div className={`block w-10 h-6 rounded-full transition-colors ${includeSymbols ? 'bg-[rgb(var(--c-accent))]' : 'bg-[rgba(255,255,255,0.1)]'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${includeSymbols ? 'translate-x-4' : ''}`}></div>
                </div>
                <span className="text-sm text-white font-medium">Symbols (!@#$)</span>
              </label>
            </div>
          </div>

          <button
            onClick={generateToken}
            className="btn-primary py-3 px-8 w-full sm:w-auto mx-auto flex justify-center items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Generate New Token
          </button>

        </div>

      </div>
    </div>
  );
}
