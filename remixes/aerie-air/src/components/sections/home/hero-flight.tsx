import { useRef, useState } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { AircraftSide } from "@/components/mock/aircraft"
import { photos, type PhotoName } from "@/lib/photos"
import { useTokens } from "@/lib/tokens"
import { cn } from "@/lib/utils"

const SCENES: { photo: PhotoName; caption: string; position?: string }[] = [
  { photo: "cabin-dusk", caption: "Rise above the commute in an all-electric air taxi, booked with a single tap.", position: "50% 45%" },
  { photo: "wing-pink", caption: "No traffic. No exhaust. Only the time — and the view — your day deserves.", position: "60% 50%" },
  { photo: "city-haze", caption: "Lift-off to landing in about the time it takes to finish a coffee.", position: "50% 70%" },
]

/** Scroll windows, as fractions of the pinned section, read off the reference. */
const T = {
  open: [0, 0.1] as const, // the card grows to the full window
  swap1: [0.36, 0.42] as const, // cabin → wing
  swap2: [0.58, 0.64] as const, // wing → the craft over the city
  lift: [0.8, 0.9] as const, // the picture lifts away, the sky shows
  settle: [0.9, 1] as const, // sky turns to paper, the line grows
}

/**
 * The opening: one pinned scroll story, as the reference tells it.
 *
 * A rounded card on the sky with the promise in it; scroll and the card
 * opens to the whole window, the promise gives way to captions, the
 * pictures change under them (the cabin, the wing, the craft lifting over
 * the city), and then the picture lifts away like a lid, the sky shows
 * through with the next line, and the sky turns to paper as that line
 * grows into the next section's headline.
 *
 * Scroll-scrubbed with Framer Motion, smoothed by a light spring. Reduced
 * motion and the editor's design mode get the same content laid out
 * still.
 */
export function HeroFlight({
  headline = "Skip the street.\nTake the sky.",
  tagline = "Booking opens spring 2027.",
  closing = "The only way is up",
  length = 520,
}: {
  headline?: string
  tagline?: string
  closing?: string
  /** Height of the scroll story, in % of the window. Longer is slower. */
  length?: number
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  if (reduced || designing) return <HeroStill headline={headline} tagline={tagline} closing={closing} />
  return <HeroScroll headline={headline} tagline={tagline} closing={closing} length={length} />
}

function HeroScroll({ headline, tagline, closing, length }: { headline: string; tagline: string; closing: string; length: number }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const p = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.4 })

  // The card: inset at the bottom and rounded, opening to the full window.
  const bottom = useTransform(p, [...T.open], ["15svh", "0svh"])
  const corner = useTransform(p, [T.open[0], T.open[1], T.lift[0], T.lift[1]], [44, 0, 0, 44])
  const lift = useTransform(p, [...T.lift], ["0%", "-100%"])
  const radius = useMotionTemplate`0 0 ${corner}px ${corner}px`

  const headlineOpacity = useTransform(p, [0.02, 0.08], [1, 0])
  const headlineY = useTransform(p, [0, 0.1], [0, -40])
  const taglineOpacity = useTransform(p, [0, 0.05], [1, 0])

  // Sky → paper, and the closing line growing into a headline.
  const c = useTokens(["sky", "page", "ink"])
  const ground = useTransform(p, [...T.settle], [c.sky, c.page])
  const ink = useTransform(p, [...T.settle], [c.page, c.ink])
  const closingScale = useTransform(p, [T.lift[0], T.settle[1]], [0.5, 1])
  const closingY = useTransform(p, [T.lift[0], T.settle[0], T.settle[1]], ["30svh", "20svh", "0svh"])

  const [scene, setScene] = useState(0)
  useMotionValueEvent(p, "change", (v) => setScene(v < T.swap1[1] - 0.03 ? 0 : v < T.swap2[1] - 0.03 ? 1 : 2))

  return (
    <section ref={ref} data-header-tone="light" className="relative" style={{ height: `${length}svh` }}>
      <motion.div style={{ backgroundColor: ground }} className="sticky top-0 h-svh overflow-hidden">
        {/* the closing line, waiting under the picture */}
        <motion.h2
          style={{ color: ink, scale: closingScale, y: closingY }}
          className="type-head absolute inset-x-0 top-[clamp(64px,9svh,96px)] origin-top px-(--spacing-gutter) text-giga whitespace-nowrap max-sm:text-[13.5vw]"
        >
          {closing}
        </motion.h2>

        {/* the tagline on the sky under the card */}
        <motion.p style={{ opacity: taglineOpacity }} className="absolute inset-x-0 bottom-[6svh] text-center text-micro text-on-sky">
          {tagline}
        </motion.p>

        <motion.div style={{ bottom, y: lift, borderRadius: radius }} className="absolute inset-x-0 top-0 overflow-hidden bg-dusk">
          {SCENES.map((s, i) => (
            <Scene key={s.photo} index={i} progress={p} photo={s.photo} position={s.position} />
          ))}
          <motion.div style={{ opacity: useTransform(p, [T.swap2[0], T.swap2[1]], [0, 1]) }} className="absolute inset-0">
            <CraftLift progress={p} />
          </motion.div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-dusk/70 via-dusk/5 to-dusk/30" />

          <motion.h1
            style={{ opacity: headlineOpacity, y: headlineY }}
            className="type-head absolute inset-x-0 bottom-[11%] px-(--spacing-gutter) text-center text-display whitespace-pre-line text-dusk-fg"
          >
            {headline}
          </motion.h1>

          <div className="absolute bottom-8 left-(--spacing-gutter) max-w-[19rem] border-l border-dusk-fg/70 pl-3 text-micro text-dusk-fg sm:bottom-10 sm:max-w-[16rem]">
            <motion.div style={{ opacity: useTransform(p, [0.08, 0.13], [0, 1]) }} className="grid">
              {SCENES.map((s, i) => (
                <p
                  key={s.photo}
                  aria-hidden={scene !== i}
                  className={cn(
                    "transition-[opacity,transform] duration-(--duration-swap) ease-(--ease-out-strong) [grid-area:1/1]",
                    scene === i ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0",
                  )}
                >
                  {s.caption}
                </p>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

/** One picture in the story: fades in on its window and drifts slowly in. */
function Scene({ index, progress, photo, position }: { index: number; progress: MotionValue<number>; photo: PhotoName; position?: string }) {
  const windows = [
    [0, 0, T.swap1[0], T.swap1[1]],
    [T.swap1[0], T.swap1[1], T.swap2[0], T.swap2[1]],
    [T.swap2[0], T.swap2[1], 1, 1],
  ][index]
  const opacity = useTransform(progress, [windows[0], windows[1]], index === 0 ? [1, 1] : [0, 1])
  const scale = useTransform(progress, [windows[0], windows[3]], [1.12, 1])
  return (
    <motion.img
      src={photos[photo].src}
      alt={photos[photo].alt}
      draggable={false}
      style={{ opacity, scale, objectPosition: position }}
      className="absolute inset-0 size-full object-cover"
      loading={index === 0 ? "eager" : "lazy"}
    />
  )
}

/** The craft rising off the roofs on the third scene, tilting to cruise as it climbs. */
function CraftLift({ progress }: { progress: MotionValue<number> }) {
  const x = useTransform(progress, [T.swap2[0], T.lift[0]], ["-8vw", "18vw"])
  const y = useTransform(progress, [T.swap2[0], T.lift[0]], ["22svh", "-6svh"])
  const rotate = useTransform(progress, [T.swap2[0], T.lift[0]], [4, -6])
  const [mode, setMode] = useState<"hover" | "cruise">("hover")
  useMotionValueEvent(progress, "change", (v) => setMode(v > (T.swap2[1] + T.lift[0]) / 2 ? "cruise" : "hover"))
  return (
    <motion.div style={{ x, y, rotate }} className="absolute top-[34%] left-1/2 w-[min(64vw,620px)] -translate-x-1/2 drop-shadow-[0_30px_40px_rgb(15_13_11/0.35)]">
      <AircraftSide mode={mode} tone="light" />
    </motion.div>
  )
}

/** The same story, still: the card, then the closing line on paper. */
function HeroStill({ headline, tagline, closing }: { headline: string; tagline: string; closing: string }) {
  const [scene, setScene] = useState(0)
  useCanvasAction("Hero scene", (next) => setScene((s) => (next === false ? 0 : (s + 1) % SCENES.length)), { on: scene > 0, group: "Hero" })
  const s = SCENES[scene]
  return (
    <section data-header-tone="light" className="bg-sky">
      <div className="relative h-[85svh] overflow-hidden rounded-b-(--radius-stage) bg-dusk">
        <img src={photos[s.photo].src} alt={photos[s.photo].alt} style={{ objectPosition: s.position }} className="absolute inset-0 size-full object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-dusk/70 via-dusk/5 to-dusk/30" />
        {scene === 2 && (
          <div className="absolute top-[30%] left-1/2 w-[min(64vw,620px)] -translate-x-1/2">
            <AircraftSide mode="cruise" spinning={false} tone="light" />
          </div>
        )}
        <h1 className="type-head absolute inset-x-0 bottom-[11%] px-(--spacing-gutter) text-center text-display whitespace-pre-line text-dusk-fg">{headline}</h1>
        <p className="absolute bottom-8 left-(--spacing-gutter) max-w-[16rem] border-l border-dusk-fg/70 pl-3 text-micro text-dusk-fg">{s.caption}</p>
      </div>
      <p className="py-[5svh] text-center text-micro text-on-sky">{tagline}</p>
      <div data-header-tone="dark" className="bg-page px-(--spacing-gutter) pt-[clamp(64px,9svh,96px)] pb-[0.2em]">
        <h2 className="type-head text-giga leading-[1] max-sm:text-[13.5vw]">{closing}</h2>
      </div>
    </section>
  )
}
