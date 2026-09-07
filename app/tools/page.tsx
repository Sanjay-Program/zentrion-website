import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zentrion Cyber Intelligence Suite | 30+ Free Security Tools',
  description: 'The ultimate suite of 30+ free cybersecurity, networking, OSINT, and AI-powered intelligence tools. Analyze domains, test DNS, scan ports, and secure your digital assets.',
  openGraph: {
    title: 'Zentrion Cyber Intelligence Suite | 30+ Free Security Tools',
    description: 'The ultimate suite of 30+ free cybersecurity, networking, OSINT, and AI-powered intelligence tools.',
  },
};

import { CATEGORIES } from '@/lib/tools-data';

export default function ToolsDashboard() {
  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.08] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="eyebrow block mb-4 text-[rgb(var(--c-accent))] tracking-widest uppercase text-sm font-mono">
            Intelligence That Protects
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight mb-6">
            Zentrion Cyber Intelligence Suite
          </h1>
          <p className="text-xl text-[rgb(var(--c-mute))] max-w-3xl mx-auto">
            A comprehensive ecosystem of 30+ advanced networking, OSINT, and cybersecurity utilities. 
            Run full-stack domain audits, inspect certificates, and gather threat intelligence instantly.
          </p>
        </div>

        {/* Flagship Tool Callout */}
        <div className="mb-20">
          <Link href="/tools/website-security-scanner" className="block w-full">
            <div className="relative group overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.15)] bg-gradient-to-r from-[rgba(47,107,255,0.1)] to-[rgba(10,14,23,0.8)] backdrop-blur-xl p-8 md:p-12 transition-all hover:border-[rgba(255,255,255,0.3)] hover:shadow-2xl hover:shadow-[rgb(var(--c-accent))]/20">
              <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--c-accent))] to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <span className="inline-block px-3 py-1 bg-[rgb(var(--c-accent))] text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4 shadow-[0_0_15px_rgba(47,107,255,0.5)]">
                    Flagship Tool
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Zentrion Website Security Scanner</h2>
                  <p className="text-[rgb(var(--c-mute))] text-lg max-w-xl">
                    Run an all-in-one AI-powered audit checking DNS, SSL, Security Headers, WHOIS, Email Security (SPF/DMARC), and Blacklist status. Get a complete security score in seconds.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="px-8 py-4 bg-white text-black font-bold font-display rounded-lg transition-transform group-hover:scale-105">
                    Launch Scanner &rarr;
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category) => (
            <div key={category.name} className="glass-card rounded-xl border border-[rgba(255,255,255,0.08)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 flex flex-col h-full hover:border-[rgba(255,255,255,0.15)] transition-colors">
              <h3 className="text-2xl font-bold font-display mb-2">{category.name}</h3>
              <p className="text-[rgb(var(--c-mute))] text-sm mb-6">{category.description}</p>
              
              <ul className="space-y-3 mt-auto">
                {category.tools.map((tool) => (
                  <li key={tool.name}>
                    <Link 
                      href={tool.url}
                      className="group flex items-center justify-between text-[rgb(var(--c-ink))] hover:text-[rgb(var(--c-accent))] transition-colors text-sm font-medium"
                    >
                      <span className="flex items-center gap-2">
                        {tool.name}
                        {tool.priority && (
                          <span className="text-[10px] uppercase tracking-wider bg-[rgba(255,255,255,0.1)] px-1.5 py-0.5 rounded text-[rgb(var(--c-mute))] group-hover:bg-[rgb(var(--c-accent))] group-hover:text-white transition-colors">
                            Hot
                          </span>
                        )}
                      </span>
                      <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                        &rarr;
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
