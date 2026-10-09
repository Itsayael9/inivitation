import ScratchDate from "./ScratchDate";
import { COUPLE_DISPLAY } from "@/lib/wedding";

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
            18:00
          </span>
        </div>

        <div
          data-hero-item
          dir="rtl"
          className="w-full max-w-[255px] rounded-[1.25rem] border border-gold/25 bg-white/35 px-3 py-3 text-center shadow-[0_6px_18px_-12px_rgba(80,65,40,0.3)]"
        >
          <div className="flex flex-col items-center gap-1.5">
            <p className="font-display text-charcoal text-base sm:text-lg leading-tight">{COUPLE_DISPLAY}</p>
            <p className="font-sans text-charcoal text-sm sm:text-base leading-tight">17 أكتوبر 2026</p>
            <p className="font-sans text-charcoal text-sm sm:text-base leading-tight">18:00</p>
            <p className="font-sans text-charcoal/80 text-[0.7rem] sm:text-xs leading-relaxed">
              قصر/Le Palais Palestinien – Tanger
            </p>
          </div>
        </div>

        <div data-hero-item dir="rtl" className="flex w-full max-w-[240px] flex-col items-center gap-2 text-center">
          <div className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/30 bg-white/45 px-3 py-2 text-charcoal/80 shadow-[0_5px_16px_-10px_rgba(80,65,40,0.28)]">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-gold-deep" fill="none" aria-hidden="true">
              <path d="M3.5 7.25A2.25 2.25 0 0 1 5.75 5h12.5A2.25 2.25 0 0 1 20.5 7.25v9.5A2.25 2.25 0 0 1 18.25 19H5.75A2.25 2.25 0 0 1 3.5 16.75v-9.5Z" stroke="currentColor" strokeWidth="1.4" />
              <path d="M7.5 9.5h9M8 15.5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M12 7.5V4.5M16 10.5 12 14.5 8 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19.5 5.5 4.5 18.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span className="font-display text-base sm:text-lg leading-none tracking-[0.03em] text-charcoal">
              ممنوع التصوير
            </span>
          </div>
          <p className="font-display text-[0.8rem] leading-[1.9] tracking-[0.02em] text-charcoal/80 sm:text-base">
            نوما هنيئا لأطفالكم
          </p>
        </div>
      </div>
    </article>
  );
}
