'use client';

import React, { useState, useRef, useEffect } from 'react';
import LabWorkspace from '@/components/LabWorkspace';

export default function HydraBruteForceLab() {
  const [history, setHistory] = useState<{ cmd: string, output: React.ReactNode }[]>([
    { 
      cmd: '', 
      output: <span className="text-cyan">Zentrion Cyber Range Terminal - Type 'help' for available commands.</span>
    },
    {
      cmd: 'ls',
      output: 'rockyou.txt   readme.txt'
    }
  ]);
  const [input, setInput] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [isBruting, setIsBruting] = useState(false);
  const [simulatedTime, setSimulatedTime] = useState(0);

  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const simulateHydra = (user: string, wordlist: string, target: string, service: string) => {
    setIsBruting(true);
    setHistory(prev => [...prev, { cmd: `hydra -l ${user} -P ${wordlist} ${service}://${target}`, output: '' }]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      
      if (step === 1) {
        setHistory(prev => {
          const newHist = [...prev];
          newHist[newHist.length - 1].output = (
            <div className="text-gray-300">
              Hydra v9.5 (c) 2023 by van Hauser/THC - Please do not use in military or secret service organizations, or for illegal purposes (info: https://github.com/vanhauser-thc/thc-hydra)<br/><br/>
              Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2026-10-03 14:00:00<br/>
              [DATA] max 16 tasks per 1 server, overall 16 tasks, 14,344,392 login tries (l:1/p:14344392), ~1 server<br/>
              [DATA] attacking {service}://{target}:22/
            </div>
          );
          return newHist;
        });
      } else if (step === 2) {
        setHistory(prev => {
          const newHist = [...prev];
          newHist[newHist.length - 1].output = (
            <div className="text-gray-300">
              {newHist[newHist.length - 1].output}
              <br/>[ATTEMPT] target {target} - login "{user}" - pass "123456" - 1 of 14344392
              <br/>[ATTEMPT] target {target} - login "{user}" - pass "password" - 2 of 14344392
              <br/>[ATTEMPT] target {target} - login "{user}" - pass "12345678" - 3 of 14344392
            </div>
          );
          return newHist;
        });
      } else if (step === 3) {
        setHistory(prev => {
          const newHist = [...prev];
          newHist[newHist.length - 1].output = (
            <div className="text-gray-300">
              {newHist[newHist.length - 1].output}
              <br/>[ATTEMPT] target {target} - login "{user}" - pass "qwerty" - 4 of 14344392
              <br/>[ATTEMPT] target {target} - login "{user}" - pass "123456789" - 5 of 14344392
            </div>
          );
          return newHist;
        });
      } else if (step === 4) {
        setHistory(prev => {
          const newHist = [...prev];
          newHist[newHist.length - 1].output = (
            <div className="text-gray-300">
              {newHist[newHist.length - 1].output}
              <br/><span className="text-green-500 font-bold">[22][{service}] host: {target}   login: {user}   password: supersecret</span>
            </div>
          );
          return newHist;
        });
      } else if (step === 5) {
        setHistory(prev => {
          const newHist = [...prev];
          newHist[newHist.length - 1].output = (
            <div className="text-gray-300">
              {newHist[newHist.length - 1].output}
              <br/>1 of 1 target successfully completed, 1 valid password found
              <br/>Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2026-10-03 14:00:15
            </div>
          );
          return newHist;
        });
        clearInterval(interval);
        setIsBruting(false);
      }
    }, 800);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (isBruting) return;

    const cmd = input.trim().replace(/\s+/g, ' '); // Normalize spaces
    if (!cmd) return;

    let output: React.ReactNode = '';

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmd === 'ls') {
      output = `rockyou.txt   readme.txt`;
    } else if (cmd === 'cat readme.txt') {
      output = `Target Server IP: 10.10.10.55\nTarget Service: SSH\nKnown User: admin`;
    } else if (cmd === 'cat rockyou.txt') {
      output = `123456\npassword\n12345678\nqwerty\n123456789\nsupersecret\n... (14,344,386 more lines)`;
    } else if (cmd === 'whoami') {
      output = `attacker`;
    } else if (cmd === 'help') {
      output = `Available commands: ls, cat, clear, whoami, ssh, hydra\n\nHydra usage: hydra -l [username] -P [wordlist] [service]://[ip]`;
    } else if (cmd.startsWith('ssh ')) {
      const parts = cmd.split(' ');
      if (cmd === 'ssh admin@10.10.10.55') {
        output = (
          <div className="text-emerald-400 mt-2 p-2 border border-emerald-500/30 bg-emerald-900/20 rounded">
            admin@10.10.10.55's password: (simulated login success with 'supersecret')<br/>
            Welcome to Ubuntu 22.04.1 LTS (GNU/Linux 5.15.0-53-generic x86_64)<br/><br/>
            System information as of Sat Oct  3 14:05:22 UTC 2026<br/><br/>
            [SUCCESS] Access Granted. Flag retrieved:<br/>
            <span className="font-bold text-white text-lg">ZENTRION{'{'}hydr4_brut3_f0rc3d{'}'}</span>
          </div>
        );
        setIsSolved(true);
      } else {
        output = `ssh: connect to host ${parts[1]} port 22: Connection refused`;
      }
    } else if (cmd.startsWith('hydra ')) {
      // Very basic parser for simulation purposes
      // Expected: hydra -l admin -P rockyou.txt ssh://10.10.10.55
      
      const hasL = cmd.includes('-l admin');
      const hasP = cmd.includes('-P rockyou.txt');
      const hasTarget = cmd.includes('ssh://10.10.10.55');

      if (hasL && hasP && hasTarget) {
        simulateHydra('admin', 'rockyou.txt', '10.10.10.55', 'ssh');
        setInput('');
        return; // Early return because simulateHydra manages state asynchronously
      } else {
        output = `Hydra error: Missing or incorrect arguments. \nCheck that you specified a login (-l admin), a password list (-P rockyou.txt), and the target (ssh://10.10.10.55).`;
      }
    } else {
      output = `bash: ${cmd.split(' ')[0]}: command not found`;
    }

    setHistory([...history, { cmd, output }]);
    setInput('');
  };

  const missionBriefing = (
    <>
      <p className="mb-3">
        In many penetration tests, you will encounter exposed services (like SSH, FTP, or HTTP) with weak credentials. 
        <strong>THC Hydra</strong> is a powerful network logon cracker used to perform rapid dictionary attacks.
      </p>
      <p className="mb-3">
        You are in an attacker terminal. Your intelligence gathering has revealed an SSH server at <code>10.10.10.55</code> with a known username: <code>admin</code>.
      </p>
      <div className="p-3 bg-void rounded border border-line mt-4">
        <span className="text-xs font-mono text-emerald-500 block mb-1">Target:</span>
        <span className="text-sm text-white">Use Hydra and the provided <code>rockyou.txt</code> wordlist to crack the SSH password. Then, SSH into the machine to retrieve the flag.</span>
      </div>
    </>
  );

  const hints = [
    "Type 'ls' and 'cat readme.txt' to view available files and target information.",
    "The basic syntax for Hydra is: hydra -l [username] -P [wordlist_file] [service]://[target_ip]",
    "For this lab, you need: hydra -l admin -P rockyou.txt ssh://10.10.10.55",
    "Once Hydra finishes, look for the green text showing the valid password. Then type: ssh admin@10.10.10.55"
  ];

  return (
    <LabWorkspace
      labId="hydra-brute-force"
      title="Password Cracking (Hydra)"
      category="Offensive Security"
      difficulty="Intermediate"
      missionBriefing={missionBriefing}
      hints={hints}
      isSolved={isSolved}
      flagId="ZENTRION{hydr4_brut3_f0rc3d}"
    >
      <div className="flex flex-col h-full bg-[#0a0a0f]">
        
        {/* Top Navbar Simulation */}
        <div className="px-6 py-4 border-b border-line bg-surface/30 flex items-center justify-between">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-500"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            Attacker Terminal (Kali Linux)
          </h3>
          <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono rounded">
            Interactive Simulation
          </span>
        </div>

        {/* Workspace Layout */}
        <div className="flex-1 p-6 flex flex-col h-full">
          
          <div className="w-full flex-1 flex flex-col border border-line bg-void rounded-xl overflow-hidden font-mono shadow-[0_0_30px_rgba(16,185,129,0.05)]">
            
            {/* Terminal Header */}
            <div className="flex items-center gap-2 p-3 bg-surface border-b border-line">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-mute ml-2">attacker@kali:~/tools/hydra</span>
            </div>

            {/* Terminal Body */}
            <div 
              className="flex-1 p-4 overflow-y-auto text-sm text-gray-300 whitespace-pre-wrap"
              onClick={() => document.getElementById('terminal-input')?.focus()}
            >
              {history.map((h, i) => (
                <div key={i} className="mb-4">
                  {h.cmd !== '' && (
                    <div className="flex text-white">
                      <span className="text-emerald-500 mr-2 font-bold">┌──(attacker㉿kali)-[~/tools]</span>
                      <br/>
                      <span className="text-emerald-500 mr-2 font-bold">└─$</span>
                      {h.cmd}
                    </div>
                  )}
                  {h.output && (
                    <div className="mt-1 text-gray-400 leading-relaxed">
                      {h.output}
                    </div>
                  )}
                </div>
              ))}

              {/* Input Line */}
              <form onSubmit={handleCommand} className="flex flex-col text-white mt-2">
                <span className="text-emerald-500 mr-2 font-bold">┌──(attacker㉿kali)-[~/tools]</span>
                <div className="flex">
                  <span className="text-emerald-500 mr-2 font-bold">└─$</span>
                  <input
                    id="terminal-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isBruting}
                    className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0 disabled:opacity-50"
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>
              </form>
              
              <div ref={endOfTerminalRef} />
            </div>
          </div>
        </div>
      </div>
    </LabWorkspace>
  );
}
