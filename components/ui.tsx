'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode, useRef } from 'react';

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function GlassCard({
  children,
  className = '',
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!hover || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tiltX = (y - rect.height / 2) / 18;
    const tiltY = (rect.width / 2 - x) / 18;
    ref.current.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
  }

  function handleLeave() {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`glass-card rounded-xl p-6 md:p-7 ${
        hover ? 'transition-[transform,border-color,box-shadow] duration-300 ease-out hover:border-cyan/40' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function ServiceCard({
  eyebrow,
  title,
  description,
  href,
  points,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  points: string[];
}) {
  return (
    <Link href={href} className="group block">
      <GlassCard className="h-full">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="mt-3 font-display text-xl font-semibold">{title}</h3>
        <p className="mt-3 text-sm text-mute leading-relaxed">{description}</p>
        <ul className="mt-4 space-y-2">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm text-mute">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-cyan shrink-0" />
              {p}
            </li>
          ))}
        </ul>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-cyan group-hover:gap-2.5 transition-all">
          Explore <ArrowIcon />
        </span>
      </GlassCard>
    </Link>
  );
}

export function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl md:text-4xl font-semibold text-gradient">{value}</p>
      <p className="mt-1 text-sm text-mute">{label}</p>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <Reveal className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold leading-tight">
        {title}
      </h2>
      {description && <p className="mt-4 text-mute leading-relaxed">{description}</p>}
    </Reveal>
  );
}

export function CTASection({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="container-x py-20 md:py-28">
      <Reveal>
        <div className="glass-card rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-4xl font-semibold max-w-2xl mx-auto">
              {title}
            </h2>
            <p className="mt-4 text-mute max-w-xl mx-auto">{description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={primary.href} className="btn-primary">
                {primary.label}
              </Link>
              {secondary && (
                <Link href={secondary.href} className="btn-ghost">
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
