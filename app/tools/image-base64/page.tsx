'use client';

import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import Link from 'next/link';

export default function ImageBase64Page() {
  const [base64String, setBase64String] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPG, SVG, WEBP, etc.)');
      return;
    }

    // Optional: limit file size to avoid crashing browser with massive base64 strings
    if (file.size > 5 * 1024 * 1024) {
      setError('File is too large. Please upload an image smaller than 5MB.');
      return;
    }

    setError('');
    setFileName(file.name);
    setFileSize(file.size);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        setBase64String(e.target.result);
      }
    };
    reader.onerror = () => {
      setError('Error reading file.');
    };
    
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const copyToClipboard = () => {
    if (!base64String) return;
    navigator.clipboard.writeText(base64String);
  };

  const copyAsCss = () => {
    if (!base64String) return;
    const css = `background-image: url("${base64String}");`;
    navigator.clipboard.writeText(css);
  };

  const copyAsHtml = () => {
    if (!base64String) return;
    const html = `<img src="${base64String}" alt="${fileName}" />`;
    navigator.clipboard.writeText(html);
  };

  const clearAll = () => {
    setBase64String('');
    setFileName('');
    setFileSize(0);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Media Utility
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Image to Base64</h1>
          <p className="text-xl text-[rgb(var(--c-mute))] max-w-3xl">Convert local images into Base64 Data URIs securely in your browser without uploading to any server.</p>
        </div>

        {!base64String ? (
          <div 
            className={`glass-card rounded-3xl border-2 border-dashed ${isDragging ? 'border-[rgb(var(--c-accent))] bg-[rgba(255,255,255,0.05)]' : 'border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)]'} backdrop-blur-md p-16 text-center transition-all cursor-pointer hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.04)] mb-8`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div className="bg-[rgba(255,255,255,0.05)] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[rgb(var(--c-accent))]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Drag & Drop Image Here</h3>
            <p className="text-[rgb(var(--c-mute))] text-lg mb-6">or click to browse from your computer (max 5MB)</p>
            
            {error && (
              <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <div className="glass-card rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-start">
              
              <div className="w-full md:w-1/3 flex flex-col items-center">
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] relative flex items-center justify-center mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={base64String} alt={fileName} className="max-w-full max-h-full object-contain p-2" />
                </div>
                <h4 className="text-white font-bold text-center w-full truncate mb-1" title={fileName}>{fileName}</h4>
                <p className="text-[rgb(var(--c-mute))] text-sm">{formatSize(fileSize)}</p>
                
                <button
                  onClick={clearAll}
                  className="mt-6 px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-lg text-sm transition-colors w-full"
                >
                  Clear and Upload Another
                </button>
              </div>

              <div className="w-full md:w-2/3 flex flex-col h-full">
                <div className="flex flex-wrap gap-3 mb-4">
                  <button onClick={copyToClipboard} className="btn-primary py-2 px-4 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    Copy Raw Base64
                  </button>
                  <button onClick={copyAsHtml} className="px-4 py-2 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] text-white rounded-xl text-sm transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    Copy HTML Tag
                  </button>
                  <button onClick={copyAsCss} className="px-4 py-2 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] text-white rounded-xl text-sm transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Copy CSS bg
                  </button>
                </div>
                
                <div className="flex-grow bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)] rounded-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.05)] px-4 py-2 text-xs font-mono text-[rgb(var(--c-mute))] flex justify-between">
                    <span>Base64 Data URI</span>
                    <span>{base64String.length.toLocaleString()} characters</span>
                  </div>
                  <textarea
                    readOnly
                    value={base64String}
                    className="w-full h-full p-4 pt-10 bg-transparent text-[rgb(var(--c-accent))] font-mono text-sm leading-relaxed focus:outline-none resize-none custom-scrollbar break-all min-h-[300px]"
                    spellCheck="false"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
