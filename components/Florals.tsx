import type { SVGProps } from "react";

/**
 * Hand-drawn-style line-art florals. All stems/leaves carry `data-draw`
 * (animated via stroke-dash draw-in) and blossoms carry `data-bloom`
 * (animated via scale pop) so GSAP can orchestrate them from parents.
 */

type SvgProps = SVGProps<SVGSVGElement>;

function Blossom({ cx, cy, r = 7 }: { cx: number; cy: number; r?: number }) {
  const petals = Array.from({ length: 5 }, (_, i) => {
    const a = (i * 72 - 90) * (Math.PI / 180);
    return (
      <ellipse
        key={i}
        cx={cx + Math.cos(a) * r * 0.62}
        cy={cy + Math.sin(a) * r * 0.62}
        rx={r * 0.52}
        ry={r * 0.34}
        transform={`rotate(${i * 72 - 90} ${cx + Math.cos(a) * r * 0.62} ${cy + Math.sin(a) * r * 0.62})`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    );
  });
  return (
    <g data-bloom style={{ transformOrigin: `${cx}px ${cy}px` }}>
      {petals}
      <circle cx={cx} cy={cy} r={r * 0.22} fill="currentColor" opacity="0.85" />
    </g>
  );
}

function Bud({ cx, cy, angle = 0 }: { cx: number; cy: number; angle?: number }) {
  return (
    <g data-bloom style={{ transformOrigin: `${cx}px ${cy}px` }}>
      <path
        d={`M ${cx - 3.5} ${cy + 4} Q ${cx} ${cy - 7} ${cx + 3.5} ${cy + 4} Q ${cx} ${cy + 7.5} ${cx - 3.5} ${cy + 4} Z`}
        transform={`rotate(${angle} ${cx} ${cy})`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </g>
  );
}

function Leaf({ x, y, angle, s = 1 }: { x: number; y: number; angle: number; s?: number }) {
  return (
    <path
      data-draw
      d={`M 0 0 Q ${7 * s} ${-6 * s} ${15 * s} 0 Q ${7 * s} ${6 * s} 0 0 Z`}
      transform={`translate(${x} ${y}) rotate(${angle})`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    />
  );
}

/** Symmetric garland arching over a section title. */
export function GarlandArch({ className, ...rest }: SvgProps) {
  return (
    <svg
      viewBox="0 0 320 90"
      className={className}
      fill="none"
      aria-hidden="true"
      role="presentation"
      {...rest}
    >
      {/* right stem (RTL reading start) */}
      <path
        data-draw
        d="M 160 64 C 200 64 232 56 258 38 C 272 28 284 22 300 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* left stem */}
      <path
        data-draw
        d="M 160 64 C 120 64 88 56 62 38 C 48 28 36 22 20 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Leaf x={210} y={59} angle={-18} />
      <Leaf x={240} y={48} angle={-30} />
      <Leaf x={268} y={32} angle={-38} s={0.85} />
      <Leaf x={110} y={59} angle={198} />
      <Leaf x={80} y={48} angle={210} />
      <Leaf x={52} y={32} angle={218} s={0.85} />
      <Blossom cx={300} cy={18} r={8} />
      <Blossom cx={20} cy={18} r={8} />
      <Blossom cx={160} cy={58} r={9} />
      <Bud cx={236} cy={40} angle={50} />
      <Bud cx={84} cy={40} angle={-50} />
    </svg>
  );
}

/** Tall side branch used to frame sections on wide screens. */
export function SideBranch({ className, flip = false, ...rest }: SvgProps & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 70 360"
      className={className}
      fill="none"
      aria-hidden="true"
      role="presentation"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      {...rest}
    >
      <path
        data-draw
        d="M 35 352 C 22 300 44 268 32 220 C 22 178 46 150 36 108 C 28 72 44 44 38 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Leaf x={33} y={300} angle={-145} />
      <Leaf x={37} y={250} angle={30} />
      <Leaf x={31} y={195} angle={-150} />
      <Leaf x={39} y={140} angle={25} />
      <Leaf x={32} y={84} angle={-140} />
      <Blossom cx={38} cy={10} r={8} />
      <Blossom cx={30} cy={222} r={6.5} />
      <Blossom cx={40} cy={110} r={6.5} />
      <Bud cx={36} cy={52} angle={-15} />
      <Bud cx={30} cy={166} angle={20} />
      <Bud cx={38} cy={278} angle={-20} />
    </svg>
  );
}

/** Small horizontal divider sprig. */
export function DividerSprig({ className, ...rest }: SvgProps) {
  return (
    <svg
      viewBox="0 0 220 36"
      className={className}
      fill="none"
      aria-hidden="true"
      role="presentation"
      {...rest}
    >
      <path
        data-draw
        d="M 10 18 C 50 10 80 26 110 18 C 140 10 170 26 210 18"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <Leaf x={58} y={16} angle={-160} s={0.7} />
      <Leaf x={152} y={20} angle={15} s={0.7} />
      <Blossom cx={110} cy={18} r={7} />
      <Bud cx={34} cy={15} angle={-25} />
      <Bud cx={186} cy={21} angle={25} />
    </svg>
  );
}

/** Dense corner garden used in the final reveal ("garden in bloom"). */
export function GardenBurst({ className, flip = false, ...rest }: SvgProps & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      fill="none"
      aria-hidden="true"
      role="presentation"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      {...rest}
    >
      <path
        data-draw
        d="M 8 236 C 30 180 18 140 52 96 C 78 62 110 52 150 44"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        data-draw
        d="M 6 232 C 60 222 96 196 118 160 C 136 130 138 104 134 76"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        data-draw
        d="M 10 238 C 44 216 84 214 122 222"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <Leaf x={30} y={190} angle={-110} s={1.1} />
      <Leaf x={42} y={130} angle={-60} s={1.1} />
      <Leaf x={84} y={74} angle={-30} />
      <Leaf x={70} y={206} angle={-15} />
      <Leaf x={104} y={178} angle={-50} />
      <Leaf x={128} y={130} angle={-75} s={0.9} />
      <Leaf x={60} y={226} angle={10} s={0.9} />
      <Blossom cx={152} cy={42} r={10} />
      <Blossom cx={134} cy={74} r={7} />
      <Blossom cx={120} cy={222} r={8} />
      <Blossom cx={52} cy={96} r={7} />
      <Blossom cx={118} cy={158} r={6} />
      <Bud cx={92} cy={58} angle={35} />
      <Bud cx={130} cy={108} angle={10} />
      <Bud cx={92} cy={196} angle={60} />
      <Bud cx={26} cy={160} angle={-30} />
    </svg>
  );
}
