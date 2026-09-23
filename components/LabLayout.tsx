'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface LabLayoutProps {
  title: string;
  description: string;
  instructions: React.ReactNode;
  interactiveComponent: React.ReactNode;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export default function LabLayout({ title, description, instructions, interactiveComponent, difficulty }: LabLayoutProps) {
  const [activeTab, setActiveTab] = useState<'instructions' | 'lab'>('instructions');

  return (
    <div className="h-screen pt-20 flex flex-col overflow-hidden bg-[rgb(var(--c-void))]">
      {/* Header */}
      <header className="h-16 shrink-0 border-b border-line flex items-center justify-between px-4 lg:px-6 bg-surface/50">
        <div className="flex items-center gap-4">
          <Link href="/labs" className="text-mute hover:text-ink transition-colors flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-line">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </Link>
          <div>
            <h1 className="font-display font-semibold text-lg text-ink leading-tight">{title}</h1>
            {difficulty && (
              <span className={`text-[10px] font-mono uppercase tracking-wider ${
                difficulty === 'Beginner' ? 'text-emerald-400' : 
                difficulty === 'Intermediate' ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {difficulty} Lab
              </span>
            )}
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="flex lg:hidden bg-white/5 rounded-lg p-1 border border-line">
          <button 
            onClick={() => setActiveTab('instructions')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${activeTab === 'instructions' ? 'bg-cyan text-void' : 'text-mute'}`}
          >
            Instructions
          </button>
          <button 
            onClick={() => setActiveTab('lab')}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${activeTab === 'lab' ? 'bg-cyan text-void' : 'text-mute'}`}
          >
            Terminal
          </button>
        </div>
      </header>

      {/* Main Split View */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Instructions (Hidden on mobile if 'lab' tab active) */}
        <div className={`w-full lg:w-[45%] xl:w-[40%] flex-col border-r border-line bg-void/50 ${activeTab === 'instructions' ? 'flex' : 'hidden lg:flex'}`}>
          <div className="flex-1 overflow-y-auto p-6 lg:p-8">
            <div className="prose prose-invert prose-cyan max-w-none">
              <h2 className="text-xl font-semibold mb-2">Scenario</h2>
              <p className="text-mute leading-relaxed mb-8">{description}</p>
              
              <div className="space-y-6">
                {instructions}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Lab (Hidden on mobile if 'instructions' tab active) */}
        <div className={`flex-1 flex-col bg-[#0a0a0f] relative ${activeTab === 'lab' ? 'flex' : 'hidden lg:flex'}`}>
          <div className="flex-1 overflow-y-auto p-4 lg:p-8">
            <div className="max-w-4xl mx-auto">
              {interactiveComponent}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
