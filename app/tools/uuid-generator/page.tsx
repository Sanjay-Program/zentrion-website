'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UuidGeneratorPage() {
  const [count, setCount] = useState(5);
  const [format, setFormat] = useState<'standard' | 'uppercase' | 'no-hyphens' | 'braces'>('standard');
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateUuids = () => {
    const newUuids = [];
    const safeCount = Math.min(Math.max(1, count), 1000); // Limit to 1000

    for (let i = 0; i < safeCount; i++) {
      let uuid = crypto.randomUUID(); // Secure UUIDv4 provided by browser
      
      switch (format) {
        case 'uppercase':
          uuid = uuid.toUpperCase();
          break;
        case 'no-hyphens':
          uuid = uuid.replace(/-/g, '');
          break;
        case 'braces':
          uuid = `{${uuid}}`;
          break;
        default:
          break; // standard lowercase with hyphens
      }
      
      newUuids.push(uuid);
    }
    
    setUuids(newUuids);
    setCopied(false);
  };

  // Generate on initial load
  useEffect(() => {
    generateUuids();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Regenerate when format changes
  useEffect(() => {
    if (uuids.length > 0) {
      generateUuids();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format]);

  const copyAll = () => {
    if (uuids.length === 0) return;
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    if (uuids.length === 0) return;
    const blob = new Blob([uuids.join('\n')], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'uuids.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            Developer Utility
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">UUID/GUID Generator</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Generate cryptographically secure Version 4 UUIDs instantly in your browser.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 mb-8">
          
          <div className="flex flex-col sm:flex-row gap-6 items-end">
            
            <div className="w-full sm:w-1/3">
              <label className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-2">Quantity (1-1000)</label>
              <input
                type="number"
                min="1"
                max="1000"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 bg-[rgba(17,17,17,0.05)] dark:bg-[rgba(0,0,0,0.3)] border border-[var(--c-glass-border)] rounded-lg text-[rgb(var(--c-ink))] focus:outline-none focus:border-[rgb(var(--c-accent))]"
              />
            </div>

            <div className="w-full sm:w-1/3">
              <label className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-2">Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="w-full px-4 py-3 bg-[rgba(17,17,17,0.05)] dark:bg-[rgba(0,0,0,0.3)] border border-[var(--c-glass-border)] rounded-lg text-[rgb(var(--c-ink))] focus:outline-none focus:border-[rgb(var(--c-accent))] appearance-none"
              >
                <option value="standard">Standard (Lowercase)</option>
                <option value="uppercase">Uppercase</option>
                <option value="no-hyphens">No Hyphens</option>
                <option value="braces">With Braces {`{}`}</option>
              </select>
            </div>

            <div className="w-full sm:w-1/3">
              <button
                onClick={generateUuids}
                className="btn-primary py-3 px-4 w-full flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                Generate UUIDs
              </button>
            </div>

          </div>

        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md flex flex-col overflow-hidden h-[500px]">
          <div className="px-6 py-4 border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] flex flex-wrap gap-4 justify-between items-center shrink-0">
            <h3 className="text-[rgb(var(--c-ink))] font-semibold">Generated UUIDs ({uuids.length})</h3>
            
            <div className="flex gap-2">
              <button
                onClick={copyAll}
                className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] text-[rgb(var(--c-ink))] rounded text-sm transition-colors flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    Copy All
                  </>
                )}
              </button>
              <button
                onClick={downloadTxt}
                className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] text-[rgb(var(--c-ink))] rounded text-sm transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download .txt
              </button>
            </div>
          </div>
          
          <div className="flex-grow bg-[rgba(0,0,0,0.2)] overflow-y-auto custom-scrollbar p-6">
            <pre className="text-[rgb(var(--c-accent))] font-mono text-lg leading-relaxed whitespace-pre break-all">
              {uuids.join('\n')}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
