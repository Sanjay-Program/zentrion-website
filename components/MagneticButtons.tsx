'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const SELECTOR = '.btn-primary, .btn-ghost';
const STRENGTH = 0.22;

export default function MagneticButtons() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let raf = 0;
    const active = new Set<HTMLElement>();

    function onMove(e: PointerEvent) {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const els = document.querySelectorAll<HTMLElement>(SELECTOR);
        const stillActive = new Set<HTMLElement>();

        els.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const within =
            e.clientX >= rect.left - 12 &&
            e.clientX <= rect.right + 12 &&
            e.clientY >= rect.top - 12 &&
            e.clientY <= rect.bottom + 12;

          if (within) {
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * STRENGTH}px, ${y * STRENGTH}px)`;
            stillActive.add(el);
            active.add(el);
          }
        });

        active.forEach((el) => {
          if (!stillActive.has(el)) {
            el.style.transform = 'translate(0px, 0px)';
            active.delete(el);
          }
        });
      });
    }

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
      active.forEach((el) => {
        el.style.transform = 'translate(0px, 0px)';
      });
      active.clear();
    };
    // Re-attach the scan after each route change so newly rendered buttons are covered.
  }, [pathname]);

  return null;
}
