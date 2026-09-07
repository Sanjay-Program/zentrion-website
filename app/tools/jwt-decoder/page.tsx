'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JwtDecoderPage() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');
  const [isExpired, setIsExpired] = useState(false);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);

  const base64UrlDecode = (str: string) => {
    try {
      // Replace non-url compatible chars with base64 standard chars
      let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
      
      // Pad with standard base64 padding
      const pad = base64.length % 4;
      if (pad) {
        if (pad === 1) {
          throw new Error('Invalid base64url string');
        }
        base64 += new Array(5 - pad).join('=');
      }
      
      // Decode base64 to string, supporting UTF-8
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return new TextDecoder().decode(outputArray);
    } catch (e) {
      throw new Error('Failed to decode segment.');
    }
  };

  const formatJson = (jsonString: string) => {
    try {
      return JSON.stringify(JSON.parse(jsonString), null, 2);
    } catch (e) {
      return jsonString;
    }
  };

  useEffect(() => {
    if (!token.trim()) {
      setHeader('');
      setPayload('');
      setSignature('');
      setError('');
      setIsExpired(false);
      setExpiresAt(null);
      return;
    }

    try {
      const parts = token.trim().split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. Expected 3 parts separated by dots.');
      }

      const decodedHeader = formatJson(base64UrlDecode(parts[0]));
      const decodedPayload = formatJson(base64UrlDecode(parts[1]));
      
      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setSignature(parts[2]);
      setError('');

      // Check Expiration
      try {
        const payloadObj = JSON.parse(decodedPayload);
        if (payloadObj.exp) {
          const expDate = new Date(payloadObj.exp * 1000);
          setExpiresAt(expDate);
          setIsExpired(expDate.getTime() < Date.now());
        } else {
          setExpiresAt(null);
          setIsExpired(false);
        }
      } catch (e) {
        setExpiresAt(null);
        setIsExpired(false);
      }

    } catch (err: any) {
      setError(err.message || 'Invalid JWT.');
      setHeader('');
      setPayload('');
      setSignature('');
      setIsExpired(false);
      setExpiresAt(null);
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
            Token Analysis
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">JWT Decoder</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Decode and inspect JSON Web Tokens locally. Data never leaves your browser.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[650px]">
          
          {/* Input Pane */}
          <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md flex flex-col overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] flex justify-between items-center shrink-0">
              <h3 className="text-[rgb(var(--c-ink))] font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Encoded JWT
              </h3>
              <button
                onClick={() => setToken('')}
                className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-red-500/20 hover:text-red-400 border border-[var(--c-glass-border)] rounded text-[rgb(var(--c-mute))] text-sm transition-colors"
              >
                Clear
              </button>
            </div>
            
            <textarea
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="flex-grow p-6 bg-transparent text-[rgb(var(--c-ink))] font-mono text-sm leading-relaxed focus:outline-none resize-none custom-scrollbar break-all whitespace-pre-wrap"
              spellCheck="false"
            />
            
            {error && (
              <div className="m-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 font-mono text-sm">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                {error}
              </div>
            )}
          </div>

          {/* Output Pane */}
          <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md flex flex-col overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] flex justify-between items-center shrink-0 gap-4">
              <h3 className="text-[rgb(var(--c-ink))] font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                Decoded Token
              </h3>
              {expiresAt && (
                <div className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${isExpired ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-green-500/10 border-green-500/20 text-green-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${isExpired ? 'bg-red-400' : 'bg-green-400 animate-pulse'}`}></span>
                  {isExpired ? 'Expired' : 'Active'}
                </div>
              )}
            </div>
            
            <div className="flex-grow bg-[rgba(0,0,0,0.2)] overflow-y-auto custom-scrollbar">
              {!header && !payload && !error && (
                <div className="p-6 text-[rgb(var(--c-mute))] text-sm italic">
                  Paste a valid JWT to see its decoded contents...
                </div>
              )}
              
              {header && (
                <div className="p-6 border-b border-[var(--c-glass-border)]">
                  <h4 className="text-red-400 font-bold text-sm uppercase tracking-wider mb-2">Header</h4>
                  <pre className="text-red-300 font-mono text-sm overflow-x-auto custom-scrollbar">{header}</pre>
                </div>
              )}

              {payload && (
                <div className="p-6 border-b border-[var(--c-glass-border)]">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-purple-400 font-bold text-sm uppercase tracking-wider">Payload</h4>
                  </div>
                  <pre className="text-purple-300 font-mono text-sm overflow-x-auto custom-scrollbar">{payload}</pre>
                  
                  {expiresAt && (
                    <div className="mt-6 pt-4 border-t border-[var(--c-glass-border)]">
                      <div className="text-xs text-[rgb(var(--c-mute))] uppercase tracking-wider mb-1 font-bold">Expiration (exp)</div>
                      <div className="text-[rgb(var(--c-ink))] text-sm">{expiresAt.toLocaleString()}</div>
                    </div>
                  )}
                </div>
              )}

              {signature && (
                <div className="p-6">
                  <h4 className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-2">Signature (Base64Url)</h4>
                  <div className="text-blue-300 font-mono text-sm break-all opacity-80">{signature}</div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
