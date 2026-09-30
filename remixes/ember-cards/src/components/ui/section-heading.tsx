import { Eyebrow } from "@/components/ui/eyebrow"
import { Reveal } from "@/components/motion/reveal"
import { SplitText } from "@/components/motion/split-text"
import { cn } from "@/lib/utils"

/**
 * The centred eyebrow, serif headline and muted blurb most sections open
 * with. A line break in `title` or `blurb` (`\n`) is kept.
 */
export function SectionHeading({
  eyebrow,
  title,
  blurb,
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string
  title: string
  blurb?: string
  as?: "h1" | "h2"
  className?: string
}) {
  return (
    <div className={cn("mx-auto flex max-w-4xl flex-col items-center text-center", className)}>
      {eyebrow ? (
        <Reveal delay={0}>
          <Eyebrow label={eyebrow} className="mb-5" />
        </Reveal>
      ) : null}
      <SplitText
        as={Tag}
        text={title}
        delay={0.06}
        className={cn("font-serif font-normal text-ink", Tag === "h1" ? "text-display" : "text-headline")}
      />
      {blurb ? (
        <Reveal delay={0.3}>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted sm:text-base sm:whitespace-pre-line">{blurb}</p>
        </Reveal>
      ) : null}
    </div>
  )
}
