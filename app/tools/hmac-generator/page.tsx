'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HmacGeneratorPage() {
  const [message, setMessage] = useState('');
  const [secret, setSecret] = useState('');
  const [algorithm, setAlgorithm] = useState<'SHA-256' | 'SHA-384' | 'SHA-512' | 'SHA-1'>('SHA-256');
  const [outputFormat, setOutputFormat] = useState<'hex' | 'base64'>('hex');
  const [hmacResult, setHmacResult] = useState('');
  const [copied, setCopied] = useState(false);

  // Helper to convert ArrayBuffer to Hex
  const bufferToHex = (buffer: ArrayBuffer) => {
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  // Helper to convert ArrayBuffer to Base64
  const bufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const generateHmac = async () => {
    if (!message || !secret) {
      setHmacResult('');
      return;
    }

    try {
      const encoder = new TextEncoder();
      const keyData = encoder.encode(secret);
      const messageData = encoder.encode(message);

      // Import the secret key
      const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: algorithm },
        false,
        ['sign']
      );

      // Sign the message
      const signature = await window.crypto.subtle.sign(
        'HMAC',
        cryptoKey,
        messageData
      );

      // Format output
      if (outputFormat === 'hex') {
        setHmacResult(bufferToHex(signature));
      } else {
        setHmacResult(bufferToBase64(signature));
      }
    } catch (err) {
      console.error('HMAC generation failed', err);
      setHmacResult('Error generating HMAC. Ensure your browser supports Web Crypto API.');
    }
  };

  // Auto-generate as user types
  useEffect(() => {
    generateHmac();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, secret, algorithm, outputFormat]);

  const copyToClipboard = () => {
    if (!hmacResult) return;
    navigator.clipboard.writeText(hmacResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">HMAC Generator</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Securely generate Hash-based Message Authentication Codes using the Web Crypto API.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-2">Message (Payload)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter the string you want to hash..."
                    className="w-full h-32 px-4 py-3 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-2">Secret Key</label>
                  <input
                    type="text"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    placeholder="Enter a strong secret key..."
                    className="w-full px-4 py-3 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[rgb(var(--c-ink))] font-semibold">HMAC Signature</h3>
                <button 
                  onClick={copyToClipboard}
                  disabled={!hmacResult}
                  className="px-4 py-2 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] rounded-lg text-sm text-[rgb(var(--c-ink))] transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {copied ? (
                    <><svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Copied!</>
                  ) : (
                    <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Copy</>
                  )}
                </button>
              </div>

              <div className="bg-[rgba(17,17,17,0.05)] dark:bg-[rgba(0,0,0,0.3)] rounded-xl border border-[var(--c-glass-border)] p-6 min-h-[120px] flex items-center justify-center break-all relative group">
                {!hmacResult ? (
                  <span className="text-[rgb(var(--c-mute))] text-sm">Signature will appear here once you enter a message and secret key.</span>
                ) : (
                  <span className="font-mono text-xl text-[rgb(var(--c-accent))] leading-relaxed text-center">
                    {hmacResult}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6">
              <h3 className="text-[rgb(var(--c-ink))] font-semibold mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-[rgb(var(--c-accent))]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                Configuration
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-[rgb(var(--c-mute))] mb-3">Hash Algorithm</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['SHA-256', 'SHA-512', 'SHA-384', 'SHA-1'].map(alg => (
                      <button
                        key={alg}
                        onClick={() => setAlgorithm(alg as any)}
                        className={`py-2 px-3 text-sm font-mono rounded-lg border transition-all ${
                          algorithm === alg 
                            ? 'bg-[rgb(var(--c-accent))] border-[rgb(var(--c-accent))] text-[rgb(var(--c-void))] font-bold' 
                            : 'bg-[var(--c-glass-bg)] border-[var(--c-glass-border)] text-[rgb(var(--c-mute))] hover:border-[rgba(255,255,255,0.3)]'
                        }`}
                      >
                        {alg}
                      </button>
                    ))}
                  </div>
                  {algorithm === 'SHA-1' && (
                    <p className="text-xs text-yellow-500 mt-2">Warning: SHA-1 is cryptographically weak and generally not recommended.</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-[rgb(var(--c-mute))] mb-3">Output Format</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setOutputFormat('hex')}
                      className={`py-2 px-3 text-sm rounded-lg border transition-all ${
                        outputFormat === 'hex' 
                          ? 'bg-white/10 border-white text-[rgb(var(--c-ink))] font-bold' 
                          : 'bg-[var(--c-glass-bg)] border-[var(--c-glass-border)] text-[rgb(var(--c-mute))] hover:border-[rgba(255,255,255,0.3)]'
                      }`}
                    >
                      Hexadecimal
                    </button>
                    <button
                      onClick={() => setOutputFormat('base64')}
                      className={`py-2 px-3 text-sm rounded-lg border transition-all ${
                        outputFormat === 'base64' 
                          ? 'bg-white/10 border-white text-[rgb(var(--c-ink))] font-bold' 
                          : 'bg-[var(--c-glass-bg)] border-[var(--c-glass-border)] text-[rgb(var(--c-mute))] hover:border-[rgba(255,255,255,0.3)]'
                      }`}
                    >
                      Base64
                    </button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-[var(--c-glass-border)]">
                  <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <svg className="w-5 h-5 text-green-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    <div>
                      <h4 className="text-sm font-semibold text-green-400">100% Secure</h4>
                      <p className="text-xs text-green-400/80 mt-1">Hashing is performed strictly locally via your browser's Web Crypto API. Neither the message nor the secret ever touches a server.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
