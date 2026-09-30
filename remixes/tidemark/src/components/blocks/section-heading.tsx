import { cn } from "@/lib/utils"

/**
 * The heading every section opens with: a wide-caps label, then the title
 * in heavy extended caps with one word in colour, then an optional line of
 * body.
 */
export function SectionHeading({
  eyebrow = "",
  title = "",
  accent = "",
  titleEnd = "",
  body = "",
  tone = "paper",
  align = "left",
  className,
}: {
  eyebrow?: string
  title?: string
  /** A word set in italic after `title`. */
  accent?: string
  titleEnd?: string
  body?: string
  tone?: "paper" | "night"
  align?: "left" | "center"
  className?: string
}) {
  const night = tone === "night"
  return (
    <div className={cn("flex flex-col gap-5", align === "center" ? "items-center text-center" : "items-start", className)}>
      {eyebrow && (
        <p className={cn("type-eyebrow", night ? "text-pink" : "text-coral")}>{eyebrow}</p>
      )}
      <h2 className={cn("type-display max-w-[18ch] text-[clamp(34px,4.6vw,64px)] text-balance", night ? "text-night-fg" : "text-ink", align === "center" && "mx-auto")}>
        {title}
        {accent && (
          <>
            {" "}
            <span className={night ? "text-pink" : "text-coral"}>{accent}</span>
          </>
        )}
        {titleEnd && <> {titleEnd}</>}
      </h2>
      {body && <p className={cn("max-w-[520px] text-[17px] leading-[1.55] text-pretty", night ? "text-night-muted" : "text-ink-muted")}>{body}</p>}
    </div>
  )
}
