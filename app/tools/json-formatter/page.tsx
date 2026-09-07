'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JsonFormatterPage() {
  const [inputJson, setInputJson] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [mode, setMode] = useState<'beautify' | 'minify'>('beautify');
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState('');

  const processJson = () => {
    if (!inputJson.trim()) {
      setOutputJson('');
      setError('');
      return;
    }

    try {
      // First, check if the string itself might just need parsing
      let parsed;
      try {
        parsed = JSON.parse(inputJson);
      } catch (e) {
        // Fallback for single quotes or unquoted keys (eval is unsafe, but Function is slightly safer for parsing loose JSON if needed, though strictly we want valid JSON)
        // We will strictly enforce valid JSON to avoid XSS issues, but we can try to fix minor issues like single quotes
        const cleaned = inputJson
          .replace(/'/g, '"')
          // Basic attempt to quote unquoted keys (very fragile, but helps UX sometimes)
          .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
        parsed = JSON.parse(cleaned);
      }

      if (mode === 'beautify') {
        setOutputJson(JSON.stringify(parsed, null, indent));
      } else {
        setOutputJson(JSON.stringify(parsed));
      }
      
      setError('');
    } catch (err: any) {
      setOutputJson('');
      setError(`Invalid JSON: ${err.message}`);
    }
  };

  useEffect(() => {
    processJson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputJson, mode, indent]);

  const copyToClipboard = () => {
    if (!outputJson) return;
    navigator.clipboard.writeText(outputJson);
  };

  const clearAll = () => {
    setInputJson('');
    setOutputJson('');
    setError('');
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              Developer Utility
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">JSON Formatter</h1>
            <p className="text-xl text-[rgb(var(--c-mute))] max-w-2xl">Instantly beautify, format, or minify JSON payloads locally in your browser.</p>
          </div>

          <div className="flex gap-4">
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as any)}
              className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white rounded-lg px-4 py-2 outline-none focus:border-[rgb(var(--c-accent))]"
            >
              <option value="beautify">Beautify JSON</option>
              <option value="minify">Minify JSON</option>
            </select>
            
            {mode === 'beautify' && (
              <select
                value={indent}
                onChange={(e) => setIndent(parseInt(e.target.value))}
                className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white rounded-lg px-4 py-2 outline-none focus:border-[rgb(var(--c-accent))]"
              >
                <option value={2}>2 Spaces</option>
                <option value={4}>4 Spaces</option>
              </select>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p className="text-red-400 font-semibold font-mono text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[700px]">
          
          {/* Input Pane */}
          <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md flex flex-col overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)] flex justify-between items-center shrink-0">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <span className="text-[rgb(var(--c-accent))] font-bold text-xl">{'{ }'}</span>
                Input JSON
              </h3>
              <button
                onClick={clearAll}
                className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-red-500/20 hover:text-red-400 border border-[rgba(255,255,255,0.1)] rounded text-[rgb(var(--c-mute))] text-sm transition-colors"
              >
                Clear
              </button>
            </div>
            
            <textarea
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              placeholder='{"name": "Zentrion", "type": "Toolkit"}'
              className="flex-grow p-6 bg-transparent text-white font-mono text-sm leading-relaxed focus:outline-none resize-none custom-scrollbar whitespace-pre"
              spellCheck="false"
            />
          </div>

          {/* Output Pane */}
          <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md flex flex-col overflow-hidden h-full relative">
            <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)] flex justify-between items-center shrink-0">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {mode === 'beautify' ? 'Formatted Output' : 'Minified Output'}
              </h3>
              <button
                onClick={copyToClipboard}
                disabled={!outputJson}
                className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] text-white rounded text-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                Copy
              </button>
            </div>
            
            <textarea
              readOnly
              value={outputJson}
              placeholder="Output will appear here..."
              className="flex-grow p-6 bg-[rgba(0,0,0,0.2)] text-[rgb(var(--c-accent))] font-mono text-sm leading-relaxed focus:outline-none resize-none custom-scrollbar whitespace-pre-wrap break-all"
              spellCheck="false"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
