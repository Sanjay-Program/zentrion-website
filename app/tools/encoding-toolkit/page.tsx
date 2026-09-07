'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function EncodingToolkitPage() {
  const [encType, setEncType] = useState('base64');
  const [inputVal, setInputVal] = useState('');
  const [outputVal, setOutputVal] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleEncode = () => {
    setError(null);
    if (!inputVal) return;
    
    try {
      let res = '';
      if (encType === 'base64') {
        res = btoa(unescape(encodeURIComponent(inputVal)));
      } else if (encType === 'url') {
        res = encodeURIComponent(inputVal);
      } else if (encType === 'html') {
        const div = document.createElement('div');
        div.textContent = inputVal;
        res = div.innerHTML;
      } else if (encType === 'hex') {
        res = Array.from(new TextEncoder().encode(inputVal))
                   .map(b => b.toString(16).padStart(2, '0')).join(' ');
      } else if (encType === 'binary') {
        res = Array.from(new TextEncoder().encode(inputVal))
                   .map(b => b.toString(2).padStart(8, '0')).join(' ');
      }
      setOutputVal(res);
    } catch (e: any) {
      setError("Encoding Error: " + e.message);
    }
  };

  const handleDecode = () => {
    setError(null);
    if (!inputVal) return;

    try {
      let res = '';
      if (encType === 'base64') {
        res = decodeURIComponent(escape(atob(inputVal.trim())));
      } else if (encType === 'url') {
        res = decodeURIComponent(inputVal);
      } else if (encType === 'html') {
        const doc = new DOMParser().parseFromString(inputVal, "text/html");
        res = doc.documentElement.textContent || '';
      } else if (encType === 'hex') {
        const hex = inputVal.replace(/[^0-9a-fA-F]/g, '');
        if (hex.length % 2 !== 0) throw new Error("Invalid hex length");
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < bytes.length; i++) {
          bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
        }
        res = new TextDecoder().decode(bytes);
      } else if (encType === 'binary') {
        const bin = inputVal.replace(/[^01]/g, '');
        if (bin.length % 8 !== 0) throw new Error("Invalid binary length");
        const bytes = new Uint8Array(bin.length / 8);
        for (let i = 0; i < bytes.length; i++) {
          bytes[i] = parseInt(bin.substr(i * 8, 8), 2);
        }
        res = new TextDecoder().decode(bytes);
      }
      setOutputVal(res);
    } catch (e: any) {
      setError("Decoding Error: " + e.message);
    }
  };

  const swapText = () => {
    const temp = inputVal;
    setInputVal(outputVal);
    setOutputVal(temp);
  };

  const copyOutput = () => {
    if (outputVal) navigator.clipboard.writeText(outputVal);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Encoding Toolkit</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Encode and decode Base64, URL, HTML, Hex, and Binary formats securely offline.</p>
          <div className="mt-4 flex gap-2">
            <span className="inline-block px-3 py-1 bg-[rgba(255,255,255,0.05)] text-xs font-mono tracking-wider rounded-md border border-[rgba(255,255,255,0.1)]">
              LOCAL ONLY
            </span>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 md:p-8">
          
          <div className="mb-6 w-full md:w-64">
            <label className="block text-sm font-medium mb-2">Encoding Format</label>
            <select 
              value={encType}
              onChange={(e) => setEncType(e.target.value)}
              className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 focus:outline-none focus:border-[rgb(var(--c-accent))] transition-colors"
            >
              <option value="base64">Base64</option>
              <option value="url">URL Encoding</option>
              <option value="html">HTML Entities</option>
              <option value="hex">Hexadecimal</option>
              <option value="binary">Binary</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center mb-6">
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">Input</label>
              <textarea 
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type here..."
                className="w-full h-48 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 focus:outline-none focus:border-[rgb(var(--c-accent))] transition-colors font-mono text-sm"
              />
            </div>
            
            <div className="flex flex-row md:flex-col gap-3 justify-center">
              <button 
                onClick={handleEncode}
                className="px-4 py-2 bg-[rgb(var(--c-accent))] text-white font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
              >
                Encode &rarr;
              </button>
              <button 
                onClick={handleDecode}
                className="px-4 py-2 border border-[rgba(255,255,255,0.1)] font-bold rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              >
                &larr; Decode
              </button>
              <button 
                onClick={swapText}
                className="px-4 py-2 border border-[rgba(255,255,255,0.1)] text-[rgb(var(--c-mute))] text-sm rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              >
                Swap ⇅
              </button>
            </div>
            
            <div className="w-full relative">
              <label className="block text-sm font-medium mb-2">Output</label>
              <textarea 
                value={outputVal}
                readOnly
                placeholder="Result will appear here..."
                className="w-full h-48 bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.05)] rounded-lg px-4 py-3 focus:outline-none focus:border-[rgb(var(--c-accent))] transition-colors font-mono text-sm text-[rgb(var(--c-accent))]"
              />
              <button 
                onClick={copyOutput}
                className="absolute right-2 top-9 text-xs font-bold uppercase tracking-wider bg-[rgba(255,255,255,0.1)] px-3 py-1.5 rounded hover:bg-[rgb(var(--c-accent))] transition-colors"
              >
                Copy
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 mb-6">
              {error}
            </div>
          )}

          <div>
            <button 
              onClick={() => { setInputVal(''); setOutputVal(''); setError(null); }}
              className="px-6 py-2 rounded-lg border border-[rgba(255,255,255,0.1)] text-[rgb(var(--c-mute))] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
            >
              Clear All
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
