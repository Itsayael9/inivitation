/** Gold geometric knot ornament — matches the reference invitation motif. */
export default function GeometricOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 52 52"
      className={className}
      fill="none"
      aria-hidden="true"
      role="presentation"
    >
      <g stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
        {/* outer diamond */}
        <path d="M26 4 L48 26 L26 48 L4 26 Z" />
        {/* inner rotated square */}
        <path d="M26 11 L39 26 L26 41 L13 26 Z" />
        {/* interlaced arcs */}
        <path d="M26 4 C18 14 14 22 13 26 C14 30 18 38 26 48" />
        <path d="M26 4 C34 14 38 22 39 26 C38 30 34 38 26 48" />
        <path d="M4 26 C14 18 22 14 26 13 C30 14 38 18 48 26" />
        <path d="M4 26 C14 34 22 38 26 39 C30 38 38 34 48 26" />
        {/* center petal */}
        <circle cx="26" cy="26" r="3.2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
