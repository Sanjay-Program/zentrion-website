import os

# Top 20 SEO Tools + the 10 Developer Tools we already built logic for
tools = [
    # Developer tools to migrate
    ("password-strength", "Password Strength Checker", "Analyze password entropy and patterns.", "LOCAL ONLY"),
    ("password-generator", "Secure Password Generator", "Generate cryptographically secure passwords.", "LOCAL ONLY"),
    ("password-breach", "Password Breach Checker", "Check if a password has been compromised.", "EXTERNAL API"),
    ("hash-generator", "Hash Generator", "Compute secure hashes for text and files.", "LOCAL ONLY"),
    ("jwt-inspector", "JWT Inspector", "Decode and analyze JSON Web Tokens.", "LOCAL ONLY"),
    ("encoding-toolkit", "Encoding Toolkit", "Encode and decode Base64, URL, HTML, Hex.", "LOCAL ONLY"),
    ("subnet-calculator", "Subnet Calculator", "Calculate IPv4 CIDR blocks and host ranges.", "LOCAL ONLY"),
    ("ip-classifier", "IP Classifier", "Validate and classify IPv4 and IPv6 addresses.", "LOCAL ONLY"),
    ("certificate-decoder", "Certificate Decoder", "Parse and inspect X.509 PEM certificates.", "LOCAL ONLY"),
    ("dns-lookup", "DNS Lookup", "Query DNS records using Cloudflare DoH.", "EXTERNAL API"),

    # Flagship & Other Top 20 placeholders
    ("website-security-scanner", "Website Security Scanner", "AI-powered all-in-one domain security audit.", "AI SERVER API"),
    ("domain-security-audit", "Domain Security Audit", "Comprehensive domain security analysis.", "AI SERVER API"),
    ("what-is-my-ip", "What Is My IP", "Instantly check your public IPv4 and IPv6 address.", "SERVER API"),
    ("ip-lookup", "IP Lookup", "Geolocate and inspect any IP address.", "SERVER API"),
    ("whois-lookup", "WHOIS Lookup", "Query domain registration and ownership records.", "SERVER API"),
    ("port-checker", "Port Checker", "Scan common TCP ports for open services.", "SERVER API"),
    ("security-headers", "Security Headers Checker", "Analyze HTTP security headers for vulnerabilities.", "SERVER API"),
    ("ssl-checker", "SSL Certificate Checker", "Check SSL/TLS certificate validity and chain.", "SERVER API"),
    ("spf-checker", "SPF Checker", "Validate Sender Policy Framework records.", "SERVER API"),
    ("dkim-checker", "DKIM Checker", "Validate DomainKeys Identified Mail signatures.", "SERVER API"),
    ("dmarc-checker", "DMARC Checker", "Analyze DMARC policies for email security.", "SERVER API"),
    ("ip-blacklist", "IP Blacklist Checker", "Check if an IP is listed on major spam blocklists.", "SERVER API"),
    ("subdomain-finder", "Subdomain Finder", "Discover subdomains using passive OSINT.", "SERVER API"),
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

for slug, title, desc, badge in tools:
    dir_path = os.path.join(base_dir, slug)
    os.makedirs(dir_path, exist_ok=True)
    
    comp_name = slug.replace('-', ' ').title().replace(' ', '')
    
    file_path = os.path.join(dir_path, "page.tsx")
    with open(file_path, "w") as f:
        f.write(template.format(title=title, desc=desc, badge=badge, component_name=comp_name))

print("Scaffolding complete.")
