'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UnixTimestampPage() {
  const [timestampStr, setTimestampStr] = useState('');
  const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  
  // Results
  const [convertedDate, setConvertedDate] = useState<Date | null>(null);
  const [convertedTimestamp, setConvertedTimestamp] = useState<number | null>(null);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Parse Unix to Date
  useEffect(() => {
    if (!timestampStr) {
      setConvertedDate(null);
      return;
    }
    
    const num = parseInt(timestampStr, 10);
    if (isNaN(num)) {
      setConvertedDate(null);
      return;
    }

    // Guess if it's seconds or milliseconds
    // 10 digits is seconds (until year 2286). 13 digits is milliseconds.
    if (timestampStr.length >= 13) {
      setConvertedDate(new Date(num));
    } else {
      setConvertedDate(new Date(num * 1000));
    }
  }, [timestampStr]);

  // Parse Date string back to Unix
  useEffect(() => {
    if (!dateInput) {
      setConvertedTimestamp(null);
      return;
    }

    try {
      // Create date object from local input string (YYYY-MM-DDTHH:MM)
      const dateString = timeInput ? `${dateInput}T${timeInput}` : `${dateInput}T00:00:00`;
      const date = new Date(dateString);
      
      if (!isNaN(date.getTime())) {
        setConvertedTimestamp(Math.floor(date.getTime() / 1000));
      } else {
        setConvertedTimestamp(null);
      }
    } catch (e) {
      setConvertedTimestamp(null);
    }
  }, [dateInput, timeInput]);

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Developer Utility
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Unix Timestamp Converter</h1>
            <p className="text-xl text-[rgb(var(--c-mute))]">Convert Epoch time to human-readable dates and vice-versa instantly.</p>
          </div>
          
          <div className="glass-card rounded-xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md px-6 py-4 flex flex-col items-center justify-center min-w-[250px]">
             <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Current Epoch Time</div>
             <div className="font-mono text-3xl font-bold text-[rgb(var(--c-accent))]">{currentTimestamp}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Unix to Date */}
          <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between min-h-[400px]">
            <div>
              <h3 className="text-[rgb(var(--c-ink))] font-bold text-xl mb-6">Unix to Date</h3>
              <label className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-2">Timestamp (Seconds or MS)</label>
              <input
                type="number"
                value={timestampStr}
                onChange={(e) => setTimestampStr(e.target.value)}
                placeholder="e.g. 1672531200"
                className="w-full px-4 py-3 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono text-lg mb-8"
              />
            </div>
            
            <div className="space-y-4">
              <div className="bg-[rgba(0,0,0,0.2)] border border-[var(--c-glass-border)] rounded-xl p-4">
                <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Local Time</div>
                <div className="text-[rgb(var(--c-ink))] font-bold text-lg">
                  {convertedDate ? convertedDate.toLocaleString() : '-'}
                </div>
              </div>
              <div className="bg-[rgba(0,0,0,0.2)] border border-[var(--c-glass-border)] rounded-xl p-4">
                <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">UTC / GMT Time</div>
                <div className="text-[rgb(var(--c-ink))] font-bold text-lg">
                  {convertedDate ? convertedDate.toUTCString() : '-'}
                </div>
              </div>
              <div className="bg-[rgba(0,0,0,0.2)] border border-[var(--c-glass-border)] rounded-xl p-4 flex justify-between items-center group">
                <div>
                  <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">ISO 8601 String</div>
                  <div className="font-mono text-[rgb(var(--c-accent))]">
                    {convertedDate ? convertedDate.toISOString() : '-'}
                  </div>
                </div>
                {convertedDate && (
                  <button onClick={() => copyToClipboard(convertedDate.toISOString())} className="text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-ink))] opacity-0 group-hover:opacity-100 transition-opacity"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
                )}
              </div>
            </div>
          </div>

          {/* Date to Unix */}
          <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between min-h-[400px]">
            <div>
              <h3 className="text-[rgb(var(--c-ink))] font-bold text-xl mb-6">Date to Unix</h3>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-grow">
                  <label className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-2">Local Date</label>
                  <input
                    type="date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
                  />
                </div>
                <div className="sm:w-1/3">
                  <label className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-2">Local Time</label>
                  <input
                    type="time"
                    value={timeInput}
                    onChange={(e) => setTimeInput(e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-[rgba(0,0,0,0.2)] border border-[var(--c-glass-border)] rounded-xl p-6 flex flex-col items-center justify-center h-48 relative group">
                <div className="text-[rgb(var(--c-mute))] text-sm uppercase tracking-wider font-semibold mb-2">Unix Timestamp (Seconds)</div>
                <div className="font-mono text-5xl font-bold text-[rgb(var(--c-ink))] break-all">
                  {convertedTimestamp !== null ? convertedTimestamp : '-'}
                </div>
                
                {convertedTimestamp !== null && (
                  <button
                    onClick={() => copyToClipboard(convertedTimestamp.toString())}
                    className="absolute bottom-4 right-4 p-2 text-[rgb(var(--c-mute))] hover:text-white bg-[rgba(255,255,255,0.05)] rounded-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                    title="Copy Timestamp"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
