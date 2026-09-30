import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useEffect, useRef } from "react"

import { MixedTitle } from "@/components/ui/mixed-title"
import { useCanvasDesignMode } from "@canvas/react"
import { cn } from "@/lib/utils"

/** The wordmark's rendered size here: clamp(72px, 12vw, 200px). */
function markSize() {
  return Math.min(200, Math.max(72, window.innerWidth * 0.12))
}

/** Where the header's logo sits and how big it is (see SiteHeader). */
function headerLogo() {
  const logo = document.querySelector<HTMLElement>("[data-header-logo]")
  if (!logo) return { centre: 56, size: 30 }
  const box = logo.getBoundingClientRect()
  return { centre: box.top + box.height / 2, size: parseFloat(getComputedStyle(logo).fontSize) || 30 }
}

/**
 * The opening film, and the way it leaves.
 *
 * Full-bleed and pinned for a screen's worth of scroll; as the visitor
 * scrolls, the frame tucks in at the sides and its bottom edge rises to the
 * top — the film folds up into the header — while the wordmark rides the
 * frame's centre, shrinks and turns to ink, landing where the header's logo
 * sits. From the recording: about 1.1 screens of scroll, an ease-in-out,
 * sides in by ~16% of the width before the frame is gone.
 *
 * Tells the header when it has handed the logo over, through
 * `data-hero` on <html>.
 */
export function HeroFilm({
  src,
  poster,
  wordmark,
  tagline,
  length = 220,
  tuck = 16,
  paused = false,
  overlap = true,
  className,
}: {
  src: string
  poster: string
  wordmark: string
  tagline: string
  /** Height of the pinned track, in vh (100 = no scroll-linked motion). */
  length?: number
  /** How far the sides tuck in by the end, in % of the width. */
  tuck?: number
  paused?: boolean
  /** Let the next section rise under the fold instead of after it. */
  overlap?: boolean
  className?: string
}) {
  const track = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] })

  // Stays full for the first 8%, then folds (the recording holds a beat).
  const fold = useTransform(scrollYProgress, [0.08, 0.92], [0, 1], { clamp: true })
  const eased = useTransform(fold, (t) => (reduced ? 0 : t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2))
  const clip = useTransform(eased, (t) => `inset(0% ${t * tuck}% ${t * 93}% ${t * tuck}% round ${t * 14}px)`)
  // The wordmark rides the frame's centre from mid-screen to the header's
  // logo, and shrinks to exactly the logo's size, so the hand-over at the
  // end is invisible. The logo's centre and size are read off the header.
  const markY = useTransform(eased, (t) => (1 - t) * window.innerHeight * 0.5 + t * headerLogo().centre)
  const markScale = useTransform(eased, (t) => 1 + (headerLogo().size / markSize() - 1) * t)
  const markColor = useTransform(eased, [0.55, 0.9], ["#f8f8f8", "#141312"])
  const tagOpacity = useTransform(eased, [0, 0.25], [1, 0])
  const shade = useTransform(eased, [0, 1], [0.18, 0.4])
  // Gone the moment the header's logo takes over, so the two never show.
  const markOpacity = useTransform(fold, (v) => (v >= 0.98 ? 0 : 1))

  useMotionValueEvent(fold, "change", (value) => {
    document.documentElement.dataset.hero = value >= 0.98 ? "off" : "on"
  })
  useEffect(() => {
    document.documentElement.dataset.hero = "on"
    return () => {
      delete document.documentElement.dataset.hero
    }
  }, [])

  useEffect(() => {
    const element = video.current
    if (!element) return
    if (paused || designing || reduced) element.pause()
    else element.play().catch(() => {})
  }, [paused, designing, reduced])

  return (
    <section
      ref={track}
      id="top"
      className={cn("relative z-20", className)}
      // The last screen of the fold overlaps the next section, which rises
      // underneath the frame as it folds away — as in the recording.
      style={{ height: `${Math.max(100, length)}vh`, marginBottom: overlap ? "-100svh" : undefined }}
    >
      <div className="sticky top-0 h-svh overflow-hidden" data-canvas-ignore>
        <motion.div className="absolute inset-0 bg-studio will-change-[clip-path]" style={{ clipPath: clip }}>
          <video
            ref={video}
            className="size-full object-cover object-[50%_30%]"
            src={src}
            poster={poster}
            autoPlay={!paused && !reduced}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          />
          <motion.div className="absolute inset-0 bg-ink" style={{ opacity: shade }} />
        </motion.div>
        <motion.div className="pointer-events-none absolute inset-x-0 top-0 h-0" style={{ y: markY, opacity: markOpacity }}>
          <motion.div className="absolute inset-x-0 top-0 flex -translate-y-1/2 justify-center" style={{ scale: markScale, color: markColor }}>
            <h1 className="font-display text-[clamp(72px,12vw,200px)] leading-[0.8] tracking-[-0.01em]">{wordmark}</h1>
          </motion.div>
          <motion.div style={{ opacity: tagOpacity, color: markColor }} className="absolute inset-x-0 top-[clamp(44px,7vw,116px)] text-center">
            <MixedTitle as="p" text={tagline} className="text-[clamp(13px,1.1vw,18px)] tracking-[0.02em]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
