import { cn } from "@/lib/utils"

/**
 * The heading every section opens with: a mono eyebrow, then the serif
 * title with one word in italic, then an optional line of body.
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
  tone?: "paper" | "forest"
  align?: "left" | "center"
  className?: string
}) {
  const night = tone === "forest"
  return (
    <div className={cn("flex flex-col gap-5", align === "center" ? "items-center text-center" : "items-start", className)}>
      {eyebrow && (
        <p className={cn("type-eyebrow flex items-center gap-2", night ? "text-forest-muted" : "text-ink-muted")}>
          <span className={cn("size-1.5 rounded-full", night ? "bg-lime" : "bg-brass")} />
          {eyebrow}
        </p>
      )}
      <h2 className={cn("type-display max-w-[16ch] text-[clamp(40px,5.2vw,72px)] text-balance", night ? "text-forest-fg" : "text-ink", align === "center" && "mx-auto")}>
        {title}
        {accent && (
          <>
            {" "}
            <em className="italic">{accent}</em>
          </>
        )}
        {titleEnd && <> {titleEnd}</>}
      </h2>
      {body && <p className={cn("max-w-[520px] text-[17px] leading-[1.55] text-pretty", night ? "text-forest-muted" : "text-ink-muted")}>{body}</p>}
    </div>
  )
}
