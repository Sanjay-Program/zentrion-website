'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SiteResult {
  site: string;
  url: string;
  status: string;
}

export default function UsernameFinderPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SiteResult[]>([]);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [totalChecked, setTotalChecked] = useState(0);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError('');
    setHasSearched(true);
    setResults([]);

    try {
      const res = await fetch(`/api/osint/username?query=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to check username.');
      }

      setResults(data.results.filter((r: SiteResult) => r.status === 'Found' || r.status === 'Manual Check'));
      setTotalChecked(data.total_checked || 0);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper to get platform logo based on site name
  const getLogoUrl = (siteName: string) => {
    const defaultLogo = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${siteName.toLowerCase().replace(/ /g, '')}.com&size=64`;
    // Hardcode a few tricky ones if needed, otherwise rely on Google Favicon API
    if (siteName === 'HackerNews') return 'https://news.ycombinator.com/favicon.ico';
    if (siteName === 'Twitch') return 'https://static.twitchcdn.net/assets/favicon-32-e29e246c157142c94346.png';
    return defaultLogo;
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Username Finder</h1>
          <p className="text-xl text-[rgb(var(--c-mute))] max-w-2xl mx-auto">
            Scan {totalChecked > 0 ? totalChecked : '70+'} social networks and developer platforms concurrently to find where a username is registered.
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-16 relative">
          <div className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a username (e.g. john_doe)"
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[var(--c-glass-border)] rounded-2xl px-6 py-5 text-lg outline-none focus:border-[rgb(var(--c-accent))] focus:bg-[rgba(255,255,255,0.05)] transition-all pr-40 placeholder:text-[rgb(var(--c-mute))]"
            />
            <button
              type="submit"
              disabled={loading || !query}
              className="absolute right-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  Scanning...
                </span>
              ) : 'Scan Network'}
            </button>
          </div>
        </form>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-center mb-8 max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {hasSearched && !loading && !error && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--c-glass-border)]">
              <h2 className="text-2xl font-display font-bold">
                Found Profiles <span className="text-[rgb(var(--c-accent))] ml-2">({results.length})</span>
              </h2>
              <div className="text-[rgb(var(--c-mute))] text-sm">
                Scanned {totalChecked} platforms
              </div>
            </div>

            {results.length === 0 ? (
              <div className="text-center py-20 bg-[rgba(255,255,255,0.02)] rounded-2xl border border-[var(--c-glass-border)]">
                <span className="text-4xl block mb-4">👻</span>
                <h3 className="text-xl font-bold mb-2">Ghost Account</h3>
                <p className="text-[rgb(var(--c-mute))]">We couldn't find anyone registered as "{query}" on these platforms.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {results.map((item, i) => (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[var(--c-glass-border)] hover:border-[rgb(var(--c-accent))] hover:bg-[rgba(255,255,255,0.05)] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0 p-2 shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={getLogoUrl(item.site)} 
                        alt={`${item.site} logo`} 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                           // Fallback to text if favicon fails
                           (e.target as HTMLElement).style.display = 'none';
                           (e.target as HTMLElement).parentElement!.innerHTML = `<span class="text-black font-bold text-xs">${item.site.substring(0,2)}</span>`;
                        }}
                      />
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-bold font-display text-sm truncate flex items-center gap-2">
                        {item.site}
                        {item.status.includes('Manual') && (
                           <span className="px-1.5 py-0.5 bg-yellow-500/20 text-yellow-500 rounded text-[0.6rem] uppercase tracking-wider">Manual Check</span>
                        )}
                      </div>
                      <div className="text-[rgb(var(--c-mute))] text-xs truncate group-hover:text-[rgb(var(--c-accent))] transition-colors">
                        View Profile &rarr;
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
