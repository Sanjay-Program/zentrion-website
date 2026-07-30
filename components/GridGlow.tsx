'use client';

import { useEffect, useRef } from 'react';

export default function GridGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let raf = 0;
    let pending: { x: number; y: number } | null = null;

    function onMove(e: PointerEvent) {
      pending = { x: e.clientX, y: e.clientY };
      if (!raf) {
        raf = requestAnimationFrame(() => {
          if (pending && glowRef.current) {
            glowRef.current.style.background = `radial-gradient(600px circle at ${pending.x}px ${pending.y}px, rgba(0,212,255,0.08), transparent 40%)`;
          }
          raf = 0;
        });
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 grid-overlay pointer-events-none z-0 opacity-60" aria-hidden="true" />
      <div ref={glowRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />
    </>
  );
}
