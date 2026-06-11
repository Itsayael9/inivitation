import { VENUE_MAP_EMBED, VENUE_NAME } from "@/lib/wedding";

export default function VenueMap({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border border-gold/40 shadow-md bg-white/90 ${className}`}
    >
      <iframe
        title={`خريطة موقع ${VENUE_NAME}`}
        src={VENUE_MAP_EMBED}
        className="w-full h-52 sm:h-60 border-0 grayscale-[25%] contrast-[0.97]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
