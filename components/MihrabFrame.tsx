import type { SVGProps } from "react";

/**
 * Double-line gold border tracing a Mihrab-style pointed arch,
 * matching the reference invitation card frame.
 */
export default function MihrabFrame({ className, ...props }: SVGProps<SVGSVGElement>) {
  const outer =
    "M 32 598 L 32 128 C 32 88 108 44 200 38 C 292 44 368 88 368 128 L 368 598";
  const inner =
    "M 38 592 L 38 132 C 38 96 110 56 200 50 C 290 56 362 96 362 132 L 362 592";

  return (
    <svg
      viewBox="0 0 400 620"
      className={className}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      role="presentation"
      {...props}
    >
      <path d={outer} stroke="currentColor" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
      <path d={inner} stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
