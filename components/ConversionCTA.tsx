import React from 'react';
import Link from 'next/link';

export function ConversionCTA() {
  return (
    <div className="mt-16 bg-surface/30 border border-line rounded-2xl p-8 text-center glass-card relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--c-accent))]/5 to-transparent pointer-events-none" />
      <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
        Need Expert Help with Your Security Infrastructure?
      </h3>
      <p className="text-mute mb-8 max-w-2xl mx-auto relative z-10">
        Our team of certified security engineers can help you audit, secure, and monitor your digital assets. We specialize in penetration testing, incident response, and security architecture.
      </p>
      <div className="flex justify-center gap-4 relative z-10">
        <Link href="/contact" className="btn-primary">
          Discuss Your Project
        </Link>
        <Link href="/services" className="btn-ghost">
          View Our Services
        </Link>
      </div>
    </div>
  );
}
