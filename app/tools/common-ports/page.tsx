'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface PortInfo {
  port: number;
  protocol: 'TCP' | 'UDP' | 'TCP/UDP';
  service: string;
  description: string;
  status: 'Official' | 'Unofficial' | 'System';
}

// A curated list of the most critical / common network ports
const COMMON_PORTS: PortInfo[] = [
  { port: 20, protocol: 'TCP', service: 'FTP', description: 'File Transfer Protocol (Data Transfer)', status: 'System' },
  { port: 21, protocol: 'TCP', service: 'FTP', description: 'File Transfer Protocol (Command Control)', status: 'System' },
  { port: 22, protocol: 'TCP', service: 'SSH', description: 'Secure Shell / SFTP', status: 'System' },
  { port: 23, protocol: 'TCP', service: 'Telnet', description: 'Unencrypted text communications', status: 'System' },
  { port: 25, protocol: 'TCP', service: 'SMTP', description: 'Simple Mail Transfer Protocol (Routing)', status: 'System' },
  { port: 53, protocol: 'TCP/UDP', service: 'DNS', description: 'Domain Name System', status: 'System' },
  { port: 67, protocol: 'UDP', service: 'DHCP', description: 'Dynamic Host Configuration Protocol (Server)', status: 'System' },
  { port: 68, protocol: 'UDP', service: 'DHCP', description: 'Dynamic Host Configuration Protocol (Client)', status: 'System' },
  { port: 80, protocol: 'TCP', service: 'HTTP', description: 'Hypertext Transfer Protocol', status: 'System' },
  { port: 110, protocol: 'TCP', service: 'POP3', description: 'Post Office Protocol (Email Receipt)', status: 'System' },
  { port: 119, protocol: 'TCP', service: 'NNTP', description: 'Network News Transfer Protocol', status: 'System' },
  { port: 123, protocol: 'UDP', service: 'NTP', description: 'Network Time Protocol', status: 'System' },
  { port: 135, protocol: 'TCP/UDP', service: 'MSRPC', description: 'Microsoft RPC Endpoint Mapper', status: 'System' },
  { port: 137, protocol: 'TCP/UDP', service: 'NetBIOS', description: 'NetBIOS Name Service', status: 'System' },
  { port: 139, protocol: 'TCP/UDP', service: 'NetBIOS', description: 'NetBIOS Session Service', status: 'System' },
  { port: 143, protocol: 'TCP', service: 'IMAP', description: 'Internet Message Access Protocol', status: 'System' },
  { port: 161, protocol: 'UDP', service: 'SNMP', description: 'Simple Network Management Protocol', status: 'System' },
  { port: 389, protocol: 'TCP/UDP', service: 'LDAP', description: 'Lightweight Directory Access Protocol', status: 'System' },
  { port: 443, protocol: 'TCP', service: 'HTTPS', description: 'HTTP Secure (TLS/SSL)', status: 'System' },
  { port: 445, protocol: 'TCP', service: 'SMB', description: 'Microsoft Active Directory, Windows shares', status: 'System' },
  { port: 465, protocol: 'TCP', service: 'SMTPS', description: 'SMTP Secure (TLS/SSL)', status: 'System' },
  { port: 500, protocol: 'UDP', service: 'ISAKMP', description: 'Internet Key Exchange (IPsec)', status: 'System' },
  { port: 514, protocol: 'UDP', service: 'Syslog', description: 'System Logging Protocol', status: 'System' },
  { port: 587, protocol: 'TCP', service: 'SMTP', description: 'SMTP Message Submission', status: 'System' },
  { port: 636, protocol: 'TCP', service: 'LDAPS', description: 'LDAP Secure (TLS/SSL)', status: 'System' },
  { port: 993, protocol: 'TCP', service: 'IMAPS', description: 'IMAP Secure (TLS/SSL)', status: 'System' },
  { port: 995, protocol: 'TCP', service: 'POP3S', description: 'POP3 Secure (TLS/SSL)', status: 'System' },
  { port: 1433, protocol: 'TCP', service: 'MSSQL', description: 'Microsoft SQL Server database', status: 'Official' },
  { port: 1521, protocol: 'TCP', service: 'Oracle', description: 'Oracle database default listener', status: 'Official' },
  { port: 1723, protocol: 'TCP', service: 'PPTP', description: 'Point-to-Point Tunneling Protocol', status: 'Official' },
  { port: 2049, protocol: 'TCP/UDP', service: 'NFS', description: 'Network File System', status: 'Official' },
  { port: 3306, protocol: 'TCP', service: 'MySQL', description: 'MySQL / MariaDB database', status: 'Official' },
  { port: 3389, protocol: 'TCP/UDP', service: 'RDP', description: 'Remote Desktop Protocol', status: 'Official' },
  { port: 5432, protocol: 'TCP', service: 'PostgreSQL', description: 'PostgreSQL database system', status: 'Official' },
  { port: 5900, protocol: 'TCP/UDP', service: 'VNC', description: 'Virtual Network Computing', status: 'Official' },
  { port: 6379, protocol: 'TCP', service: 'Redis', description: 'Redis key-value store', status: 'Unofficial' },
  { port: 8080, protocol: 'TCP', service: 'HTTP-Alt', description: 'Alternative HTTP port (Tomcat, proxies)', status: 'Unofficial' },
  { port: 8443, protocol: 'TCP', service: 'HTTPS-Alt', description: 'Alternative HTTPS port', status: 'Unofficial' },
  { port: 27017, protocol: 'TCP', service: 'MongoDB', description: 'MongoDB database daemon', status: 'Unofficial' },
];

export default function CommonPortsPage() {
  const [search, setSearch] = useState('');

  const filteredPorts = COMMON_PORTS.filter(p => {
    const term = search.toLowerCase();
    return p.port.toString().includes(term) || 
           p.service.toLowerCase().includes(term) || 
           p.description.toLowerCase().includes(term);
  });

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[700px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Common Network Ports</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Search and reference standard TCP/UDP port assignments and their associated services.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-8 mb-8">
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[rgb(var(--c-mute))]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by port number (e.g., 443) or service (e.g., SSH, Database)..."
              className="w-full pl-12 pr-4 py-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all"
            />
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[rgba(255,255,255,0.03)] border-b border-[rgba(255,255,255,0.1)]">
                  <th className="py-4 px-6 text-[rgb(var(--c-mute))] font-semibold text-sm w-32">Port</th>
                  <th className="py-4 px-6 text-[rgb(var(--c-mute))] font-semibold text-sm w-32">Protocol</th>
                  <th className="py-4 px-6 text-[rgb(var(--c-mute))] font-semibold text-sm w-48">Service Name</th>
                  <th className="py-4 px-6 text-[rgb(var(--c-mute))] font-semibold text-sm">Description</th>
                  <th className="py-4 px-6 text-[rgb(var(--c-mute))] font-semibold text-sm w-32">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                {filteredPorts.length > 0 ? (
                  filteredPorts.map((p) => (
                    <tr key={`${p.port}-${p.protocol}`} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors group">
                      <td className="py-4 px-6">
                        <span className="font-mono text-xl font-bold text-[rgb(var(--c-accent))]">{p.port}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[rgb(var(--c-mute))] group-hover:text-white transition-colors">
                          {p.protocol}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-white">{p.service}</span>
                      </td>
                      <td className="py-4 px-6 text-[rgba(255,255,255,0.7)] leading-relaxed">
                        {p.description}
                      </td>
                      <td className="py-4 px-6">
                        {p.status === 'System' && (
                          <span className="text-red-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                            System (0-1023)
                          </span>
                        )}
                        {p.status === 'Official' && (
                          <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                            Registered
                          </span>
                        )}
                        {p.status === 'Unofficial' && (
                          <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                            Dynamic/Private
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-[rgb(var(--c-mute))]">
                      <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      No matching ports or services found for "{search}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
