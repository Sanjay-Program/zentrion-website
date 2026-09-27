'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { learningManager } from '@/lib/learning-state';

export default function HttpCookiesLab() {
  const [cookies, setCookies] = useState<{ name: string; value: string; flags: string[] }[]>([
    { name: 'session_id', value: '1a2b3c4d5e', flags: ['HttpOnly'] },
    { name: 'theme', value: 'dark', flags: [] },
    { name: 'user_role', value: 'guest', flags: [] }
  ]);
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Check if the user successfully manipulated the cookie to become admin
    const roleCookie = cookies.find(c => c.name === 'user_role');
    if (roleCookie && roleCookie.value === 'admin') {
      setIsAdmin(true);
      if (!completed) {
        setCompleted(true);
        learningManager.markLabCompleted('http-cookies');
      }
    } else {
      setIsAdmin(false);
    }
  }, [cookies, completed]);

  const updateCookieValue = (name: string, newValue: string) => {
    setCookies(cookies.map(c => 
      c.name === name ? { ...c, value: newValue } : c
    ));
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-[var(--c-glass-border)] bg-[rgb(var(--c-void))] z-10 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/labs" className="text-[rgb(var(--c-mute))] hover:text-white transition-colors">
            &larr; Exit Lab
          </Link>
          <div className="h-4 w-px bg-[rgba(255,255,255,0.1)]" />
          <h1 className="font-bold">HTTP Cookies & Authentication Bypass</h1>
        </div>
        <div className="flex items-center gap-4">
          {completed && (
            <span className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Lab Completed
            </span>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Instructions */}
        <div className="w-1/3 border-r border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] flex flex-col overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 font-display">Mission Briefing</h2>
            <div className="space-y-4 text-[rgb(var(--c-mute))] text-sm leading-relaxed">
              <p>
                Cookies are small pieces of data stored in the browser and sent to the server with every HTTP request. They are often used for session management and authorization.
              </p>
              <div className="bg-[rgba(0,0,0,0.3)] p-4 rounded-lg border border-[var(--c-glass-border)] mt-4">
                <h3 className="text-white font-semibold mb-2">Objective</h3>
                <p>You are logged in as a "guest". Use the simulated browser Developer Tools to manipulate your cookies and gain "admin" access to the dashboard.</p>
              </div>
              <div className="mt-8">
                <h3 className="text-white font-semibold mb-2">Hints</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Look at the Application / Storage tab in the simulated DevTools below.</li>
                  <li>Find the cookie responsible for authorization.</li>
                  <li>Edit the value directly and see how the application reacts.</li>
                </ul>
              </div>
              
              <div className="mt-8 border-t border-[var(--c-glass-border)] pt-6">
                <h3 className="text-white font-semibold mb-4">Related Resources</h3>
                <div className="flex flex-col gap-2">
                  <Link href="/encyclopedia" className="text-[rgb(var(--c-accent))] hover:underline text-xs flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    Encyclopedia: Sessions and Cookies
                  </Link>
                  <Link href="/tools/http-headers" className="text-[rgb(var(--c-accent))] hover:underline text-xs flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    Tool: HTTP Headers Checker
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Simulated Environment */}
        <div className="w-2/3 flex flex-col relative overflow-hidden bg-white text-black">
          
          {/* Vulnerable App Dashboard */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-2xl mx-auto border border-gray-200 rounded-lg shadow-sm bg-gray-50 overflow-hidden">
              <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <span className="font-bold">CorpPortal Intranet</span>
                <span className="text-sm px-2 py-1 bg-gray-700 rounded">Current Role: {isAdmin ? 'ADMIN' : 'GUEST'}</span>
              </div>
              
              <div className="p-8">
                {isAdmin ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard Unlocked</h2>
                    <p className="text-green-600 mb-6">Authentication bypassed successfully!</p>
                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div className="bg-white p-4 border border-gray-200 rounded shadow-sm">
                        <h4 className="font-bold text-sm text-gray-700 mb-1">User Management</h4>
                        <p className="text-xs text-gray-500">Add, edit, or remove users.</p>
                      </div>
                      <div className="bg-white p-4 border border-gray-200 rounded shadow-sm">
                        <h4 className="font-bold text-sm text-gray-700 mb-1">Financial Records</h4>
                        <p className="text-xs text-gray-500">View Q3 confidential reports.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
                    <p className="text-gray-600">You do not have permission to view this page.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Simulated DevTools (Cookies Tab) */}
          <div className="h-64 border-t-2 border-gray-300 bg-white flex flex-col shrink-0">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex text-sm text-gray-700 font-sans gap-6">
              <span>Elements</span>
              <span>Console</span>
              <span>Network</span>
              <span className="font-bold border-b-2 border-blue-500 text-blue-600">Application</span>
            </div>
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <div className="w-48 border-r border-gray-200 bg-gray-50 p-2 text-xs overflow-y-auto">
                <div className="font-bold text-gray-700 mb-1">Storage</div>
                <div className="pl-4 space-y-1">
                  <div className="text-gray-600">Local Storage</div>
                  <div className="text-gray-600">Session Storage</div>
                  <div className="text-blue-600 font-bold bg-blue-100 rounded px-1 -mx-1">Cookies
                    <div className="text-gray-600 font-normal mt-1 ml-2">vulnerable-app.local</div>
                  </div>
                </div>
              </div>
              {/* Table */}
              <div className="flex-1 overflow-auto text-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200 text-gray-600">
                      <th className="font-normal p-2 border-r border-gray-200 w-1/4">Name</th>
                      <th className="font-normal p-2 border-r border-gray-200 w-1/2">Value</th>
                      <th className="font-normal p-2 w-1/4">Flags</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookies.map((c) => (
                      <tr key={c.name} className="border-b border-gray-100 hover:bg-blue-50">
                        <td className="p-2 border-r border-gray-200 font-mono text-xs">{c.name}</td>
                        <td className="p-2 border-r border-gray-200">
                          {c.flags.includes('HttpOnly') ? (
                            <span className="text-gray-500 font-mono text-xs">{c.value}</span>
                          ) : (
                            <input 
                              type="text" 
                              value={c.value} 
                              onChange={(e) => updateCookieValue(c.name, e.target.value)}
                              className="w-full bg-transparent border border-transparent hover:border-gray-300 focus:border-blue-500 focus:bg-white rounded px-1 py-0.5 outline-none font-mono text-xs"
                            />
                          )}
                        </td>
                        <td className="p-2 font-mono text-xs text-gray-500">
                          {c.flags.join(', ')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
