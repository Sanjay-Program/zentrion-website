'use client';


// Note: metadata for this page is in a server wrapper if needed.
// This page uses crypto.subtle which requires client-side execution.

import React, { useState, useEffect } from 'react';
import { GlassCard, Reveal } from '@/components/ui';
import VerifySharedClient from './VerifySharedClient';

export default function VerifyClient() {
  const [jsonInput, setJsonInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'verifying' | 'valid' | 'invalid' | 'error'>('idle');
  const [verifiedData, setVerifiedData] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [sharedCertId, setSharedCertId] = useState<string | null>(null);

  useEffect(() => {
    // Check if we have an ID in the URL for the P2P verified cert
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      if (id) {
        setSharedCertId(id);
      }
    }
  }, []);

  const handleVerify = async () => {
    try {
      setStatus('verifying');
      setVerifiedData(null);
      const token = JSON.parse(jsonInput);
      
      if (!token.data || !token.publicKey || !token.signature) {
        throw new Error('Invalid token format');
      }

      const { verifySignature } = await import('@/lib/crypto-utils');
      
      const isValid = await verifySignature(token.publicKey, token.data, token.signature);
      
      if (isValid) {
        setStatus('valid');
        setVerifiedData(token.data);
      } else {
        setStatus('invalid');
      }
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target && typeof event.target.result === 'string') {
            setJsonInput(event.target.result);
            setStatus('idle');
          }
        };
        reader.readAsText(file);
      }
    }
  };

  if (sharedCertId) {
    return <VerifySharedClient certId={sharedCertId} />;
  }

  return (
    <div className="container-x py-20 md:py-32 flex flex-col items-center">
      <Reveal className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4 text-white">
          Verify <span className="text-gradient-hero">Credentials</span>
        </h1>
        <p className="text-xl text-mute max-w-2xl mx-auto">
          Zentrion uses WebCrypto ECDSA signatures to generate verifiable, tamper-proof proof of learning.
          Paste a signed profile token below to verify its authenticity.
        </p>
      </Reveal>

      <GlassCard className="w-full max-w-2xl p-6 md:p-10">
        <div className="mb-6">
          <label className="block text-sm font-semibold uppercase tracking-wider text-mute mb-3 flex items-center justify-between">
            <span>Paste JSON Token</span>
            <span className="text-xs bg-surface border border-line px-2 py-1 rounded text-cyan">Or Drag & Drop .json File</span>
          </label>
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative rounded-lg overflow-hidden transition-all duration-300 ${isDragging ? 'ring-2 ring-cyan shadow-[0_0_20px_rgba(47,107,255,0.4)]' : ''}`}
          >
            {isDragging && (
              <div className="absolute inset-0 bg-cyan/10 backdrop-blur-[2px] flex items-center justify-center border-2 border-dashed border-cyan rounded-lg z-10 pointer-events-none">
                <span className="text-cyan font-bold text-lg animate-pulse">Drop File Here</span>
              </div>
            )}
            <textarea 
              value={jsonInput}
              onChange={(e) => {
                setJsonInput(e.target.value);
                setStatus('idle');
              }}
              placeholder='{"data": {...}, "publicKey": {...}, "signature": "..."}'
              className="w-full h-48 bg-[#05070d] border border-line rounded-lg p-4 font-mono text-xs text-white focus:outline-none focus:border-cyan transition-colors"
            />
          </div>
        </div>
        
        <button 
          onClick={handleVerify}
          disabled={status === 'verifying' || !jsonInput.trim()}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'verifying' ? 'Verifying Cryptographic Signature...' : 'Verify Cryptographic Signature'}
        </button>

        {status === 'valid' && verifiedData && (
          <div className="mt-8 p-6 border border-emerald-500/30 bg-emerald-500/10 rounded-xl text-center">
            <div className="w-16 h-16 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 text-3xl mb-4">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-emerald-400 mb-2">Signature Valid</h2>
            <p className="text-sm text-emerald-500/80 mb-6">This profile data was cryptographically verified and has not been tampered with.</p>
            
            <div className="grid grid-cols-3 gap-4 text-left">
              <div className="bg-black/40 p-4 rounded-lg">
                <div className="text-xs text-mute uppercase tracking-wider mb-1">XP</div>
                <div className="text-xl font-mono text-white">{verifiedData.xp}</div>
              </div>
              <div className="bg-black/40 p-4 rounded-lg">
                <div className="text-xs text-mute uppercase tracking-wider mb-1">Badges</div>
                <div className="text-xl font-mono text-white">{verifiedData.badges}</div>
              </div>
              <div className="bg-black/40 p-4 rounded-lg">
                <div className="text-xs text-mute uppercase tracking-wider mb-1">Labs</div>
                <div className="text-xl font-mono text-white">{verifiedData.completedLabs}</div>
              </div>
            </div>
            <div className="mt-4 text-xs text-mute font-mono">
              Timestamp: {new Date(verifiedData.timestamp).toLocaleString()}
            </div>
          </div>
        )}

        {status === 'invalid' && (
          <div className="mt-8 p-6 border border-red-500/30 bg-red-500/10 rounded-xl text-center">
             <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center text-red-400 text-3xl mb-4">
              ✗
            </div>
            <h2 className="text-xl font-bold text-red-400 mb-2">Invalid Signature</h2>
            <p className="text-sm text-red-400/80">The data has been tampered with or the signature is invalid.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-8 p-6 border border-orange-500/30 bg-orange-500/10 rounded-xl text-center">
            <h2 className="text-xl font-bold text-orange-400 mb-2">Parse Error</h2>
            <p className="text-sm text-orange-400/80">Could not parse the JSON token. Ensure it is formatted correctly.</p>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
