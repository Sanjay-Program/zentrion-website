'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SpeedTestPage() {
  const [status, setStatus] = useState<'idle' | 'pinging' | 'downloading' | 'uploading' | 'complete'>('idle');
  const [ping, setPing] = useState<number | null>(null);
  const [downloadSpeed, setDownloadSpeed] = useState<number>(0);
  const [uploadSpeed, setUploadSpeed] = useState<number>(0);
  const [networkInfo, setNetworkInfo] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  // Fetch Network Info instantly
  useEffect(() => {
    fetch('/api/network/what-is-my-ip')
      .then(res => res.json())
      .then(data => {
        if (data.success) setNetworkInfo(data);
      })
      .catch(() => {});
  }, []);

  const runTest = async () => {
    setStatus('pinging');
    setPing(null);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setProgress(0);

    // 1. Ping Test
    let pings = [];
    for (let i = 0; i < 3; i++) {
      const start = performance.now();
      await fetch('/api/network/what-is-my-ip', { method: 'HEAD', cache: 'no-store' }).catch(() => {});
      pings.push(performance.now() - start);
    }
    const avgPing = Math.round(pings.reduce((a, b) => a + b, 0) / pings.length);
    setPing(avgPing);

    // 2. Download Test
    setStatus('downloading');
    setProgress(0);
    try {
      const dlStart = performance.now();
      const res = await fetch('/api/network/speedtest-download?size=15'); // 15MB test
      const reader = res.body?.getReader();
      const contentLength = parseInt(res.headers.get('Content-Length') || '15728640', 10);
      
      let receivedLength = 0;
      let lastReportTime = dlStart;

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          receivedLength += value.length;
          const now = performance.now();
          const elapsed = (now - dlStart) / 1000; // seconds
          
          if (now - lastReportTime > 100) { // Update UI every 100ms
            const speedBps = receivedLength / elapsed;
            const speedMbps = (speedBps * 8) / 1000000;
            setDownloadSpeed(parseFloat(speedMbps.toFixed(2)));
            setProgress((receivedLength / contentLength) * 100);
            lastReportTime = now;
          }
        }
      }
      
      const dlEnd = performance.now();
      const finalDlSpeed = ((contentLength / ((dlEnd - dlStart) / 1000)) * 8) / 1000000;
      setDownloadSpeed(parseFloat(finalDlSpeed.toFixed(2)));
    } catch (e) {
      console.error('Download test failed', e);
    }

    // 3. Upload Test
    setStatus('uploading');
    setProgress(0);
    try {
      const uploadSize = 5 * 1024 * 1024; // 5MB
      const uploadData = new Uint8Array(uploadSize);
      // Fill in chunks to avoid crypto.getRandomValues size limits (65536 bytes)
      const chunk = new Uint8Array(65536);
      crypto.getRandomValues(chunk);
      for (let i = 0; i < uploadSize; i += 65536) {
        uploadData.set(chunk.subarray(0, Math.min(65536, uploadSize - i)), i);
      }
      
      const ulStart = performance.now();
      
      // We can't stream upload progress perfectly in fetch, so we measure total time
      await fetch('/api/network/speedtest-upload', {
        method: 'POST',
        body: uploadData,
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      });
      
      const ulEnd = performance.now();
      const ulElapsed = (ulEnd - ulStart) / 1000;
      const finalUlSpeed = ((uploadSize / ulElapsed) * 8) / 1000000;
      setUploadSpeed(parseFloat(finalUlSpeed.toFixed(2)));
      setProgress(100);
    } catch (e) {
      console.error('Upload test failed', e);
    }

    setStatus('complete');
  };

  const getStatusText = () => {
    switch(status) {
      case 'idle': return 'Ready';
      case 'pinging': return 'Measuring Latency...';
      case 'downloading': return 'Testing Download...';
      case 'uploading': return 'Testing Upload...';
      case 'complete': return 'Test Complete';
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Advanced Speed Test</h1>
          <p className="text-xl text-[rgb(var(--c-mute))] max-w-2xl mx-auto">
            Measure your true internet backbone speed, latency, and active provider intelligence directly from the Cloudflare Edge network.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Speedometer / Controls */}
          <div className="lg:col-span-2 glass-card rounded-3xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
            
            {/* Background glowing orb that changes based on status */}
            <motion.div 
              animate={{ 
                scale: status === 'idle' || status === 'complete' ? 1 : 1.2,
                opacity: status === 'idle' ? 0.1 : 0.3,
                backgroundColor: status === 'complete' ? '#10b981' : (status !== 'idle' ? '#2f6bff' : '#ffffff')
              }}
              transition={{ duration: 1, repeat: status === 'downloading' || status === 'uploading' ? Infinity : 0, repeatType: 'reverse' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px] -z-10"
            />

            <div className="mb-8 h-8 text-[rgb(var(--c-mute))] uppercase tracking-widest font-bold text-sm">
              {getStatusText()}
            </div>

            <div className="flex items-end justify-center gap-4 mb-12">
              <motion.div 
                key={status === 'downloading' ? downloadSpeed : uploadSpeed}
                initial={{ opacity: 0.5, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-7xl md:text-9xl font-bold font-mono tracking-tighter"
              >
                {status === 'idle' ? '0' : (status === 'uploading' || status === 'complete' ? uploadSpeed : downloadSpeed)}
              </motion.div>
              <div className="text-2xl font-bold text-[rgb(var(--c-mute))] pb-3">Mbps</div>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden mb-12 relative">
               <motion.div 
                 className="absolute top-0 left-0 h-full bg-[rgb(var(--c-accent))] rounded-full"
                 initial={{ width: '0%' }}
                 animate={{ width: `${status === 'complete' ? 100 : progress}%` }}
                 transition={{ ease: "linear", duration: 0.2 }}
               />
            </div>

            <button
              onClick={runTest}
              disabled={status !== 'idle' && status !== 'complete'}
              className="px-12 py-5 bg-white text-black font-bold text-xl rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              {status === 'idle' ? 'Start Test' : status === 'complete' ? 'Test Again' : 'Testing...'}
            </button>
          </div>

          {/* Stats Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] p-6">
              <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download
              </div>
              <div className="text-3xl font-bold font-mono">{downloadSpeed > 0 ? downloadSpeed : '--'} <span className="text-sm text-[rgb(var(--c-mute))]">Mbps</span></div>
            </div>

            <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] p-6">
              <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                Upload
              </div>
              <div className="text-3xl font-bold font-mono">{uploadSpeed > 0 ? uploadSpeed : '--'} <span className="text-sm text-[rgb(var(--c-mute))]">Mbps</span></div>
            </div>

            <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] p-6">
              <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Ping
              </div>
              <div className="text-3xl font-bold font-mono">{ping !== null ? ping : '--'} <span className="text-sm text-[rgb(var(--c-mute))]">ms</span></div>
            </div>

            {networkInfo && (
              <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] p-6 mt-auto">
                <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-bold mb-4">Network Provider</div>
                <div className="space-y-3">
                  <div>
                    <div className="text-[rgb(var(--c-mute))] text-xs mb-1">ISP / Carrier</div>
                    <div className="font-medium truncate" title={networkInfo.org}>{networkInfo.org}</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="text-[rgb(var(--c-mute))] text-xs mb-1">Server</div>
                      <div className="font-medium">{networkInfo.loc}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-[rgb(var(--c-mute))] text-xs mb-1">IP</div>
                      <div className="font-medium font-mono text-sm truncate" title={networkInfo.ip}>{networkInfo.ip}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
