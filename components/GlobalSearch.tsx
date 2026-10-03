'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import type { FuseResult } from 'fuse.js';
import { motion, AnimatePresence } from 'framer-motion';

type SearchResult = {
  title: string;
  description: string;
  url: string;
  type: string;
};

// Helper to highlight matched text from Fuse.js results
const HighlightMatch = ({ text, matches }: { text: string, matches?: readonly { indices: readonly [number, number][] }[] }) => {
  if (!matches || matches.length === 0) return <span>{text}</span>;
  
  // Just use the first match for simplicity
  const match = matches[0];
  if (!match || !match.indices) return <span>{text}</span>;

  let lastIndex = 0;
  const parts = [];

  match.indices.forEach(([start, end], i) => {
    if (start > lastIndex) {
      parts.push(<span key={`text-${i}`}>{text.slice(lastIndex, start)}</span>);
    }
    parts.push(
      <span key={`match-${i}`} className="text-cyan bg-cyan/10 font-bold px-0.5 rounded">
        {text.slice(start, end + 1)}
      </span>
    );
    lastIndex = end + 1;
  });

  if (lastIndex < text.length) {
    parts.push(<span key="end">{text.slice(lastIndex)}</span>);
  }

  return <>{parts}</>;
};

export default function GlobalSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FuseResult<SearchResult>[]>([]);
  const [index, setIndex] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Initialize Fuse instance
  const fuse = useMemo(() => {
    return new Fuse(index, {
      keys: [
        { name: 'title', weight: 0.7 },
        { name: 'description', weight: 0.3 }
      ],
      includeMatches: true,
      threshold: 0.4, // Fuzzy threshold (0.0 is perfect match, 1.0 is anything)
      distance: 100,
      ignoreLocation: true,
    });
  }, [index]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetch('/search-index.json')
        .then((res) => res.json())
        .then((data) => {
          setIndex(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load search index', err);
          setIsLoading(false);
        });
      
      // Focus input on open
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
      setIsAnalyzing(false);
    }
  }, [isOpen]);

  // Simulate Neural Analysis Delay
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsAnalyzing(false);
      return;
    }

    setIsAnalyzing(true);
    
    // Perform the actual search
    const searchResults = fuse.search(query).slice(0, 8);

    // Simulate AI processing time
    const timer = setTimeout(() => {
      setResults(searchResults);
      setIsAnalyzing(false);
    }, Math.random() * 200 + 150); // 150-350ms delay

    return () => clearTimeout(timer);
  }, [query, fuse]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md" 
          onClick={onClose}
        />
        
        {/* Search Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#05070d]/90 backdrop-blur-xl border border-cyan/30 rounded-2xl shadow-[0_0_50px_rgba(47,107,255,0.15)] overflow-hidden"
        >
          {/* Cyberpunk Top Bar Accent */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-50"></div>

          <div className="flex items-center px-6 py-5 border-b border-white/5 relative">
            <svg className="w-6 h-6 text-cyan mr-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-transparent border-none text-white placeholder:text-gray-500 focus:outline-none focus:ring-0 text-xl font-display tracking-wide"
              placeholder="Ask the AI (e.g. 'SQL Injection')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              onClick={onClose}
              className="text-xs font-mono text-mute bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-md border border-white/10 transition-colors ml-4"
            >
              ESC
            </button>
          </div>

          <div className="min-h-[300px] max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
            
            {/* Neural Processing State */}
            {isAnalyzing && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex flex-col items-center justify-center h-48 space-y-4"
              >
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-2 border-cyan/20 rounded-full"></div>
                  <div className="absolute inset-0 border-2 border-cyan rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-2 border-2 border-purple-500/50 rounded-full border-b-transparent animate-[spin_1.5s_linear_reverse_infinite]"></div>
                </div>
                <div className="text-cyan font-mono text-sm uppercase tracking-widest animate-pulse">
                  Neural Mapping...
                </div>
                <div className="text-xs text-mute font-mono">
                  Vectorizing semantic query parameters
                </div>
              </motion.div>
            )}

            {/* Zero State / Suggestions */}
            {!query && !isAnalyzing && !isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4">
                <div className="flex items-center gap-2 mb-6">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-xs font-mono text-purple-400 uppercase tracking-wider">AI Suggestions</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { label: "Analyze Network Vulnerabilities", query: "nmap scanning" },
                    { label: "Bypass Authentication", query: "sql injection lab" },
                    { label: "Crack Encrypted Hashes", query: "john the ripper" },
                    { label: "Investigate Malware", query: "malware analysis" }
                  ].map((suggestion, i) => (
                    <button 
                      key={i}
                      onClick={() => setQuery(suggestion.query)}
                      className="text-left p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan/30 transition-all group flex items-start justify-between"
                    >
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {suggestion.label}
                      </span>
                      <span className="text-cyan opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* No Results State */}
            {query && !isAnalyzing && results.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-48 text-center p-8">
                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-white font-medium mb-1">No semantic matches found</p>
                <p className="text-sm text-mute">The neural network couldn't find matches for &quot;{query}&quot;. Try adjusting your parameters.</p>
              </motion.div>
            )}

            {/* Search Results */}
            {!isAnalyzing && results.length > 0 && (
              <motion.ul 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05 }
                  }
                }}
                className="space-y-2"
              >
                {results.map((result, i) => (
                  <motion.li 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <Link 
                      href={result.item.url} 
                      onClick={onClose}
                      className="flex flex-col p-4 rounded-xl border border-transparent hover:border-cyan/30 hover:bg-cyan/5 transition-all group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      
                      <div className="flex items-center justify-between mb-1 relative z-10">
                        <span className="font-medium text-white group-hover:text-cyan transition-colors">
                          <HighlightMatch 
                            text={result.item.title} 
                            matches={result.matches?.filter((m: any) => m.key === 'title')} 
                          />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-void border border-line text-cyan/70 group-hover:border-cyan/30 group-hover:text-cyan transition-colors">
                          {result.item.type}
                        </span>
                      </div>
                      
                      {result.item.description && (
                        <span className="text-sm text-gray-400 line-clamp-1 relative z-10 group-hover:text-gray-300 transition-colors">
                          <HighlightMatch 
                            text={result.item.description} 
                            matches={result.matches?.filter((m: any) => m.key === 'description')} 
                          />
                        </span>
                      )}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>
          
          {/* Footer Bar */}
          <div className="px-6 py-3 border-t border-white/5 bg-black/40 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-mute uppercase tracking-widest">Powered by</span>
              <span className="text-[10px] font-mono text-cyan font-bold uppercase tracking-widest">Zentrion Neural Engine v4.0</span>
            </div>
            <div className="text-[10px] font-mono text-mute hidden sm:block">
              Results ranked by semantic relevance
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
