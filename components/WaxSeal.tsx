/**
 * Gold wax seal with an engraved heart. Rendered as two overlapping halves
 * (clipped left/right) so GSAP can "break" the seal apart on click.
 */
export default function WaxSeal({ className }: { className?: string }) {
  const seal = (
    <>
      {/* irregular wax blob */}
      <path
        d="M100 8 C128 6 148 16 162 32 C178 48 192 62 190 92 C188 124 178 142 160 158 C144 172 126 184 100 184 C74 184 52 174 38 158 C22 140 12 122 12 96 C12 66 24 46 42 30 C58 16 74 10 100 8 Z"
        fill="url(#waxGrad)"
      />
      <path
        d="M100 8 C128 6 148 16 162 32 C178 48 192 62 190 92 C188 124 178 142 160 158 C144 172 126 184 100 184 C74 184 52 174 38 158 C22 140 12 122 12 96 C12 66 24 46 42 30 C58 16 74 10 100 8 Z"
        fill="none"
        stroke="#7a5a26"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      {/* embossed inner disc */}
      <circle cx="100" cy="96" r="62" fill="url(#discGrad)" />
      <circle cx="100" cy="96" r="62" fill="none" stroke="#7a5a26" strokeOpacity="0.4" strokeWidth="1.5" />
      <circle cx="100" cy="96" r="55" fill="none" stroke="#fdf3d7" strokeOpacity="0.5" strokeWidth="1" />
      {/* engraved rope ring */}
      {Array.from({ length: 40 }, (_, i) => {
        const a = (i * 9 * Math.PI) / 180;
        const r = (n: number) => Math.round(n * 100) / 100;
        return (
          <line
            key={i}
            x1={r(100 + Math.cos(a) * 50)}
            y1={r(96 + Math.sin(a) * 50)}
            x2={r(100 + Math.cos(a) * 46)}
            y2={r(96 + Math.sin(a) * 46)}
            stroke="#8a6830"
            strokeOpacity="0.55"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        );
      })}
      {/* intricate heart */}
      <g>
        <path
          d="M100 128 C 78 112 64 100 64 84 C64 72 73 64 84 64 C92 64 98 69 100 75 C102 69 108 64 116 64 C127 64 136 72 136 84 C136 100 122 112 100 128 Z"
          fill="none"
          stroke="#6f5122"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M100 122 C 82 108 70 98 70 85 C70 75 77 69 85 69 C92 69 97 73 100 80 C103 73 108 69 115 69 C123 69 130 75 130 85 C130 98 118 108 100 122 Z"
          fill="none"
          stroke="#fdf3d7"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        {/* filigree inside the heart */}
        <path
          d="M85 86 Q 92 80 100 88 Q 108 80 115 86"
          fill="none"
          stroke="#6f5122"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M90 98 Q 100 92 110 98"
          fill="none"
          stroke="#6f5122"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <circle cx="100" cy="106" r="1.6" fill="#6f5122" />
      </g>
      {/* glints */}
      <ellipse cx="72" cy="44" rx="16" ry="7" transform="rotate(-32 72 44)" fill="#ffffff" opacity="0.28" />
      <ellipse cx="142" cy="146" rx="12" ry="5" transform="rotate(-30 142 146)" fill="#5d431c" opacity="0.25" />
    </>
  );

  return (
    <svg viewBox="0 0 200 192" className={className} aria-hidden="true" role="presentation">
      <defs>
        <radialGradient id="waxGrad" cx="38%" cy="32%" r="78%">
          <stop offset="0%" stopColor="#e7c885" />
          <stop offset="45%" stopColor="#c19a52" />
          <stop offset="80%" stopColor="#9a7333" />
          <stop offset="100%" stopColor="#7e5b25" />
        </radialGradient>
        <radialGradient id="discGrad" cx="40%" cy="34%" r="80%">
          <stop offset="0%" stopColor="#dfbe79" />
          <stop offset="60%" stopColor="#b98f47" />
          <stop offset="100%" stopColor="#946d2e" />
        </radialGradient>
        <clipPath id="sealLeft">
          <rect x="0" y="0" width="100" height="192" />
        </clipPath>
        <clipPath id="sealRight">
          <rect x="100" y="0" width="100" height="192" />
        </clipPath>
      </defs>
      <g data-seal-half="left" clipPath="url(#sealLeft)">{seal}</g>
      <g data-seal-half="right" clipPath="url(#sealRight)">{seal}</g>
      {/* crack line, revealed as halves separate */}
      <path
        d="M100 10 L 96 38 L 104 64 L 97 96 L 103 128 L 98 156 L 101 182"
        stroke="#5d431c"
        strokeWidth="0.8"
        strokeOpacity="0"
        fill="none"
        data-seal-crack
      />
    </svg>
  );
}
