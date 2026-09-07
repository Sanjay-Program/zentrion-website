'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface RegexMatch {
  match: string;
  index: number;
  groups: string[];
}

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('gm');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<RegexMatch[]>([]);
  const [error, setError] = useState('');
  const [highlightedHtml, setHighlightedHtml] = useState('');

  useEffect(() => {
    if (!pattern) {
      setMatches([]);
      setError('');
      setHighlightedHtml(testString.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      setError('');
      
      if (!testString) {
        setMatches([]);
        setHighlightedHtml('');
        return;
      }

      const newMatches: RegexMatch[] = [];
      let match;
      
      // We must reset lastIndex if it's a global regex to avoid weird state in React
      regex.lastIndex = 0;
      
      let safeCount = 0;
      const MAX_ITERATIONS = 5000;

      if (regex.global) {
        while ((match = regex.exec(testString)) !== null && safeCount < MAX_ITERATIONS) {
          if (match[0].length === 0) {
            regex.lastIndex++; // Prevent infinite loops on zero-length matches
          }
          newMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)
          });
          safeCount++;
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          newMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      }
      
      setMatches(newMatches);

      // Generate highlighted HTML
      if (newMatches.length > 0) {
        let html = '';
        let lastIndex = 0;
        
        newMatches.forEach((m, i) => {
          // Add text before match
          html += testString.substring(lastIndex, m.index).replace(/</g, '&lt;').replace(/>/g, '&gt;');
          // Add highlighted match (alternate colors)
          const colorClass = i % 2 === 0 ? 'bg-blue-500/40 text-blue-100' : 'bg-purple-500/40 text-purple-100';
          html += `<mark class="rounded px-0.5 ${colorClass} bg-opacity-60 text-white font-bold bg-transparent">${m.match.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</mark>`;
          lastIndex = m.index + m.match.length;
        });
        
        // Add remaining text
        html += testString.substring(lastIndex).replace(/</g, '&lt;').replace(/>/g, '&gt;');
        setHighlightedHtml(html);
      } else {
        setHighlightedHtml(testString.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
      }

    } catch (err: any) {
      setError(err.message);
      setMatches([]);
      setHighlightedHtml(testString.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
    }
  }, [pattern, flags, testString]);

  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ''));
    } else {
      setFlags(flags + flag);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Regex Tester</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Evaluate JavaScript Regular Expressions in real-time. Highlights matches and extracts capture groups.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-8 mb-8">
          
          <label className="block text-sm font-semibold text-white mb-3">Regular Expression</label>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-grow flex items-center bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl focus-within:border-[rgb(var(--c-accent))] focus-within:ring-1 focus-within:ring-[rgb(var(--c-accent))] transition-all overflow-hidden">
              <span className="pl-4 pr-2 text-[rgb(var(--c-accent))] font-mono font-bold text-xl">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                className="w-full py-4 bg-transparent text-white placeholder-[rgb(var(--c-mute))] focus:outline-none font-mono text-lg"
                spellCheck="false"
              />
              <span className="pr-4 pl-2 text-[rgb(var(--c-accent))] font-mono font-bold text-xl">/</span>
            </div>
            
            <div className="flex bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl p-1 shrink-0 h-14">
              <button 
                onClick={() => toggleFlag('g')}
                className={`w-12 rounded-lg font-mono font-bold transition-colors ${flags.includes('g') ? 'bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))]' : 'text-[rgb(var(--c-mute))] hover:text-white'}`}
                title="Global (g)"
              >g</button>
              <button 
                onClick={() => toggleFlag('m')}
                className={`w-12 rounded-lg font-mono font-bold transition-colors ${flags.includes('m') ? 'bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))]' : 'text-[rgb(var(--c-mute))] hover:text-white'}`}
                title="Multiline (m)"
              >m</button>
              <button 
                onClick={() => toggleFlag('i')}
                className={`w-12 rounded-lg font-mono font-bold transition-colors ${flags.includes('i') ? 'bg-[rgb(var(--c-accent))] text-[rgb(var(--c-void))]' : 'text-[rgb(var(--c-mute))] hover:text-white'}`}
                title="Case Insensitive (i)"
              >i</button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 font-mono text-sm">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-white">Test String</label>
              </div>
              <textarea
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                placeholder="Paste the text you want to test your regex against here..."
                className="w-full h-[300px] p-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono resize-none custom-scrollbar"
                spellCheck="false"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-white">Highlighted Matches</label>
                <span className="text-[rgb(var(--c-accent))] text-sm font-bold bg-[rgba(255,255,255,0.05)] px-2 py-0.5 rounded">{matches.length} Matches</span>
              </div>
              <div 
                className="w-full h-[300px] p-4 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] rounded-xl text-[rgba(255,255,255,0.7)] font-mono resize-none overflow-y-auto custom-scrollbar whitespace-pre-wrap break-words"
                dangerouslySetInnerHTML={{ __html: highlightedHtml || '<span class="italic opacity-50">No matches found...</span>' }}
              />
            </div>
          </div>
        </div>

        {matches.length > 0 && (
          <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md overflow-hidden">
            <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)]">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                Match Results & Capture Groups
              </h3>
            </div>
            <div className="bg-[rgba(0,0,0,0.2)] overflow-x-auto p-0 max-h-[400px] overflow-y-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] sticky top-0 backdrop-blur-md z-10">
                  <tr>
                    <th className="py-3 px-6 text-[rgb(var(--c-mute))] font-semibold text-xs uppercase tracking-wider w-16">#</th>
                    <th className="py-3 px-6 text-[rgb(var(--c-mute))] font-semibold text-xs uppercase tracking-wider">Match</th>
                    <th className="py-3 px-6 text-[rgb(var(--c-mute))] font-semibold text-xs uppercase tracking-wider">Index</th>
                    <th className="py-3 px-6 text-[rgb(var(--c-mute))] font-semibold text-xs uppercase tracking-wider">Groups</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                  {matches.map((m, idx) => (
                    <tr key={idx} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                      <td className="py-4 px-6 text-[rgb(var(--c-mute))] font-mono text-sm">{idx + 1}</td>
                      <td className="py-4 px-6 font-mono text-sm text-[rgb(var(--c-accent))] font-bold break-all">
                        {m.match}
                      </td>
                      <td className="py-4 px-6 text-white font-mono text-sm">
                        {m.index} - {m.index + m.match.length}
                      </td>
                      <td className="py-4 px-6 font-mono text-sm text-white">
                        {m.groups.length > 0 ? (
                          <div className="flex flex-col gap-1">
                            {m.groups.map((g, gIdx) => (
                              <div key={gIdx} className="bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded border border-[rgba(255,255,255,0.1)] inline-block w-fit">
                                <span className="text-[rgb(var(--c-mute))] mr-2 text-xs">Group {gIdx + 1}:</span>
                                {g || <span className="italic opacity-50">undefined</span>}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[rgb(var(--c-mute))] italic">No capture groups</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
