'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MacGeneratorPage() {
  const [count, setCount] = useState(10);
  const [format, setFormat] = useState<'colon' | 'hyphen' | 'dot'>('colon');
  const [caseType, setCaseType] = useState<'upper' | 'lower'>('upper');
  const [macs, setMacs] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateMacs = () => {
    const newMacs = [];
    const safeCount = Math.min(Math.max(1, count), 1000); // Limit to 1000

    // Use crypto.getRandomValues for better randomness
    const randomValues = new Uint8Array(safeCount * 6);
    window.crypto.getRandomValues(randomValues);

    let valIdx = 0;
    for (let i = 0; i < safeCount; i++) {
      let bytes = [];
      for (let j = 0; j < 6; j++) {
        let b = randomValues[valIdx++];
        // If it's the first byte, ensure it's a valid unicast MAC (not multicast, not locally administered unless specified. Actually, let's just make it locally administered unicast to be safe: x2, x6, xA, xE)
        if (j === 0) {
          b = (b & 0xFC) | 0x02; // Set locally administered bit, unset multicast bit
        }
        let hex = b.toString(16).padStart(2, '0');
        bytes.push(hex);
      }
      
      let macStr = '';
      if (format === 'colon') {
        macStr = bytes.join(':');
      } else if (format === 'hyphen') {
        macStr = bytes.join('-');
      } else if (format === 'dot') {
        macStr = bytes[0] + bytes[1] + '.' + bytes[2] + bytes[3] + '.' + bytes[4] + bytes[5];
      }

      if (caseType === 'upper') {
        macStr = macStr.toUpperCase();
      }

      newMacs.push(macStr);
    }
    
    setMacs(newMacs);
    setCopied(false);
  };

  // Generate on initial load
  useEffect(() => {
    generateMacs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Regenerate when format changes
  useEffect(() => {
    if (macs.length > 0) {
      generateMacs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format, caseType]);

  const copyAll = () => {
    if (macs.length === 0) return;
    navigator.clipboard.writeText(macs.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    if (macs.length === 0) return;
    const blob = new Blob([macs.join('\n')], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'mac_addresses.txt');
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
            Networking Utility
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">MAC Address Generator</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Generate valid random MAC addresses for network testing and spoofing.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 mb-8">
          
          <div className="flex flex-col md:flex-row gap-6 items-end">
            
            <div className="w-full md:w-1/4">
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

            <div className="w-full md:w-1/4">
              <label className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-2">Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="w-full px-4 py-3 bg-[rgba(17,17,17,0.05)] dark:bg-[rgba(0,0,0,0.3)] border border-[var(--c-glass-border)] rounded-lg text-[rgb(var(--c-ink))] focus:outline-none focus:border-[rgb(var(--c-accent))] appearance-none"
              >
                <option value="colon">Colon (00:1A:2B...)</option>
                <option value="hyphen">Hyphen (00-1A-2B...)</option>
                <option value="dot">Dot (001A.2B3C...)</option>
              </select>
            </div>

            <div className="w-full md:w-1/4">
              <label className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-2">Case</label>
              <select
                value={caseType}
                onChange={(e) => setCaseType(e.target.value as any)}
                className="w-full px-4 py-3 bg-[rgba(17,17,17,0.05)] dark:bg-[rgba(0,0,0,0.3)] border border-[var(--c-glass-border)] rounded-lg text-[rgb(var(--c-ink))] focus:outline-none focus:border-[rgb(var(--c-accent))] appearance-none"
              >
                <option value="upper">Uppercase (A-F)</option>
                <option value="lower">Lowercase (a-f)</option>
              </select>
            </div>

            <div className="w-full md:w-1/4">
              <button
                onClick={generateMacs}
                className="btn-primary py-3 px-4 w-full flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                Generate
              </button>
            </div>

          </div>

        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md flex flex-col overflow-hidden h-[500px]">
          <div className="px-6 py-4 border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] flex flex-wrap gap-4 justify-between items-center shrink-0">
            <h3 className="text-[rgb(var(--c-ink))] font-semibold">Generated MAC Addresses ({macs.length})</h3>
            
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
            <pre className="text-[rgb(var(--c-accent))] font-mono text-xl leading-relaxed whitespace-pre break-all columns-1 sm:columns-2 md:columns-3 gap-8">
              {macs.join('\n')}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
