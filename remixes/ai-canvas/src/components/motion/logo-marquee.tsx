import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * A row of logos running sideways for ever, fading out at both ends. Rendered
 * twice and run half its width, so the seam never shows. A Framer Motion
 * (Web Animations) loop, so the editor's Motion switch stops it; it stands
 * still under reduced motion and while being designed.
 */
export function LogoMarquee({
  logos,
  seconds = 40,
  className,
}: {
  logos: { name: string; src: string }[]
  /** Seconds for one full pass. */
  seconds?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing, motion: mode } = useCanvasDesignMode()
  const still = reduced || designing || mode !== "play"
  return (
    <div
      className={cn(
        "overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]",
        className,
      )}
    >
      <motion.ul
        className="flex w-max"
        data-canvas-ignore
        initial={{ transform: "translateX(0%)" }}
        animate={still ? { transform: "translateX(0%)" } : { transform: ["translateX(0%)", "translateX(-50%)"] }}
        transition={still ? { duration: 0 } : { duration: seconds, ease: "linear", repeat: Infinity }}
      >
        {[0, 1].map((copy) =>
          logos.map((logo) => (
            <li key={`${copy}-${logo.name}`} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-phi-1 px-phi-4">
              <img src={logo.src} alt="" className="h-5 w-auto brightness-0 opacity-75" />
              <span className="text-[15px] font-semibold tracking-[-0.02em] text-ink/80">{logo.name}</span>
            </li>
          )),
        )}
      </motion.ul>
    </div>
  )
}
