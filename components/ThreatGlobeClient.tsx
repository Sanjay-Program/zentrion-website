'use client';

import dynamic from 'next/dynamic';

export const ThreatGlobeClient = dynamic(() => import('./ThreatGlobe').then(mod => mod.ThreatGlobe), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[500px] flex items-center justify-center opacity-50">Initializing 3D Environment...</div>
});
