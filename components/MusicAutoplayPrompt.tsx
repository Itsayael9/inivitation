"use client";

import { useEffect, useState } from "react";
import { resumeWeddingMusic, subscribeMusicState } from "@/lib/weddingMusic";

/** Shown after opening when the browser blocked autoplay (common on iPhone / WhatsApp). */
export default function MusicAutoplayPrompt({ visible }: { visible: boolean }) {
  const [blocked, setBlocked] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!visible) return;
    return subscribeMusicState((s) => {
      if (s === "blocked") setBlocked(true);
      if (s === "playing") setDismissed(true);
    });
  }, [visible]);

  if (!visible || dismissed || !blocked) return null;

  return (
    <div className="music-autoplay-prompt fixed z-[90] inset-x-4 bottom-[max(5.5rem,env(safe-area-inset-bottom))] flex justify-center pointer-events-none">
      <button
        type="button"
        onClick={() => {
          void resumeWeddingMusic();
          setDismissed(true);
        }}
        className="music-autoplay-prompt__btn pointer-events-auto flex items-center gap-2.5"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7L8 5z" />
        </svg>
        <span className="font-sans text-sm font-semibold">اضغط لتشغيل الموسيقى</span>
      </button>
    </div>
  );
}
