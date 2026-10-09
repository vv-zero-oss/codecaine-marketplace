import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { CaptureScene, CardScene, InvoiceScene, MatchScene, StageMotion } from "@/components/mock/hero-scenes"
import { cn } from "@/lib/utils"

const SCENES = [
  { id: "card", label: "Card", weight: 1, Scene: CardScene },
  { id: "match", label: "Receipts", weight: 1.25, Scene: MatchScene },
  { id: "capture", label: "Invoices", weight: 1.1, Scene: CaptureScene },
  { id: "invoice", label: "Coding", weight: 1.45, Scene: InvoiceScene },
] as const

const CANVAS_W = 960
const CANVAS_H = 480
/** Below this the panels stop being readable; on a phone the stage crops its edges instead of shrinking further. */
const MIN_SCALE = 0.58

/** Registers one scene as a switch in the editor's Actions row. */
function SceneAction({ index, active, onPick }: { index: number; active: boolean; onPick: (index: number, on: boolean) => void }) {
  useCanvasAction(`Hero: ${SCENES[index].label.toLowerCase()}`, (next) => onPick(index, next ?? !active), { on: active, group: "Hero" })
  return null
}

/**
 * The hero's product film, played live in the DOM: the card leaves its
 * slot, agents match its receipt, invoices are dropped in, and one is read,
 * coded and flagged. Then it loops.
 *
 * Scene lengths come off the reference recording — about two to three
 * seconds each, entrances on a strong ease-out with 150ms staggers, scenes
 * swapped with a quick blur-fade. It only plays while on screen. The editor
 * can hold any scene (Actions row), and holds the current one while
 * designing; reduced motion shows each scene at rest and crossfades.
 */
export function HeroStage({
  sceneDuration = 2.6,
  autoplay = true,
  paused = false,
  startScene = "card",
  showProgress = true,
  className,
}: {
  /** Seconds for the shortest scene; the others scale from it. */
  sceneDuration?: number
  autoplay?: boolean
  paused?: boolean
  startScene?: "card" | "match" | "capture" | "invoice"
  showProgress?: boolean
  className?: string
}) {
  const reduced = useReducedMotion() ?? false
  const { designing } = useCanvasDesignMode()
  const [scene, setScene] = useState(() => Math.max(0, SCENES.findIndex((s) => s.id === startScene)))
  const [held, setHeld] = useState(false)
  const [cycle, setCycle] = useState(0)
  const box = useRef<HTMLDivElement>(null)
  const inView = useInView(box, { margin: "0px 0px -10% 0px" })
  const [scale, setScale] = useState(1)

  useEffect(() => {
    setScene(Math.max(0, SCENES.findIndex((s) => s.id === startScene)))
  }, [startScene])

  // Fit the fixed canvas to the panel, down to MIN_SCALE; narrower than that, the sides crop.
  useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setScale(Math.max(MIN_SCALE, Math.min(1.15, entry.contentRect.width / CANVAS_W))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const playing = autoplay && !paused && !held && !designing && inView
  const duration = sceneDuration * SCENES[scene].weight

  useEffect(() => {
    if (!playing) return
    const t = window.setTimeout(() => {
      setScene((s) => (s + 1) % SCENES.length)
      setCycle((c) => c + 1)
    }, duration * 1000)
    return () => window.clearTimeout(t)
  }, [playing, duration, scene])

  const pick = (index: number, on: boolean) => {
    setScene(index)
    setCycle((c) => c + 1)
    setHeld(on)
  }

  const { Scene } = SCENES[scene]
  const still = reduced || designing

  return (
    <div className={cn("relative", className)}>
      {SCENES.map((s, i) => (
        <SceneAction key={s.id} index={i} active={held && scene === i} onPick={pick} />
      ))}
      <div ref={box} className="relative w-full overflow-hidden" style={{ height: CANVAS_H * scale }} aria-hidden>
        <div className="absolute top-0 left-1/2 origin-top" style={{ width: CANVAS_W, height: CANVAS_H, transform: `translateX(-50%) scale(${scale})` }}>
          <StageMotion.Provider value={{ still }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${SCENES[scene].id}-${cycle}`}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={still ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)", scale: 0.985 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              >
                <Scene />
              </motion.div>
            </AnimatePresence>
          </StageMotion.Provider>
        </div>
      </div>

      {showProgress && (
        <div className="relative z-10 mx-auto mt-2 flex w-fit items-center gap-1 rounded-full bg-raised/80 p-1 shadow-(--shadow-xs) backdrop-blur" role="tablist" aria-label="Product film">
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={scene === i}
              onClick={() => pick(i, false)}
              className={cn(
                "relative flex h-8 min-w-11 items-center gap-2 overflow-hidden rounded-full px-3 text-[12.5px] transition-colors duration-(--duration-hover)",
                scene === i ? "text-ink" : "text-ink-3 hover:text-ink-2",
              )}
            >
              {scene === i && (
                <motion.span layoutId="hero-stage-pill" className="absolute inset-0 rounded-full bg-panel" transition={{ type: "spring", duration: 0.4, bounce: 0.15 }} />
              )}
              <span className="relative">{s.label}</span>
              {scene === i && (
                <span className="relative hidden h-[3px] w-8 overflow-hidden rounded-full bg-line sm:block">
                  <span
                    key={`${cycle}-${playing}`}
                    className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-ink"
                    style={{
                      transform: playing ? undefined : "scaleX(1)",
                      animation: playing ? `hero-stage-progress ${duration}s linear forwards` : undefined,
                    }}
                  />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
      <style>{`@keyframes hero-stage-progress { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
    </div>
  )
}
