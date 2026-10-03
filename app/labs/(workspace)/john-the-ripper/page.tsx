'use client';

import React, { useState, useRef, useEffect } from 'react';
import LabWorkspace from '@/components/LabWorkspace';

export default function JohnTheRipperLab() {
  const [history, setHistory] = useState<{ cmd: string, output: React.ReactNode }[]>([
    { 
      cmd: '', 
      output: <span className="text-purple-400">Zentrion Cyber Range Terminal - Type 'help' for available commands.</span>
    },
    {
      cmd: 'ls',
      output: 'passwd   shadow   rockyou.txt'
    }
  ]);
  const [input, setInput] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [isCracking, setIsCracking] = useState(false);
  
  // Track state of files
  const [hasUnshadowed, setHasUnshadowed] = useState(false);
  const [hasCracked, setHasCracked] = useState(false);

  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const simulateJohn = (targetFile: string) => {
    setIsCracking(true);
    setHistory(prev => [...prev, { cmd: `john --wordlist=rockyou.txt ${targetFile}`, output: '' }]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      
      if (step === 1) {
        setHistory(prev => {
          const newHist = [...prev];
          newHist[newHist.length - 1].output = (
            <div className="text-gray-300">
              Created directory: /home/attacker/.john<br/>
              Using default input encoding: UTF-8<br/>
              Loaded 2 password hashes with 2 different salts (sha512crypt, crypt(3) $6$ [SHA512 256/256 AVX2 4x])
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
              <br/>Cost 1 (iteration count) is 5000 for all loaded hashes<br/>
              Will run 4 OpenMP threads<br/>
              Press 'q' or Ctrl-C to abort, almost any other key for status
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
              <br/><span className="text-green-400 font-bold">ZENTRION{'{'}j0hn_th3_r1pp3r_h4sh_cr4ck3d{'}'}</span> (root)
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
              <br/>1g 0:00:00:04 DONE (2026-10-03 15:30) 0.2500g/s 3452p/s 3452c/s 6904C/s 123456..supersecret
              <br/>Use the "--show" option to display all of the cracked passwords reliably
              <br/>Session completed.
            </div>
          );
          return newHist;
        });
        setHasCracked(true);
        clearInterval(interval);
        setIsCracking(false);
      }
    }, 1000);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCracking) return;

    const cmd = input.trim().replace(/\s+/g, ' ');
    if (!cmd) return;

    let output: React.ReactNode = '';

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmd === 'help') {
      output = `Available commands: ls, cat, unshadow, john\n\nunshadow usage: unshadow [passwd_file] [shadow_file] > [output_file]\njohn usage: john --wordlist=[wordlist_file] [target_file]\njohn show cracked: john --show [target_file]`;
    } else if (cmd === 'ls') {
      output = `passwd   shadow   rockyou.txt${hasUnshadowed ? '   unshadowed.txt' : ''}`;
    } else if (cmd === 'cat passwd') {
      output = `root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin`;
    } else if (cmd === 'cat shadow') {
      output = `root:$6$SAlt1234$a9dJ1K...:19245:0:99999:7:::\ndaemon:*:19245:0:99999:7:::`;
    } else if (cmd.startsWith('unshadow ')) {
      if (cmd === 'unshadow passwd shadow > unshadowed.txt') {
        setHasUnshadowed(true);
        output = ``;
      } else {
        output = `Error: Incorrect syntax. Try: unshadow passwd shadow > unshadowed.txt`;
      }
    } else if (cmd.startsWith('john ')) {
      if (cmd === 'john --wordlist=rockyou.txt unshadowed.txt') {
        if (!hasUnshadowed) {
          output = `Error: unshadowed.txt does not exist. You must unshadow the files first.`;
        } else {
          simulateJohn('unshadowed.txt');
          setInput('');
          return;
        }
      } else if (cmd === 'john --show unshadowed.txt') {
        if (!hasCracked) {
          output = `0 password hashes cracked, 2 left`;
        } else {
          output = (
            <div className="text-gray-300">
              root:<span className="text-green-400 font-bold">ZENTRION{'{'}j0hn_th3_r1pp3r_h4sh_cr4ck3d{'}'}</span>:0:0:root:/root:/bin/bash<br/>
              <br/>
              1 password hash cracked, 1 left
            </div>
          );
          setIsSolved(true);
        }
      } else {
        output = `Error: Incorrect syntax. Use 'john --wordlist=rockyou.txt unshadowed.txt' to crack, and 'john --show unshadowed.txt' to view.`;
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
        <strong>John The Ripper</strong> (JTR) is a fast password cracker used to perform offline brute-force and dictionary attacks on captured password hashes.
      </p>
      <p className="mb-3">
        During a recent engagement, you managed to download the <code>passwd</code> and <code>shadow</code> files from a compromised Linux server. 
      </p>
      <div className="p-3 bg-void rounded border border-line mt-4">
        <span className="text-xs font-mono text-purple-400 block mb-1">Target:</span>
        <span className="text-sm text-white">Combine the two files into a crackable format using <code>unshadow</code>, then use <code>john</code> with the <code>rockyou.txt</code> wordlist to crack the root user's password hash and capture the flag.</span>
      </div>
    </>
  );

  const hints = [
    "Step 1: Combine the files. Type: unshadow passwd shadow > unshadowed.txt",
    "Step 2: Crack the hashes. Type: john --wordlist=rockyou.txt unshadowed.txt",
    "Step 3: View the cracked password. Type: john --show unshadowed.txt"
  ];

  return (
    <LabWorkspace
      labId="john-the-ripper"
      title="Offline Cracking (John The Ripper)"
      category="Offensive Security"
      difficulty="Advanced"
      missionBriefing={missionBriefing}
      hints={hints}
      isSolved={isSolved}
      flagId="ZENTRION{j0hn_th3_r1pp3r_h4sh_cr4ck3d}"
    >
      <div className="flex flex-col h-full bg-[#0a0a0f]">
        {/* Top Navbar Simulation */}
        <div className="px-6 py-4 border-b border-line bg-surface/30 flex items-center justify-between">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            Attacker Terminal (Kali Linux)
          </h3>
          <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-mono rounded">
            John The Ripper 1.9.0-jumbo-1
          </span>
        </div>

        {/* Workspace Layout */}
        <div className="flex-1 p-6 flex flex-col h-full">
          <div className="w-full flex-1 flex flex-col border border-line bg-void rounded-xl overflow-hidden font-mono shadow-[0_0_30px_rgba(168,85,247,0.05)]">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 p-3 bg-surface border-b border-line">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-mute ml-2">attacker@kali:~/tools/john</span>
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
                      <span className="text-purple-400 mr-2 font-bold">┌──(attacker㉿kali)-[~/tools]</span>
                      <br/>
                      <span className="text-purple-400 mr-2 font-bold">└─$</span>
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
                <span className="text-purple-400 mr-2 font-bold">┌──(attacker㉿kali)-[~/tools]</span>
                <div className="flex">
                  <span className="text-purple-400 mr-2 font-bold">└─$</span>
                  <input
                    id="terminal-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isCracking}
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
