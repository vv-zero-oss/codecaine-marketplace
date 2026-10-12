import { cn } from "@/lib/utils"

/**
 * The vessel: a fired pot with a rim, two handles and one eye — Kiln's
 * mascot, and the shape the intro glazes. Its body path is shared with the
 * intro's canvas so the two are always the same pot.
 */
export const VESSEL_BODY =
  "M13 2h14a1.5 1.5 0 0 1 0 3h-1.2c0 4 9.2 8 9.2 19c0 12-6 19-8 25H13c-2-6-8-13-8-25c0-11 9.2-15 9.2-19H13a1.5 1.5 0 0 1 0-3z"
export const VESSEL_HANDLES = "M14.2 8.5c-6.4-.4-9.4 5.6-6.2 10.6M25.8 8.5c6.4-.4 9.4 5.6 6.2 10.6"
export const VESSEL_EYE = { cx: 23.6, cy: 18.5, r: 1.7 }
/** The vessel's drawing box, in path units. */
export const VESSEL_BOX = { width: 40, height: 52 }

export function KilnMark({ className, title = "Kiln Studio" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 40 52" className={cn("h-auto", className)} role="img" aria-label={title}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d={`${VESSEL_BODY}M${VESSEL_EYE.cx + VESSEL_EYE.r} ${VESSEL_EYE.cy}a${VESSEL_EYE.r} ${VESSEL_EYE.r} 0 1 0 -${VESSEL_EYE.r * 2} 0a${VESSEL_EYE.r} ${VESSEL_EYE.r} 0 1 0 ${VESSEL_EYE.r * 2} 0z`}
      />
      <path d={VESSEL_HANDLES} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

/** The wordmark: the name in the display face, the registered mark set small. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-start font-sans font-semibold tracking-[-0.04em] uppercase", className)}>
      Kiln Studio<sup className="ml-[0.06em] translate-y-[0.1em] text-[0.42em] font-medium">®</sup>
    </span>
  )
}
