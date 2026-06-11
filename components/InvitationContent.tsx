import { InvitationIntroCard } from "./InvitationCard";
import InvitationDetailsPanel from "./InvitationDetailsPanel";
import CountdownTimer from "./CountdownTimer";
import EventTimeline from "./EventTimeline";
import VenueSection from "./VenueSection";
import EngagementMemories from "./EngagementMemories";

export default function InvitationContent({
  onRevealFinale,
  finaleRevealed,
}: {
  onRevealFinale: () => void;
  finaleRevealed: boolean;
}) {
  return (
    <main className="relative">
      {/* Section 1 — Mihrab letter */}
      <section
        data-section="hero-intro"
        className="invitation-scene section-panel min-h-[100dvh] flex flex-col items-center justify-center px-4 pt-[max(1.5rem,env(safe-area-inset-top))] pb-8 snap-start"
      >
        <InvitationIntroCard />
      </section>

      {/* Section 2 — date panel + venue map */}
      <section
        data-section="hero-details"
        className="details-scene section-panel min-h-[100dvh] flex flex-col items-center justify-center gap-10 sm:gap-12 px-4 py-10 snap-start"
      >
        <InvitationDetailsPanel />
        <VenueSection onDark />
      </section>

      {/* Countdown + timeline */}
      <section
        data-section
        className="invitation-scene section-panel py-12 sm:py-16 px-4 sm:px-8 mx-auto max-w-lg flex flex-col items-center snap-start"
      >
        <div className="program-panel w-full flex flex-col items-center gap-7 sm:gap-8">
          <CountdownTimer />
          <div className="section-bridge w-full max-w-[88%]" aria-hidden="true">
            <span className="section-bridge-line" />
            <span className="section-bridge-gem" />
            <span className="section-bridge-line" />
          </div>
          <EventTimeline />
        </div>
      </section>

      {/* Dress code */}
      <section
        data-section
        className="section-panel py-14 sm:py-16 px-4 sm:px-8 mx-auto max-w-3xl text-center flex flex-col items-center gap-5 sm:gap-6 paper-bg snap-start"
      >
        <h2 data-reveal-title className="font-display gold-text text-[clamp(1.35rem,5vw,1.85rem)]">الزيّ المقترح</h2>
        <div data-reveal-divider className="hairline w-20 sm:w-24" aria-hidden="true" />
        <p data-reveal-item className="font-sans text-charcoal text-lg sm:text-xl">زيّ رسمي</p>
        <div className="flex items-center gap-3 sm:gap-4" aria-label="ألوان الزي المقترحة">
          {["#3a3a3a", "#8f6f35", "#d9cdb8", "#faf6ee"].map((c) => (
            <span
              key={c}
              data-swatch
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-charcoal/15 shadow-inner"
              style={{ backgroundColor: c }}
              role="img"
              aria-label={`لون ${c}`}
            />
          ))}
        </div>
        <p data-reveal-item className="font-sans text-charcoal/70 max-w-sm sm:max-w-md leading-loose text-sm sm:text-base px-2">
          يسعدنا التزامكم بالألوان الهادئة المنسجمة مع أجواء الأمسية
        </p>
      </section>

      {/* Engagement memories */}
      <section
        data-section
        className="invitation-scene section-panel py-14 sm:py-16 px-4 sm:px-8 mx-auto max-w-lg flex flex-col items-center snap-start"
      >
        <EngagementMemories />
      </section>

      {/* CTA */}
      <section
        data-section
        className="section-panel py-16 sm:py-20 pb-[max(5rem,env(safe-area-inset-bottom))] px-4 text-center flex flex-col items-center gap-6 sm:gap-8 paper-bg snap-start"
      >
        <div className="hairline w-24 sm:w-32" aria-hidden="true" />
        <button
          type="button"
          onClick={onRevealFinale}
          disabled={finaleRevealed}
          data-finale-cta
          aria-label="اضغط لعرض التفاصيل وتأكيد الحضور"
          aria-expanded={finaleRevealed}
          aria-controls="finale-section"
          className="group flex flex-col items-center gap-3 sm:gap-4 cursor-pointer disabled:opacity-0 disabled:pointer-events-none transition-opacity duration-500 max-w-sm"
        >
          <span className="font-sans font-semibold text-[clamp(1.15rem,4.5vw,1.75rem)] text-charcoal group-hover:text-charcoal/70 transition-colors leading-snug">
            اضغط للتفاصيل وتأكيد الحضور
          </span>
          <span
            className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-gold text-gold-deep group-hover:bg-gold/15 group-active:scale-95 transition-all duration-300 animate-bounce"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </section>
    </main>
  );
}
