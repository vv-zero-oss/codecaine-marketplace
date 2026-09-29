import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react"
import { Pause, Play } from "lucide-react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { BlurText } from "@/components/motion/blur-text"
import { film } from "@/content"
import { useScrub } from "@/lib/scrub"

/**
 * A film of someone building, pinned. It opens as a window at the golden
 * measure — 61.8% of the screen, rounded — and widens to full bleed as you
 * scroll, so the page steps from diagrams into a room. The play control sits
 * at the centre, the words on the lower golden line (76.4%).
 *
 * It plays muted while it is on screen, and holds still under reduced
 * motion, while being designed, and whenever the editor's Motion switch is
 * not on Playing. "Film playing" (group "Film") toggles it.
 */
export function Film() {
  const ref = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()
  const { designing, motion: mode } = useCanvasDesignMode()
  const inView = useInView(ref, { amount: 0.3 })
  const [paused, setPaused] = useState(false)
  const allowed = !reduced && !designing && mode === "play"
  const playing = allowed && inView && !paused
  useCanvasAction("Film playing", (next) => setPaused(!(next ?? paused)), { on: !paused, group: "Film" })

  useEffect(() => {
    const el = video.current
    if (!el) return
    if (playing) el.play().catch(() => {})
    else el.pause()
  }, [playing])

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] })
  // 19.1% in from each side is the 61.8% window; it opens to nothing.
  const inset = useScrub(scrollYProgress, [0.25, 0.62], [reduced ? 0 : 19.1, 0])
  const radius = useScrub(scrollYProgress, [0.25, 0.62], [16, 0])
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(${i}% ${i}% ${i}% ${i}% round ${r}px)`)
  const scale = useScrub(scrollYProgress, [0.25, 0.62], [reduced ? 1 : 1.12, 1])

  return (
    <section ref={ref} id="film" className="relative h-[200svh]">
      <motion.div className="sticky top-0 h-svh overflow-hidden bg-night" style={{ clipPath }} data-nav-theme="night">
        <motion.video
          ref={video}
          className="absolute inset-0 size-full object-cover grayscale"
          style={{ scale }}
          poster={film.video.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="A designer at work at a desk by a window, at night."
        >
          <source src={film.video.small} type="video/mp4" media="(max-width: 960px)" />
          <source src={film.video.src} type="video/mp4" />
        </motion.video>
        {/* Night rising from the bottom, so the words read on any frame. */}
        <div aria-hidden className="absolute inset-0 bg-linear-to-b from-night/10 via-night/20 to-night/75" />

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={playing ? "Pause the film" : "Play the film"}
          className="absolute top-1/2 left-1/2 grid size-phi-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-paper transition-[background-color,transform] duration-(--duration-press) ease-out-strong hover:bg-paper/10 active:scale-[0.96]"
        >
          {playing ? <Pause className="size-phi-5 fill-current" strokeWidth={0} /> : <Play className="size-phi-5 fill-current" strokeWidth={0} />}
        </button>

        <div className="absolute inset-x-0 top-[76.4%] -translate-y-1/2 px-gutter text-center text-paper">
          <h2 className="text-scene font-medium tracking-scene text-balance">
            <BlurText text={film.title} by="line" />
          </h2>
          <p className="mx-auto mt-phi-2 max-w-[52ch] text-body text-paper/75">
            <BlurText text={film.body} by="line" delay={0.12} />
          </p>
        </div>
      </motion.div>
    </section>
  )
}
