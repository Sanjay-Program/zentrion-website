'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRangeStore } from '@/lib/range-store';
import { gun, generateGunAlias } from '@/lib/gun';
import Breadcrumbs from '@/components/Breadcrumbs';

interface LeaderboardEntry {
  handle: string;
  xp: number;
  lastActive: number;
}

export default function LeaderboardClient() {
  const rangeStore = useRangeStore();
  const [handle, setHandle] = useState<string>('');
  const [entries, setEntries] = useState<Record<string, LeaderboardEntry>>({});
  const [isMounted, setIsMounted] = useState(false);

  // Hydration & Identity
  useEffect(() => {
    setIsMounted(true);
    let currentHandle = localStorage.getItem('zentrion_hacker_handle');
    if (!currentHandle) {
      currentHandle = generateGunAlias();
      localStorage.setItem('zentrion_hacker_handle', currentHandle);
    }
    setHandle(currentHandle);
  }, []);

  // Sync to Gun network
  useEffect(() => {
    if (!isMounted || !handle || !gun) return;
    
    const db = gun.get('zentrion-leaderboard-v2');

    // Publish our own score
    db.get(handle).put({
      handle,
      xp: rangeStore.xp,
      lastActive: Date.now()
    });

    // Subscribe to everyone else's scores
    db.map().on((data: LeaderboardEntry, key) => {
      if (data && data.handle && typeof data.xp === 'number') {
        // Only keep active entries (last 7 days) to prevent infinite growth
        if (Date.now() - data.lastActive < 7 * 24 * 60 * 60 * 1000) {
          setEntries(prev => ({ ...prev, [key]: data }));
        }
      }
    });

    return () => {
      db.map().off(); // cleanup
    };
  }, [isMounted, handle, rangeStore.xp]);

  if (!isMounted) return null;

  const sortedLeaderboard = Object.values(entries)
    .sort((a, b) => b.xp - a.xp)
    .slice(0, 50); // Top 50 only

  return (
    <>
      <Breadcrumbs />
      <div className="container-x py-12 md:py-20 min-h-screen">
        <header className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse"></span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-cyan">
              Live P2P Network
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4 text-[rgb(var(--c-ink))]">
            Global Leaderboard
          </h1>
          <p className="text-lg text-[rgb(var(--c-mute))] max-w-2xl">
            Rankings are synchronized globally using a zero-backend, decentralized peer-to-peer network via Gun.js.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr,350px] gap-12 items-start">
          <div className="glass-card p-2 md:p-8 rounded-3xl border border-line">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-line">
                    <th className="p-4 font-bold text-mute text-sm uppercase tracking-wider">Rank</th>
                    <th className="p-4 font-bold text-mute text-sm uppercase tracking-wider">Hacker Handle</th>
                    <th className="p-4 font-bold text-mute text-sm uppercase tracking-wider text-right">Total XP</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedLeaderboard.map((entry, index) => {
                    const isMe = entry.handle === handle;
                    return (
                      <motion.tr 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        key={entry.handle} 
                        className={`border-b border-line/50 transition-colors ${isMe ? 'bg-cyan/10' : 'hover:bg-surface/50'}`}
                      >
                        <td className="p-4 font-mono font-bold text-cyan">
                          #{index + 1}
                        </td>
                        <td className="p-4 flex items-center gap-3">
                          <span className={`font-bold ${isMe ? 'text-white' : ''}`}>
                            {entry.handle}
                          </span>
                          {isMe && <span className="px-2 py-0.5 rounded bg-cyan text-void text-[10px] font-bold uppercase tracking-wider">You</span>}
                        </td>
                        <td className="p-4 text-right font-mono font-bold text-emerald-400">
                          {entry.xp}
                        </td>
                      </motion.tr>
                    );
                  })}
                  {sortedLeaderboard.length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-8 text-center text-mute italic">
                        Connecting to P2P swarm... 
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-line bg-surface/50">
              <h3 className="font-bold text-lg mb-2">Your Identity</h3>
              <p className="text-sm text-mute mb-4">Your rank is bound to your browser session.</p>
              <div className="p-3 rounded-lg bg-void border border-line font-mono text-cyan text-center font-bold">
                {handle}
              </div>
              <p className="text-[10px] text-mute mt-4 text-center italic">
                XP is synced automatically as you solve labs.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl border border-line bg-surface/50">
              <h3 className="font-bold text-lg mb-2">Zero-Backend Architecture</h3>
              <p className="text-xs text-mute mb-3">
                This leaderboard does not use a central database. It uses <strong>Gun.js</strong> to connect your browser directly to a decentralized swarm of other active users.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
