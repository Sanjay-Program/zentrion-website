'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ColorConverterPage() {
  const [hex, setHex] = useState('#000000');
  const [rgb, setRgb] = useState('rgb(0, 0, 0)');
  const [hsl, setHsl] = useState('hsl(0, 0%, 0%)');
  const [cmyk, setCmyk] = useState('cmyk(0%, 0%, 0%, 100%)');
  const [error, setError] = useState('');

  // Conversion Utilities
  const hexToRgb = (hexCode: string) => {
    let h = hexCode.replace(/^#/, '');
    if (h.length === 3) h = h.split('').map(x => x + x).join('');
    if (h.length !== 6) return null;
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return { r, g, b };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, Math.min(m, y));

    if (k === 1) {
      return { c: 0, m: 0, y: 0, k: 100 };
    }

    c = Math.round(((c - k) / (1 - k)) * 100);
    m = Math.round(((m - k) / (1 - k)) * 100);
    y = Math.round(((y - k) / (1 - k)) * 100);
    k = Math.round(k * 100);
    return { c, m, y, k };
  };

  const parseInputColor = (input: string) => {
    setError('');
    let cleanInput = input.trim().toLowerCase();
    
    // Parse HEX
    if (cleanInput.startsWith('#') || /^[0-9a-f]{3,6}$/i.test(cleanInput)) {
      if (!cleanInput.startsWith('#')) cleanInput = '#' + cleanInput;
      const rgbVals = hexToRgb(cleanInput);
      if (rgbVals) {
        updateColorsFromRgb(rgbVals.r, rgbVals.g, rgbVals.b, cleanInput);
        return;
      }
    }
    
    // Parse RGB
    const rgbMatch = cleanInput.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1]), g = parseInt(rgbMatch[2]), b = parseInt(rgbMatch[3]);
      if (r <= 255 && g <= 255 && b <= 255) {
        const hexVal = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
        updateColorsFromRgb(r, g, b, hexVal);
        return;
      }
    }

    setError('Invalid color format. Try HEX (#FF5733) or RGB (rgb(255, 87, 51)).');
  };

  const updateColorsFromRgb = (r: number, g: number, b: number, hexVal: string) => {
    setHex(hexVal.toUpperCase());
    setRgb(`rgb(${r}, ${g}, ${b})`);
    
    const hslVals = rgbToHsl(r, g, b);
    setHsl(`hsl(${hslVals.h}, ${hslVals.s}%, ${hslVals.l}%)`);

    const cmykVals = rgbToCmyk(r, g, b);
    setCmyk(`cmyk(${cmykVals.c}%, ${cmykVals.m}%, ${cmykVals.y}%, ${cmykVals.k}%)`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHex(e.target.value);
    parseInputColor(e.target.value);
  };

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--c-void))] text-[rgb(var(--c-ink))] pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[rgb(var(--c-accent))] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Link href="/tools" className="inline-flex items-center text-[rgb(var(--c-mute))] hover:text-[rgb(var(--c-accent))] mb-8 transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
            Design Utility
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">Color Converter</h1>
          <p className="text-xl text-[rgb(var(--c-mute))]">Instantly translate colors between HEX, RGB, HSL, and CMYK for CSS and print.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <div className="glass-card rounded-2xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 sm:p-8">
              <label className="block text-sm font-semibold text-[rgb(var(--c-ink))] mb-3">Input Color (HEX or RGB)</label>
              
              <div className="flex gap-4">
                <input
                  type="color"
                  value={hex.length === 7 ? hex : '#000000'}
                  onChange={(e) => handleInputChange(e)}
                  className="w-14 h-14 rounded-lg cursor-pointer bg-transparent border-0 p-0 shrink-0"
                />
                <input
                  type="text"
                  value={hex}
                  onChange={handleInputChange}
                  placeholder="#000000"
                  className="flex-grow px-4 py-4 bg-[var(--c-glass-bg)] border border-[var(--c-glass-border)] rounded-xl text-[rgb(var(--c-ink))] placeholder-[rgb(var(--c-mute))] focus:outline-none focus:border-[rgb(var(--c-accent))] focus:ring-1 focus:ring-[rgb(var(--c-accent))] transition-all font-mono text-lg"
                  spellCheck="false"
                />
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 font-mono text-xs">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  {error}
                </div>
              )}
            </div>

            <div 
              className="w-full h-64 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.3)] border border-[var(--c-glass-border)] transition-colors duration-300 relative overflow-hidden"
              style={{ backgroundColor: hex }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none"></div>
            </div>
          </div>

          <div className="space-y-4">
            
            {[
              { label: 'HEX', value: hex },
              { label: 'RGB', value: rgb },
              { label: 'HSL', value: hsl },
              { label: 'CMYK', value: cmyk }
            ].map((color, idx) => (
              <div key={idx} className="glass-card rounded-xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-4 flex justify-between items-center group transition-colors hover:bg-[rgba(255,255,255,0.04)]">
                <div>
                  <div className="text-[rgb(var(--c-mute))] text-xs uppercase tracking-wider font-semibold mb-1">{color.label}</div>
                  <div className="font-mono text-[rgb(var(--c-ink))] text-lg">
                    {color.value}
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(color.value)}
                  className="p-2 text-[rgb(var(--c-mute))] hover:text-white bg-[rgba(255,255,255,0.05)] rounded-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all shrink-0"
                  title="Copy"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>
              </div>
            ))}

            <div className="glass-card rounded-xl border border-[var(--c-glass-border)] bg-[var(--c-glass-bg)] backdrop-blur-md p-6 mt-6">
               <h3 className="text-[rgb(var(--c-ink))] text-sm font-bold mb-3">CSS Variables Quick Copy</h3>
               <div className="bg-[rgba(17,17,17,0.05)] dark:bg-[rgba(0,0,0,0.3)] p-4 rounded-lg font-mono text-sm text-[rgb(var(--c-accent))] relative group">
                 <pre>
{`:root {
  --color-primary: ${hex};
  --color-rgb: ${rgb.replace('rgb(', '').replace(')', '')};
}`}
                 </pre>
                 <button
                  onClick={() => copyToClipboard(`:root {\n  --color-primary: ${hex};\n  --color-rgb: ${rgb.replace('rgb(', '').replace(')', '')};\n}`)}
                  className="absolute top-2 right-2 p-1.5 text-[rgb(var(--c-mute))] hover:text-white bg-[rgba(255,255,255,0.05)] rounded opacity-0 group-hover:opacity-100 transition-all"
                  title="Copy CSS"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>
               </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
