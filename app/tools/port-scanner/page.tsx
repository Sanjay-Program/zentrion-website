'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const PRESETS = {
  web:    { label: 'Web Ports', ports: '80,443,8080,8443' },
  top20:  { label: 'Top 20',   ports: 'top20' },
  db:     { label: 'Database', ports: '3306,5432,27017,6379' },
  custom: { label: 'Custom',   ports: '' },
} as const;

type PresetKey = keyof typeof PRESETS;

interface PortResult {
  port: number;
  open: boolean;
  service: string;
}

interface ScanResult {
  host: string;
  results: PortResult[];
  scanned: number;
  open_count: number;
}

export default function PortScannerPage() {
  const [host, setHost] = useState('');
  const [activePreset, setActivePreset] = useState<PresetKey>('top20');
  const [customPorts, setCustomPorts] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [animatedRows, setAnimatedRows] = useState<Set<number>>(new Set());

  const getPortsParam = () => {
    if (activePreset === 'custom') return customPorts;
    if (activePreset === 'top20') return 'top20';
    return PRESETS[activePreset].ports;
  };

  const handleScan = async () => {
    if (!host.trim()) { setError('Please enter a host or IP address.'); return; }
    setLoading(true);
    setError(null);
    setResult(null);
    setAnimatedRows(new Set());

    try {
      const params = new URLSearchParams({ host: host.trim(), ports: getPortsParam() });
      const res = await fetch(`/api/network/port-scan?${params}`);
      const data = await res.json();

      if (!res.ok) { setError(data.error ?? 'Scan failed.'); return; }

      setResult(data);
      // Stagger row reveal animations
      data.results.forEach((_: PortResult, i: number) => {
        setTimeout(() => {
          setAnimatedRows(prev => new Set([...prev, i]));
        }, i * 60);
      });
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500 opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>

        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Port Scanner</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Detect open ports and running services on any public host.</p>
        </div>

        {/* Warning banner */}
        <div className="mb-6 flex items-start gap-3 px-4 py-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
          <svg className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <p className="text-sm text-yellow-300/80">
            Only scan hosts you own or have explicit permission to test. Unauthorized port scanning may be illegal in your jurisdiction.
          </p>
        </div>

        {/* Input card */}
        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 mb-6">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-3">Target Host or IP</label>
            <input
              type="text"
              value={host}
              onChange={e => setHost(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleScan()}
              placeholder="e.g. example.com or 93.184.216.34"
              className="w-full px-4 py-3 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
            />
          </div>

          {/* Preset buttons */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-3">Port Preset</label>
            <div className="flex flex-wrap gap-2">
              {(Object.entries(PRESETS) as [PresetKey, (typeof PRESETS)[PresetKey]][]).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => setActivePreset(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                    activePreset === key
                      ? 'bg-[rgb(var(--c-accent))] text-black border-[rgb(var(--c-accent))]'
                      : 'bg-[rgba(255,255,255,0.04)] text-[rgb(var(--c-mute))] border-[var(--c-glass-border)] hover:border-[rgb(var(--c-accent))] hover:text-[rgb(var(--c-ink))]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom port input */}
          {activePreset === 'custom' && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-3">Custom Ports (comma-separated)</label>
              <input
                type="text"
                value={customPorts}
                onChange={e => setCustomPorts(e.target.value)}
                placeholder="e.g. 22,80,443,8080,9200"
                className="w-full px-4 py-3 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
              />
            </div>
          )}

          <button
            onClick={handleScan}
            disabled={loading}
            className="w-full py-3.5 px-6 bg-[rgb(var(--c-accent))] hover:opacity-90 disabled:opacity-50 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Scanning...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                </svg>
                Scan Ports
              </>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Results table */}
        {result && (
          <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md overflow-hidden">
            {/* Result header */}
            <div className="px-6 py-4 border-b border-[var(--c-glass-border)] flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-[rgb(var(--c-accent))] font-bold uppercase tracking-widest text-sm">Scan Results</h2>
                <p className="text-xs text-[rgb(var(--c-mute))] mt-0.5 font-mono">
                  {result.host} &mdash; {result.scanned} ports scanned
                </p>
              </div>
              <div className="flex gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                  {result.open_count} Open
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(255,255,255,0.04)] text-[rgb(var(--c-mute))] border border-[var(--c-glass-border)]">
                  {result.scanned - result.open_count} Closed
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--c-glass-border)]">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[rgb(var(--c-mute))] uppercase tracking-wider">Port</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[rgb(var(--c-mute))] uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-[rgb(var(--c-mute))] uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {result.results.map((r, i) => (
                    <tr
                      key={r.port}
                      className={`border-b border-[var(--c-glass-border)] last:border-0 transition-all duration-300 ${
                        animatedRows.has(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                      } ${r.open ? 'hover:bg-green-500/5' : 'hover:bg-[rgba(255,255,255,0.02)]'}`}
                      style={{ transitionDelay: `${i * 30}ms` }}
                    >
                      <td className="px-6 py-3.5">
                        <span className="font-mono text-sm font-semibold text-[rgb(var(--c-ink))]">{r.port}</span>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className="text-sm text-[rgb(var(--c-mute))]">{r.service}</span>
                      </td>
                      <td className="px-6 py-3.5">
                        {r.open ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/15 text-green-400 border border-green-500/25">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            Open
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(255,255,255,0.04)] text-[rgb(var(--c-mute))] border border-[var(--c-glass-border)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                            Closed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
