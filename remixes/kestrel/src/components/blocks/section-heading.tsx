import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

const SIZES = {
  h3: "text-h3",
  h2: "text-h2",
  h1: "text-h1",
  display: "text-display",
  mega: "text-mega",
} as const

/**
 * The page's headline voice: a statement in ink, and its second half in
 * grey — so a heading reads as a claim and then the reason for it. A small
 * line under it carries the detail.
 */
export function SectionHeading({
  kicker,
  title,
  continuation,
  body,
  size = "h2",
  align = "left",
  breakContinuation = true,
  className,
}: {
  kicker?: string
  title: string
  /** The grey second half. */
  continuation?: string
  body?: string
  size?: keyof typeof SIZES
  align?: "left" | "center"
  /** Put the grey half on its own line. */
  breakContinuation?: boolean
  className?: string
}) {
  return (
    <Reveal className={cn("flex flex-col", align === "center" && "items-center text-center", className)}>
      {kicker && <p className="mb-4 text-[15px] text-ink-2">{kicker}</p>}
      <h2 className={cn("type-head max-w-[22ch] text-balance text-ink", SIZES[size], align === "center" && "mx-auto")}>
        {title}
        {continuation && (
          <>
            {breakContinuation ? <br /> : " "}
            <span className="text-ink-soft">{continuation}</span>
          </>
        )}
      </h2>
      {body && <p className={cn("mt-5 max-w-[52ch] text-[17px] text-ink-2", align === "center" && "mx-auto")}>{body}</p>}
    </Reveal>
  )
}
