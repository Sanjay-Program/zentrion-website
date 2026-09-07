'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ChmodCalculatorPage() {
  const [permissions, setPermissions] = useState({
    owner: { read: true, write: true, execute: true },
    group: { read: true, write: false, execute: true },
    public: { read: true, write: false, execute: true },
  });

  const [octal, setOctal] = useState('755');
  const [symbolic, setSymbolic] = useState('-rwxr-xr-x');

  const calculateFromChecks = (perms: typeof permissions) => {
    let o = 0;
    if (perms.owner.read) o += 4;
    if (perms.owner.write) o += 2;
    if (perms.owner.execute) o += 1;

    let g = 0;
    if (perms.group.read) g += 4;
    if (perms.group.write) g += 2;
    if (perms.group.execute) g += 1;

    let p = 0;
    if (perms.public.read) p += 4;
    if (perms.public.write) p += 2;
    if (perms.public.execute) p += 1;

    const octalStr = `${o}${g}${p}`;
    setOctal(octalStr);

    let sym = '-';
    sym += perms.owner.read ? 'r' : '-';
    sym += perms.owner.write ? 'w' : '-';
    sym += perms.owner.execute ? 'x' : '-';
    
    sym += perms.group.read ? 'r' : '-';
    sym += perms.group.write ? 'w' : '-';
    sym += perms.group.execute ? 'x' : '-';
    
    sym += perms.public.read ? 'r' : '-';
    sym += perms.public.write ? 'w' : '-';
    sym += perms.public.execute ? 'x' : '-';

    setSymbolic(sym);
  };

  const calculateFromOctal = (val: string) => {
    if (!/^[0-7]{3}$/.test(val)) return;

    const o = parseInt(val[0]);
    const g = parseInt(val[1]);
    const p = parseInt(val[2]);

    const newPerms = {
      owner: { read: (o & 4) > 0, write: (o & 2) > 0, execute: (o & 1) > 0 },
      group: { read: (g & 4) > 0, write: (g & 2) > 0, execute: (g & 1) > 0 },
      public: { read: (p & 4) > 0, write: (p & 2) > 0, execute: (p & 1) > 0 },
    };

    setPermissions(newPerms);
  };

  // Initial calc
  useEffect(() => {
    calculateFromChecks(permissions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckboxChange = (role: 'owner' | 'group' | 'public', type: 'read' | 'write' | 'execute') => {
    const newPerms = {
      ...permissions,
      [role]: {
        ...permissions[role],
        [type]: !permissions[role][type]
      }
    };
    setPermissions(newPerms);
    calculateFromChecks(newPerms);
  };

  const handleOctalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-7]/g, '').substring(0, 3);
    setOctal(val);
    if (val.length === 3) {
      calculateFromOctal(val);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            System Utility
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Chmod Calculator</h1>
          <p className="text-xl text-[rgb(var(--c-mute))] max-w-2xl">Calculate Unix file permissions (octal and symbolic) interactively.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Permissions Grid */}
          <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-8">
            <h3 className="text-white font-bold text-xl mb-6">Permissions Grid</h3>
            
            <div className="space-y-6">
              {[
                { id: 'owner', label: 'Owner (User)' },
                { id: 'group', label: 'Group' },
                { id: 'public', label: 'Public (Other)' },
              ].map((role) => (
                <div key={role.id} className="bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.05)] rounded-xl p-4">
                  <div className="text-white font-semibold mb-3">{role.label}</div>
                  <div className="flex gap-4">
                    
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          checked={permissions[role.id as keyof typeof permissions].read} 
                          onChange={() => handleCheckboxChange(role.id as any, 'read')} 
                          className="sr-only" 
                        />
                        <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${permissions[role.id as keyof typeof permissions].read ? 'bg-blue-500 text-white' : 'bg-[rgba(255,255,255,0.1)] text-transparent'}`}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                      </div>
                      <span className="text-[rgb(var(--c-mute))] group-hover:text-white transition-colors text-sm font-medium">Read (4)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          checked={permissions[role.id as keyof typeof permissions].write} 
                          onChange={() => handleCheckboxChange(role.id as any, 'write')} 
                          className="sr-only" 
                        />
                        <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${permissions[role.id as keyof typeof permissions].write ? 'bg-orange-500 text-white' : 'bg-[rgba(255,255,255,0.1)] text-transparent'}`}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                      </div>
                      <span className="text-[rgb(var(--c-mute))] group-hover:text-white transition-colors text-sm font-medium">Write (2)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          checked={permissions[role.id as keyof typeof permissions].execute} 
                          onChange={() => handleCheckboxChange(role.id as any, 'execute')} 
                          className="sr-only" 
                        />
                        <div className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${permissions[role.id as keyof typeof permissions].execute ? 'bg-green-500 text-white' : 'bg-[rgba(255,255,255,0.1)] text-transparent'}`}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                      </div>
                      <span className="text-[rgb(var(--c-mute))] group-hover:text-white transition-colors text-sm font-medium">Execute (1)</span>
                    </label>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between">
            
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Octal Value</label>
                <div className="relative group">
                  <input
                    type="text"
                    value={octal}
                    onChange={handleOctalChange}
                    maxLength={3}
                    className="w-full px-6 py-5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[rgb(var(--c-accent))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono text-3xl font-bold tracking-widest"
                  />
                  <button onClick={() => copyToClipboard(octal)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Symbolic Notation</label>
                <div className="relative group bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl px-6 py-5 flex items-center justify-between">
                  <div className="font-mono text-3xl font-bold text-white tracking-widest">{symbolic}</div>
                  <button onClick={() => copyToClipboard(symbolic)} className="p-2 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[rgba(255,255,255,0.05)]">
              <label className="block text-sm font-semibold text-white mb-3">Example Usage</label>
              <div className="flex gap-2 mb-2">
                <code className="flex-grow p-3 bg-black/50 border border-[rgba(255,255,255,0.1)] rounded text-[rgb(var(--c-accent))] font-mono text-sm">
                  chmod {octal} file.txt
                </code>
                <button onClick={() => copyToClipboard(`chmod ${octal} file.txt`)} className="px-3 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] rounded text-white transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
