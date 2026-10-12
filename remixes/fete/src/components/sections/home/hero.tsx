import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { Poster } from "@/components/mock/poster"
import { MOODS, MoodBackdrop, type Mood } from "@/components/motion/mood-backdrop"
import { Logo } from "@/components/site/logo"
import { buttonVariants } from "@/components/ui/button"
import { findEvent, HERO_POSTERS } from "@/content/events"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

const EASE_OUT = [0.23, 1, 0.32, 1] as const

/** One poster in the orbit: lands on a soft spring, drifts up with the
 *  scroll by its depth, and leans a few pixels toward the cursor. */
function FloatingPoster({
  spot,
  index,
  progress,
  px,
  py,
  tinted,
  still,
}: {
  spot: (typeof HERO_POSTERS)[number]
  index: number
  progress: MotionValue<number>
  px: MotionValue<number>
  py: MotionValue<number>
  tinted: boolean
  still: boolean
}) {
  const event = findEvent(spot.id)
  const scrollY = useTransform(progress, [0, 1], [0, -spot.depth * 260])
  const x = useTransform(px, (v) => v * spot.depth * 16)
  const y = useTransform([scrollY, py], ([s, p]: number[]) => s + p * spot.depth * 12)
  if (!event) return null
  // On small screens the copy fills the width, so only the posters above
  // and below it stay; the ones beside it step aside.
  const crowding = spot.y > 22 && spot.y < 74

  return (
    <motion.div
      className={cn("absolute", crowding && "max-md:hidden")}
      style={{ left: `${spot.x}%`, top: `${spot.y}%`, x, y, rotate: spot.tilt * 0.4 }}
    >
      <motion.div
        initial={still ? false : { opacity: 0, scale: 0.82, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.9, bounce: 0.28, delay: 0.75 + index * 0.06 }}
        style={{ width: `calc(${spot.size}px * var(--poster-scale))`, aspectRatio: "1" }}
      >
        <Poster
          event={event}
          className={cn(
            "size-full transition-[background-color,box-shadow] duration-(--duration-swap)",
            tinted && "bg-white/16 shadow-[0_18px_40px_-16px_rgb(0_0_0/0.35)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

/** A headline line that rises out of its own mask. */
function Line({ children, delay, still, className }: { children: ReactNode; delay: number; still: boolean; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className={cn("block", className)}
        initial={still ? false : { y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.72, ease: EASE_OUT, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/** The words and buttons, once on white and once on a mood. */
function HeroCopy({ word, onMood, still, ctaRef, handlers }: {
  word: string
  onMood: boolean
  still: boolean
  ctaRef?: React.Ref<HTMLAnchorElement>
  handlers?: React.HTMLAttributes<HTMLAnchorElement>
}) {
  const decorative = onMood
  return (
    <div className="relative mx-auto flex max-w-[960px] flex-col items-center px-4 text-center" aria-hidden={decorative || undefined}>
      <motion.div
        initial={still || decorative ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className={cn(onMood ? "text-white/85" : "text-ink-4")}
      >
        <Logo className="text-[26px] md:text-[30px]" />
      </motion.div>
      <h1 className={cn("type-head mt-4 text-[clamp(48px,min(8.2vw,11.5svh),109.66px)] leading-[0.94] tracking-[-0.048em]", onMood ? "text-white" : "text-ink")}>
        <Line delay={0.12} still={still || decorative}>
          <motion.span key={word} initial={onMood ? false : { opacity: 0.4, filter: "blur(6px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.4 }} className="inline-block">
            {word}
          </motion.span>
        </Line>
        <Line delay={0.26} still={still || decorative}>nights out</Line>
        <Line delay={0.4} still={still || decorative} className={onMood ? "" : "flare-text"}>
          begin here
        </Line>
      </h1>
      <motion.p
        initial={still || decorative ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.6 }}
        className={cn("mt-6 max-w-[34ch] text-lead text-balance md:text-[22px]", onMood ? "text-white/88" : "text-ink-soft")}
      >
        From dawn run clubs to six-course supper clubs to harbour fireworks, Fête makes every gathering easy to host and hard to miss.
      </motion.p>
      <motion.div
        initial={still || decorative ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.72 }}
        className="mt-8 flex flex-col items-center gap-4"
      >
        {decorative ? (
          <span className={cn(buttonVariants({ variant: "glass", size: "lg" }))}>Host your first event</span>
        ) : (
          <Link ref={ctaRef} href="/create" className={cn(buttonVariants({ variant: "ink", size: "lg" }))} {...handlers}>
            Host your first event
          </Link>
        )}
        {decorative ? (
          <span className="inline-flex items-center gap-1.5 text-[16px] text-white/80">
            Find something tonight <ArrowRight className="size-4" />
          </span>
        ) : (
          <Link href="/discover" className="group inline-flex min-h-11 items-center gap-1.5 text-[16px] text-ink-soft transition-colors duration-(--duration-hover) hover:text-ink">
            Find something tonight
            <ArrowRight className="size-4 transition-transform duration-(--duration-hover) ease-(--ease-out-strong) group-hover:translate-x-0.5" />
          </Link>
        )}
      </motion.div>
    </div>
  )
}

/**
 * The hero. The headline's first word is a mood: point at the button and a
 * circle opens out of it, fills the hero with that mood — a starlit sky, an
 * electric colour wash, a sky of hearts — and swaps the word to match. Leave
 * and it folds back into the button. Each visit brings the next mood.
 *
 * On touch screens, where there is no hover, the moods take turns on their
 * own (`autoplay`). In the editor every mood is a switch on the Actions row.
 */
export function Hero({
  revealDuration = 0.2,
  closeDuration = 0.22,
  autoplay = "touch",
  restingWord = "Joyful",
  coverage = 0.78,
}: {
  /** Seconds for the circle to open. */
  revealDuration?: number
  /** Seconds for it to fold back. */
  closeDuration?: number
  /** When the moods take turns on their own. */
  autoplay?: "touch" | "always" | "never"
  /** The word on the plain white hero. */
  restingWord?: string
  /** The open circle's width, as a share of the hero's. */
  coverage?: number
}) {
  const reduced = useReducedMotion() ?? false
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing

  const heroRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const [mood, setMood] = useState<Mood>("starlit")
  const [open, setOpen] = useState(false)
  const turn = useRef(0)

  // The circle: radius and origin, in px of the hero.
  const radius = useMotionValue(0)
  const ox = useMotionValue(0)
  const oy = useMotionValue(0)
  // A mask rather than a clip-path: Chromium lets composited children
  // (blurs, transforms) bleed past a clip-path, never past a mask.
  const mask = useMotionTemplate`radial-gradient(circle ${radius}px at ${ox}px ${oy}px, #000 calc(100% - 0.75px), transparent 100%)`
  const oxPx = useMotionTemplate`${ox}px`
  const oyPx = useMotionTemplate`${oy}px`

  const measure = useCallback(() => {
    const hero = heroRef.current?.getBoundingClientRect()
    const cta = ctaRef.current?.getBoundingClientRect()
    if (!hero || !cta) return 0
    const x = cta.left + cta.width / 2 - hero.left
    const y = cta.top + cta.height / 2 - hero.top
    ox.set(x)
    oy.set(y)
    // A circle, not a wipe: as wide as ~78% of the hero, as the reference
    // draws it — and always tall enough to swallow the whole headline, so
    // the resting word never peeks out over the top on a short window.
    const copy = copyRef.current?.firstElementChild?.getBoundingClientRect()
    const reach = copy ? y - (copy.top - hero.top) + 72 : 0
    return Math.max(hero.width * coverage * 0.5, reach)
  }, [ox, oy, coverage])

  const show = useCallback(
    (next: Mood) => {
      const far = measure()
      setMood(next)
      setOpen(true)
      if (still) return radius.set(far)
      // Out of the button, not out of a point: start at the button's size.
      if (radius.get() < 40) radius.set(56)
      animate(radius, far, { duration: revealDuration, ease: [0.33, 0.7, 0.4, 1] })
    },
    [measure, radius, revealDuration, still],
  )

  const hide = useCallback(() => {
    setOpen(false)
    measure()
    if (still) return radius.set(0)
    animate(radius, 0, { duration: closeDuration, ease: [0.55, 0, 0.8, 0.4] })
  }, [measure, radius, closeDuration, still])

  const nextMood = useCallback(() => {
    const m = MOODS[turn.current % MOODS.length].id
    turn.current += 1
    return m
  }, [])

  // Keep the circle covering the hero when the window changes size.
  useEffect(() => {
    const onResize = () => {
      const far = measure()
      if (open) radius.set(far)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [measure, open, radius])

  // Touch screens: the moods take turns.
  useEffect(() => {
    if (designing || reduced || autoplay === "never") return
    if (autoplay === "touch" && !window.matchMedia("(hover: none)").matches) return
    let timer: number
    const cycle = (on: boolean) => {
      if (on) show(nextMood())
      else hide()
      timer = window.setTimeout(() => cycle(!on), on ? 2600 : 1600)
    }
    timer = window.setTimeout(() => cycle(true), 2200)
    return () => window.clearTimeout(timer)
  }, [autoplay, designing, reduced, show, hide, nextMood])

  for (const m of MOODS) {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- a fixed list
    useCanvasAction(`${m.word} mood`, (next) => ((next ?? !(open && mood === m.id)) ? show(m.id) : hide()), {
      on: open && mood === m.id,
      group: "Hero",
    })
  }

  // Scroll: posters drift up at their own depths as the hero leaves.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : 90])

  // Cursor: a few pixels of lean, on a soft spring.
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const px = useSpring(rawX, { stiffness: 60, damping: 18 })
  const py = useSpring(rawY, { stiffness: 60, damping: 18 })
  const onPointerMove = (e: React.PointerEvent) => {
    if (still || e.pointerType !== "mouse") return
    const r = heroRef.current!.getBoundingClientRect()
    rawX.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    rawY.set(((e.clientY - r.top) / r.height - 0.5) * 2)
  }

  // The circle only shows while it has a radius, so it keeps its mood's
  // word through the fold rather than flipping back mid-close.
  const word = MOODS.find((m) => m.id === mood)!.word
  const handlers: React.HTMLAttributes<HTMLAnchorElement> = {
    onPointerEnter: (e) => e.pointerType === "mouse" && show(nextMood()),
    onPointerLeave: (e) => e.pointerType === "mouse" && hide(),
    onFocus: () => show(nextMood()),
    onBlur: hide,
  }

  const field = (tinted: boolean) => (
    <div aria-hidden className="pointer-events-none absolute inset-0 [--poster-scale:0.64] md:[--poster-scale:0.84] xl:[--poster-scale:1]" data-canvas-ignore>
      {HERO_POSTERS.map((spot, i) => (
        <FloatingPoster key={spot.id} spot={spot} index={i} progress={scrollYProgress} px={px} py={py} tinted={tinted} still={still} />
      ))}
    </div>
  )

  return (
    <section
      ref={heroRef}
      id="top"
      onPointerMove={onPointerMove}
      className="relative isolate h-[max(760px,112svh)] overflow-hidden bg-page md:h-[max(860px,118svh)]"
    >
      {field(false)}
      <motion.div ref={copyRef} style={{ y: copyY }} className="relative z-10 pt-[max(104px,17svh)] md:pt-[max(96px,15svh)]">
        <HeroCopy word={restingWord} onMood={false} still={still} ctaRef={ctaRef} handlers={handlers} />
      </motion.div>

      {/* The mood, clipped to the circle that opens from the button. */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-20" style={{ maskImage: mask, WebkitMaskImage: mask, "--ox": oxPx, "--oy": oyPx } as never} data-canvas-ignore>
        <MoodBackdrop mood={mood} />
        {field(true)}
        <motion.div style={{ y: copyY }} className="relative z-10 pt-[max(104px,17svh)] md:pt-[max(96px,15svh)]">
          <HeroCopy word={word} onMood still />
        </motion.div>
      </motion.div>
      <p className="sr-only" aria-live="polite">
        {open ? `${word} nights out begin here` : ""}
      </p>
    </section>
  )
}
