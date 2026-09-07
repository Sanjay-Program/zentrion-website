'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CaseConverterPage() {
  const [inputText, setInputText] = useState('');

  // Tokenize the input text into words
  const getWords = (str: string) => {
    if (!str) return [];
    return str
      .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase or PascalCase to spaces
      .replace(/[_-]/g, ' ') // snake or kebab to spaces
      .replace(/[^a-zA-Z0-9\s]/g, '') // remove special chars
      .split(/\s+/)
      .filter(word => word.length > 0);
  };

  const toCamelCase = (words: string[]) => {
    return words.map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join('');
  };

  const toPascalCase = (words: string[]) => {
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
  };

  const toSnakeCase = (words: string[]) => {
    return words.map(word => word.toLowerCase()).join('_');
  };

  const toKebabCase = (words: string[]) => {
    return words.map(word => word.toLowerCase()).join('-');
  };

  const toConstantCase = (words: string[]) => {
    return words.map(word => word.toUpperCase()).join('_');
  };

  const toTrainCase = (words: string[]) => {
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('-');
  };

  const toTitleCase = (words: string[]) => {
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };

  const toSentenceCase = (words: string[]) => {
    if (words.length === 0) return '';
    const sentence = words.join(' ').toLowerCase();
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  };

  const toAlternatingCase = (str: string) => {
    return str.split('').map((char, i) => i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()).join('');
  };

  const toSpongeBobCase = (str: string) => {
    return str.split('').map(char => Math.random() > 0.5 ? char.toLowerCase() : char.toUpperCase()).join('');
  };

  const words = getWords(inputText);

  const cases = [
    { label: 'camelCase', value: toCamelCase(words) },
    { label: 'PascalCase', value: toPascalCase(words) },
    { label: 'snake_case', value: toSnakeCase(words) },
    { label: 'kebab-case', value: toKebabCase(words) },
    { label: 'CONSTANT_CASE', value: toConstantCase(words) },
    { label: 'Train-Case', value: toTrainCase(words) },
    { label: 'Title Case', value: toTitleCase(words) },
    { label: 'Sentence case', value: toSentenceCase(words) },
    { label: 'UPPERCASE', value: inputText.toUpperCase() },
    { label: 'lowercase', value: inputText.toLowerCase() },
    { label: 'aLtErNaTiNg cAsE', value: toAlternatingCase(inputText) },
    { label: 'sPoNgEbOb cAsE', value: toSpongeBobCase(inputText), hideCopy: true }, // Randomized, copy would just copy whatever was last generated
  ];

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            Developer Utility
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">String Case Converter</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Instantly convert strings into 12 different programming casing formats.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-8 mb-12">
          <label className="block text-sm font-semibold text-white mb-3">Input String</label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your string here (e.g. Hello World or hello-world)..."
            className="w-full px-4 py-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono text-lg"
            spellCheck="false"
          />
        </div>

        {inputText && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cases.map((c, idx) => (
              <div key={idx} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-4 flex justify-between items-center group hover:bg-[rgba(255,255,255,0.04)] transition-colors">
                <div className="overflow-hidden pr-4">
                  <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">{c.label}</div>
                  <div className="font-mono text-white text-lg truncate">
                    {c.value}
                  </div>
                </div>
                {!c.hideCopy && (
                  <button
                    onClick={() => copyToClipboard(c.value)}
                    className="p-2 text-[rgb(var(--c-mute))] hover:text-white bg-[rgba(255,255,255,0.05)] rounded-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all shrink-0"
                    title="Copy"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
