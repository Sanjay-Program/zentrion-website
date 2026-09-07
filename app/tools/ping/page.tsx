'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface PingResult {
  seq: number;
  success: boolean;
  status: number;
  timeMs: number;
}

interface PingStatistics {
  packetsTransmitted: number;
  packetsReceived: number;
  packetLossPercent: number;
  minMs: number;
  maxMs: number;
  avgMs: number;
}

interface PingResponse {
  target: string;
  resolvedProtocol: string;
  pings: PingResult[];
  statistics: PingStatistics;
  error?: string;
}

export default function WebPingPage() {
  const [target, setTarget] = useState('');
  const [isPinging, setIsPinging] = useState(false);
  const [error, setError] = useState('');
  
  // Terminal state
  const [terminalLines, setTerminalLines] = useState<React.ReactNode[]>([]);

  const handlePing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!target.trim()) return;

    let cleanTarget = target.trim().replace(/^https?:\/\//, '').split('/')[0];
    
    setIsPinging(true);
    setError('');
    setTerminalLines([<span key="init">PING {cleanTarget} (Edge Simulated HTTP Ping): 64 data bytes</span>]);

    try {
      const res = await fetch(`/api/network/ping?target=${encodeURIComponent(cleanTarget)}`);
      const data: PingResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to ping target.');
      }

      // Simulate streaming output for the terminal effect
      for (let i = 0; i < data.pings.length; i++) {
        const p = data.pings[i];
        await new Promise(resolve => setTimeout(resolve, 600)); // Artificial delay between lines
        
        setTerminalLines(prev => [
          ...prev, 
          p.success 
            ? <span key={i}>64 bytes from {data.target}: icmp_seq={p.seq} time=<span className={p.timeMs > 500 ? 'text-yellow-400' : 'text-green-400'}>{p.timeMs} ms</span> {data.resolvedProtocol}</span>
            : <span key={i} className="text-red-400">Request timeout for icmp_seq {p.seq}</span>
        ]);
      }

      // Stats
      await new Promise(resolve => setTimeout(resolve, 800));
      setTerminalLines(prev => [
        ...prev,
        <br key="br1" />,
        <span key="stat1">--- {data.target} ping statistics ---</span>,
        <span key="stat2">{data.statistics.packetsTransmitted} packets transmitted, {data.statistics.packetsReceived} packets received, {data.statistics.packetLossPercent.toFixed(1)}% packet loss</span>,
        ...(data.statistics.packetsReceived > 0 ? [
          <span key="stat3">round-trip min/avg/max = {data.statistics.minMs}/{data.statistics.avgMs}/{data.statistics.maxMs} ms</span>
        ] : [])
      ]);

    } catch (err) {
      setTerminalLines(prev => [
        ...prev,
        <span key="err" className="text-red-400">ping: cannot resolve {cleanTarget}: Unknown host or network error</span>
      ]);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsPinging(false);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Web Ping</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Measure latency, uptime, and packet loss to any domain or IP address.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <form onSubmit={handlePing} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[rgb(var(--c-mute))]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="example.com or 1.1.1.1"
                className="w-full pl-12 pr-4 py-4 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isPinging || !target}
              className="btn-primary py-4 px-8 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
            >
              {isPinging ? 'Pinging...' : 'Start Ping'}
            </button>
          </form>
        </div>

        <div className="bg-[#0D1117] border border-[var(--c-glass-border)] rounded-2xl overflow-hidden shadow-2xl mt-8">
          <div className="bg-[#161B22] border-b border-[var(--c-glass-border)] px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-xs font-mono text-[#8B949E]">user@zentrion:~/network$ ping</span>
          </div>
          
          <div className="p-6 font-mono text-sm leading-relaxed min-h-[300px]">
            {terminalLines.length === 0 && !isPinging ? (
              <div className="text-[#8B949E] opacity-50 flex h-full items-center justify-center pt-20">
                Enter a target to start the ping sequence.
              </div>
            ) : (
              <div className="flex flex-col text-[#C9D1D9]">
                {terminalLines.map((line, i) => (
                  <div key={i} className="animate-in fade-in duration-300">{line}</div>
                ))}
                {isPinging && (
                  <div className="mt-2 text-[rgb(var(--c-accent))] animate-pulse">_</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
