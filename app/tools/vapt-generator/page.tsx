'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SectionHeading, Reveal, GlassCard } from '@/components/ui';

export default function VaptReportGenerator() {
  const [domain, setDomain] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportReady, setReportReady] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;
    
    setIsGenerating(true);
    setReportReady(false);
    setProgress(0);

    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setReportReady(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 400);
  };

  return (
    <div className="pt-32 pb-24 container-x min-h-screen">
      <Reveal>
        <SectionHeading
          eyebrow="Enterprise Tools"
          title="VAPT Report Generator"
          description="See exactly what a Vulnerability Assessment and Penetration Testing (VAPT) Executive Summary from Zentrion looks like."
        />
      </Reveal>

      <div className="max-w-3xl mx-auto mt-12">
        {!reportReady ? (
          <GlassCard className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-ink mb-2">Generate Sample Report</h2>
              <p className="text-mute">Enter your organization's domain to generate a simulated executive summary.</p>
            </div>

            <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="e.g., yourcompany.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  disabled={isGenerating}
                  className="w-full bg-surface border border-line rounded-xl px-4 py-4 text-ink placeholder:text-mute focus:outline-none focus:border-cyan disabled:opacity-50"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isGenerating || !domain}
                className="px-8 py-4 bg-cyan text-void font-bold rounded-xl hover:bg-cyan/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isGenerating ? 'Analyzing...' : 'Generate Sample Report'}
              </button>
            </form>

            {isGenerating && (
              <div className="mt-12 space-y-4">
                <div className="flex justify-between text-sm font-mono text-cyan">
                  <span>Simulating Vulnerability Scan</span>
                  <span>{Math.min(progress, 100)}%</span>
                </div>
                <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-xs text-mute font-mono text-center">
                  {progress < 30 ? 'Mapping attack surface...' : progress < 60 ? 'Analyzing TLS/SSL configurations...' : progress < 90 ? 'Simulating OWASP Top 10 exploits...' : 'Compiling executive summary...'}
                </div>
              </div>
            )}
          </GlassCard>
        ) : (
          <Reveal>
            <div className="bg-white text-slate-900 rounded-xl overflow-hidden shadow-2xl print:shadow-none border border-slate-200">
              {/* Report Header */}
              <div className="bg-slate-900 text-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                  <div className="text-cyan font-bold tracking-widest uppercase text-sm mb-4">CONFIDENTIAL</div>
                  <h2 className="text-3xl md:text-4xl font-black mb-2">Executive Summary</h2>
                  <p className="text-slate-400 text-lg">Penetration Testing Report for {domain}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold text-xl mb-1">Zentrion Technologies</div>
                  <div className="text-slate-400 text-sm">Prepared: {new Date().toLocaleDateString()}</div>
                </div>
              </div>

              {/* Report Body */}
              <div className="p-8 md:p-12 space-y-12">
                
                <section>
                  <h3 className="text-xl font-bold border-b-2 border-slate-200 pb-2 mb-4 text-slate-800">1. Assessment Overview</h3>
                  <p className="text-slate-600 leading-relaxed">
                    This is a <strong className="text-slate-900">simulated</strong> sample report demonstrating the depth and quality of Zentrion's VAPT deliverables. In a real engagement for <span className="font-mono bg-slate-100 px-1 rounded">{domain}</span>, our offensive security engineers would manually analyze your attack surface to identify critical vulnerabilities that automated scanners miss.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold border-b-2 border-slate-200 pb-2 mb-6 text-slate-800">2. Simulated Vulnerability Profile</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                      <div className="text-3xl font-black text-red-600">2</div>
                      <div className="text-xs font-bold text-red-800 uppercase">Critical</div>
                    </div>
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                      <div className="text-3xl font-black text-orange-600">5</div>
                      <div className="text-xs font-bold text-orange-800 uppercase">High</div>
                    </div>
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                      <div className="text-3xl font-black text-yellow-600">12</div>
                      <div className="text-xs font-bold text-yellow-800 uppercase">Medium</div>
                    </div>
                    <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4">
                      <div className="text-3xl font-black text-emerald-600">24</div>
                      <div className="text-xs font-bold text-emerald-800 uppercase">Low</div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold border-b-2 border-slate-200 pb-2 mb-4 text-slate-800">3. Key Findings (Sample Data)</h3>
                  <div className="space-y-4">
                    <div className="border border-slate-200 rounded p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-800">SQL Injection (SQLi) in Authentication Portal</h4>
                        <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">CRITICAL</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">An unauthenticated attacker could bypass the login mechanism and dump the entire user database using boolean-based blind SQL injection techniques.</p>
                      <div className="text-xs font-mono text-slate-500 bg-slate-50 p-2 rounded">CVSS: 9.8 (CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H)</div>
                    </div>
                    <div className="border border-slate-200 rounded p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-800">Stored Cross-Site Scripting (XSS)</h4>
                        <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded">HIGH</span>
                      </div>
                      <p className="text-sm text-slate-600">The user profile bio section fails to sanitize HTML input, allowing an attacker to execute malicious JavaScript in the browser of any administrator viewing the profile.</p>
                    </div>
                  </div>
                </section>

                <section className="bg-slate-50 border border-slate-200 p-6 rounded-xl text-center">
                  <h3 className="text-lg font-bold mb-2">Ready for a Real Assessment?</h3>
                  <p className="text-slate-600 mb-6 max-w-lg mx-auto">
                    Don't wait for a data breach to find out what your vulnerabilities are. Secure {domain} today with a professional penetration test from Zentrion.
                  </p>
                  <Link 
                    href="/book-consultation"
                    className="inline-block px-8 py-3 bg-indigo-600 text-white font-bold rounded shadow-lg hover:bg-indigo-700 transition-colors"
                  >
                    Request a Custom Quote
                  </Link>
                </section>

              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button 
                onClick={() => setReportReady(false)}
                className="text-mute hover:text-ink text-sm font-medium transition-colors"
              >
                ← Generate another report
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
