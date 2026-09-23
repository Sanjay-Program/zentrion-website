'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function getVisitorId() {
  if (typeof document === 'undefined') return '';
  let id = document.cookie.split('; ').find(r => r.startsWith('visitorId='));
  if (id) return id.split('=')[1];
  id = crypto.randomUUID();
  document.cookie = `visitorId=${id};path=/;max-age=31536000;SameSite=Lax`;
  return id;
}

export default function TrackingScript() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const VID = getVisitorId();
    const start = Date.now();
    let maxScroll = 0;
    let clicks = 0;

    const handleScroll = () => {
      const pct = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      if (pct > maxScroll) maxScroll = pct;
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a[href^="/"]')) {
        clicks++;
      }
    };

    const handleUnload = () => {
      const data = JSON.stringify({
        page: pathname,
        scrollDepth: maxScroll,
        timeOnPage: Math.round((Date.now() - start) / 1000),
        clicks: clicks,
        referrer: document.referrer,
        device: /Mobile/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        country: 'IN' // Or determine dynamically via CF headers in backend
      });
      navigator.sendBeacon('/api/track/pageview', new Blob([data], { type: 'application/json' }));
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClick);
    window.addEventListener('beforeunload', handleUnload);

    // Also send beacon when route changes in SPA mode
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('beforeunload', handleUnload);
      handleUnload();
    };
  }, [pathname]);

  return null;
}

// Helper to track tool usage globally
export function trackTool(tool: string, input?: string, result?: string) {
  if (typeof navigator === 'undefined') return;
  const data = JSON.stringify({ tool, input: input?.slice(0, 200), result: result?.slice(0, 100) });
  navigator.sendBeacon('/api/track/tool-use', new Blob([data], { type: 'application/json' }));
}
