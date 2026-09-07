'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PasswordBreachPage() {
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [foundCount, setFoundCount] = useState<number | null>(null);

  const checkBreach = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter a password.");
      return;
    }

    setLoading(true);
    setError(null);
    setFoundCount(null);

    try {
      const msgBuffer = new TextEncoder().encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

      const prefix = hashHex.substring(0, 5);
      const suffix = hashHex.substring(5);

      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      
      if (!response.ok) {
        if (response.status === 429) throw new Error("Rate limited by API. Please wait.");
        throw new Error(`API returned status ${response.status}`);
      }

      const text = await response.text();
      const lines = text.split('\n');
      
      let count = 0;
      for (const line of lines) {
        const parts = line.split(':');
        if (parts[0] === suffix) {
          count = parseInt(parts[1].trim(), 10);
          break;
        }
      }

      setFoundCount(count);
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
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Password Breach Checker</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Check if a password has been compromised using k-anonymity privacy protocols.</p>
          <div className="mt-4 flex gap-2">
            <span className="inline-block px-3 py-1 bg-[rgba(255,255,255,0.05)] text-xs font-mono tracking-wider rounded-md border border-[var(--c-glass-border)]">
              EXTERNAL API (K-ANONYMITY)
            </span>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 md:p-8">
          
          <form onSubmit={checkBreach} className="mb-8 relative">
            <label className="block text-sm font-medium mb-2">Password to Check</label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input 
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password to check breach corpus..."
                  className="w-full bg-[rgba(17,17,17,0.05)] dark:bg-[rgba(0,0,0,0.3)] border border-[var(--c-glass-border)] rounded-lg px-4 py-3 pr-20 focus:outline-none focus:border-[rgb(var(--c-accent))] transition-colors"
                />
                <button 
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-2 top-[9px] text-xs font-bold uppercase tracking-wider bg-[rgba(255,255,255,0.1)] px-3 py-1.5 rounded hover:bg-[rgb(var(--c-accent))] transition-colors"
                >
                  {showPwd ? 'Hide' : 'Show'}
                </button>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-[rgb(var(--c-accent))] text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Checking...' : 'Check Database'}
              </button>
            </div>
          </form>

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 mb-6">
              {error}
            </div>
          )}

          {foundCount !== null && (
            <div className={`p-6 rounded-xl border ${foundCount > 0 ? 'bg-red-900/10 border-red-500/30' : 'bg-green-900/10 border-green-500/30'}`}>
              <h4 className="text-xl font-bold font-display mb-2" style={{ color: foundCount > 0 ? 'rgb(var(--c-danger))' : '#4ade80' }}>
                {foundCount > 0 ? '⚠️ Password found in breaches: YES' : '✅ Password found in breaches: NO'}
              </h4>
              <p className="text-lg mb-4">
                Times seen: <strong className="font-mono">{foundCount.toLocaleString()}</strong>
              </p>
              <p className="text-sm text-[rgb(var(--c-mute))]">
                {foundCount > 0 
                  ? "This password has previously appeared in a data breach and should never be used."
                  : "No match was returned by the Have I Been Pwned breach corpus."}
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-[var(--c-glass-border)] text-sm text-[rgb(var(--c-mute))]">
            <strong>Privacy Note:</strong> This tool uses the k-anonymity model. Only the first 5 characters of the SHA-1 hash of your password are sent to the API. Your actual password is never transmitted.
          </div>

        </div>
      </div>
    </div>
  );
}
