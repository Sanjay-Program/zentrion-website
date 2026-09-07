'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';

interface HashResult {
  algorithm: string;
  hash: string;
  timeMs: number;
}

export default function FileHasherPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHashing, setIsHashing] = useState(false);
  const [results, setResults] = useState<HashResult[]>([]);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (selectedFile: File) => {
    setFile(selectedFile);
    setResults([]);
    setError('');
  };

  const clearFile = () => {
    setFile(null);
    setResults([]);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Convert ArrayBuffer to Hex String
  const bufferToHex = (buffer: ArrayBuffer) => {
    const hashArray = Array.from(new Uint8Array(buffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const calculateHashes = async () => {
    if (!file) return;

    setIsHashing(true);
    setResults([]);
    setError('');

    try {
      // For very large files, this approach (reading whole file into memory) might crash the browser.
      // A more robust approach uses streams, but for a simple tool, we'll try reading it as an ArrayBuffer.
      // We will warn the user if it's too big (e.g., > 500MB).
      if (file.size > 500 * 1024 * 1024) {
        throw new Error('File is too large (>500MB) to hash entirely in browser memory.');
      }

      const algorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
      const newResults: HashResult[] = [];

      const arrayBuffer = await file.arrayBuffer();

      for (const algo of algorithms) {
        const start = performance.now();
        const hashBuffer = await window.crypto.subtle.digest(algo, arrayBuffer);
        const end = performance.now();
        
        newResults.push({
          algorithm: algo,
          hash: bufferToHex(hashBuffer),
          timeMs: Math.round(end - start)
        });
      }

      setResults(newResults);
    } catch (err: any) {
      console.error('Hashing failed:', err);
      setError(err.message || 'An error occurred while hashing the file.');
    } finally {
      setIsHashing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">File Hash Calculator</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Calculate SHA-256, SHA-512, and other hashes of local files securely in your browser. No uploads required.</p>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-8 mb-8">
          
          {!file ? (
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                isDragging 
                  ? 'border-[rgb(var(--c-accent))] bg-[rgb(var(--c-accent))]/5' 
                  : 'border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.04)]'
              }`}
            >
              <svg className={`w-12 h-12 mb-4 transition-colors ${isDragging ? 'text-[rgb(var(--c-accent))]' : 'text-[rgb(var(--c-mute))]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              <h3 className="text-xl font-bold text-white mb-2">Drag & Drop File Here</h3>
              <p className="text-[rgb(var(--c-mute))] text-sm">or click to browse from your device</p>
              <p className="text-[rgb(var(--c-mute))] text-xs mt-4 opacity-70">Max recommended size: 500MB (Processed locally)</p>
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileInput}
              />
            </div>
          ) : (
            <div className="bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.05)] rounded-xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="w-12 h-12 rounded bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-white font-bold truncate text-lg" title={file.name}>{file.name}</h3>
                    <p className="text-[rgb(var(--c-mute))] text-sm font-mono mt-0.5">{formatBytes(file.size)} • {file.type || 'Unknown Type'}</p>
                  </div>
                </div>
                <button 
                  onClick={clearFile}
                  className="p-2 text-[rgb(var(--c-mute))] hover:text-white bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] rounded-lg transition-colors shrink-0"
                  title="Remove File"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="mt-8 flex justify-center sm:justify-start">
                <button
                  onClick={calculateHashes}
                  disabled={isHashing}
                  className="btn-primary py-3 px-8 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]"
                >
                  {isHashing ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Hashing...
                    </span>
                  ) : (
                    'Calculate Hashes'
                  )}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
              <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <p className="text-red-400 font-semibold text-sm">{error}</p>
            </div>
          )}

        </div>

        {results.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
            <h3 className="text-lg font-bold text-white mb-2 px-1">Hash Results</h3>
            {results.map((res, idx) => (
              <div key={idx} className="glass-card rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md overflow-hidden flex flex-col sm:flex-row group transition-colors hover:bg-[rgba(255,255,255,0.03)]">
                <div className="sm:w-32 px-6 py-4 border-b sm:border-b-0 sm:border-r border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.03)] flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-center shrink-0">
                  <div className="text-[rgb(var(--c-accent))] font-bold tracking-wider">{res.algorithm}</div>
                  <div className="text-[rgb(var(--c-mute))] text-xs font-mono">{res.timeMs}ms</div>
                </div>
                <div className="p-4 sm:p-6 flex-grow flex items-center justify-between gap-4 overflow-hidden">
                  <div className="font-mono text-white text-sm sm:text-base break-all">
                    {res.hash}
                  </div>
                  <button
                    onClick={() => copyToClipboard(res.hash)}
                    className="p-2 text-[rgb(var(--c-mute))] hover:text-white bg-[rgba(255,255,255,0.05)] rounded-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all shrink-0"
                    title="Copy hash"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
