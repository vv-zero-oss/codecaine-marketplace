import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { BrandLogo, type Brand } from "@/components/ui/brand-logo"
import { LOGO_SETS } from "@/content"
import { curve, type Easing } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * The logo strip: a row of cells whose logos roll over to the next set, one
 * cell after another from the left.
 *
 * Each logo leaves upwards as the next one rises in from below — a full cell
 * of travel, 0.45s on an ease-out, each cell 0.08s behind the one before it.
 * It says "there are more of these" without a carousel's arrows.
 *
 * Holds still while the page is being designed, and for reduced motion.
 */
export function LogoSwap({
  interval = 4,
  duration = 0.45,
  stagger = 0.08,
  easing = "out",
  paused = false,
  className,
}: {
  /** Seconds each set stays up. */
  interval?: number
  duration?: number
  stagger?: number
  easing?: Easing
  paused?: boolean
  className?: string
}) {
  const [set, setSet] = useState(0)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = paused || designing || reduced

  useCanvasAction("Next logo set", () => setSet((s) => (s + 1) % LOGO_SETS.length), { group: "Hero" })

  useEffect(() => {
    if (still) return
    const id = window.setInterval(() => setSet((s) => (s + 1) % LOGO_SETS.length), interval * 1000)
    return () => window.clearInterval(id)
  }, [interval, still])

  const logos = LOGO_SETS[set]

  return (
    <div className={cn("grid grid-cols-3 border-y border-line md:grid-cols-6", className)}>
      {logos.map((brand, i) => (
        <div
          key={i}
          className={cn(
            "relative flex h-20 items-center justify-center overflow-hidden border-line md:h-[120px]",
            i % 3 !== 2 && "border-r",
            i < 3 && "border-b md:border-b-0",
            "md:border-r md:last:border-r-0",
          )}
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={`${set}-${brand}`}
              className="flex"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-110%", opacity: 0 }}
              transition={{ ...curve(easing, duration), delay: i * stagger }}
            >
              <BrandLogo brand={brand as Brand} scale={0.95} className="max-md:scale-[0.72]" />
            </motion.span>
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
