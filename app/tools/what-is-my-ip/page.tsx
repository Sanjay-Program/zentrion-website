'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface IpInfo {
  ip: string;
  type: string;
  country: string;
  city: string;
  region: string;
  isp: string;
  asn: string;
  org: string;
  loc: string; // from cloudflare trace
}

export default function WhatIsMyIpPage() {
  const [info, setInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchIp() {
      try {
        const res = await fetch('/api/network/what-is-my-ip');
        const data = await res.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch IP details.');
        }

        const type = data.ip.includes(':') ? 'IPv6' : 'IPv4';

        setInfo({
          ip: data.ip,
          type: type,
          loc: data.loc,
          country: data.country,
          city: data.city,
          region: data.region,
          isp: data.org,
          asn: data.asn,
          org: data.org,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred.');
      } finally {
        setLoading(false);
      }
    }

    fetchIp();
  }, []);

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">What Is My IP</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Instantly check your public IPv4 and IPv6 address and network details.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 md:p-8 sm:p-10">
          {loading ? (
            <div className="py-20 text-center animate-pulse">
              <div className="w-16 h-16 border-4 border-[rgb(var(--c-accent))] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-[rgb(var(--c-mute))] text-lg">Analyzing your network connection...</p>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(239,68,68,0.1)] text-red-500 mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-red-500 mb-2">Network Error</h3>
              <p className="text-[rgb(var(--c-mute))]">{error}</p>
            </div>
          ) : info && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-[rgb(var(--c-mute))] text-sm font-semibold tracking-widest uppercase mb-4">Your Public IP Address</h2>
                <div className="text-5xl md:text-7xl font-bold font-mono tracking-tight text-[rgb(var(--c-accent))] break-all">
                  {info.ip}
                </div>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[rgba(255,255,255,0.05)] border border-[var(--c-glass-border)] text-sm font-mono">
                    {info.type} Protocol
                  </span>
                  {info.loc && (
                    <span className="px-3 py-1 rounded-full bg-[rgba(255,255,255,0.05)] border border-[var(--c-glass-border)] text-sm">
                      {info.loc} Node
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl p-6">
                  <h3 className="text-lg font-bold font-display mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[rgb(var(--c-accent))]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Location Data
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider mb-1">Country</div>
                      <div className="font-medium text-lg">{info.country}</div>
                    </div>
                    <div>
                      <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider mb-1">Region / State</div>
                      <div className="font-medium text-lg">{info.region}</div>
                    </div>
                    <div>
                      <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider mb-1">City</div>
                      <div className="font-medium text-lg">{info.city}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl p-6">
                  <h3 className="text-lg font-bold font-display mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[rgb(var(--c-accent))]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                    Network Provider
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider mb-1">ISP</div>
                      <div className="font-medium text-lg">{info.isp}</div>
                    </div>
                    <div>
                      <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider mb-1">Organization</div>
                      <div className="font-medium text-lg">{info.org}</div>
                    </div>
                    <div>
                      <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider mb-1">ASN</div>
                      <div className="font-mono text-lg">{info.asn}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
