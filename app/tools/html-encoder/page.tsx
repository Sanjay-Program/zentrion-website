'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HtmlEncoderPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const encodeHtmlEntities = (str: string) => {
    return str.replace(/[\u00A0-\u9999<>\&]/g, (i) => {
      return `&#${i.charCodeAt(0)};`;
    });
  };

  const decodeHtmlEntities = (str: string) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  };

  useEffect(() => {
    if (!inputText) {
      setOutputText('');
      return;
    }
    
    try {
      if (mode === 'encode') {
        setOutputText(encodeHtmlEntities(inputText));
      } else {
        setOutputText(decodeHtmlEntities(inputText));
      }
    } catch (err) {
      setOutputText('Error processing text.');
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
            XSS Security
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">HTML Entity Encoder</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Safely encode or decode HTML characters to prevent or analyze Cross-Site Scripting (XSS) payloads.</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setMode('encode')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              mode === 'encode' 
                ? 'bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))]' 
                : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.1)]'
            }`}
          >
            Encode to HTML Entities
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              mode === 'decode' 
                ? 'bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))]' 
                : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.1)]'
            }`}
          >
            Decode HTML Entities
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[500px]">
          
          <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md flex flex-col overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)] flex flex-wrap gap-4 justify-between items-center shrink-0">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                Input ({mode === 'encode' ? 'Raw HTML' : 'Encoded Entities'})
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
              placeholder={mode === 'encode' ? "<script>alert('XSS')</script>" : "&#60;script&#62;alert(&#39;XSS&#39;)&#60;/script&#62;"}
              className="flex-grow p-6 bg-transparent text-white font-mono text-sm leading-relaxed focus:outline-none resize-none custom-scrollbar whitespace-pre-wrap"
              spellCheck="false"
            />
          </div>

          <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md flex flex-col overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)] flex flex-wrap justify-between items-center shrink-0 gap-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                Output ({mode === 'encode' ? 'Encoded Entities' : 'Raw HTML'})
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
              className="flex-grow p-6 bg-[rgba(0,0,0,0.2)] text-[rgb(var(--c-accent))] font-mono text-sm leading-relaxed focus:outline-none resize-none custom-scrollbar whitespace-pre-wrap"
              spellCheck="false"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
