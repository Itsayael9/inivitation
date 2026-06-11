import CoupleNames from "./CoupleNames";
import MihrabFrame from "./MihrabFrame";

/** Minimal invitation preview visible inside the landing envelope. */
export default function LetterPeek() {
  return (
    <div className="landing-letter-peek relative w-full h-full">
      <MihrabFrame className="absolute inset-0 w-full h-full text-gold-deep pointer-events-none" />
      <div className="invitation-card-inner invitation-card-inner--compact">
        <p className="font-display gold-text text-[0.55rem] leading-loose">بسم الله الرحمن الرحيم</p>
        <CoupleNames size="xs" />
      </div>
    </div>
  );
}
