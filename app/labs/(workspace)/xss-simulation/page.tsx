'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { learningManager } from '@/lib/learning-state';

export default function XSSSimulationLab() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<{ id: number, text: string }[]>([]);
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setComments([
      { id: 1, text: "Great article on cybersecurity!" },
      { id: 2, text: "I found the SQL injection section very helpful." }
    ]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) return;

    const newComment = { id: Date.now(), text: comment };
    setComments([...comments, newComment]);

    // Check for XSS
    if (comment.includes('<script>') || comment.includes('onerror=') || comment.includes('javascript:')) {
      if (!completed) {
        setCompleted(true);
        learningManager.markLabCompleted('xss-simulation');
      }
      
      // Simulate execution (safely in our isolated lab)
      if (comment.includes('alert(')) {
        setTimeout(() => alert('XSS Executed! This is a simulated alert box representing an XSS attack.'), 100);
      }
    }

    setComment('');
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
          <h1 className="font-bold">XSS (Cross-Site Scripting) Simulation</h1>
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
                In this lab, you are analyzing a vulnerable comment section of a blog. The application reflects user input back to the page without proper sanitization.
              </p>
              <div className="bg-[rgba(0,0,0,0.3)] p-4 rounded-lg border border-[var(--c-glass-border)] mt-4">
                <h3 className="text-white font-semibold mb-2">Objective</h3>
                <p>Execute a Cross-Site Scripting (XSS) payload to trigger a JavaScript alert box.</p>
              </div>
              <div className="mt-8">
                <h3 className="text-white font-semibold mb-2">Hints</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Try submitting standard HTML tags like <code>&lt;b&gt;bold&lt;/b&gt;</code> to see if they render.</li>
                  <li>If tags render, try a <code>&lt;script&gt;</code> tag.</li>
                  <li>Example payload: <code>&lt;script&gt;alert(1)&lt;/script&gt;</code></li>
                </ul>
              </div>
              
              <div className="mt-8 border-t border-[var(--c-glass-border)] pt-6">
                <h3 className="text-white font-semibold mb-4">Related Resources</h3>
                <div className="flex flex-col gap-2">
                  <Link href="/guides/web/xss-tutorial" className="text-[rgb(var(--c-accent))] hover:underline text-xs flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Guide: XSS Attacks Explained
                  </Link>
                  <Link href="/tools/url-analyzer" className="text-[rgb(var(--c-accent))] hover:underline text-xs flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    Tool: URL Analyzer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Simulated Environment */}
        <div className="w-2/3 bg-white text-black flex flex-col relative overflow-hidden">
          {/* Mock Browser UI */}
          <div className="h-10 bg-gray-200 border-b border-gray-300 flex items-center px-4 gap-4 shrink-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 bg-white h-6 rounded px-3 text-xs text-gray-500 flex items-center border border-gray-300 shadow-inner">
              <svg className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              https://vulnerable-blog.local/post/1
            </div>
          </div>

          {/* Vulnerable App */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 font-serif">The State of Cybersecurity in 2026</h2>
              <p className="text-gray-600 mb-8 font-serif leading-relaxed">
                As AI capabilities expand, we are seeing a significant shift in attack vectors. Traditional attacks are being augmented by large language models...
              </p>
              
              <hr className="my-8 border-gray-300" />
              
              <h3 className="text-xl font-bold mb-6">Comments ({comments.length})</h3>
              
              <div className="space-y-6 mb-8">
                {comments.map((c) => (
                  <div key={c.id} className="bg-gray-50 p-4 rounded border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                        U
                      </div>
                      <span className="font-semibold text-sm">User_{c.id.toString().substring(0, 4)}</span>
                    </div>
                    {/* VULNERABILITY: React dangerouslySetInnerHTML used intentionally for the lab! */}
                    <div 
                      className="text-gray-700 text-sm"
                      dangerouslySetInnerHTML={{ __html: c.text }}
                    />
                  </div>
                ))}
              </div>

              <div className="bg-gray-100 p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="font-bold mb-4">Leave a Comment</h4>
                <form onSubmit={handleSubmit}>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full h-24 p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Share your thoughts..."
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition-colors text-sm"
                  >
                    Post Comment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
