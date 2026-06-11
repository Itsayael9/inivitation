/** Subtle minimalist botanical line-art for the landing envelope. */
export function TopRightFloral({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 90" className={className} fill="none" aria-hidden="true" role="presentation">
      <path
        d="M 8 72 Q 28 52 48 36 Q 62 24 78 14"
        stroke="#8a9a82"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M 48 36 Q 52 28 58 22 Q 64 16 72 12"
        stroke="#8a9a82"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <ellipse cx="58" cy="22" rx="7" ry="4" fill="#a8b8a0" opacity="0.35" transform="rotate(-35 58 22)" />
      <ellipse cx="72" cy="14" rx="6" ry="3.5" fill="#b8a890" opacity="0.3" transform="rotate(-20 72 14)" />
      <ellipse cx="38" cy="48" rx="8" ry="4.5" fill="#9aaa92" opacity="0.32" transform="rotate(-50 38 48)" />
      <circle cx="78" cy="14" r="2.5" fill="#c4a87a" opacity="0.45" />
      <circle cx="48" cy="36" r="2" fill="#c4a87a" opacity="0.35" />
    </svg>
  );
}

export function BottomLeftFloral({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 90" className={className} fill="none" aria-hidden="true" role="presentation">
      <path
        d="M 82 18 Q 62 38 42 54 Q 28 66 12 76"
        stroke="#8a9a82"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M 42 54 Q 38 62 32 68 Q 26 74 18 78"
        stroke="#8a9a82"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <ellipse cx="32" cy="68" rx="7" ry="4" fill="#a8b8a0" opacity="0.35" transform="rotate(35 32 68)" />
      <ellipse cx="18" cy="78" rx="6" ry="3.5" fill="#b8a890" opacity="0.3" transform="rotate(20 18 78)" />
      <ellipse cx="52" cy="42" rx="8" ry="4.5" fill="#9aaa92" opacity="0.32" transform="rotate(50 52 42)" />
      <circle cx="12" cy="76" r="2.5" fill="#c4a87a" opacity="0.45" />
      <circle cx="42" cy="54" r="2" fill="#c4a87a" opacity="0.35" />
    </svg>
  );
}
