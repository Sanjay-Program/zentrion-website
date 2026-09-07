'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TextHasherPage() {
  const [inputText, setInputText] = useState('');
  const [hashes, setHashes] = useState({
    'SHA-1': '',
    'SHA-256': '',
    'SHA-384': '',
    'SHA-512': '',
  });

  const bufferToHex = (buffer: ArrayBuffer) => {
    const hashArray = Array.from(new Uint8Array(buffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const calculateHashes = async (text: string) => {
    if (!text) {
      setHashes({
        'SHA-1': '',
        'SHA-256': '',
        'SHA-384': '',
        'SHA-512': '',
      });
      return;
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);

      const [sha1, sha256, sha384, sha512] = await Promise.all([
        window.crypto.subtle.digest('SHA-1', data),
        window.crypto.subtle.digest('SHA-256', data),
        window.crypto.subtle.digest('SHA-384', data),
        window.crypto.subtle.digest('SHA-512', data),
      ]);

      setHashes({
        'SHA-1': bufferToHex(sha1),
        'SHA-256': bufferToHex(sha256),
        'SHA-384': bufferToHex(sha384),
        'SHA-512': bufferToHex(sha512),
      });
    } catch (err) {
      console.error('Hashing failed', err);
    }
  };

  useEffect(() => {
    calculateHashes(inputText);
  }, [inputText]);

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Cryptography
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Text String Hasher</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Instantly calculate cryptographic hashes for strings securely in your browser.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md flex flex-col overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)] flex justify-between items-center shrink-0">
            <h3 className="text-white font-semibold">Input String</h3>
            <button
              onClick={() => setInputText('')}
              className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-red-500/20 hover:text-red-400 border border-[rgba(255,255,255,0.1)] rounded text-[rgb(var(--c-mute))] text-sm transition-colors"
            >
              Clear
            </button>
          </div>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste the text you want to hash..."
            className="w-full h-40 p-6 bg-transparent text-white font-mono text-lg leading-relaxed focus:outline-none resize-none custom-scrollbar"
            spellCheck="false"
          />
        </div>

        {inputText && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
            <h3 className="text-lg font-bold text-white mb-2 px-1">Hash Results</h3>
            {Object.entries(hashes).map(([algo, hashValue], idx) => (
              <div key={idx} className="glass-card rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md overflow-hidden flex flex-col sm:flex-row group transition-colors hover:bg-[rgba(255,255,255,0.03)]">
                <div className="sm:w-32 px-6 py-4 border-b sm:border-b-0 sm:border-r border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)] flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-center shrink-0">
                  <div className="text-[rgb(var(--c-accent))] font-bold tracking-wider">{algo}</div>
                </div>
                <div className="p-4 sm:p-6 flex-grow flex items-center justify-between gap-4 overflow-hidden">
                  <div className="font-mono text-white text-sm break-all">
                    {hashValue}
                  </div>
                  <button
                    onClick={() => copyToClipboard(hashValue)}
                    className="p-2 text-[rgb(var(--c-mute))] hover:text-white bg-[rgba(255,255,255,0.05)] rounded-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all shrink-0"
                    title="Copy hash"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
