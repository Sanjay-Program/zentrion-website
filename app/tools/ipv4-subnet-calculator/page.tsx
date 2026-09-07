'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface SubnetInfo {
  ipAddress: string;
  networkAddress: string;
  usableHostRange: string;
  broadcastAddress: string;
  totalHosts: number;
  usableHosts: number;
  subnetMask: string;
  wildcardMask: string;
  binarySubnetMask: string;
  cidr: number;
  ipClass: string;
  ipType: string;
}

export default function SubnetCalculatorPage() {
  const [ipInput, setIpInput] = useState('192.168.1.1');
  const [cidrInput, setCidrInput] = useState<number>(24);
  const [result, setResult] = useState<SubnetInfo | null>(null);
  const [error, setError] = useState('');

  // Utility to convert IP string to 32-bit integer
  const ipToInt = (ip: string) => {
    return ip.split('.').reduce((int, octet) => (int << 8) + parseInt(octet, 10), 0) >>> 0;
  };

  // Utility to convert 32-bit integer to IP string
  const intToIp = (int: number) => {
    return [
      (int >>> 24) & 255,
      (int >>> 16) & 255,
      (int >>> 8) & 255,
      int & 255
    ].join('.');
  };

  const calculateSubnet = () => {
    try {
      setError('');
      
      const ipRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      if (!ipRegex.test(ipInput)) {
        throw new Error('Invalid IPv4 address format.');
      }

      const cidr = Number(cidrInput);
      if (isNaN(cidr) || cidr < 0 || cidr > 32) {
        throw new Error('CIDR must be between 0 and 32.');
      }

      const ipInt = ipToInt(ipInput);
      
      // Calculate Masks
      const maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
      const wildcardInt = ~maskInt >>> 0;
      
      // Calculate Addresses
      const networkInt = (ipInt & maskInt) >>> 0;
      const broadcastInt = (networkInt | wildcardInt) >>> 0;
      
      // Calculate Hosts
      const firstHostInt = cidr >= 31 ? networkInt : networkInt + 1;
      const lastHostInt = cidr >= 31 ? broadcastInt : broadcastInt - 1;
      
      const totalHosts = cidr === 32 ? 1 : Math.pow(2, 32 - cidr);
      const usableHosts = cidr >= 31 ? 0 : totalHosts - 2;

      // Determine IP Class
      const firstOctet = parseInt(ipInput.split('.')[0], 10);
      let ipClass = 'Unknown';
      if (firstOctet >= 1 && firstOctet <= 126) ipClass = 'A';
      else if (firstOctet >= 128 && firstOctet <= 191) ipClass = 'B';
      else if (firstOctet >= 192 && firstOctet <= 223) ipClass = 'C';
      else if (firstOctet >= 224 && firstOctet <= 239) ipClass = 'D (Multicast)';
      else if (firstOctet >= 240 && firstOctet <= 255) ipClass = 'E (Experimental)';
      else if (firstOctet === 127) ipClass = 'Loopback';

      // Determine IP Type (Private vs Public)
      let ipType = 'Public';
      if (
        (firstOctet === 10) ||
        (firstOctet === 172 && parseInt(ipInput.split('.')[1], 10) >= 16 && parseInt(ipInput.split('.')[1], 10) <= 31) ||
        (firstOctet === 192 && parseInt(ipInput.split('.')[1], 10) === 168)
      ) {
        ipType = 'Private';
      } else if (firstOctet === 127) {
        ipType = 'Loopback';
      } else if (firstOctet === 169 && parseInt(ipInput.split('.')[1], 10) === 254) {
        ipType = 'APIPA / Link-Local';
      }

      const binaryMask = intToIp(maskInt).split('.').map(octet => parseInt(octet, 10).toString(2).padStart(8, '0')).join('.');

      setResult({
        ipAddress: ipInput,
        networkAddress: intToIp(networkInt),
        usableHostRange: usableHosts > 0 ? `${intToIp(firstHostInt)} - ${intToIp(lastHostInt)}` : 'N/A',
        broadcastAddress: intToIp(broadcastInt),
        totalHosts,
        usableHosts,
        subnetMask: intToIp(maskInt),
        wildcardMask: intToIp(wildcardInt),
        binarySubnetMask: binaryMask,
        cidr,
        ipClass,
        ipType
      });

    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : 'Calculation error');
    }
  };

  // Auto-calculate
  useEffect(() => {
    if (ipInput && cidrInput !== undefined) {
      calculateSubnet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ipInput, cidrInput]);

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">IPv4 Subnet Calculator</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Instantly calculate network addresses, broadcast ranges, and CIDR subnets.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm text-[rgb(var(--c-mute))] font-semibold mb-2">IP Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[rgb(var(--c-mute))]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                </div>
                <input
                  type="text"
                  value={ipInput}
                  onChange={(e) => setIpInput(e.target.value)}
                  placeholder="192.168.1.1"
                  className="w-full pl-12 pr-4 py-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
                />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <label className="block text-sm text-[rgb(var(--c-mute))] font-semibold mb-2">CIDR Prefix</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[rgb(var(--c-accent))] font-bold">
                  /
                </div>
                <input
                  type="number"
                  min="0"
                  max="32"
                  value={cidrInput}
                  onChange={(e) => setCidrInput(parseInt(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p className="text-red-400 font-semibold">{error}</p>
          </div>
        )}

        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-5">
                <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Network Address</div>
                <div className="text-xl font-mono text-white font-bold">{result.networkAddress}</div>
              </div>
              <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-5">
                <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Broadcast Address</div>
                <div className="text-xl font-mono text-white font-bold">{result.broadcastAddress}</div>
              </div>
              <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-5">
                <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Usable Hosts</div>
                <div className="text-xl font-mono text-[rgb(var(--c-accent))] font-bold">{result.usableHosts.toLocaleString()}</div>
              </div>
              <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-5">
                <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Subnet Mask</div>
                <div className="text-xl font-mono text-white font-bold">{result.subnetMask}</div>
              </div>
            </div>

            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left border-collapse">
                <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                  <tr className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <td className="py-4 px-6 text-sm text-[rgb(var(--c-mute))] font-semibold w-1/3">IP Address</td>
                    <td className="py-4 px-6 font-mono text-white">{result.ipAddress}</td>
                  </tr>
                  <tr className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <td className="py-4 px-6 text-sm text-[rgb(var(--c-mute))] font-semibold">Usable Host Range</td>
                    <td className="py-4 px-6 font-mono text-blue-400 font-bold">{result.usableHostRange}</td>
                  </tr>
                  <tr className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <td className="py-4 px-6 text-sm text-[rgb(var(--c-mute))] font-semibold">Total IPs (Including Net/Bcast)</td>
                    <td className="py-4 px-6 font-mono text-white">{result.totalHosts.toLocaleString()}</td>
                  </tr>
                  <tr className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <td className="py-4 px-6 text-sm text-[rgb(var(--c-mute))] font-semibold">Wildcard Mask</td>
                    <td className="py-4 px-6 font-mono text-yellow-400">{result.wildcardMask}</td>
                  </tr>
                  <tr className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <td className="py-4 px-6 text-sm text-[rgb(var(--c-mute))] font-semibold">Binary Subnet Mask</td>
                    <td className="py-4 px-6 font-mono text-[rgba(255,255,255,0.6)] text-sm tracking-widest break-all">
                      {result.binarySubnetMask.split('.').map((octet, i) => (
                        <span key={i} className={octet.includes('1') ? 'text-green-400' : 'text-red-400'}>{octet}{i < 3 ? '.' : ''}</span>
                      ))}
                    </td>
                  </tr>
                  <tr className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <td className="py-4 px-6 text-sm text-[rgb(var(--c-mute))] font-semibold">IP Class</td>
                    <td className="py-4 px-6 font-mono text-white">{result.ipClass}</td>
                  </tr>
                  <tr className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <td className="py-4 px-6 text-sm text-[rgb(var(--c-mute))] font-semibold">IP Type</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${result.ipType === 'Private' ? 'bg-orange-500/20 text-orange-400' : result.ipType === 'Public' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {result.ipType}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
