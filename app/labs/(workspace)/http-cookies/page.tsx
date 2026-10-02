'use client';

import React, { useState } from 'react';
import { LabLayout } from '@/components/LabLayout';
import { SimulatedBrowser } from '@/components/SimulatedBrowser';

export default function HttpCookiesRange() {
  // We manage the simulated cookies at the lab level
  const [cookies, setCookies] = useState<Record<string, string>>({
    'session_id': '8f7a6b5c4d3e2f1',
    'role': 'guest'
  });

  const [cookieInputKey, setCookieInputKey] = useState('');
  const [cookieInputValue, setCookieInputValue] = useState('');

  const handleUpdateCookie = (e: React.FormEvent) => {
    e.preventDefault();
    if (cookieInputKey && cookieInputValue) {
      setCookies(prev => ({
        ...prev,
        [cookieInputKey]: cookieInputValue
      }));
      setCookieInputKey('');
      setCookieInputValue('');
    }
  };

  const deleteCookie = (key: string) => {
    setCookies(prev => {
      const newCookies = { ...prev };
      delete newCookies[key];
      return newCookies;
    });
  };

  const AdminPanel = () => {
    if (cookies['role'] === 'admin') {
      return (
        <div className="p-8 h-full bg-slate-900 text-slate-100">
          <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-emerald-400 border-b border-slate-700 pb-4">Central Command Dashboard</h1>
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-xl mb-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Classified Intel</h2>
              <p className="mb-4 text-slate-300">Welcome back, Administrator. The system is operating nominally.</p>
              <div className="bg-slate-900 p-4 rounded border border-slate-700 font-mono">
                <p className="text-sm text-slate-400 mb-1">Decrypted Flag Payload:</p>
                <code className="text-lg text-emerald-400 font-bold">ZT{'{'}c00k13_m4n1pul4t10n_ftw{'}'}</code>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded border border-slate-700 transition-colors">
                Server Settings
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded border border-slate-700 transition-colors">
                User Management
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-8 h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0110 0v4"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You do not have permission to view this page. Current role: <span className="font-mono font-bold bg-gray-200 px-2 py-0.5 rounded text-red-600">{cookies['role'] || 'undefined'}</span>
          </p>
        </div>
      </div>
    );
  };

  const routes = {
    'http://target.lab/admin': AdminPanel,
  };

  return (
    <LabLayout
      labId="http-cookies"
      xpReward={150}
      title="Insecure HTTP Cookies"
      category="Web Security"
      difficulty="Beginner"
      objective="Gain access to the admin dashboard by manipulating your session cookies."
      scope="Simulated Web Environment"
      target="http://target.lab/admin"
      hints={[
        "The web application relies on a cookie to determine your authorization level.",
        "Take a look at the 'Simulated Developer Tools' panel below the browser.",
        "Change the value of the 'role' cookie from 'guest' to 'admin', then click Refresh on the browser."
      ]}
      flag="ZT{c00k13_m4n1pul4t10n_ftw}"
      explanation={
        <>
          <p className="mb-4">
            HTTP Cookies are small pieces of data stored in the user's browser, originally designed to remember stateful information (like items in a shopping cart or authentication status).
          </p>
          <p className="mb-4">
            In this lab, the application makes a critical security flaw: it trusts a user-controlled cookie (<code>role=guest</code>) to make authorization decisions. Because cookies are stored on the client side, the user has full control over them.
          </p>
          <p>
            By modifying the cookie to <code>role=admin</code>, the server (simulated here) incorrectly granted administrative access.
          </p>
        </>
      }
      remediation={
        <p>
          Never store sensitive authorization data directly in plain text cookies. Instead, store an unguessable <strong>Session ID</strong> in a secure, HttpOnly cookie. The server should use this Session ID to look up the user's true role in a secure backend database or memory store. Alternatively, use securely signed JSON Web Tokens (JWTs) that prevent tampering.
        </p>
      }
    >
      <div className="flex flex-col gap-4">
        <SimulatedBrowser 
          initialUrl="http://target.lab/admin" 
          routes={routes} 
        />
        
        {/* Simulated Developer Tools */}
        <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden font-mono text-sm shadow-lg">
          <div className="bg-slate-800 text-slate-300 px-4 py-2 border-b border-slate-700 flex justify-between items-center text-xs uppercase tracking-wider font-bold">
            <span>Simulated Developer Tools - Application (Cookies)</span>
          </div>
          <div className="p-4 bg-slate-950 text-slate-300">
            <table className="w-full text-left mb-6">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500">
                  <th className="pb-2 font-normal">Name</th>
                  <th className="pb-2 font-normal">Value</th>
                  <th className="pb-2 font-normal">Domain</th>
                  <th className="pb-2 font-normal text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(cookies).map(([k, v]) => (
                  <tr key={k} className="border-b border-slate-900/50 hover:bg-slate-800/50">
                    <td className="py-2 text-blue-400">{k}</td>
                    <td className="py-2">{v}</td>
                    <td className="py-2 text-slate-500">target.lab</td>
                    <td className="py-2 text-right">
                      <button onClick={() => deleteCookie(k)} className="text-red-400 hover:text-red-300">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <form onSubmit={handleUpdateCookie} className="flex gap-2 items-end bg-slate-900 p-3 rounded border border-slate-800">
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">Name</label>
                <input 
                  type="text" 
                  value={cookieInputKey}
                  onChange={e => setCookieInputKey(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 outline-none focus:border-blue-500" 
                  placeholder="e.g. role"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-slate-500 mb-1">Value</label>
                <input 
                  type="text" 
                  value={cookieInputValue}
                  onChange={e => setCookieInputValue(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 outline-none focus:border-blue-500" 
                  placeholder="e.g. admin"
                />
              </div>
              <button type="submit" className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-1.5 rounded transition-colors">
                Set Cookie
              </button>
            </form>
          </div>
        </div>
      </div>
    </LabLayout>
  );
}
