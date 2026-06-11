"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import GeometricOrnament from "./GeometricOrnament";
import { engagementMemories } from "@/lib/wedding";
import { prefersReducedMotion } from "@/lib/motion";

export default function EngagementMemories() {
  const [index, setIndex] = useState(0);
  const touchStart = useRef(0);
  const count = engagementMemories.length;

  const go = useCallback(
    (next: number) => {
      setIndex((next + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => go(index + 1), 5500);
    return () => clearInterval(id);
  }, [index, go]);

  function onTouchStart(e: React.TouchEvent) {
    touchStart.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 40) return;
    go(diff > 0 ? index + 1 : index - 1);
  }

  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-5 sm:gap-6">
      <div data-reveal-title className="text-center flex flex-col gap-2">
        <h2 className="font-display gold-text text-[clamp(1.35rem,5vw,1.85rem)]">ذكريات الخطوبة</h2>
        <p className="font-sans text-charcoal/70 text-sm sm:text-base">لحظات جميلة من بداية حكايتنا</p>
      </div>

      <div
        data-reveal-divider
        className="flex items-center justify-center gap-0 w-full max-w-[88%]"
        aria-hidden="true"
      >
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-deep/70 to-gold-deep/90" />
        <GeometricOrnament className="w-7 h-7 sm:w-8 sm:h-8 text-gold-deep shrink-0 mx-3" />
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-deep/70 to-gold-deep/90" />
      </div>

      <div
        data-memory-slider
        className="memory-slider relative w-full"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-roledescription="carousel"
        aria-label="ذكريات الخطوبة"
      >
        <div className="memory-slider-frame rounded-2xl border border-gold/40 bg-card-cream p-2 sm:p-2.5 shadow-[0_20px_48px_-24px_rgba(60,45,20,0.45)]">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
            {engagementMemories.map((photo, i) => (
              <div
                key={photo.src}
                data-memory-slide
                className={`memory-slide absolute inset-0 transition-all duration-700 ease-out ${
                  i === index
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-[1.03] z-0 pointer-events-none"
                }`}
                aria-hidden={i !== index}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 480px) 88vw, 384px"
                  priority={i === 0}
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="الصورة السابقة"
              className="memory-slider-btn memory-slider-btn--prev"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
                <path
                  d="M14 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="الصورة التالية"
              className="memory-slider-btn memory-slider-btn--next"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
                <path
                  d="M10 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2" role="tablist" aria-label="اختيار صورة">
        {engagementMemories.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`صورة ${i + 1} من ${count}`}
            onClick={() => setIndex(i)}
            className={`memory-dot ${i === index ? "memory-dot--active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
