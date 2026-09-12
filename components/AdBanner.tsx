'use client';

import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
}

export default function AdBanner({
  dataAdSlot,
  dataAdFormat = 'auto',
  dataFullWidthResponsive = true,
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (adRef.current && !adRef.current.hasAttribute('data-ad-status')) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error', err);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden flex justify-center my-8">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-3940256099942544"
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
}
