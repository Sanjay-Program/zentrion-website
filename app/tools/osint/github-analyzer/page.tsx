'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function GithubAnalyzerPage() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  // Handle URL parameters for direct linking
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get('query') || params.get('url');
    
    if (queryParam) {
      let usernameToSearch = queryParam;
      
      // If it's a URL, extract the username
      if (queryParam.includes('github.com/')) {
        const urlParts = queryParam.split('github.com/');
        if (urlParts.length > 1) {
          usernameToSearch = urlParts[1].split('/')[0];
        }
      }
      
      setUsername(usernameToSearch);
      // Automatically trigger search
      handleAnalyze(null, usernameToSearch);
    }
  }, []);

  const handleAnalyze = async (e: React.FormEvent | null, directUsername?: string) => {
    if (e) e.preventDefault();
    const targetUsername = directUsername || username;
    
    if (!targetUsername) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Fetch User Data from Client Side
      const response = await fetch(`https://api.github.com/users/${encodeURIComponent(targetUsername)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('GitHub user not found.');
        }
        let errMessage = 'GitHub API request failed.';
        try {
            const errData = await response.json();
            if (errData && errData.message) {
                errMessage = `GitHub API Error (${response.status}): ${errData.message}`;
            }
        } catch(e) {}
        throw new Error(errMessage);
      }

      const userData = await response.json();

      // Fetch Top Repositories
      let reposData: any[] = [];
      try {
        const reposRes = await fetch(`https://api.github.com/users/${encodeURIComponent(targetUsername)}/repos?sort=updated&per_page=100`);
        if (reposRes.ok) {
            reposData = await reposRes.json();
        }
      } catch(e) {}

      const topRepos = reposData
        .filter(r => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
        .map(r => ({
            name: r.name,
            description: r.description,
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language,
            url: r.html_url,
            updated_at: r.updated_at
        }));

      // Structure Result
      const formattedResult = {
        valid: true,
        username: userData.login,
        name: userData.name,
        bio: userData.bio,
        company: userData.company,
        location: userData.location,
        blog: userData.blog,
        twitter_username: userData.twitter_username,
        public_repos: userData.public_repos,
        public_gists: userData.public_gists,
        followers: userData.followers,
        following: userData.following,
        created_at: userData.created_at,
        updated_at: userData.updated_at,
        profile_url: userData.html_url,
        avatar_url: userData.avatar_url,
        top_repos: topRepos,
      };

      setResult(formattedResult);
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
            placeholder="Enter GitHub Username or URL (e.g. torvalds or https://github.com/torvalds)"
            className="w-full bg-[rgba(255,255,255,0.02)] border border-[var(--c-glass-border)] rounded-2xl px-6 py-5 text-lg outline-none focus:border-[rgb(var(--c-accent))] focus:bg-[rgba(255,255,255,0.05)] transition-all pr-48 placeholder:text-[rgb(var(--c-mute))]"
            required
          />
          <button
            type="submit"
            disabled={loading || !username}
            className="absolute right-2 px-8 py-3.5 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
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

        {result?.top_repos && result.top_repos.length > 0 && (
          <div className="mt-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold font-display mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-[rgb(var(--c-accent))]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              Top Repositories
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.top_repos.map((repo: any, i: number) => (
                <a key={i} href={repo.url} target="_blank" rel="noopener noreferrer" className="block p-6 glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] hover:border-[rgb(var(--c-accent))] hover:-translate-y-1 transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-bold font-mono group-hover:text-[rgb(var(--c-accent))] transition-colors truncate pr-4">{repo.name}</h4>
                    <svg className="w-5 h-5 text-[rgb(var(--c-mute))] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </div>
                  
                  <p className="text-[rgb(var(--c-mute))] text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                    {repo.description || 'No description provided.'}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm font-bold mt-auto">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[rgb(var(--c-accent))]"></span>
                        {repo.language}
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-[rgb(var(--c-mute))] group-hover:text-yellow-500 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      {repo.stars.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 text-[rgb(var(--c-mute))] group-hover:text-blue-400 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 8.5C8 9.88 6.88 11 5.5 11C4.12 11 3 9.88 3 8.5C3 7.12 4.12 6 5.5 6C6.88 6 8 7.12 8 8.5ZM5.5 9.5C6.05 9.5 6.5 9.05 6.5 8.5C6.5 7.95 6.05 7.5 5.5 7.5C4.95 7.5 4.5 7.95 4.5 8.5C4.5 9.05 4.95 9.5 5.5 9.5ZM18.5 11C19.88 11 21 9.88 21 8.5C21 7.12 19.88 6 18.5 6C17.12 6 16 7.12 16 8.5C16 9.88 17.12 11 18.5 11ZM18.5 9.5C19.05 9.5 19.5 9.05 19.5 8.5C19.5 7.95 19.05 7.5 18.5 7.5C17.95 7.5 17.5 7.95 17.5 8.5C17.5 9.05 17.95 9.5 18.5 9.5ZM13.25 14.54V12H10.75V14.54C9.52 14.88 8.63 16 8.63 17.37C8.63 18.96 9.91 20.24 11.5 20.24C13.09 20.24 14.37 18.96 14.37 17.37C14.37 16 13.48 14.88 13.25 14.54ZM11.5 18.74C10.74 18.74 10.13 18.13 10.13 17.37C10.13 16.61 10.74 16 11.5 16C12.26 16 12.87 16.61 12.87 17.37C12.87 18.13 12.26 18.74 11.5 18.74Z"/></svg>
                      {repo.forks.toLocaleString()}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
