'use client';

import React, { useState, useEffect } from 'react';
import { LabLayout } from '@/components/LabLayout';
import { GlassCard } from '@/components/ui';
import { gun } from '@/lib/gun';
import { Terminal } from '@/components/Terminal';

interface LogEntry {
  id: string;
  timestamp: number;
  ip: string;
  action: string;
}

export default function LabClient() {
  const [role, setRole] = useState<'none' | 'red' | 'blue'>('none');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isFirewallActive, setIsFirewallActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!gun) return;
    const db = gun.get('zentrion-rvb-lab-logs');
    
    // Subscribe to live logs
    db.map().on((data: LogEntry) => {
      if (data && data.id) {
        setLogs(prev => {
          if (prev.find(l => l.id === data.id)) return prev;
          return [...prev, data].sort((a, b) => b.timestamp - a.timestamp).slice(0, 50);
        });
      }
    });

    const fwDb = gun.get('zentrion-rvb-lab-fw');
    fwDb.on((data) => {
      if (data && typeof data.active === 'boolean') {
        setIsFirewallActive(data.active);
      }
    });

    return () => {
      db.map().off();
      fwDb.off();
    };
  }, []);

  const sendAttack = (cmd: string) => {
    if (isFirewallActive) return 'ERROR: Connection reset by peer (Blocked by Firewall)';
    
    if (!gun) return 'Network error';
    
    const db = gun.get('zentrion-rvb-lab-logs');
    const id = Date.now().toString() + Math.random().toString();
    const entry: LogEntry = {
      id,
      timestamp: Date.now(),
      ip: '192.168.1.104',
      action: `Executed: ${cmd}`
    };
    db.get(id).put(entry);

    if (cmd.includes('nmap')) {
      return 'Starting Nmap... \nDiscovered open port 80/tcp (http)\nDiscovered open port 443/tcp (https)';
    }
    if (cmd.includes('sqlmap')) {
      return 'sqlmap identified injection point. Extracting database...';
    }
    return `bash: ${cmd}: command not found`;
  };

  const blockIp = (ip: string) => {
    if (ip === '192.168.1.104') {
      if (gun) gun.get('zentrion-rvb-lab-fw').put({ active: true });
      return `Firewall rule applied. Traffic from ${ip} is now dropped.`;
    }
    return 'Invalid IP address or IP not found in active threats.';
  };

  if (!mounted) return null;

  return (
    <LabLayout
      labId="red-vs-blue"
      xpReward={500}
      title="Multiplayer: Red vs Blue"
      category="Co-op Simulation"
      difficulty="Advanced"
      objective="Work together (or against each other) in real-time. Red team attacks, Blue team analyzes logs and blocks the attack."
      scope="P2P Gun.js Network"
      target="10.0.0.5 (Corporate DB)"
      hints={[
        "Open this page in two different browser windows or send the link to a friend.",
        "One person chooses Red, the other Blue.",
        "The Red team's commands will instantly appear in the Blue team's log feed.",
        "Blue team must use the block command to stop Red team."
      ]}
      flag={isFirewallActive ? "ZENTRION{p2p_f1r3w4ll_d3pl0y3d}" : "Awaiting Blue Team to block the attack..."}
      explanation={
        <>
          <p className="mb-4">
            This lab uses <strong>Gun.js</strong>, a decentralized peer-to-peer database. 
          </p>
          <p>
            The Red Team's terminal executes commands which are synced over WebRTC/WebSockets directly to the Blue Team's browser in real-time. There is no central server processing these logs!
          </p>
        </>
      }
      remediation={
        <p>
          In a real enterprise, a SIEM (Security Information and Event Management) system centralizes logs so SOC analysts can detect patterns (like repeated nmap scans) and update firewall ACLs.
        </p>
      }
    >
      <div className="space-y-6">
        {role === 'none' ? (
          <GlassCard className="p-12 text-center">
            <h2 className="text-2xl font-bold mb-8">Select Your Role</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <button onClick={() => setRole('red')} className="p-8 rounded-xl border-2 border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-colors group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">⚔️</div>
                <h3 className="font-bold text-red-400 text-xl mb-2">Red Team</h3>
                <p className="text-sm text-red-200/70">Execute attacks and try to breach the system.</p>
              </button>
              <button onClick={() => setRole('blue')} className="p-8 rounded-xl border-2 border-cyan/30 bg-cyan/10 hover:bg-cyan/20 transition-colors group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🛡️</div>
                <h3 className="font-bold text-cyan text-xl mb-2">Blue Team</h3>
                <p className="text-sm text-cyan/70">Monitor live P2P logs and deploy countermeasures.</p>
              </button>
            </div>
          </GlassCard>
        ) : role === 'red' ? (
          <GlassCard className="p-0 overflow-hidden border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
            <div className="bg-red-500/20 p-3 border-b border-red-500/30 flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">Attacker Terminal (Live P2P)</span>
              {isFirewallActive && <span className="text-xs font-bold bg-red-500 px-2 py-1 rounded text-white animate-pulse">CONNECTION BLOCKED</span>}
            </div>
            <Terminal 
              prompt="root@kali"
              welcomeMessage="Kali Linux v2026.1\nTry 'nmap -sV 10.0.0.5' or 'sqlmap -u http://10.0.0.5/login'"
              commandMap={{
                'nmap': (args) => sendAttack(`nmap ${args.slice(1).join(' ')}`),
                'sqlmap': (args) => sendAttack(`sqlmap ${args.slice(1).join(' ')}`)
              }}
              className="crt-terminal !h-[400px] border-none"
            />
          </GlassCard>
        ) : (
          <div className="grid md:grid-cols-[1fr,300px] gap-6">
            <GlassCard className="p-0 overflow-hidden border-cyan/30 shadow-[0_0_30px_rgba(0,212,255,0.1)]">
              <div className="bg-cyan/20 p-3 border-b border-cyan/30 flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan">SOC Dashboard (Live Feed)</span>
              </div>
              <div className="bg-[#0a0a0a] h-[400px] p-4 overflow-y-auto font-mono text-xs crt-terminal">
                {logs.length === 0 ? (
                  <div className="text-mute italic">Awaiting network activity...</div>
                ) : (
                  logs.map(log => (
                    <div key={log.id} className="mb-2 text-gray-300">
                      <span className="text-mute">[{new Date(log.timestamp).toLocaleTimeString()}]</span>{' '}
                      <span className="text-yellow-400">SRC: {log.ip}</span>{' '}
                      <span className="text-cyan">=&gt;</span>{' '}
                      <span className="text-red-400">{log.action}</span>
                    </div>
                  ))
                )}
              </div>
            </GlassCard>

            <GlassCard className="p-0 overflow-hidden border-emerald-500/30">
               <div className="bg-emerald-500/20 p-3 border-b border-emerald-500/30">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Firewall Config</span>
              </div>
              <Terminal 
                prompt="admin@fw01"
                welcomeMessage="Zentrion OS Firewall\nType 'block <ip>' to drop traffic."
                commandMap={{
                  'block': (args) => blockIp(args[1] || '')
                }}
                className="!h-[360px] border-none"
              />
            </GlassCard>
          </div>
        )}
      </div>
    </LabLayout>
  );
}
