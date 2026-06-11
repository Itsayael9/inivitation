"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import GeometricOrnament from "./GeometricOrnament";
import { WEDDING_DATE } from "@/lib/wedding";
import { prefersReducedMotion } from "@/lib/motion";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getRemaining(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function Unit({
  display,
  label,
  animateKey,
}: {
  display: string;
  label: string;
  animateKey?: string | number;
}) {
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!animateKey || !valueRef.current || prefersReducedMotion()) return;
    gsap.fromTo(
      valueRef.current,
      { y: -10, opacity: 0, scale: 0.92 },
      { y: 0, opacity: 1, scale: 1, duration: 0.38, ease: "back.out(2.2)" }
    );
  }, [animateKey]);

  return (
    <div data-countdown-unit className="flex flex-col items-center min-w-[2.6rem] sm:min-w-[4rem]">
      <span
        ref={valueRef}
        className="font-body text-charcoal text-[clamp(1.25rem,5vw,2.25rem)] font-bold tabular-nums tracking-wide"
        dir="ltr"
      >
        {display}
      </span>
      <span className="font-sans text-ink-soft/80 text-[0.6rem] sm:text-xs mt-1 tracking-wide">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [remaining, setRemaining] = useState(() => getRemaining(WEDDING_DATE));

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining(WEDDING_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds } = remaining;

  return (
    <div className="flex flex-col items-center gap-5 sm:gap-6 w-full">
      <h2 data-reveal-title className="font-display gold-text text-2xl sm:text-3xl leading-relaxed text-center">
        يبدأ الاحتفال
      </h2>

      <div
        data-reveal-divider
        className="flex items-center justify-center gap-0 w-full max-w-[88%]"
        aria-hidden="true"
      >
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-deep/70 to-gold-deep/90" />
        <GeometricOrnament className="w-8 h-8 sm:w-9 sm:h-9 text-gold-deep shrink-0 mx-3" />
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-deep/70 to-gold-deep/90" />
      </div>

      <div
        className="flex items-start justify-center gap-1 sm:gap-2"
        role="timer"
        aria-live="polite"
        aria-label={`العد التنازلي: ${days} يوم و ${hours} ساعة و ${minutes} دقيقة و ${seconds} ثانية`}
      >
        <Unit display={String(days)} label="أيام" animateKey={days} />
        <span className="font-body text-charcoal text-xl sm:text-3xl font-bold mt-0.5 tabular-nums">:</span>
        <Unit display={pad(hours)} label="ساعات" animateKey={hours} />
        <span className="font-body text-charcoal text-xl sm:text-3xl font-bold mt-0.5 tabular-nums">:</span>
        <Unit display={pad(minutes)} label="دقائق" animateKey={minutes} />
        <span className="font-body text-charcoal text-xl sm:text-3xl font-bold mt-0.5 tabular-nums">:</span>
        <Unit display={pad(seconds)} label="ثوانٍ" animateKey={seconds} />
      </div>
    </div>
  );
}
