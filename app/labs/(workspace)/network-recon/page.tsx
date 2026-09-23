'use client';

import { useState } from 'react';
import LabWorkspace from '@/components/LabWorkspace';
import { useProgress } from '@/lib/hooks/useProgress';

export default function NetworkReconLab() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['zentrion@lab:~$ Welcome to the Network Recon Lab. Type a command to begin.']);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const { markLabComplete } = useProgress();

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const cmdLine = input.trim().toLowerCase();
    const args = cmdLine.split(' ').filter(Boolean);
    const cmd = args[0];
    const target = args[args.length - 1]; // Assume last arg is target for simplicity

    const newOutput = [...output, `zentrion@lab:~$ ${cmdLine}`];
    setOutput(newOutput);
    setInput('');
    setIsProcessing(true);

    try {
      if (cmd === 'ping') {
        newOutput.push(`PING ${target}: 56 data bytes`);
        newOutput.push(`64 bytes from ${target}: icmp_seq=0 ttl=53 time=23.4 ms`);
        newOutput.push(`64 bytes from ${target}: icmp_seq=1 ttl=53 time=24.1 ms`);
        newOutput.push(`--- ${target} ping statistics ---`);
        newOutput.push(`2 packets transmitted, 2 packets received, 0.0% packet loss`);
      } else if (cmd === 'host') {
        newOutput.push(`Querying DNS for ${target}...`);
        setOutput([...newOutput]);
        
        try {
          const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.hackertarget.com/dnslookup/?q=${target}`)}`);
          if (res.ok) {
            const data = await res.text();
            const lines = data.split('\n').filter(Boolean);
            newOutput.push(...lines);
          } else {
            newOutput.push('Error fetching DNS records. Rate limit may be exceeded.');
          }
        } catch (err) {
          newOutput.push('Network error trying to reach external DNS API.');
        }
      } else if (cmd === 'nmap') {
        newOutput.push(`Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toISOString()}`);
        newOutput.push(`Initiating Ping Scan at ${new Date().toLocaleTimeString()}`);
        setOutput([...newOutput]);

        setIsProcessing(true);
        setTimeout(() => {
          newOutput.push(`Scanning ${target} [1000 ports]`);
          newOutput.push(`Discovered open port 80/tcp on ${target}`);
          newOutput.push(`Discovered open port 22/tcp on ${target}`);
          setOutput([...newOutput]);
          
          setTimeout(() => {
            newOutput.push(`Completed SYN Stealth Scan at ${new Date().toLocaleTimeString()}, 1000 total ports`);
            newOutput.push(`Nmap scan report for ${target}`);
            newOutput.push(`Host is up (0.024s latency).`);
            newOutput.push(`Not shown: 998 closed tcp ports (reset)`);
            newOutput.push(`PORT   STATE SERVICE`);
            newOutput.push(`22/tcp open  ssh`);
            newOutput.push(`80/tcp open  http`);
            newOutput.push(``);
            newOutput.push(`Nmap done: 1 IP address (1 host up) scanned in 2.34 seconds`);
            
            if (target === 'scanme.nmap.org' || target === '45.33.32.156') {
              setTimeout(() => markLabComplete('network-recon'), 1000);
              newOutput.push('\n[SYSTEM] Lab Objective Completed! Target Acquired.');
              setIsSolved(true);
            }
            
            setOutput([...newOutput]);
            setIsProcessing(false);
          }, 1500);
        }, 800);
        return; // handle isProcessing inside timeouts
      } else if (cmd === 'clear') {
        setOutput([]);
        setIsProcessing(false);
        return;
      } else {
        newOutput.push(`bash: ${cmd}: command not found. Try 'ping', 'host', or 'nmap'`);
      }
    } catch (error) {
      newOutput.push(`[SYSTEM] Internal error executing command.`);
    }

    setOutput([...newOutput]);
    setIsProcessing(false);
  };

  const missionBriefing = (
    <>
      <p>
        You have been tasked with investigating the domain <code>scanme.nmap.org</code>. Your goal is to find its underlying IP address and discover what services it is exposing to the public internet.
      </p>
      <div className="p-3 bg-void rounded border border-line mt-4">
        <span className="text-xs font-mono text-cyan block mb-1">Target:</span>
        <span className="text-sm text-white">Successfully run an nmap scan against the target IP address.</span>
      </div>
    </>
  );

  const hints = [
    "The first step in investigating a domain is finding its IP address. Use the `host` or `ping` command (e.g. `host scanme.nmap.org`).",
    "Once you have the IP address, use `nmap` to scan it (e.g. `nmap 45.33.32.156`).",
  ];

  return (
    <LabWorkspace
      labId="network-recon"
      title="Network Reconnaissance"
      category="Networking"
      difficulty="Beginner"
      missionBriefing={missionBriefing}
      hints={hints}
      isSolved={isSolved}
      flagId="ZENTRION{n3tw0rk_r3c0n_m4st3r}"
    >
      <div className="font-mono text-sm h-full flex flex-col bg-[#0a0a0f] text-[#a5b4fc] p-6 overflow-y-auto">
        {output.map((line, i) => (
          <div key={i} className={`mb-1 ${line.startsWith('[SYSTEM]') ? 'text-emerald-400 font-bold' : ''}`}>
            {line}
          </div>
        ))}
        <form onSubmit={handleCommand} className="flex mt-2 shrink-0">
          <span className="mr-2">zentrion@lab:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isProcessing}
            className="flex-1 bg-transparent border-none outline-none text-[#e2e8f0] focus:ring-0 p-0 disabled:opacity-50"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </LabWorkspace>
  );
}
