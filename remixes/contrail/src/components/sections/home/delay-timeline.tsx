import { useLayoutEffect, useRef, useState } from "react"
import { CloudLightning, Eye, Plane, Radio, Smartphone } from "lucide-react"
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const STEPS = [
  { when: "T – 25 h", title: "We find your plane.", body: "Tomorrow's 7:35 pm to Lisbon will be flown by the aircraft now parked in Denver. We start watching it.", Icon: Eye, tone: "text-night-2fg", them: "Board: On time" },
  { when: "T – 6 h", title: "Storms over Denver.", body: "The forecast puts a line of thunderstorms over the plane's departure airport right when it's due to leave.", Icon: CloudLightning, tone: "text-amber", them: "Board: On time" },
  { when: "T – 3 h 20", title: "The tower holds it.", body: "Air traffic control issues a ground delay: departures from Denver held for 40 minutes.", Icon: Radio, tone: "text-amber", them: "Board: On time" },
  { when: "T – 3 h 10", title: "You hear from us.", body: "“Likely 30 min late.” Time to finish dinner — or rebook onto the earlier flight while seats are still there.", Icon: Smartphone, tone: "text-red-bright", them: "Board: On time" },
  { when: "T – 45 min", title: "The airline catches up.", body: "The departure board finally changes to 8:05 pm. You're already relaxed about it.", Icon: Plane, tone: "text-green-bright", them: "Board: Delayed 8:05" },
]

/**
 * A delay, seen coming: the section pins and the timeline slides sideways as
 * you scroll, a plane riding the line from T–25h to the moment the airline
 * says anything. Below `md` it stacks as a plain list.
 */
export function DelayTimeline({ length = 260 }: { /** Viewport heights of scroll the pin holds for. */ length?: number }) {
  const track = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const row = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  // How far the row must travel for its last card to finish at the right edge.
  useLayoutEffect(() => {
    const el = row.current
    if (!el) return
    const measure = () => setDistance(Math.max(0, el.scrollWidth - el.clientWidth + 48))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance])
  const plane = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"])
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(Math.min(STEPS.length - 1, Math.max(0, Math.floor(((p - 0.05) / 0.9) * STEPS.length)))))
  const pinned = !reduced && !designing

  const heading = (
    <div>
      <p className="type-eyebrow text-violet-glow">How a prediction works</p>
      <h2 className="type-display mt-4 max-w-[16ch] text-h1 text-balance text-night-fg">A delay, three hours before it's news.</h2>
    </div>
  )

  const step = (s: (typeof STEPS)[number], i: number, on: boolean) => (
    <article
      key={s.when}
      className={cn(
        "flex w-full shrink-0 flex-col rounded-(--radius-panel) bg-night-2 p-7 shadow-(--shadow-night) transition-[opacity,background-color] duration-(--duration-phase) md:w-[380px]",
        on ? "opacity-100" : "md:opacity-45",
        i === 3 && "bg-[linear-gradient(160deg,var(--color-violet-deep),var(--color-night-2))]",
      )}
    >
      <p className="flex items-center justify-between font-mono text-[13px] text-night-muted">
        {s.when}
        <span className={cn("rounded-full bg-night px-2.5 py-1 text-[12px]", i === 4 ? "text-green-bright" : "text-night-muted")}>{s.them}</span>
      </p>
      <s.Icon className={cn("mt-10 size-7", s.tone)} strokeWidth={1.6} />
      <h3 className="mt-4 text-h4 font-semibold text-night-fg">{s.title}</h3>
      <p className="mt-2 text-night-2fg">{s.body}</p>
    </article>
  )

  return (
    <section id="delays" data-theme="night" className="bg-night">
      {/* below md, and whenever motion should keep still: a list */}
      <Container className={cn("pb-section", pinned && "md:hidden")}>
        {heading}
        <div className="mt-10 flex flex-col gap-4">{STEPS.map((s, i) => step(s, i, true))}</div>
      </Container>

      {pinned ? (
        <div ref={track} className="relative hidden md:block" style={{ height: `${length}vh` }}>
          <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
            <Container>{heading}</Container>
            <div className="mt-12 pl-[max(32px,calc((100vw-1080px)/2+32px))]">
              <div className="relative mb-8 h-px w-[min(1016px,calc(100vw-64px))] bg-night-line">
                <motion.div className="absolute inset-y-0 left-0 bg-violet-glow" style={{ width: plane }} />
                <motion.div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: plane }}>
                  <span className="grid size-8 place-items-center rounded-full bg-violet-bright text-white shadow-[0_0_24px_rgb(139_92_255/0.6)]">
                    <Plane className="size-4" />
                  </span>
                </motion.div>
              </div>
              <motion.div ref={row} className="flex gap-5" style={{ x }}>
                {STEPS.map((s, i) => step(s, i, i <= active))}
              </motion.div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
