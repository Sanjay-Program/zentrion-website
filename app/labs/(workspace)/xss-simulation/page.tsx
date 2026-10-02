'use client';

import React, { useState, useEffect } from 'react';
import { LabLayout } from '@/components/LabLayout';
import { SimulatedBrowser } from '@/components/SimulatedBrowser';

const GuestbookPage = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState<{name: string, message: string}[]>([
    { name: 'Admin', message: 'Welcome to our new guestbook! Leave a comment.' },
    { name: 'Alice', message: 'First! Love the new design.' }
  ]);
  const [showAlert, setShowAlert] = useState(false);
  
  // This state is just to trigger the alert visually in the DOM since we can't literally run a user's script
  const [alertContent, setAlertContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    
    setPosts([...posts, { name, message }]);
    setName('');
    setMessage('');
  };

  useEffect(() => {
    // Check if any post contains a script tag with an alert
    for (const post of posts) {
      const msg = post.message.toLowerCase();
      // Simple regex to catch basic XSS attempts
      if (msg.includes('<script>') && msg.includes('alert') && msg.includes('</script>')) {
        // Extract what's inside the alert
        const match = msg.match(/alert\((.*?)\)/);
        if (match) {
          setAlertContent(match[1].replace(/['"]/g, ''));
          setShowAlert(true);
        } else {
          setAlertContent('1');
          setShowAlert(true);
        }
      }
    }
  }, [posts]);

  return (
    <div className="p-8 max-w-2xl mx-auto min-h-full">
      <h1 className="text-3xl font-bold mb-8 pb-4 border-b">Community Guestbook</h1>
      
      {/* Simulated Browser Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/20 backdrop-blur-sm">
          <div className="bg-white text-black p-6 rounded shadow-2xl border border-gray-300 w-96">
            <div className="mb-6 flex gap-3 items-center">
              <span className="text-2xl">⚠️</span>
              <p>target.lab says:</p>
            </div>
            <p className="mb-6 font-mono bg-gray-100 p-2 rounded">{alertContent}</p>
            <p className="mb-6 text-sm text-gray-600 border-t pt-4">
              <strong>XSS Executed!</strong> Here is your flag: 
              <br/>
              <code className="text-red-600 font-bold bg-red-50 px-2 py-1 mt-2 block w-fit rounded">ZT{'{'}xss_p4yl04d_f1r3d{'}'}</code>
            </p>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowAlert(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
        <h3 className="text-lg font-bold mb-4">Leave a message</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded px-3 py-2 h-24"
          ></textarea>
        </div>
        <button type="submit" className="bg-black text-white px-4 py-2 rounded font-medium">Post Message</button>
      </form>

      <div className="space-y-6">
        <h3 className="text-lg font-bold">Recent Comments</h3>
        {posts.map((post, i) => (
          <div key={i} className="border-b pb-4">
            <p className="font-bold mb-1">{post.name}</p>
            {/* The vulnerability: dangerouslySetInnerHTML simulates an app that doesn't encode user input */}
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: post.message }}></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function XssSimulationRange() {
  const routes = {
    'http://target.lab/': GuestbookPage,
  };

  return (
    <LabLayout
      labId="xss-simulation"
      xpReward={200}
      title="Cross-Site Scripting (XSS)"
      category="Web Security"
      difficulty="Intermediate"
      objective="Inject a JavaScript payload into the guestbook to execute an alert box in the browser."
      scope="Simulated Web Environment"
      target="http://target.lab"
      hints={[
        "The guestbook displays user messages exactly as they are submitted, without encoding HTML tags.",
        "Try wrapping JavaScript code inside standard HTML script tags.",
        "Your payload should look like: <script>alert(1)</script>"
      ]}
      flag="ZT{xss_p4yl04d_f1r3d}"
      explanation={
        <>
          <p className="mb-4">
            Stored Cross-Site Scripting (XSS) occurs when a web application gathers input from a user, stores it in a database, and then displays it to other users without properly escaping or sanitizing it.
          </p>
          <p>
            When you submitted <code>&lt;script&gt;alert(1)&lt;/script&gt;</code>, the browser interpreted it as legitimate code rather than text. If a real attacker did this, they could inject code that steals session cookies from any user who views the page!
          </p>
        </>
      }
      remediation={
        <p>
          Always encode user input on output. Context-aware output encoding (like HTML entity encoding) ensures that characters like <code>&lt;</code> are transformed into safe representations like <code>&amp;lt;</code>, so the browser renders them as text instead of executing them as code. Modern frameworks like React do this automatically unless explicitly bypassed (e.g., via <code>dangerouslySetInnerHTML</code>).
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
