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
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  // Mobile: toggle between 'terminal' and 'briefing' tabs
  const [mobileTab, setMobileTab] = useState<'terminal' | 'briefing'>('terminal');
  // Mobile: sidebar drawer open
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    } else {
      alert('Invalid Flag');
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/30 shrink-0">
        <Link href="/labs" className="text-cyan text-xs font-semibold hover:underline flex items-center gap-2 tracking-widest uppercase">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Exit Range
        </Link>
        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
      </div>

      {/* Mission Info */}
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-cyan/10 text-cyan border border-cyan/20">
              {category}
            </span>
            <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
              {difficulty}
            </span>
          </div>
          <h1 className="text-lg font-bold font-display text-cyan leading-tight">{title}</h1>
        </div>

        <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400">
          <div className="flex items-center gap-2 mb-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <span className="text-[10px] font-bold uppercase tracking-wider">Educational Use Only</span>
          </div>
          <p className="text-[10px] leading-relaxed opacity-90">
            Strictly for defensive, educational, and authorized purposes. Unauthorized use is prohibited and illegal.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <h2 className="text-[10px] uppercase tracking-widest text-cyan/70 font-bold mb-2 border-b border-white/10 pb-1">
              Mission Briefing
            </h2>
            <div className="text-xs text-gray-300 leading-relaxed">
              {missionBriefing}
            </div>
          </div>

          <div>
            <h2 className="text-[10px] uppercase tracking-widest text-cyan/70 font-bold mb-2 border-b border-white/10 pb-1">
              Intelligence (Hints)
            </h2>
            <div className="space-y-2">
              {hints.map((hint, i) => (
                <div key={i} className="border border-white/10 rounded bg-black/30 overflow-hidden">
                  <button
                    onClick={() => setActiveHint(activeHint === i ? -1 : i)}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-cyan hover:bg-cyan/5 transition-colors flex justify-between items-center"
                  >
                    <span>Hint #{i + 1}</span>
                    <span className="text-lg leading-none">{activeHint === i ? '−' : '+'}</span>
                  </button>
                  {activeHint === i && (
                    <div className="px-3 py-3 border-t border-white/10 text-xs text-gray-300 bg-white/5">
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
      <div className="p-4 border-t border-white/10 bg-black/30 shrink-0">
        {isSolved && !flagValidated && (
          <div className="mb-3 p-3 border border-emerald-500/30 bg-emerald-500/10 rounded">
            <p className="text-xs text-emerald-400 font-bold mb-1">Target Acquired!</p>
            <p className="text-[10px] text-emerald-300/70">Submit the flag below to complete the mission.</p>
            <p className="text-xs font-mono text-cyan mt-2 p-1.5 bg-black/40 border border-white/10 rounded select-all break-all">
              {flagId}
            </p>
          </div>
        )}

        {flagValidated ? (
          <div className="p-4 border border-emerald-500 bg-emerald-500/10 rounded flex flex-col items-center text-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500 mb-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <span className="text-sm font-bold text-emerald-400 mb-2">Flag Validated!</span>
            <p className="text-xs text-emerald-300/80 mb-3">Submit this flag on the CTF dashboard to claim your points.</p>
            <Link href="/ctf" className="btn-primary py-1.5 px-4 text-xs w-full text-center">
              Claim Points in CTF
            </Link>
          </div>
        ) : (
          <form onSubmit={handleFlagSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="ZENTRION{...}"
              value={flagInput}
              onChange={(e) => setFlagInput(e.target.value)}
              className="flex-1 bg-black/40 border border-white/20 rounded px-3 py-2 text-xs text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-cyan min-w-0"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-cyan text-black text-xs font-bold rounded hover:bg-cyan/90 transition-colors shrink-0"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Lab Safety Disclaimer Modal */}
      {showDisclaimer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-red-500/30 max-w-2xl w-full p-6 md:p-8 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">
            <h2 className="text-xl md:text-2xl font-display font-bold text-red-500 mb-4 flex items-center gap-3 shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              Lab Safety &amp; Rules of Engagement
            </h2>
            <div className="space-y-3 text-sm text-mute leading-relaxed overflow-y-auto mb-6 flex-1">
              <p className="text-ink">By proceeding, you acknowledge and agree to the following conditions:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>These labs are strictly educational simulations. Some environments intentionally reproduce vulnerabilities for training purposes.</li>
                <li>Your behavior in this lab <strong className="text-ink">does not authorize</strong> testing against real, production, or external systems.</li>
                <li>Examples and architectures may be simplified for educational clarity.</li>
                <li>You must follow lab instructions and must <strong className="text-ink">not</strong> modify, attack, or scan any infrastructure outside the permitted laboratory environment.</li>
                <li>Zentrion may modify, suspend, or remove labs at any time without notice. Lab availability is not guaranteed.</li>
                <li>Completion of a lab does not constitute a professional certification, and scores/flags do not constitute proof of real-world security competence.</li>
              </ul>
              <p className="text-ink font-semibold">Any offensive or unauthorized use of these techniques outside this environment is strictly prohibited and illegal.</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3 shrink-0">
              <Link href="/labs" className="btn-ghost text-center">Decline &amp; Exit</Link>
              <button onClick={() => setShowDisclaimer(false)} className="btn-primary !bg-red-500/20 !text-red-500 !border-red-500/50 hover:!bg-red-500 hover:!text-white">
                I Agree, Start Lab
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-screen Lab Workspace */}
      <div className={`flex flex-col h-[100dvh] w-full bg-[#0a0a0f] text-gray-200 overflow-hidden font-mono selection:bg-cyan/30 ${showDisclaimer ? 'blur-sm pointer-events-none' : ''}`}>

        {/* ── TOPBAR (always visible) ── */}
        <header className="h-11 border-b border-white/10 bg-black/60 flex items-center justify-between px-3 md:px-4 shrink-0 z-10">
          <div className="flex items-center gap-3 text-[10px] text-gray-500 font-mono">
            <span>SYS.TIME: <span className="text-cyan">{formatTime(time)}</span></span>
            <span className="hidden sm:inline">ENV: <span className="text-cyan">SANDBOX</span></span>
          </div>
          <div className="flex items-center gap-2">
            {/* Mobile: briefing toggle button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-[10px] uppercase tracking-widest text-cyan border border-cyan/30 rounded px-2 py-1 hover:bg-cyan/10 transition-colors"
            >
              {sidebarOpen ? '✕ Close' : '☰ Briefing'}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-cyan flex items-center gap-1.5 transition-colors"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </header>

        {/* ── BODY: sidebar + main ── */}
        <div className="flex flex-1 overflow-hidden relative">

          {/* ── SIDEBAR: hidden on mobile (drawer), always visible on md+ ── */}
          <>
            {/* Mobile backdrop */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black/60 z-20 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            <aside
              className={`
                fixed inset-y-0 left-0 z-30 w-[85vw] max-w-xs bg-[#0d0d14] border-r border-white/10
                transform transition-transform duration-300 ease-in-out
                md:relative md:inset-auto md:z-auto md:w-72 md:translate-x-0 md:flex md:flex-col md:shrink-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              `}
            >
              <SidebarContent />
            </aside>
          </>

          {/* ── MAIN WORKSPACE ── */}
          <main className="flex-1 flex flex-col overflow-hidden bg-[#0a0a0f]">
            <div className="flex-1 relative overflow-hidden">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
