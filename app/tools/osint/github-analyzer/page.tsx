'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function GithubAnalyzerPage() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/osint/github?query=${encodeURIComponent(username)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to analyze GitHub profile.');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[rgb(var(--c-accent))] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-12 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.05)] border border-[var(--c-glass-border)] text-sm font-bold uppercase tracking-wider mb-4">
            🐙 OSINT Intelligence
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">GitHub Analyzer</h1>
          <p className="text-xl text-[rgb(var(--c-mute))] max-w-2xl">
            Search for a GitHub username to extract public profile intelligence, follower statistics, and repository metrics.
          </p>
        </div>

        <form onSubmit={handleAnalyze} className="max-w-3xl mb-12 relative flex items-center">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub Username (e.g. torvalds)"
            className="w-full bg-[rgba(255,255,255,0.02)] border border-[var(--c-glass-border)] rounded-2xl px-6 py-5 text-lg outline-none focus:border-[rgb(var(--c-accent))] focus:bg-[rgba(255,255,255,0.05)] transition-all pr-48 placeholder:text-[rgb(var(--c-mute))]"
            required
          />
          <button
            type="submit"
            disabled={loading || !username}
            className="absolute right-2 px-8 py-3.5 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing...' : 'Analyze Profile'}
          </button>
        </form>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 mb-8 max-w-3xl flex items-start gap-3">
             <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             <div>{error}</div>
          </div>
        )}

        {result && (
          <div className="glass-card rounded-3xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] overflow-hidden max-w-4xl relative group">
             <div className="h-32 bg-gradient-to-r from-[rgb(var(--c-void))] via-[rgba(255,255,255,0.05)] to-[rgb(var(--c-void))] border-b border-[var(--c-glass-border)]"></div>
             
             <div className="px-8 pb-8">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 mb-8 relative z-10">
                   <div className="w-32 h-32 rounded-2xl border-4 border-[var(--c-glass-bg)] shadow-xl overflow-hidden bg-[var(--c-void)] shrink-0">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={result.avatar_url} alt={`${result.username}'s avatar`} className="w-full h-full object-cover" />
                   </div>
                   
                   <div className="flex-grow">
                     <h2 className="text-3xl font-bold font-display">{result.name || result.username}</h2>
                     <p className="text-[rgb(var(--c-mute))] text-lg font-mono">@{result.username}</p>
                   </div>
                   
                   <a href={result.profile_url} target="_blank" rel="noopener noreferrer" className="shrink-0 px-6 py-3 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] rounded-xl font-bold transition-all flex items-center gap-2">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                     View on GitHub
                   </a>
                </div>

                {result.bio && (
                  <p className="text-lg mb-8 max-w-2xl">{result.bio}</p>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="bg-[rgba(255,255,255,0.02)] border border-[var(--c-glass-border)] rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold font-mono text-white mb-1">{result.public_repos}</div>
                    <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-bold">Repositories</div>
                  </div>
                  <div className="bg-[rgba(255,255,255,0.02)] border border-[var(--c-glass-border)] rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold font-mono text-white mb-1">{result.followers}</div>
                    <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-bold">Followers</div>
                  </div>
                  <div className="bg-[rgba(255,255,255,0.02)] border border-[var(--c-glass-border)] rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold font-mono text-white mb-1">{result.following}</div>
                    <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-bold">Following</div>
                  </div>
                  <div className="bg-[rgba(255,255,255,0.02)] border border-[var(--c-glass-border)] rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold font-mono text-white mb-1">{result.public_gists}</div>
                    <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-bold">Gists</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {result.company && (
                    <div className="flex items-center gap-3 text-[rgb(var(--c-mute))]">
                      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m3-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                      <span className="truncate">{result.company}</span>
                    </div>
                  )}
                  {result.location && (
                    <div className="flex items-center gap-3 text-[rgb(var(--c-mute))]">
                      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span className="truncate">{result.location}</span>
                    </div>
                  )}
                  {result.blog && (
                    <div className="flex items-center gap-3 text-[rgb(var(--c-mute))]">
                      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      <a href={result.blog.startsWith('http') ? result.blog : `https://${result.blog}`} target="_blank" rel="noopener noreferrer" className="truncate hover:text-[rgb(var(--c-accent))] transition-colors">
                        {result.blog}
                      </a>
                    </div>
                  )}
                  {result.twitter_username && (
                    <div className="flex items-center gap-3 text-[rgb(var(--c-mute))]">
                      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                      <a href={`https://twitter.com/${result.twitter_username}`} target="_blank" rel="noopener noreferrer" className="truncate hover:text-[rgb(var(--c-accent))] transition-colors">
                        @{result.twitter_username}
                      </a>
                    </div>
                  )}
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
