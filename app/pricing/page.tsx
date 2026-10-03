import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Pricing & Plans | Zentrion Technologies',
  description: 'Flexible cybersecurity training and enterprise solutions for teams of all sizes. Upgrade your security posture today.',
};

export default function PricingPage() {
  return (
    <>
      <Breadcrumbs />
      <div className="container-x py-16 md:py-24 min-h-screen">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
            Level Up Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-blue-500">Security Posture</span>
          </h1>
          <p className="text-lg text-mute">
            From individual hackers to global enterprise SOC teams, we have the tools, training, and infrastructure you need to stay ahead of the threat landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Hobby Plan */}
          <div className="glass-card p-8 rounded-2xl border border-line flex flex-col relative group hover:border-cyan/30 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2">Community</h3>
            <p className="text-sm text-mute mb-6 h-10">For individual learners and aspiring security analysts.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-mute">/ forever</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-white/80">
                <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Access to 5 Beginner CTF Labs
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Basic Web Utilities
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Global Leaderboard Access
              </li>
              <li className="flex items-start gap-3 text-sm text-mute">
                <svg className="w-5 h-5 text-mute/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                No Verifiable Certificates
              </li>
            </ul>
            <Link href="/auth/signup" className="btn-ghost w-full text-center">
              Start Hacking
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="glass-card p-8 rounded-2xl border border-cyan flex flex-col relative bg-cyan/5 shadow-[0_0_30px_rgba(47,107,255,0.15)] transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan text-void text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
              Most Popular
            </div>
            <h3 className="text-xl font-bold text-white mb-2 text-cyan">Professional</h3>
            <p className="text-sm text-mute mb-6 h-10">For dedicated security professionals and freelance pentesters.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">$49</span>
              <span className="text-mute">/ month</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-white/80">
                <svg className="w-5 h-5 text-cyan shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Access to All 18+ Advanced CTF Labs
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <svg className="w-5 h-5 text-cyan shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Cryptographic Verified Certificates
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <svg className="w-5 h-5 text-cyan shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Zero-Day Exploit Sandbox
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <svg className="w-5 h-5 text-cyan shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Threat Map Telemetry
              </li>
            </ul>
            <Link href="/auth/signup?plan=pro" className="btn-primary w-full text-center shadow-[0_0_15px_rgba(47,107,255,0.4)]">
              Upgrade to Pro
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="glass-card p-8 rounded-2xl border border-line flex flex-col relative group hover:border-violet/50 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2">Enterprise SOC</h3>
            <p className="text-sm text-mute mb-6 h-10">Custom cyber ranges and dedicated training for your entire team.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">Custom</span>
              <span className="text-mute"> / annual</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-white/80">
                <svg className="w-5 h-5 text-violet shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                White-Labeled Custom Cyber Ranges
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <svg className="w-5 h-5 text-violet shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Dedicated Red vs Blue Infrastructure
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <svg className="w-5 h-5 text-violet shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Advanced Phishing Campaign Simulations
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <svg className="w-5 h-5 text-violet shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                24/7 Dedicated Support Engineer
              </li>
            </ul>
            <Link href="/book-consultation" className="btn-secondary w-full text-center hover:!border-violet hover:!text-violet">
              Contact Sales
            </Link>
          </div>
        </div>
        
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="glass-card p-10 rounded-2xl border border-line bg-surface/30 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Are you an educational institution?</h3>
              <p className="text-mute text-sm max-w-md">We offer heavy discounts for universities, coding bootcamps, and non-profits aiming to teach cybersecurity.</p>
            </div>
            <Link href="/contact" className="btn-ghost shrink-0">
              Apply for Edu Grant
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
