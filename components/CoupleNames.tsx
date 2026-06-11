import { BRIDE_NAME, GROOM_NAME } from "@/lib/wedding";

type CoupleNamesProps = {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  as?: "h1" | "p" | "span";
};

const sizeClasses = {
  xs: "text-[0.55rem] sm:text-[0.6rem]",
  sm: "text-[0.65rem]",
  md: "text-base sm:text-lg",
  lg: "text-[clamp(1.5rem,6vw,2.25rem)]",
  xl: "text-[clamp(1.35rem,5vw,2rem)] sm:text-[2.1rem]",
} as const;

/**
 * Couple names — clear Arabic display type, black names, gold "و".
 */
export default function CoupleNames({
  className = "",
  size = "lg",
  as: Tag = "span",
}: CoupleNamesProps) {
  return (
    <Tag
      className={`couple-names inline-flex flex-wrap items-baseline justify-center gap-x-[0.28em] font-display font-bold text-black leading-tight tracking-wide ${sizeClasses[size]} ${className}`}
      dir="rtl"
    >
      <span className="couple-names__name">{BRIDE_NAME}</span>
      <span className="couple-names__and font-body font-normal text-gold-deep text-[0.92em]" aria-hidden="true">
        و
      </span>
      <span className="couple-names__name">{GROOM_NAME}</span>
    </Tag>
  );
}
