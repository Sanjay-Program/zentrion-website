'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Base32Page() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  // Standard RFC 4648 Base32 alphabet
  const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  const encodeBase32 = (str: string) => {
    // Convert string to UTF-8 byte array
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    
    let result = '';
    let i = 0;
    
    while (i < bytes.length) {
      // Get up to 5 bytes (40 bits)
      const b1 = bytes[i++];
      const b2 = i < bytes.length ? bytes[i++] : NaN;
      const b3 = i < bytes.length ? bytes[i++] : NaN;
      const b4 = i < bytes.length ? bytes[i++] : NaN;
      const b5 = i < bytes.length ? bytes[i++] : NaN;

      // Extract 5-bit groups
      const char1 = b1 >> 3;
      const char2 = ((b1 & 0x07) << 2) | (isNaN(b2) ? 0 : b2 >> 6);
      const char3 = isNaN(b2) ? NaN : (b2 & 0x3E) >> 1;
      const char4 = isNaN(b2) ? NaN : ((b2 & 0x01) << 4) | (isNaN(b3) ? 0 : b3 >> 4);
      const char5 = isNaN(b3) ? NaN : ((b3 & 0x0F) << 1) | (isNaN(b4) ? 0 : b4 >> 7);
      const char6 = isNaN(b4) ? NaN : (b4 & 0x7C) >> 2;
      const char7 = isNaN(b4) ? NaN : ((b4 & 0x03) << 3) | (isNaN(b5) ? 0 : b5 >> 5);
      const char8 = isNaN(b5) ? NaN : b5 & 0x1F;

      result += BASE32_ALPHABET.charAt(char1);
      result += BASE32_ALPHABET.charAt(char2);
      result += isNaN(char3) ? '=' : BASE32_ALPHABET.charAt(char3);
      result += isNaN(char4) ? '=' : BASE32_ALPHABET.charAt(char4);
      result += isNaN(char5) ? '=' : BASE32_ALPHABET.charAt(char5);
      result += isNaN(char6) ? '=' : BASE32_ALPHABET.charAt(char6);
      result += isNaN(char7) ? '=' : BASE32_ALPHABET.charAt(char7);
      result += isNaN(char8) ? '=' : BASE32_ALPHABET.charAt(char8);
    }
    
    return result;
  };

  const decodeBase32 = (str: string) => {
    // Clean string (remove spaces, hyphens, and padding)
    str = str.replace(/[\s-]/g, '').toUpperCase().replace(/=+$/, '');
    
    if (str.length === 0) return '';
    
    if (!/^[A-Z2-7]+$/.test(str)) {
      throw new Error('Input contains invalid Base32 characters.');
    }

    const bytes = [];
    let buffer = 0;
    let bitsLeft = 0;

    for (let i = 0; i < str.length; i++) {
      const val = BASE32_ALPHABET.indexOf(str.charAt(i));
      buffer = (buffer << 5) | val;
      bitsLeft += 5;

      if (bitsLeft >= 8) {
        bytes.push((buffer >> (bitsLeft - 8)) & 0xFF);
        bitsLeft -= 8;
      }
    }

    const decoder = new TextDecoder('utf-8', { fatal: true });
    try {
      return decoder.decode(new Uint8Array(bytes));
    } catch (e) {
      // If it's not valid UTF-8, it might be raw binary (like a secret key).
      // In that case, we can format it as hex or alert the user.
      throw new Error('Decoded data is not valid UTF-8 text. It may be a raw binary key.');
    }
  };

  useEffect(() => {
    if (!inputText) {
      setOutputText('');
      setError('');
      return;
    }
    
    try {
      setError('');
      if (mode === 'encode') {
        setOutputText(encodeBase32(inputText));
      } else {
        setOutputText(decodeBase32(inputText));
      }
    } catch (err: any) {
      setOutputText('');
      setError(err.message || 'Error processing text.');
    }
  }, [inputText, mode]);

  const copyToClipboard = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Cryptography
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Base32 Encoder / Decoder</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Securely encode or decode Base32 data entirely in your browser. Often used for TOTP/MFA secret keys.</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => { setMode('encode'); setInputText(''); setError(''); }}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              mode === 'encode' 
                ? 'bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))]' 
                : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.1)]'
            }`}
          >
            Encode to Base32
          </button>
          <button
            onClick={() => { setMode('decode'); setInputText(''); setError(''); }}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              mode === 'decode' 
                ? 'bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))]' 
                : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.1)]'
            }`}
          >
            Decode Base32
          </button>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p className="text-red-400 font-semibold font-mono text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[500px]">
          
          <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md flex flex-col overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)] flex flex-wrap gap-4 justify-between items-center shrink-0">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                Input ({mode === 'encode' ? 'Raw Text' : 'Base32 Encoded'})
              </h3>
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
              placeholder={mode === 'encode' ? "Enter text to encode (e.g. MySecretKey123)" : "Enter Base32 to decode (e.g. JV4U22LDOQQG45DFKZCUM===)"}
              className="flex-grow p-6 bg-transparent text-white font-mono text-base leading-relaxed focus:outline-none resize-none custom-scrollbar whitespace-pre-wrap break-all"
              spellCheck="false"
            />
          </div>

          <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md flex flex-col overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)] flex flex-wrap justify-between items-center shrink-0 gap-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                Output ({mode === 'encode' ? 'Base32 Encoded' : 'Raw Text'})
              </h3>
              <button
                onClick={copyToClipboard}
                disabled={!outputText}
                className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] text-white rounded text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                Copy
              </button>
            </div>
            
            <textarea
              readOnly
              value={outputText}
              placeholder="Output will appear here..."
              className="flex-grow p-6 bg-[rgba(0,0,0,0.2)] text-[rgb(var(--c-accent))] font-mono text-base leading-relaxed focus:outline-none resize-none custom-scrollbar whitespace-pre-wrap break-all"
              spellCheck="false"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
