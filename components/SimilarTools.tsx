'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/tools-data';

export default function SimilarTools() {
  const pathname = usePathname();
  const [similar, setSimilar] = useState<{ name: string; url: string }[]>([]);

  useEffect(() => {
    // Only show on actual tool pages, not the dashboard itself
    if (pathname === '/tools' || !pathname.startsWith('/tools/')) {
      setSimilar([]);
      return;
    }

    // Find the category that contains the current tool
    let foundCategory = null;
    let currentTool = null;

    for (const cat of CATEGORIES) {
      const tool = cat.tools.find(t => t.url === pathname);
      if (tool) {
        foundCategory = cat;
        currentTool = tool;
        break;
      }
    }

    if (foundCategory && currentTool) {
      // Filter out the current tool and pick up to 4 similar ones
      const related = foundCategory.tools
        .filter(t => t.url !== pathname)
        .sort(() => 0.5 - Math.random()) // Simple shuffle
        .slice(0, 4);
      
      setSimilar(related);
    } else {
      // Fallback if not found in categories (e.g. newly added tool not yet registered)
      // Just pick 4 random tools from the entire list
      const allTools = CATEGORIES.flatMap(c => c.tools);
      const randomTools = allTools
        .filter(t => t.url !== pathname)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      setSimilar(randomTools);
    }
  }, [pathname]);

  if (similar.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[rgba(255,255,255,0.05)]">
      <div className="flex items-center gap-2 mb-8">
        <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--c-accent))] animate-pulseDot" />
        <h3 className="text-xl font-display font-semibold text-white">Explore Similar Tools</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {similar.map((tool) => (
          <Link href={tool.url} key={tool.url} className="group">
            <div className="glass-card rounded-xl p-5 border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.1)] transition-all h-full flex flex-col justify-between">
              <h4 className="font-semibold text-[rgb(var(--c-accent))] mb-3 group-hover:text-white transition-colors">
                {tool.name}
              </h4>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-[rgb(var(--c-mute))] font-mono">Launch Tool</span>
                <svg className="w-4 h-4 text-[rgb(var(--c-mute))] group-hover:text-[rgb(var(--c-accent))] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-[rgb(var(--c-mute))] hover:text-white transition-colors">
          View all 70+ security tools <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
