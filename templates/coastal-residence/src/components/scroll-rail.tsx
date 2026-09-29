import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { useState } from "react"

import { scrollToTarget, useLenis } from "@/components/motion"
import { useToneAt } from "@/components/use-tone"
import { cn } from "@/lib/utils"

/**
 * The left rail: how far down the page you are, 00 to 100, riding down a
 * hairline — and "Scroll" turning into "To top" once you reach the end.
 */
export function ScrollRail() {
  const tone = useToneAt(0.5)
  const lenis = useLenis()
  const { scrollYProgress } = useScroll()
  const [value, setValue] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (v) => setValue(Math.round(v * 100)))
  const top = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const done = value >= 99

  return (
    <aside
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed bottom-14 left-14 top-[17rem] z-30 hidden w-6 flex-col items-center transition-colors duration-500 lg:flex",
        tone === "light" ? "text-paper" : "text-ink",
      )}
    >
      <div className="relative h-[44vh] max-h-80 w-full">
        <motion.div className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-current opacity-60" style={{ height: top }} />
        <motion.span className="label absolute left-1/2 -translate-x-1/2 py-2 tabular-nums tracking-normal" style={{ top }}>
          {String(value).padStart(2, "0")}
        </motion.span>
      </div>
      <button
        type="button"
        tabIndex={-1}
        onClick={() => done && scrollToTarget(lenis, 0)}
        className={cn("mt-auto flex flex-col items-center gap-4", done && "pointer-events-auto")}
      >
        {done && <ArrowUp className="size-5" strokeWidth={1} />}
        <span className="label tracking-[0.3em] [writing-mode:vertical-rl] rotate-180">
          {done ? "To top" : "Scroll"}
        </span>
        {!done && <ArrowDown className="size-5" strokeWidth={1} />}
      </button>
    </aside>
  )
}
