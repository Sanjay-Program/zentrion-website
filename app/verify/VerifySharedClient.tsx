'use client';

import React, { useEffect, useState } from 'react';
import { gun } from '@/lib/gun';
import { verifySignature } from '@/lib/crypto-utils';
import { GlassCard, Reveal } from '@/components/ui';

export default function VerifySharedClient({ certId }: { certId: string }) {
  const [status, setStatus] = useState<'loading' | 'valid' | 'invalid' | 'not_found'>('loading');
  const [certData, setCertData] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    const verifyCert = async () => {
      // Small delay to allow GUN to connect to relays
      setTimeout(() => {
        if (!gun) {
          setStatus('invalid');
          return;
        }

        gun.get('certificates').get(certId).once(async (data: string) => {
          if (!mounted) return;
          
          if (!data) {
            setStatus('not_found');
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const { payload, signature, publicKey } = parsed;

            if (!payload || !signature || !publicKey) {
              setStatus('invalid');
              return;
            }

            const isValid = await verifySignature(publicKey, payload, signature);

            if (isValid) {
              setCertData(payload);
              setStatus('valid');
            } else {
              setStatus('invalid');
            }
          } catch (err) {
            console.error("Verification error:", err);
            setStatus('invalid');
          }
        });
      }, 500);
    };

    verifyCert();

    return () => {
      mounted = false;
    };
  }, [certId]);

  return (
    <div className="container-x py-10 flex flex-col items-center justify-center min-h-[70vh]">
      <Reveal>
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Certificate Verification</h1>
          <p className="text-mute text-lg">Cryptographic P2P Verification Engine</p>
        </div>
      </Reveal>

      {status === 'loading' && (
        <Reveal delay={0.1}>
          <GlassCard className="p-12 flex flex-col items-center text-center">
            <div className="w-12 h-12 border-2 border-cyan border-t-transparent rounded-full animate-spin mb-4"></div>
            <h3 className="text-xl font-bold text-white mb-2">Connecting to P2P Network...</h3>
            <p className="text-mute">Retrieving and verifying cryptographic signature...</p>
          </GlassCard>
        </Reveal>
      )}

      {status === 'not_found' && (
        <Reveal delay={0.1}>
          <GlassCard className="p-12 flex flex-col items-center text-center border-red-500/30">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500 mb-4">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">Certificate Not Found</h3>
            <p className="text-mute">This certificate ID does not exist on the decentralized network.</p>
          </GlassCard>
        </Reveal>
      )}

      {status === 'invalid' && (
        <Reveal delay={0.1}>
          <GlassCard className="p-12 flex flex-col items-center text-center border-red-500/30">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500 mb-4">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">Verification Failed</h3>
            <p className="text-mute">The cryptographic signature is invalid or the data has been tampered with.</p>
          </GlassCard>
        </Reveal>
      )}

      {status === 'valid' && certData && (
        <Reveal delay={0.1}>
          <div className="w-full max-w-[900px] mb-8">
            <div className="flex items-center justify-center gap-3 mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span className="font-bold">Cryptographically Verified</span>
            </div>
            
            {/* Display the Certificate */}
            <div 
              className="relative w-full aspect-[1.414] bg-[#05070d] border border-cyan/30 rounded-lg overflow-hidden shadow-[0_0_40px_rgba(47,107,255,0.2)] flex flex-col items-center justify-center text-center p-8 md:p-12"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(47,107,255,0.15) 0%, rgba(5,7,13,1) 100%)'
              }}
            >
              <div className="absolute inset-4 border-2 border-cyan/20 rounded pointer-events-none"></div>
              <div className="absolute inset-5 border border-cyan/10 rounded pointer-events-none"></div>

              <div className="relative z-10 space-y-6 md:space-y-8 w-full">
                
                <div className="space-y-2">
                  <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wider text-white uppercase">
                    Zentrion Academy
                  </h1>
                  <p className="text-cyan font-mono tracking-widest uppercase text-xs md:text-sm">
                    Certificate of Achievement
                  </p>
                </div>

                <div className="max-w-xl mx-auto space-y-6 py-6 md:py-8">
                  <p className="text-mute text-sm md:text-base px-4">
                    This certifies that operative <span className="text-white font-bold">{certData.handle || 'ANONYMOUS'}</span> has successfully demonstrated practical cybersecurity skills by achieving the following milestones:
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 md:gap-6 pt-4">
                    <div>
                      <div className="text-2xl md:text-3xl font-mono text-white font-bold">{certData.xp || 0}</div>
                      <div className="text-[10px] md:text-xs text-cyan uppercase tracking-wider mt-1">Total XP</div>
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-mono text-white font-bold">{certData.completedLabs || 0}</div>
                      <div className="text-[10px] md:text-xs text-cyan uppercase tracking-wider mt-1">Labs</div>
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-mono text-white font-bold">{certData.badges || 0}</div>
                      <div className="text-[10px] md:text-xs text-cyan uppercase tracking-wider mt-1">Badges</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-end w-full px-4 md:px-8 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-line">
                  <div className="text-left">
                    <div className="font-signature text-2xl md:text-3xl text-white mb-2">Zentrion Systems</div>
                    <div className="text-[10px] md:text-xs text-mute uppercase tracking-wider">Authorized Signature</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-mono text-white mb-2 text-sm md:text-base">{certData.date || new Date().toLocaleDateString()}</div>
                    <div className="text-[10px] md:text-xs text-mute uppercase tracking-wider">Date of Issuance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}
