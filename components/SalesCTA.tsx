import React from 'react';
import Link from 'next/link';

export default function SalesCTA() {
  return (
    <div className="my-16 w-full">
      <div className="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.15)] bg-gradient-to-r from-[rgba(47,107,255,0.2)] to-[rgba(10,14,23,0.95)] backdrop-blur-3xl p-8 md:p-12">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--c-accent))] to-purple-600 opacity-10 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Need Enterprise-Grade Security?
            </h2>
            <p className="text-[rgb(var(--c-mute))] text-lg max-w-2xl">
              From automated VAPT to AI-powered compliance and 24/7 SOC monitoring, Zentrion Technologies provides the intelligence that protects your business.
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <Link 
              href="/book-consultation"
              className="inline-block px-8 py-4 bg-[rgb(var(--c-accent))] hover:bg-blue-600 text-white font-bold font-display rounded-lg transition-transform hover:scale-105 shadow-[0_0_20px_rgba(47,107,255,0.4)]"
            >
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
