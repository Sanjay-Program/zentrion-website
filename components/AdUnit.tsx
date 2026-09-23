'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slotId: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
  clientId?: string;
}

export default function AdUnit({ slotId, format = 'auto', className = '', clientId = 'ca-pub-4559603839158157' }: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Only initialize once and ensure window.adsbygoogle exists
    if (!initialized.current && typeof window !== 'undefined') {
      try {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
        initialized.current = true;
      } catch (err) {
        console.error('AdSense error', err);
      }
    }
  }, []);

  return (
    <div className={`ad-container relative overflow-hidden flex items-center justify-center bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl ${className}`}>
      {/* 
        This wrapper prevents layout shift even if the ad fails to load or is blocked.
        By giving the parent a fixed size/aspect ratio, we maintain high UX.
      */}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client={clientId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-[10px] text-[rgb(var(--c-mute))]/30 uppercase tracking-widest font-mono z-[-1]">
        Advertisement
      </div>
    </div>
  );
}
