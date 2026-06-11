"use client";

import { useEffect, useRef } from "react";

type Petal = {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  rotation: number;
  spin: number;
  opacity: number;
  hue: number;
};

export default function FallingFlowers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let petals: Petal[] = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function seed() {
      petals = Array.from({ length: 38 }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height - canvas!.height,
        size: Math.random() * 7 + 4,
        speed: Math.random() * 0.6 + 0.35,
        drift: Math.random() * 0.4 - 0.2,
        rotation: Math.random() * Math.PI * 2,
        spin: Math.random() * 0.02 - 0.01,
        opacity: Math.random() * 0.4 + 0.22,
        hue: Math.random() > 0.5 ? 35 : 95,
      }));
    }

    function drawPetal(p: Petal) {
      ctx!.save();
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.rotation);
      ctx!.globalAlpha = p.opacity;
      ctx!.fillStyle = p.hue === 35 ? "#d4a574" : "#8faa88";
      ctx!.beginPath();
      ctx!.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
    }

    function tick() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (const p of petals) {
        p.y += p.speed;
        p.x += p.drift + Math.sin(p.y * 0.01) * 0.15;
        p.rotation += p.spin;
        if (p.y > canvas!.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas!.width;
        }
        drawPetal(p);
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    seed();
    tick();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[25] pointer-events-none"
      aria-hidden="true"
    />
  );
}
