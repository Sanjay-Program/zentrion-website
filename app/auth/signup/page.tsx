'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call and local authentication
    setTimeout(() => {
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters.');
        setIsLoading(false);
        return;
      }
      
      // Store mock user session in localStorage
      localStorage.setItem('zentrion_auth_token', 'mock_token_' + Date.now());
      localStorage.setItem('zentrion_user', JSON.stringify({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        role: 'user'
      }));

      // Redirect to practice dashboard (Hacker Hub)
      router.push('/practice');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan/10 via-[#0a0a0f] to-[#0a0a0f] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <h2 className="font-display font-bold text-3xl tracking-tight flex items-center justify-center gap-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-cyan stroke-2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              Zentrion
            </h2>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-mute text-sm">Join the next generation of cyber defenders.</p>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-line bg-surface/50 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-white/80">Full Name</label>
              <input 
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-void border border-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan text-white transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white/80">Work Email</label>
              <input 
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-void border border-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan text-white transition-colors"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white/80">Company (Optional)</label>
              <input 
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-void border border-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan text-white transition-colors"
                placeholder="Acme Corp"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-white/80">Password</label>
              <input 
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-void border border-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan text-white transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm font-medium p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn-primary w-full py-3 mt-2 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-void" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-mute">
            Already have an account? <Link href="/auth/login" className="text-cyan hover:underline font-medium">Log in</Link>
          </div>
        </div>

        <p className="text-center text-[10px] text-mute/50 mt-8 max-w-xs mx-auto">
          By registering, you agree to our Terms of Service and Privacy Policy. This is a simulated environment.
        </p>
      </div>
    </div>
  );
}
