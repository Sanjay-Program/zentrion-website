'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function IpConverterPage() {
  const [ip, setIp] = useState('');
  const [decimal, setDecimal] = useState('');
  const [hex, setHex] = useState('');
  const [octal, setOctal] = useState('');
  const [error, setError] = useState('');

  const convertIp = (input: string) => {
    if (!input.trim()) {
      setDecimal('');
      setHex('');
      setOctal('');
      setError('');
      return;
    }

    const parts = input.trim().split('.');
    if (parts.length !== 4) {
      setError('Invalid IPv4 format. Ensure you provide 4 octets (e.g., 127.0.0.1).');
      setDecimal('');
      setHex('');
      setOctal('');
      return;
    }

    for (const part of parts) {
      if (!/^\d+$/.test(part) || parseInt(part, 10) > 255 || parseInt(part, 10) < 0) {
        setError('Invalid octet found. Each part must be between 0 and 255.');
        setDecimal('');
        setHex('');
        setOctal('');
        return;
      }
    }

    setError('');

    const octetValues = parts.map(p => parseInt(p, 10));

    // Calculate Decimal
    // formula: (first octet * 256^3) + (second octet * 256^2) + (third octet * 256) + (fourth octet)
    // using BigInt to avoid precision issues in JS just in case, though 32-bit fits in Number
    const decimalValue = 
      (BigInt(octetValues[0]) << 24n) |
      (BigInt(octetValues[1]) << 16n) |
      (BigInt(octetValues[2]) << 8n) |
      BigInt(octetValues[3]);
    
    setDecimal(decimalValue.toString());

    // Calculate Hex (0x format)
    const hexParts = octetValues.map(v => v.toString(16).padStart(2, '0'));
    setHex(`0x${hexParts.join('').toUpperCase()}`);

    // Calculate Octal (per octet padded)
    const octalParts = octetValues.map(v => `0${v.toString(8)}`);
    setOctal(octalParts.join('.'));
  };

  useEffect(() => {
    convertIp(ip);
  }, [ip]);

  const copyToClipboard = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard!`);
  };

  const OutputCard = ({ title, value, description }: { title: string, value: string, description: string }) => (
    <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] flex justify-between items-center">
        <h3 className="text-[rgb(var(--c-accent))] font-bold uppercase tracking-widest text-sm flex items-center gap-2">
          {title}
        </h3>
        <button
          onClick={() => copyToClipboard(value, title)}
          disabled={!value}
          className="text-xs px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] rounded text-[rgb(var(--c-ink))] transition-colors disabled:opacity-50 flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          Copy
        </button>
      </div>
      <div className="p-6 bg-[rgba(0,0,0,0.2)] flex-grow">
        {value ? (
          <div>
            <div className="font-mono text-[rgb(var(--c-ink))] text-xl sm:text-2xl break-all">
              {value}
            </div>
            <p className="text-sm text-[rgb(var(--c-mute))] mt-4">{description}</p>
            <div className="mt-4 pt-4 border-t border-[var(--c-glass-border)]">
              <div className="text-xs text-[rgb(var(--c-mute))] mb-1">Example usage in browser:</div>
              <code className="text-xs bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded text-[rgb(var(--c-ink))]/80 select-all font-mono">http://{value}</code>
            </div>
          </div>
        ) : (
          <div className="text-[rgb(var(--c-mute))] text-sm italic">
            Converted output will appear here...
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Payload Evasion
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">IP Address Converter</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Convert standard IPv4 addresses into Decimal, Hexadecimal, and Octal formats to bypass SSRF and WAF filters.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <label className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-3">IPv4 Address</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="127.0.0.1"
            className="w-full px-4 py-4 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono text-lg"
          />
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p className="text-red-400 font-semibold text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <OutputCard 
            title="Decimal (Integer)" 
            value={decimal} 
            description="The entire IP address calculated as a single 32-bit integer. Very commonly accepted by browsers and cURL." 
          />
          <OutputCard 
            title="Hexadecimal" 
            value={hex} 
            description="The IP address converted into a single hex value. Must start with 0x to be parsed correctly by networking tools." 
          />
          <OutputCard 
            title="Octal" 
            value={octal} 
            description="Each octet converted into base-8, padded with a leading zero. Tricky for WAFs because it maintains the dot notation." 
          />
        </div>

      </div>
    </div>
  );
}
