'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface ParsedHeader {
  key: string;
  value: string;
  isSecurity: boolean;
}

export default function HttpHeadersParserPage() {
  const [rawHeaders, setRawHeaders] = useState('');
  const [parsedHeaders, setParsedHeaders] = useState<ParsedHeader[]>([]);
  const [statusLine, setStatusLine] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const securityHeaders = [
    'strict-transport-security',
    'content-security-policy',
    'x-frame-options',
    'x-content-type-options',
    'referrer-policy',
    'permissions-policy',
    'x-xss-protection',
    'cross-origin-embedder-policy',
    'cross-origin-opener-policy',
    'cross-origin-resource-policy'
  ];

  const parseHeaders = (raw: string) => {
    if (!raw.trim()) {
      setParsedHeaders([]);
      setStatusLine('');
      setError('');
      return;
    }

    const lines = raw.split(/\r?\n/).filter(line => line.trim() !== '');
    const headers: ParsedHeader[] = [];
    let status = '';
    let hasError = false;

    // Check if first line is a request/response line
    if (lines[0].toUpperCase().startsWith('HTTP/') || 
        ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'].some(method => lines[0].toUpperCase().startsWith(method))) {
      status = lines[0];
      lines.shift();
    }

    lines.forEach(line => {
      // Find the first colon
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        headers.push({
          key,
          value,
          isSecurity: securityHeaders.includes(key.toLowerCase())
        });
      } else {
        // If it doesn't have a colon and it's not a known format, it might be malformed body
        if (line.includes('{') || line.includes('<html')) {
           hasError = true;
        }
      }
    });

    if (hasError && headers.length === 0) {
      setError('Does not appear to be valid HTTP headers. Note: Do not include the request/response body.');
    } else {
      setError('');
    }

    setStatusLine(status);
    setParsedHeaders(headers);
  };

  useEffect(() => {
    parseHeaders(rawHeaders);
  }, [rawHeaders]);

  const filteredHeaders = parsedHeaders.filter(h => 
    h.key.toLowerCase().includes(search.toLowerCase()) || 
    h.value.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">HTTP Headers Parser</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Parse and analyze raw HTTP request and response headers instantly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[650px]">
          
          {/* Input Pane */}
          <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md flex flex-col overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)] flex justify-between items-center shrink-0">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                Raw Headers
              </h3>
              <button
                onClick={() => setRawHeaders('')}
                className="text-xs px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-red-500/20 hover:text-red-400 border border-[rgba(255,255,255,0.1)] rounded text-[rgb(var(--c-mute))] transition-colors"
              >
                Clear
              </button>
            </div>
            
            <textarea
              value={rawHeaders}
              onChange={(e) => setRawHeaders(e.target.value)}
              placeholder={`HTTP/2 200 OK
date: Wed, 21 Oct 2026 07:28:00 GMT
content-type: text/html; charset=utf-8
strict-transport-security: max-age=31536000; includeSubDomains`}
              className="flex-grow p-6 bg-transparent text-white font-mono leading-relaxed focus:outline-none resize-none custom-scrollbar whitespace-pre"
              spellCheck="false"
            />
          </div>

          {/* Parsed Pane */}
          <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md flex flex-col overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)] flex justify-between items-center shrink-0 gap-4">
              <h3 className="text-white font-semibold flex items-center gap-2 shrink-0">
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                Parsed Data
              </h3>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter headers..."
                className="w-full sm:w-48 px-3 py-1.5 bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.1)] rounded-lg text-sm text-white placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] transition-all"
              />
            </div>
            
            <div className="flex-grow bg-[rgba(0,0,0,0.2)] overflow-y-auto custom-scrollbar relative p-0">
              
              {error && (
                <div className="m-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <p className="text-yellow-400 font-semibold text-sm">{error}</p>
                </div>
              )}

              {parsedHeaders.length === 0 && !error ? (
                <div className="absolute inset-0 flex items-center justify-center text-[rgb(var(--c-mute))] italic">
                  Paste headers to see parsed results...
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {statusLine && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <div className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">Status Line</div>
                      <div className="font-mono text-white break-all">{statusLine}</div>
                    </div>
                  )}

                  {parsedHeaders.length > 0 && (
                    <table className="w-full text-left border-collapse">
                      <thead className="border-b border-[rgba(255,255,255,0.05)]">
                        <tr>
                          <th className="py-2 px-4 text-[rgb(var(--c-mute))] font-semibold text-xs uppercase tracking-wider">Header Name</th>
                          <th className="py-2 px-4 text-[rgb(var(--c-mute))] font-semibold text-xs uppercase tracking-wider">Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                        {filteredHeaders.map((h, i) => (
                          <tr key={i} className={`hover:bg-[rgba(255,255,255,0.02)] transition-colors ${h.isSecurity ? 'bg-[rgb(var(--c-accent))]/5' : ''}`}>
                            <td className="py-3 px-4 font-mono text-sm w-1/3 align-top break-all">
                              <span className={h.isSecurity ? 'text-[rgb(var(--c-accent))] font-bold flex items-center gap-1.5' : 'text-white'}>
                                {h.isSecurity && <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                                {h.key}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-mono text-sm text-[rgba(255,255,255,0.7)] align-top break-all">
                              {h.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {filteredHeaders.length === 0 && parsedHeaders.length > 0 && (
                    <div className="text-center p-4 text-[rgb(var(--c-mute))]">No headers match your filter.</div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
