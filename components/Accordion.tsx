'use client';

import { useState } from 'react';

export type AccordionItem = {
  title: string;
  content: string;
  meta?: string;
};

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="w-full flex items-center justify-between gap-4 py-5 text-left group"
            >
              <span className="flex items-center gap-4 min-w-0">
                <span className="font-mono text-xs text-cyan shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display font-semibold text-base md:text-lg truncate">
                  {item.title}
                </span>
              </span>
              <span className="flex items-center gap-4 shrink-0">
                {item.meta && (
                  <span className="hidden sm:inline text-xs text-mute font-mono">{item.meta}</span>
                )}
                <span
                  className={`text-cyan transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </span>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 pl-9 text-sm text-mute leading-relaxed max-w-2xl">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
