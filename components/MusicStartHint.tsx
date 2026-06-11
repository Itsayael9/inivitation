/** Gold hint — music begins when the guest opens the invitation. */
export default function MusicStartHint() {
  return (
    <div
      className="music-hint fixed z-[110] flex flex-col items-center gap-1.5 pointer-events-none"
      aria-label="الموسيقى تبدأ عند فتح الدعوة"
      role="note"
    >
      <span className="music-hint-btn" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M8 5v14l11-7L8 5z" />
        </svg>
      </span>
      <span className="music-hint-label font-sans text-[0.6rem] sm:text-xs text-gold-deep font-medium text-center leading-tight max-w-[5rem]">
        الموسيقى عند الفتح
      </span>
    </div>
  );
}
