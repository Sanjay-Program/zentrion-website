'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type Permission = 'read' | 'write' | 'execute';
type Entity = 'owner' | 'group' | 'public';

interface PermissionsState {
  owner: { read: boolean; write: boolean; execute: boolean };
  group: { read: boolean; write: boolean; execute: boolean };
  public: { read: boolean; write: boolean; execute: boolean };
}

export default function ChmodCalculatorPage() {
  const [perms, setPerms] = useState<PermissionsState>({
    owner: { read: true, write: true, execute: true },
    group: { read: true, write: false, execute: true },
    public: { read: true, write: false, execute: true },
  });

  const [octal, setOctal] = useState('755');
  const [symbolic, setSymbolic] = useState('-rwxr-xr-x');

  const calcOctalValue = (p: { read: boolean; write: boolean; execute: boolean }) => {
    let val = 0;
    if (p.read) val += 4;
    if (p.write) val += 2;
    if (p.execute) val += 1;
    return val;
  };

  const calcSymbolicValue = (p: { read: boolean; write: boolean; execute: boolean }) => {
    let str = '';
    str += p.read ? 'r' : '-';
    str += p.write ? 'w' : '-';
    str += p.execute ? 'x' : '-';
    return str;
  };

  // Update octal and symbolic when perms change
  useEffect(() => {
    const o = calcOctalValue(perms.owner);
    const g = calcOctalValue(perms.group);
    const p = calcOctalValue(perms.public);
    setOctal(`${o}${g}${p}`);
    setSymbolic(`-${calcSymbolicValue(perms.owner)}${calcSymbolicValue(perms.group)}${calcSymbolicValue(perms.public)}`);
  }, [perms]);

  const togglePerm = (entity: Entity, perm: Permission) => {
    setPerms(prev => ({
      ...prev,
      [entity]: {
        ...prev[entity],
        [perm]: !prev[entity][perm]
      }
    }));
  };

  const handleOctalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-7]/g, '').slice(0, 3);
    setOctal(val);
    
    if (val.length === 3) {
      const parseOctal = (digit: string) => {
        const d = parseInt(digit, 10);
        return {
          read: (d & 4) === 4,
          write: (d & 2) === 2,
          execute: (d & 1) === 1,
        };
      };
      setPerms({
        owner: parseOctal(val[0]),
        group: parseOctal(val[1]),
        public: parseOctal(val[2]),
      });
    }
  };

  const PermissionGroup = ({ entity, title }: { entity: Entity, title: string }) => (
    <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6">
      <h3 className="text-white font-display font-semibold mb-6 flex items-center justify-between">
        {title}
        <span className="text-[rgb(var(--c-accent))] font-mono text-xl">{calcOctalValue(perms[entity])}</span>
      </h3>
      
      <div className="space-y-4">
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-[rgb(var(--c-mute))] group-hover:text-white transition-colors">Read (4)</span>
          <div className="relative">
            <input 
              type="checkbox" 
              checked={perms[entity].read} 
              onChange={() => togglePerm(entity, 'read')}
              className="sr-only" 
            />
            <div className={`block w-12 h-7 rounded-full transition-colors ${perms[entity].read ? 'bg-green-500' : 'bg-[rgba(255,255,255,0.1)]'}`}></div>
            <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${perms[entity].read ? 'translate-x-5' : ''}`}></div>
          </div>
        </label>
        
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-[rgb(var(--c-mute))] group-hover:text-white transition-colors">Write (2)</span>
          <div className="relative">
            <input 
              type="checkbox" 
              checked={perms[entity].write} 
              onChange={() => togglePerm(entity, 'write')}
              className="sr-only" 
            />
            <div className={`block w-12 h-7 rounded-full transition-colors ${perms[entity].write ? 'bg-yellow-500' : 'bg-[rgba(255,255,255,0.1)]'}`}></div>
            <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${perms[entity].write ? 'translate-x-5' : ''}`}></div>
          </div>
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-[rgb(var(--c-mute))] group-hover:text-white transition-colors">Execute (1)</span>
          <div className="relative">
            <input 
              type="checkbox" 
              checked={perms[entity].execute} 
              onChange={() => togglePerm(entity, 'execute')}
              className="sr-only" 
            />
            <div className={`block w-12 h-7 rounded-full transition-colors ${perms[entity].execute ? 'bg-red-500' : 'bg-[rgba(255,255,255,0.1)]'}`}></div>
            <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${perms[entity].execute ? 'translate-x-5' : ''}`}></div>
          </div>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Chmod Calculator</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Visual calculator for Unix file and folder permissions (rwx).</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <PermissionGroup entity="owner" title="Owner (u)" />
          <PermissionGroup entity="group" title="Group (g)" />
          <PermissionGroup entity="public" title="Public (o)" />
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-[rgb(var(--c-mute))] uppercase tracking-widest font-semibold mb-3">Octal Notation</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-mono text-[rgb(var(--c-mute))] opacity-50">chmod</span>
                  <input
                    type="text"
                    value={octal}
                    onChange={handleOctalChange}
                    className="w-full pl-28 pr-6 py-4 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-xl text-4xl text-[rgb(var(--c-accent))] font-bold font-mono focus:outline-none focus:border-[rgb(var(--c-accent))] transition-all tracking-widest"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[rgb(var(--c-mute))] uppercase tracking-widest font-semibold mb-3">Symbolic Notation</label>
                <div className="w-full px-6 py-5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl text-3xl text-white font-mono tracking-widest">
                  {symbolic}
                </div>
              </div>
            </div>

            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-8 h-full flex flex-col justify-center">
              <h3 className="text-lg font-bold text-white mb-4">Command Preview</h3>
              <div className="bg-black/50 border border-white/10 rounded-lg p-4 font-mono text-sm text-green-400 mb-6 break-all">
                $ chmod {octal.length === 3 ? octal : '000'} filename.txt
              </div>
              
              <div className="space-y-3 text-sm text-[rgb(var(--c-mute))]">
                <p className="flex justify-between">
                  <span>Owner (User)</span>
                  <span className="text-white font-mono">{calcSymbolicValue(perms.owner)}</span>
                </p>
                <p className="flex justify-between border-t border-white/5 pt-3">
                  <span>Group</span>
                  <span className="text-white font-mono">{calcSymbolicValue(perms.group)}</span>
                </p>
                <p className="flex justify-between border-t border-white/5 pt-3">
                  <span>Public (Others)</span>
                  <span className="text-white font-mono">{calcSymbolicValue(perms.public)}</span>
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
