'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PasswordStrengthPage() {
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  
  const [entropy, setEntropy] = useState(0);
  const [pool, setPool] = useState(0);
  const [stats, setStats] = useState({ upper: 0, lower: 0, num: 0, sym: 0, repeated: false, seq: false });
  const [strengthLabel, setStrengthLabel] = useState('Enter a password');
  const [strengthColor, setStrengthColor] = useState('var(--c-mute)');
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    if (!password) {
      setEntropy(0);
      setPool(0);
      setStats({ upper: 0, lower: 0, num: 0, sym: 0, repeated: false, seq: false });
      setStrengthLabel('Enter a password');
      setStrengthColor('var(--c-mute)');
      setBarWidth(0);
      return;
    }

    let currentPool = 0;
    let hasUpper = false, hasLower = false, hasNum = false, hasSym = false;

    if (/[a-z]/.test(password)) { currentPool += 26; hasLower = true; }
    if (/[A-Z]/.test(password)) { currentPool += 26; hasUpper = true; }
    if (/[0-9]/.test(password)) { currentPool += 10; hasNum = true; }
    if (/[^a-zA-Z0-9]/.test(password)) { currentPool += 32; hasSym = true; }

    const rawEntropy = currentPool > 0 ? password.length * Math.log2(currentPool) : 0;
    
    const repeated = /(.)\1{2,}/.test(password);
    const seq = /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789|890|012)/i.test(password) || /(qwerty|asdf|zxcv)/i.test(password);

    let effectiveEntropy = rawEntropy;
    if (repeated) effectiveEntropy -= 10;
    if (seq) effectiveEntropy -= 15;
    if (effectiveEntropy < 0) effectiveEntropy = 0;

    let sLabel = 'Very Weak';
    let sColor = 'rgb(var(--c-danger))';
    let width = 20;

    if (effectiveEntropy > 80) { sLabel = 'Very Strong'; sColor = '#4ade80'; width = 100; }
    else if (effectiveEntropy > 60) { sLabel = 'Strong'; sColor = '#16a34a'; width = 80; }
    else if (effectiveEntropy > 40) { sLabel = 'Fair'; sColor = '#fbbf24'; width = 60; }
    else if (effectiveEntropy > 25) { sLabel = 'Weak'; sColor = '#f97316'; width = 40; }

    setPool(currentPool);
    setEntropy(effectiveEntropy);
    setStrengthLabel(sLabel);
    setStrengthColor(sColor);
    setBarWidth(width);
    setStats({
      upper: (password.match(/[A-Z]/g) || []).length,
      lower: (password.match(/[a-z]/g) || []).length,
      num: (password.match(/[0-9]/g) || []).length,
      sym: (password.match(/[^a-zA-Z0-9]/g) || []).length,
      repeated,
      seq
    });
  }, [password]);

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Password Strength</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Analyze password entropy and patterns entirely offline in your browser.</p>
          <div className="mt-4">
            <span className="inline-block px-3 py-1 bg-[rgba(255,255,255,0.05)] text-xs font-mono tracking-wider rounded-md border border-[var(--c-glass-border)]">
              LOCAL ONLY
            </span>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 md:p-8">
          
          <div className="mb-8 relative">
            <label className="block text-sm font-medium mb-2">Enter Password</label>
            <input 
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type a password to analyze..."
              className="w-full bg-[rgba(17,17,17,0.05)] dark:bg-[rgba(0,0,0,0.3)] border border-[var(--c-glass-border)] rounded-lg px-4 py-3 pr-20 focus:outline-none focus:border-[rgb(var(--c-accent))] transition-colors"
            />
            <button 
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-2 top-[34px] text-xs font-bold uppercase tracking-wider bg-[rgba(255,255,255,0.1)] px-3 py-1.5 rounded hover:bg-[rgb(var(--c-accent))] transition-colors"
            >
              {showPwd ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Strength Meter</label>
            <div className="h-3 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden mb-2">
              <div 
                className="h-full transition-all duration-300"
                style={{ width: `${barWidth}%`, backgroundColor: strengthColor }}
              />
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold font-display" style={{ color: strengthColor }}>{strengthLabel}</span>
              <span className="font-mono text-[rgb(var(--c-mute))]">{password.length} characters</span>
            </div>
          </div>

          <div className="bg-[rgba(0,0,0,0.2)] rounded-xl p-6 border border-[var(--c-glass-border)]">
            <h4 className="text-[rgb(var(--c-mute))] mb-4 uppercase tracking-wider text-sm font-bold">Analysis Results</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              <div className="flex justify-between py-2 border-b border-[var(--c-glass-border)]">
                <span className="text-[rgb(var(--c-mute))]">Estimated Entropy</span>
                <span className="font-mono text-[rgb(var(--c-accent))]">{entropy.toFixed(1)} bits</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--c-glass-border)]">
                <span className="text-[rgb(var(--c-mute))]">Character Pool</span>
                <span className="font-mono">{pool}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--c-glass-border)]">
                <span className="text-[rgb(var(--c-mute))]">Uppercase Letters</span>
                <span className="font-mono">{stats.upper}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--c-glass-border)]">
                <span className="text-[rgb(var(--c-mute))]">Lowercase Letters</span>
                <span className="font-mono">{stats.lower}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--c-glass-border)]">
                <span className="text-[rgb(var(--c-mute))]">Numbers</span>
                <span className="font-mono">{stats.num}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--c-glass-border)]">
                <span className="text-[rgb(var(--c-mute))]">Symbols</span>
                <span className="font-mono">{stats.sym}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--c-glass-border)]">
                <span className="text-[rgb(var(--c-mute))]">Repeated Characters</span>
                <span className="font-mono" style={{ color: stats.repeated ? 'rgb(var(--c-danger))' : 'inherit' }}>{stats.repeated ? 'Yes (Penalty)' : 'No'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--c-glass-border)]">
                <span className="text-[rgb(var(--c-mute))]">Sequential Patterns</span>
                <span className="font-mono" style={{ color: stats.seq ? 'rgb(var(--c-danger))' : 'inherit' }}>{stats.seq ? 'Yes (Penalty)' : 'No'}</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-[rgb(var(--c-mute))]">* Estimated entropy is for educational purposes and does not guarantee exact cracking resistance.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
