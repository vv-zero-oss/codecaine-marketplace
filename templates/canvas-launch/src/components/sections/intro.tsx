import { useEffect } from "react"
import { motion, useAnimate } from "motion/react"

import { Mark, MARK_HOLE } from "@/components/ui/mark"
import { EASE_DIVE, EASE_SWAP } from "@/lib/motion"

/**
 * The opening: the mark arrives lit in blue, cools to ink, holds, then dives
 * through its own window until the window is the screen — and what was behind
 * it is the first line of the page. Timings are the reference's, frame-counted:
 * ~1.0s held, then an accelerating ~1.2s dive.
 *
 * The scale is taken about the centre of the window, not the mark, so the
 * reader's eye goes *through* the hole rather than past its edge.
 */
export function IntroMark({ onDone }: { onDone: () => void }) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      await animate(scope.current, { opacity: [0, 1], scale: [0.92, 1] }, { duration: 0.5, ease: EASE_SWAP })
      await animate("[data-sheen]", { opacity: 0 }, { duration: 0.6, ease: "easeInOut", delay: 0.1 })
      if (cancelled) return
      await animate(scope.current, { scale: 42 }, { duration: 1.2, ease: EASE_DIVE, delay: 0.2 })
      if (!cancelled) onDone()
    })()
    return () => {
      cancelled = true
    }
  }, [animate, scope, onDone])

  const centre = 50
  return (
    <motion.div
      ref={scope}
      className="pointer-events-none absolute top-1/2 left-1/2 z-20 size-[clamp(160px,25.5vw,368px)] -translate-x-1/2 -translate-y-1/2 opacity-0"
      style={{ originX: `${centre}%`, originY: `${centre}%` }}
      aria-hidden
    >
      <Mark className="size-full text-ink">
        <defs>
          <radialGradient id="sheen" cx="30%" cy="25%" r="90%">
            <stop offset="0%" stopColor="var(--color-glow-soft)" />
            <stop offset="35%" stopColor="var(--color-glow)" />
            <stop offset="70%" stopColor="var(--color-glow-deep)" />
            <stop offset="100%" stopColor="var(--color-night)" />
          </radialGradient>
          <mask id="sheen-mask">
            <rect width="100" height="100" fill="white" />
            <rect
              x={MARK_HOLE.inset * 100}
              y={MARK_HOLE.inset * 100}
              width={100 - MARK_HOLE.inset * 200}
              height={100 - MARK_HOLE.inset * 200}
              rx={MARK_HOLE.radius * 100}
              fill="black"
            />
          </mask>
        </defs>
      </Mark>
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" data-sheen>
        <rect width="100" height="100" fill="url(#sheen)" mask="url(#sheen-mask)" />
      </svg>
    </motion.div>
  )
}
