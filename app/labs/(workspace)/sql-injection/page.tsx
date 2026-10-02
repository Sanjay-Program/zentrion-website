'use client';

import React, { useState } from 'react';
import { LabLayout } from '@/components/LabLayout';
import { SimulatedBrowser } from '@/components/SimulatedBrowser';

const LoginPage = ({ navigate }: { navigate: (url: string) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate SQL Injection vulnerability
    // A real backend would run: SELECT * FROM users WHERE username = 'admin' AND password = 'password'
    
    // If username is: admin' OR '1'='1
    // The query becomes: SELECT * FROM users WHERE username = 'admin' OR '1'='1' AND password = '...'
    
    // For this simulation, we'll check if the payload matches common SQLi bypass patterns
    const isSqli = username.includes("' OR '1'='1") || 
                   username.includes("' OR 1=1--") || 
                   username.includes("' OR 'a'='a") ||
                   username.includes('" OR "1"="1');
                   
    if (isSqli || (username === 'admin' && password === 'admin123')) {
      navigate('http://target.lab/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  return (
    <div className="p-8 h-full bg-gray-50">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-green-800 mb-2">Authentication Successful</h2>
        <p className="text-green-700">Welcome to the secure administrative dashboard.</p>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">System Alerts</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 text-gray-600">
            <span className="text-blue-500 font-bold">[INFO]</span>
            <span>Flag for Zentrion Cyber Range: <code className="ml-2 px-2 py-1 bg-gray-100 text-red-600 rounded font-mono font-bold">ZT{'{'}sqli_l0g1n_byp4ss{'}'}</code></span>
          </li>
          <li className="flex items-start gap-3 text-gray-600">
            <span className="text-yellow-500 font-bold">[WARN]</span>
            Database backups failing due to space constraints on /dev/sda1
          </li>
        </ul>
      </div>
    </div>
  );
};

export default function SqlInjectionRange() {
  const routes = {
    'http://target.lab/': LoginPage,
    'http://target.lab/dashboard': DashboardPage
  };

  return (
    <LabLayout
      labId="sql-injection"
      xpReward={200}
      title="SQL Injection (Auth Bypass)"
      category="Web Security"
      difficulty="Intermediate"
      objective="Bypass the login form by injecting a SQL payload into the username field."
      scope="Simulated Web Environment"
      target="http://target.lab"
      hints={[
        "The backend query likely looks like: SELECT * FROM users WHERE username = '$username' AND password = '$password'",
        "If you input a single quote ('), you can break out of the username string.",
        "Try injecting: admin' OR '1'='1",
        "If successful, the query becomes true for the entire row, bypassing the password check."
      ]}
      flag="ZT{sqli_l0g1n_byp4ss}"
      explanation={
        <>
          <p className="mb-4">
            SQL Injection (SQLi) occurs when user-supplied data is included in a SQL query without proper escaping or parameterization.
          </p>
          <p className="mb-4">
            By inputting <code>admin' OR '1'='1</code>, the backend query becomes: <br/>
            <code className="text-emerald-400 bg-surface/50 px-2 py-1 rounded block mt-2">SELECT * FROM users WHERE username = 'admin' OR '1'='1' AND password = '...'</code>
          </p>
          <p>
            Because <code>1=1</code> is always true, the database returns the first record (usually the admin), completely bypassing the password requirement.
          </p>
        </>
      }
      remediation={
        <p>
          Never construct SQL queries by concatenating raw strings. Always use <strong>Prepared Statements (Parameterized Queries)</strong> provided by your database driver (e.g., PDO in PHP, PreparedStatement in Java, parameterized queries in Node.js/pg). Prepared statements ensure that the database treats user input strictly as data, never as executable code.
        </p>
      }
    >
      <SimulatedBrowser 
        initialUrl="http://target.lab/" 
        routes={routes} 
      />
    </LabLayout>
  );
}
