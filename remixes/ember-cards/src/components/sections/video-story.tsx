import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react"
import { Pause, Play } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { Eyebrow } from "@/components/ui/eyebrow"
import { STORY } from "@/content"

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

/**
 * A customer story that zooms to fill the page: the video starts as a small
 * rounded window in the middle of the screen and, as the section is scrolled,
 * opens out to the full viewport while the footage itself settles from a
 * slight zoom. The quote arrives once the frame is open. The window is a
 * clip-path, not a scale, so the video is never resampled.
 */
export function VideoStory({
  quote = STORY.quote,
  author = STORY.author,
  place = STORY.place,
  eyebrow = STORY.eyebrow,
  video = STORY.video,
  poster = STORY.poster,
  startInset = 30,
  autoplay = true,
}: {
  quote?: string
  author?: string
  place?: string
  eyebrow?: string
  video?: string
  poster?: string
  startInset?: number
  autoplay?: boolean
}) {
  const section = useRef<HTMLElement>(null)
  const player = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const [playing, setPlaying] = useState(false)
  const [open, setOpen] = useState(false)

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] })
  const still = reduce || designing
  const inset = useTransform(scrollYProgress, [0, 0.55], [startInset, 0], { clamp: true })
  const radius = useTransform(scrollYProgress, [0, 0.55], [28, 0], { clamp: true })
  const clipPath = useTransform(() =>
    still ? "inset(0% 0% 0% 0% round 0px)" : `inset(${inset.get() * 0.8}% ${inset.get()}% ${inset.get() * 0.8}% ${inset.get()}% round ${radius.get()}px)`,
  )
  const zoom = useTransform(scrollYProgress, [0, 0.6], [1.25, 1], { clamp: true })
  const videoTransform = useTransform(() => (still ? "scale(1)" : `scale(${zoom.get()})`))
  useMotionValueEvent(scrollYProgress, "change", (p) => setOpen(p > 0.5))

  const setPlayback = (next: boolean) => {
    const el = player.current
    if (!el) return
    if (next) el.play().catch(() => {})
    else el.pause()
  }
  useCanvasAction("Play video", (next) => setPlayback(next ?? !playing), { on: playing, group: "Customer story" })
  useCanvasAction("Quote shown", (next) => setOpen(next ?? !open), { on: open, group: "Customer story" })

  // Autoplay only when it is wanted, allowed and on screen.
  useEffect(() => {
    const el = player.current
    if (!el || !autoplay || reduce || designing) return
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? el.play().catch(() => {}) : el.pause()), {
      threshold: 0.2,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [autoplay, reduce, designing])

  const shown = open || still

  return (
    <section id="story" ref={section} className="relative" style={{ height: still ? "100svh" : "260svh" }}>
      <div data-canvas-ignore className="sticky top-0 h-svh overflow-hidden">
        <motion.div className="absolute inset-0 overflow-hidden bg-surface" style={{ clipPath }}>
          <motion.video
            ref={player}
            className="size-full object-cover"
            style={{ transform: videoTransform }}
            src={asset(video)}
            poster={asset(poster)}
            muted
            loop
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            aria-label={`${author}, ${place}`}
          />
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-black/30" />
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1176px] px-4 pb-10 sm:px-6 sm:pb-16">
          <motion.div
            initial={false}
            animate={shown ? { opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" } : { opacity: 0, filter: "blur(10px)", transform: "translateY(24px)" }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-3xl"
          >
            <Eyebrow label={eyebrow} className="mb-5 bg-white/10 text-white" />
            <blockquote className="font-serif text-[clamp(1.75rem,1rem+3vw,3.5rem)] leading-[1.08] text-white">{quote}</blockquote>
            <p className="mt-5 text-sm text-white/80">
              <span className="font-medium text-white">{author}</span> · {place}
            </p>
          </motion.div>
        </div>

        <button
          type="button"
          onClick={() => setPlayback(!playing)}
          aria-label={playing ? "Pause video" : "Play video"}
          className="absolute right-4 bottom-10 grid size-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-[background-color,transform] duration-(--duration-hover) ease-out hover:bg-white/25 active:scale-[0.94] sm:right-6 sm:bottom-16"
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4 translate-x-px" />}
        </button>
      </div>
    </section>
  )
}
