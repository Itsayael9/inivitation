import { InvitationIntroCard } from "./InvitationCard";
import InvitationDetailsPanel from "./InvitationDetailsPanel";
import EventTimeline from "./EventTimeline";
import VenueSection from "./VenueSection";

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

      {/* Timeline */}
      <section
        data-section
        className="invitation-scene section-panel py-12 sm:py-16 px-4 sm:px-8 mx-auto max-w-lg flex flex-col items-center snap-start"
      >
        <div className="program-panel w-full flex flex-col items-center gap-7 sm:gap-8">
          <EventTimeline />
        </div>
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
          aria-label="اضغط لعرض التفاصيل"
          aria-expanded={finaleRevealed}
          aria-controls="finale-section"
          className="group flex flex-col items-center gap-3 sm:gap-4 cursor-pointer disabled:opacity-0 disabled:pointer-events-none transition-opacity duration-500 max-w-sm"
        >
          <span className="font-sans font-semibold text-[clamp(1.15rem,4.5vw,1.75rem)] text-charcoal group-hover:text-charcoal/70 transition-colors leading-snug">
            اضغط للتفاصيل
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
