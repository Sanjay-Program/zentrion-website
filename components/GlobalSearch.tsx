'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type SearchResult = {
  title: string;
  description: string;
  url: string;
  type: string;
};

export default function GlobalSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [index, setIndex] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = index.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        (item.description && item.description.toLowerCase().includes(lowerQuery))
    );
    
    setResults(filtered.slice(0, 8)); // limit to 8 results
  }, [query, index]);

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
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-void/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Search Modal */}
      <div className="relative w-full max-w-2xl bg-[#0a0a0f] border border-line rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 py-4 border-b border-line">
          <svg className="w-5 h-5 text-mute mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none text-ink placeholder:text-mute focus:outline-none focus:ring-0 text-lg"
            placeholder="Search guides, tools, labs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="text-xs font-mono text-mute bg-white/5 hover:bg-white/10 px-2 py-1 rounded border border-line transition-colors"
          >
            ESC
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {isLoading ? (
            <div className="p-4 text-center text-mute text-sm">Loading index...</div>
          ) : query && results.length === 0 ? (
            <div className="p-8 text-center text-mute">
              <p>No results found for &quot;{query}&quot;</p>
              <p className="text-sm mt-2">Try searching for &quot;nmap&quot;, &quot;dns&quot;, or &quot;linux&quot;</p>
            </div>
          ) : results.length > 0 ? (
            <ul className="space-y-1">
              {results.map((result, i) => (
                <li key={i}>
                  <Link 
                    href={result.url} 
                    onClick={onClose}
                    className="flex flex-col p-3 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-ink group-hover:text-cyan transition-colors">
                        {result.title}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-mute border border-line">
                        {result.type}
                      </span>
                    </div>
                    {result.description && (
                      <span className="text-sm text-mute mt-1 line-clamp-1">
                        {result.description}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4">
              <p className="text-xs font-mono text-mute uppercase tracking-wider mb-3 px-2">Quick Links</p>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/guides" onClick={onClose} className="p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-line flex items-center gap-2 text-sm text-mute hover:text-ink">
                  <span className="text-cyan">→</span> Explore Security Guides
                </Link>
                <Link href="/tools" onClick={onClose} className="p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-line flex items-center gap-2 text-sm text-mute hover:text-ink">
                  <span className="text-cyan">→</span> Free Security Tools
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
