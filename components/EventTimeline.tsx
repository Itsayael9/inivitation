import GeometricOrnament from "./GeometricOrnament";
import { scheduleEvents } from "@/lib/wedding";

function TimelineFlower() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold-deep" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i * 60 * Math.PI) / 180;
        return (
          <ellipse
            key={i}
            cx={12 + Math.cos(a) * 5}
            cy={12 + Math.sin(a) * 5}
            rx="3.5"
            ry="2"
            transform={`rotate(${i * 60} ${12 + Math.cos(a) * 5} ${12 + Math.sin(a) * 5})`}
            stroke="currentColor"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}

export default function EventTimeline() {
  return (
    <div className="flex flex-col items-center gap-5 sm:gap-6 w-full">
      <div data-reveal-title className="text-center flex flex-col gap-2">
        <h2 className="font-display gold-text text-2xl sm:text-3xl leading-relaxed">برنامج الحفل</h2>
        <p className="font-sans text-charcoal/75 text-sm sm:text-base leading-relaxed">
          احتفال على الطريقة المغربية الأصيلة
        </p>
      </div>

      <div
        data-reveal-divider
        className="flex items-center justify-center gap-0 w-full max-w-[88%]"
        aria-hidden="true"
      >
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-deep/70 to-gold-deep/90" />
        <GeometricOrnament className="w-8 h-8 sm:w-9 sm:h-9 text-gold-deep shrink-0 mx-3" />
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-deep/70 to-gold-deep/90" />
      </div>

      <div
        className="relative w-full max-w-sm mx-auto"
        dir="ltr"
        aria-label="جدول أوقات حفل الزفاف"
      >
        <div
          data-timeline-line
          className="absolute left-1/2 top-3 bottom-3 w-px -translate-x-1/2 bg-gold/50"
          aria-hidden="true"
        />

        <ul className="flex flex-col gap-0">
          {scheduleEvents.map((item, i) => (
            <li
              key={item.id}
              data-schedule-row
              className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-4 sm:py-5"
            >
              <p className="font-body text-charcoal text-base sm:text-lg font-semibold text-right tabular-nums pr-2">
                {item.time}
              </p>

              <div className="flex flex-col items-center justify-center z-10">
                {i === 0 ? (
                  <TimelineFlower />
                ) : (
                  <span className="w-2 h-2 rotate-45 border border-gold-deep bg-card-cream" aria-hidden="true" />
                )}
              </div>

              <div className="text-left pl-2 flex flex-col gap-1" dir="rtl">
                <p className="font-sans text-charcoal text-sm sm:text-base font-semibold">{item.title}</p>
                <p className="font-sans text-charcoal/65 text-xs sm:text-sm leading-relaxed">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
