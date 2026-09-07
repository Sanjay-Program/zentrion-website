'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function IPLookupPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLookup() {
    const value = input.trim();
    if (!value) {
      setError('Please enter an IP address.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`https://ipwho.is/${encodeURIComponent(value)}`);
      const data = await response.json();

      if (!data.success && data.message) {
        throw new Error(data.message);
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>

        <div className="glass-card rounded-2xl p-6 md:p-8">
          <h1 className="font-display text-3xl md:text-4xl font-semibold">IP Lookup</h1>
          <p className="mt-3 text-mute leading-relaxed">Get information and provider data for an IP address.</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <input
              aria-label="IP address"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="8.8.8.8"
              className="w-full rounded-lg border border-line bg-transparent px-4 py-3 text-ink placeholder:text-mute focus:outline-none focus:border-cyan"
            />
            <button
              type="button"
              onClick={handleLookup}
              disabled={loading}
              className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Checking...' : 'Lookup IP'}
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-500">
              {error}
            </div>
          )}

          {result ? (
            <pre className="mt-6 overflow-auto rounded-xl border border-[var(--c-glass-border)] bg-[rgba(0,0,0,0.2)] p-5 text-xs md:text-sm text-[rgb(var(--c-mute))] leading-relaxed">
              {JSON.stringify(result, null, 2)}
            </pre>
          ) : null}
        </div>
      </div>
    </div>
  );
}
