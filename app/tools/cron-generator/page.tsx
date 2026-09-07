'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CronGeneratorPage() {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [dayOfMonth, setDayOfMonth] = useState('*');
  const [month, setMonth] = useState('*');
  const [dayOfWeek, setDayOfWeek] = useState('*');

  const [cronExpression, setCronExpression] = useState('* * * * *');

  useEffect(() => {
    setCronExpression(`${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`);
  }, [minute, hour, dayOfMonth, month, dayOfWeek]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cronExpression);
  };

  const explainCron = () => {
    // Very basic explanation logic for visual feedback
    const expMin = minute === '*' ? 'every minute' : minute === '*/5' ? 'every 5 minutes' : `at minute ${minute}`;
    const expHour = hour === '*' ? 'past every hour' : `past hour ${hour}`;
    const expDom = dayOfMonth === '*' ? '' : `on day-of-month ${dayOfMonth}`;
    const expMonth = month === '*' ? '' : `in month ${month}`;
    const expDow = dayOfWeek === '*' ? '' : `and on day-of-week ${dayOfWeek}`;
    
    let explanation = `Runs ${expMin} ${expHour} ${expDom} ${expMonth} ${expDow}`.replace(/\s+/g, ' ').trim();
    if (explanation === 'Runs every minute past every hour') return 'Runs every minute.';
    return explanation + '.';
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            System Administration
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Crontab Generator</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Interactively build and understand Cron scheduling syntax for Linux and CI/CD pipelines.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
          
          <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] p-6 flex flex-col">
            <label className="text-sm font-bold text-white mb-1">Minute</label>
            <span className="text-xs text-[rgb(var(--c-mute))] mb-4">0-59</span>
            <select 
              value={minute} 
              onChange={(e) => setMinute(e.target.value)}
              className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] text-white rounded-lg px-3 py-2 outline-none focus:border-[rgb(var(--c-accent))] font-mono"
            >
              <option value="*">* (Every minute)</option>
              <option value="*/2">*/2 (Every 2 minutes)</option>
              <option value="*/5">*/5 (Every 5 minutes)</option>
              <option value="*/15">*/15 (Every 15 minutes)</option>
              <option value="*/30">*/30 (Every 30 minutes)</option>
              <option value="0">0 (Top of the hour)</option>
              <option value="15">15 (Quarter past)</option>
              <option value="30">30 (Half past)</option>
              <option value="45">45 (Quarter to)</option>
            </select>
          </div>

          <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] p-6 flex flex-col">
            <label className="text-sm font-bold text-white mb-1">Hour</label>
            <span className="text-xs text-[rgb(var(--c-mute))] mb-4">0-23</span>
            <select 
              value={hour} 
              onChange={(e) => setHour(e.target.value)}
              className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] text-white rounded-lg px-3 py-2 outline-none focus:border-[rgb(var(--c-accent))] font-mono"
            >
              <option value="*">* (Every hour)</option>
              <option value="*/2">*/2 (Every 2 hours)</option>
              <option value="*/4">*/4 (Every 4 hours)</option>
              <option value="0">0 (Midnight)</option>
              <option value="12">12 (Noon)</option>
              <option value="9-17">9-17 (Business hours)</option>
            </select>
          </div>

          <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] p-6 flex flex-col">
            <label className="text-sm font-bold text-white mb-1">Day of Month</label>
            <span className="text-xs text-[rgb(var(--c-mute))] mb-4">1-31</span>
            <select 
              value={dayOfMonth} 
              onChange={(e) => setDayOfMonth(e.target.value)}
              className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] text-white rounded-lg px-3 py-2 outline-none focus:border-[rgb(var(--c-accent))] font-mono"
            >
              <option value="*">* (Every day)</option>
              <option value="1">1 (1st of month)</option>
              <option value="15">15 (15th of month)</option>
              <option value="1-15">1-15 (First half)</option>
            </select>
          </div>

          <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] p-6 flex flex-col">
            <label className="text-sm font-bold text-white mb-1">Month</label>
            <span className="text-xs text-[rgb(var(--c-mute))] mb-4">1-12</span>
            <select 
              value={month} 
              onChange={(e) => setMonth(e.target.value)}
              className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] text-white rounded-lg px-3 py-2 outline-none focus:border-[rgb(var(--c-accent))] font-mono"
            >
              <option value="*">* (Every month)</option>
              <option value="1">1 (January)</option>
              <option value="6">6 (June)</option>
              <option value="12">12 (December)</option>
              <option value="1-3">1-3 (Q1)</option>
              <option value="*/3">*/3 (Quarterly)</option>
            </select>
          </div>

          <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] p-6 flex flex-col">
            <label className="text-sm font-bold text-white mb-1">Day of Week</label>
            <span className="text-xs text-[rgb(var(--c-mute))] mb-4">0-6 (0=Sun)</span>
            <select 
              value={dayOfWeek} 
              onChange={(e) => setDayOfWeek(e.target.value)}
              className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] text-white rounded-lg px-3 py-2 outline-none focus:border-[rgb(var(--c-accent))] font-mono"
            >
              <option value="*">* (Every day)</option>
              <option value="1-5">1-5 (Weekdays)</option>
              <option value="0,6">0,6 (Weekends)</option>
              <option value="1">1 (Monday)</option>
              <option value="5">5 (Friday)</option>
            </select>
          </div>

        </div>

        {/* Output Section */}
        <div className="glass-card rounded-3xl border border-[rgba(255,255,255,0.2)] bg-[rgba(20,20,20,0.6)] backdrop-blur-xl p-8 sm:p-12 text-center relative shadow-[0_0_50px_rgba(0,0,0,0.3)]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))] font-bold rounded-full text-sm uppercase tracking-widest shadow-lg">
            Cron Expression
          </div>
          
          <div className="font-mono text-5xl sm:text-7xl font-bold text-white tracking-widest my-8">
            {cronExpression}
          </div>

          <div className="text-[rgb(var(--c-accent))] text-lg font-bold bg-[rgba(255,255,255,0.05)] inline-block px-6 py-3 rounded-xl border border-[rgba(255,255,255,0.1)] mb-8">
            &ldquo;{explainCron()}&rdquo;
          </div>

          <div>
            <button
              onClick={copyToClipboard}
              className="btn-primary py-3 px-8 whitespace-nowrap inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              Copy Expression
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
