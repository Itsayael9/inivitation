"use client";

import { useEffect, useState } from "react";
import {
  resumeWeddingMusic,
  subscribeMusicState,
  toggleWeddingMusic,
  type MusicState,
} from "@/lib/weddingMusic";

export default function MusicControl({ visible }: { visible: boolean }) {
  const [musicState, setMusicState] = useState<MusicState>("idle");

  useEffect(() => subscribeMusicState(setMusicState), []);

  if (!visible) return null;

  const playing = musicState === "playing";
  const blocked = musicState === "blocked";

  async function handleClick() {
    if (blocked || musicState === "idle" || musicState === "paused") {
      await resumeWeddingMusic();
    } else {
      toggleWeddingMusic();
    }
  }

  const label = blocked
    ? "اضغط لتشغيل الموسيقى"
    : playing
      ? "إيقاف الموسيقى مؤقتاً"
      : "تشغيل الموسيقى";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className={`music-control-btn fixed z-40 flex items-center justify-center ${blocked ? "music-control-btn--pulse" : ""}`}
    >
      {blocked || !playing ? (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7L8 5z" />
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
