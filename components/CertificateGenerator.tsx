'use client';

import React, { useRef } from 'react';

interface CertificateProps {
  xp: number;
  completedLabs: number;
  badges: number;
  onClose: () => void;
}

export function CertificateGenerator({ xp, completedLabs, badges, onClose }: CertificateProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm print:bg-white print:p-0 print:block">
      
      {/* Non-print controls */}
      <div className="absolute top-6 right-6 flex gap-4 print:hidden z-10">
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
              This certifies that the bearer of this document has successfully demonstrated practical cybersecurity skills by achieving the following milestones:
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
