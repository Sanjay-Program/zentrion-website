import React from 'react';
import Script from 'next/script';
import SimilarTools from '@/components/SimilarTools';

const ADSENSE_PUBLISHER_ID = 'ca-pub-3940256099942544';

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      {children}
      <SimilarTools />
    </>
  );
}
