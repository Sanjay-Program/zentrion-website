'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import LabWorkspace from '@/components/LabWorkspace';

// Extend window object to avoid TS errors
declare global {
  interface Window {
    initSqlJs: any;
  }
}

let SQL: any = null;
let db: any = null;

export default function SqlInjectionLab() {
  const [dbReady, setDbReady] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [queryLog, setQueryLog] = useState<{ query: string, result: any, error?: string }[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  const initDb = async () => {
    try {
      if (!window.initSqlJs) {
        setTimeout(initDb, 100);
        return;
      }
      SQL = await window.initSqlJs({
        locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
      });
      db = new SQL.Database();
      
      // Initialize vulnerable schema
      db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, role TEXT);");
      db.run("INSERT INTO users (username, password, role) VALUES ('admin', '4dm1n_s3cr3t_p4ss_99', 'admin');");
      db.run("INSERT INTO users (username, password, role) VALUES ('guest', 'guest123', 'user');");
      
      setDbReady(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dbReady) return;

    // VULNERABLE QUERY - concatenating strings directly (this is the core vulnerability)
    const rawQuery = `SELECT id, username, role FROM users WHERE username = '${username}' AND password = '${password}'`;
    
    try {
      const res = db.exec(rawQuery);
      
      if (res && res.length > 0 && res[0].values.length > 0) {
         // res[0].columns = ['id', 'username', 'role']
         // res[0].values = [[1, 'admin', 'admin'], ...]
         const rows = res[0].values;
         const firstRow = rows[0];
         
         setQueryLog(prev => [...prev, { query: rawQuery, result: res[0] }]);
         
         // In standard auth bypass (' OR 1=1 --), it logs in as the first returned user (usually admin)
         setLoggedInUser({
           id: firstRow[0],
           username: firstRow[1],
           role: firstRow[2]
         });

         if (firstRow[1] === 'admin' || firstRow[2] === 'admin') {
           setIsSolved(true);
         }
      } else {
         setQueryLog(prev => [...prev, { query: rawQuery, result: null, error: 'Invalid username or password.' }]);
      }
    } catch (err: any) {
      // SQL Syntax error (very common during blind/error-based injection)
      setQueryLog(prev => [...prev, { query: rawQuery, result: null, error: err.message }]);
    }
  };

  const missionBriefing = (
    <>
      <p>
        You have discovered a legacy corporate login portal for Zentrion internal services. The portal uses a <strong>SQLite</strong> database to authenticate users.
      </p>
      <p>
        The backend code is suspected to be vulnerable to <strong>SQL Injection (SQLi)</strong> because it concatenates user input directly into the SQL query string without sanitization.
      </p>
      <div className="p-3 bg-void rounded border border-line mt-4">
        <span className="text-xs font-mono text-cyan block mb-1">Target:</span>
        <span className="text-sm text-white">Bypass the authentication mechanism and log in as the <strong>admin</strong> user.</span>
      </div>
    </>
  );

  const hints = [
    "Try entering a single quote (') in the username field to see if you can break the SQL syntax and generate an error.",
    "The backend query looks like: SELECT * FROM users WHERE username = 'YOUR_INPUT' AND password = 'YOUR_PASSWORD'",
    "If you input `admin' --` as the username, the rest of the query (including the password check) is commented out!",
    "Alternatively, try the classic boolean OR bypass: `' OR 1=1 --`"
  ];

  return (
    <LabWorkspace
      labId="sql-injection"
      title="SQL Injection (Auth Bypass)"
      category="Web Security"
      difficulty="Intermediate"
      missionBriefing={missionBriefing}
      hints={hints}
      isSolved={isSolved}
      flagId="ZENTRION{sqli_4uth_byp4ss_succ3ss}"
    >
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js" onLoad={initDb} />
      
      <div className="flex flex-col h-full bg-[#0a0a0f] text-[#a5b4fc] p-6 overflow-hidden">
        
        {!dbReady ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm text-cyan font-mono animate-pulse">Initializing WebAssembly SQLite Engine...</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col lg:flex-row gap-6 h-full overflow-hidden">
            
            {/* VULNERABLE APP INTERFACE */}
            <div className="w-full lg:w-1/2 flex flex-col border border-line bg-surface/30 rounded-xl overflow-hidden shrink-0">
              <div className="h-8 bg-[#1a1a24] border-b border-line flex items-center px-4 justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[10px] text-mute tracking-widest uppercase">Internal Portal (Port 80)</span>
              </div>
              
              <div className="flex-1 p-8 flex flex-col items-center justify-center bg-white text-slate-900">
                {loggedInUser ? (
                  <div className="w-full max-w-sm text-center">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Welcome, {loggedInUser.username}</h2>
                    <p className="text-sm text-slate-500 mb-6">Role: {loggedInUser.role}</p>
                    
                    {loggedInUser.role === 'admin' ? (
                      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded text-left">
                        <p className="font-bold text-sm mb-2">Admin Dashboard</p>
                        <p className="text-xs">Database connection active. Full privileges granted.</p>
                      </div>
                    ) : (
                      <div className="p-4 bg-slate-50 border border-slate-200 text-slate-700 rounded text-left">
                        <p className="font-bold text-sm mb-2">User Dashboard</p>
                        <p className="text-xs">Standard privileges. Contact IT for admin access.</p>
                      </div>
                    )}
                    
                    <button 
                      onClick={() => setLoggedInUser(null)}
                      className="mt-6 text-sm text-indigo-600 hover:underline"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="w-full max-w-xs">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-slate-800">Zentrion Internal</h2>
                      <p className="text-sm text-slate-500 mt-1">Please sign in to continue</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">Username</label>
                        <input
                          type="text"
                          value={username}
                          onChange={e => setUsername(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono text-sm"
                          autoComplete="off"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">Password</label>
                        <input
                          type="text" // Text so they can see their injection payload easily
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono text-sm"
                          autoComplete="off"
                        />
                      </div>
                      <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition-colors">
                        Sign In
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* BACKEND SERVER LOGS (DEBUG VIEW) */}
            <div className="w-full lg:w-1/2 flex flex-col border border-line bg-black rounded-xl overflow-hidden shrink-0">
               <div className="h-8 bg-[#1a1a24] border-b border-line flex items-center px-4 justify-between">
                <span className="text-[10px] text-mute tracking-widest uppercase flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                  Backend SQL Logs
                </span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">REAL WASM ENGINE</span>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs">
                {queryLog.length === 0 ? (
                  <p className="text-mute italic">Waiting for queries...</p>
                ) : (
                  queryLog.map((log, i) => (
                    <div key={i} className="border border-line rounded bg-void p-3">
                      <div className="text-blue-400 mb-2 font-bold break-all">
                        <span className="text-mute mr-2 font-normal">Query:</span> 
                        {log.query}
                      </div>
                      {log.error ? (
                        <div className="text-red-400 mt-2 p-2 bg-red-500/10 rounded">
                          <span className="font-bold">SQL Error:</span> {log.error}
                        </div>
                      ) : (
                        <div className="text-emerald-400 mt-2 p-2 bg-emerald-500/10 rounded overflow-x-auto">
                          <span className="font-bold text-emerald-500 mb-1 block">Result Set:</span>
                          {log.result?.values ? (
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr>
                                  {log.result.columns.map((col: string, ci: number) => (
                                    <th key={ci} className="border-b border-emerald-500/30 py-1 pr-4">{col}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {log.result.values.map((row: any[], ri: number) => (
                                  <tr key={ri}>
                                    {row.map((cell, ci) => (
                                      <td key={ci} className="py-1 pr-4">{String(cell)}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <span className="italic text-emerald-500/70">0 rows returned</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </LabWorkspace>
  );
}
