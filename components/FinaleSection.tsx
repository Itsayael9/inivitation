import CoupleNames from "./CoupleNames";
import { GardenBurst, DividerSprig } from "./Florals";
import VenueMap from "./VenueMap";
import { VENUE_NAME } from "@/lib/wedding";

/**
 * Phase 4 — revealed from below the page fold with a "garden in bloom"
 * floral burst framing the venue map.
 */
export default function FinaleSection() {
  return (
    <section
      id="finale-section"
      data-finale
      className="relative overflow-hidden"
      aria-label="تفاصيل الوصول"
    >
      <div className="relative mx-auto max-w-3xl px-6 sm:px-10 py-24">
        {/* blooming garden corners */}
        <GardenBurst
          data-finale-floral
          className="pointer-events-none absolute bottom-0 right-0 w-48 sm:w-72 text-gold-deep"
        />
        <GardenBurst
          flip
          data-finale-floral
          className="pointer-events-none absolute bottom-0 left-0 w-48 sm:w-72 text-gold-deep"
        />
        <GardenBurst
          data-finale-floral
          className="pointer-events-none absolute -top-10 left-2 w-32 sm:w-44 text-gold/70 rotate-180"
        />
        <GardenBurst
          flip
          data-finale-floral
          className="pointer-events-none absolute -top-10 right-2 w-32 sm:w-44 text-gold/70 rotate-180"
        />

        <div data-finale-card className="relative flex flex-col items-center gap-10">
          <div className="text-center flex flex-col items-center gap-4">
            <p className="font-display gold-text text-3xl sm:text-4xl leading-relaxed">
              ننتظر تشريفكم
            </p>
            <DividerSprig data-finale-floral className="w-44 text-gold-deep" />
          </div>

          <div className="w-full max-w-lg text-center flex flex-col items-center gap-4">
            <h3 className="font-sans font-bold text-2xl text-charcoal">كيف تصلون إلينا</h3>
            <p className="font-script text-3xl text-charcoal" dir="ltr">
              {VENUE_NAME}
            </p>
            <VenueMap className="rounded-md" />
            <p className="font-sans text-charcoal/70 text-sm">
              تتوفر مواقف خاصة لضيوف الحفل عند المدخل الرئيسي
            </p>
          </div>

          <footer className="text-center flex flex-col items-center gap-3 pt-6">
            <div className="hairline w-32" />
            <CoupleNames size="md" />
            <div dir="rtl" className="flex flex-col items-center gap-1.5 text-center">
              <p className="font-sans text-charcoal/70 text-sm sm:text-base">17 أكتوبر 2026</p>
              <p className="font-sans text-charcoal/70 text-sm sm:text-base">18:00</p>
              <p className="font-sans text-charcoal/60 text-xs sm:text-sm">Salle Afrah Filistine</p>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
