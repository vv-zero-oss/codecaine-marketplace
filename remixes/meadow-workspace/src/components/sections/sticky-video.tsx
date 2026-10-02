import { Play } from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef, useState } from "react"
import { useCanvasDesignMode } from "@canvas/react"

/**
 * A pinned video that grows to fill the screen as the page scrolls.
 *
 * The section is `scrollLength` viewports tall and its stage sticks to the
 * top; scroll progress through it drives the frame's inset and radius from a
 * card to the full window, while the caption lifts away. Reduced motion and
 * the editor's design mode hold it at the finished, full-screen state so
 * nothing is hidden behind a scroll position.
 */
export function StickyVideo({
  title = "See a week in Meadow",
  caption = "Two minutes, one real inbox.",
  src = "/video/meadow.mp4",
  poster = "/images/video-poster.jpg",
  scrollLength = 2.2,
  startInset = 12,
}: {
  title?: string
  caption?: string
  src?: string
  poster?: string
  /** Section height in viewports. */
  scrollLength?: number
  /** Starting inset from the viewport edge, in vw. */
  startInset?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduce || designing
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const grow = useTransform(scrollYProgress, [0, 0.7], [0, 1], { clamp: true })

  const inset = useTransform(grow, (g) => `${(still ? 0 : startInset * (1 - g))}vw`)
  const vInset = useTransform(grow, (g) => `${(still ? 0 : 12 * (1 - g))}vh`)
  const radius = useTransform(grow, (g) => (still ? 0 : 28 * (1 - g)))
  const textOpacity = useTransform(grow, [0, 0.45], [1, 0])
  const textY = useTransform(grow, [0, 0.45], [0, -24])
  const [playing, setPlaying] = useState(true)

  return (
    <section ref={ref} id="video" aria-label="Product video" style={{ height: `${still ? 100 : scrollLength * 100}vh` }} className="relative bg-page">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute overflow-hidden bg-ink-900 shadow-window"
          style={{ left: inset, right: inset, top: vInset, bottom: vInset, borderRadius: radius }}
        >
          <video
            className="size-full object-cover"
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            autoPlay={!still}
            preload="metadata"
            ref={(el) => {
              if (!el) return
              if (playing && !still) void el.play().catch(() => {})
              else el.pause()
            }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-ink-950/10" />
          <motion.div style={{ opacity: textOpacity, y: textY }} className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 p-8 text-center text-white">
            <h2 className="font-display text-[clamp(30px,5vw,48px)] leading-[1.05] font-semibold tracking-[-0.04em] text-balance">{title}</h2>
            <p className="text-[15px] text-white/85">{caption}</p>
          </motion.div>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause video" : "Play video"}
            className="absolute right-4 bottom-4 grid size-11 place-items-center rounded-full bg-white/90 text-ink-900 shadow-lift transition-transform duration-150 active:scale-95"
          >
            {playing ? <span className="flex gap-[3px]"><i className="h-3.5 w-[3px] rounded-sm bg-current" /><i className="h-3.5 w-[3px] rounded-sm bg-current" /></span> : <Play className="size-4 fill-current" />}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
