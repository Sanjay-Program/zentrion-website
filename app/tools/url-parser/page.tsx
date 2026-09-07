'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UrlParserPage() {
  const [inputUrl, setInputUrl] = useState('');
  const [parsedUrl, setParsedUrl] = useState<URL | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!inputUrl.trim()) {
      setParsedUrl(null);
      setError('');
      return;
    }

    try {
      // Add a dummy protocol if none is provided so the URL parser still works for things like "example.com/path"
      let urlToParse = inputUrl;
      if (!/^https?:\/\//i.test(inputUrl) && !/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(inputUrl)) {
        urlToParse = 'http://' + inputUrl;
      }
      const url = new URL(urlToParse);
      setParsedUrl(url);
      setError('');
    } catch (err) {
      setParsedUrl(null);
      setError('Invalid URL format.');
    }
  }, [inputUrl]);

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  const renderComponent = (label: string, value: string, highlight: boolean = false) => {
    if (!value && label !== 'Path') return null;
    
    return (
      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-4 flex justify-between items-center group hover:bg-[rgba(255,255,255,0.04)] transition-colors">
        <div>
          <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">{label}</div>
          <div className={`font-mono text-sm sm:text-base break-all ${highlight ? 'text-[rgb(var(--c-accent))] font-bold' : 'text-white'}`}>
            {value || '/'}
          </div>
        </div>
        <button
          onClick={() => copyToClipboard(value)}
          className="p-2 text-[rgb(var(--c-mute))] hover:text-white bg-[rgba(255,255,255,0.05)] rounded-lg opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all"
          title="Copy"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">URL Parser</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Deconstruct any URL into its core components and decode query parameters.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <label className="block text-sm font-semibold text-white mb-3">Input URL</label>
          <textarea
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="https://user:pass@www.example.com:8080/path/to/page?name=zentrion&sort=asc#section"
            className="w-full h-24 px-4 py-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono resize-none"
            spellCheck="false"
          />
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p className="text-red-400 font-semibold">{error}</p>
          </div>
        )}

        {parsedUrl && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            
            <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md overflow-hidden">
              <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)]">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                  Components
                </h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-[rgba(0,0,0,0.2)]">
                {renderComponent('Protocol / Scheme', parsedUrl.protocol.replace(':', ''), true)}
                {renderComponent('Hostname', parsedUrl.hostname)}
                {renderComponent('Port', parsedUrl.port)}
                {renderComponent('Path', parsedUrl.pathname)}
                {renderComponent('Username', parsedUrl.username)}
                {renderComponent('Password', parsedUrl.password)}
                {renderComponent('Hash / Fragment', parsedUrl.hash)}
              </div>
            </div>

            {Array.from(parsedUrl.searchParams.keys()).length > 0 && (
              <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md overflow-hidden">
                <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)]">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Query Parameters
                  </h3>
                </div>
                <div className="bg-[rgba(0,0,0,0.2)] overflow-x-auto p-0">
                  <table className="w-full text-left border-collapse">
                    <thead className="border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
                      <tr>
                        <th className="py-3 px-6 text-[rgb(var(--c-mute))] font-semibold text-xs uppercase tracking-wider w-1/3">Key</th>
                        <th className="py-3 px-6 text-[rgb(var(--c-mute))] font-semibold text-xs uppercase tracking-wider">Value (Decoded)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                      {Array.from(parsedUrl.searchParams.entries()).map(([key, value], idx) => (
                        <tr key={idx} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors group">
                          <td className="py-4 px-6 font-mono text-sm text-[rgb(var(--c-accent))] font-bold break-all">
                            {key}
                          </td>
                          <td className="py-4 px-6 font-mono text-sm text-white break-all flex justify-between items-center gap-4">
                            <span>{value}</span>
                            <button
                              onClick={() => copyToClipboard(value)}
                              className="p-1.5 text-[rgb(var(--c-mute))] hover:text-white bg-[rgba(255,255,255,0.05)] rounded opacity-0 group-hover:opacity-100 transition-all shrink-0"
                              title="Copy value"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
