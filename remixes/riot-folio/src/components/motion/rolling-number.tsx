import { motion, useInView, useReducedMotion } from "motion/react"
import { useRef } from "react"

import { useCanvasDesignMode } from "@canvas/react"
import { duration as token, ease } from "@/lib/motion-tokens"
import { cn } from "@/lib/utils"

/**
 * A number that rolls into place like an odometer when it scrolls into view.
 *
 * Each digit is its own reel, spun once round and stopped on its value, with
 * a small stagger from left to right — read off the reference, where the
 * digits tumble rather than count. It turns a statistic into a moment
 * without making anyone wait for it: the whole roll is well under two
 * seconds. Reduced motion and the editor's design mode show the number.
 */
export function RollingNumber({
  value = 0,
  prefix = "",
  suffix = "",
  duration,
  stagger = 0.08,
  spins = 1,
  className,
}: {
  value?: number
  prefix?: string
  suffix?: string
  /** One reel's roll, in seconds. Defaults to `--duration-roll`. */
  duration?: number
  /** Delay between reels, in seconds. */
  stagger?: number
  /** Full turns each reel makes before it stops. */
  spins?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" })
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduce || designing
  const text = value.toLocaleString("en-GB", { maximumFractionDigits: 1 })
  const seconds = duration ?? token("roll", 1400)
  let reel = 0

  return (
    <span
      ref={ref}
      aria-label={`${prefix}${text}${suffix}`}
      className={cn("inline-flex items-baseline tabular-nums", className)}
    >
      <span aria-hidden className="inline-flex overflow-hidden leading-none">
        {prefix}
        {[...text].map((char, i) => {
          if (!/\d/.test(char)) return <span key={i}>{char}</span>
          const digit = Number(char)
          const index = reel++
          const stops = 10 * spins + digit
          return (
            <span key={i} className="relative inline-block h-[1em] overflow-hidden">
              {/* The width comes from the digit itself, so the reel is as
                  wide as the number it stops on. */}
              <span className="invisible">{char}</span>
              <motion.span
                className="absolute inset-x-0 top-0 flex flex-col"
                initial={false}
                animate={{ y: still || inView ? `-${stops}em` : "0em" }}
                transition={still ? { duration: 0 } : { duration: seconds, delay: index * stagger, ease: ease("out") }}
              >
                {Array.from({ length: stops + 1 }, (_, n) => (
                  <span key={n} className="block h-[1em] text-center">
                    {n % 10}
                  </span>
                ))}
              </motion.span>
            </span>
          )
        })}
        {suffix}
      </span>
    </span>
  )
}
