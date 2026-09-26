import { forwardRef, useCallback, useRef } from "react"
import type * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import { useViewport } from "@/hooks/use-viewport"
import { cn } from "@/lib/utils"

/**
 * A pinned scene: a section `beats` screens tall with one sticky, screen-high
 * stage inside it. The section is what somebody designs (it carries the id and
 * the tone the header reads); the stage is only the pin.
 *
 * Scenes hand over in place, the way the reference does — nothing ever scrolls
 * a whole screen up. Each scene after the first starts one screen early
 * (`overlap`), so it pins at the exact moment the one before unpins; the one
 * before has blurred its content out by then (`exit`), and this one blurs in
 * over its first stretch of scroll (`enter`). Both are scrubbed by the scroll.
 * `backdrop` is drawn under the content and fades in with it, but stays when
 * the content leaves unless `backdropExits`.
 */
export const Scene = forwardRef<
  HTMLElement,
  {
    beats: number
    tone?: "light" | "dark" | "bare"
    stageClassName?: string
    enter?: boolean
    exit?: boolean
    overlap?: boolean
    backdrop?: React.ReactNode
    backdropExits?: boolean
  } & React.ComponentProps<"section">
>(function Scene(
  {
    beats,
    tone = "light",
    className,
    stageClassName,
    enter = true,
    exit = true,
    overlap = enter,
    backdrop,
    backdropExits = true,
    children,
    style,
    ...props
  },
  forwarded,
) {
  const own = useRef<HTMLElement | null>(null)
  const setRef = useCallback(
    (el: HTMLElement | null) => {
      own.current = el
      if (typeof forwarded === "function") forwarded(el)
      else if (forwarded) forwarded.current = el
    },
    [forwarded],
  )
  const { scrollYProgress } = useScroll({ target: own, offset: ["start start", "end end"] })
  const { height } = useViewport()
  const reduce = useReducedMotion()

  // The fades take ~35% of a screen of scroll each, as a share of the pinned range.
  const pinned = Math.max(1, (beats - 1) * height)
  const span = Math.min(0.3, (0.35 * height) / pinned)
  const input = [0, enter ? span : 0.0001, exit ? 1 - span : 0.9999, 1]
  const content = useTransform(scrollYProgress, input, [enter ? 0 : 1, 1, 1, exit ? 0 : 1])
  const back = useTransform(scrollYProgress, input, [enter ? 0 : 1, 1, 1, exit && backdropExits ? 0 : 1])
  const blur = useTransform(content, (v) => (reduce || v > 0.98 ? "none" : `blur(${((1 - v) * 8).toFixed(2)}px)`))

  return (
    <section
      ref={setRef}
      data-tone={tone}
      className={cn("relative", overlap && "-mt-[100svh]", className)}
      style={{ height: `${beats * 100}svh`, ...style }}
      {...props}
    >
      <div className={cn("sticky top-0 h-svh w-full overflow-hidden", stageClassName)}>
        {backdrop && (
          <motion.div aria-hidden className="absolute inset-0" style={{ opacity: back }}>
            {backdrop}
          </motion.div>
        )}
        <motion.div className="absolute inset-0" style={{ opacity: content, filter: blur }}>
          {children}
        </motion.div>
      </div>
    </section>
  )
})
