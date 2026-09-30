import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { CalendarCheck, FileText, RefreshCw, Search, UserPlus } from "lucide-react"
import { useCanvasDesignMode } from "@canvas/react"

import { heroTicker } from "@/content"
import { cn } from "@/lib/utils"

const icons = {
  refresh: RefreshCw,
  file: FileText,
  user: UserPlus,
  search: Search,
  calendar: CalendarCheck,
}

type TickerProps = {
  /** Seconds each line holds before the next rolls up. */
  interval?: number
  paused?: boolean
  className?: string
}

/**
 * A line of what Glovebox just did, rolling up to the next every few
 * seconds — a status readout, so it moves like one: each line lifts out as
 * the next lifts in beneath it, clipped to one line's height.
 */
export function Ticker({ interval = 2.6, paused = false, className }: TickerProps) {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = paused || designing

  useEffect(() => {
    if (still) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % heroTicker.length), interval * 1000)
    return () => window.clearInterval(id)
  }, [interval, still])

  const item = heroTicker[index]
  const Icon = icons[item.icon]
  const shift = reduce ? "0%" : "100%"

  return (
    <div className={cn("relative h-6 overflow-hidden", className)} aria-live="polite">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.p
          key={item.text}
          initial={{ transform: `translateY(${shift})`, opacity: 0 }}
          animate={{ transform: "translateY(0%)", opacity: 1 }}
          exit={{ transform: `translateY(-${shift})`, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
          className="flex h-6 items-center justify-center gap-2 whitespace-nowrap text-[15px] text-surface/70 sm:text-base"
        >
          <Icon className="size-4 shrink-0" strokeWidth={1.6} />
          {item.text}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
