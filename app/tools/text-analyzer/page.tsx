'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TextAnalyzerPage() {
  const [text, setText] = useState('');
  const [metrics, setMetrics] = useState({
    chars: 0,
    charsNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    bytes: 0,
    readingTime: 0, // in minutes
  });

  useEffect(() => {
    if (!text) {
      setMetrics({
        chars: 0,
        charsNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        bytes: 0,
        readingTime: 0,
      });
      return;
    }

    // Characters
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s+/g, '').length;

    // Words
    const wordsMatch = text.match(/\b[-?(\w+)?]+\b/gi);
    const words = wordsMatch ? wordsMatch.length : 0;

    // Sentences
    const sentencesMatch = text.match(/[\w|\)][.?!]+(\s|$)/g);
    const sentences = sentencesMatch ? sentencesMatch.length : (text.trim() ? 1 : 0);

    // Paragraphs
    const paragraphsMatch = text.replace(/\n$/gm, '').split(/\n/);
    const paragraphs = paragraphsMatch.filter(p => p.trim().length > 0).length;

    // Bytes (UTF-8)
    const bytes = new Blob([text]).size;

    // Reading time (assume 225 words per minute)
    const readingTime = Math.ceil(words / 225);

    setMetrics({
      chars,
      charsNoSpaces,
      words,
      sentences,
      paragraphs,
      bytes,
      readingTime,
    });
  }, [text]);

  const clearText = () => setText('');

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Content Utility
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Text Analyzer</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Deep metrics for your text. Calculate exact words, characters, sentences, and UTF-8 byte size instantly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md flex flex-col overflow-hidden h-[600px]">
            <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)] flex justify-between items-center shrink-0">
              <h3 className="text-white font-semibold">Input Text</h3>
              <button
                onClick={clearText}
                className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-red-500/20 hover:text-red-400 border border-[rgba(255,255,255,0.1)] rounded text-[rgb(var(--c-mute))] text-sm transition-colors"
              >
                Clear
              </button>
            </div>
            
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your text here..."
              className="flex-grow p-6 bg-transparent text-white font-mono text-base leading-relaxed focus:outline-none resize-none custom-scrollbar whitespace-pre-wrap"
              spellCheck="false"
            />
          </div>

          <div className="lg:col-span-1 space-y-4">
            
            <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6">
              <h3 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-2">Word Count</h3>
              <div className="text-4xl font-display font-bold text-white">{metrics.words.toLocaleString()}</div>
            </div>

            <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6">
              <h3 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-2">Character Count</h3>
              <div className="flex items-end gap-3">
                <div className="text-4xl font-display font-bold text-white">{metrics.chars.toLocaleString()}</div>
                <div className="text-[rgb(var(--c-mute))] pb-1 text-sm">with spaces</div>
              </div>
              <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.05)] flex items-end gap-3">
                <div className="text-2xl font-display font-bold text-white/80">{metrics.charsNoSpaces.toLocaleString()}</div>
                <div className="text-[rgb(var(--c-mute))] pb-0.5 text-sm">without spaces</div>
              </div>
            </div>

            <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Sentences</h3>
                <div className="text-2xl font-bold text-white">{metrics.sentences.toLocaleString()}</div>
              </div>
              <div>
                <h3 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">Paragraphs</h3>
                <div className="text-2xl font-bold text-white">{metrics.paragraphs.toLocaleString()}</div>
              </div>
            </div>

            <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6">
              <h3 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-[rgb(var(--c-accent))]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Est. Reading Time
              </h3>
              <div className="text-2xl font-bold text-white">
                {metrics.readingTime} {metrics.readingTime === 1 ? 'minute' : 'minutes'}
              </div>
            </div>

            <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6">
              <h3 className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                Size (UTF-8 Bytes)
              </h3>
              <div className="text-2xl font-mono font-bold text-[rgb(var(--c-accent))]">
                {metrics.bytes.toLocaleString()} Bytes
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
