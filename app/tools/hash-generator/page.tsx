'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HashGeneratorPage() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({
    'SHA-1': '',
    'SHA-256': '',
    'SHA-384': '',
    'SHA-512': ''
  });

  const generateHashes = async (text: string) => {
    if (!text) {
      setHashes({
        'SHA-1': '',
        'SHA-256': '',
        'SHA-384': '',
        'SHA-512': ''
      });
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const hashTypes = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
    const newHashes: any = {};

    for (const type of hashTypes) {
      try {
        const hashBuffer = await window.crypto.subtle.digest(type, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        newHashes[type] = hashHex;
      } catch (err) {
        newHashes[type] = 'Error generating hash';
      }
    }

    setHashes(newHashes as any);
  };

  useEffect(() => {
    generateHashes(input);
  }, [input]);

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    alert('Hash copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Hash Generator</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Securely generate cryptographic hashes (SHA-256, SHA-512, etc.) directly in your browser.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <label className="block text-sm font-semibold text-white mb-3">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste the string you want to hash..."
            className="w-full h-32 px-4 py-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono resize-none"
          />
        </div>

        <div className="space-y-4">
          {Object.entries(hashes).map(([type, hash]) => (
            <div key={type} className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md overflow-hidden">
              <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)] flex justify-between items-center">
                <h3 className="text-[rgb(var(--c-accent))] font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  {type}
                </h3>
                <button
                  onClick={() => copyToClipboard(hash)}
                  disabled={!hash}
                  className="text-xs px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded text-white transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  Copy
                </button>
              </div>
              <div className="p-6 bg-[rgba(0,0,0,0.2)]">
                {hash ? (
                  <div className="font-mono text-white text-sm sm:text-base break-all leading-relaxed">
                    {hash}
                  </div>
                ) : (
                  <div className="text-[rgb(var(--c-mute))] text-sm italic">
                    Hash will appear here...
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
