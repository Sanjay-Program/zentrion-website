'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HtmlEntitiesPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const encodeHtml = (str: string) => {
    return str.replace(/[\u00A0-\u9999<>\&"']/g, function(i) {
      return '&#' + i.charCodeAt(0) + ';';
    });
  };

  const decodeHtml = (str: string) => {
    // Basic decode mapping
    const map: { [key: string]: string } = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
      '&#x27;': "'"
    };
    
    // Replace named entities
    let decoded = str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#x27;/g, function(m) {
      return map[m];
    });

    // Replace numbered entities
    decoded = decoded.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });

    // Replace hex entities
    decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, function(match, hex) {
      return String.fromCharCode(parseInt(hex, 16));
    });

    return decoded;
  };

  useEffect(() => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    try {
      if (mode === 'encode') {
        setOutputText(encodeHtml(inputText));
      } else {
        setOutputText(decodeHtml(inputText));
      }
    } catch (e) {
      setOutputText('Error processing text.');
    }
  }, [inputText, mode]);

  const copyToClipboard = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
  };

  const clearAll = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row justify-between items-end gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              Developer Utility
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">HTML Entity Converter</h1>
            <p className="text-xl text-[rgb(var(--c-mute))] max-w-2xl">Encode or decode HTML entities securely in your browser to prevent XSS.</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => { setMode('encode'); setInputText(outputText); }}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                mode === 'encode' 
                  ? 'bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))]' 
                  : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.1)]'
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => { setMode('decode'); setInputText(outputText); }}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                mode === 'decode' 
                  ? 'bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))]' 
                  : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.1)]'
              }`}
            >
              Decode
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
          
          {/* Input Pane */}
          <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md flex flex-col overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)] flex justify-between items-center shrink-0">
              <h3 className="text-white font-semibold">
                {mode === 'encode' ? 'Raw Text (Input)' : 'Encoded HTML (Input)'}
              </h3>
              <button
                onClick={clearAll}
                className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-red-500/20 hover:text-red-400 border border-[rgba(255,255,255,0.1)] rounded text-[rgb(var(--c-mute))] text-sm transition-colors"
              >
                Clear
              </button>
            </div>
            
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={mode === 'encode' ? "<h1>Hello World!</h1> & more..." : "&#60;h1&#62;Hello World!&#60;/h1&#62;"}
              className="flex-grow p-6 bg-transparent text-white font-mono text-base leading-relaxed focus:outline-none resize-none custom-scrollbar whitespace-pre-wrap break-all"
              spellCheck="false"
            />
          </div>

          {/* Output Pane */}
          <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md flex flex-col overflow-hidden h-full relative">
            <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)] flex justify-between items-center shrink-0">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {mode === 'encode' ? 'Encoded HTML (Output)' : 'Raw Text (Output)'}
              </h3>
              <button
                onClick={copyToClipboard}
                disabled={!outputText}
                className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] text-white rounded text-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                Copy
              </button>
            </div>
            
            <textarea
              readOnly
              value={outputText}
              placeholder="Result will appear here..."
              className="flex-grow p-6 bg-[rgba(0,0,0,0.2)] text-[rgb(var(--c-accent))] font-mono text-base leading-relaxed focus:outline-none resize-none custom-scrollbar whitespace-pre-wrap break-all"
              spellCheck="false"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
