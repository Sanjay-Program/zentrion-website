'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NmapGeneratorPage() {
  const [target, setTarget] = useState('192.168.1.1');
  const [scanType, setScanType] = useState('-sS'); // SYN stealth
  const [hostDiscovery, setHostDiscovery] = useState(true); // false = -Pn (Treat all hosts as online)
  const [osDetection, setOsDetection] = useState(false); // -O
  const [serviceDetection, setServiceDetection] = useState(false); // -sV
  const [defaultScripts, setDefaultScripts] = useState(false); // -sC
  const [agressiveMode, setAgressiveMode] = useState(false); // -A
  
  const [timing, setTiming] = useState(3); // -T3
  
  const [portOption, setPortOption] = useState('default'); // default, specific, top
  const [specificPorts, setSpecificPorts] = useState(''); // e.g., 80,443,1-1000
  const [topPorts, setTopPorts] = useState(100);

  const [outputFormat, setOutputFormat] = useState('none'); // none, -oN, -oX, -oG, -oA
  const [outputFilename, setOutputFilename] = useState('scan_results');

  const [generatedCommand, setGeneratedCommand] = useState('nmap 192.168.1.1');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let parts = ['nmap'];

    // Timing
    if (timing !== 3) {
      parts.push(`-T${timing}`);
    }

    // Agressive
    if (agressiveMode) {
      parts.push('-A');
    } else {
      // Individual flags (overridden by -A)
      if (scanType && scanType !== 'none') parts.push(scanType);
      if (!hostDiscovery) parts.push('-Pn');
      if (osDetection) parts.push('-O');
      if (serviceDetection) parts.push('-sV');
      if (defaultScripts) parts.push('-sC');
    }

    // Ports
    if (portOption === 'specific' && specificPorts.trim()) {
      parts.push(`-p ${specificPorts.replace(/\s+/g, '')}`);
    } else if (portOption === 'top' && topPorts) {
      parts.push(`--top-ports ${topPorts}`);
    }

    // Output
    if (outputFormat !== 'none') {
      const ext = outputFormat === '-oN' ? '.txt' : outputFormat === '-oX' ? '.xml' : outputFormat === '-oG' ? '.gnmap' : '';
      parts.push(`${outputFormat} ${outputFilename || 'results'}${outputFormat !== '-oA' ? ext : ''}`);
    }

    // Target
    if (target.trim()) {
      parts.push(target.trim());
    }

    setGeneratedCommand(parts.join(' '));
  }, [
    target, scanType, hostDiscovery, osDetection, serviceDetection, 
    defaultScripts, agressiveMode, timing, portOption, specificPorts, 
    topPorts, outputFormat, outputFilename
  ]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTimingDescription = (t: number) => {
    switch(t) {
      case 0: return 'Paranoid (IDS Evasion)';
      case 1: return 'Sneaky (IDS Evasion)';
      case 2: return 'Polite (Slow, uses less bandwidth)';
      case 3: return 'Normal (Default)';
      case 4: return 'Aggressive (Fast, requires good connection)';
      case 5: return 'Insane (Very fast, may lose accuracy)';
      default: return 'Normal';
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Penetration Testing
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Nmap Command Generator</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Interactively build complex Nmap scanning commands without memorizing flags.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            
            {/* Target & Basic Scan Type */}
            <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8">
              <h3 className="text-[rgb(var(--c-ink))] font-semibold mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-[rgb(var(--c-accent))]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                Target & Scan Type
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-2">Target (IP, Range, or Subnet)</label>
                  <input
                    type="text"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder="192.168.1.1, 10.0.0.0/24, example.com"
                    className="w-full px-4 py-3 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className={`p-4 rounded-xl border cursor-pointer transition-all ${scanType === '-sS' && !agressiveMode ? 'bg-[rgb(var(--c-accent))]/10 border-[rgb(var(--c-accent))]' : 'bg-[var(--c-glass-bg)] border-[var(--c-glass-border)] hover:border-[rgba(255,255,255,0.3)]'} ${agressiveMode ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[rgb(var(--c-ink))] font-bold">SYN Stealth (-sS)</span>
                      <input type="radio" checked={scanType === '-sS'} onChange={() => setScanType('-sS')} className="accent-[rgb(var(--c-accent))]" />
                    </div>
                    <p className="text-xs text-[rgb(var(--c-mute))]">Default, fast, and relatively unobtrusive.</p>
                  </label>

                  <label className={`p-4 rounded-xl border cursor-pointer transition-all ${scanType === '-sT' && !agressiveMode ? 'bg-[rgb(var(--c-accent))]/10 border-[rgb(var(--c-accent))]' : 'bg-[var(--c-glass-bg)] border-[var(--c-glass-border)] hover:border-[rgba(255,255,255,0.3)]'} ${agressiveMode ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[rgb(var(--c-ink))] font-bold">TCP Connect (-sT)</span>
                      <input type="radio" checked={scanType === '-sT'} onChange={() => setScanType('-sT')} className="accent-[rgb(var(--c-accent))]" />
                    </div>
                    <p className="text-xs text-[rgb(var(--c-mute))]">Used when SYN scan is not an option.</p>
                  </label>

                  <label className={`p-4 rounded-xl border cursor-pointer transition-all ${scanType === '-sU' && !agressiveMode ? 'bg-[rgb(var(--c-accent))]/10 border-[rgb(var(--c-accent))]' : 'bg-[var(--c-glass-bg)] border-[var(--c-glass-border)] hover:border-[rgba(255,255,255,0.3)]'} ${agressiveMode ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[rgb(var(--c-ink))] font-bold">UDP Scan (-sU)</span>
                      <input type="radio" checked={scanType === '-sU'} onChange={() => setScanType('-sU')} className="accent-[rgb(var(--c-accent))]" />
                    </div>
                    <p className="text-xs text-[rgb(var(--c-mute))]">Slow but necessary for UDP services.</p>
                  </label>

                  <label className={`p-4 rounded-xl border cursor-pointer transition-all ${scanType === 'none' && !agressiveMode ? 'bg-[rgb(var(--c-accent))]/10 border-[rgb(var(--c-accent))]' : 'bg-[var(--c-glass-bg)] border-[var(--c-glass-border)] hover:border-[rgba(255,255,255,0.3)]'} ${agressiveMode ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[rgb(var(--c-ink))] font-bold">Ping Only (-sn)</span>
                      <input type="radio" checked={scanType === 'none' && !hostDiscovery} onChange={() => {setScanType('none'); setHostDiscovery(true);}} className="accent-[rgb(var(--c-accent))]" />
                    </div>
                    <p className="text-xs text-[rgb(var(--c-mute))]">No port scan, just host discovery.</p>
                  </label>
                </div>
              </div>
            </div>

            {/* Ports & Timing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6">
                <h3 className="text-[rgb(var(--c-ink))] font-semibold mb-4">Port Options</h3>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" checked={portOption === 'default'} onChange={() => setPortOption('default')} className="accent-[rgb(var(--c-accent))]" />
                    <span className="text-sm text-[rgb(var(--c-ink))]">Default (Top 1000)</span>
                  </label>
                  
                  <label className="flex flex-col gap-2 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={portOption === 'specific'} onChange={() => setPortOption('specific')} className="accent-[rgb(var(--c-accent))]" />
                      <span className="text-sm text-[rgb(var(--c-ink))]">Specific Ports (-p)</span>
                    </div>
                    {portOption === 'specific' && (
                      <input
                        type="text"
                        value={specificPorts}
                        onChange={(e) => setSpecificPorts(e.target.value)}
                        placeholder="80,443,1-1024"
                        className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[var(--c-glass-border)] rounded text-sm text-[rgb(var(--c-ink))] focus:border-[rgb(var(--c-accent))] outline-none font-mono"
                      />
                    )}
                  </label>

                  <label className="flex flex-col gap-2 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={portOption === 'top'} onChange={() => setPortOption('top')} className="accent-[rgb(var(--c-accent))]" />
                      <span className="text-sm text-[rgb(var(--c-ink))]">Top Ports (--top-ports)</span>
                    </div>
                    {portOption === 'top' && (
                      <input
                        type="number"
                        min="1"
                        max="65535"
                        value={topPorts}
                        onChange={(e) => setTopPorts(parseInt(e.target.value) || 100)}
                        className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[var(--c-glass-border)] rounded text-sm text-[rgb(var(--c-ink))] focus:border-[rgb(var(--c-accent))] outline-none font-mono"
                      />
                    )}
                  </label>
                </div>
              </div>

              <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[rgb(var(--c-ink))] font-semibold">Timing Template (-T)</h3>
                  <span className="font-mono font-bold text-[rgb(var(--c-accent))]">-T{timing}</span>
                </div>
                
                <input 
                  type="range" 
                  min="0" 
                  max="5" 
                  value={timing} 
                  onChange={(e) => setTiming(parseInt(e.target.value))}
                  className="w-full h-2 bg-[rgba(255,255,255,0.1)] rounded-lg appearance-none cursor-pointer accent-[rgb(var(--c-accent))]"
                />
                <div className="flex justify-between text-xs text-[rgb(var(--c-mute))] mt-2 font-mono">
                  <span>0</span>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
                <p className="text-xs text-[rgb(var(--c-ink))]/80 mt-4 h-8">{getTimingDescription(timing)}</p>
              </div>

            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            
            <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6">
              <h3 className="text-[rgb(var(--c-ink))] font-semibold mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                Detection & Scripts
              </h3>

              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer group p-3 border border-transparent rounded-lg hover:bg-[var(--c-glass-bg)] transition-colors">
                  <div>
                    <span className="text-[rgb(var(--c-ink))] text-sm font-bold block mb-1">Aggressive Scan (-A)</span>
                    <span className="text-xs text-[rgb(var(--c-mute))] block">Enables OS, version, script, and traceroute.</span>
                  </div>
                  <div className="relative">
                    <input type="checkbox" checked={agressiveMode} onChange={() => setAgressiveMode(!agressiveMode)} className="sr-only" />
                    <div className={`block w-10 h-6 rounded-full transition-colors ${agressiveMode ? 'bg-[rgb(var(--c-accent))]' : 'bg-[rgba(255,255,255,0.1)]'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${agressiveMode ? 'translate-x-4' : ''}`}></div>
                  </div>
                </label>

                <div className={`space-y-2 border-t border-[var(--c-glass-border)] pt-4 transition-opacity ${agressiveMode ? 'opacity-30 pointer-events-none' : ''}`}>
                  <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-[var(--c-glass-bg)] rounded">
                    <input type="checkbox" checked={!hostDiscovery} onChange={() => setHostDiscovery(!hostDiscovery)} className="accent-[rgb(var(--c-accent))]" />
                    <span className="text-sm text-[rgb(var(--c-ink))]">Disable Host Discovery (-Pn)</span>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-[var(--c-glass-bg)] rounded">
                    <input type="checkbox" checked={osDetection} onChange={() => setOsDetection(!osDetection)} className="accent-[rgb(var(--c-accent))]" />
                    <span className="text-sm text-[rgb(var(--c-ink))]">OS Detection (-O)</span>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-[var(--c-glass-bg)] rounded">
                    <input type="checkbox" checked={serviceDetection} onChange={() => setServiceDetection(!serviceDetection)} className="accent-[rgb(var(--c-accent))]" />
                    <span className="text-sm text-[rgb(var(--c-ink))]">Service Versioning (-sV)</span>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-[var(--c-glass-bg)] rounded">
                    <input type="checkbox" checked={defaultScripts} onChange={() => setDefaultScripts(!defaultScripts)} className="accent-[rgb(var(--c-accent))]" />
                    <span className="text-sm text-[rgb(var(--c-ink))]">Default Scripts (-sC)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6">
              <h3 className="text-[rgb(var(--c-ink))] font-semibold mb-4 text-sm">Output Format</h3>
              
              <select 
                value={outputFormat} 
                onChange={(e) => setOutputFormat(e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[var(--c-glass-border)] text-[rgb(var(--c-ink))] rounded-lg px-3 py-2 outline-none focus:border-[rgb(var(--c-accent))] mb-3 text-sm"
              >
                <option value="none">Standard Output Only</option>
                <option value="-oN">Normal (-oN)</option>
                <option value="-oX">XML (-oX)</option>
                <option value="-oG">Grepable (-oG)</option>
                <option value="-oA">All Formats (-oA)</option>
              </select>

              {outputFormat !== 'none' && (
                <input
                  type="text"
                  value={outputFilename}
                  onChange={(e) => setOutputFilename(e.target.value)}
                  placeholder="scan_results"
                  className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[var(--c-glass-border)] rounded text-sm text-[rgb(var(--c-ink))] focus:border-[rgb(var(--c-accent))] outline-none font-mono"
                />
              )}
            </div>

          </div>
        </div>

        {/* Floating Action Bar */}
        <div className="mt-8 sticky bottom-8 z-50 glass-card rounded-2xl border border-[rgba(255,255,255,0.2)] bg-[rgba(20,20,20,0.8)] backdrop-blur-xl p-4 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-grow w-full overflow-x-auto custom-scrollbar pb-2 sm:pb-0">
            <div className="font-mono text-xl text-[rgb(var(--c-accent))] whitespace-nowrap min-w-max">
              <span className="text-[rgb(var(--c-ink))]/50 select-none mr-2">$</span>
              {generatedCommand}
            </div>
          </div>
          <button
            onClick={copyToClipboard}
            className={`shrink-0 px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
              copied 
                ? 'bg-green-500 text-white' 
                : 'bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))] hover:opacity-90'
            }`}
          >
            {copied ? (
              <><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Copied!</>
            ) : (
              <><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Copy Command</>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
