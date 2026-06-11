import ScratchDate from "./ScratchDate";

/**
 * Section 2 — distinct ticket-style panel (not Mihrab).
 * Scratch date and time pill.
 */
export default function InvitationDetailsPanel() {
  return (
    <article className="details-ticket w-full max-w-[min(94vw,380px)]" aria-label="تفاصيل التاريخ">
      {/* floating corner accents */}
      <span className="details-ticket-corner details-ticket-corner--tl" aria-hidden="true" />
      <span className="details-ticket-corner details-ticket-corner--br" aria-hidden="true" />

      <div className="details-ticket-inner px-5 py-7 sm:px-8 sm:py-9 flex flex-col items-center gap-5 sm:gap-6">
        <header data-hero-item className="text-center w-full">
          <p className="font-sans text-ink-soft/70 text-[0.65rem] sm:text-xs tracking-[0.35em] uppercase mb-2">
            Save the date
          </p>
          <h2 className="font-display gold-text text-3xl sm:text-4xl leading-relaxed">التاريخ</h2>
          <div className="details-title-line mt-3 mx-auto" aria-hidden="true" />
        </header>

        <div data-hero-item className="scratch-stage w-full rounded-2xl px-3 py-5 sm:px-4 sm:py-6">
          <ScratchDate />
        </div>

        <div
          data-hero-item
          data-time-pill
          className="time-pill time-pill--glow w-full max-w-[240px] flex items-center justify-center gap-2.5 py-3 px-5 rounded-full"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-gold-deep shrink-0" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="font-sans text-charcoal text-sm sm:text-base font-medium tabular-nums" dir="ltr">
            4:00 PM
          </span>
          <span className="font-sans text-charcoal/60 text-xs sm:text-sm">مساءً</span>
        </div>
      </div>
    </article>
  );
}
