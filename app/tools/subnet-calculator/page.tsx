'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SubnetCalculatorPage() {
  const [cidrInput, setCidrInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const ip2long = (ip: string) => {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
  };

  const long2ip = (long: number) => {
    return [
      (long >>> 24) & 255,
      (long >>> 16) & 255,
      (long >>> 8) & 255,
      long & 255
    ].join('.');
  };

  const calculateSubnet = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    
    try {
      const input = cidrInput.trim();
      if (!input) throw new Error("Please enter an IPv4 CIDR.");

      const parts = input.split('/');
      if (parts.length !== 2) throw new Error("Invalid format. Use IP/CIDR (e.g., 192.168.1.0/24)");

      const ipStr = parts[0];
      const cidr = parseInt(parts[1], 10);

      if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(ipStr)) throw new Error("Invalid IPv4 address format.");
      if (isNaN(cidr) || cidr < 0 || cidr > 32) throw new Error("CIDR must be between 0 and 32.");

      // Check octets
      ipStr.split('.').forEach(octet => {
        if (parseInt(octet, 10) > 255) throw new Error("IPv4 octets must be 0-255.");
      });

      const ipLong = ip2long(ipStr);
      const maskLong = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
      const wildcardLong = ~maskLong >>> 0;
      
      const networkLong = (ipLong & maskLong) >>> 0;
      const broadcastLong = (networkLong | wildcardLong) >>> 0;
      
      let firstUsableLong, lastUsableLong, usableCount, totalCount;

      if (cidr === 32) {
        firstUsableLong = networkLong;
        lastUsableLong = networkLong;
        totalCount = 1n;
        usableCount = 1n;
      } else if (cidr === 31) {
        firstUsableLong = networkLong;
        lastUsableLong = broadcastLong;
        totalCount = 2n;
        usableCount = 2n;
      } else {
        firstUsableLong = networkLong + 1;
        lastUsableLong = broadcastLong - 1;
        totalCount = 2n ** BigInt(32 - cidr);
        usableCount = totalCount - 2n;
      }

      setResult({
        ip: ipStr,
        network: long2ip(networkLong),
        broadcast: long2ip(broadcastLong),
        mask: long2ip(maskLong),
        wildcard: long2ip(wildcardLong),
        first: long2ip(firstUsableLong),
        last: long2ip(lastUsableLong),
        totalCount: totalCount.toString(),
        usableCount: usableCount.toString(),
        cidr
      });

    } catch (err: any) {
      setError(err.message);
    }
  };

  const copyDetails = () => {
    if (!result) return;
    const txt = `Network: ${result.network}/${result.cidr}
Broadcast: ${result.broadcast}
Mask: ${result.mask}
First: ${result.first}
Last: ${result.last}
Usable: ${result.usableCount}`;
    navigator.clipboard.writeText(txt);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Subnet Calculator</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Calculate IPv4 CIDR blocks, wildcard masks, and usable host ranges locally.</p>
          <div className="mt-4 flex gap-2">
            <span className="inline-block px-3 py-1 bg-[rgba(255,255,255,0.05)] text-xs font-mono tracking-wider rounded-md border border-[rgba(255,255,255,0.1)]">
              LOCAL ONLY
            </span>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 md:p-8">
          
          <form onSubmit={calculateSubnet} className="mb-8 relative">
            <label className="block text-sm font-medium mb-2">IPv4 Network (e.g., 192.168.1.0/24)</label>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                value={cidrInput}
                onChange={(e) => setCidrInput(e.target.value)}
                placeholder="10.0.0.0/8"
                className="w-full flex-grow bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 focus:outline-none focus:border-[rgb(var(--c-accent))] transition-colors font-mono"
              />
              <button 
                type="submit"
                className="w-full md:w-auto bg-[rgb(var(--c-accent))] text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Calculate
              </button>
            </div>
          </form>

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 mb-6">
              {error}
            </div>
          )}

          {result && (
            <div className="bg-[rgba(0,0,0,0.2)] rounded-xl p-6 border border-[rgba(255,255,255,0.05)] relative">
              <h4 className="text-[rgb(var(--c-mute))] text-sm uppercase tracking-wider mb-4 font-bold">Subnet Details</h4>
              
              <table className="w-full text-left">
                <tbody>
                  <tr className="border-b border-[rgba(255,255,255,0.05)]">
                    <td className="py-3 text-[rgb(var(--c-mute))] w-1/2">IP Address</td>
                    <td className="py-3 font-mono">{result.ip}</td>
                  </tr>
                  <tr className="border-b border-[rgba(255,255,255,0.05)]">
                    <td className="py-3 text-[rgb(var(--c-mute))]">Network Address</td>
                    <td className="py-3 font-mono text-[rgb(var(--c-accent))] font-bold">{result.network}</td>
                  </tr>
                  <tr className="border-b border-[rgba(255,255,255,0.05)]">
                    <td className="py-3 text-[rgb(var(--c-mute))]">Broadcast Address</td>
                    <td className="py-3 font-mono">{result.broadcast}</td>
                  </tr>
                  <tr className="border-b border-[rgba(255,255,255,0.05)]">
                    <td className="py-3 text-[rgb(var(--c-mute))]">Subnet Mask</td>
                    <td className="py-3 font-mono">{result.mask}</td>
                  </tr>
                  <tr className="border-b border-[rgba(255,255,255,0.05)]">
                    <td className="py-3 text-[rgb(var(--c-mute))]">Wildcard Mask</td>
                    <td className="py-3 font-mono">{result.wildcard}</td>
                  </tr>
                  <tr className="border-b border-[rgba(255,255,255,0.05)]">
                    <td className="py-3 text-[rgb(var(--c-mute))]">First Usable Host</td>
                    <td className="py-3 font-mono text-[#4ade80]">{result.first}</td>
                  </tr>
                  <tr className="border-b border-[rgba(255,255,255,0.05)]">
                    <td className="py-3 text-[rgb(var(--c-mute))]">Last Usable Host</td>
                    <td className="py-3 font-mono text-[#4ade80]">{result.last}</td>
                  </tr>
                  <tr className="border-b border-[rgba(255,255,255,0.05)]">
                    <td className="py-3 text-[rgb(var(--c-mute))]">Total Addresses</td>
                    <td className="py-3 font-mono">{BigInt(result.totalCount).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-[rgb(var(--c-mute))]">Usable Hosts</td>
                    <td className="py-3 font-mono font-bold text-white">{BigInt(result.usableCount).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>

              <button 
                onClick={copyDetails}
                className="mt-6 w-full text-sm font-bold uppercase tracking-wider bg-[rgba(255,255,255,0.1)] px-4 py-3 rounded-lg hover:bg-[rgb(var(--c-accent))] transition-colors"
              >
                Copy Details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
