'use client';

import { useState } from 'react';

type LookupToolProps = {
  title: string;
  description: string;
  endpoint: string;
  placeholder: string;
  buttonLabel: string;
  inputAriaLabel: string;
};

export default function LookupTool({
  title,
  description,
  endpoint,
  placeholder,
  buttonLabel,
  inputAriaLabel,
}: LookupToolProps) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLookup() {
    const value = input.trim();
    if (!value) {
      setError('Please enter a value.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`${endpoint}?query=${encodeURIComponent(value)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Request failed');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container-x pt-10 pb-20">
      <div className="max-w-3xl glass-card rounded-2xl p-6 md:p-8">
        <h1 className="font-display text-3xl md:text-4xl font-semibold">{title}</h1>
        <p className="mt-3 text-mute leading-relaxed">{description}</p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <input
            aria-label={inputAriaLabel}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-lg border border-line bg-transparent px-4 py-3 text-ink placeholder:text-mute focus:outline-none focus:border-cyan"
          />
          <button
            type="button"
            onClick={handleLookup}
            disabled={loading}
            className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Checking...' : buttonLabel}
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-breach/40 bg-breach/10 p-4 text-sm text-breach">
            {error}
          </div>
        )}

        {result !== null && (
          <pre className="mt-6 overflow-auto rounded-xl border border-line bg-void/80 p-5 text-xs md:text-sm text-mute leading-relaxed">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </section>
  );
}
