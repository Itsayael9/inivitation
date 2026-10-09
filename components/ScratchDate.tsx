"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

type CardData = { value: string; label: string; sub?: string };

const CARDS: CardData[] = [
  { value: "17", label: "اليوم", sub: "السبت" },
  { value: "أكتوبر", label: "الشهر" },
  { value: "2026", label: "السنة" },
];

function ScratchCard({ value, label, sub, index }: CardData & { index: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scratching = useRef(false);
  const [revealed, setRevealed] = useState(false);

  const paintScratch = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    canvas.width = w;
    canvas.height = h;

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#e8d4a8");
    grad.addColorStop(0.35, "#c9a45e");
    grad.addColorStop(0.65, "#b08d4f");
    grad.addColorStop(1, "#8f6f35");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "rgba(255,255,255,0.22)";
    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 2.5 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }
    paintScratch();
    const onResize = () => paintScratch();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [paintScratch]);

  useEffect(() => {
    if (!revealed || !wrapRef.current) return;
    gsap.fromTo(
      wrapRef.current,
      { scale: 0.92 },
      { scale: 1, duration: 0.55, ease: "back.out(2.5)" }
    );
  }, [revealed]);

  function checkReveal() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas || revealed) return;
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    const total = img.data.length / 4;
    for (let i = 3; i < img.data.length; i += 16) {
      if (img.data[i] === 0) cleared++;
    }
    if (cleared / (total / 4) > 0.38) setRevealed(true);
  }

  function getPos(e: React.PointerEvent) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function erase(e: React.PointerEvent) {
    if (revealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
  }

  return (
    <div className="flex flex-col items-center gap-2 w-full" data-hero-item style={{ transitionDelay: `${index * 80}ms` }}>
      <div
        ref={wrapRef}
        className={`scratch-card scratch-card--premium relative w-full aspect-[3/4] max-h-[108px] sm:max-h-[124px] ${!revealed ? "scratch-card--shimmer" : "scratch-card--revealed"}`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-xl border border-gold/30 px-1 shadow-inner">
          <span
            className={`font-body text-charcoal font-bold leading-none tabular-nums ${value.length > 4 ? "text-sm sm:text-base" : "text-xl sm:text-2xl"}`}
            dir="ltr"
          >
            {value}
          </span>
          {sub && (
            <span className="font-sans text-charcoal/55 text-[0.6rem] sm:text-xs mt-1">{sub}</span>
          )}
        </div>
        {!revealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full rounded-xl cursor-grab active:cursor-grabbing touch-none"
            aria-hidden="true"
            onPointerDown={(e) => {
              scratching.current = true;
              (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
              erase(e);
            }}
            onPointerMove={(e) => scratching.current && erase(e)}
            onPointerUp={() => {
              scratching.current = false;
              checkReveal();
            }}
            onPointerLeave={() => {
              scratching.current = false;
              checkReveal();
            }}
          />
        )}
      </div>
      <span className="font-sans text-ink-soft/75 text-[0.6rem] sm:text-xs tracking-[0.2em] uppercase">
        {label}
      </span>
    </div>
  );
}

export default function ScratchDate() {
  return (
    <div className="w-full flex flex-col items-center gap-4 sm:gap-5">
      <p
        data-hero-item
        className="font-sans text-ink-soft text-xs sm:text-sm flex items-center gap-2.5 animate-pulse-soft"
      >
        <span className="text-gold" aria-hidden="true">
          ✦
        </span>
        امسح لكشف التاريخ
        <span className="text-gold" aria-hidden="true">
          ✦
        </span>
      </p>

      <div
        className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full"
        role="group"
        aria-label="امسح البطاقات لكشف تاريخ الزفاف"
      >
        {CARDS.map((c, i) => (
          <ScratchCard key={c.label} {...c} index={i} />
        ))}
      </div>

      <p data-hero-item className="font-display text-charcoal/90 text-base sm:text-lg">
        نتشرف بحضوركم!
      </p>
    </div>
  );
}
