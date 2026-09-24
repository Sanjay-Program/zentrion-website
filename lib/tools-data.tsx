import React from 'react';
import { Globe, Globe2, ShieldCheck, Mail, ShieldAlert, Search, KeyRound, Wrench, Settings } from 'lucide-react';

export const CATEGORIES = [
  {
    name: 'Network',
    icon: <Globe className="w-6 h-6 mb-4 text-[rgb(var(--c-accent))]" />,
    description: 'Routing, IP intelligence, and connectivity tools',
    tools: [
      { name: 'Advanced Speed Test', url: '/tools/network/speed-test', priority: true },
      { name: 'What Is My IP', url: '/tools/what-is-my-ip', priority: true },
      { name: 'Port Scanner', url: '/tools/port-scanner', priority: true },
      { name: 'Phone & SIM Intelligence', url: '/tools/network/phone-validator' },
      { name: 'ASN Lookup', url: '/tools/asn-lookup' },
      { name: 'Ping Test', url: '/tools/ping' },
      { name: 'Subnet Calculator', url: '/tools/subnet-calculator' },
      { name: 'IP Classifier (IPv4/v6)', url: '/tools/ip-classifier' },
      { name: 'MAC Vendor Lookup', url: '/tools/mac-vendor' },
      { name: 'Common Ports', url: '/tools/common-ports' },
    ]
  },
  {
    name: 'DNS & Domains',
    icon: <Globe2 className="w-6 h-6 mb-4 text-[rgb(var(--c-accent))]" />,
    description: 'Domain records, propagation, and DNSSEC',
    tools: [
      { name: 'DNS Lookup', url: '/tools/dns-lookup', priority: true },
      { name: 'DNS Propagation Checker', url: '/tools/dns-propagation', priority: true },
      { name: 'Reverse DNS', url: '/tools/reverse-dns' },
      { name: 'WHOIS / RDAP Lookup', url: '/tools/whois-lookup', priority: true },
    ]
  },
  {
    name: 'Web Security',
    icon: <ShieldCheck className="w-6 h-6 mb-4 text-[rgb(var(--c-accent))]" />,
    description: 'TLS, Headers, WAF detection, and Web vulnerability tools',
    tools: [
      { name: 'WAF Detector', url: '/tools/waf-detector', priority: true },
      { name: 'URL Safety Checker', url: '/tools/url-safety', priority: true },
      { name: 'Certificate Decoder', url: '/tools/certificate-decoder' },
      { name: 'HTTP Headers Checker', url: '/tools/http-headers' },
    ]
  },
  {
    name: 'Email Security',
    icon: <Mail className="w-6 h-6 mb-4 text-[rgb(var(--c-accent))]" />,
    description: 'SPF, DKIM, DMARC, and email health',
    tools: [
      { name: 'MX Lookup', url: '/tools/mx-lookup' },
      { name: 'SPF Checker', url: '/tools/spf-checker', priority: true },
      { name: 'DMARC Checker', url: '/tools/dmarc-checker', priority: true },
    ]
  },
  {
    name: 'Threat Intelligence',
    icon: <ShieldAlert className="w-6 h-6 mb-4 text-[rgb(var(--c-accent))]" />,
    description: 'CVEs, Reputation, Blacklists, and IOCs',
    tools: [
      { name: 'CVE Lookup', url: '/tools/cve-lookup', priority: true },
      { name: 'IP Blacklist Checker', url: '/tools/ip-blacklist', priority: true },
    ]
  },
  {
    name: 'OSINT',
    icon: <Search className="w-6 h-6 mb-4 text-[rgb(var(--c-accent))]" />,
    description: 'Open-source intelligence and reconnaissance',
    tools: [
      { name: 'Username Finder', url: '/tools/osint/username-finder', priority: true },
      { name: 'GitHub Analyzer', url: '/tools/osint/github-analyzer' },
      { name: 'Repository Analyzer', url: '/tools/osint/repo-analyzer' },
      { name: 'Subdomain Finder', url: '/tools/subdomain-finder', priority: true },
      { name: 'URL Analyzer', url: '/tools/url-analyzer' },
    ]
  },
  {
    name: 'Developer Security',
    icon: <KeyRound className="w-6 h-6 mb-4 text-[rgb(var(--c-accent))]" />,
    description: 'Crypto, Encoding, JWT, and offline utilities',
    tools: [
      { name: 'AES Encrypt / Decrypt', url: '/tools/aes-crypto', priority: true },
      { name: 'Password Strength', url: '/tools/password-strength' },
      { name: 'Password Generator', url: '/tools/password-generator' },
      { name: 'Password Breach Check', url: '/tools/password-breach' },
      { name: 'JWT Inspector', url: '/tools/jwt-inspector' },
      { name: 'Hash Generator', url: '/tools/hash-generator' },
      { name: 'HMAC Generator', url: '/tools/hmac-generator' },
    ]
  }
];

