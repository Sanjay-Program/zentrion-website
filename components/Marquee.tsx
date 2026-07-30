export default function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden relative [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex gap-16 items-center animate-marquee whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-2xl md:text-3xl font-semibold text-ink/25 hover:text-cyan/60 transition-colors cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
