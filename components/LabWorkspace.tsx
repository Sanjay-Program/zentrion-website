'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LabWorkspaceProps {
  labId: string;
  title: string;
  category: string;
  difficulty: string;
  missionBriefing: React.ReactNode;
  hints: React.ReactNode[];
  children: React.ReactNode;
  isSolved: boolean;
  flagId: string;
}

export default function LabWorkspace({
  labId,
  title,
  category,
  difficulty,
  missionBriefing,
  hints,
  children,
  isSolved,
  flagId
}: LabWorkspaceProps) {
  const router = useRouter();
  const [time, setTime] = useState(0);
  const [activeHint, setActiveHint] = useState<number>(-1);
  const [flagInput, setFlagInput] = useState('');
  const [flagValidated, setFlagValidated] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleFlagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (flagInput === flagId) {
      setFlagValidated(true);
      // In a real app, save to localStorage here
    } else {
      alert('Invalid Flag');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-void text-ink overflow-hidden font-mono selection:bg-cyan/30">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-80 border-r border-line bg-surface/30 flex flex-col shrink-0 h-full">
        {/* Header */}
        <div className="p-4 border-b border-line flex items-center justify-between bg-void">
          <Link href="/labs" className="text-cyan text-xs font-semibold hover:underline flex items-center gap-2 tracking-widest uppercase">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Exit Range
          </Link>
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
        </div>

        {/* Mission Info */}
        <div className="p-5 flex-1 overflow-y-auto">
          <div className="mb-6">
            <div className="flex gap-2 mb-2">
              <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-cyan/10 text-cyan border border-cyan/20">
                {category}
              </span>
              <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                {difficulty}
              </span>
            </div>
            <h1 className="text-xl font-bold font-display text-white">{title}</h1>
          </div>

          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400">
            <div className="flex items-center gap-2 mb-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              <span className="text-[10px] font-bold uppercase tracking-wider">Educational Use Only</span>
            </div>
            <p className="text-[10px] leading-relaxed opacity-90">
              The tools and techniques demonstrated in this lab are strictly for defensive, educational, and authorized assessment purposes. Any offensive or unauthorized use is strictly prohibited and illegal.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-mute font-bold mb-3 border-b border-line pb-1">
                Mission Briefing
              </h2>
              <div className="text-sm text-ink/80 leading-relaxed prose-invert prose-p:mb-3">
                {missionBriefing}
              </div>
            </div>

            <div>
              <h2 className="text-xs uppercase tracking-widest text-mute font-bold mb-3 border-b border-line pb-1">
                Intelligence (Hints)
              </h2>
              <div className="space-y-2">
                {hints.map((hint, i) => (
                  <div key={i} className="border border-line rounded bg-void overflow-hidden">
                    <button 
                      onClick={() => setActiveHint(activeHint === i ? -1 : i)}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-cyan hover:bg-cyan/5 transition-colors flex justify-between items-center"
                    >
                      <span>Hint #{i + 1}</span>
                      <span>{activeHint === i ? '-' : '+'}</span>
                    </button>
                    {activeHint === i && (
                      <div className="px-3 py-3 border-t border-line text-xs text-ink/70 bg-surface/50">
                        {hint}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Flag Submission */}
        <div className="p-4 border-t border-line bg-void mt-auto">
           {isSolved && !flagValidated && (
             <div className="mb-3 p-3 border border-emerald-500/30 bg-emerald-500/10 rounded">
               <p className="text-xs text-emerald-400 font-bold mb-1">Target Acquired!</p>
               <p className="text-[10px] text-emerald-100/70">Submit the flag below to complete the mission.</p>
               <p className="text-xs font-mono text-white mt-2 p-1.5 bg-void border border-line rounded select-all">
                 {flagId}
               </p>
             </div>
           )}

           {flagValidated ? (
             <div className="p-4 border border-emerald-500 bg-emerald-500/10 rounded flex flex-col items-center text-center">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500 mb-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
               <span className="text-sm font-bold text-emerald-500">Mission Accomplished</span>
             </div>
           ) : (
            <form onSubmit={handleFlagSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="ZENTRION{...}"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                className="flex-1 bg-surface border border-line rounded px-3 py-2 text-xs text-white placeholder:text-mute focus:outline-none focus:border-cyan"
              />
              <button 
                type="submit"
                className="px-3 py-2 bg-cyan text-void text-xs font-bold rounded hover:bg-cyan/90 transition-colors"
              >
                Submit
              </button>
            </form>
           )}
        </div>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#0a0a0f] relative">
        {/* Topbar */}
        <header className="h-12 border-b border-white/10 bg-black/40 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-4 text-xs text-mute font-mono">
             <span>SYS.TIME: <span className="text-white">{formatTime(time)}</span></span>
             <span className="hidden sm:inline-block">ENV: <span className="text-cyan">SANDBOX</span></span>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={() => window.location.reload()} className="text-[10px] uppercase tracking-widest text-mute hover:text-white flex items-center gap-1.5 transition-colors">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
               Reset Environment
             </button>
          </div>
        </header>

        {/* Interactive Content */}
        <div className="flex-1 relative overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
