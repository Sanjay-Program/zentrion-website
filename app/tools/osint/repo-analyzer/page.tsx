'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RepoAnalyzerPage() {
  const [repo, setRepo] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  // Handle URL parameters for direct linking
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get('query') || params.get('url');
    
    if (queryParam) {
      setRepo(queryParam);
      handleAnalyze(null, queryParam);
    }
  }, []);

  const handleAnalyze = async (e: React.FormEvent | null, directRepo?: string) => {
    if (e) e.preventDefault();
    const targetRepo = directRepo || repo;
    
    if (!targetRepo) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Parse repo name from URL if necessary
      let repoPath = targetRepo;
      if (repoPath.includes('github.com/')) {
        repoPath = repoPath.split('github.com/')[1];
      }
      // Remove any trailing slashes or extra paths
      repoPath = repoPath.split('/').slice(0, 2).join('/');

      if (repoPath.split('/').length !== 2 || !repoPath.split('/')[1]) {
        throw new Error('Invalid repository format. Use owner/repo.');
      }

      const response = await fetch(`https://api.github.com/repos/${repoPath}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('GitHub repository not found.');
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

      const data = await response.json();
      
      // Fetch languages
      let languages = {};
      try {
          const langRes = await fetch(`https://api.github.com/repos/${repoPath}/languages`);
          if (langRes.ok) {
              languages = await langRes.json();
          }
      } catch(e) {}

      const formattedResult = {
        valid: true,
        full_name: data.full_name,
        description: data.description,
        html_url: data.html_url,
        homepage: data.homepage,
        stargazers_count: data.stargazers_count,
        watchers_count: data.watchers_count,
        forks_count: data.forks_count,
        open_issues_count: data.open_issues_count,
        network_count: data.network_count,
        subscribers_count: data.subscribers_count,
        language: data.language,
        languages: Object.keys(languages),
        created_at: data.created_at,
        updated_at: data.updated_at,
        pushed_at: data.pushed_at,
        size: data.size,
        default_branch: data.default_branch,
        license: data.license?.name || 'No License',
        owner: {
          login: data.owner.login,
          avatar_url: data.owner.avatar_url,
          html_url: data.owner.html_url,
          type: data.owner.type
        }
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
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Repository Analyzer</h1>
          <p className="text-xl text-[rgb(var(--c-mute))] max-w-2xl">
            Analyze any public GitHub repository to extract metrics, languages, and technical stack details.
          </p>
        </div>

        <form onSubmit={handleAnalyze} className="max-w-3xl mb-12 relative flex items-center">
          <input
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="Enter Repo (e.g. facebook/react or https://github.com/...)"
            className="w-full bg-[rgba(255,255,255,0.02)] border border-[var(--c-glass-border)] rounded-2xl px-6 py-5 text-lg outline-none focus:border-[rgb(var(--c-accent))] focus:bg-[rgba(255,255,255,0.05)] transition-all pr-48 placeholder:text-[rgb(var(--c-mute))]"
            required
          />
          <button
            type="submit"
            disabled={loading || !repo}
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
             <div className="px-8 py-8 border-b border-[var(--c-glass-border)] bg-[rgba(255,255,255,0.02)]">
                <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                   <div className="flex-grow">
                     <h2 className="text-3xl font-bold font-display text-[rgb(var(--c-accent))] mb-2">{result.full_name}</h2>
                     <p className="text-lg text-[rgb(var(--c-ink))] mb-4">{result.description || 'No description provided.'}</p>
                     <div className="flex items-center gap-4 text-sm font-bold">
                        {result.language && (
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-[rgba(255,255,255,0.05)] rounded-full border border-[var(--c-glass-border)]">
                            <span className="w-2.5 h-2.5 rounded-full bg-[rgb(var(--c-accent))]"></span>
                            {result.language}
                          </div>
                        )}
                        <div className="px-3 py-1 bg-[rgba(255,255,255,0.05)] rounded-full border border-[var(--c-glass-border)] flex items-center gap-2">
                           <svg className="w-4 h-4 text-[rgb(var(--c-mute))]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                           {result.license}
                        </div>
                     </div>
                   </div>
                   
                   <a href={result.html_url} target="_blank" rel="noopener noreferrer" className="shrink-0 px-6 py-3 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--c-glass-border)] rounded-xl font-bold transition-all flex items-center gap-2">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                     View on GitHub
                   </a>
                </div>
             </div>
             
             <div className="p-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="bg-[rgba(255,255,255,0.02)] border border-[var(--c-glass-border)] rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold font-mono text-[rgb(var(--c-ink))] mb-1 flex items-center justify-center gap-1">
                      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      {result.stargazers_count.toLocaleString()}
                    </div>
                    <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-bold">Stars</div>
                  </div>
                  <div className="bg-[rgba(255,255,255,0.02)] border border-[var(--c-glass-border)] rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold font-mono text-[rgb(var(--c-ink))] mb-1">{result.forks_count.toLocaleString()}</div>
                    <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-bold">Forks</div>
                  </div>
                  <div className="bg-[rgba(255,255,255,0.02)] border border-[var(--c-glass-border)] rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold font-mono text-[rgb(var(--c-ink))] mb-1">{result.open_issues_count.toLocaleString()}</div>
                    <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-bold">Open Issues</div>
                  </div>
                  <div className="bg-[rgba(255,255,255,0.02)] border border-[var(--c-glass-border)] rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold font-mono text-[rgb(var(--c-ink))] mb-1">{result.watchers_count.toLocaleString()}</div>
                    <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-widest font-bold">Watchers</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-sm font-bold text-[rgb(var(--c-mute))] uppercase tracking-widest mb-4">Tech Stack Details</h3>
                    <div className="space-y-3">
                      {result.languages && result.languages.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {result.languages.map((l: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-[rgba(255,255,255,0.05)] border border-[var(--c-glass-border)] rounded-lg text-sm font-mono">{l}</span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-[rgb(var(--c-mute))]">No language data available.</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-bold text-[rgb(var(--c-mute))] uppercase tracking-widest mb-4">Repository Metadata</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[rgb(var(--c-mute))]">Created</span>
                        <span className="font-mono">{new Date(result.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[rgb(var(--c-mute))]">Last Pushed</span>
                        <span className="font-mono">{new Date(result.pushed_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[rgb(var(--c-mute))]">Default Branch</span>
                        <span className="font-mono">{result.default_branch}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[rgb(var(--c-mute))]">Size</span>
                        <span className="font-mono">{(result.size / 1024).toFixed(2)} MB</span>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
