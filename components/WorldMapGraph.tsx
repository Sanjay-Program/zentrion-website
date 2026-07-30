'use client';

import { useEffect, useRef } from 'react';

/**
 * Animated "global intelligence" canvas visual: a dotted world silhouette with
 * pulsing connections between major cities. Theme-aware (reads the .light
 * class on <html> so it repaints correctly on light/dark toggle).
 */

type City = { name: string; x: number; y: number };

const CITIES: City[] = [
  { name: 'New York', x: 0.28, y: 0.35 },
  { name: 'London', x: 0.48, y: 0.28 },
  { name: 'Berlin', x: 0.52, y: 0.3 },
  { name: 'Dubai', x: 0.6, y: 0.42 },
  { name: 'Mumbai', x: 0.66, y: 0.48 },
  { name: 'Chennai', x: 0.685, y: 0.52 },
  { name: 'Singapore', x: 0.76, y: 0.55 },
  { name: 'Tokyo', x: 0.85, y: 0.38 },
  { name: 'Sydney', x: 0.88, y: 0.72 },
  { name: 'Sao Paulo', x: 0.32, y: 0.68 },
  { name: 'Cape Town', x: 0.54, y: 0.78 },
  { name: 'San Francisco', x: 0.18, y: 0.38 },
  { name: 'Toronto', x: 0.26, y: 0.32 },
];

export default function WorldMapGraph({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const wrap = canvas.parentElement;
    if (!wrap) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let dots: { x: number; y: number; baseAlpha: number }[] = [];
    let connections: { a: City; b: City; progress: number; speed: number }[] = [];
    let pulses: { x: number; y: number; r: number; life: number; maxLife: number }[] = [];
    let raf = 0;
    let time = 0;

    function isLight() {
      return document.documentElement.classList.contains('light');
    }

    function palette() {
      return isLight()
        ? {
            bg: 'rgba(0,0,0,0)',
            dot: 'rgba(10,14,23,',
            line: 'rgba(220,38,38,',
            city: 'rgba(220,38,38,0.9)',
            cityGlow: 'rgba(220,38,38,0.28)',
            pulse: 'rgba(220,38,38,',
          }
        : {
            bg: 'rgba(0,0,0,0)',
            dot: 'rgba(255,255,255,',
            line: 'rgba(0,212,255,',
            city: 'rgba(0,212,255,0.95)',
            cityGlow: 'rgba(0,212,255,0.3)',
            pulse: 'rgba(0,212,255,',
          };
    }

    function getCityPos(city: City) {
      return { x: city.x * w, y: city.y * h };
    }

    function buildDots() {
      dots = [];
      const cols = Math.floor(w / 16);
      const rows = Math.floor(h / 16);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const nx = i / cols;
          const ny = j / rows;
          const mask =
            Math.sin(nx * 7 + ny * 2.5) * Math.cos(ny * 5.5 - nx * 1.8) + Math.sin(nx * 3) * 0.3;
          if (mask > 0.08) {
            dots.push({ x: i * 16 + 8, y: j * 16 + 8, baseAlpha: 0.08 + Math.random() * 0.08 });
          }
        }
      }
    }

    function initConnections() {
      connections = [];
      for (let i = 0; i < CITIES.length; i++) {
        for (let j = i + 1; j < CITIES.length; j++) {
          const a = getCityPos(CITIES[i]);
          const b = getCityPos(CITIES[j]);
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < w * 0.42) {
            connections.push({
              a: CITIES[i],
              b: CITIES[j],
              progress: Math.random(),
              speed: 0.0025 + Math.random() * 0.0035,
            });
          }
        }
      }
    }

    function resize() {
      if (!wrap || !canvas || !ctx) return;
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
      initConnections();
    }

    function maybeSpawnPulse() {
      if (Math.random() < 0.025) {
        const city = CITIES[Math.floor(Math.random() * CITIES.length)];
        const pos = getCityPos(city);
        pulses.push({ x: pos.x, y: pos.y, r: 0, life: 0, maxLife: 70 + Math.random() * 40 });
      }
    }

    function step() {
      if (!ctx) return;
      time += 1;
      const pal = palette();
      ctx.clearRect(0, 0, w, h);

      dots.forEach((d) => {
        ctx.fillStyle = `${pal.dot}${d.baseAlpha})`;
        ctx.fillRect(d.x, d.y, 1.4, 1.4);
      });

      connections.forEach((c) => {
        const a = getCityPos(c.a);
        const b = getCityPos(c.b);
        ctx.strokeStyle = `${pal.line}0.08)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

        if (!reduced) {
          c.progress += c.speed;
          if (c.progress > 1) c.progress = 0;
          const px = a.x + (b.x - a.x) * c.progress;
          const py = a.y + (b.y - a.y) * c.progress;
          ctx.fillStyle = `${pal.line}0.9)`;
          ctx.beginPath();
          ctx.arc(px, py, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      CITIES.forEach((city) => {
        const p = getCityPos(city);
        ctx.fillStyle = pal.cityGlow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = pal.city;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reduced) {
        maybeSpawnPulse();
        pulses = pulses.filter((p) => p.life < p.maxLife);
        pulses.forEach((p) => {
          p.life += 1;
          p.r = (p.life / p.maxLife) * 46;
          const alpha = 1 - p.life / p.maxLife;
          ctx.strokeStyle = `${pal.pulse}${(alpha * 0.6).toFixed(3)})`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.stroke();
        });
      }

      raf = requestAnimationFrame(step);
    }

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(wrap);

    const themeObserver = new MutationObserver(() => {
      /* palette() re-reads on every frame, nothing to do here except keep
         the observer so future theme-color hooks are easy to add */
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" aria-hidden="true" />
    </div>
  );
}
