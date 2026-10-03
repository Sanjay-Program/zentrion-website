'use client';

import React, { useRef, useState, useEffect } from 'react';
import { generateKeyPair, exportPublicKey, signData } from '@/lib/crypto-utils';
import { gun } from '@/lib/gun';

interface CertificateProps {
  xp: number;
  completedLabs: number;
  badges: number;
  onClose: () => void;
}

export function CertificateGenerator({ xp, completedLabs, badges, onClose }: CertificateProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareableUrl, setShareableUrl] = useState<string | null>(null);
  const [handle, setHandle] = useState('ANONYMOUS');

  useEffect(() => {
    const storedHandle = localStorage.getItem('zentrion_hacker_handle');
    if (storedHandle) setHandle(storedHandle);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const generateShareableLink = async () => {
    try {
      setIsGenerating(true);
      const certId = crypto.randomUUID();
      const payload = {
        handle,
        xp,
        completedLabs,
        badges,
        date: new Date().toLocaleDateString(),
        type: 'Zentrion Academy Certificate of Achievement'
      };

      const keyPair = await generateKeyPair();
      const publicKey = await exportPublicKey(keyPair.publicKey);
      const signature = await signData(keyPair.privateKey, payload);

      const certData = {
        payload,
        signature,
        publicKey
      };

      // Store in GUN DHT
      if (!gun) {
        throw new Error("P2P Network not initialized");
      }
      
      gun.get('certificates').get(certId).put(JSON.stringify(certData), (ack: any) => {
        if (ack.err) {
          console.error("Error storing certificate:", ack.err);
          alert("Failed to generate link. P2P network error.");
        } else {
          const url = `${window.location.origin}/verify?id=${certId}`;
          setShareableUrl(url);
        }
        setIsGenerating(false);
      });
    } catch (e) {
      console.error(e);
      alert("Failed to sign certificate.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm print:bg-white print:p-0 print:block">
      
      {/* Shareable Link Modal */}
      {shareableUrl && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 bg-surface border border-cyan/30 rounded-xl p-6 shadow-[0_0_40px_rgba(47,107,255,0.3)] max-w-lg w-full">
          <h3 className="text-xl font-bold text-white mb-2">Certificate Published!</h3>
          <p className="text-mute mb-4 text-sm">Your cryptographically signed certificate has been stored on the decentralized P2P network. Anyone with this link can verify your achievements.</p>
          <div className="flex gap-2">
            <input 
              type="text" 
              readOnly 
              value={shareableUrl} 
              className="flex-1 bg-void border border-line text-white px-3 py-2 rounded focus:outline-none focus:border-cyan"
            />
            <button 
              onClick={() => navigator.clipboard.writeText(shareableUrl)}
              className="bg-cyan/20 text-cyan px-4 py-2 rounded hover:bg-cyan/30 transition-colors"
            >
              Copy
            </button>
          </div>
          <button 
            onClick={() => setShareableUrl(null)}
            className="w-full mt-4 bg-void border border-line text-mute py-2 rounded hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      )}

      {/* Non-print controls */}
      <div className="absolute top-6 right-6 flex gap-4 print:hidden z-10">
        <button 
          onClick={generateShareableLink}
          disabled={isGenerating}
          className="bg-cyan/20 border border-cyan/30 text-cyan py-2 px-6 rounded hover:bg-cyan/30 transition-colors disabled:opacity-50"
        >
          {isGenerating ? 'Signing...' : 'Create Shareable Link'}
        </button>
        <button 
          onClick={handlePrint}
          className="btn-primary py-2 px-6 shadow-[0_0_20px_rgba(47,107,255,0.4)]"
        >
          Print / Save PDF
        </button>
        <button 
          onClick={onClose}
          className="bg-surface border border-line text-mute hover:text-white px-4 py-2 rounded transition-colors"
        >
          Close
        </button>
      </div>

      {/* The Certificate Canvas */}
      <div 
        ref={printRef}
        className="relative w-full max-w-[1000px] aspect-[1.414] bg-[#05070d] border border-cyan/30 rounded-lg overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center p-12 print:border-none print:shadow-none print:w-[100vw] print:h-[100vh] print:max-w-none print:aspect-auto print:rounded-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(47,107,255,0.1) 0%, rgba(5,7,13,1) 100%)'
        }}
      >
        {/* Certificate Border Details */}
        <div className="absolute inset-4 border-2 border-cyan/20 rounded print:border-black/20 pointer-events-none"></div>
        <div className="absolute inset-5 border border-cyan/10 rounded print:border-black/10 pointer-events-none"></div>

        <div className="relative z-10 space-y-8 print:text-black">
          
          <div className="space-y-2">
            <h1 className="font-display text-5xl md:text-6xl font-bold tracking-wider text-white uppercase print:text-black">
              Zentrion Academy
            </h1>
            <p className="text-cyan font-mono tracking-widest uppercase text-sm print:text-gray-600">
              Certificate of Achievement
            </p>
          </div>

          <div className="max-w-xl mx-auto space-y-6 py-8">
            <p className="text-mute text-lg print:text-gray-700">
              This certifies that operative <span className="text-white font-bold print:text-black">{handle}</span> has successfully demonstrated practical cybersecurity skills by achieving the following milestones:
            </p>
            
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div>
                <div className="text-3xl font-mono text-white font-bold print:text-black">{xp}</div>
                <div className="text-xs text-cyan uppercase tracking-wider mt-1 print:text-gray-600">Total XP</div>
              </div>
              <div>
                <div className="text-3xl font-mono text-white font-bold print:text-black">{completedLabs}</div>
                <div className="text-xs text-cyan uppercase tracking-wider mt-1 print:text-gray-600">Labs Completed</div>
              </div>
              <div>
                <div className="text-3xl font-mono text-white font-bold print:text-black">{badges}</div>
                <div className="text-xs text-cyan uppercase tracking-wider mt-1 print:text-gray-600">Badges Earned</div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end w-full max-w-2xl mx-auto mt-12 pt-8 border-t border-line print:border-gray-300">
            <div className="text-left">
              <div className="font-signature text-3xl text-white mb-2 print:text-black">Zentrion Systems</div>
              <div className="text-xs text-mute uppercase tracking-wider print:text-gray-500">Authorized Signature</div>
            </div>
            
            <div className="text-right">
              <div className="font-mono text-white mb-2 print:text-black">{new Date().toLocaleDateString()}</div>
              <div className="text-xs text-mute uppercase tracking-wider print:text-gray-500">Date of Issuance</div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Print-only global styles to hide everything else */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body > *:not(.fixed) { display: none !important; }
          .fixed { position: absolute !important; inset: 0 !important; background: white !important; }
        }
      `}} />
    </div>
  );
}
