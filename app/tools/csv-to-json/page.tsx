'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CsvToJsonPage() {
  const [inputCsv, setInputCsv] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [error, setError] = useState('');

  // Robust CSV parser that handles commas and newlines inside quotes
  const parseCsv = (csv: string) => {
    const lines = [];
    let currentLine = [];
    let currentCell = '';
    let inQuotes = false;
    
    for (let i = 0; i < csv.length; i++) {
      const char = csv[i];
      const nextChar = csv[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          currentCell += '"';
          i++; // Skip the next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // End of cell
        currentLine.push(currentCell);
        currentCell = '';
      } else if ((char === '\n' || (char === '\r' && nextChar === '\n')) && !inQuotes) {
        // End of line
        if (char === '\r') i++; // Skip \n if \r\n
        currentLine.push(currentCell);
        lines.push(currentLine);
        currentLine = [];
        currentCell = '';
      } else {
        currentCell += char;
      }
    }

    // Push the last cell/line if it exists
    if (currentCell !== '' || currentLine.length > 0) {
      currentLine.push(currentCell);
      lines.push(currentLine);
    }

    // Filter out empty lines
    return lines.filter(line => line.some(cell => cell.trim() !== ''));
  };

  const convertCsvToJson = (csvStr: string) => {
    if (!csvStr.trim()) {
      setOutputJson('');
      setError('');
      return;
    }

    try {
      const parsedCsv = parseCsv(csvStr);

      if (parsedCsv.length < 2) {
        throw new Error('CSV must contain at least a header row and one data row.');
      }

      const headers = parsedCsv[0].map(h => h.trim());
      
      const jsonArray = parsedCsv.slice(1).map(row => {
        const obj: any = {};
        headers.forEach((header, index) => {
          // Try to convert numbers and booleans if possible, else keep string
          let val = row[index];
          if (val !== undefined) {
             val = val.trim();
             if (val.toLowerCase() === 'true') obj[header] = true;
             else if (val.toLowerCase() === 'false') obj[header] = false;
             else if (val.toLowerCase() === 'null' || val === '') obj[header] = null;
             else if (!isNaN(Number(val)) && val !== '') obj[header] = Number(val);
             else obj[header] = val;
          } else {
             obj[header] = null;
          }
        });
        return obj;
      });

      setOutputJson(JSON.stringify(jsonArray, null, 2));
      setError('');
    } catch (err: any) {
      setError(`Failed to parse CSV: ${err.message}`);
      setOutputJson('');
    }
  };

  useEffect(() => {
    convertCsvToJson(inputCsv);
  }, [inputCsv]);

  const copyToClipboard = () => {
    if (!outputJson) return;
    navigator.clipboard.writeText(outputJson);
  };

  const downloadJson = () => {
    if (!outputJson) return;
    const blob = new Blob([outputJson], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
            Data Conversion
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">CSV to JSON Converter</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Convert raw CSV spreadsheet data into a perfectly structured JSON array.</p>
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
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                Input CSV
              </h3>
              <button
                onClick={() => setInputCsv('')}
                className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-red-500/20 hover:text-red-400 border border-[var(--c-glass-border)] rounded text-[rgb(var(--c-mute))] text-sm transition-colors"
              >
                Clear
              </button>
            </div>
            
            <textarea
              value={inputCsv}
              onChange={(e) => setInputCsv(e.target.value)}
              placeholder="name,type,secure\nZentrion,Toolkit,true\n&quot;Zentrion Pro, Inc&quot;,Platform,false"
              className="flex-grow p-6 bg-transparent text-[rgb(var(--c-ink))] font-mono text-sm leading-relaxed focus:outline-none resize-none custom-scrollbar whitespace-pre"
              spellCheck="false"
            />
          </div>

          {/* Output Pane */}
          <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md flex flex-col overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] flex flex-wrap justify-between items-center shrink-0 gap-4">
              <h3 className="text-[rgb(var(--c-ink))] font-semibold flex items-center gap-2">
                <span className="text-green-400 font-bold text-xl">{'{ }'}</span>
                Output JSON
              </h3>
              
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!outputJson}
                  className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] text-[rgb(var(--c-ink))] rounded text-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  Copy
                </button>
                <button
                  onClick={downloadJson}
                  disabled={!outputJson}
                  className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] text-[rgb(var(--c-ink))] rounded text-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download .json
                </button>
              </div>
            </div>
            
            <textarea
              readOnly
              value={outputJson}
              placeholder="Valid JSON output will appear here..."
              className="flex-grow p-6 bg-[rgba(0,0,0,0.2)] text-[rgb(var(--c-accent))] font-mono text-sm leading-relaxed focus:outline-none resize-none custom-scrollbar whitespace-pre"
              spellCheck="false"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
