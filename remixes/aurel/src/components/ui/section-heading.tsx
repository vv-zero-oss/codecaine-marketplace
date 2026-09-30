import { MixedTitle } from "@/components/ui/mixed-title"
import { cn } from "@/lib/utils"

/** The small eyebrow line and the big mixed title every section opens with. */
export function SectionHeading({
  eyebrow,
  title,
  as = "h2",
  align = "center",
  size = "lg",
  className,
  titleClassName,
}: {
  eyebrow?: string
  title: string
  as?: "h1" | "h2"
  align?: "center" | "left"
  size?: "md" | "lg" | "xl"
  className?: string
  /** Classes for the title alone — e.g. a `max-w-[14ch]` measure, which
   *  has to sit on the title to be measured in its own type size. */
  titleClassName?: string
}) {
  return (
    <div className={cn("flex flex-col gap-4 sm:gap-6", align === "center" ? "items-center text-center" : "items-start text-left", className)}>
      {eyebrow && <MixedTitle as="p" text={eyebrow} className="text-[13px] tracking-[0.02em] text-ink sm:text-[15px]" />}
      <MixedTitle
        as={as}
        text={title}
        className={cn(
          "text-balance tracking-[-0.015em] text-ink",
          size === "md" && "text-[clamp(34px,5vw,64px)]",
          size === "lg" && "text-[clamp(42px,6.4vw,112px)]",
          size === "xl" && "text-[clamp(52px,8.4vw,150px)]",
          // After the size: tailwind-merge drops a line-height that comes
          // before a font-size.
          "leading-[0.92]",
          titleClassName,
        )}
      />
    </div>
  )
}
