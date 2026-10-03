'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRangeStore } from '@/lib/range-store';
import Breadcrumbs from '@/components/Breadcrumbs';

const CAMPAIGNS = [
  {
    id: 'operation-neon',
    title: 'Operation Neon',
    description: 'A multi-stage attack simulation targeting a corporate web application.',
    difficulty: 'Intermediate',
    stages: [
      { id: 'network-recon', title: 'Network Recon', desc: 'Scan the external perimeter.', x: 10, y: 50 },
      { id: 'web-enumeration', title: 'Web Enumeration', desc: 'Discover hidden endpoints.', x: 40, y: 20 },
      { id: 'sql-injection', title: 'SQL Injection', desc: 'Extract data from the database.', x: 70, y: 50 },
      { id: 'forensics-01', title: 'Cover Tracks', desc: 'Identify logs left behind.', x: 100, y: 20 },
    ]
  }
];

export default function CampaignsClient() {
  const rangeStore = useRangeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <Breadcrumbs />
      <div className="container-x py-12 md:py-20 min-h-screen">
        <header className="mb-14">
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4 text-[rgb(var(--c-ink))]">
            Cyber Campaigns
          </h1>
          <p className="text-lg text-[rgb(var(--c-mute))] max-w-2xl">
            Simulate complete intrusion lifecycles. Complete each stage to unlock the next and earn the Campaign Strategist badge.
          </p>
        </header>

        <div className="space-y-12">
          {CAMPAIGNS.map(campaign => {
            const progress = rangeStore.campaigns.find(c => c.campaignId === campaign.id);
            // Default first stage is unlocked if no progress
            const unlocked = progress ? progress.unlockedStages : [campaign.stages[0].id];
            const completed = progress ? progress.completedStages : [];

            return (
              <div key={campaign.id} className="glass-card p-8 rounded-3xl border border-line">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{campaign.title}</h2>
                    <p className="text-mute">{campaign.description}</p>
                  </div>
                  <div className="px-3 py-1 bg-violet/10 text-violet-400 rounded-full text-xs font-bold tracking-wider border border-violet/30">
                    {campaign.difficulty}
                  </div>
                </div>

                {/* Node Map Visualization */}
                <div className="relative h-64 w-full bg-void/50 rounded-2xl border border-line/50 overflow-hidden">
                  
                  {/* Grid Background */}
                  <div className="absolute inset-0 grid-overlay opacity-30"></div>

                  {/* SVG Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {campaign.stages.map((stage, i) => {
                      if (i === campaign.stages.length - 1) return null;
                      const next = campaign.stages[i + 1];
                      const isLineActive = completed.includes(stage.id);
                      return (
                        <motion.line
                          key={`line-${i}`}
                          x1={`${stage.x}%`} y1={`${stage.y}%`}
                          x2={`${next.x}%`} y2={`${next.y}%`}
                          stroke={isLineActive ? 'rgba(0, 212, 255, 0.6)' : 'rgba(255, 255, 255, 0.1)'}
                          strokeWidth="3"
                          strokeDasharray={isLineActive ? "none" : "5,5"}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                        />
                      );
                    })}
                  </svg>

                  {/* Nodes */}
                  {campaign.stages.map((stage, i) => {
                    const isUnlocked = unlocked.includes(stage.id) || i === 0;
                    const isCompleted = completed.includes(stage.id);

                    return (
                      <motion.div
                        key={stage.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.2 }}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                        style={{ left: `${stage.x}%`, top: `${stage.y}%` }}
                      >
                        <Link 
                          href={isUnlocked ? `/labs/${stage.id}?campaign=${campaign.id}` : '#'}
                          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                            isCompleted ? 'bg-cyan/20 border-cyan text-cyan shadow-[0_0_15px_rgba(0,212,255,0.4)]' :
                            isUnlocked ? 'bg-surface border-cyan text-ink hover:scale-110 hover:shadow-[0_0_15px_rgba(0,212,255,0.2)]' :
                            'bg-void border-line text-mute cursor-not-allowed opacity-50'
                          }`}
                        >
                          {isCompleted ? (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          ) : (
                            <span className="font-bold font-mono">{i + 1}</span>
                          )}
                        </Link>
                        <div className="mt-3 text-center w-32">
                          <p className={`text-xs font-bold ${isUnlocked ? 'text-ink' : 'text-mute'}`}>{stage.title}</p>
                          <p className="text-[10px] text-mute mt-1">{stage.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
