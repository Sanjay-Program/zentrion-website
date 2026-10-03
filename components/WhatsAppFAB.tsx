'use client';

import React, { useEffect, useState, useRef } from 'react';
import { buildWhatsAppLink } from '@/lib/contact';
import { ShieldCheck, Bot, GraduationCap, MessageSquareText } from 'lucide-react';

const WHATSAPP_OPTIONS = [
  {
    label: 'Cybersecurity Services',
    description: 'VAPT, Audits, SOC, Cloud Security',
    icon: <ShieldCheck className="w-5 h-5 text-cyan drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]" />,
    bg: 'bg-cyan/10 border-cyan/20 group-hover:border-cyan/50',
    message: "Hi Zentrion! I'm interested in your Cybersecurity Services. I'd like to discuss an audit or security solution for my business."
  },
  {
    label: 'AI & Automation',
    description: 'LLMs, RAG, Enterprise Agents',
    icon: <Bot className="w-5 h-5 text-signal drop-shadow-[0_0_8px_rgba(255,51,102,0.8)]" />,
    bg: 'bg-signal/10 border-signal/20 group-hover:border-signal/50',
    message: "Hi Zentrion! I'd like to learn more about your AI & Automation solutions and how they can help my business."
  },
  {
    label: 'Internships / Careers',
    description: 'Join the team, training & roles',
    icon: <GraduationCap className="w-5 h-5 text-violet drop-shadow-[0_0_8px_rgba(138,43,226,0.8)]" />,
    bg: 'bg-violet/10 border-violet/20 group-hover:border-violet/50',
    message: "Hi Zentrion HR! I'm reaching out regarding internships and career opportunities."
  },
  {
    label: 'General Enquiry',
    description: 'Questions, partnerships, other',
    icon: <MessageSquareText className="w-5 h-5 text-[#25D366] drop-shadow-[0_0_8px_rgba(37,211,102,0.8)]" />,
    bg: 'bg-[#25D366]/10 border-[#25D366]/20 group-hover:border-[#25D366]/50',
    message: "Hi Zentrion! I have a general enquiry and would like to speak with someone."
  }
];

export default function WhatsAppFAB() {
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show FAB after 3 seconds so it doesn't hurt LCP
    const t = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!show) return null;

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
      
      {/* Expanded Menu Options */}
      <div 
        className={`flex flex-col gap-2 transition-all duration-300 origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        {WHATSAPP_OPTIONS.map((opt, i) => (
          <a
            key={i}
            href={buildWhatsAppLink(opt.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[rgb(var(--c-surface))] border border-[var(--c-glass-border)] hover:bg-[rgb(var(--c-surface))]/80 p-3.5 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 min-w-[280px] group hover:scale-[1.02]"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-colors duration-300 ${opt.bg}`}>
              {opt.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white group-hover:text-white transition-colors">{opt.label}</p>
              <p className="text-[12px] text-[rgb(var(--c-mute))] mt-0.5 group-hover:text-[rgb(var(--c-mute))]/80">{opt.description}</p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mute">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </div>
          </a>
        ))}
      </div>

      {/* Main FAB Toggle Button */}
      <button
        id="whatsapp-fab"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with Zentrion on WhatsApp"
        aria-expanded={isOpen}
        className={`flex items-center gap-3 text-white rounded-full transition-all duration-300 ${
          isOpen 
            ? 'bg-[#1ebe57] shadow-[0_4px_32px_rgba(37,211,102,0.6)] scale-105' 
            : 'bg-[#25D366] hover:bg-[#1ebe57] shadow-[0_4px_24px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_32px_rgba(37,211,102,0.6)] hover:scale-105'
        }`}
        style={{ padding: '14px 22px' }}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6 shrink-0" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        )}
        <span className="text-sm font-semibold whitespace-nowrap">
          {isOpen ? 'Close' : 'Chat with us'}
        </span>
      </button>
    </div>
  );
}
