'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UrlParserPage() {
  const [urlInput, setUrlInput] = useState('');
  const [parsedData, setParsedData] = useState<{
    protocol: string;
    username: string;
    password: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
    searchParams: { key: string; value: string }[];
  } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!urlInput.trim()) {
      setParsedData(null);
      setError('');
      return;
    }

    try {
      // Add a dummy protocol if it's missing just so URL constructor doesn't fail for domain-only inputs
      let urlToParse = urlInput;
      if (!/^https?:\/\//i.test(urlToParse) && !/^[a-z]+:\/\//i.test(urlToParse)) {
        urlToParse = `http://${urlToParse}`;
      }

      const url = new URL(urlToParse);
      
      const searchParams: { key: string; value: string }[] = [];
      url.searchParams.forEach((value, key) => {
        searchParams.push({ key, value });
      });

      setParsedData({
        protocol: url.protocol.replace(':', ''),
        username: url.username,
        password: url.password,
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? '443 (default)' : url.protocol === 'http:' ? '80 (default)' : 'N/A'),
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        searchParams,
      });
      setError('');
    } catch (err) {
      setParsedData(null);
      setError('Invalid URL format. Please enter a valid URL.');
    }
  }, [urlInput]);

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            Networking Utility
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">URL Parser & Analyzer</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Deconstruct any URL into its core components and extract query parameters instantly.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <label className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-3">Input URL</label>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://user:pass@www.example.com:8080/path/to/page?query=123#section"
            className="w-full px-4 py-4 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono text-sm sm:text-base"
            spellCheck="false"
          />
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p className="text-red-400 font-semibold text-sm">{error}</p>
          </div>
        )}

        {parsedData && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              <div className="glass-card rounded-xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] p-5 flex flex-col justify-between group relative hover:bg-[rgba(255,255,255,0.04)] transition-colors">
                <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-2">Protocol</div>
                <div className="font-mono text-[rgb(var(--c-ink))] text-lg break-all">{parsedData.protocol || '-'}</div>
                {parsedData.protocol && (
                  <button onClick={() => copyToClipboard(parsedData.protocol)} className="absolute top-4 right-4 text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-ink))] opacity-0 group-hover:opacity-100 transition-opacity"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
                )}
              </div>

              <div className="glass-card rounded-xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] p-5 flex flex-col justify-between group relative hover:bg-[rgba(255,255,255,0.04)] transition-colors">
                <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-2">Hostname / Domain</div>
                <div className="font-mono text-[rgb(var(--c-ink))] text-lg break-all">{parsedData.hostname || '-'}</div>
                {parsedData.hostname && (
                  <button onClick={() => copyToClipboard(parsedData.hostname)} className="absolute top-4 right-4 text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-ink))] opacity-0 group-hover:opacity-100 transition-opacity"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
                )}
              </div>

              <div className="glass-card rounded-xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] p-5 flex flex-col justify-between group relative hover:bg-[rgba(255,255,255,0.04)] transition-colors">
                <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-2">Port</div>
                <div className="font-mono text-[rgb(var(--c-accent))] text-lg break-all">{parsedData.port || '-'}</div>
                {parsedData.port && parsedData.port !== 'N/A' && (
                  <button onClick={() => copyToClipboard(parsedData.port.split(' ')[0])} className="absolute top-4 right-4 text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-ink))] opacity-0 group-hover:opacity-100 transition-opacity"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
                )}
              </div>

              <div className="glass-card rounded-xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] p-5 flex flex-col justify-between group relative hover:bg-[rgba(255,255,255,0.04)] transition-colors md:col-span-2 lg:col-span-3">
                <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-2">Pathname</div>
                <div className="font-mono text-[rgb(var(--c-ink))] text-lg break-all">{parsedData.pathname || '/'}</div>
                {parsedData.pathname && (
                  <button onClick={() => copyToClipboard(parsedData.pathname)} className="absolute top-4 right-4 text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-ink))] opacity-0 group-hover:opacity-100 transition-opacity"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
                )}
              </div>

              {(parsedData.username || parsedData.password) && (
                <>
                  <div className="glass-card rounded-xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] p-5 flex flex-col justify-between group relative hover:bg-[rgba(255,255,255,0.04)] transition-colors">
                    <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-2">Username</div>
                    <div className="font-mono text-[rgb(var(--c-ink))] text-lg break-all">{parsedData.username || '-'}</div>
                    {parsedData.username && (
                      <button onClick={() => copyToClipboard(parsedData.username)} className="absolute top-4 right-4 text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-ink))] opacity-0 group-hover:opacity-100 transition-opacity"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
                    )}
                  </div>
                  <div className="glass-card rounded-xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] p-5 flex flex-col justify-between group relative hover:bg-[rgba(255,255,255,0.04)] transition-colors">
                    <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-2">Password</div>
                    <div className="font-mono text-[rgb(var(--c-ink))] text-lg break-all">{parsedData.password || '-'}</div>
                    {parsedData.password && (
                      <button onClick={() => copyToClipboard(parsedData.password)} className="absolute top-4 right-4 text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-ink))] opacity-0 group-hover:opacity-100 transition-opacity"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
                    )}
                  </div>
                </>
              )}

              <div className="glass-card rounded-xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] p-5 flex flex-col justify-between group relative hover:bg-[rgba(255,255,255,0.04)] transition-colors md:col-span-2 lg:col-span-3">
                <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-2">Fragment (Hash)</div>
                <div className="font-mono text-purple-400 text-lg break-all">{parsedData.hash || '-'}</div>
                {parsedData.hash && (
                  <button onClick={() => copyToClipboard(parsedData.hash)} className="absolute top-4 right-4 text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-ink))] opacity-0 group-hover:opacity-100 transition-opacity"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
                )}
              </div>

            </div>

            {parsedData.searchParams.length > 0 && (
              <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md overflow-hidden">
                <div className="px-6 py-4 border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] flex justify-between items-center">
                  <h3 className="text-[rgb(var(--c-ink))] font-semibold">Query Parameters ({parsedData.searchParams.length})</h3>
                </div>
                <div className="divide-y divide-[var(--c-glass-border)]">
                  {parsedData.searchParams.map((param, idx) => (
                    <div key={idx} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 hover:bg-[var(--c-glass-bg)] transition-colors group">
                      <div className="sm:w-1/3 flex items-start gap-2">
                        <span className="text-[rgb(var(--c-accent))] font-mono break-all">{param.key}</span>
                      </div>
                      <div className="sm:w-2/3 flex items-start justify-between gap-4">
                        <span className="text-[rgb(var(--c-ink))] font-mono break-all">{param.value}</span>
                        <button
                          onClick={() => copyToClipboard(param.value)}
                          className="p-1.5 text-[rgb(var(--c-mute))] hover:text-white bg-[rgba(255,255,255,0.05)] rounded opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all shrink-0"
                          title="Copy Value"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
