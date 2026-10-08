import React from 'react';

/**
 * PrividLogo - Exact reproduction of the user's PRiViD logo
 * Featuring geometric lettering with digital dispersing pixel fragments,
 * styled in the website's red technology theme.
 */
export default function PrividLogo({ height = 36, showTagline = false }) {
  // SVG viewBox is 460 x 140
  // Letters: P, R, i, V, i, D in crisp futuristic white with neon red digital pixels
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <svg
        height={height}
        viewBox="0 0 480 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', maxWidth: '100%', filter: 'drop-shadow(0 2px 10px rgba(255,51,68,0.25))' }}
      >
        <defs>
          <linearGradient id="prividWhite" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e6edf5" />
          </linearGradient>

          <linearGradient id="prividRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4455" />
            <stop offset="100%" stopColor="#ff1744" />
          </linearGradient>

          <filter id="redGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ff2244" floodOpacity="0.8" />
          </filter>

          <filter id="subtleBevel">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* ─── DIGITAL PIXEL SQUARES (DISPERSING PARTICLES) ─── */}
        {/* Above P */}
        <rect x="52" y="18" width="12" height="12" rx="1.5" fill="url(#prividRed)" filter="url(#redGlow)" />
        <rect x="40" y="28" width="12" height="12" rx="1.5" fill="url(#prividRed)" filter="url(#redGlow)" />
        <rect x="28" y="36" width="10" height="10" rx="1" fill="#ffffff" opacity="0.4" />
        <rect x="18" y="44" width="8" height="8" rx="1" fill="#ffffff" opacity="0.25" />

        {/* Above R */}
        <rect x="206" y="16" width="12" height="12" rx="1.5" fill="url(#prividRed)" filter="url(#redGlow)" />
        <rect x="206" y="30" width="12" height="12" rx="1.5" fill="url(#prividRed)" filter="url(#redGlow)" />
        <rect x="198" y="22" width="8" height="8" rx="1" fill="#ffffff" opacity="0.3" />

        {/* Foot of R */}
        <rect x="178" y="88" width="10" height="10" rx="1" fill="url(#prividRed)" filter="url(#redGlow)" />
        <rect x="186" y="98" width="10" height="10" rx="1" fill="url(#prividRed)" filter="url(#redGlow)" />

        {/* Above V */}
        <rect x="304" y="28" width="12" height="12" rx="1.5" fill="url(#prividRed)" filter="url(#redGlow)" />
        <rect x="296" y="38" width="8" height="8" rx="1" fill="#ffffff" opacity="0.4" />
        <rect x="290" y="46" width="7" height="7" rx="1" fill="#ffffff" opacity="0.25" />

        {/* Above second i */}
        <rect x="348" y="16" width="12" height="12" rx="1.5" fill="url(#prividRed)" filter="url(#redGlow)" />
        <rect x="348" y="32" width="12" height="12" rx="1.5" fill="url(#prividRed)" filter="url(#redGlow)" />
        <rect x="360" y="24" width="9" height="9" rx="1" fill="#ffffff" opacity="0.3" />

        {/* Above D */}
        <rect x="434" y="26" width="12" height="12" rx="1.5" fill="url(#prividRed)" filter="url(#redGlow)" />
        <rect x="444" y="36" width="10" height="10" rx="1" fill="#ffffff" opacity="0.4" />
        <rect x="454" y="42" width="11" height="11" rx="1.5" fill="url(#prividRed)" filter="url(#redGlow)" />

        {/* ─── MAIN LETTERS (P R i V i D) ─── */}
        <g fill="url(#prividWhite)" filter="url(#subtleBevel)" stroke="#ffffff" strokeWidth="0.8">
          {/* Letter P */}
          <path d="M 32 46 L 90 46 C 104 46 112 55 112 68 C 112 81 104 90 90 90 L 56 90 L 56 126 L 32 126 Z M 56 64 L 86 64 C 92 64 96 66 96 68 C 96 71 92 73 86 73 L 56 73 Z" />

          {/* Letter R */}
          <path d="M 120 46 L 174 46 C 187 46 195 54 195 66 C 195 76 189 83 179 86 L 198 126 L 172 126 L 156 89 L 144 89 L 144 126 L 120 126 Z M 144 63 L 170 63 C 175 63 178 64 178 66 C 178 68 175 70 170 70 L 144 70 Z" />

          {/* Letter i (Lowercase with tech pixel dot) */}
          <path d="M 212 58 L 228 58 L 228 126 L 212 126 Z" />

          {/* Letter V */}
          <path d="M 238 46 L 258 46 L 276 104 L 294 46 L 314 46 L 286 126 L 266 126 Z" />

          {/* Second Letter i */}
          <path d="M 330 58 L 346 58 L 346 126 L 330 126 Z" />

          {/* Letter D */}
          <path d="M 364 46 L 416 46 C 435 46 446 59 446 86 C 446 113 435 126 416 126 L 364 126 Z M 388 64 L 412 64 C 424 64 428 72 428 86 C 428 100 424 108 412 108 L 388 108 Z" />
        </g>

        {/* Subtle geometric beveled accents on letters */}
        <path d="M 90 90 L 102 102 L 94 102 Z" fill="#ffffff" opacity="0.3" />
        <path d="M 32 46 L 44 46 L 32 58 Z" fill="#ffffff" opacity="0.4" />
      </svg>

      {showTagline && (
        <span
          style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 12,
            fontWeight: 700,
            color: '#ff4444',
            letterSpacing: 3.5,
            textTransform: 'uppercase',
            marginTop: 4,
            paddingLeft: 4,
          }}
        >
          IoT 3D Laboratory
        </span>
      )}
    </div>
  );
}
