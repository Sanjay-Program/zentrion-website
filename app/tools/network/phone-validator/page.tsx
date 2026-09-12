'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PhoneValidatorPage() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/network/phone?query=${encodeURIComponent(phone)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to validate phone number.');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isMobile = result?.lineType?.toLowerCase().includes('mobile') || result?.lineType?.toLowerCase().includes('sim');

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-12 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.05)] border border-[var(--c-glass-border)] text-sm font-bold uppercase tracking-wider mb-4">
            📱 Telecom Intelligence
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Phone & SIM Intelligence</h1>
          <p className="text-xl text-[rgb(var(--c-mute))] max-w-2xl">
            Validate phone number format, verify E.164 syntax, identify line type (Mobile/SIM or Fixed), and lookup estimated carrier networks globally.
            <br/><span className="text-sm mt-2 block opacity-70">Note: Carrier detection is algorithmic and relies on original allocations. It may not reflect numbers ported via Mobile Number Portability (MNP).</span>
          </p>
        </div>

        <form onSubmit={handleValidate} className="max-w-3xl mb-12 relative flex items-center">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. +91 98765 43210 or +1 415-555-2671"
            className="w-full bg-surface border border-[var(--c-glass-border)] rounded-2xl px-6 py-5 text-lg outline-none focus:border-[rgb(var(--c-ink))] focus:bg-surface transition-all pr-48 placeholder:text-[rgb(var(--c-mute))]"
            required
          />
          <button
            type="submit"
            disabled={loading || !phone}
            className="absolute right-2 px-8 py-3.5 bg-[rgb(var(--c-ink))] text-[rgb(var(--c-void))] font-bold rounded-xl hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing...' : 'Analyze Number'}
          </button>
        </form>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 mb-8 max-w-3xl flex items-start gap-3">
             <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             <div>{error}</div>
          </div>
        )}

        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <div className="glass-card rounded-3xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] p-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[rgb(var(--c-accent))] opacity-10 blur-[50px] rounded-full group-hover:opacity-20 transition-opacity"></div>
               
               <div className="text-[rgb(var(--c-mute))] text-sm uppercase tracking-widest font-bold mb-6">Carrier Network</div>
               
               <div className="flex items-center gap-4 mb-2">
                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[rgb(var(--c-accent))] to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
                 </div>
                 <h2 className="text-3xl font-bold font-display">{result.carrierNetwork || 'Unknown Carrier'}</h2>
               </div>

               <div className="mt-8 flex gap-3">
                  <div className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 ${isMobile ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'}`}>
                    {isMobile ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    )}
                    {result.lineType}
                  </div>
                  <div className="px-4 py-2 rounded-lg text-sm font-bold bg-green-500/20 text-green-400 border border-green-500/30 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Valid E.164
                  </div>
               </div>
            </div>

            <div className="glass-card rounded-3xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] p-8">
               <div className="text-[rgb(var(--c-mute))] text-sm uppercase tracking-widest font-bold mb-6">Syntax & Location</div>
               
               <div className="space-y-6">
                 <div>
                   <div className="text-[rgb(var(--c-mute))] text-xs mb-1">E.164 International Format</div>
                   <div className="text-xl font-mono text-[rgb(var(--c-ink))] bg-surface px-3 py-2 rounded border border-[var(--c-glass-border)] inline-block">
                     {result.formattedE164}
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <div className="text-[rgb(var(--c-mute))] text-xs mb-1">National Format</div>
                     <div className="font-bold">{result.formattedNational}</div>
                   </div>
                   <div>
                     <div className="text-[rgb(var(--c-mute))] text-xs mb-1">Country Code</div>
                     <div className="font-bold">{result.countryCode}</div>
                   </div>
                 </div>

                 <div className="pt-4 border-t border-[var(--c-glass-border)]">
                   <div className="text-[rgb(var(--c-mute))] text-xs mb-1">Registered Location</div>
                   <div className="text-lg font-bold flex items-center gap-2">
                     <svg className="w-5 h-5 text-[rgb(var(--c-accent))]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                     {result.location}
                   </div>
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
