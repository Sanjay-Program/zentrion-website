import os

roadmap_tools = [
    # AI Tools
    ("email-security-audit", "AI Email Security Audit", "AI-powered analysis of email authentication policies.", "AI SERVER API"),
    ("ssl-tls-analysis", "AI SSL/TLS Analysis", "AI-driven evaluation of your cryptographic posture.", "AI SERVER API"),
    ("dns-analysis", "AI DNS Analysis", "Intelligent evaluation of your DNS configuration.", "AI SERVER API"),
    ("ip-intelligence", "AI IP Intelligence", "Deep AI analysis of IP addresses and routing data.", "AI SERVER API"),
    ("ioc-analysis", "AI IOC Analysis", "AI-assisted threat intelligence extraction.", "AI SERVER API"),

    # Network
    ("reverse-ip", "Reverse IP Lookup", "Find domains hosted on the same IP.", "SERVER API"),
    ("asn-lookup", "ASN Lookup", "Identify Autonomous System Numbers and routing data.", "SERVER API"),
    ("ping", "Ping Test", "Check latency and packet loss to any host.", "SERVER API"),
    ("traceroute", "Traceroute", "Trace the network path to any server.", "SERVER API"),
    ("mac-vendor", "MAC Vendor Lookup", "Identify hardware manufacturer from MAC address.", "LOCAL ONLY"),
    ("common-ports", "Common Ports Reference", "Searchably database of common TCP/UDP ports.", "LOCAL ONLY"),

    # DNS & Domains
    ("dns-propagation", "DNS Propagation Checker", "Check global DNS record propagation status.", "SERVER API"),
    ("reverse-dns", "Reverse DNS", "Perform PTR record lookups for IP addresses.", "SERVER API"),
    ("dnssec-checker", "DNSSEC Checker", "Validate DNSSEC chain of trust.", "SERVER API"),
    ("caa-checker", "CAA Checker", "Verify Certificate Authority Authorization records.", "SERVER API"),
    ("domain-age", "Domain Age Checker", "Find when a domain was first registered.", "SERVER API"),
    ("domain-expiry", "Domain Expiry Checker", "Track domain expiration dates.", "SERVER API"),
    ("nameserver-checker", "Nameserver Checker", "Identify authoritative nameservers for a domain.", "SERVER API"),
    ("dns-record-analyzer", "DNS Record Analyzer", "Deep analysis of all exposed DNS records.", "SERVER API"),

    # Web Security
    ("tls-checker", "TLS Version Checker", "Detect supported TLS protocols.", "SERVER API"),
    ("certificate-chain", "Certificate Chain Analyzer", "Visually inspect the full SSL trust chain.", "SERVER API"),
    ("http-headers", "HTTP Headers Checker", "Examine raw HTTP response headers.", "SERVER API"),
    ("redirect-checker", "Redirect Checker", "Analyze HTTP redirect chains.", "SERVER API"),
    ("technology-detector", "Website Technology Detector", "Identify CMS, frameworks, and web servers.", "SERVER API"),

    # Email Security
    ("mx-lookup", "MX Lookup", "Find Mail Exchange records.", "SERVER API"),
    ("mta-sts", "MTA-STS Checker", "Validate MTA Strict Transport Security policies.", "SERVER API"),
    ("tls-rpt", "TLS-RPT Checker", "Check SMTP TLS Reporting configurations.", "SERVER API"),
    ("email-security-score", "Email Security Score", "Comprehensive evaluation of domain email defense.", "SERVER API"),

    # Threat Intelligence
    ("ip-reputation", "IP Reputation", "Check IP addresses against threat intelligence feeds.", "SERVER API"),
    ("domain-reputation", "Domain Reputation", "Analyze domain risk and trust scores.", "SERVER API"),
    ("url-reputation", "URL Reputation", "Scan URLs for malware and phishing risks.", "SERVER API"),
    ("domain-blacklist", "Domain Blacklist Checker", "Check if a domain is flagged by spam filters.", "SERVER API"),
    ("hash-reputation", "Hash Reputation", "Look up malware hashes across AV databases.", "SERVER API"),
    ("ioc-lookup", "IOC Lookup", "Search Indicators of Compromise.", "SERVER API"),
    ("asn-reputation", "ASN Reputation", "Evaluate risk associated with an ASN.", "SERVER API"),

    # OSINT
    ("username-finder", "Username Finder", "Search for usernames across social platforms.", "SERVER API"),
    ("github-analyzer", "GitHub Analyzer", "Analyze GitHub profiles and repositories.", "SERVER API"),
    ("certificate-transparency", "Certificate Transparency", "Search CT logs for issued certificates.", "SERVER API"),
    ("url-analyzer", "URL Analyzer", "Deconstruct and safely inspect suspicious URLs.", "LOCAL ONLY"),
    ("robots-analyzer", "Robots.txt Analyzer", "Parse and evaluate site crawling policies.", "SERVER API"),
    ("sitemap-analyzer", "Sitemap Analyzer", "Analyze XML sitemap structure.", "SERVER API"),
    ("domain-intelligence", "Domain Intelligence", "Aggregated OSINT data for domains.", "SERVER API"),

    # Developer Security
    ("hmac-generator", "HMAC Generator", "Compute Hash-based Message Authentication Codes.", "LOCAL ONLY"),
    ("regex-tester", "Regex Tester", "Test and debug Regular Expressions securely.", "LOCAL ONLY"),
    ("uuid-generator", "UUID Generator", "Generate random v4 UUIDs.", "LOCAL ONLY"),
    ("http-status", "HTTP Status Lookup", "Reference guide for HTTP status codes.", "LOCAL ONLY")
]

template = """import React from 'react';
import type {{ Metadata }} from 'next';
import Link from 'next/link';

export const metadata: Metadata = {{
  title: '{title} | Zentrion Cyber Tools',
  description: '{desc}',
}};

export default function {component_name}Page() {{
  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">{title}</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">{desc}</p>
          <div className="mt-4">
            <span className="inline-block px-3 py-1 bg-[rgba(255,255,255,0.05)] text-xs font-mono tracking-wider rounded-md border border-[rgba(255,255,255,0.1)]">
              {badge}
            </span>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 md:p-8">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(255,255,255,0.05)] mb-4">
              <span className="text-2xl">🚧</span>
            </div>
            <h2 className="text-2xl font-bold font-display mb-2">Tool Under Construction</h2>
            <p className="text-[rgb(var(--c-mute))] max-w-md mx-auto">
              This tool is currently being ported to our new Next.js architecture or awaits API integration. Check back soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}}
"""

base_dir = "/home/sanjay/Documents/Zentrion/zentrion-website/app/tools"

for slug, title, desc, badge in roadmap_tools:
    dir_path = os.path.join(base_dir, slug)
    os.makedirs(dir_path, exist_ok=True)
    
    comp_name = slug.replace('-', ' ').title().replace(' ', '')
    
    file_path = os.path.join(dir_path, "page.tsx")
    with open(file_path, "w") as f:
        f.write(template.format(title=title, desc=desc, badge=badge, component_name=comp_name))

print("Scaffolding Phase 2 complete.")
