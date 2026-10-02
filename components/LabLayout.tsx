'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GlassCard, Reveal, ArrowIcon } from '@/components/ui';

interface LabLayoutProps {
  title: string;
  category: string;
  difficulty: string;
  objective: string;
  scope: string;
  target: string;
  hints: string[];
  flag: string;
  explanation: React.ReactNode;
  remediation: React.ReactNode;
  relatedGuide?: { title: string; url: string };
  nextLab?: { title: string; url: string };
  children: React.ReactNode; // This will hold the Terminal or interactive app
}

export function LabLayout({
  title,
  category,
  difficulty,
  objective,
  scope,
  target,
  hints,
  flag,
  explanation,
  remediation,
  relatedGuide,
  nextLab,
  children,
}: LabLayoutProps) {
  const [flagInput, setFlagInput] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [error, setError] = useState(false);
  const [visibleHints, setVisibleHints] = useState<number>(0);

  const handleFlagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (flagInput.trim() === flag) {
      setIsSolved(true);
      setError(false);
      // In a real app, we would save to localStorage here
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="pt-32 pb-24 container-x min-h-screen grid lg:grid-cols-[1fr,350px] gap-8">
      {/* Main Content Area */}
      <div className="space-y-8">
        <Reveal>
          <div className="mb-8">
            <Link href="/labs" className="text-cyan text-sm hover:underline flex items-center gap-2 mb-4">
              <span className="rotate-180"><ArrowIcon /></span> Back to Cyber Range
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-1 rounded bg-cyan/10 text-cyan">
                {category}
              </span>
              <span className={`text-[10px] uppercase font-mono tracking-wider px-2 py-1 rounded ${
                difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' :
                difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                'bg-red-500/10 text-red-400'
              }`}>
                {difficulty}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold mb-6">{title}</h1>
            
            <GlassCard className="mb-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-mute mb-2">Objective</h4>
                  <p className="text-sm font-medium">{objective}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-mute mb-2">Scope</h4>
                  <p className="text-sm font-medium">{scope}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-mute mb-2">Target</h4>
                  <p className="text-sm font-mono text-cyan">{target}</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {/* INTERACTIVE AREA (Terminal, App, etc) */}
          <div className="mb-8">
            <div className="flex items-center justify-between bg-[#1a1a1a] border border-line rounded-t-lg px-4 py-2 text-xs font-mono text-mute">
              <span>Terminal / Application</span>
              <button 
                onClick={() => window.location.reload()} 
                className="hover:text-white transition-colors"
              >
                Reset Environment
              </button>
            </div>
            {children}
          </div>
        </Reveal>

        {isSolved && (
          <Reveal>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">🏆 Lab Completed!</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-2">Explanation</h4>
                  <div className="text-sm text-gray-300 leading-relaxed">{explanation}</div>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2">Remediation</h4>
                  <div className="text-sm text-gray-300 leading-relaxed">{remediation}</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {relatedGuide && (
                    <Link href={relatedGuide.url} className="btn-ghost flex-1 text-center justify-center">
                      Read Guide: {relatedGuide.title}
                    </Link>
                  )}
                  {nextLab && (
                    <Link href={nextLab.url} className="btn-primary flex-1 text-center justify-center">
                      Next Lab: {nextLab.title}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {/* Sidebar Area */}
      <div className="space-y-6">
        <Reveal delay={0.2}>
          <GlassCard>
            <h3 className="font-bold mb-4">Submit Flag</h3>
            <p className="text-xs text-mute mb-4">
              Complete the objective to find the flag. Format: ZT&#123;...&#125;
            </p>
            <form onSubmit={handleFlagSubmit} className="space-y-3">
              <input
                type="text"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                disabled={isSolved}
                placeholder="ZT{...}"
                className={`w-full bg-surface border ${error ? 'border-red-500' : isSolved ? 'border-emerald-500' : 'border-line'} rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan transition-colors disabled:opacity-50`}
              />
              <button 
                type="submit" 
                disabled={isSolved || !flagInput}
                className="w-full btn-primary text-sm py-2 disabled:opacity-50"
              >
                {isSolved ? 'Solved!' : 'Submit'}
              </button>
              {error && <p className="text-xs text-red-500 text-center">Incorrect flag. Try again.</p>}
            </form>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.3}>
          <GlassCard>
            <h3 className="font-bold mb-4">Hints</h3>
            <div className="space-y-3">
              {hints.map((hint, i) => (
                <div key={i}>
                  {visibleHints > i ? (
                    <div className="bg-surface/50 border border-line rounded p-3 text-sm text-gray-300">
                      <span className="font-bold mr-2">Hint {i + 1}:</span>
                      {hint}
                    </div>
                  ) : (
                    <button
                      onClick={() => setVisibleHints(i + 1)}
                      disabled={visibleHints !== i}
                      className={`w-full text-left text-sm p-3 rounded border border-line ${visibleHints === i ? 'hover:bg-surface transition-colors text-cyan' : 'opacity-50 cursor-not-allowed text-mute'}`}
                    >
                      Reveal Hint {i + 1}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </div>
  );
}
