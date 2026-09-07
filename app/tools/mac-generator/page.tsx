'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

export default function MacGeneratorPage() {
  const [macs, setMacs] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [format, setFormat] = useState<'colon' | 'hyphen' | 'dot' | 'none'>('colon');
  const [caseType, setCaseType] = useState<'upper' | 'lower'>('upper');
  const [prefix, setPrefix] = useState('');
  const [multicast, setMulticast] = useState(false);
  const [locallyAdministered, setLocallyAdministered] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateMacs = useCallback(() => {
    const newMacs: string[] = [];

    // Parse user prefix if provided
    let prefixClean = prefix.replace(/[^0-9A-Fa-f]/g, '');
    
    for (let i = 0; i < count; i++) {
      let macHex = prefixClean;
      
      // Fill the rest with random hex
      while (macHex.length < 12) {
        macHex += Math.floor(Math.random() * 16).toString(16);
      }
      
      // Ensure it is 12 characters (truncate if prefix was too long)
      macHex = macHex.substring(0, 12);

      // Handle Multicast / Locally Administered bits on the first octet
      // First octet is first 2 hex chars
      let firstOctet = parseInt(macHex.substring(0, 2), 16);
      
      if (!prefixClean || prefixClean.length < 2) {
        // Bit 0: 0 = Unicast, 1 = Multicast
        if (multicast) {
          firstOctet |= 0x01; // Set bit 0 to 1
        } else {
          firstOctet &= ~0x01; // Set bit 0 to 0
        }

        // Bit 1: 0 = Universally Administered (OUI), 1 = Locally Administered (LAA)
        if (locallyAdministered) {
          firstOctet |= 0x02; // Set bit 1 to 1
        } else {
          firstOctet &= ~0x02; // Set bit 1 to 0
        }
      }

      // Reconstruct the mac
      macHex = firstOctet.toString(16).padStart(2, '0') + macHex.substring(2);

      // Apply casing
      if (caseType === 'upper') {
        macHex = macHex.toUpperCase();
      } else {
        macHex = macHex.toLowerCase();
      }

      // Apply formatting
      let formattedMac = '';
      if (format === 'colon') {
        formattedMac = macHex.match(/.{1,2}/g)?.join(':') || macHex;
      } else if (format === 'hyphen') {
        formattedMac = macHex.match(/.{1,2}/g)?.join('-') || macHex;
      } else if (format === 'dot') {
        formattedMac = macHex.match(/.{1,4}/g)?.join('.') || macHex;
      } else {
        formattedMac = macHex;
      }

      newMacs.push(formattedMac);
    }

    setMacs(newMacs);
  }, [count, format, caseType, prefix, multicast, locallyAdministered]);

  useEffect(() => {
    generateMacs();
  }, [generateMacs]);

  const copyToClipboard = (text: string, index?: number) => {
    navigator.clipboard.writeText(text);
    if (index !== undefined) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } else {
      alert('All MACs copied to clipboard!');
    }
  };

  const copyAll = () => {
    copyToClipboard(macs.join('\n'));
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">MAC Address Generator</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Generate random, formatted Media Access Control (MAC) addresses for network testing and spoofing.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6">
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-[rgb(var(--c-accent))]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                Configuration
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-semibold text-white">Quantity</label>
                    <span className="text-[rgb(var(--c-accent))] font-mono">{count}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    value={count} 
                    onChange={(e) => setCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-[rgba(255,255,255,0.1)] rounded-lg appearance-none cursor-pointer accent-[rgb(var(--c-accent))]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Format</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setFormat('colon')}
                      className={`py-2 px-3 text-sm font-mono rounded-lg border transition-all ${format === 'colon' ? 'bg-[rgb(var(--c-accent))] border-[rgb(var(--c-accent))] text-[rgb(var(--c-void))] font-bold' : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.1)] text-[rgb(var(--c-mute))] hover:border-[rgba(255,255,255,0.3)]'}`}
                    >
                      AA:BB:CC
                    </button>
                    <button
                      onClick={() => setFormat('hyphen')}
                      className={`py-2 px-3 text-sm font-mono rounded-lg border transition-all ${format === 'hyphen' ? 'bg-[rgb(var(--c-accent))] border-[rgb(var(--c-accent))] text-[rgb(var(--c-void))] font-bold' : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.1)] text-[rgb(var(--c-mute))] hover:border-[rgba(255,255,255,0.3)]'}`}
                    >
                      AA-BB-CC
                    </button>
                    <button
                      onClick={() => setFormat('dot')}
                      className={`py-2 px-3 text-sm font-mono rounded-lg border transition-all ${format === 'dot' ? 'bg-[rgb(var(--c-accent))] border-[rgb(var(--c-accent))] text-[rgb(var(--c-void))] font-bold' : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.1)] text-[rgb(var(--c-mute))] hover:border-[rgba(255,255,255,0.3)]'}`}
                    >
                      AAAA.BBBB
                    </button>
                    <button
                      onClick={() => setFormat('none')}
                      className={`py-2 px-3 text-sm font-mono rounded-lg border transition-all ${format === 'none' ? 'bg-[rgb(var(--c-accent))] border-[rgb(var(--c-accent))] text-[rgb(var(--c-void))] font-bold' : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.1)] text-[rgb(var(--c-mute))] hover:border-[rgba(255,255,255,0.3)]'}`}
                    >
                      AABBCC
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Case</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setCaseType('upper')}
                      className={`py-2 px-3 text-sm rounded-lg border transition-all ${caseType === 'upper' ? 'bg-white/10 border-white text-white font-bold' : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.1)] text-[rgb(var(--c-mute))] hover:border-[rgba(255,255,255,0.3)]'}`}
                    >
                      UPPERCASE
                    </button>
                    <button
                      onClick={() => setCaseType('lower')}
                      className={`py-2 px-3 text-sm rounded-lg border transition-all ${caseType === 'lower' ? 'bg-white/10 border-white text-white font-bold' : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.1)] text-[rgb(var(--c-mute))] hover:border-[rgba(255,255,255,0.3)]'}`}
                    >
                      lowercase
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-3">OUI Prefix (Optional)</label>
                  <input
                    type="text"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    placeholder="e.g. 00:1A:2B"
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
                  />
                  <p className="text-xs text-[rgb(var(--c-mute))] mt-2">Force the first few octets (e.g., to mimic a specific vendor like Cisco or Apple).</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-[rgb(var(--c-mute))] group-hover:text-white transition-colors text-sm">Locally Administered (LAA)</span>
                    <div className="relative">
                      <input type="checkbox" checked={locallyAdministered} onChange={() => setLocallyAdministered(!locallyAdministered)} disabled={prefix.length >= 2} className="sr-only" />
                      <div className={`block w-10 h-6 rounded-full transition-colors ${locallyAdministered && prefix.length < 2 ? 'bg-green-500' : 'bg-[rgba(255,255,255,0.1)]'} ${prefix.length >= 2 ? 'opacity-50' : ''}`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${locallyAdministered && prefix.length < 2 ? 'translate-x-4' : ''}`}></div>
                    </div>
                  </label>
                  <p className="text-[10px] text-[rgb(var(--c-mute))] leading-tight -mt-2">Sets the second least significant bit of the first octet. Standard practice for generated MACs.</p>

                  <label className="flex items-center justify-between cursor-pointer group mt-2">
                    <span className="text-[rgb(var(--c-mute))] group-hover:text-white transition-colors text-sm">Multicast</span>
                    <div className="relative">
                      <input type="checkbox" checked={multicast} onChange={() => setMulticast(!multicast)} disabled={prefix.length >= 2} className="sr-only" />
                      <div className={`block w-10 h-6 rounded-full transition-colors ${multicast && prefix.length < 2 ? 'bg-orange-500' : 'bg-[rgba(255,255,255,0.1)]'} ${prefix.length >= 2 ? 'opacity-50' : ''}`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${multicast && prefix.length < 2 ? 'translate-x-4' : ''}`}></div>
                    </div>
                  </label>
                </div>

              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col h-full">
            <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md flex flex-col h-full overflow-hidden">
              <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)] flex justify-between items-center">
                <h3 className="text-white font-semibold">Generated Addresses</h3>
                <div className="flex gap-2">
                  <button
                    onClick={generateMacs}
                    className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded text-sm text-white transition-colors"
                  >
                    Regenerate
                  </button>
                  <button
                    onClick={copyAll}
                    className="px-3 py-1.5 bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))] rounded text-sm font-bold shadow-sm hover:opacity-90 transition-opacity"
                  >
                    Copy All
                  </button>
                </div>
              </div>
              <div className="flex-grow p-6 bg-[rgba(0,0,0,0.2)] overflow-y-auto custom-scrollbar min-h-[400px]">
                <ul className="space-y-2">
                  {macs.map((mac, idx) => (
                    <li key={idx} className="flex justify-between items-center p-3 rounded-lg hover:bg-[rgba(255,255,255,0.03)] transition-colors group border border-transparent hover:border-[rgba(255,255,255,0.05)]">
                      <span className="font-mono text-lg text-white tracking-widest">{mac}</span>
                      <button
                        onClick={() => copyToClipboard(mac, idx)}
                        className={`p-2 rounded-md transition-all ${
                          copiedIndex === idx 
                            ? 'text-green-400 bg-green-400/10' 
                            : 'text-[rgb(var(--c-mute))] hover:text-white bg-[rgba(255,255,255,0.05)] opacity-0 group-hover:opacity-100 focus:opacity-100'
                        }`}
                        title="Copy"
                      >
                        {copiedIndex === idx ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
