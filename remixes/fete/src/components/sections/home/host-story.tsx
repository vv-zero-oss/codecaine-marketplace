import { useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { Phone } from "@/components/mock/phone"
import { ScreenCheckIn, ScreenCreate, ScreenInvite, ScreenRecap } from "@/components/mock/story-screens"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const STEPS = [
  {
    title: "Make a page in a minute.",
    body: "Pick a poster, name the night, set a time and a place. The page is ready before your coffee is.",
    Screen: ScreenCreate,
    dark: false,
  },
  {
    title: "Invite the right people.",
    body: "Share one link or send to your list. RSVPs, plus-ones and the waitlist look after themselves.",
    Screen: ScreenInvite,
    dark: false,
  },
  {
    title: "Open the doors.",
    body: "Scan tickets from any phone. Every door sees the same list, live, so nobody waits in the cold.",
    Screen: ScreenCheckIn,
    dark: true,
  },
  {
    title: "Keep the glow.",
    body: "Photos, a thank-you and the next date go out the next morning — and a crowd becomes a community.",
    Screen: ScreenRecap,
    dark: false,
  },
]

/**
 * How hosting goes, told on a pinned phone. The section is four screens
 * tall; the stage stays put while the page scrolls under it, and the scroll
 * drives the phone — the title types as you go, the guest list fills, the
 * check-in count climbs, the photos arrive. Scroll back and it rewinds.
 *
 * In the editor, each step is a switch on the Actions row, and the scroll
 * is not needed to reach any of them.
 */
export function HostStory({ steps = 4 }: { /** How many of the four steps to tell. */ steps?: number }) {
  const ref = useRef<HTMLElement>(null)
  const list = STEPS.slice(0, Math.max(1, Math.min(4, steps)))
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const [progress, setProgress] = useState(0)
  const [pinned, setPinned] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (Math.abs(v - progress) > 0.002 || v === 0 || v === 1) setProgress(v)
  })

  list.forEach((s, i) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- a fixed list
    useCanvasAction(`Step ${i + 1}: ${s.title.replace(/\.$/, "")}`, (next) => setPinned((next ?? pinned !== i) ? i : null), {
      on: pinned === i,
      group: "Hosting story",
    })
  })

  const whole = progress * list.length
  const auto = Math.min(list.length - 1, Math.floor(whole))
  const index = pinned ?? auto
  // Inside a step: 0 → 1. A pinned step shows its finished state.
  const local = pinned !== null || designing || reduced ? 1 : Math.min(1, Math.max(0, (whole - index) * 1.15))
  const step = list[index]

  return (
    <section ref={ref} id="how" className="relative" style={{ height: `${list.length * 100 + 40}svh` }}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <Container className="grid h-full max-w-[1180px] grid-rows-[auto_1fr] items-center gap-6 pt-20 pb-6 md:grid-cols-[1.1fr_0.9fr] md:grid-rows-1 md:gap-12 md:py-0">
          <div className="relative">
            <p className="type-eyebrow text-berry">How hosting goes</p>
            {/* the rail: one segment per step, filling as you scroll */}
            <ol className="mt-5 flex gap-1.5" aria-label="Steps">
              {list.map((s, i) => (
                <li key={s.title} className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                  <span
                    className="block h-full origin-left rounded-full bg-ink"
                    style={{ transform: `scaleX(${i < index ? 1 : i === index ? local : 0})` }}
                  />
                  <span className="sr-only">{s.title}</span>
                </li>
              ))}
            </ol>
            <div className="relative mt-6 min-h-[200px] md:mt-10 md:min-h-[360px]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={index}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -20, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                >
                  <p className="font-mono text-[13px] text-ink-4 tabular-nums">
                    {String(index + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
                  </p>
                  <h2 className="type-head mt-3 max-w-[11ch] text-[clamp(41.89px,7.4vw,109.66px)] leading-[0.92] tracking-[-0.052em] text-ink">{step.title}</h2>
                  <p className="mt-5 max-w-[38ch] text-[17px] leading-relaxed text-ink-3 md:mt-7 md:text-lead">{step.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative flex h-full min-h-0 items-center justify-center md:h-[min(84svh,760px)]">
            {/* a soft flare halo behind the phone */}
            <div aria-hidden className="absolute top-1/2 left-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--color-berry-soft)_0%,transparent_70%)]" />
            <Phone dark={step.dark} className="relative h-full max-h-[min(54svh,760px)] w-auto transition-colors duration-(--duration-swap) md:max-h-full">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  className="h-full"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                >
                  <step.Screen t={local} />
                </motion.div>
              </AnimatePresence>
            </Phone>
          </div>
        </Container>
      </div>
      <span className={cn("sr-only")}>{list.map((s) => `${s.title} ${s.body}`).join(" ")}</span>
    </section>
  )
}
