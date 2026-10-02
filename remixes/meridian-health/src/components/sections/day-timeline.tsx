import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react"
import { useRef, useState } from "react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { Aurora } from "@/components/motion/aurora"
import { PhoneFrame } from "@/components/device/phone-frame"
import { DAY, DayScreen } from "@/components/screens/day"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

/**
 * A day with Meridian, pinned. The phone stays put while the page scrolls past it;
 * scroll progress picks the hour, the captions change with it, and the chips in the phone jump to any hour.
 */
export function DayTimeline({ stepHeight = 85 }: { stepHeight?: number }) {
  const ref = useRef<HTMLElement>(null)
  const [step, setStep] = useState(0)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  useMotionValueEvent(scrollYProgress, "change", (v) => setStep(Math.min(DAY.length - 1, Math.max(0, Math.floor(v * DAY.length * 0.999)))))
  useCanvasAction("Day timeline: next hour", () => setStep((s) => (s + 1) % DAY.length), { group: "Day timeline" })

  const jump = (i: number) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + ((i + 0.5) / DAY.length) * (el.offsetHeight - window.innerHeight), behavior: reduced ? "auto" : "smooth" })
  }
  const pinned = !designing

  return (
    <section ref={ref} id="day" className="relative mt-24 sm:mt-32" style={{ height: pinned ? `${DAY.length * stepHeight + 15}vh` : "auto" }}>
      <div className={cn("relative flex items-center overflow-hidden", pinned ? "sticky top-0 h-screen pt-16 lg:pt-0" : "py-10")}>
        <Aurora tone="mint" intensity={0.95} />
        <Container className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-24">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-medium tracking-widest text-ink-3 uppercase">A day with Meridian</p>
            <div className="relative mt-4 min-h-[210px] sm:min-h-[230px]">
              {DAY.map((d, i) => (
                <div key={d.time} aria-hidden={i !== step} className={cn("absolute inset-0 transition-[opacity,transform] duration-500 ease-out", i === step ? "translate-y-0 opacity-100" : i < step ? "-translate-y-4 opacity-0" : "translate-y-4 opacity-0")}>
                  <div className="flex items-center gap-2 text-sm font-medium tabular-nums" style={{ color: d.color }}><d.icon className="size-4" /> {d.time}</div>
                  <h2 className="display mt-2 text-[clamp(2rem,5vw,3.5rem)]">{d.title}</h2>
                  <p className="mt-3 max-w-md text-ink-2">{d.body}</p>
                </div>
              ))}
            </div>
            {/* progress, tied to the scroll */}
            <div className="mt-6 flex max-w-md items-center gap-2" role="tablist" aria-label="Hours">
              {DAY.map((d, i) => (
                <button key={d.time} role="tab" aria-selected={i === step} aria-label={d.time} onClick={() => jump(i)} className="group h-11 flex-1">
                  <span className="relative block h-1 overflow-hidden rounded-full bg-line">
                    <motion.span className="absolute inset-0 origin-left rounded-full bg-ink" initial={false} animate={{ scaleX: i <= step ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.5, ease: [0.23, 1, 0.32, 1] }} />
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="relative order-1 mx-auto w-[min(200px,44vw)] sm:w-[min(230px,52vw)] lg:order-2 lg:w-[290px]">
            <span aria-hidden="true" className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,var(--color-pastel-peach),var(--color-pastel-lilac)_55%,transparent)] blur-2xl" />
            <PhoneFrame tone="titanium"><DayScreen step={step} onStep={jump} /></PhoneFrame>
          </div>
        </Container>
      </div>
    </section>
  )
}
