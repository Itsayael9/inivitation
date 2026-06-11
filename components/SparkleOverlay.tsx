"use client";

const SPARKLES = [
  { top: "12%", left: "8%", delay: "0s", size: 3 },
  { top: "22%", left: "88%", delay: "1.2s", size: 2 },
  { top: "38%", left: "15%", delay: "2.4s", size: 2.5 },
  { top: "55%", left: "92%", delay: "0.8s", size: 3 },
  { top: "68%", left: "6%", delay: "1.8s", size: 2 },
  { top: "78%", left: "78%", delay: "3s", size: 2.5 },
  { top: "45%", left: "48%", delay: "2s", size: 2 },
  { top: "85%", left: "42%", delay: "1.4s", size: 3 },
  { top: "18%", left: "52%", delay: "2.6s", size: 2 },
  { top: "62%", left: "58%", delay: "0.5s", size: 2.5 },
] as const;

/** Soft gold sparkles drifting over the open invitation. */
export default function SparkleOverlay() {
  return (
    <div className="sparkle-overlay fixed inset-0 z-[24] pointer-events-none overflow-hidden" aria-hidden="true">
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="sparkle-dot"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
