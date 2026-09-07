'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function JwtInspectorPage() {
  const [jwt, setJwt] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const base64UrlDecode = (str: string) => {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: break;
      case 2: output += '=='; break;
      case 3: output += '='; break;
      default: throw new Error('Illegal base64url string!');
    }
    return decodeURIComponent(atob(output).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  };

  const decodeJwt = () => {
    setError(null);
    setResult(null);
    
    if (!jwt.trim()) {
      setError("Please paste a JWT.");
      return;
    }

    try {
      const parts = jwt.trim().split('.');
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format. Must contain exactly 3 parts (header.payload.signature).");
      }

      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));
      
      let warnings = [];
      if (header.alg === 'none' || header.alg === 'NONE') {
        warnings.push("⚠️ WARNING: Algorithm is set to 'none'. This token is insecure.");
      }

      const now = Math.floor(Date.now() / 1000);
      
      let expText = "Not present";
      if (payload.exp) {
        const expDate = new Date(payload.exp * 1000);
        const isExpired = payload.exp < now;
        if (isExpired) warnings.push("⚠️ WARNING: Token has expired.");
        expText = `${expDate.toISOString()} (${isExpired ? 'Expired' : 'Valid'})`;
      }

      let nbfText = "Not present";
      if (payload.nbf) {
        const nbfDate = new Date(payload.nbf * 1000);
        const notActive = payload.nbf > now;
        if (notActive) warnings.push("⚠️ WARNING: Token is not active yet (nbf).");
        nbfText = `${nbfDate.toISOString()} (${notActive ? 'Not active' : 'Active'})`;
      }
      
      if (payload.exp && payload.iat && (payload.exp - payload.iat > 31536000)) {
        warnings.push("⚠️ WARNING: Unusually long expiration time (> 1 year).");
      }

      setResult({
        header,
        payload,
        warnings,
        times: {
          exp: expText,
          nbf: nbfText,
          iat: payload.iat ? new Date(payload.iat * 1000).toISOString() : 'Not present'
        }
      });

    } catch (err: any) {
      setError("Decoding failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">JWT Inspector</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Decode, inspect, and analyze JSON Web Tokens securely offline.</p>
          <div className="mt-4 flex gap-2">
            <span className="inline-block px-3 py-1 bg-[rgba(255,255,255,0.05)] text-xs font-mono tracking-wider rounded-md border border-[rgba(255,255,255,0.1)]">
              LOCAL ONLY
            </span>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 md:p-8">
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">JSON Web Token</label>
            <textarea 
              value={jwt}
              onChange={(e) => setJwt(e.target.value)}
              placeholder="Paste your JWT here (xxxxx.yyyyy.zzzzz)..."
              className="w-full h-32 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 focus:outline-none focus:border-[rgb(var(--c-accent))] transition-colors font-mono text-sm break-all"
            />
          </div>

          <div className="flex gap-4 mb-8">
            <button 
              onClick={decodeJwt}
              className="px-8 py-3 bg-[rgb(var(--c-accent))] text-white font-bold rounded-lg hover:bg-blue-600 transition-colors"
            >
              Decode Token
            </button>
            <button 
              onClick={() => { setJwt(''); setResult(null); setError(null); }}
              className="px-6 py-3 rounded-lg border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
            >
              Clear
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 mb-6">
              {error}
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {result.warnings.length > 0 && (
                <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200">
                  {result.warnings.map((w: string, i: number) => (
                    <div key={i}>{w}</div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[rgb(var(--c-mute))] text-sm uppercase tracking-wider mb-2 font-bold">Header (Decoded)</h4>
                  <pre className="bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] p-4 rounded-xl overflow-x-auto text-[rgb(var(--c-accent))] font-mono text-sm">
                    {JSON.stringify(result.header, null, 2)}
                  </pre>
                </div>
                <div>
                  <h4 className="text-[rgb(var(--c-mute))] text-sm uppercase tracking-wider mb-2 font-bold">Payload (Decoded)</h4>
                  <pre className="bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] p-4 rounded-xl overflow-x-auto text-[#4ade80] font-mono text-sm">
                    {JSON.stringify(result.payload, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="bg-[rgba(0,0,0,0.2)] rounded-xl p-6 border border-[rgba(255,255,255,0.05)]">
                <h4 className="text-[rgb(var(--c-mute))] text-sm uppercase tracking-wider mb-4 font-bold">Time Claims</h4>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-[rgba(255,255,255,0.05)]">
                      <td className="py-2 text-[rgb(var(--c-mute))]">EXP (Expiration)</td>
                      <td className="py-2 font-mono text-right">{result.times.exp}</td>
                    </tr>
                    <tr className="border-b border-[rgba(255,255,255,0.05)]">
                      <td className="py-2 text-[rgb(var(--c-mute))]">NBF (Not Before)</td>
                      <td className="py-2 font-mono text-right">{result.times.nbf}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-[rgb(var(--c-mute))]">IAT (Issued At)</td>
                      <td className="py-2 font-mono text-right">{result.times.iat}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
