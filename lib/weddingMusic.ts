const VIDEO_ID = "nhLnAW7cKEs";
const IFRAME_ID = "wedding-music-player";
const AUDIO_SRC = process.env.NEXT_PUBLIC_MUSIC_URL ?? "/music/wedding.mp3";

export type MusicState = "idle" | "playing" | "paused" | "blocked";

type Listener = (state: MusicState) => void;

let audio: HTMLAudioElement | null = null;
let ytReady = false;
let state: MusicState = "idle";
let preferYoutube = false;
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
    audio.addEventListener("error", () => {
      preferYoutube = true;
    });
  }
  return audio;
}

function ensureYoutubeIframe(): HTMLIFrameElement {
  let iframe = document.getElementById(IFRAME_ID) as HTMLIFrameElement | null;
  if (iframe) return iframe;

  const origin = typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : "";
  iframe = document.createElement("iframe");
  iframe.id = IFRAME_ID;
  iframe.title = "موسيقى الدعوة";
  iframe.allow = "autoplay; encrypted-media; fullscreen";
  iframe.setAttribute(
    "src",
    `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?enablejsapi=1&origin=${origin}&playsinline=1&loop=1&playlist=${VIDEO_ID}&controls=0&rel=0&modestbranding=1`
  );
  iframe.style.cssText =
    "position:fixed;width:1px;height:1px;border:0;opacity:0;pointer-events:none;left:0;bottom:0";
  document.body.appendChild(iframe);
  ytReady = true;
  return iframe;
}

function ytCommand(func: string, args: unknown[] = []) {
  const iframe = document.getElementById(IFRAME_ID) as HTMLIFrameElement | null;
  iframe?.contentWindow?.postMessage(
    JSON.stringify({ event: "command", func, args, id: 1 }),
    "*"
  );
}

async function tryYoutubePlay(): Promise<boolean> {
  ensureYoutubeIframe();
  ytCommand("unMute");
  ytCommand("playVideo");
  setState("playing");
  window.setTimeout(() => ytCommand("playVideo"), 400);
  return true;
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

  if (preferYoutube) {
    void tryYoutubePlay();
    scheduleBlockedCheck();
    return;
  }

  void (async () => {
    const ok = await tryAudioPlay();
    if (!ok) {
      preferYoutube = true;
      await tryYoutubePlay();
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
    if (preferYoutube && state === "playing") return;
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

  if (!preferYoutube && audio) {
    try {
      await audio.play();
      setState("playing");
      return true;
    } catch {
      preferYoutube = true;
    }
  }

  await tryYoutubePlay();
  setState("playing");
  return true;
}

export function pauseWeddingMusic(): void {
  if (audio && !audio.paused) {
    audio.pause();
    setState("paused");
  }
  ytCommand("pauseVideo");
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
