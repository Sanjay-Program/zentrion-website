'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LoremIpsumPage() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [output, setOutput] = useState('');
  const [startWithLorem, setStartWithLorem] = useState(true);

  const LOREM_WORDS = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
    'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
    'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut',
    'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'dolor', 'in',
    'reprehenderit', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur',
    'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui',
    'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const generateWords = (num: number, startLorem: boolean) => {
    let words = [];
    if (startLorem && num > 0) {
      words.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet');
      num -= 5;
    }
    
    for (let i = 0; i < num; i++) {
      const randomWord = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
      words.push(randomWord);
    }
    return words.join(' ');
  };

  const generateSentences = (num: number, startLorem: boolean) => {
    let sentences = [];
    for (let i = 0; i < num; i++) {
      // Sentences are typically 5 to 15 words
      const wordCount = Math.floor(Math.random() * 11) + 5;
      let sentence = generateWords(wordCount, i === 0 ? startLorem : false);
      
      // Capitalize first letter and add period
      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
      sentences.push(sentence);
    }
    return sentences.join(' ');
  };

  const generateParagraphs = (num: number, startLorem: boolean) => {
    let paragraphs = [];
    for (let i = 0; i < num; i++) {
      // Paragraphs are typically 3 to 7 sentences
      const sentenceCount = Math.floor(Math.random() * 5) + 3;
      paragraphs.push(generateSentences(sentenceCount, i === 0 ? startLorem : false));
    }
    return paragraphs.join('\n\n');
  };

  const handleGenerate = () => {
    let generated = '';
    const safeCount = Math.min(Math.max(1, count), 1000); // limit to 1000
    
    if (type === 'words') {
      generated = generateWords(safeCount, startWithLorem);
    } else if (type === 'sentences') {
      generated = generateSentences(safeCount, startWithLorem);
    } else {
      generated = generateParagraphs(safeCount, startWithLorem);
    }
    
    setOutput(generated);
  };

  // Generate on initial load
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, count, startWithLorem]);

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            Design Utility
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Lorem Ipsum Generator</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Generate random placeholder text for your mockups, wireframes, and prototypes instantly.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-8 mb-8">
          
          <div className="flex flex-col sm:flex-row gap-6 items-end">
            
            <div className="w-full sm:w-1/3">
              <label className="block text-sm font-semibold text-white mb-2">Count</label>
              <input
                type="number"
                min="1"
                max="1000"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:outline-none focus:border-[rgb(var(--c-accent))]"
              />
            </div>

            <div className="w-full sm:w-1/3">
              <label className="block text-sm font-semibold text-white mb-2">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-4 py-3 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:outline-none focus:border-[rgb(var(--c-accent))] appearance-none"
              >
                <option value="paragraphs">Paragraphs</option>
                <option value="sentences">Sentences</option>
                <option value="words">Words</option>
              </select>
            </div>

            <div className="w-full sm:w-1/3 flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={startWithLorem}
                    onChange={(e) => setStartWithLorem(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`block w-10 h-6 rounded-full transition-colors ${startWithLorem ? 'bg-[rgb(var(--c-accent))]' : 'bg-[rgba(255,255,255,0.1)]'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${startWithLorem ? 'translate-x-4' : ''}`}></div>
                </div>
                <span className="text-sm text-white group-hover:text-[rgb(var(--c-accent))] transition-colors">
                  Start with "Lorem ipsum..."
                </span>
              </label>

              <button
                onClick={handleGenerate}
                className="btn-primary py-2.5 px-4 w-full"
              >
                Generate New
              </button>
            </div>

          </div>

        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md flex flex-col overflow-hidden h-[600px]">
          <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)] flex justify-between items-center shrink-0">
            <h3 className="text-white font-semibold">Generated Output</h3>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] text-white rounded text-sm transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              Copy Text
            </button>
          </div>
          
          <div className="flex-grow p-6 bg-[rgba(0,0,0,0.2)] overflow-y-auto custom-scrollbar">
            <div className="text-white text-lg leading-relaxed whitespace-pre-wrap font-serif">
              {output}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
