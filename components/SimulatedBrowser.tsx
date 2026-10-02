'use client';

import React, { useState, useEffect } from 'react';

export interface SimulatedBrowserProps {
  initialUrl?: string;
  routes: Record<string, React.FC<any>>;
  className?: string;
}

export function SimulatedBrowser({
  initialUrl = 'http://target.lab',
  routes,
  className = ''
}: SimulatedBrowserProps) {
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [inputUrl, setInputUrl] = useState(initialUrl);
  const [history, setHistory] = useState<string[]>([initialUrl]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const navigate = (url: string) => {
    setCurrentUrl(url);
    setInputUrl(url);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(url);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(inputUrl);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      const prevUrl = history[historyIndex - 1];
      setCurrentUrl(prevUrl);
      setInputUrl(prevUrl);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      const nextUrl = history[historyIndex + 1];
      setCurrentUrl(nextUrl);
      setInputUrl(nextUrl);
    }
  };

  const refresh = () => {
    // Force re-render of the current route by temporarily setting it to a loading state if we wanted to
    // For now, just a dummy refresh
    const temp = currentUrl;
    setCurrentUrl('');
    setTimeout(() => setCurrentUrl(temp), 50);
  };

  // Find matching route, allowing for query parameters or just exact matches for now
  const urlObj = (() => {
    try {
      return new URL(currentUrl);
    } catch {
      try {
        return new URL('http://' + currentUrl);
      } catch {
        return null;
      }
    }
  })();

  const pathAndQuery = urlObj ? `${urlObj.pathname}${urlObj.search}` : currentUrl;
  
  let RouteComponent = routes[currentUrl] || routes[pathAndQuery] || routes[urlObj?.pathname || ''];
  
  if (!RouteComponent) {
    RouteComponent = () => (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <h2 className="text-2xl font-bold mb-2">404 Not Found</h2>
        <p className="text-mute">The requested URL {currentUrl} was not found on this server.</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col bg-surface border border-line rounded-lg overflow-hidden shadow-2xl h-[500px] ${className}`}>
      {/* Browser Chrome */}
      <div className="bg-surface/50 border-b border-line p-2 flex items-center gap-2">
        <div className="flex gap-1.5 px-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
        </div>
        
        <div className="flex gap-1 ml-2">
          <button 
            onClick={goBack} 
            disabled={historyIndex === 0}
            className="p-1.5 rounded hover:bg-white/5 text-mute disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button 
            onClick={goForward}
            disabled={historyIndex === history.length - 1}
            className="p-1.5 rounded hover:bg-white/5 text-mute disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <button 
            onClick={refresh}
            className="p-1.5 rounded hover:bg-white/5 text-mute"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"/><path d="M3 2v6h6"/></svg>
          </button>
        </div>

        <form onSubmit={handleUrlSubmit} className="flex-1 ml-2">
          <div className="relative flex items-center w-full bg-black/40 border border-line rounded px-3 py-1.5 text-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-mute mr-2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            <input 
              type="text" 
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-white/90"
            />
          </div>
        </form>
      </div>

      {/* Browser Viewport */}
      <div className="flex-1 bg-white text-black overflow-y-auto relative">
        {currentUrl ? <RouteComponent navigate={navigate} /> : null}
      </div>
    </div>
  );
}
