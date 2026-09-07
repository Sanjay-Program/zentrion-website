'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CaesarCipherPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [shift, setShift] = useState(13);

  const applyCipher = (text: string, shiftValue: number) => {
    if (!text) return '';

    // Normalize shift to be within 0-25 (even if negative)
    const normalizedShift = ((shiftValue % 26) + 26) % 26;

    let result = '';
    for (let i = 0; i < text.length; i++) {
      let c = text.charCodeAt(i);
      
      // Uppercase letters
      if (c >= 65 && c <= 90) {
        result += String.fromCharCode(((c - 65 + normalizedShift) % 26) + 65);
      }
      // Lowercase letters
      else if (c >= 97 && c <= 122) {
        result += String.fromCharCode(((c - 97 + normalizedShift) % 26) + 97);
      }
      // Non-alphabetic characters remain unchanged
      else {
        result += text.charAt(i);
      }
    }
    return result;
  };

  useEffect(() => {
    setOutputText(applyCipher(inputText, shift));
  }, [inputText, shift]);

  const copyToClipboard = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Cryptography
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Caesar Cipher / ROT13</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Easily encrypt or decrypt text using classic substitution ciphers by shifting the alphabet.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-8 mb-8">
          
          <div className="max-w-2xl mx-auto mb-10">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-semibold text-white">Shift Amount (ROT)</label>
              <span className="text-[rgb(var(--c-accent))] font-mono font-bold text-2xl bg-[rgba(255,255,255,0.05)] px-4 py-1 rounded-lg border border-[rgba(255,255,255,0.1)]">
                {shift > 0 ? '+' : ''}{shift}
              </span>
            </div>
            <input 
              type="range" 
              min="-25" 
              max="25" 
              value={shift} 
              onChange={(e) => setShift(parseInt(e.target.value))}
              className="w-full h-2 bg-[rgba(255,255,255,0.1)] rounded-lg appearance-none cursor-pointer accent-[rgb(var(--c-accent))]"
            />
            <div className="flex justify-between text-xs text-[rgb(var(--c-mute))] mt-3 font-mono">
              <span>-25</span>
              <span>0</span>
              <span>+25</span>
            </div>
            
            <div className="flex justify-center gap-4 mt-6">
              <button 
                onClick={() => setShift(13)}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${shift === 13 ? 'bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))]' : 'bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)]'}`}
              >
                ROT13 (Standard)
              </button>
              <button 
                onClick={() => setShift(4)}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${shift === 4 ? 'bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))]' : 'bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)]'}`}
              >
                ROT4
              </button>
              <button 
                onClick={() => setShift(-3)}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${shift === -3 ? 'bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))]' : 'bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)]'}`}
              >
                Caesar (-3)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[400px]">
            
            <div className="flex flex-col h-full">
              <label className="block text-sm font-semibold text-white mb-3">Input Text</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type the message to encrypt or decrypt..."
                className="flex-grow w-full p-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono resize-none custom-scrollbar text-lg leading-relaxed"
                spellCheck="false"
              />
            </div>

            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-white">Output Text</label>
                <button
                  onClick={copyToClipboard}
                  disabled={!outputText}
                  className="text-xs px-3 py-1 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded text-white transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  Copy
                </button>
              </div>
              <textarea
                readOnly
                value={outputText}
                placeholder="Shifted output will appear here..."
                className="flex-grow w-full p-4 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] rounded-xl text-[rgb(var(--c-accent))] focus:outline-none transition-all font-mono resize-none custom-scrollbar text-lg leading-relaxed"
                spellCheck="false"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
