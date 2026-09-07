'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function JwtDecoderPage() {
  const [jwtInput, setJwtInput] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');

  const parseJwt = (token: string) => {
    try {
      setError('');
      setHeader('');
      setPayload('');
      setSignature('');

      if (!token.trim()) return;

      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. Expected exactly 3 parts separated by dots.');
      }

      // Base64Url decode function
      const base64UrlDecode = (str: string) => {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
          case 0:
            break;
          case 2:
            output += '==';
            break;
          case 3:
            output += '=';
            break;
          default:
            throw new Error('Illegal base64url string!');
        }
        return decodeURIComponent(atob(output).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
      };

      const decodedHeader = JSON.parse(base64UrlDecode(parts[0]));
      const decodedPayload = JSON.parse(base64UrlDecode(parts[1]));

      setHeader(JSON.stringify(decodedHeader, null, 2));
      setPayload(JSON.stringify(decodedPayload, null, 2));
      setSignature(parts[2]);

    } catch (err) {
      setError('Invalid JWT structure or malformed Base64 payload.');
    }
  };

  useEffect(() => {
    parseJwt(jwtInput);
  }, [jwtInput]);

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">JWT Decoder</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Safely decode JSON Web Tokens entirely in your browser without sending the token to a server.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[650px]">
          {/* Input Pane */}
          <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md flex flex-col overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] flex justify-between items-center">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                Encoded Token
              </h3>
              <span className="text-xs text-[rgb(var(--c-mute))] uppercase tracking-wider font-semibold">Paste a JWT here</span>
            </div>
            
            <textarea
              value={jwtInput}
              onChange={(e) => setJwtInput(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
              className="w-full h-full p-6 bg-transparent text-white font-mono leading-relaxed focus:outline-none resize-none custom-scrollbar break-all"
              spellCheck="false"
            />
          </div>

          {/* Decoded Pane */}
          <div className="flex flex-col h-full gap-4">
            
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 shrink-0">
                <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <p className="text-red-400 font-semibold text-sm">{error}</p>
              </div>
            )}

            {/* Header */}
            <div className={`glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md flex flex-col overflow-hidden transition-all duration-300 ${header ? 'h-[180px]' : 'h-1/3 opacity-50'}`}>
              <div className="px-6 py-3 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
                <h3 className="text-red-400 font-semibold font-mono text-sm uppercase tracking-widest">Header <span className="text-[rgb(var(--c-mute))] lowercase ml-2 font-sans tracking-normal">Algorithm & Token Type</span></h3>
              </div>
              <div className="flex-grow bg-[rgba(0,0,0,0.2)] p-4 overflow-y-auto custom-scrollbar">
                {header ? (
                  <pre className="text-red-300 font-mono text-sm leading-relaxed">{header}</pre>
                ) : (
                  <div className="text-[rgb(var(--c-mute))] text-sm italic">Waiting for token...</div>
                )}
              </div>
            </div>

            {/* Payload */}
            <div className={`glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md flex flex-col overflow-hidden transition-all duration-300 ${payload ? 'flex-grow' : 'h-1/3 opacity-50'}`}>
              <div className="px-6 py-3 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
                <h3 className="text-purple-400 font-semibold font-mono text-sm uppercase tracking-widest">Payload <span className="text-[rgb(var(--c-mute))] lowercase ml-2 font-sans tracking-normal">Data (Claims)</span></h3>
              </div>
              <div className="flex-grow bg-[rgba(0,0,0,0.2)] p-4 overflow-y-auto custom-scrollbar">
                {payload ? (
                  <pre className="text-purple-300 font-mono text-sm leading-relaxed">{payload}</pre>
                ) : (
                  <div className="text-[rgb(var(--c-mute))] text-sm italic">Waiting for token...</div>
                )}
              </div>
            </div>

            {/* Signature */}
            <div className={`glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md flex flex-col overflow-hidden transition-all duration-300 ${signature ? 'h-[100px]' : 'h-1/3 opacity-50'}`}>
              <div className="px-6 py-3 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
                <h3 className="text-blue-400 font-semibold font-mono text-sm uppercase tracking-widest">Verify Signature</h3>
              </div>
              <div className="flex-grow bg-[rgba(0,0,0,0.2)] p-4 overflow-y-auto custom-scrollbar">
                {signature ? (
                  <div className="text-blue-300 font-mono text-xs leading-relaxed break-all">{signature}</div>
                ) : (
                  <div className="text-[rgb(var(--c-mute))] text-sm italic">Waiting for token...</div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
