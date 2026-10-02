'use client';

import React, { useEffect, useState } from 'react';
import { useRangeStore } from '@/lib/range-store';
import { GlassCard } from '@/components/ui';

export function CyberProfile() {
  const { xp, solvedLabs, currentStreak, updateStreak, badges } = useRangeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    updateStreak();
  }, [updateStreak]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <GlassCard className="h-full flex items-center justify-center min-h-[200px] animate-pulse">
        <div className="h-4 w-32 bg-surface rounded"></div>
      </GlassCard>
    );
  }

  const level = Math.floor(xp / 500) + 1;
  const xpForNextLevel = level * 500;
  const progress = (xp % 500) / 500 * 100;

  return (
    <GlassCard className="h-full bg-surface/30 border-cyan/20">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-[10px] uppercase font-mono tracking-widest text-mute mb-1">My Cyber Profile</h3>
          <div className="flex items-end gap-3">
            <h2 className="text-3xl font-display font-bold">Level {level}</h2>
            <span className="text-sm font-mono text-cyan mb-1">{xp.toLocaleString()} XP</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-2 text-orange-400">
            <span className="text-xl">🔥</span>
            <span className="font-bold text-lg">{currentStreak}</span>
          </div>
          <span className="text-[10px] uppercase font-mono text-mute">Day Streak</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-xs text-mute mb-2">
          <span>Progress to Level {level + 1}</span>
          <span>{xpForNextLevel - xp} XP needed</span>
        </div>
        <div className="w-full bg-surface rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-cyan h-1.5 rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-line">
        <div>
          <h4 className="text-[10px] uppercase font-mono tracking-wider text-mute mb-1">Challenges</h4>
          <span className="text-xl font-bold">{solvedLabs.length} Solved</span>
        </div>
        <div>
          <h4 className="text-[10px] uppercase font-mono tracking-wider text-mute mb-1">Badges</h4>
          <div className="flex flex-wrap gap-2">
            {badges.length > 0 ? (
              badges.map(b => (
                <span key={b.id} title={b.name} className="text-xl">{b.icon}</span>
              ))
            ) : (
              <span className="text-sm text-mute italic">No badges yet</span>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
