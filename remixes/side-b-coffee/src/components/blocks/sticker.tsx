import { useId } from "react"

import { cn } from "@/lib/utils"

/**
 * A round printed sticker — words set on a circle around a star — slapped
 * on the corner of a new or limited coffee. The ring turns slowly (one turn
 * every 18s, linear), like a label on a platter; reduced motion holds it.
 */
export function Sticker({
  text = "new",
  tone = "ember",
  spin = true,
  className,
}: {
  text?: string
  tone?: "ember" | "sky" | "honey" | "rust"
  spin?: boolean
  className?: string
}) {
  const id = useId().replace(/:/g, "")
  const fill = { ember: "var(--color-ember)", sky: "var(--color-sky)", honey: "var(--color-honey)", rust: "var(--color-rust)" }[tone]
  const ink = tone === "honey" || tone === "sky" ? "var(--color-ink)" : "var(--color-page)"
  const ring = Array(text.length > 6 ? 3 : 5).fill(text.toUpperCase()).join(" · ") + " · "

  return (
    <svg viewBox="0 0 100 100" className={cn("size-16", className)} aria-label={text} role="img">
      <circle cx="50" cy="50" r="48" fill={fill} />
      <defs>
        <path id={`ring-${id}`} d="M50 50 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0" />
      </defs>
      <g
        className={cn(spin && "motion-safe:animate-[record-spin_18s_linear_infinite]")}
        style={{ transformBox: "view-box", transformOrigin: "50px 50px" }}
      >
        <text fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="1.4" fill={ink}>
          <textPath href={`#ring-${id}`} startOffset="0">
            {ring}
          </textPath>
        </text>
      </g>
      <path
        d="M50 31 L55.3 44.7 L70 45.2 L58.5 54.3 L62.4 68.5 L50 60.3 L37.6 68.5 L41.5 54.3 L30 45.2 L44.7 44.7 Z"
        fill={ink}
        stroke="var(--color-cocoa)"
        strokeOpacity="0.2"
      />
    </svg>
  )
}
