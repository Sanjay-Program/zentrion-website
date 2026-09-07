'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CronGeneratorPage() {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [day, setDay] = useState('*');
  const [month, setMonth] = useState('*');
  const [weekday, setWeekday] = useState('*');
  const [cronExpression, setCronExpression] = useState('* * * * *');

  useEffect(() => {
    setCronExpression(`${minute} ${hour} ${day} ${month} ${weekday}`);
  }, [minute, hour, day, month, weekday]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cronExpression);
  };

  const getHumanReadable = () => {
    // Very basic pseudo human readable translation for common cases
    if (cronExpression === '* * * * *') return "Every minute";
    if (cronExpression === '0 * * * *') return "Every hour, on the hour";
    if (cronExpression === '0 0 * * *') return "Every day at midnight";
    if (cronExpression === '0 0 * * 0') return "Every Sunday at midnight";
    if (cronExpression === '0 0 1 * *') return "Every month on the 1st at midnight";
    if (cronExpression === '0 0 1 1 *') return "Every year on Jan 1st at midnight";
    return "Custom schedule";
  };

  const presets = [
    { label: "Every minute", val: "* * * * *" },
    { label: "Every 5 minutes", val: "*/5 * * * *" },
    { label: "Every 30 minutes", val: "*/30 * * * *" },
    { label: "Every hour", val: "0 * * * *" },
    { label: "Every day at midnight", val: "0 0 * * *" },
    { label: "Every weekday at midnight", val: "0 0 * * 1-5" },
    { label: "Every month", val: "0 0 1 * *" }
  ];

  const handlePreset = (val: string) => {
    const parts = val.split(' ');
    setMinute(parts[0]);
    setHour(parts[1]);
    setDay(parts[2]);
    setMonth(parts[3]);
    setWeekday(parts[4]);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            System Utility
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Cron Schedule Generator</h1>
          <p className="text-xl text-[rgb(var(--c-mute))] max-w-2xl">Build complex cron expressions visually for scheduling recurring tasks.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-10 mb-8">
          
          <div className="flex flex-col items-center justify-center mb-10">
            <div className="text-[rgb(var(--c-mute))] text-sm uppercase tracking-wider font-semibold mb-4">Generated Cron Expression</div>
            
            <div className="relative group bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-xl px-8 py-6 w-full text-center">
              <div className="font-mono text-4xl md:text-5xl font-bold text-[rgb(var(--c-accent))] tracking-widest">{cronExpression}</div>
              <button 
                onClick={copyToClipboard}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all"
                title="Copy Cron Expression"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </button>
            </div>
            <div className="mt-4 text-white font-semibold text-lg">{getHumanReadable()}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">Minute</label>
              <input 
                type="text" 
                value={minute} 
                onChange={(e) => setMinute(e.target.value)}
                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] font-mono text-center"
              />
              <span className="text-[10px] text-[rgb(var(--c-mute))] text-center leading-tight">0-59, *, */n</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">Hour</label>
              <input 
                type="text" 
                value={hour} 
                onChange={(e) => setHour(e.target.value)}
                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] font-mono text-center"
              />
              <span className="text-[10px] text-[rgb(var(--c-mute))] text-center leading-tight">0-23, *, */n</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">Day of Month</label>
              <input 
                type="text" 
                value={day} 
                onChange={(e) => setDay(e.target.value)}
                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] font-mono text-center"
              />
              <span className="text-[10px] text-[rgb(var(--c-mute))] text-center leading-tight">1-31, *, */n</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">Month</label>
              <input 
                type="text" 
                value={month} 
                onChange={(e) => setMonth(e.target.value)}
                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] font-mono text-center"
              />
              <span className="text-[10px] text-[rgb(var(--c-mute))] text-center leading-tight">1-12, *, */n</span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">Day of Week</label>
              <input 
                type="text" 
                value={weekday} 
                onChange={(e) => setWeekday(e.target.value)}
                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] font-mono text-center"
              />
              <span className="text-[10px] text-[rgb(var(--c-mute))] text-center leading-tight">0-6 (Sun-Sat), *</span>
            </div>

          </div>

        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-8">
          <h3 className="text-white font-bold text-lg mb-4">Quick Presets</h3>
          <div className="flex flex-wrap gap-3">
            {presets.map((preset, idx) => (
              <button 
                key={idx}
                onClick={() => handlePreset(preset.val)}
                className="px-4 py-2 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg text-sm text-white transition-all flex flex-col items-start gap-1"
              >
                <span className="font-semibold">{preset.label}</span>
                <span className="font-mono text-[rgb(var(--c-mute))] text-xs">{preset.val}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
