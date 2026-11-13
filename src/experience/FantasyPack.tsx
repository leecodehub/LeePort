/**
 * Original sealed fantasy pack. No text, logos, brands, or characters.
 * The same artwork is used across the wheel by design.
 */
export function FantasyPack() {
  return (
    <div className="fantasy-pack">
      <div className="fantasy-pack__crimp fantasy-pack__crimp--top" aria-hidden="true" />
      <div className="fantasy-pack__art" aria-hidden="true">
        <svg viewBox="0 0 220 330" preserveAspectRatio="xMidYMid slice" fill="none">
          <defs>
            <linearGradient id="fp-sky" x1="110" y1="0" x2="110" y2="330" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0b2745" />
              <stop offset=".48" stopColor="#145a63" />
              <stop offset=".78" stopColor="#4c7a70" />
              <stop offset="1" stopColor="#33243f" />
            </linearGradient>
            <linearGradient id="fp-hill" x1="110" y1="150" x2="110" y2="310" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2b6f68" />
              <stop offset="1" stopColor="#0d2b34" />
            </linearGradient>
            <linearGradient id="fp-crystal" x1="110" y1="90" x2="110" y2="230" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffd89a" />
              <stop offset=".5" stopColor="#f08dae" />
              <stop offset="1" stopColor="#8f7ddf" />
            </linearGradient>
            <radialGradient id="fp-glow" cx="0" cy="0" r="1" gradientTransform="translate(112 157) rotate(90) scale(124)">
              <stop stopColor="#ffd9ab" stopOpacity=".55" />
              <stop offset=".55" stopColor="#7ed7d1" stopOpacity=".13" />
              <stop offset="1" stopColor="#7ed7d1" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="220" height="330" fill="url(#fp-sky)" />
          <circle cx="144" cy="64" r="25" fill="#f3e4b0" />
          <circle cx="153" cy="57" r="23" fill="#0b2745" />
          <rect x="34" y="46" width="2" height="2" fill="#f3e4b0" opacity=".8" />
          <rect x="74" y="32" width="2" height="2" fill="#b9e4dc" opacity=".8" />
          <rect x="182" y="96" width="2" height="2" fill="#f3e4b0" opacity=".65" />
          <rect x="24" y="120" width="2" height="2" fill="#b9e4dc" opacity=".55" />

          <ellipse cx="112" cy="156" rx="102" ry="98" fill="url(#fp-glow)" />

          <path d="M-10 222h34v-12h20v-16h22v12h18v16h24v-20h18v-14h18v14h14v20h28v-8h18v8h24v110H-10Z" fill="#164b4e" opacity=".9" />
          <path d="M-10 238h42v-10h26v-8h24v8h18v10h32v-8h24v-6h20v6h14v8h34v84H-10Z" fill="url(#fp-hill)" />

          <path d="M110 254c14-23 34-43 66-58-24 29-43 56-54 87-8-22-15-42-27-60 8 8 12 20 15 31Z" fill="#0a1d28" opacity=".8" />
          <path d="M58 290c18-16 31-32 45-53 12 22 21 38 31 51-22-7-48-6-76 2Z" fill="#173d3d" opacity=".9" />

          <g>
            <path d="M110 104 82 156l28 76 28-76Z" fill="url(#fp-crystal)" />
            <path d="M110 104v128M82 156h56" stroke="#fff4df" strokeOpacity=".45" strokeWidth="1.2" />
            <path d="M110 104 96 156l14 76 14-76Z" fill="#fff1cf" opacity=".22" />
          </g>

          <g stroke="#b9e4dc" strokeOpacity=".45" strokeWidth="1">
            <path d="M-20 216c58-32 96-5 142-28s66-18 118 8" />
            <path d="M-20 226c58-32 96-5 142-28s66-18 118 8" strokeOpacity=".22" />
            <path d="M-20 236c58-32 96-5 142-28s66-18 118 8" strokeOpacity=".12" />
          </g>

          <g fill="#f4e8c8">
            <circle cx="45" cy="78" r="1.4" />
            <circle cx="176" cy="190" r="1.2" />
            <circle cx="50" cy="194" r="1" />
            <circle cx="190" cy="36" r="1.1" />
            <circle cx="36" cy="248" r="1.3" />
          </g>

          <rect x="10" y="10" width="200" height="310" rx="6" stroke="#e8f5ef" strokeOpacity=".28" />
          <rect x="16" y="16" width="188" height="298" rx="3" stroke="#e8f5ef" strokeOpacity=".1" />
        </svg>
        <span className="fantasy-pack__seal">
          <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path d="M20 1 24 16 39 20 24 24 20 39 16 24 1 20 16 16Z" fill="#fff1cf" fillOpacity=".9" />
            <circle cx="20" cy="20" r="4" fill="#7ed7d1" />
          </svg>
        </span>
        <span className="fantasy-pack__shine" />
      </div>
      <div className="fantasy-pack__crimp fantasy-pack__crimp--bottom" aria-hidden="true" />
    </div>
  )
}
