'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Breadcrumbs from '@/components/Breadcrumbs';
import { GlassCard } from '@/components/ui';

function ScenarioPlayerContent() {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get('c');
  
  const [scenario, setScenario] = useState<{t: string, d: string, h: string} | null>(null);
  const [error, setError] = useState('');
  
  const [flagInput, setFlagInput] = useState('');
  const [status, setStatus] = useState<'idle'|'success'|'error'>('idle');

  useEffect(() => {
    if (!dataParam) {
      setError('No scenario data found in the URL.');
      return;
    }
    try {
      const decodedStr = decodeURIComponent(atob(dataParam));
      const payload = JSON.parse(decodedStr);
      if (payload.t && payload.d && payload.h) {
        setScenario(payload);
      } else {
        setError('Invalid scenario payload.');
      }
    } catch (e) {
      setError('Failed to parse scenario data.');
    }
  }, [dataParam]);

  const verifyFlag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scenario || !flagInput.trim()) return;

    setStatus('idle');
    const msgBuffer = new TextEncoder().encode(flagInput.trim());
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const inputHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if (inputHash === scenario.h) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  if (error) {
    return (
      <div className="container-x py-20 min-h-screen text-center flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Error Loading Scenario</h2>
        <p className="text-mute mb-8">{error}</p>
        <Link href="/scenario-builder" className="btn-primary">
          Build Your Own Scenario
        </Link>
      </div>
    );
  }

  if (!scenario) {
    return (
      <div className="container-x py-20 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-cyan border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs />
      <div className="container-x py-12 md:py-20 min-h-screen grid lg:grid-cols-[1fr,400px] gap-12 items-start">
        
        {/* Left Side: Briefing */}
        <div>
          <header className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-6">
              <span className="font-mono text-[11px] uppercase tracking-widest text-violet-400">
                Community Scenario
              </span>
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight mb-4">
              {scenario.t}
            </h1>
          </header>

          <GlassCard className="prose dark:prose-invert prose-p:text-mute prose-headings:text-ink max-w-full">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {scenario.d}
            </ReactMarkdown>
          </GlassCard>
        </div>

        {/* Right Side: Flag Submission */}
        <aside className="sticky top-24">
          <GlassCard className="p-8 border-cyan/30 bg-surface/50">
            <h3 className="font-bold text-xl mb-4 text-cyan flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
              Submit Flag
            </h3>
            <p className="text-sm text-mute mb-6">
              Investigate the scenario described and find the flag.
            </p>
            
            <form onSubmit={verifyFlag} className="space-y-4">
              <input
                type="text"
                placeholder="ZENTRION{...}"
                value={flagInput}
                onChange={e => setFlagInput(e.target.value)}
                disabled={status === 'success'}
                className={`w-full bg-void border rounded-lg px-4 py-3 text-ink focus:outline-none font-mono ${
                  status === 'error' ? 'border-red-500/50 focus:border-red-500' :
                  status === 'success' ? 'border-emerald-500 focus:border-emerald-500' :
                  'border-line focus:border-cyan'
                }`}
                required
              />
              <button 
                type="submit" 
                disabled={status === 'success' || !flagInput.trim()}
                className="btn-primary w-full py-3 disabled:opacity-50"
              >
                {status === 'success' ? 'Solved!' : 'Verify Flag'}
              </button>
            </form>
            
            {status === 'success' && (
              <div className="mt-6 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-center animate-in fade-in slide-in-from-bottom-4">
                <svg className="w-12 h-12 text-emerald-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="font-bold text-emerald-400 mb-1">Mission Accomplished!</h4>
                <p className="text-xs text-emerald-100/80 mb-4">You have successfully found the correct flag.</p>
                <Link href="/scenario-builder" className="text-xs font-bold text-emerald-400 hover:underline">
                  Create your own scenario &rarr;
                </Link>
              </div>
            )}

              {status === 'error' && (
                <div className="mt-4 p-3 rounded-lg text-sm font-semibold text-center bg-red-500/10 text-red-400 border border-red-500/20">
                  Incorrect flag. Keep hunting!
                </div>
              )}
            </GlassCard>
          </aside>
        </div>
      </>
    );
}

export default function PlayScenario() {
  return (
    <Suspense fallback={
      <div className="container-x py-20 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-cyan border-t-transparent animate-spin"></div>
      </div>
    }>
      <ScenarioPlayerContent />
    </Suspense>
  );
}
