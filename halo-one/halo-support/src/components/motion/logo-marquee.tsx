import { cn } from "@/lib/utils"

/** A row of wordmarks that drifts left forever. CSS-driven, so the editor's
 *  Motion switch stops it; `seconds` is the time for one loop. */
export function LogoMarquee({
  names,
  seconds = 40,
  paused = false,
  className,
}: {
  names: { name: string; style: string }[]
  seconds?: number
  paused?: boolean
  className?: string
}) {
  const row = [...names, ...names]
  return (
    <div
      className={cn(
        "relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]",
        className,
      )}
    >
      {/* the track only holds the items in place */}
      <div
        data-canvas-ignore
        className="flex w-max items-center gap-14 whitespace-nowrap text-muted sm:gap-20"
        style={{ animation: `marquee ${seconds}s linear infinite`, animationPlayState: paused ? "paused" : "running" }}
      >
        {row.map((logo, i) => (
          <span key={i} className={cn("opacity-80 transition-opacity hover:opacity-100", logo.style)}>
            {logo.name}
          </span>
        ))}
      </div>
    </div>
  )
}
