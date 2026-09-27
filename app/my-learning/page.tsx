'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { learningManager, LearningState } from '@/lib/learning-state';
import { CATEGORIES } from '@/lib/tools-data';

export default function MyLearningDashboard() {
  const [state, setState] = useState<LearningState | null>(null);

  useEffect(() => {
    // Initial load
    setState(learningManager.get());

    // Listen for updates across tabs or within the app
    const handleUpdate = () => {
      setState(learningManager.get());
    };

    window.addEventListener('zentrion-learning-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate); // For cross-tab sync

    return () => {
      window.removeEventListener('zentrion-learning-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 pb-20">
        <div className="w-8 h-8 rounded-full border-2 border-cyan border-t-transparent animate-spin"></div>
      </div>
    );
  }

  const hasActivity = state.completedGuides.length > 0 || state.completedLabs.length > 0 || state.recentlyViewed.length > 0 || state.bookmarks.length > 0;

  return (
    <div className="container-x py-20 md:py-32">
      <header className="mb-14">
        <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4 text-[rgb(var(--c-ink))]">
          My Learning Dashboard
        </h1>
        <p className="text-xl text-[rgb(var(--c-mute))] max-w-2xl">
          Track your progress through the Academy. All progress is saved locally on your device for privacy.
        </p>
      </header>

      {!hasActivity ? (
        <div className="glass-card rounded-2xl p-10 text-center bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)]">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan/10 text-cyan mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <h2 className="text-2xl font-semibold mb-2">No progress yet</h2>
          <p className="text-[rgb(var(--c-mute))] mb-8 max-w-md mx-auto">
            You haven't completed any guides or labs yet. Start exploring the Academy to begin tracking your journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides" className="btn-primary">
              Explore Guides
            </Link>
            <Link href="/labs" className="btn-ghost">
              Try a Lab
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr,320px] gap-12">
          
          <div className="space-y-12">
            {/* Completed Guides */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-cyan/10 flex items-center justify-center text-cyan text-sm">
                  {state.completedGuides.length}
                </span>
                Completed Guides
              </h2>
              {state.completedGuides.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {state.completedGuides.map((slug) => (
                    <Link key={slug} href={`/guides/network/${slug}`} className="block">
                      <div className="glass-card p-5 rounded-xl border border-line bg-surface/30 hover:bg-surface/50 transition-colors h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-cyan line-clamp-2">{slug.replace(/-/g, ' ')}</h3>
                          <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="text-xs text-mute font-mono uppercase">Guide</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-mute italic text-sm">No guides completed yet.</p>
              )}
            </section>

            {/* Completed Labs */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-cyan/10 flex items-center justify-center text-cyan text-sm">
                  {state.completedLabs.length}
                </span>
                Completed Labs
              </h2>
              {state.completedLabs.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {state.completedLabs.map((slug) => (
                    <Link key={slug} href={`/labs/${slug}`} className="block">
                      <div className="glass-card p-5 rounded-xl border border-line bg-surface/30 hover:bg-surface/50 transition-colors h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-cyan line-clamp-2">{slug.replace(/-/g, ' ')}</h3>
                          <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="text-xs text-mute font-mono uppercase">Lab</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-mute italic text-sm">No labs completed yet.</p>
              )}
            </section>
            {/* Learning Badges */}
            <section>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-cyan/10 flex items-center justify-center text-cyan text-sm">
                  {state.completedQuizzes?.length || 0}
                </span>
                Learning Badges
              </h2>
              <p className="text-sm text-mute mb-6 italic">Note: These are internal gamification badges to track your learning progress, not professional certifications.</p>
              
              {state.completedQuizzes && state.completedQuizzes.length > 0 ? (
                <div className="grid sm:grid-cols-3 gap-4">
                  {state.completedQuizzes.map((quiz) => (
                    <div key={quiz.id} className="glass-card p-6 rounded-xl border border-line bg-surface/30 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan/20 to-violet/20 border border-cyan/30 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(47,107,255,0.2)]">
                        <svg className="w-8 h-8 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-white mb-1 capitalize">{quiz.id.replace(/-/g, ' ')}</h3>
                      <p className="text-xs text-mute font-mono mb-3">Score: {Math.round((quiz.score / quiz.total) * 100)}%</p>
                      <Link href={`/quizzes/${quiz.id}`} className="text-xs text-cyan hover:underline mt-auto">
                        Retake Quiz
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-8 rounded-xl border border-line bg-surface/10 text-center">
                  <p className="text-mute text-sm mb-4">Complete quizzes to earn learning badges and demonstrate your knowledge.</p>
                  <Link href="/quizzes" className="btn-primary py-2 px-4 text-sm">
                    Browse Quizzes
                  </Link>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-12">
            {/* Recently Viewed */}
            {state.recentlyViewed.length > 0 && (
              <section>
                <h2 className="font-semibold text-sm uppercase tracking-wider text-mute mb-4">Recently Viewed</h2>
                <ul className="space-y-3">
                  {state.recentlyViewed.slice(0, 5).map((item) => (
                    <li key={item.url}>
                      <Link href={item.url} className="block group">
                        <p className="text-sm text-cyan group-hover:underline line-clamp-1">{item.title}</p>
                        <p className="text-[10px] text-mute font-mono mt-1">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Bookmarks */}
            {state.bookmarks.length > 0 && (
              <section>
                <h2 className="font-semibold text-sm uppercase tracking-wider text-mute mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>
                  Bookmarks
                </h2>
                <ul className="space-y-3">
                  {state.bookmarks.map((url) => (
                    <li key={url}>
                      <Link href={url} className="text-sm text-cyan hover:underline line-clamp-1">
                        {url}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="bg-surface/50 p-6 rounded-xl border border-line">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-mute mb-2">Privacy Note</h3>
              <p className="text-xs text-mute leading-relaxed mb-4">
                Your learning progress is stored entirely in your browser's LocalStorage. Zentrion does not track this data on our servers.
              </p>
              <button 
                onClick={() => {
                  if(confirm('Are you sure you want to clear all your learning progress? This cannot be undone.')) {
                    learningManager.clearData();
                  }
                }}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                Clear all data
              </button>
            </div>
          </aside>

        </div>
      )}
    </div>
  );
}
