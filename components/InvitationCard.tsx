import Image from "next/image";
import CoupleNames from "./CoupleNames";
import GeometricOrnament from "./GeometricOrnament";
import MihrabFrame from "./MihrabFrame";
import { COUPLE_DISPLAY } from "@/lib/wedding";

/** Compact peek for envelope animation. */
export default function InvitationCard({ compact = false }: { compact?: boolean }) {
  if (!compact) return null;
  return (
    <article className="invitation-card relative w-full max-w-[280px] min-h-[360px]" aria-label="بطاقة دعوة الزفاف">
      <MihrabFrame className="absolute inset-0 w-full h-full text-gold-deep pointer-events-none" />
      <div className="invitation-card-inner invitation-card-inner--compact">
        <p className="font-display gold-text text-[0.6rem] leading-loose text-center">بسم الله الرحمن الرحيم</p>
        <GeometricOrnament className="w-5 h-5 text-gold-deep mx-auto my-1" />
        <CoupleNames size="sm" />
      </div>
    </article>
  );
}

/** Section 1 — Mihrab letter: names, photo, invitation (mobile-first). */
export function InvitationIntroCard() {
  return (
    <div className="intro-card-wrap w-full max-w-[min(94vw,400px)] flex flex-col items-center">
      <p
        data-hero-item
        className="bismillah-outside font-display gold-text text-[clamp(1.4rem,6.5vw,2.15rem)] leading-[1.85] text-center mb-3 sm:mb-5 px-3 shrink-0"
      >
        بسم الله الرحمن الرحيم
      </p>

      <article
        className="invitation-card invitation-card--panel relative w-full min-h-[min(88svh,600px)] sm:min-h-[560px] flex items-center justify-center"
        aria-label="دعوة الزفاف"
      >
        <MihrabFrame
          data-mihrab-frame
          className="absolute inset-0 w-full h-full text-gold-deep pointer-events-none"
        />

        <div className="invitation-card-inner invitation-card-inner--intro">
        <div data-hero-item data-ornament className="shrink-0 my-1">
          <GeometricOrnament className="w-6 h-6 sm:w-8 sm:h-8 text-gold-deep mx-auto animate-ornament-spin" />
        </div>

        <div data-hero-item className="shrink-0">
          <CoupleNames as="h1" size="lg" />
        </div>

        <div
          data-hero-item
          data-hero-photo
          className="couple-photo-frame relative z-10 w-[min(58vw,168px)] aspect-[3/4] shrink-0 my-1 mb-2 sm:mb-3"
        >
          <Image
            src="/images/couple.png"
            alt={`صورة العروسين ${COUPLE_DISPLAY}`}
            fill
            className="object-cover object-[center_35%]"
            sizes="(max-width: 480px) 58vw, 168px"
            priority
          />
        </div>

        <div
          data-hero-item
          data-hero-invite
          className="invitation-copy font-sans text-charcoal/90 text-[clamp(0.75rem,3.2vw,0.9rem)] leading-[1.95] shrink-0"
        >
          <p>يسعدنا ويشرفنا أن ندعو</p>
          <p>حضرتكم الكريمة</p>
          <p>لمشاركتكم فرحة حفل زفافنا</p>
        </div>

        <div data-hero-item className="scroll-cue mt-auto pt-3 shrink-0 flex flex-col items-center gap-1.5">
          <span className="font-sans text-ink-soft/60 text-[0.65rem] tracking-wide">اسحب للأسفل</span>
          <span className="scroll-cue-arrow text-gold-deep" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        </div>
      </article>
    </div>
  );
}
