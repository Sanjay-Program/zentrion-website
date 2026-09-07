'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNum, setUseNum] = useState(true);
  const [useSym, setUseSym] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  
  const [password, setPassword] = useState('Click generate...');
  const [entropy, setEntropy] = useState(0);
  const [activeSets, setActiveSets] = useState<string[]>([]);

  const charsUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charsLower = "abcdefghijklmnopqrstuvwxyz";
  const charsNum = "0123456789";
  const charsSym = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  const ambiguous = "il1Lo0O";

  const generatePassword = () => {
    let pool = "";
    let sets: string[] = [];
    if (useUpper) { pool += charsUpper; sets.push("Upper"); }
    if (useLower) { pool += charsLower; sets.push("Lower"); }
    if (useNum) { pool += charsNum; sets.push("Num"); }
    if (useSym) { pool += charsSym; sets.push("Sym"); }

    if (pool === "") {
      setPassword("Error: Select at least one character set.");
      return;
    }

    if (excludeAmbiguous) {
      pool = pool.split('').filter(c => !ambiguous.includes(c)).join('');
    }

    // Web Crypto API Rejection Sampling
    const pwdArray = new Uint8Array(length);
    let pwd = "";
    const maxValid = 256 - (256 % pool.length);
    
    let i = 0;
    while(i < length) {
      const randomArr = new Uint8Array(1);
      crypto.getRandomValues(randomArr);
      if (randomArr[0] < maxValid) {
        pwd += pool[randomArr[0] % pool.length];
        i++;
      }
    }

    setPassword(pwd);
    setActiveSets(sets);
    setEntropy(length * Math.log2(pool.length));
  };

  const copyToClipboard = () => {
    if (password && !password.includes('Error') && password !== 'Click generate...') {
      navigator.clipboard.writeText(password);
      // Optional: add toast logic here
    }
  };

  // Generate initially on mount
  useEffect(() => {
    generatePassword();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Secure Password Generator</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Generate cryptographically secure passwords locally using Web Crypto APIs.</p>
          <div className="mt-4">
            <span className="inline-block px-3 py-1 bg-[rgba(255,255,255,0.05)] text-xs font-mono tracking-wider rounded-md border border-[rgba(255,255,255,0.1)]">
              LOCAL ONLY
            </span>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 md:p-8">
          
          <div className="bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] rounded-xl p-6 mb-8 text-center relative group">
            <div className="font-mono text-2xl md:text-4xl text-[rgb(var(--c-accent))] break-all mb-4 selection:bg-[rgb(var(--c-accent))] selection:text-white">
              {password}
            </div>
            <button 
              onClick={copyToClipboard}
              className="absolute top-4 right-4 text-xs font-bold uppercase tracking-wider bg-[rgba(255,255,255,0.1)] px-3 py-1 rounded hover:bg-[rgb(var(--c-accent))] transition-colors"
            >
              Copy
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Password Length</label>
                  <span className="font-mono text-[rgb(var(--c-accent))]">{length}</span>
                </div>
                <input 
                  type="range" 
                  min="8" 
                  max="128" 
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full accent-[rgb(var(--c-accent))]"
                />
              </div>

              <div className="space-y-4">
                {[
                  { id: 'upper', label: 'Uppercase (A-Z)', state: useUpper, setState: setUseUpper },
                  { id: 'lower', label: 'Lowercase (a-z)', state: useLower, setState: setUseLower },
                  { id: 'num', label: 'Numbers (0-9)', state: useNum, setState: setUseNum },
                  { id: 'sym', label: 'Symbols (!@#$)', state: useSym, setState: setUseSym },
                  { id: 'ambig', label: 'Exclude Ambiguous (i, l, 1, L, o, 0, O)', state: excludeAmbiguous, setState: setExcludeAmbiguous },
                ].map((opt) => (
                  <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={opt.state} 
                      onChange={(e) => opt.setState(e.target.checked)}
                      className="w-5 h-5 rounded border-[rgba(255,255,255,0.2)] bg-[rgba(0,0,0,0.3)] text-[rgb(var(--c-accent))] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-sm group-hover:text-[rgb(var(--c-accent))] transition-colors">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-[rgba(0,0,0,0.2)] rounded-xl p-6 border border-[rgba(255,255,255,0.05)]">
              <h4 className="text-[rgb(var(--c-mute))] text-sm uppercase tracking-wider mb-4">Password Info</h4>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-[rgba(255,255,255,0.05)]">
                    <td className="py-2 text-[rgb(var(--c-mute))]">Length</td>
                    <td className="py-2 text-right font-mono">{length}</td>
                  </tr>
                  <tr className="border-b border-[rgba(255,255,255,0.05)]">
                    <td className="py-2 text-[rgb(var(--c-mute))]">Character Sets</td>
                    <td className="py-2 text-right font-mono">{activeSets.join(', ')}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-[rgb(var(--c-mute))]">Estimated Entropy</td>
                    <td className="py-2 text-right font-mono text-[rgb(var(--c-accent))]">{entropy.toFixed(1)} bits</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 text-xs text-[rgb(var(--c-mute))]">
                * Entropy &gt; 80 bits is considered very strong against offline brute-force attacks.
              </div>
            </div>
          </div>

          <button 
            onClick={generatePassword}
            className="w-full bg-[rgb(var(--c-accent))] text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-[rgb(var(--c-accent))]/20"
          >
            Generate New Password
          </button>
        </div>
      </div>
    </div>
  );
}
