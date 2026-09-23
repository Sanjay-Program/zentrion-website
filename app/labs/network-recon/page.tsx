'use client';

import { useState } from 'react';
import LabLayout from '@/components/LabLayout';
import { useProgress } from '@/lib/hooks/useProgress';

function LabTerminal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['zentrion@lab:~$ Welcome to the Network Recon Lab. Type a command to begin.']);
  const { markLabComplete } = useProgress();

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newOutput = [...output, `zentrion@lab:~$ ${cmd}`];

    if (cmd === 'ping scanme.nmap.org') {
      newOutput.push('PING scanme.nmap.org (45.33.32.156): 56 data bytes');
      newOutput.push('64 bytes from 45.33.32.156: icmp_seq=0 ttl=53 time=23.4 ms');
      newOutput.push('64 bytes from 45.33.32.156: icmp_seq=1 ttl=53 time=24.1 ms');
      newOutput.push('--- scanme.nmap.org ping statistics ---');
      newOutput.push('2 packets transmitted, 2 packets received, 0.0% packet loss');
    } else if (cmd === 'host scanme.nmap.org') {
      newOutput.push('scanme.nmap.org has address 45.33.32.156');
      newOutput.push('scanme.nmap.org has IPv6 address 2600:3c01::f03c:91ff:fe18:bb2f');
    } else if (cmd === 'nmap -sv 45.33.32.156' || cmd === 'nmap 45.33.32.156') {
      newOutput.push('Starting Nmap 7.93 ( https://nmap.org ) at 2026-09-23 12:00 UTC');
      newOutput.push('Nmap scan report for 45.33.32.156');
      newOutput.push('Host is up (0.024s latency).');
      newOutput.push('Not shown: 996 closed tcp ports (reset)');
      newOutput.push('PORT     STATE SERVICE');
      newOutput.push('22/tcp   open  ssh');
      newOutput.push('80/tcp   open  http');
      newOutput.push('9929/tcp open  nping-echo');
      newOutput.push('31337/tcp open Elite');
      newOutput.push('');
      newOutput.push('Nmap done: 1 IP address (1 host up) scanned in 1.42 seconds');
      
      // Complete lab on successful scan
      setTimeout(() => markLabComplete('network-recon'), 1000);
      newOutput.push('\n[SYSTEM] Lab Objective Completed! Progress Saved.');
    } else if (cmd === 'clear') {
      setOutput([]);
      setInput('');
      return;
    } else {
      newOutput.push(`bash: ${cmd.split(' ')[0]}: command not found. Try 'ping', 'host', or 'nmap'`);
    }

    setOutput(newOutput);
    setInput('');
  };

  return (
    <div className="font-mono text-sm">
      <div className="bg-[#111115] border border-line rounded-xl overflow-hidden shadow-2xl">
        <div className="h-8 bg-[#1a1a24] border-b border-line flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-4 text-xs text-mute tracking-widest">TERMINAL</span>
        </div>
        <div className="p-4 h-[400px] overflow-y-auto">
          {output.map((line, i) => (
            <div key={i} className={`mb-1 ${line.startsWith('[SYSTEM]') ? 'text-emerald-400 font-bold' : 'text-[#a5b4fc]'}`}>
              {line}
            </div>
          ))}
          <form onSubmit={handleCommand} className="flex mt-2">
            <span className="text-[#a5b4fc] mr-2">zentrion@lab:~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[#e2e8f0] focus:ring-0 p-0"
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default function NetworkReconLab() {
  const instructions = (
    <>
      <h3 className="text-lg font-semibold text-ink mt-6">Objective 1: DNS Resolution</h3>
      <p>
        The first step in investigating a domain is finding its IP address. We can use the <code>host</code> or <code>ping</code> commands for this.
      </p>
      <div className="bg-void border border-line p-4 rounded-lg my-4 font-mono text-sm text-cyan">
        $ ping scanme.nmap.org<br/>
        $ host scanme.nmap.org
      </div>
      
      <h3 className="text-lg font-semibold text-ink mt-6">Objective 2: Port Scanning</h3>
      <p>
        Once we have the IP address (45.33.32.156), we can scan it to see what services are running. We use <code>nmap</code> for this.
      </p>
      <div className="bg-void border border-line p-4 rounded-lg my-4 font-mono text-sm text-cyan">
        $ nmap 45.33.32.156
      </div>
      
      <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl mt-8">
        <h4 className="text-emerald-400 font-semibold mb-2">Completion Criteria</h4>
        <p className="text-emerald-400/80 text-sm">Successfully run the nmap scan against the target IP address in the terminal to complete this lab.</p>
      </div>
    </>
  );

  return (
    <LabLayout
      title="Network Reconnaissance"
      description="You have been tasked with investigating the domain 'scanme.nmap.org'. Your goal is to find its underlying IP address and discover what services it is exposing to the public internet."
      difficulty="Beginner"
      instructions={instructions}
      interactiveComponent={<LabTerminal />}
    />
  );
}
