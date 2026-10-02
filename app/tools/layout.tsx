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
      <div className="container-x py-8 border-t border-line text-sm text-mute text-center max-w-4xl mx-auto">
        <p className="mb-2"><strong>Disclaimer:</strong> Free tools are provided for educational, diagnostic, or authorized security testing purposes only. You are solely responsible for ensuring you have authorization to scan or query target systems.</p>
        <p>Output may be incomplete or inaccurate, and its use does not constitute a professional security audit. Zentrion does not guarantee the availability or accuracy of these tools or the underlying third-party data sources.</p>
      </div>
      <SimilarTools />
    </>
  );
}
