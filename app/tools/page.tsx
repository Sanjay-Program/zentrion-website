import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zentrion Cyber Intelligence Suite | 30+ Free Security Tools',
  description: 'The ultimate suite of 30+ free cybersecurity, networking, OSINT, and AI-powered intelligence tools. Analyze domains, test DNS, scan ports, and secure your digital assets.',
  openGraph: {
    title: 'Zentrion Cyber Intelligence Suite | 30+ Free Security Tools',
    description: 'The ultimate suite of 30+ free cybersecurity, networking, OSINT, and AI-powered intelligence tools.',
  },
};

import { CATEGORIES } from '@/lib/tools-data';
import AdBanner from '@/components/AdBanner';
import SalesCTA from '@/components/SalesCTA';

export default function ToolsDashboard() {
  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.08] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Breadcrumbs */}
        <div className="mb-8 flex items-center gap-2 text-sm font-medium">
          <Link href="/" className="text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] transition-colors">
            Home
          </Link>
          <span className="text-[rgb(var(--c-mute))]">/</span>
          <span className="text-[rgb(var(--c-ink))]">Tools</span>
        </div>
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="eyebrow block mb-4 text-[rgb(var(--c-accent))] tracking-widest uppercase text-sm font-mono">
            Intelligence That Protects
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight mb-6">
            Zentrion Cyber Intelligence Suite
          </h1>
          <p className="text-xl text-[rgb(var(--c-mute))] max-w-3xl mx-auto">
            A comprehensive ecosystem of 30+ advanced networking, OSINT, and cybersecurity utilities. 
            Run full-stack domain audits, inspect certificates, and gather threat intelligence instantly.
          </p>
        </div>

        {/* AdSense Top */}
        <AdBanner dataAdSlot="1234567890" />

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
            <div key={category.name} className="glass-card rounded-xl border border-[rgba(255,255,255,0.08)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 flex flex-col h-full hover:border-[rgba(255,255,255,0.15)] transition-colors">
              {category.icon}
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

        {/* High Value Content Section for AdSense Compliance */}
        <div className="mt-32 max-w-4xl mx-auto prose prose-invert prose-lg text-[rgb(var(--c-mute))]">
          <h2 className="text-3xl font-display font-bold text-[rgb(var(--c-ink))] mb-6">Why Use the Zentrion Cyber Intelligence Suite?</h2>
          <p>
            In today’s rapidly evolving threat landscape, maintaining complete visibility over your digital infrastructure is not optional—it is a critical requirement. The <strong>Zentrion Cyber Intelligence Suite</strong> is a curated collection of advanced networking, open-source intelligence (OSINT), and cybersecurity utilities designed for security analysts, penetration testers, and IT administrators.
          </p>
          <p>
            Unlike generic tool aggregates, our suite is strictly focused on actionable intelligence. Whether you are conducting a routine DNS audit, validating email security configurations (SPF/DMARC), or actively hunting for misconfigured ports, our toolset provides real-time, untampered data directly from the edge.
          </p>

          <h3 className="text-2xl font-display font-bold text-[rgb(var(--c-ink))] mt-10 mb-4">Core Capabilities & Threat Hunting</h3>
          <p>
            Our ecosystem is divided into specialized domains to assist in every phase of the reconnaissance and hardening process:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li><strong>Network Mapping:</strong> Utilize our port scanners and subnet calculators to accurately map out IP blocks, identify exposed services, and classify IPv4/IPv6 architectures before adversaries can exploit them.</li>
            <li><strong>Domain & DNS Forensics:</strong> Investigate DNS propagation delays, verify reverse DNS records (PTR), and parse WHOIS data to uncover the infrastructure behind suspicious domains.</li>
            <li><strong>Web Security Auditing:</strong> Inspect critical HTTP security headers (HSTS, CSP, X-Frame-Options), validate SSL/TLS certificate chains, and detect the presence of Web Application Firewalls (WAF) to ensure web application resilience.</li>
            <li><strong>Email Authentication:</strong> Prevent domain spoofing and phishing attacks by validating your domain's SPF (Sender Policy Framework) and DMARC records to ensure strict alignment.</li>
            <li><strong>OSINT & Reconnaissance:</strong> Leverage advanced sub-domain enumeration, repository analysis, and username lookups to build a comprehensive threat profile of a target organization.</li>
          </ul>

          <h3 className="text-2xl font-display font-bold text-[rgb(var(--c-ink))] mt-10 mb-4">Frequently Asked Questions</h3>
          
          <div className="space-y-6 mt-6">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Are these tools safe to use on production systems?</h4>
              <p>Yes. All tools in the Zentrion Cyber Intelligence Suite operate passively. They perform standard network queries, DNS lookups, and header inspections without executing intrusive payloads or exploiting vulnerabilities, ensuring your production environments remain completely stable and unaffected.</p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-white mb-2">How accurate is the Website Security Scanner?</h4>
              <p>The flagship Website Security Scanner performs real-time edge requests to analyze the exact HTTP response headers, SSL configurations, and DNS records currently resolving for a given domain. It does not rely on cached databases, ensuring you receive up-to-the-second accuracy.</p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Can I use these tools for compliance auditing?</h4>
              <p>Absolutely. IT teams regularly use our TLS/SSL decoders and HTTP header inspectors to quickly validate that their infrastructure meets the baseline requirements for standards like PCI-DSS, SOC 2, and ISO 27001 before initiating formal third-party audits.</p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-2">Is the data I analyze logged or shared?</h4>
              <p>No. Zentrion Technologies operates with a strict privacy-first architecture. Client-side tools (like the AES Crypto and JWT Inspector) process data entirely within your browser memory. Server-side queries (like DNS and Nmap) do not persist target data in our databases after the request is completed.</p>
            </div>
          </div>
        </div>

        {/* AdSense Bottom */}
        <div className="mt-20">
          <AdBanner dataAdSlot="0987654321" />
        </div>

        {/* Sales CTA */}
        <div className="mt-16">
          <SalesCTA />
        </div>

      </div>
    </div>
  );
}
