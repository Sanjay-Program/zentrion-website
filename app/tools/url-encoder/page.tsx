'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UrlEncoderPage() {
  const [plainText, setPlainText] = useState('');
  const [encodedText, setEncodedText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Encode plain -> URL encoded
  useEffect(() => {
    if (mode === 'encode') {
      try {
        setError('');
        if (!plainText) {
          setEncodedText('');
          return;
        }
        setEncodedText(encodeURIComponent(plainText));
      } catch (err) {
        setError('Failed to encode string.');
      }
    }
  }, [plainText, mode]);

  // Decode URL encoded -> plain
  useEffect(() => {
    if (mode === 'decode') {
      try {
        setError('');
        if (!encodedText) {
          setPlainText('');
          return;
        }
        setPlainText(decodeURIComponent(encodedText));
      } catch (err) {
        setError('Invalid URL Encoding format.');
      }
    }
  }, [encodedText, mode]);

  const copyToClipboard = () => {
    const textToCopy = mode === 'encode' ? encodedText : plainText;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setPlainText('');
    setEncodedText('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">URL Encoder / Decoder</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Safely encode or decode Uniform Resource Identifiers (URIs) to transmit data properly.</p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="inline-flex bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-lg p-1">
            <button
              onClick={() => setMode('encode')}
              className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${
                mode === 'encode' 
                  ? 'bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))] shadow-sm' 
                  : 'text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-ink))]'
              }`}
            >
              Encode (Text &rarr; URL)
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${
                mode === 'decode' 
                  ? 'bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))] shadow-sm' 
                  : 'text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-ink))]'
              }`}
            >
              Decode (URL &rarr; Text)
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={clearAll}
              className="px-4 py-2 text-sm text-[rgb(var(--c-mute))] hover:text-red-400 transition-colors"
            >
              Clear
            </button>
            <button 
              onClick={copyToClipboard}
              className="px-4 py-2 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] rounded-lg text-sm text-[rgb(var(--c-ink))] transition-colors flex items-center gap-2"
            >
              {copied ? (
                <><svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Copied!</>
              ) : (
                <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Copy Result</>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p className="text-red-400 font-semibold">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px]">
          {/* Plain Text Pane */}
          <div className={`glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md flex flex-col overflow-hidden transition-all duration-300 ${mode === 'encode' ? 'ring-2 ring-[rgb(var(--c-accent))] shadow-[0_0_30px_rgba(var(--c-accent-rgb),0.1)]' : ''}`}>
            <div className="px-6 py-4 border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] flex justify-between items-center">
              <h3 className="text-[rgb(var(--c-ink))] font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                Plain Text
              </h3>
              {mode === 'encode' && <span className="text-xs text-[rgb(var(--c-accent))] font-bold uppercase tracking-wider bg-[rgba(var(--c-accent-rgb),0.1)] px-2 py-1 rounded-md">Input</span>}
            </div>
            <textarea
              value={plainText}
              onChange={(e) => {
                if (mode === 'encode') setPlainText(e.target.value);
              }}
              readOnly={mode === 'decode'}
              placeholder={mode === 'encode' ? "Type or paste string here to encode (e.g. ?search=hello world)..." : "Decoded result will appear here..."}
              className={`w-full h-full p-6 bg-transparent text-[rgb(var(--c-ink))] font-mono leading-relaxed focus:outline-none resize-none custom-scrollbar ${mode === 'decode' ? 'opacity-80' : ''}`}
              spellCheck="false"
            />
          </div>

          {/* Encoded Text Pane */}
          <div className={`glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md flex flex-col overflow-hidden transition-all duration-300 ${mode === 'decode' ? 'ring-2 ring-[rgb(var(--c-accent))] shadow-[0_0_30px_rgba(var(--c-accent-rgb),0.1)]' : ''}`}>
            <div className="px-6 py-4 border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] flex justify-between items-center">
              <h3 className="text-[rgb(var(--c-ink))] font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                URL Encoded String
              </h3>
              {mode === 'decode' && <span className="text-xs text-[rgb(var(--c-accent))] font-bold uppercase tracking-wider bg-[rgba(var(--c-accent-rgb),0.1)] px-2 py-1 rounded-md">Input</span>}
            </div>
            <textarea
              value={encodedText}
              onChange={(e) => {
                if (mode === 'decode') setEncodedText(e.target.value);
              }}
              readOnly={mode === 'encode'}
              placeholder={mode === 'decode' ? "Paste URL Encoded string here to decode (e.g. %3Fsearch%3Dhello%20world)..." : "Encoded result will appear here..."}
              className={`w-full h-full p-6 bg-transparent text-[rgb(var(--c-accent))] font-mono leading-relaxed break-all focus:outline-none resize-none custom-scrollbar ${mode === 'encode' ? 'opacity-80' : ''}`}
              spellCheck="false"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
