import CoupleNames from "./CoupleNames";
import InvitationCard from "./InvitationCard";
import EnvelopeBack from "./EnvelopeBack";
import WaxSeal from "./WaxSeal";

/**
 * State 0 — speckled paper envelope cover (reference photo):
 * fold lines, gold wax seal, Arabic header + click to open.
 */
export default function Envelope({ onOpen }: { onOpen: () => void }) {
  return (
    <div
      data-overlay
      className="landing-page fixed inset-0 z-[100] paper-bg flex flex-col items-center justify-center px-5 sm:px-10 py-[max(2.5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))]"
    >
      {/* Header copy */}
      <header data-landing-header className="text-center shrink-0 mb-6 sm:mb-10">
        <p className="font-sans text-ink/70 text-sm sm:text-base tracking-wide">
          نتشرف بدعوتكم إلى
        </p>
        <h1 className="font-display text-xl sm:text-2xl md:text-[1.85rem] mt-2 sm:mt-3 leading-[1.7] flex flex-wrap items-baseline justify-center gap-x-1.5">
          <span className="gold-text">حفل زفاف</span>
          <CoupleNames size="xl" />
        </h1>
        <p className="font-display text-gold-deep/85 text-sm sm:text-base mt-2 sm:mt-3 tracking-[0.18em]">
          20 . 05 . 2027
        </p>
      </header>

      {/* Envelope back + seal */}
      <div
        data-env-perspective
        style={{ perspective: "1600px" }}
        className="relative flex flex-1 items-center justify-center w-full max-w-[420px]"
      >
        <div
          data-envelope
          className="relative w-full aspect-square max-w-[min(82vw,380px)] flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <EnvelopeBack className="absolute inset-0 w-full h-full text-ink/30 pointer-events-none" />

          {/* letter tucked inside (used by open animation) */}
          <div
            data-letter
            className="absolute left-1/2 top-[28%] -translate-x-1/2 w-[58%] h-[62%] opacity-0 pointer-events-none"
            aria-hidden="true"
          >
            <InvitationCard compact />
          </div>

          {/* top flap */}
          <div
            data-flap
            className="absolute inset-x-[5%] top-[7%] z-10 h-[48%] origin-top pointer-events-none"
            style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
          >
            <div
              className="absolute inset-0 opacity-0"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            />
          </div>

          {/* wax seal */}
          <button
            type="button"
            data-seal
            onClick={onOpen}
            aria-label="افتح الدعوة — اضغط على الختم الذهبي لفتح المظروف وبدء الموسيقى"
            className="relative z-20 w-[38%] sm:w-[42%] max-w-[168px] cursor-pointer rounded-full outline-offset-8 transition-transform duration-300 hover:scale-[1.05] focus-visible:scale-[1.05] focus-visible:outline-2 focus-visible:outline-gold drop-shadow-[0_12px_20px_rgba(90,65,25,0.45)]"
          >
            <WaxSeal className="w-full h-auto" />
          </button>
        </div>
      </div>

      {/* Click to open */}
      <div data-cta className="text-center shrink-0 mt-6 sm:mt-10">
        <button
          type="button"
          onClick={onOpen}
          aria-label="اضغط لفتح الدعوة"
          className="group cursor-pointer focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 rounded-sm px-4 py-2"
        >
          <p className="font-body text-ink text-lg sm:text-xl tracking-wide group-hover:text-ink-soft transition-colors">
            اضغط لفتح الدعوة
          </p>
        </button>
      </div>
    </div>
  );
}
