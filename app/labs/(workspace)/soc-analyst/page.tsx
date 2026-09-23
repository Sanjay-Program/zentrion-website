'use client';

import { useState, useMemo } from 'react';
import LabWorkspace from '@/components/LabWorkspace';

type LogEntry = {
  id: number;
  timestamp: string;
  source: string;
  host: string;
  message: string;
  level: string;
};

const rawLogs: LogEntry[] = [
  { id: 101, timestamp: "2026-09-23T10:15:22Z", source: "/var/log/auth.log", host: "web-prod-01", level: "INFO", message: "sshd[1422]: Accepted publickey for admin from 10.0.5.22 port 54312 ssh2" },
  { id: 102, timestamp: "2026-09-23T10:15:25Z", source: "/var/log/auth.log", host: "web-prod-01", level: "INFO", message: "sshd[1422]: pam_unix(sshd:session): session opened for user admin by (uid=0)" },
  { id: 103, timestamp: "2026-09-23T11:02:11Z", source: "/var/log/nginx/access.log", host: "web-prod-01", level: "INFO", message: '192.168.1.100 - - [23/Sep/2026:11:02:11 +0000] "GET / HTTP/1.1" 200 4521 "-" "Mozilla/5.0"' },
  { id: 104, timestamp: "2026-09-23T11:02:14Z", source: "/var/log/nginx/access.log", host: "web-prod-01", level: "INFO", message: '192.168.1.100 - - [23/Sep/2026:11:02:14 +0000] "GET /about HTTP/1.1" 200 3122 "-" "Mozilla/5.0"' },
  { id: 105, timestamp: "2026-09-23T11:05:33Z", source: "/var/log/nginx/access.log", host: "web-prod-01", level: "WARN", message: '203.0.113.45 - - [23/Sep/2026:11:05:33 +0000] "GET /admin/config.php HTTP/1.1" 404 153 "-" "python-requests/2.25.1"' },
  { id: 106, timestamp: "2026-09-23T11:05:34Z", source: "/var/log/nginx/access.log", host: "web-prod-01", level: "WARN", message: '203.0.113.45 - - [23/Sep/2026:11:05:34 +0000] "GET /.env HTTP/1.1" 404 153 "-" "python-requests/2.25.1"' },
  { id: 107, timestamp: "2026-09-23T11:05:35Z", source: "/var/log/nginx/access.log", host: "web-prod-01", level: "WARN", message: '203.0.113.45 - - [23/Sep/2026:11:05:35 +0000] "GET /api/v1/users?id=1%27%20OR%201=1 HTTP/1.1" 500 892 "-" "python-requests/2.25.1"' },
  { id: 108, timestamp: "2026-09-23T11:05:36Z", source: "/var/log/nginx/error.log", host: "web-prod-01", level: "ERROR", message: "PHP Fatal error: Uncaught PDOException: SQLSTATE[42000]: Syntax error or access violation in /var/www/html/api/v1/users.php:42" },
  { id: 109, timestamp: "2026-09-23T11:06:01Z", source: "/var/log/nginx/access.log", host: "web-prod-01", level: "WARN", message: '203.0.113.45 - - [23/Sep/2026:11:06:01 +0000] "GET /download?file=../../../../../../etc/passwd HTTP/1.1" 200 2452 "-" "python-requests/2.25.1"' },
  { id: 110, timestamp: "2026-09-23T11:06:05Z", source: "/var/log/nginx/access.log", host: "web-prod-01", level: "WARN", message: '203.0.113.45 - - [23/Sep/2026:11:06:05 +0000] "GET /download?file=../../../../../../etc/shadow HTTP/1.1" 200 1104 "-" "python-requests/2.25.1"' },
  { id: 111, timestamp: "2026-09-23T11:15:22Z", source: "/var/log/auth.log", host: "web-prod-01", level: "WARN", message: "sshd[2981]: Failed password for root from 203.0.113.45 port 49122 ssh2" },
  { id: 112, timestamp: "2026-09-23T11:15:24Z", source: "/var/log/auth.log", host: "web-prod-01", level: "WARN", message: "sshd[2981]: Failed password for root from 203.0.113.45 port 49122 ssh2" },
  { id: 113, timestamp: "2026-09-23T11:15:26Z", source: "/var/log/auth.log", host: "web-prod-01", level: "WARN", message: "sshd[2981]: Failed password for root from 203.0.113.45 port 49122 ssh2" },
  { id: 114, timestamp: "2026-09-23T11:15:28Z", source: "/var/log/auth.log", host: "web-prod-01", level: "CRITICAL", message: "sshd[2981]: Accepted password for root from 203.0.113.45 port 49122 ssh2" },
  { id: 115, timestamp: "2026-09-23T11:15:30Z", source: "/var/log/auth.log", host: "web-prod-01", level: "INFO", message: "sshd[2981]: pam_unix(sshd:session): session opened for user root by (uid=0)" },
  { id: 116, timestamp: "2026-09-23T11:16:05Z", source: "/var/log/syslog", host: "web-prod-01", level: "WARN", message: "kernel: [12455.122] useradd[3102]: new user: name=backdoor, UID=1001, GID=1001, home=/home/backdoor, shell=/bin/bash" }
];

export default function SocAnalystLab() {
  const [query, setQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [isSolved] = useState(false);

  // Splunk-lite query parser
  const filteredLogs = useMemo(() => {
    if (!activeQuery.trim()) return rawLogs;
    
    // Simple space-separated terms. If a term contains ":", it's a field filter (e.g., source:/var/log/auth.log)
    // If it doesn't, it's a general text search across all fields.
    const terms = activeQuery.split(' ').filter(Boolean);
    
    return rawLogs.filter(log => {
      return terms.every(term => {
        if (term.includes(':')) {
          const [field, value] = term.split(':');
          const lowerValue = value.toLowerCase();
          switch(field.toLowerCase()) {
            case 'source': return log.source.toLowerCase().includes(lowerValue);
            case 'host': return log.host.toLowerCase().includes(lowerValue);
            case 'level': return log.level.toLowerCase() === lowerValue;
            case 'status': return log.message.includes(` ${value} `); // Naive status code match for apache logs
            default: return true;
          }
        } else {
          // General search
          const lowerTerm = term.toLowerCase();
          return (
            log.message.toLowerCase().includes(lowerTerm) ||
            log.source.toLowerCase().includes(lowerTerm) ||
            log.level.toLowerCase().includes(lowerTerm)
          );
        }
      });
    });
  }, [activeQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(query);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'INFO': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'WARN': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'ERROR': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'CRITICAL': return 'bg-red-500/20 text-red-500 border-red-500/30 font-bold animate-pulse';
      default: return 'bg-white/5 text-slate-300 border-white/10';
    }
  };

  const missionBriefing = (
    <>
      <p>
        You are a Level 1 SOC Analyst monitoring the SIEM (Security Information and Event Management) dashboard for Zentrion's production web server.
      </p>
      <p>
        An alert fired for a suspected <strong>Directory Traversal</strong> attack on <code>web-prod-01</code>.
      </p>
      <div className="p-3 bg-void rounded border border-line mt-4">
        <span className="text-xs font-mono text-cyan block mb-1">Target:</span>
        <span className="text-sm text-white">Identify the IP address of the attacker and submit it as the flag (e.g. <code>ZENTRION{'{'}192.168.1.1{'}'}</code>).</span>
      </div>
    </>
  );

  const hints = [
    "Look at the Nginx access logs to find HTTP requests requesting sensitive files like '/etc/passwd'.",
    "Try typing `source:/var/log/nginx/access.log passwd` into the search bar.",
    "Once you find the attack, look at the IP address at the beginning of the log message.",
    "Notice how the attacker uses that same IP to brute force SSH shortly after!"
  ];

  return (
    <LabWorkspace
      labId="soc-analyst"
      title="SOC Log Analysis (SIEM)"
      category="Network Defense"
      difficulty="Intermediate"
      missionBriefing={missionBriefing}
      hints={hints}
      isSolved={isSolved}
      flagId="ZENTRION{203.0.113.45}"
    >
      <div className="flex flex-col h-full bg-[#0d1117] text-[#c9d1d9] font-sans text-sm">
        
        {/* SIEM Header & Search */}
        <div className="bg-[#161b22] border-b border-[#30363d] p-4 flex flex-col gap-4 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              </div>
              <span className="text-sm font-semibold text-white tracking-wide">Zentrion SIEM</span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Time Range: Last 24 Hours
            </div>
          </div>
          
          <form onSubmit={handleSearch} className="flex gap-0 w-full shadow-lg rounded-md overflow-hidden">
            <div className="bg-[#0d1117] border border-[#30363d] border-r-0 px-3 py-2 flex items-center shrink-0 text-slate-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <input 
              type="text" 
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-[#0d1117] border-y border-[#30363d] px-2 py-2 text-sm font-mono focus:outline-none focus:bg-[#010409] transition-colors"
              placeholder="Search logs... e.g., 'source:/var/log/auth.log' or 'level:ERROR' or 'password'"
            />
            <button type="submit" className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium border border-indigo-600 transition-colors">
              Search
            </button>
          </form>
          
          <div className="flex gap-2 text-xs font-mono">
            <span className="text-slate-500">Suggested queries:</span>
            <button onClick={() => {setQuery('level:CRITICAL'); setActiveQuery('level:CRITICAL');}} className="text-indigo-400 hover:underline">level:CRITICAL</button>
            <button onClick={() => {setQuery('source:/var/log/auth.log Failed'); setActiveQuery('source:/var/log/auth.log Failed');}} className="text-indigo-400 hover:underline">Auth Failures</button>
            <button onClick={() => {setQuery('etc/passwd'); setActiveQuery('etc/passwd');}} className="text-indigo-400 hover:underline">LFI Attempts</button>
          </div>
        </div>

        {/* SIEM Timeline (Visual Mock) */}
        <div className="h-24 bg-[#0d1117] border-b border-[#30363d] p-4 flex items-end gap-1 shrink-0">
          {/* Mock bar chart showing event frequency */}
          <div className="w-8 bg-indigo-900/40 rounded-t h-[10%] hover:bg-indigo-500/60 transition-colors cursor-crosshair"></div>
          <div className="w-8 bg-indigo-900/40 rounded-t h-[20%] hover:bg-indigo-500/60 transition-colors cursor-crosshair"></div>
          <div className="w-8 bg-indigo-900/40 rounded-t h-[5%] hover:bg-indigo-500/60 transition-colors cursor-crosshair"></div>
          <div className="w-8 bg-indigo-900/40 rounded-t h-[15%] hover:bg-indigo-500/60 transition-colors cursor-crosshair"></div>
          <div className="w-8 bg-indigo-900/40 rounded-t h-[30%] hover:bg-indigo-500/60 transition-colors cursor-crosshair"></div>
          <div className="w-8 bg-red-900/40 rounded-t h-[80%] hover:bg-red-500/60 transition-colors cursor-crosshair relative group">
            <div className="absolute bottom-full mb-2 hidden group-hover:block whitespace-nowrap bg-black p-2 rounded text-xs z-10 border border-slate-700">Spike in events (Attacker Activity)</div>
          </div>
          <div className="w-8 bg-indigo-900/40 rounded-t h-[25%] hover:bg-indigo-500/60 transition-colors cursor-crosshair"></div>
          <div className="flex-1"></div>
          <div className="text-xs text-slate-500 font-mono self-start">{filteredLogs.length} events found</div>
        </div>

        {/* Log Viewer Pane */}
        <div className="flex-1 overflow-auto bg-[#0d1117]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#161b22] sticky top-0 shadow-sm z-10">
              <tr>
                <th className="font-semibold text-xs py-2 px-4 border-b border-[#30363d] w-48 text-slate-400">Timestamp</th>
                <th className="font-semibold text-xs py-2 px-4 border-b border-[#30363d] w-32 text-slate-400">Host</th>
                <th className="font-semibold text-xs py-2 px-4 border-b border-[#30363d] w-48 text-slate-400">Source</th>
                <th className="font-semibold text-xs py-2 px-4 border-b border-[#30363d] w-24 text-slate-400">Level</th>
                <th className="font-semibold text-xs py-2 px-4 border-b border-[#30363d] text-slate-400">Message</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[13px]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b border-[#30363d]/50 hover:bg-[#161b22] transition-colors group">
                  <td className="py-2 px-4 text-[#8b949e] whitespace-nowrap">{log.timestamp.replace('T', ' ')}</td>
                  <td className="py-2 px-4 text-[#8b949e]">{log.host}</td>
                  <td className="py-2 px-4 text-indigo-400/80 group-hover:text-indigo-400 truncate">{log.source}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] border tracking-wider ${getLevelColor(log.level)}`}>
                      {log.level}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-[#c9d1d9] break-all">{log.message}</td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 italic">No events match your search query.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </LabWorkspace>
  );
}
