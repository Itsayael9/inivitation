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
  lg: "text-[clamp(2.1rem,7vw,3.2rem)]",
  xl: "text-[clamp(1.85rem,6vw,2.8rem)] sm:text-[3rem]",
} as const;

/**
 * Couple names — clear Arabic display type, gold names, gold separator.
 */
export default function CoupleNames({
  className = "",
  size = "lg",
  as: Tag = "span",
}: CoupleNamesProps) {
  return (
    <Tag
      className={`couple-names inline-flex flex-wrap items-baseline justify-center gap-x-[0.28em] font-body font-bold leading-tight tracking-wide ${sizeClasses[size]} ${className}`}
      dir="rtl"
    >
      

<span className="couple-names__name !text-[#B8860B] font-['Amiri']">
  {BRIDE_NAME}
</span>

<span
  className="couple-names__and !text-[#B8860B] font-['Amiri'] font-normal text-[0.92em]"
  aria-hidden="true"
>
  و
</span>

<span className="couple-names__name !text-[#B8860B] font-['Amiri']">
  {GROOM_NAME}
</span>
    </Tag>
  );
}
