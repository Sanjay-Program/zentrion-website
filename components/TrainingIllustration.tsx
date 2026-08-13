export default function TrainingIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 420"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Illustration of a cybersecurity awareness training session with a mentor and students at laptops"
    >
      <defs>
        <linearGradient id="ti-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-cyan, #00d4ff)" stopOpacity="0.14" />
          <stop offset="100%" stopColor="var(--color-cyan, #00d4ff)" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="ti-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#0077ff" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="640" height="420" rx="24" fill="url(#ti-bg)" />

      {/* grid overlay */}
      <g opacity="0.15" stroke="currentColor" strokeWidth="1">
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 64} y1="0" x2={i * 64} y2="420" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 60} x2="640" y2={i * 60} />
        ))}
      </g>

      {/* screen / presentation board */}
      <rect x="60" y="60" width="300" height="180" rx="10" fill="currentColor" opacity="0.06" />
      <rect x="60" y="60" width="300" height="180" rx="10" fill="none" stroke="#00d4ff" strokeOpacity="0.5" strokeWidth="2" />
      <path d="M100 190 L150 140 L190 165 L240 110 L300 150" fill="none" stroke="#00d4ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="150" cy="140" r="5" fill="#00d4ff" />
      <circle cx="240" cy="110" r="5" fill="#00d4ff" />

      {/* shield badge on the board */}
      <g transform="translate(300,60)">
        <path d="M20 0 L38 8 V26 C38 40 28 50 20 54 C12 50 2 40 2 26 V8 Z" fill="url(#ti-shield)" />
        <path d="M12 27 L18 33 L29 20" fill="none" stroke="#04121a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* mentor figure */}
      <g transform="translate(400,120)">
        <circle cx="30" cy="20" r="18" fill="currentColor" opacity="0.85" />
        <path d="M0 100 C0 65 60 65 60 100 L60 120 L0 120 Z" fill="currentColor" opacity="0.85" />
      </g>

      {/* laptop row - students */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${90 + i * 130},300)`}>
          <rect x="0" y="18" width="70" height="42" rx="6" fill="currentColor" opacity="0.08" stroke="#00d4ff" strokeOpacity="0.4" />
          <rect x="8" y="24" width="54" height="30" rx="3" fill="#00d4ff" opacity="0.18" />
          <circle cx="35" cy="-10" r="14" fill="currentColor" opacity="0.7" />
          <path d="M15 15 C15 -2 55 -2 55 15" fill="none" stroke="currentColor" strokeOpacity="0.7" strokeWidth="6" strokeLinecap="round" />
        </g>
      ))}

      {/* connecting network lines to suggest awareness/training reach */}
      <g stroke="#00d4ff" strokeOpacity="0.35" strokeWidth="1.5">
        <line x1="210" y1="150" x2="480" y2="330" />
        <line x1="210" y1="150" x2="345" y2="330" />
        <line x1="210" y1="150" x2="215" y2="330" />
      </g>
    </svg>
  );
}
