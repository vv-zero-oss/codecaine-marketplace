import { AnimatePresence, motion, useInView } from "motion/react"
import { useRef, useState, type ReactNode } from "react"

import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { Sticker, type StickerTone } from "@/components/ui/sticker"
import { STICKERS } from "@/content"
import { cn } from "@/lib/utils"

/** Where the first stickers land, as percentages of the area, with a tilt. */
const SPOTS = [
  { x: 5, y: 12, r: -12 },
  { x: 95, y: 18, r: 8 },
  { x: 8, y: 86, r: 6 },
  { x: 92, y: 84, r: -10 },
  { x: 26, y: -4, r: 5 },
  { x: 76, y: 102, r: -6 },
  { x: 99, y: 52, r: 4 },
  { x: 1, y: 52, r: -4 },
]

type Placed = { id: number; x: number; y: number; r: number; text: string; tone: StickerTone }

/**
 * Stickers slapped over whatever it wraps: the first `count` pop on, one after
 * another, when it scrolls into view — and a click anywhere on it sticks
 * another one where you clicked.
 */
export function StickerBurst({
  children,
  count = 6,
  stagger = 0.12,
  clickToStick = true,
  className,
}: {
  children: ReactNode
  count?: number
  stagger?: number
  clickToStick?: boolean
  className?: string
}) {
  const area = useRef<HTMLDivElement>(null)
  const inView = useInView(area, { once: true, margin: "0px 0px -20% 0px" })
  const { designing } = useCanvasDesignMode()
  const [shown, setShown] = useState(true)
  const [extra, setExtra] = useState<Placed[]>([])
  const nextId = useRef(100)

  useCanvasAction("Stickers", (on) => setShown(on ?? !shown), { group: "About", on: shown })
  useCanvasAction("Clear added stickers", () => setExtra([]), { group: "About" })

  const initial: Placed[] = SPOTS.slice(0, count).map((spot, i) => {
    const s = STICKERS[i % STICKERS.length]
    return { id: i, ...spot, text: s.text, tone: s.tone }
  })

  const stick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!clickToStick || !area.current) return
    const box = area.current.getBoundingClientRect()
    const s = STICKERS[nextId.current % STICKERS.length]
    const placed: Placed = {
      id: nextId.current++,
      x: ((event.clientX - box.left) / box.width) * 100,
      y: ((event.clientY - box.top) / box.height) * 100,
      r: Math.round((Math.random() * 2 - 1) * 14),
      text: s.text,
      tone: s.tone,
    }
    setExtra((all) => [...all.slice(-11), placed])
  }

  const visible = shown && (inView || designing)

  return (
    <div
      ref={area}
      onClick={stick}
      className={cn("relative", clickToStick && "cursor-[copy]", className)}
    >
      {children}
      <AnimatePresence>
        {visible &&
          [...initial, ...extra].map((s) => (
            <motion.div
              key={s.id}
              className={cn("pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2", s.id >= 4 && s.id < 100 && "max-md:hidden")}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              initial={designing ? false : { scale: 0, rotate: s.r - 25, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0, transition: { duration: 0.2 } }}
              transition={{
                type: "spring",
                stiffness: 520,
                damping: 18,
                delay: s.id < 100 ? 0.25 + s.id * stagger : 0,
              }}
            >
              <Sticker text={s.text} tone={s.tone} rotate={s.r} className="px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-xl" />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  )
}
