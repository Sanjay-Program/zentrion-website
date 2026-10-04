import Link from 'next/link';
import {
  Reveal,
  GlassCard,
} from '@/components/ui';

export const metadata = {
  title: 'Download | ZENTRION TERMINAL',
  description: 'Download the verified binary for Zentrion Terminal v1.14.0.',
};

export default function DownloadPage() {
  return (
    <>
      <section className="pt-32 pb-12 container-x">
        <Reveal>
          <div className="mb-6 flex items-center gap-2 text-sm text-cyan">
            <Link href="/terminal" className="hover:underline">Terminal</Link>
            <span>/</span>
            <span className="text-mute">Download</span>
          </div>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink">
            Download v1.14.0
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-mute leading-relaxed">
            Install the verified binary natively on your host OS. No virtual machines or Docker containers required.
          </p>
        </Reveal>
      </section>

      {/* Navigation Sub-menu for Terminal Ecosystem */}
      <section className="container-x mb-16">
        <div className="flex flex-wrap gap-2 p-1 bg-surface/50 rounded-lg border border-line inline-flex">
          <Link href="/terminal" className="px-4 py-2 rounded-md text-mute hover:text-ink transition-colors text-sm">Overview</Link>
          <Link href="/terminal/architecture" className="px-4 py-2 rounded-md text-mute hover:text-ink transition-colors text-sm">Architecture</Link>
          <Link href="/terminal/use-cases" className="px-4 py-2 rounded-md text-mute hover:text-ink transition-colors text-sm">Use Cases</Link>
          <Link href="/terminal/compare" className="px-4 py-2 rounded-md text-mute hover:text-ink transition-colors text-sm">Compare</Link>
        </div>
      </section>

      <section className="container-x py-16 border-t border-line">
        <Reveal delay={0.1}>
          <div className="max-w-4xl">
            <GlassCard className="p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-ink">Linux (x86_64) - Stable Release</h3>
                  <p className="text-mute text-sm mt-1">License: BUSL-1.1</p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
                  Verified Checksum
                </div>
              </div>

              <div className="bg-[#0a0a0a] rounded-xl border border-line overflow-hidden font-mono text-sm">
                <div className="px-4 py-2 border-b border-line bg-surface flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                </div>
                <div className="p-4 sm:p-6 text-gray-300 overflow-x-auto whitespace-pre">
                  <span className="text-mute"># 1. Download the verified binary</span><br/>
                  <span className="text-cyan">wget</span> https://github.com/Sanjay-Program/ZENTRION-TERMINAL/releases/download/v1.14.0/zentrion-linux-x64.tar.gz<br/>
                  <span className="text-cyan">wget</span> https://github.com/Sanjay-Program/ZENTRION-TERMINAL/releases/download/v1.14.0/zentrion-linux-x64.tar.gz.sha256<br/><br/>
                  
                  <span className="text-mute"># 2. Verify cryptographic checksum</span><br/>
                  <span className="text-cyan">sha256sum</span> -c zentrion-linux-x64.tar.gz.sha256<br/><br/>

                  <span className="text-mute"># 3. Install locally (No root required)</span><br/>
                  ./scripts/install.sh --archive zentrion-linux-x64.tar.gz
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-line">
                <h4 className="font-bold text-ink mb-4">Other Platforms</h4>
                <div className="flex gap-4">
                  <a href="https://github.com/Sanjay-Program/ZENTRION-TERMINAL/releases" target="_blank" rel="noopener noreferrer" className="btn-ghost flex-1 text-center justify-center border border-line hover:border-cyan/50 hover:text-cyan transition-all">
                    macOS (Apple Silicon)
                  </a>
                  <a href="https://github.com/Sanjay-Program/ZENTRION-TERMINAL/releases" target="_blank" rel="noopener noreferrer" className="btn-ghost flex-1 text-center justify-center border border-line hover:border-cyan/50 hover:text-cyan transition-all">
                    Windows (x64)
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>
        </Reveal>
      </section>
    </>
  );
}
