'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JsonToCsvPage() {
  const [inputJson, setInputJson] = useState('');
  const [outputCsv, setOutputCsv] = useState('');
  const [error, setError] = useState('');

  const convertJsonToCsv = (jsonStr: string) => {
    if (!jsonStr.trim()) {
      setOutputCsv('');
      setError('');
      return;
    }

    try {
      let parsed = JSON.parse(jsonStr);

      // Ensure parsed is an array
      if (!Array.isArray(parsed)) {
        if (typeof parsed === 'object' && parsed !== null) {
          parsed = [parsed]; // Wrap single object in array
        } else {
          throw new Error('JSON must be an object or an array of objects.');
        }
      }

      if (parsed.length === 0) {
        setOutputCsv('');
        setError('JSON array is empty.');
        return;
      }

      // Extract all unique keys from all objects (in case some objects are missing keys)
      const allKeys = new Set<string>();
      parsed.forEach((obj: any) => {
        if (typeof obj === 'object' && obj !== null) {
          Object.keys(obj).forEach(key => allKeys.add(key));
        }
      });

      const headers = Array.from(allKeys);
      
      if (headers.length === 0) {
        throw new Error('No valid keys found in JSON objects.');
      }

      // Build CSV
      let csv = headers.join(',') + '\n';

      parsed.forEach((obj: any) => {
        if (typeof obj !== 'object' || obj === null) return;
        
        const row = headers.map(header => {
          let val = obj[header];
          
          if (val === null || val === undefined) {
            return '';
          } else if (typeof val === 'object') {
            // Stringify nested objects/arrays
            val = JSON.stringify(val);
          } else {
            val = String(val);
          }

          // Escape quotes and wrap in quotes if contains comma, newline, or quotes
          if (val.includes(',') || val.includes('\n') || val.includes('"')) {
            val = `"${val.replace(/"/g, '""')}"`;
          }

          return val;
        });

        csv += row.join(',') + '\n';
      });

      setOutputCsv(csv);
      setError('');
    } catch (err: any) {
      setError(`Invalid JSON: ${err.message}`);
      setOutputCsv('');
    }
  };

  useEffect(() => {
    convertJsonToCsv(inputJson);
  }, [inputJson]);

  const copyToClipboard = () => {
    if (!outputCsv) return;
    navigator.clipboard.writeText(outputCsv);
  };

  const downloadCsv = () => {
    if (!outputCsv) return;
    const blob = new Blob([outputCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
            Data Conversion
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">JSON to CSV Converter</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Flatten nested JSON arrays into cleanly formatted, spreadsheet-ready CSV data.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p className="text-red-400 font-semibold font-mono text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[650px]">
          
          {/* Input Pane */}
          <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md flex flex-col overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] flex flex-wrap gap-4 justify-between items-center shrink-0">
              <h3 className="text-[rgb(var(--c-ink))] font-semibold flex items-center gap-2">
                <span className="text-[rgb(var(--c-accent))] font-bold text-xl">{'{ }'}</span>
                Input JSON
              </h3>
              <button
                onClick={() => setInputJson('')}
                className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-red-500/20 hover:text-red-400 border border-[var(--c-glass-border)] rounded text-[rgb(var(--c-mute))] text-sm transition-colors"
              >
                Clear
              </button>
            </div>
            
            <textarea
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              placeholder="[\n  { \n    &quot;name&quot;: &quot;Zentrion&quot;, \n    &quot;type&quot;: &quot;Toolkit&quot; \n  }\n]"
              className="flex-grow p-6 bg-transparent text-[rgb(var(--c-ink))] font-mono text-sm leading-relaxed focus:outline-none resize-none custom-scrollbar whitespace-pre"
              spellCheck="false"
            />
          </div>

          {/* Output Pane */}
          <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md flex flex-col overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] flex flex-wrap justify-between items-center shrink-0 gap-4">
              <h3 className="text-[rgb(var(--c-ink))] font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                Output CSV
              </h3>
              
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!outputCsv}
                  className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] text-[rgb(var(--c-ink))] rounded text-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  Copy
                </button>
                <button
                  onClick={downloadCsv}
                  disabled={!outputCsv}
                  className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] text-[rgb(var(--c-ink))] rounded text-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download .csv
                </button>
              </div>
            </div>
            
            <textarea
              readOnly
              value={outputCsv}
              placeholder="Valid CSV output will appear here..."
              className="flex-grow p-6 bg-[rgba(0,0,0,0.2)] text-[rgb(var(--c-accent))] font-mono text-sm leading-relaxed focus:outline-none resize-none custom-scrollbar whitespace-pre"
              spellCheck="false"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
