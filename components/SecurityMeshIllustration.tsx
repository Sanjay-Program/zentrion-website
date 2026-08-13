export default function SecurityMeshIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 360"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Illustration of connected security nodes representing identities, applications, cloud and AI systems"
    >
      <defs>
        <radialGradient id="sm-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="640" height="360" rx="20" fill="url(#sm-glow)" />
      <g opacity="0.12" stroke="currentColor">
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 64} y1="0" x2={i * 64} y2="360" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 60} x2="640" y2={i * 60} />
        ))}
      </g>

      {(() => {
        const nodes = [
          { x: 320, y: 180, r: 22, label: 'Core' },
          { x: 150, y: 90, r: 14, label: 'Identity' },
          { x: 480, y: 90, r: 14, label: 'Cloud' },
          { x: 130, y: 260, r: 14, label: 'API' },
          { x: 500, y: 260, r: 14, label: 'AI' },
          { x: 320, y: 60, r: 12, label: 'Endpoint' },
          { x: 320, y: 300, r: 12, label: 'Data' },
        ];
        const [core, ...rest] = nodes;
        return (
          <>
            <g stroke="#00d4ff" strokeOpacity="0.4" strokeWidth="1.5">
              {rest.map((n) => (
                <line key={n.label} x1={core.x} y1={core.y} x2={n.x} y2={n.y} />
              ))}
            </g>
            <circle cx={core.x} cy={core.y} r={core.r} fill="#00d4ff" />
            {rest.map((n) => (
              <g key={n.label}>
                <circle cx={n.x} cy={n.y} r={n.r} fill="currentColor" opacity="0.85" />
                <text
                  x={n.x}
                  y={n.y + n.r + 16}
                  textAnchor="middle"
                  fontSize="11"
                  fill="currentColor"
                  opacity="0.6"
                  fontFamily="var(--font-body, sans-serif)"
                >
                  {n.label}
                </text>
              </g>
            ))}
          </>
        );
      })()}
    </svg>
  );
}
