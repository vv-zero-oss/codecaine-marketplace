import { cn } from "@/lib/utils"

/**
 * The tape across the top of the page. A CSS marquee: the track is the same
 * line twice, translated by half its width, so it loops without a seam. `speed`
 * is seconds per pass; `reverse` runs it the other way.
 */
export function Ticker({
  text = "Welcome back · Autumn term is open · Founders’ Day is coming",
  speed = 40,
  reverse = false,
  className,
}: {
  text?: string
  /** seconds per pass */
  speed?: number
  reverse?: boolean
  className?: string
}) {
  const line = (
    <span className="flex shrink-0 items-center gap-8 pr-8">
      {text.split("·").map((part, i) => (
        <span key={i} className="flex items-center gap-8">
          <span>{part.trim()}</span>
          <span aria-hidden className="text-rust">★</span>
        </span>
      ))}
    </span>
  )
  return (
    <div className={cn("flex overflow-hidden whitespace-nowrap font-type text-[0.72rem] uppercase tracking-[0.16em]", className)}>
      <div
        data-canvas-ignore
        className="flex w-max animate-ticker"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {line}
        {line}
        {line}
        {line}
      </div>
    </div>
  )
}
