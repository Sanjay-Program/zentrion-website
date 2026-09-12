'use client';

import { useEffect, useRef } from 'react';

/**
 * Animated "global intelligence" canvas visual: a dotted world silhouette with
 * pulsing connections between major cities. Theme-aware (reads the .light
 * class on <html> so it repaints correctly on light/dark toggle).
 */

type City = { name: string; x: number; y: number };

const CITIES: City[] = [
  { name: 'New York', x: 0.28, y: 0.34 },
  { name: 'London', x: 0.44, y: 0.21 },
  { name: 'Berlin', x: 0.49, y: 0.21 },
  { name: 'Dubai', x: 0.63, y: 0.43 },
  { name: 'Mumbai', x: 0.68, y: 0.52 },
  { name: 'Chennai', x: 0.69, y: 0.60 },
  { name: 'Singapore', x: 0.77, y: 0.65 },
  { name: 'Tokyo', x: 0.87, y: 0.30 },
  { name: 'Sydney', x: 0.87, y: 0.78 },
  { name: 'Sao Paulo', x: 0.35, y: 0.69 },
  { name: 'Cape Town', x: 0.57, y: 0.78 },
  { name: 'San Francisco', x: 0.11, y: 0.39 },
  { name: 'Toronto', x: 0.25, y: 0.30 },
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
      const paddingX = w * 0.05;
      const paddingY = h * 0.15;
      const availableW = w - paddingX * 2;
      const availableH = h - paddingY * 2;
      return { 
        x: paddingX + city.x * availableW, 
        y: paddingY + city.y * availableH 
      };
    }

    function buildDots() {
      dots = [];
      const mapData = [
        "                                                                ",
        "                                                                ",
        "       ####                  ########                           ",
        "      ######                ###########                         ",
        "     ########              #############               #        ",
        "    ##########             ##############             ###       ",
        "    ###########            ###############            ###       ",
        "     ##########            ################           ###       ",
        "      #########    ##      #################          ###       ",
        "       ########  ######    #################         ####       ",
        "        ####### ########   #################         ###        ",
        "         ##############    ################         ###         ",
        "          #############     ##############         ####         ",
        "           ###########       ############           ##          ",
        "            #########          #########                        ",
        "            ########            #######                         ",
        "             ######              #####                          ",
        "              ####                ###            ####           ",
        "              ###                  #             #####          ",
        "              ##                                 #####          ",
        "                                                  ###           ",
        "                                                                ",
        "                                                                "
      ];
      const mapCols = 64;
      const mapRows = 23;
      
      const paddingX = w * 0.05;
      const paddingY = h * 0.15;
      const availableW = w - paddingX * 2;
      const availableH = h - paddingY * 2;

      for (let r = 0; r < mapRows; r++) {
        for (let c = 0; c < mapCols; c++) {
          if (mapData[r][c] === '#') {
            if (Math.random() > 0.08) { // Skip a few random dots to make it look organic
              const dx = paddingX + (c / (mapCols - 1)) * availableW;
              const dy = paddingY + (r / (mapRows - 1)) * availableH;
              dots.push({ x: dx, y: dy, baseAlpha: 0.15 + Math.random() * 0.3 });
            }
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
