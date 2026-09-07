'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HashGeneratorPage() {
  const [mode, setMode] = useState<'text' | 'file'>('text');
  const [textInput, setTextInput] = useState('');
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [algo, setAlgo] = useState('SHA-256');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ hash: string, size: number, algo: string } | null>(null);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileInput(e.target.files[0]);
    }
  };

  const generateHash = async () => {
    setError(null);
    setResult(null);
    
    try {
      let buffer: ArrayBuffer;
      let inputSize = 0;

      if (mode === 'text') {
        if (!textInput) throw new Error("Please enter some text.");
        buffer = new TextEncoder().encode(textInput);
        inputSize = buffer.byteLength;
      } else {
        if (!fileInput) throw new Error("Please select a file.");
        inputSize = fileInput.size;
        buffer = await fileInput.arrayBuffer();
      }

      setLoading(true);

      const hashBuffer = await crypto.subtle.digest(algo, buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      setResult({ hash: hashHex, size: inputSize, algo });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyHash = () => {
    if (result) navigator.clipboard.writeText(result.hash);
  };

  const downloadHash = () => {
    if (result) {
      const blob = new Blob([result.hash], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hash_${result.algo.toLowerCase()}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Hash Generator</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Compute SHA-1, SHA-256, SHA-384, and SHA-512 hashes for text and files securely in your browser.</p>
          <div className="mt-4 flex gap-2">
            <span className="inline-block px-3 py-1 bg-[rgba(255,255,255,0.05)] text-xs font-mono tracking-wider rounded-md border border-[rgba(255,255,255,0.1)]">
              LOCAL ONLY
            </span>
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 md:p-8">
          
          <div className="flex gap-4 mb-6">
            <button 
              onClick={() => setMode('text')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${mode === 'text' ? 'bg-[rgb(var(--c-accent))] text-white' : 'bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)]'}`}
            >
              Text Input
            </button>
            <button 
              onClick={() => setMode('file')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${mode === 'file' ? 'bg-[rgb(var(--c-accent))] text-white' : 'bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)]'}`}
            >
              File Input
            </button>
          </div>

          <div className="mb-6">
            {mode === 'text' ? (
              <textarea 
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Enter text to hash here..."
                className="w-full h-32 bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 focus:outline-none focus:border-[rgb(var(--c-accent))] transition-colors"
              />
            ) : (
              <div className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] border-dashed rounded-lg p-12 text-center">
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  className="block w-full text-sm text-[rgb(var(--c-mute))] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[rgb(var(--c-accent))] file:text-white hover:file:bg-blue-600"
                />
                {fileInput && <p className="mt-4 text-[rgb(var(--c-accent))] font-mono text-sm">Selected: {fileInput.name} ({formatBytes(fileInput.size)})</p>}
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-grow">
              <label className="block text-sm font-medium mb-2">Algorithm</label>
              <select 
                value={algo}
                onChange={(e) => setAlgo(e.target.value)}
                className="w-full bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 focus:outline-none focus:border-[rgb(var(--c-accent))] transition-colors"
              >
                <option value="SHA-256">SHA-256</option>
                <option value="SHA-512">SHA-512</option>
                <option value="SHA-384">SHA-384</option>
                <option value="SHA-1">SHA-1 (Insecure)</option>
              </select>
            </div>
            <div className="flex items-end gap-4">
              <button 
                onClick={() => { setTextInput(''); setFileInput(null); setResult(null); setError(null); }}
                className="px-6 py-3 rounded-lg border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              >
                Clear
              </button>
              <button 
                onClick={generateHash}
                disabled={loading}
                className="px-8 py-3 bg-[rgb(var(--c-accent))] text-white font-bold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Computing...' : 'Generate Hash'}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 mb-6">
              {error}
            </div>
          )}

          {result && (
            <div className="p-6 bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.05)] rounded-xl">
              <h4 className="text-[rgb(var(--c-mute))] text-sm uppercase tracking-wider mb-2 font-bold">Result ({result.algo})</h4>
              <div className="font-mono text-xl md:text-2xl text-[rgb(var(--c-accent))] break-all mb-4 selection:bg-[rgb(var(--c-accent))] selection:text-white">
                {result.hash}
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span className="text-sm text-[rgb(var(--c-mute))]">Input Size: {formatBytes(result.size)}</span>
                <div className="flex gap-2">
                  <button onClick={copyHash} className="text-xs font-bold uppercase tracking-wider bg-[rgba(255,255,255,0.1)] px-3 py-1.5 rounded hover:bg-[rgb(var(--c-accent))] transition-colors">
                    Copy Hash
                  </button>
                  <button onClick={downloadHash} className="text-xs font-bold uppercase tracking-wider bg-[rgba(255,255,255,0.1)] px-3 py-1.5 rounded hover:bg-[rgb(var(--c-accent))] transition-colors">
                    Download .txt
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
