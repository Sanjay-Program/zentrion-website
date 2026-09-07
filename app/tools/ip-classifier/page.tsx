'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function IpClassifierPage() {
  const [ipInput, setIpInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const ip2long = (ip: string) => {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
  };

  const inRange = (ipLong: number, network: string, cidr: number) => {
    const netLong = ip2long(network);
    const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    return (ipLong & mask) === (netLong & mask);
  };

  const classifyIPv4 = (ipStr: string) => {
    const octets = ipStr.split('.');
    if (octets.length !== 4 || octets.some(o => isNaN(Number(o)) || o === '' || Number(o) < 0 || Number(o) > 255)) {
      throw new Error("Invalid IPv4 address format.");
    }
    
    const ipLong = ip2long(ipStr);
    let classification = "Public";
    let special = "None";

    if (inRange(ipLong, "10.0.0.0", 8)) { classification = "Private (RFC 1918)"; special = "Class A Private"; }
    else if (inRange(ipLong, "172.16.0.0", 12)) { classification = "Private (RFC 1918)"; special = "Class B Private"; }
    else if (inRange(ipLong, "192.168.0.0", 16)) { classification = "Private (RFC 1918)"; special = "Class C Private"; }
    else if (inRange(ipLong, "127.0.0.0", 8)) { classification = "Loopback"; special = "Host Loopback"; }
    else if (inRange(ipLong, "169.254.0.0", 16)) { classification = "Link-Local"; special = "APIPA"; }
    else if (inRange(ipLong, "100.64.0.0", 10)) { classification = "Carrier-Grade NAT (CGN)"; special = "RFC 6598"; }
    else if (inRange(ipLong, "224.0.0.0", 4)) { classification = "Multicast"; special = "Class D"; }
    else if (inRange(ipLong, "240.0.0.0", 4)) { classification = "Reserved"; special = "Class E"; }
    else if (inRange(ipLong, "192.0.2.0", 24) || inRange(ipLong, "198.51.100.0", 24) || inRange(ipLong, "203.0.113.0", 24)) {
      classification = "Documentation"; special = "TEST-NET";
    }
    else if (ipLong === 0xFFFFFFFF) { classification = "Broadcast"; special = "Limited Broadcast"; }
    else if (ipLong === 0) { classification = "This Network"; special = "Software Address"; }

    const bin = octets.map(o => parseInt(o, 10).toString(2).padStart(8, '0')).join('.');

    return { version: "IPv4", normalized: ipStr, classification, special, binary: bin };
  };

  const classifyIPv6 = (ipStr: string) => {
    if (!/^[a-fA-F0-9:]+$/.test(ipStr) || ipStr.indexOf(':') === -1) {
      throw new Error("Invalid IPv6 address format.");
    }
    
    let norm = ipStr.toLowerCase();
    
    let classification = "Global Unicast (Public)";
    let special = "None";

    if (norm === "::1") { classification = "Loopback"; special = "Host Loopback"; }
    else if (norm === "::") { classification = "Unspecified"; special = "Software Address"; }
    else if (norm.startsWith("fc") || norm.startsWith("fd")) { classification = "Unique Local (Private)"; special = "ULA (RFC 4193)"; }
    else if (norm.startsWith("fe8") || norm.startsWith("fe9") || norm.startsWith("fea") || norm.startsWith("feb")) { classification = "Link-Local"; special = "Local Subnet"; }
    else if (norm.startsWith("ff")) { classification = "Multicast"; special = "Multicast Group"; }
    else if (norm.startsWith("2001:db8:")) { classification = "Documentation"; special = "RFC 3849"; }

    return { version: "IPv6", normalized: norm, classification, special, binary: "N/A for IPv6" };
  };

  const handleClassify = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    
    try {
      const input = ipInput.trim();
      if (!input) throw new Error("Please enter an IP address.");

      let res;
      if (input.includes('.')) {
        res = classifyIPv4(input);
      } else {
        res = classifyIPv6(input);
      }

      setResult(res);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">IP Classifier</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Validate and classify IPv4 and IPv6 addresses. No geolocation is performed.</p>
          <div className="mt-4 flex gap-2">
            <span className="inline-block px-3 py-1 bg-[rgba(255,255,255,0.05)] text-xs font-mono tracking-wider rounded-md border border-[var(--c-glass-border)]">
              LOCAL ONLY
            </span>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 md:p-8">
          
          <form onSubmit={handleClassify} className="mb-8 relative">
            <label className="block text-sm font-medium mb-2">IP Address (IPv4 or IPv6)</label>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                value={ipInput}
                onChange={(e) => setIpInput(e.target.value)}
                placeholder="e.g. 192.168.1.100 or fe80::1"
                className="w-full flex-grow bg-[rgba(17,17,17,0.05)] dark:bg-[rgba(0,0,0,0.3)] border border-[var(--c-glass-border)] rounded-lg px-4 py-3 focus:outline-none focus:border-[rgb(var(--c-accent))] transition-colors font-mono"
              />
              <button 
                type="submit"
                className="w-full md:w-auto bg-[rgb(var(--c-accent))] text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Classify
              </button>
            </div>
          </form>

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 mb-6">
              {error}
            </div>
          )}

          {result && (
            <div className="bg-[rgba(0,0,0,0.2)] rounded-xl p-6 border border-[var(--c-glass-border)] relative">
              <h4 className="text-[rgb(var(--c-mute))] text-sm uppercase tracking-wider mb-4 font-bold">Classification Result</h4>
              
              <table className="w-full text-left">
                <tbody>
                  <tr className="border-b border-[var(--c-glass-border)]">
                    <td className="py-3 text-[rgb(var(--c-mute))] w-1/3">Version</td>
                    <td className="py-3 font-mono">{result.version}</td>
                  </tr>
                  <tr className="border-b border-[var(--c-glass-border)]">
                    <td className="py-3 text-[rgb(var(--c-mute))]">Normalized Address</td>
                    <td className="py-3 font-mono text-[rgb(var(--c-accent))] font-bold">{result.normalized}</td>
                  </tr>
                  <tr className="border-b border-[var(--c-glass-border)]">
                    <td className="py-3 text-[rgb(var(--c-mute))]">Classification</td>
                    <td className="py-3 font-bold" style={{ color: result.classification.includes('Public') ? 'rgb(var(--c-danger))' : '#4ade80' }}>
                      {result.classification}
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--c-glass-border)]">
                    <td className="py-3 text-[rgb(var(--c-mute))]">Special Range</td>
                    <td className="py-3">{result.special}</td>
                  </tr>
                  {result.binary !== 'N/A for IPv6' && (
                    <tr>
                      <td className="py-3 text-[rgb(var(--c-mute))]">Binary Representation</td>
                      <td className="py-3 font-mono text-xs">{result.binary}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
