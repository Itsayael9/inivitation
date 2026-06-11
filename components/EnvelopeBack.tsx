/** Subtle envelope-back fold lines — matches the reference cover design. */
export default function EnvelopeBack({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      aria-hidden="true"
      role="presentation"
    >
      {/* top flap */}
      <path
        d="M 20 30 L 200 195 L 380 30"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
      />
      {/* left fold */}
      <path
        d="M 20 370 L 200 195"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* right fold */}
      <path
        d="M 380 370 L 200 195"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}
