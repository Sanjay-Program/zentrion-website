'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface UrlAnalysis {
  href: string;
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  username?: string;
  password?: string;
  searchParams: Record<string, string>;
  isSecure: boolean;
  isIpUrl: boolean;
}

export default function UrlAnalyzerPage() {
  const [urlInput, setUrlInput] = useState('');
  const [result, setResult] = useState<UrlAnalysis | null>(null);
  const [error, setError] = useState('');

  const analyzeUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setError('');
    setResult(null);

    try {
      // Auto-prefix http if no protocol is provided to allow parsing
      let processUrl = urlInput.trim();
      if (!/^[\w-]+:\/\//i.test(processUrl)) {
        processUrl = 'http://' + processUrl;
      }

      const parsed = new URL(processUrl);
      
      const params: Record<string, string> = {};
      parsed.searchParams.forEach((value, key) => {
        params[key] = value;
      });

      const isIpUrl = /^(\d{1,3}\.){3}\d{1,3}$/.test(parsed.hostname) || parsed.hostname.includes(':');

      setResult({
        href: parsed.href,
        protocol: parsed.protocol.replace(':', ''),
        host: parsed.host,
        hostname: parsed.hostname,
        port: parsed.port || (parsed.protocol === 'https:' ? '443 (implicit)' : parsed.protocol === 'http:' ? '80 (implicit)' : ''),
        pathname: parsed.pathname,
        search: parsed.search,
        hash: parsed.hash,
        username: parsed.username || undefined,
        password: parsed.password || undefined,
        searchParams: params,
        isSecure: parsed.protocol === 'https:',
        isIpUrl
      });
    } catch (err) {
      setError('Invalid URL format. Please check the syntax.');
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">URL Analyzer</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Safely parse and extract components from complex, obfuscated, or suspicious URLs.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <form onSubmit={analyzeUrl} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[rgb(var(--c-mute))]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              </div>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/path?query=123#hash"
                className="w-full pl-12 pr-4 py-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
                required
              />
            </div>
            <button
              type="submit"
              disabled={!urlInput}
              className="btn-primary py-4 px-8 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
            >
              Analyze URL
            </button>
          </form>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <div>
              <h3 className="text-red-400 font-semibold">Analysis Failed</h3>
              <p className="text-red-400/80 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Visual URL Breakdown */}
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 md:p-8">
              <h3 className="text-[rgb(var(--c-mute))] text-sm font-semibold uppercase tracking-widest mb-6">Normalized URL</h3>
              <div className="font-mono text-lg md:text-xl break-all leading-relaxed">
                <span className={result.isSecure ? 'text-green-400 font-bold' : 'text-yellow-400 font-bold'}>{result.protocol}://</span>
                {(result.username || result.password) && (
                  <span className="text-red-400">
                    {result.username}{result.password ? `:${result.password}` : ''}@
                  </span>
                )}
                <span className="text-white font-bold">{result.hostname}</span>
                {!result.port.includes('implicit') && result.port && (
                  <span className="text-purple-400">:{result.port}</span>
                )}
                <span className="text-blue-400">{result.pathname}</span>
                <span className="text-orange-400">{result.search}</span>
                <span className="text-pink-400">{result.hash}</span>
              </div>
              
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-lg p-4">
                  <div className="text-[rgb(var(--c-mute))] text-xs uppercase mb-1">Security</div>
                  <div className={`font-bold flex items-center gap-1 ${result.isSecure ? 'text-green-400' : 'text-yellow-400'}`}>
                    {result.isSecure ? (
                      <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> Secure (TLS)</>
                    ) : (
                      <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg> Insecure</>
                    )}
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-lg p-4">
                  <div className="text-[rgb(var(--c-mute))] text-xs uppercase mb-1">Target Type</div>
                  <div className="font-bold text-white">
                    {result.isIpUrl ? 'IP Address' : 'Domain Name'}
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-lg p-4">
                  <div className="text-[rgb(var(--c-mute))] text-xs uppercase mb-1">Query Params</div>
                  <div className="font-bold text-white">
                    {Object.keys(result.searchParams).length} found
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-lg p-4">
                  <div className="text-[rgb(var(--c-mute))] text-xs uppercase mb-1">Authentication</div>
                  <div className="font-bold text-white">
                    {result.username ? 'Present' : 'None'}
                  </div>
                </div>
              </div>
            </div>

            {/* Component Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden h-fit">
                <div className="border-b border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-6 py-4">
                  <h2 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-semibold">URL Components</h2>
                </div>
                <table className="w-full text-left border-collapse">
                  <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                    <tr className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                      <td className="py-3 px-6 text-sm text-[rgb(var(--c-mute))] font-semibold">Protocol</td>
                      <td className="py-3 px-6 font-mono text-sm text-[rgb(var(--c-accent))]">{result.protocol}</td>
                    </tr>
                    <tr className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                      <td className="py-3 px-6 text-sm text-[rgb(var(--c-mute))] font-semibold">Hostname</td>
                      <td className="py-3 px-6 font-mono text-sm text-white break-all">{result.hostname}</td>
                    </tr>
                    <tr className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                      <td className="py-3 px-6 text-sm text-[rgb(var(--c-mute))] font-semibold">Port</td>
                      <td className="py-3 px-6 font-mono text-sm text-purple-400">{result.port || '-'}</td>
                    </tr>
                    <tr className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                      <td className="py-3 px-6 text-sm text-[rgb(var(--c-mute))] font-semibold">Path</td>
                      <td className="py-3 px-6 font-mono text-sm text-blue-400 break-all">{result.pathname}</td>
                    </tr>
                    <tr className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                      <td className="py-3 px-6 text-sm text-[rgb(var(--c-mute))] font-semibold">Hash / Fragment</td>
                      <td className="py-3 px-6 font-mono text-sm text-pink-400 break-all">{result.hash || '-'}</td>
                    </tr>
                    {result.username && (
                      <tr className="hover:bg-[rgba(255,255,255,0.02)] transition-colors bg-red-500/5">
                        <td className="py-3 px-6 text-sm text-red-400 font-semibold">Username</td>
                        <td className="py-3 px-6 font-mono text-sm text-red-400 break-all">{result.username}</td>
                      </tr>
                    )}
                    {result.password && (
                      <tr className="hover:bg-[rgba(255,255,255,0.02)] transition-colors bg-red-500/5">
                        <td className="py-3 px-6 text-sm text-red-400 font-semibold">Password</td>
                        <td className="py-3 px-6 font-mono text-sm text-red-400 break-all">********</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden h-fit">
                <div className="border-b border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-6 py-4 flex justify-between items-center">
                  <h2 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-semibold">Query Parameters</h2>
                  <span className="bg-[rgba(255,255,255,0.1)] text-white text-xs px-2 py-0.5 rounded-full">{Object.keys(result.searchParams).length}</span>
                </div>
                {Object.keys(result.searchParams).length > 0 ? (
                  <table className="w-full text-left border-collapse">
                    <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                      {Object.entries(result.searchParams).map(([key, value], idx) => (
                        <tr key={idx} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                          <td className="py-3 px-6 text-sm font-mono text-orange-400 break-all w-1/3">{key}</td>
                          <td className="py-3 px-6 font-mono text-sm text-[rgba(255,255,255,0.8)] break-all">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-8 text-center text-[rgb(var(--c-mute))]">
                    No query parameters found in this URL.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
