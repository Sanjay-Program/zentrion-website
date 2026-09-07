'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CertificateDecoderPage() {
  const [certInput, setCertInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const decodeCertificate = async () => {
    setError(null);
    setResult(null);

    try {
      const pem = certInput.trim();
      if (!pem) throw new Error("Please paste a PEM certificate.");

      if (!pem.includes('-----BEGIN CERTIFICATE-----')) {
        throw new Error("Invalid PEM format. Missing -----BEGIN CERTIFICATE-----");
      }

      const b64 = pem.replace(/-----BEGIN CERTIFICATE-----/g, '')
                     .replace(/-----END CERTIFICATE-----/g, '')
                     .replace(/\s+/g, '');
                     
      const der = Uint8Array.from(atob(b64), c => c.charCodeAt(0));

      // Calculate SHA-256 fingerprint
      const hashBuffer = await crypto.subtle.digest('SHA-256', der);
      const fingerprint = Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0').toUpperCase())
        .join(':');

      // Basic ASN.1 DER Parser for X.509
      let offset = 0;
      
      const readLength = () => {
        let len = der[offset++];
        if (len & 0x80) {
          const numBytes = len & 0x7F;
          len = 0;
          for (let i = 0; i < numBytes; i++) {
            len = (len << 8) | der[offset++];
          }
        }
        return len;
      };

      const readTag = () => der[offset++];

      const seqTag = readTag();
      if (seqTag !== 0x30) throw new Error("Invalid certificate: does not start with SEQUENCE");
      readLength(); // seq length

      const tbsTag = readTag();
      if (tbsTag !== 0x30) throw new Error("Invalid certificate: no tbsCertificate");
      readLength(); // tbs length

      const strings: string[] = [];
      const dates: Date[] = [];
      
      for(let i=0; i<der.length - 2; i++) {
        const t = der[i];
        if (t === 0x13 || t === 0x0C || t === 0x16) { // Printable, UTF8, IA5
          const l = der[i+1];
          if (l > 0 && l < 100 && i + 2 + l <= der.length) {
            let str = '';
            let valid = true;
            for (let j=0; j<l; j++) {
              const charCode = der[i+2+j];
              if (charCode < 32 || charCode > 126) { valid = false; break; }
              str += String.fromCharCode(charCode);
            }
            if (valid && str.length > 2) strings.push(str);
          }
        }
        
        if (t === 0x17) { // UTCTime
          const l = der[i+1];
          if (l === 13) {
            let str = '';
            for (let j=0; j<l; j++) str += String.fromCharCode(der[i+2+j]);
            if (str.endsWith('Z')) {
              let yr = parseInt(str.substring(0,2));
              yr += (yr < 50) ? 2000 : 1900;
              dates.push(new Date(Date.UTC(yr, parseInt(str.substring(2,4))-1, parseInt(str.substring(4,6)), parseInt(str.substring(6,8)), parseInt(str.substring(8,10)), parseInt(str.substring(10,12)))));
            }
          }
        }
      }

      let expirationStatus = 'Unknown';
      let notBefore = dates.length > 0 ? dates[0] : null;
      let notAfter = dates.length > 1 ? dates[1] : (dates.length === 1 ? dates[0] : null);
      let statusColor = 'var(--c-mute)';

      if (notAfter) {
        const now = new Date();
        const diffDays = Math.ceil((notAfter.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        if (now > notAfter) {
          expirationStatus = `Expired (was valid until ${notAfter.toISOString()})`;
          statusColor = 'rgb(var(--c-danger))';
        } else if (notBefore && now < notBefore) {
          expirationStatus = `Not yet valid (valid from ${notBefore.toISOString()})`;
          statusColor = 'rgb(var(--c-warning))';
        } else {
          expirationStatus = `Valid (Expires in ${diffDays} days, on ${notAfter.toISOString()})`;
          statusColor = '#4ade80';
        }
      }

      setResult({ fingerprint, expirationStatus, statusColor, strings });

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Certificate Decoder</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Parse and inspect X.509 PEM certificates securely in your browser.</p>
          <div className="mt-4 flex gap-2">
            <span className="inline-block px-3 py-1 bg-[rgba(255,255,255,0.05)] text-xs font-mono tracking-wider rounded-md border border-[var(--c-glass-border)]">
              LOCAL ONLY
            </span>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 md:p-8">
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Paste PEM Certificate</label>
            <textarea 
              value={certInput}
              onChange={(e) => setCertInput(e.target.value)}
              placeholder={`-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----`}
              className="w-full h-48 bg-[rgba(17,17,17,0.05)] dark:bg-[rgba(0,0,0,0.3)] border border-[var(--c-glass-border)] rounded-lg px-4 py-3 focus:outline-none focus:border-[rgb(var(--c-accent))] transition-colors font-mono text-sm break-all"
            />
          </div>

          <div className="flex gap-4 mb-8">
            <button 
              onClick={decodeCertificate}
              className="px-8 py-3 bg-[rgb(var(--c-accent))] text-white font-bold rounded-lg hover:bg-blue-600 transition-colors"
            >
              Decode Certificate
            </button>
            <button 
              onClick={() => { setCertInput(''); setResult(null); setError(null); }}
              className="px-6 py-3 rounded-lg border border-[var(--c-glass-border)] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
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
            <div className="bg-[rgba(0,0,0,0.2)] rounded-xl p-6 border border-[var(--c-glass-border)]">
              <h4 className="text-[rgb(var(--c-mute))] text-sm uppercase tracking-wider mb-4 font-bold">Certificate Details</h4>
              
              <table className="w-full text-left table-fixed">
                <tbody>
                  <tr className="border-b border-[var(--c-glass-border)]">
                    <td className="py-3 text-[rgb(var(--c-mute))] w-1/3 pr-4">SHA-256 Fingerprint</td>
                    <td className="py-3 font-mono text-[rgb(var(--c-accent))] break-all text-sm">{result.fingerprint}</td>
                  </tr>
                  <tr className="border-b border-[var(--c-glass-border)]">
                    <td className="py-3 text-[rgb(var(--c-mute))] pr-4">Status</td>
                    <td className="py-3 font-bold" style={{ color: result.statusColor }}>{result.expirationStatus}</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-[rgb(var(--c-mute))] pr-4">
                      Extracted Text Entities<br/>
                      <span className="text-xs opacity-70">(Subject/Issuer details)</span>
                    </td>
                    <td className="py-3">
                      <ul className="list-disc pl-5 space-y-1 text-sm font-mono text-[rgb(var(--c-ink))]">
                        {result.strings.map((str: string, i: number) => (
                          <li key={i}>{str}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-6 text-xs text-[rgb(var(--c-mute))]">* Uses a heuristic ASN.1 parser. Does NOT verify trust chain or signature validity.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
