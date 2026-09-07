'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [entropy, setEntropy] = useState(0);

  const generatePassword = useCallback(() => {
    let charset = '';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (includeUppercase) charset += upper;
    if (includeLowercase) charset += lower;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (charset.length === 0) {
      setPassword('');
      setEntropy(0);
      return;
    }

    // Use Web Crypto API for secure random generation
    const randomArray = new Uint32Array(length);
    window.crypto.getRandomValues(randomArray);

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += charset[randomArray[i] % charset.length];
    }

    setPassword(generatedPassword);
    
    // Calculate Shannon entropy: E = L * log2(R)
    // where L is length and R is the pool size (charset.length)
    const currentEntropy = length * Math.log2(charset.length);
    setEntropy(Math.round(currentEntropy));
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getEntropyColor = () => {
    if (entropy < 40) return 'text-red-400 bg-red-400/10 border-red-400/20';
    if (entropy < 60) return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    if (entropy < 80) return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    return 'text-green-400 bg-green-400/10 border-green-400/20';
  };

  const getEntropyLabel = () => {
    if (entropy < 40) return 'Very Weak';
    if (entropy < 60) return 'Weak';
    if (entropy < 80) return 'Strong';
    return 'Very Strong';
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Password Generator</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Generate cryptographically secure passwords locally in your browser.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          <div className="lg:col-span-3 space-y-6">
            <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8">
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[rgb(var(--c-ink))] font-semibold">Generated Password</h3>
                <button
                  onClick={generatePassword}
                  className="p-2 text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] transition-colors rounded-full hover:bg-[rgba(255,255,255,0.05)]"
                  title="Regenerate"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </button>
              </div>

              <div className="relative group">
                <div className="w-full bg-[rgba(17,17,17,0.05)] dark:bg-[rgba(0,0,0,0.3)] border border-[var(--c-glass-border)] rounded-xl p-6 min-h-[120px] flex items-center justify-center break-all transition-all group-hover:border-[rgba(255,255,255,0.3)]">
                  <span className="font-mono text-3xl text-[rgb(var(--c-accent))] leading-relaxed text-center tracking-wider">
                    {password || <span className="text-[rgb(var(--c-mute))] text-xl">Select character types...</span>}
                  </span>
                </div>
                
                <button
                  onClick={copyToClipboard}
                  disabled={!password}
                  className={`absolute right-4 bottom-4 px-4 py-2 rounded-lg text-sm font-semibold shadow-lg transition-all flex items-center gap-2 ${
                    copied 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-black hover:bg-gray-200 opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0'
                  }`}
                >
                  {copied ? (
                    <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Copied!</>
                  ) : (
                    <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Copy</>
                  )}
                </button>
              </div>

              {password && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[rgb(var(--c-mute))]">Entropy:</span>
                    <span className="font-mono text-[rgb(var(--c-ink))] text-lg">{entropy} bits</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getEntropyColor()}`}>
                    {getEntropyLabel()}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <svg className="w-5 h-5 text-green-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <div>
                <h4 className="text-sm font-semibold text-green-400">Zero Trust Generation</h4>
                <p className="text-xs text-green-400/80 mt-1">This tool uses <code>crypto.getRandomValues()</code> to generate numbers with mathematical randomness. Your password is never sent to any server.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8">
              <h3 className="text-[rgb(var(--c-ink))] font-semibold mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-[rgb(var(--c-accent))]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                Parameters
              </h3>

              <div className="space-y-6">
                
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-semibold text-[rgb(var(--c-ink))]">Password Length</label>
                    <span className="text-[rgb(var(--c-accent))] font-mono text-xl">{length}</span>
                  </div>
                  <input 
                    type="range" 
                    min="8" 
                    max="128" 
                    value={length} 
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full h-2 bg-[rgba(255,255,255,0.1)] rounded-lg appearance-none cursor-pointer accent-[rgb(var(--c-accent))]"
                  />
                  <div className="flex justify-between text-xs text-[rgb(var(--c-mute))] mt-2 font-mono">
                    <span>8</span>
                    <span>64</span>
                    <span>128</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-[var(--c-glass-border)]">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-[rgb(var(--c-mute))] group-hover:text-[rgb(var(--c-ink))] transition-colors flex items-center gap-2">
                      <span className="w-6 text-center font-mono text-white bg-[rgba(255,255,255,0.05)] rounded">A</span> 
                      Uppercase
                    </span>
                    <div className="relative">
                      <input type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} className="sr-only" />
                      <div className={`block w-12 h-7 rounded-full transition-colors ${includeUppercase ? 'bg-[rgb(var(--c-accent))]' : 'bg-[rgba(255,255,255,0.1)]'}`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${includeUppercase ? 'translate-x-5' : ''}`}></div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-[rgb(var(--c-mute))] group-hover:text-[rgb(var(--c-ink))] transition-colors flex items-center gap-2">
                      <span className="w-6 text-center font-mono text-white bg-[rgba(255,255,255,0.05)] rounded">a</span> 
                      Lowercase
                    </span>
                    <div className="relative">
                      <input type="checkbox" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} className="sr-only" />
                      <div className={`block w-12 h-7 rounded-full transition-colors ${includeLowercase ? 'bg-[rgb(var(--c-accent))]' : 'bg-[rgba(255,255,255,0.1)]'}`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${includeLowercase ? 'translate-x-5' : ''}`}></div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-[rgb(var(--c-mute))] group-hover:text-[rgb(var(--c-ink))] transition-colors flex items-center gap-2">
                      <span className="w-6 text-center font-mono text-white bg-[rgba(255,255,255,0.05)] rounded">1</span> 
                      Numbers
                    </span>
                    <div className="relative">
                      <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} className="sr-only" />
                      <div className={`block w-12 h-7 rounded-full transition-colors ${includeNumbers ? 'bg-[rgb(var(--c-accent))]' : 'bg-[rgba(255,255,255,0.1)]'}`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${includeNumbers ? 'translate-x-5' : ''}`}></div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-[rgb(var(--c-mute))] group-hover:text-[rgb(var(--c-ink))] transition-colors flex items-center gap-2">
                      <span className="w-6 text-center font-mono text-white bg-[rgba(255,255,255,0.05)] rounded">#</span> 
                      Symbols
                    </span>
                    <div className="relative">
                      <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} className="sr-only" />
                      <div className={`block w-12 h-7 rounded-full transition-colors ${includeSymbols ? 'bg-[rgb(var(--c-accent))]' : 'bg-[rgba(255,255,255,0.1)]'}`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${includeSymbols ? 'translate-x-5' : ''}`}></div>
                    </div>
                  </label>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
