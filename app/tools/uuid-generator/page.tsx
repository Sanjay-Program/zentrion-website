'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UuidGeneratorPage() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState<number>(5);
  const [uppercase, setUppercase] = useState(false);
  const [stripHyphens, setStripHyphens] = useState(false);
  const [braces, setBraces] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateUuids = () => {
    try {
      const newUuids = [];
      const numToGenerate = Math.min(Math.max(1, count), 1000); // Max 1000 at a time

      for (let i = 0; i < numToGenerate; i++) {
        let uuid = crypto.randomUUID();

        if (uppercase) uuid = uuid.toUpperCase();
        if (stripHyphens) uuid = uuid.replace(/-/g, '');
        if (braces) uuid = `{${uuid}}`;

        newUuids.push(uuid);
      }

      setUuids(newUuids);
      setCopied(false);
    } catch (err) {
      console.error("crypto.randomUUID not supported in this environment");
      alert("Your browser does not support secure UUID generation.");
    }
  };

  // Generate initial on mount
  useEffect(() => {
    generateUuids();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-regenerate when options change (except count, which has a button)
  useEffect(() => {
    if (uuids.length > 0) {
      generateUuids();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uppercase, stripHyphens, braces]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">UUID (v4) Generator</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Generate cryptographically secure, random Universal Unique Identifiers instantly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6">
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-[rgb(var(--c-accent))]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                Generation Options
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-[rgb(var(--c-mute))] mb-2">Quantity (1 - 1000)</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="1000"
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white focus:outline-none focus:border-[rgb(var(--c-accent))] transition-all"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        checked={uppercase} 
                        onChange={() => setUppercase(!uppercase)}
                        className="sr-only" 
                      />
                      <div className={`block w-10 h-6 rounded-full transition-colors ${uppercase ? 'bg-[rgb(var(--c-accent))]' : 'bg-[rgba(255,255,255,0.1)]'}`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${uppercase ? 'translate-x-4' : ''}`}></div>
                    </div>
                    <span className="text-sm text-[rgba(255,255,255,0.8)] group-hover:text-white transition-colors">Uppercase</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        checked={stripHyphens} 
                        onChange={() => setStripHyphens(!stripHyphens)}
                        className="sr-only" 
                      />
                      <div className={`block w-10 h-6 rounded-full transition-colors ${stripHyphens ? 'bg-[rgb(var(--c-accent))]' : 'bg-[rgba(255,255,255,0.1)]'}`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${stripHyphens ? 'translate-x-4' : ''}`}></div>
                    </div>
                    <span className="text-sm text-[rgba(255,255,255,0.8)] group-hover:text-white transition-colors">Remove Hyphens</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        checked={braces} 
                        onChange={() => setBraces(!braces)}
                        className="sr-only" 
                      />
                      <div className={`block w-10 h-6 rounded-full transition-colors ${braces ? 'bg-[rgb(var(--c-accent))]' : 'bg-[rgba(255,255,255,0.1)]'}`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${braces ? 'translate-x-4' : ''}`}></div>
                    </div>
                    <span className="text-sm text-[rgba(255,255,255,0.8)] group-hover:text-white transition-colors">Wrap in {'{ Braces }'}</span>
                  </label>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={generateUuids}
                    className="w-full btn-primary py-3 rounded-xl flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    Regenerate
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-semibold">Generated Output</h3>
                <button 
                  onClick={copyToClipboard}
                  disabled={uuids.length === 0}
                  className="px-4 py-2 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg text-sm text-white transition-colors flex items-center gap-2"
                >
                  {copied ? (
                    <><svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Copied!</>
                  ) : (
                    <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Copy All</>
                  )}
                </button>
              </div>

              <div className="flex-grow bg-[rgba(0,0,0,0.3)] rounded-xl border border-[rgba(255,255,255,0.05)] overflow-hidden relative">
                <textarea 
                  readOnly 
                  value={uuids.join('\n')}
                  className="w-full h-[400px] lg:h-full p-6 bg-transparent text-[rgb(var(--c-accent))] font-mono text-sm leading-relaxed focus:outline-none resize-none"
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
