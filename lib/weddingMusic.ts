const VIDEO_ID = "nhLnAW7cKEs";
const IFRAME_ID = "wedding-music-player";

/**
 * Starts YouTube audio. Must be called synchronously inside a click handler
 * so browsers allow autoplay.
 */
export function playWeddingMusic(): void {
  if (typeof document === "undefined") return;

  let iframe = document.getElementById(IFRAME_ID) as HTMLIFrameElement | null;

  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.id = IFRAME_ID;
    iframe.title = "موسيقى الدعوة";
    iframe.allow = "autoplay; encrypted-media";
    iframe.setAttribute(
      "src",
      `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&loop=1&playlist=${VIDEO_ID}&controls=0&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`
    );
    iframe.style.cssText =
      "position:fixed;width:0;height:0;border:0;opacity:0;pointer-events:none;left:-9999px;top:-9999px";
    document.body.appendChild(iframe);
    return;
  }

  // If iframe already exists, reload with autoplay to restart
  iframe.src = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&loop=1&playlist=${VIDEO_ID}&controls=0&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`;
}

export function muteWeddingMusic(mute: boolean): void {
  const iframe = document.getElementById(IFRAME_ID) as HTMLIFrameElement | null;
  if (!iframe?.contentWindow) return;
  iframe.contentWindow.postMessage(
    JSON.stringify({ event: "command", func: mute ? "mute" : "unMute", args: [] }),
    "*"
  );
}
