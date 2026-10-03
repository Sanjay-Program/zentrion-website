'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function AttackSurfaceScanner() {
  const [domain, setDomain] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const startScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.includes('.')) {
      alert("Please enter a valid domain (e.g., example.com)");
      return;
    }
    
    setIsScanning(true);
    setScanComplete(false);
    setProgress(0);
    setLogs([]);
    setEmailSubmitted(false);

    // Simulated scanning sequence
    const sequence = [
      "Initializing OSINT framework...",
      `Resolving DNS records for ${domain}...`,
      "Discovered 4 subdomains (api, staging, dev, www)...",
      "Scanning common ports (80, 443, 22, 3306, 8080)...",
      "WARNING: Port 3306 (MySQL) appears to be open to the public on dev subdomain.",
      "Checking SSL/TLS configurations...",
      "Analyzing HTTP headers for security misconfigurations...",
      "Missing Content-Security-Policy detected.",
      "Checking against known CVE databases...",
      "Found 2 potential vulnerabilities in detected software stack.",
      "Compiling final threat intelligence report..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < sequence.length) {
        setLogs(prev => [...prev, sequence[currentStep]]);
        setProgress(((currentStep + 1) / sequence.length) * 100);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          setScanComplete(true);
        }, 500);
      }
    }, 800);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, this sends the email to your CRM/Newsletter API
      setEmailSubmitted(true);
    }
  };

  return (
    <>
      <Breadcrumbs />
      <div className="container-x py-12 md:py-20 min-h-screen">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet/10 border border-violet/20 mb-6">
            <span className="text-[11px] uppercase tracking-widest text-violet font-bold">Free Enterprise Tool</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4 text-white">
            Attack Surface Scanner
          </h1>
          <p className="text-lg text-mute">
            Discover what hackers can see. Enter your company domain to generate an instant OSINT vulnerability footprint.
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          {!isScanning && !scanComplete && (
            <div className="glass-card p-8 rounded-2xl border border-line bg-surface/30">
              <form onSubmit={startScan} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">Target Domain</label>
                  <input 
                    type="text"
                    placeholder="e.g., yourcompany.com"
                    value={domain}
                    onChange={e => setDomain(e.target.value.trim().toLowerCase())}
                    className="w-full bg-void border border-line rounded-lg px-4 py-4 text-lg focus:outline-none focus:border-cyan text-white"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary py-4 text-lg w-full">
                  Run Security Audit
                </button>
              </form>
              <p className="text-xs text-mute text-center mt-4">
                By scanning, you agree to our Terms of Service. Authorized scans only.
              </p>
            </div>
          )}

          {isScanning && (
            <div className="glass-card p-8 rounded-2xl border border-cyan/30 bg-black">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-cyan animate-pulse">Scanning {domain}...</h3>
                <span className="text-cyan font-mono">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-void rounded-full h-2 mb-6 border border-line overflow-hidden">
                <div 
                  className="bg-cyan h-2 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              <div className="bg-void border border-line rounded p-4 h-48 overflow-y-auto font-mono text-xs space-y-2">
                {logs.map((log, i) => (
                  <div key={i} className={log.includes('WARNING') || log.includes('Missing') ? 'text-yellow-400' : 'text-emerald-400'}>
                    &gt; {log}
                  </div>
                ))}
                <div className="text-mute animate-pulse">&gt; _</div>
              </div>
            </div>
          )}

          {scanComplete && (
            <div className="glass-card p-0 rounded-2xl border border-line overflow-hidden animate-in fade-in slide-in-from-bottom-4">
              <div className="p-8 bg-surface/30 border-b border-line text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-red-500">!</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Scan Complete</h3>
                <p className="text-mute">
                  We discovered <strong className="text-white">4 subdomains</strong> and <strong className="text-red-400">2 critical warnings</strong> on {domain}.
                </p>
              </div>

              {!emailSubmitted ? (
                <div className="p-8 bg-[#0a0a0f]">
                  <h4 className="text-lg font-bold text-white mb-2 text-center">Unlock Your Full Audit Report</h4>
                  <p className="text-sm text-mute text-center mb-6">
                    Enter your work email to immediately download the 12-page PDF detailing the exact exposed ports, misconfigurations, and remediation steps.
                  </p>
                  
                  <form onSubmit={handleEmailSubmit} className="space-y-4 max-w-sm mx-auto">
                    <input 
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-void border border-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan text-white"
                      required
                    />
                    <button type="submit" className="btn-secondary w-full hover:!border-cyan hover:!text-cyan">
                      Download Free Report
                    </button>
                    <p className="text-[10px] text-mute text-center mt-2">
                      We will never spam you. Unsubscribe at any time.
                    </p>
                  </form>
                </div>
              ) : (
                <div className="p-8 bg-emerald-900/20 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                  <h4 className="text-xl font-bold text-emerald-400 mb-2">Report Sent!</h4>
                  <p className="text-sm text-emerald-100/80 mb-6">
                    Check your inbox at <strong>{email}</strong>. The full threat intelligence report should arrive within 2 minutes.
                  </p>
                  <Link href="/pricing" className="btn-primary text-sm px-6">
                    Upgrade to Continuous Monitoring
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
