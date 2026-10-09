import VenueMap from "./VenueMap";
import { VENUE_LABEL, VENUE_MAP_LINK, VENUE_NAME } from "@/lib/wedding";

export default function VenueSection({ onDark = false }: { onDark?: boolean }) {
  return (
    <div
      className="w-full max-w-[min(94vw,380px)] flex flex-col items-center gap-5 sm:gap-6"
      aria-label="مكان الحفل"
    >
      <div data-venue-block className="text-center flex flex-col items-center gap-2 w-full">
        <h2
          className={`font-display gold-text text-[clamp(1.35rem,5vw,1.85rem)] ${onDark ? "text-gold" : ""}`}
        >
          المكان
        </h2>
        <div className="details-title-line" aria-hidden="true" />
      </div>

      <div
        data-venue-block
        className="venue-card w-full rounded-2xl px-6 py-5 sm:py-6 flex flex-col items-center gap-2 text-center"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-gold-deep mb-1" fill="none" aria-hidden="true">
          <path
            d="M12 21s-7-5.1-7-11a7 7 0 1 1 14 0c0 5.9-7 11-7 11Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <p className="font-sans text-charcoal/80 text-sm sm:text-base">{VENUE_LABEL}</p>
        <a
          href={VENUE_MAP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="font-script text-charcoal text-2xl sm:text-3xl leading-tight hover:text-gold-deep transition-colors"
          dir="rtl"
        >
          {VENUE_NAME}
        </a>
      </div>

      <div data-venue-block className="w-full">
        <VenueMap />
      </div>

      <a
        data-venue-block
        href={VENUE_MAP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="افتح موقع القاعة في خرائط جوجل"
        className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-sans text-sm transition-all duration-300 hover:shadow-md active:scale-[0.98] ${
          onDark
            ? "border-gold/45 bg-white/10 text-gold-light hover:bg-white/15"
            : "border-gold/50 bg-white/60 text-charcoal hover:bg-gold/10"
        }`}
      >
        فتح في خرائط جوجل
      </a>
    </div>
  );
}
