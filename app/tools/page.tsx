import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zentrion Cyber Intelligence Suite | 70+ Free Security Tools',
  description: 'The ultimate suite of 70+ free cybersecurity, networking, OSINT, and AI-powered intelligence tools. Analyze domains, test DNS, scan ports, and secure your digital assets.',
  openGraph: {
    title: 'Zentrion Cyber Intelligence Suite | 70+ Free Security Tools',
    description: 'The ultimate suite of 70+ free cybersecurity, networking, OSINT, and AI-powered intelligence tools.',
  },
};

const CATEGORIES = [
  {
    name: '🤖 Zentrion Intelligence (AI)',
    description: 'AI-powered security audits and threat analysis',
    tools: [
      { name: 'AI Website Security Scanner', url: '/tools/website-security-scanner', priority: true },
      { name: 'AI Domain Security Audit', url: '/tools/domain-security-audit' },
      { name: 'AI Email Security Audit', url: '/tools/email-security-audit' },
      { name: 'AI SSL/TLS Analysis', url: '/tools/ssl-tls-analysis' },
      { name: 'AI DNS Analysis', url: '/tools/dns-analysis' },
      { name: 'AI IP Intelligence', url: '/tools/ip-intelligence' },
      { name: 'AI IOC Analysis', url: '/tools/ioc-analysis' },
    ]
  },
  {
    name: '🌐 Network',
    description: 'Routing, IP intelligence, and connectivity tools',
    tools: [
      { name: 'What Is My IP', url: '/tools/what-is-my-ip', priority: true },
      { name: 'IP Lookup', url: '/tools/ip-lookup', priority: true },
      { name: 'Reverse IP', url: '/tools/reverse-ip' },
      { name: 'ASN Lookup', url: '/tools/asn-lookup' },
      { name: 'Ping Test', url: '/tools/ping' },
      { name: 'Traceroute', url: '/tools/traceroute' },
      { name: 'Port Checker', url: '/tools/port-checker', priority: true },
      { name: 'Subnet Calculator', url: '/tools/subnet-calculator' },
      { name: 'IP Classifier (IPv4/v6)', url: '/tools/ip-classifier' },
      { name: 'MAC Vendor Lookup', url: '/tools/mac-vendor' },
      { name: 'Common Ports', url: '/tools/common-ports' },
    ]
  },
  {
    name: '🌎 DNS & Domains',
    description: 'Domain records, propagation, and DNSSEC',
    tools: [
      { name: 'DNS Lookup', url: '/tools/dns-lookup', priority: true },
      { name: 'DNS Propagation Checker', url: '/tools/dns-propagation', priority: true },
      { name: 'Reverse DNS', url: '/tools/reverse-dns' },
      { name: 'WHOIS / RDAP Lookup', url: '/tools/whois-lookup', priority: true },
      { name: 'DNSSEC Checker', url: '/tools/dnssec-checker' },
      { name: 'CAA Checker', url: '/tools/caa-checker' },
      { name: 'Domain Age Checker', url: '/tools/domain-age' },
      { name: 'Domain Expiry Checker', url: '/tools/domain-expiry' },
      { name: 'Nameserver Checker', url: '/tools/nameserver-checker' },
      { name: 'DNS Record Analyzer', url: '/tools/dns-record-analyzer' },
    ]
  },
  {
    name: '🔒 Web Security',
    description: 'TLS, Headers, and Web vulnerability tools',
    tools: [
      { name: 'SSL Certificate Checker', url: '/tools/ssl-checker', priority: true },
      { name: 'TLS Version Checker', url: '/tools/tls-checker' },
      { name: 'Certificate Decoder', url: '/tools/certificate-decoder' },
      { name: 'Certificate Chain Analyzer', url: '/tools/certificate-chain' },
      { name: 'HTTP Headers Checker', url: '/tools/http-headers' },
      { name: 'Security Headers Checker', url: '/tools/security-headers', priority: true },
      { name: 'Redirect Checker', url: '/tools/redirect-checker' },
      { name: 'Website Technology Detector', url: '/tools/technology-detector' },
    ]
  },
  {
    name: '📧 Email Security',
    description: 'SPF, DKIM, DMARC, and email health',
    tools: [
      { name: 'MX Lookup', url: '/tools/mx-lookup' },
      { name: 'SPF Checker', url: '/tools/spf-checker', priority: true },
      { name: 'DKIM Checker', url: '/tools/dkim-checker', priority: true },
      { name: 'DMARC Checker', url: '/tools/dmarc-checker', priority: true },
      { name: 'MTA-STS Checker', url: '/tools/mta-sts' },
      { name: 'TLS-RPT Checker', url: '/tools/tls-rpt' },
      { name: 'Email Security Score', url: '/tools/email-security-score' },
    ]
  },
  {
    name: '🛡️ Threat Intelligence',
    description: 'Reputation, Blacklists, and IOCs',
    tools: [
      { name: 'IP Reputation', url: '/tools/ip-reputation' },
      { name: 'Domain Reputation', url: '/tools/domain-reputation' },
      { name: 'URL Reputation', url: '/tools/url-reputation' },
      { name: 'IP Blacklist Checker', url: '/tools/ip-blacklist', priority: true },
      { name: 'Domain Blacklist Checker', url: '/tools/domain-blacklist' },
      { name: 'Hash Reputation', url: '/tools/hash-reputation' },
      { name: 'IOC Lookup', url: '/tools/ioc-lookup' },
      { name: 'ASN Reputation', url: '/tools/asn-reputation' },
    ]
  },
  {
    name: '🕵️ OSINT',
    description: 'Open-source intelligence and reconnaissance',
    tools: [
      { name: 'Username Finder', url: '/tools/username-finder' },
      { name: 'GitHub Analyzer', url: '/tools/github-analyzer' },
      { name: 'Subdomain Finder', url: '/tools/subdomain-finder', priority: true },
      { name: 'Certificate Transparency', url: '/tools/certificate-transparency' },
      { name: 'URL Analyzer', url: '/tools/url-analyzer' },
      { name: 'Robots.txt Analyzer', url: '/tools/robots-analyzer' },
      { name: 'Sitemap Analyzer', url: '/tools/sitemap-analyzer' },
      { name: 'Domain Intelligence', url: '/tools/domain-intelligence' },
    ]
  },
  {
    name: '🔐 Developer Security',
    description: 'Crypto, Encoding, JWT, and offline utilities',
    tools: [
      { name: 'Password Strength', url: '/tools/password-strength' },
      { name: 'Password Generator', url: '/tools/password-generator' },
      { name: 'Password Breach Check', url: '/tools/password-breach' },
      { name: 'JWT Inspector', url: '/tools/jwt-inspector' },
      { name: 'Hash Generator', url: '/tools/hash-generator' },
      { name: 'HMAC Generator', url: '/tools/hmac-generator' },
      { name: 'Encoding Toolkit', url: '/tools/encoding-toolkit' },
      { name: 'Regex Tester', url: '/tools/regex-tester' },
      { name: 'UUID Generator', url: '/tools/uuid-generator' },
      { name: 'HTTP Status Lookup', url: '/tools/http-status' },
    ]
  },
  {
    name: '🛠️ Content & Design Utilities',
    description: 'Formatters, Converters, and Generators',
    tools: [
      { name: 'Text Analyzer', url: '/tools/text-analyzer' },
      { name: 'Color Converter', url: '/tools/color-converter' },
      { name: 'Lorem Ipsum Generator', url: '/tools/lorem-ipsum' },
      { name: 'Base32 Encoder', url: '/tools/base32' },
      { name: 'URL Parser', url: '/tools/url-parser' },
      { name: 'JSON Formatter', url: '/tools/json-formatter' },
      { name: 'Image to Base64', url: '/tools/image-base64' },
      { name: 'Unix Timestamp', url: '/tools/unix-timestamp' },
    ]
  },
  {
    name: '⚙️ System Utilities',
    description: 'Calculators, permissions, and schedulers',
    tools: [
      { name: 'Chmod Calculator', url: '/tools/chmod-calculator' },
      { name: 'HTML Entities', url: '/tools/html-entities' },
      { name: 'Cron Generator', url: '/tools/cron-generator' },
      { name: 'MAC Generator', url: '/tools/mac-generator' },
      { name: 'Text Hasher', url: '/tools/text-hasher' },
      { name: 'API Key Generator', url: '/tools/token-generator' },
      { name: 'HTTP Status Codes', url: '/tools/http-status-codes' },
    ]
  },
];

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
            A comprehensive ecosystem of 70+ advanced networking, OSINT, and cybersecurity utilities. 
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
            <div key={category.name} className="glass-card rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 flex flex-col h-full hover:border-[rgba(255,255,255,0.15)] transition-colors">
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
