'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Eyebrow, Reveal, GlassCard } from '@/components/ui';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useRangeStore } from '@/lib/range-store';

export default function HackerHubPage() {
  const rangeState = useRangeStore();
  const [handle, setHandle] = useState('ANONYMOUS');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedHandle = localStorage.getItem('zentrion_hacker_handle');
    if (storedHandle) setHandle(storedHandle);
  }, []);

  return (
    <>
      <Breadcrumbs items={[{ href: '/practice', label: 'Command Center' }]} />
      <section className="container-x pt-10 pb-20 min-h-screen">
        <Reveal>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-cyan/10 border border-cyan/30 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-cyan stroke-2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <Eyebrow>Operative Profile</Eyebrow>
              <h1 className="font-mono text-3xl md:text-4xl font-bold text-ink uppercase tracking-wider">
                {isMounted ? handle : 'Loading...'}
              </h1>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <Reveal delay={0.1}>
            <div className="glass-card p-4 rounded-xl border border-line bg-surface/50">
              <div className="text-xs text-mute uppercase tracking-wider mb-1">Total XP</div>
              <div className="text-2xl font-mono text-emerald-400 font-bold">{isMounted ? rangeState.xp : '...'}</div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="glass-card p-4 rounded-xl border border-line bg-surface/50">
              <div className="text-xs text-mute uppercase tracking-wider mb-1">Badges</div>
              <div className="text-2xl font-mono text-violet font-bold">{isMounted ? rangeState.badges?.length || 0 : '...'}</div>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="glass-card p-4 rounded-xl border border-line bg-surface/50">
              <div className="text-xs text-mute uppercase tracking-wider mb-1">Status</div>
              <div className="text-2xl font-mono text-cyan font-bold">ACTIVE</div>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="glass-card p-4 rounded-xl border border-cyan/30 bg-cyan/5">
              <div className="text-xs text-cyan uppercase tracking-wider mb-1">Global Rank</div>
              <Link href="/leaderboard" className="text-sm font-bold text-ink hover:underline flex items-center gap-1 mt-1">
                View Network <span className="w-2 h-2 rounded-full bg-cyan animate-pulse inline-block ml-2"></span>
              </Link>
            </div>
          </Reveal>
        </div>

        <h2 className="text-xl font-bold text-ink mb-6 uppercase tracking-wider border-b border-line pb-4">Training Modules</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          <Reveal delay={0.1}>
            <Link href="/labs" className="block h-full group">
              <GlassCard className="h-full flex flex-col cursor-pointer transition-all duration-300 group-hover:border-cyan/50 group-hover:bg-cyan/5 group-hover:-translate-y-1">
                <div className="w-12 h-12 rounded bg-cyan/10 flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-cyan">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-ink">Interactive Labs</h3>
                <p className="text-mute text-sm flex-1 mb-6">Hands-on, browser-native simulations of real-world vulnerabilities and attack vectors.</p>
                <div className="text-cyan text-xs font-bold uppercase tracking-wider group-hover:underline">Engage Module &rarr;</div>
              </GlassCard>
            </Link>
          </Reveal>

          <Reveal delay={0.2}>
            <Link href="/ctf" className="block h-full group">
              <GlassCard className="h-full flex flex-col cursor-pointer transition-all duration-300 group-hover:border-red-500/50 group-hover:bg-red-500/5 group-hover:-translate-y-1">
                <div className="w-12 h-12 rounded bg-red-500/10 flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-red-400">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                    <line x1="4" y1="22" x2="4" y2="15"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-ink">Capture The Flag</h3>
                <p className="text-mute text-sm flex-1 mb-6">Test your skills in competitive challenges. Find the hidden ZENTRION{'{...}'} flags to earn massive XP.</p>
                <div className="text-red-400 text-xs font-bold uppercase tracking-wider group-hover:underline">Enter Arena &rarr;</div>
              </GlassCard>
            </Link>
          </Reveal>

          <Reveal delay={0.3}>
            <Link href="/threat-map" className="block h-full group">
              <GlassCard className="h-full flex flex-col cursor-pointer transition-all duration-300 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/5 group-hover:-translate-y-1">
                <div className="w-12 h-12 rounded bg-emerald-500/10 flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-emerald-400">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-ink flex items-center gap-2">
                  Live Threat Map
                  <span className="px-2 py-0.5 rounded bg-emerald-500 text-void text-[10px] uppercase font-bold tracking-wider">New</span>
                </h3>
                <p className="text-mute text-sm flex-1 mb-6">Visualize simulated global cyber attacks, DDoS origins, and threat intelligence in real-time.</p>
                <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider group-hover:underline">View Intel &rarr;</div>
              </GlassCard>
            </Link>
          </Reveal>

          <Reveal delay={0.4}>
            <Link href="/quizzes" className="block h-full group">
              <GlassCard className="h-full flex flex-col cursor-pointer transition-all duration-300 group-hover:border-yellow-500/50 group-hover:bg-yellow-500/5 group-hover:-translate-y-1">
                <div className="w-12 h-12 rounded bg-yellow-500/10 flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-yellow-500">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-ink">Knowledge Checks</h3>
                <p className="text-mute text-sm flex-1 mb-6">Assess your theoretical understanding with quick-fire cybersecurity quizzes and earn XP.</p>
                <div className="text-yellow-500 text-xs font-bold uppercase tracking-wider group-hover:underline">Start Quiz &rarr;</div>
              </GlassCard>
            </Link>
          </Reveal>

          <Reveal delay={0.5}>
            <Link href="/scenario-builder" className="block h-full group">
              <GlassCard className="h-full flex flex-col cursor-pointer transition-all duration-300 group-hover:border-violet/50 group-hover:bg-violet/5 group-hover:-translate-y-1">
                <div className="w-12 h-12 rounded bg-violet/10 flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-violet">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-ink">Scenario Builder</h3>
                <p className="text-mute text-sm flex-1 mb-6">Create your own zero-backend CTF challenges and generate shareable links for your friends.</p>
                <div className="text-violet text-xs font-bold uppercase tracking-wider group-hover:underline">Create Scenario &rarr;</div>
              </GlassCard>
            </Link>
          </Reveal>

          <Reveal delay={0.6}>
            <Link href="/tools" className="block h-full group">
              <GlassCard className="h-full flex flex-col cursor-pointer transition-all duration-300 group-hover:border-pink-500/50 group-hover:bg-pink-500/5 group-hover:-translate-y-1">
                <div className="w-12 h-12 rounded bg-pink-500/10 flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-pink-500">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-ink">Security Toolkit</h3>
                <p className="text-mute text-sm flex-1 mb-6">Access 30+ browser-native utilities for DNS lookups, hashing, crypto, and network scanning.</p>
                <div className="text-pink-500 text-xs font-bold uppercase tracking-wider group-hover:underline">Access Tools &rarr;</div>
              </GlassCard>
            </Link>
          </Reveal>

        </div>
      </section>
    </>
  );
}
