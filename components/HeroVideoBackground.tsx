'use client';

/**
 * Muted, looping video layer for hero sections. Sits behind other hero
 * layers (e.g. ShaderHero) and is purely decorative, so it's marked
 * aria-hidden and never blocks pointer events.
 */
export default function HeroVideoBackground({
  src = '/videos/hero-bg.mp4',
  poster = '/videos/hero-bg-poster.jpg',
  className = '',
  opacity = 'opacity-30',
}: {
  src?: string;
  poster?: string;
  className?: string;
  opacity?: string;
}) {
  return (
    <video
      className={`pointer-events-none absolute inset-0 w-full h-full object-cover ${opacity} ${className}`}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
