'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RsaGeneratorPage() {
  const [keySize, setKeySize] = useState(2048);
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copiedPublic, setCopiedPublic] = useState(false);
  const [copiedPrivate, setCopiedPrivate] = useState(false);

  // Convert ArrayBuffer to Base64 String
  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  // Format as PEM with 64 chars per line
  const formatPEM = (base64String: string, type: 'PUBLIC' | 'PRIVATE') => {
    const lines = base64String.match(/.{1,64}/g) || [];
    return `-----BEGIN ${type} KEY-----\n${lines.join('\n')}\n-----END ${type} KEY-----`;
  };

  const generateKeys = async () => {
    setGenerating(true);
    setPublicKey('');
    setPrivateKey('');
    
    try {
      // Small timeout to allow UI to update to "generating..." state
      await new Promise(resolve => setTimeout(resolve, 50));

      const keyPair = await window.crypto.subtle.generateKey(
        {
          name: 'RSASSA-PKCS1-v1_5',
          modulusLength: keySize,
          publicExponent: new Uint8Array([1, 0, 1]), // 65537
          hash: 'SHA-256',
        },
        true,
        ['sign', 'verify']
      );

      // Export Public Key (SPKI)
      const exportedPublic = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
      const b64Public = arrayBufferToBase64(exportedPublic);
      setPublicKey(formatPEM(b64Public, 'PUBLIC'));

      // Export Private Key (PKCS#8)
      const exportedPrivate = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
      const b64Private = arrayBufferToBase64(exportedPrivate);
      setPrivateKey(formatPEM(b64Private, 'PRIVATE'));

    } catch (err) {
      console.error('Failed to generate RSA keys:', err);
      alert('Failed to generate keys. Your browser may not support Web Crypto API.');
    } finally {
      setGenerating(false);
    }
  };

  const copyKey = (keyText: string, isPublic: boolean) => {
    if (!keyText) return;
    navigator.clipboard.writeText(keyText);
    
    if (isPublic) {
      setCopiedPublic(true);
      setTimeout(() => setCopiedPublic(false), 2000);
    } else {
      setCopiedPrivate(true);
      setTimeout(() => setCopiedPrivate(false), 2000);
    }
  };

  const downloadKey = (keyText: string, filename: string) => {
    if (!keyText) return;
    const blob = new Blob([keyText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Zero Trust Cryptography
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">RSA Key Generator</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Securely generate RSA Public/Private key pairs directly in your browser. Keys never touch a server.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex-grow">
            <label className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-3">Key Size (Modulus Length)</label>
            <div className="flex flex-wrap gap-3">
              <label className={`px-4 py-2 border rounded-lg cursor-pointer transition-all ${keySize === 2048 ? 'bg-[rgb(var(--c-accent))] border-[rgb(var(--c-accent))] text-[rgb(var(--c-void))] font-bold' : 'bg-[var(--c-glass-bg)] border-[var(--c-glass-border)] text-white hover:border-[rgba(255,255,255,0.3)]'}`}>
                <input type="radio" checked={keySize === 2048} onChange={() => setKeySize(2048)} className="sr-only" />
                2048-bit (Standard)
              </label>
              <label className={`px-4 py-2 border rounded-lg cursor-pointer transition-all ${keySize === 4096 ? 'bg-[rgb(var(--c-accent))] border-[rgb(var(--c-accent))] text-[rgb(var(--c-void))] font-bold' : 'bg-[var(--c-glass-bg)] border-[var(--c-glass-border)] text-white hover:border-[rgba(255,255,255,0.3)]'}`}>
                <input type="radio" checked={keySize === 4096} onChange={() => setKeySize(4096)} className="sr-only" />
                4096-bit (High Security)
              </label>
            </div>
            <p className="text-xs text-[rgb(var(--c-mute))] mt-3">4096-bit keys are highly secure but take noticeably longer to generate in the browser.</p>
          </div>

          <button
            onClick={generateKeys}
            disabled={generating}
            className="btn-primary py-4 px-8 whitespace-nowrap w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]"
          >
            {generating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Generating...
              </span>
            ) : (
              'Generate Keys'
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Public Key */}
          <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md flex flex-col overflow-hidden h-[500px]">
            <div className="px-6 py-4 border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] flex flex-wrap gap-4 justify-between items-center shrink-0">
              <h3 className="text-[rgb(var(--c-ink))] font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
                Public Key (SPKI)
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => copyKey(publicKey, true)}
                  disabled={!publicKey}
                  className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] text-[rgb(var(--c-ink))] rounded text-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {copiedPublic ? <><svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Copied</> : <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Copy</>}
                </button>
                <button
                  onClick={() => downloadKey(publicKey, 'public.pem')}
                  disabled={!publicKey}
                  className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] text-[rgb(var(--c-ink))] rounded text-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Save .pem
                </button>
              </div>
            </div>
            
            <textarea
              readOnly
              value={publicKey}
              placeholder="Public key will appear here..."
              className="flex-grow p-6 bg-[rgba(0,0,0,0.2)] text-blue-300/80 font-mono text-[13px] leading-relaxed focus:outline-none resize-none custom-scrollbar whitespace-pre"
              spellCheck="false"
            />
          </div>

          {/* Private Key */}
          <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md flex flex-col overflow-hidden h-[500px]">
            <div className="px-6 py-4 border-b border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] flex flex-wrap gap-4 justify-between items-center shrink-0">
              <h3 className="text-[rgb(var(--c-ink))] font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Private Key (PKCS#8)
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => copyKey(privateKey, false)}
                  disabled={!privateKey}
                  className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] text-[rgb(var(--c-ink))] rounded text-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {copiedPrivate ? <><svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Copied</> : <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Copy</>}
                </button>
                <button
                  onClick={() => downloadKey(privateKey, 'private.pem')}
                  disabled={!privateKey}
                  className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] text-[rgb(var(--c-ink))] rounded text-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Save .pem
                </button>
              </div>
            </div>
            
            <div className="relative flex-grow flex flex-col">
              <textarea
                readOnly
                value={privateKey}
                placeholder="Private key will appear here..."
                className="flex-grow p-6 bg-[rgba(0,0,0,0.2)] text-red-300/80 font-mono text-[13px] leading-relaxed focus:outline-none resize-none custom-scrollbar whitespace-pre"
                spellCheck="false"
              />
              {privateKey && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="text-[rgb(var(--c-void))] text-9xl font-bold opacity-[0.03] rotate-[-45deg] select-none pointer-events-none">
                    SECRET
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
