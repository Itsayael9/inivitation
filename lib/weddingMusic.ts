const AUDIO_SRC = process.env.NEXT_PUBLIC_MUSIC_URL ?? "/music/wedding.mp3";

export type MusicState = "idle" | "playing" | "paused" | "blocked";

type Listener = (state: MusicState) => void;

let audio: HTMLAudioElement | null = null;
let state: MusicState = "idle";
const listeners = new Set<Listener>();

function setState(next: MusicState) {
  state = next;
  listeners.forEach((fn) => fn(next));
}

export function getMusicState(): MusicState {
  return state;
}

export function subscribeMusicState(fn: Listener): () => void {
  listeners.add(fn);
  fn(state);
  return () => listeners.delete(fn);
}

function getAudio(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.55;
    audio.preload = "auto";
    audio.addEventListener("ended", () => setState("paused"));
    audio.addEventListener("pause", () => {
      if (state === "playing") setState("paused");
    });
    audio.addEventListener("play", () => setState("playing"));
  }
  return audio;
}

async function tryAudioPlay(): Promise<boolean> {
  const el = getAudio();
  try {
    await el.play();
    setState("playing");
    return true;
  } catch {
    return false;
  }
}

/**
 * Start music — call synchronously inside a user click/tap handler.
 */
export function preloadMusic(): void {
  if (typeof document === "undefined") return;
  getAudio().load();
}

export function playWeddingMusic(): void {
  if (typeof document === "undefined") return;
  if (state === "playing") return;

  void (async () => {
    const ok = await tryAudioPlay();
    if (!ok) {
      scheduleBlockedCheck();
    }
  })();
}

let blockedTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleBlockedCheck() {
  if (blockedTimer) clearTimeout(blockedTimer);
  blockedTimer = setTimeout(() => {
    if (audio && !audio.paused && !audio.ended) {
      setState("playing");
      return;
    }
    if (audio?.paused || state !== "playing") setState("blocked");
  }, 2200);
}

/** Re-check after the open animation — mobile browsers often block the first attempt. */
export function verifyMusicPlaying(): void {
  scheduleBlockedCheck();
}

/** Tap-to-play when autoplay was blocked (iOS / Instagram browser). */
export async function resumeWeddingMusic(): Promise<boolean> {
  if (typeof document === "undefined") return false;

  if (audio) {
    try {
      await audio.play();
      setState("playing");
      return true;
    } catch {
      setState("blocked");
    }
  }

  setState("blocked");
  return false;
}

export function pauseWeddingMusic(): void {
  if (audio && !audio.paused) {
    audio.pause();
    setState("paused");
  }
  if (state === "playing") setState("paused");
}

export function toggleWeddingMusic(): boolean {
  if (state === "playing") {
    pauseWeddingMusic();
    return false;
  }
  void resumeWeddingMusic();
  return true;
}

/** @deprecated use toggleWeddingMusic / pauseWeddingMusic */
export function muteWeddingMusic(mute: boolean): void {
  if (mute) pauseWeddingMusic();
  else void resumeWeddingMusic();
}
