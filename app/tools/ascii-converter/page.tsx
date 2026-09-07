'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AsciiConverterPage() {
  const [inputText, setInputText] = useState('');
  const [outputDec, setOutputDec] = useState('');
  const [outputHex, setOutputHex] = useState('');
  const [outputBin, setOutputBin] = useState('');

  const updateOutputs = (text: string) => {
    if (!text) {
      setOutputDec('');
      setOutputHex('');
      setOutputBin('');
      return;
    }

    const decArr: string[] = [];
    const hexArr: string[] = [];
    const binArr: string[] = [];

    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i);
      
      // Decimal
      decArr.push(charCode.toString(10));
      
      // Hex
      hexArr.push('0x' + charCode.toString(16).toUpperCase().padStart(2, '0'));
      
      // Binary
      binArr.push(charCode.toString(2).padStart(8, '0'));
    }

    setOutputDec(decArr.join(' '));
    setOutputHex(hexArr.join(' '));
    setOutputBin(binArr.join(' '));
  };

  useEffect(() => {
    updateOutputs(inputText);
  }, [inputText]);

  const copyToClipboard = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard!`);
  };

  const OutputCard = ({ title, value, iconPath }: { title: string, value: string, iconPath: string }) => (
    <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] flex justify-between items-center shrink-0">
        <h3 className="text-[rgb(var(--c-accent))] font-bold uppercase tracking-widest text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
          </svg>
          {title}
        </h3>
        <button
          onClick={() => copyToClipboard(value, title)}
          disabled={!value}
          className="text-xs px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] rounded text-[rgb(var(--c-ink))] transition-colors disabled:opacity-50 flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          Copy
        </button>
      </div>
      <div className="p-6 bg-[rgba(0,0,0,0.2)] flex-grow overflow-y-auto custom-scrollbar max-h-[250px]">
        {value ? (
          <div className="font-mono text-[rgb(var(--c-ink))] text-sm sm:text-base leading-relaxed tracking-wider break-words">
            {value}
          </div>
        ) : (
          <div className="text-[rgb(var(--c-mute))] text-sm italic">
            Encoded output will appear here...
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">ASCII / Binary Converter</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Translate plain text into Decimal, Hexadecimal, and Binary representations instantly.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-semibold text-[rgb(var(--c-ink))]">Input Text (ASCII / UTF-8)</label>
            <span className="text-xs text-[rgb(var(--c-mute))]">{inputText.length} characters</span>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste text here to convert..."
            className="w-full h-40 px-4 py-4 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono resize-none custom-scrollbar"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <OutputCard 
            title="Hexadecimal (Base 16)" 
            value={outputHex} 
            iconPath="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" 
          />
          <OutputCard 
            title="Binary (Base 2)" 
            value={outputBin} 
            iconPath="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" 
          />
          <OutputCard 
            title="Decimal (Base 10)" 
            value={outputDec} 
            iconPath="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" 
          />
        </div>

      </div>
    </div>
  );
}
