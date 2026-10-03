'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function ScenarioBuilder() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [flag, setFlag] = useState('');
  
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const generateScenario = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hash the flag so it's not visible in the URL
    const msgBuffer = new TextEncoder().encode(flag.trim());
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const flagHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const payload = {
      t: title.trim(),
      d: description.trim(),
      h: flagHash
    };

    const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
    
    // Use window.location.origin for absolute URL
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    setShareUrl(`${baseUrl}/scenario-builder/play?c=${encoded}`);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Breadcrumbs />
      <div className="container-x py-12 md:py-20 min-h-screen">
        <header className="mb-14">
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4 text-[rgb(var(--c-ink))]">
            Community Scenario Builder
          </h1>
          <p className="text-lg text-[rgb(var(--c-mute))] max-w-2xl">
            Create your own custom Capture The Flag (CTF) challenges and share them with the world. 
            Powered by a zero-backend architecture.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="glass-card p-8 rounded-2xl border border-line">
            <form onSubmit={generateScenario} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Challenge Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-void border border-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan"
                  placeholder="e.g., Hidden Directory Bypass"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Challenge Brief (Markdown Supported)</label>
                <textarea 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full bg-void border border-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan resize-none min-h-[150px]"
                  placeholder="Describe the scenario and provide links to external resources or vulnerable IP addresses..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">The Flag</label>
                <p className="text-xs text-mute mb-3">Your flag is securely hashed (SHA-256) inside the browser before generating the URL.</p>
                <input 
                  type="text" 
                  value={flag}
                  onChange={e => setFlag(e.target.value)}
                  className="w-full bg-void border border-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan font-mono"
                  placeholder="ZENTRION{...}"
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full py-3">
                Generate Shareable Challenge
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-8 rounded-2xl border border-line bg-surface/30">
              <h3 className="font-bold text-xl mb-4">How it Works (Zero-Backend)</h3>
              <ul className="space-y-4 text-sm text-mute">
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">1.</span>
                  <span>You write the challenge details and flag.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">2.</span>
                  <span>The flag is securely hashed client-side using WebCrypto so it can't be reverse engineered from the URL.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">3.</span>
                  <span>The data is compressed and encoded directly into a URL parameter.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan font-bold">4.</span>
                  <span>You send the URL to a friend, and they play the challenge instantly!</span>
                </li>
              </ul>
            </div>

            {shareUrl && (
              <div className="glass-card p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  Challenge Generated!
                </h3>
                <p className="text-xs text-emerald-100/80 mb-4">Share this unique URL. It contains all the data needed for the challenge.</p>
                
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={shareUrl} 
                    className="flex-1 bg-void border border-emerald-500/30 rounded-lg px-3 py-2 text-xs font-mono text-emerald-100 outline-none"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className="btn-primary py-2 px-4 text-xs shrink-0 bg-emerald-500 hover:bg-emerald-600 text-void border-none"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                
                <div className="mt-4 pt-4 border-t border-emerald-500/20 text-center">
                  <Link href={shareUrl.replace(typeof window !== 'undefined' ? window.location.origin : '', '')} className="text-xs font-bold text-emerald-400 hover:underline">
                    Test your challenge &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
