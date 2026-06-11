"use client";

import { useState } from "react";
import { muteWeddingMusic } from "@/lib/weddingMusic";

export default function MusicControl({ visible }: { visible: boolean }) {
  const [muted, setMuted] = useState(false);
  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => {
        const next = !muted;
        setMuted(next);
        muteWeddingMusic(next);
      }}
      aria-label={muted ? "تشغيل الموسيقى" : "كتم الموسيقى"}
      className="music-control-btn fixed z-40 flex items-center justify-center"
    >
      {muted ? (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
          <path d="M11 5L6 9H3v6h3l5 4V5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M17 9l4 4M21 9l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
          <path d="M11 5L6 9H3v6h3l5 4V5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M18.5 6.5a8 8 0 0 1 0 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
