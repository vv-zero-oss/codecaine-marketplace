import { Activity, Droplet, Footprints, HeartPulse, Moon, Thermometer, Wind, type LucideIcon } from "lucide-react"
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useLayoutEffect, useRef, useState } from "react"

import { Aurora } from "@/components/motion/aurora"
import { cn } from "@/lib/utils"

const SIGNALS: { name: string; tint: string; icon: LucideIcon; value: string; unit: string; color: string; insight: string; spark: number[] }[] = [
  { name: "Heart rate", tint: "pastel-rose", icon: HeartPulse, value: "48", unit: "bpm resting", color: "var(--color-rose)", insight: "Down 4 bpm since March. Your heart is working less for the same life.", spark: [52, 51, 52, 50, 49, 50, 48] },
  { name: "HRV", tint: "pastel-sky", icon: Activity, value: "62", unit: "ms", color: "var(--color-accent)", insight: "The best single read on whether today should be hard.", spark: [48, 52, 50, 56, 55, 60, 62] },
  { name: "Sleep", tint: "pastel-lilac", icon: Moon, value: "8h 30m", unit: "last night", color: "var(--color-violet)", insight: "Deep sleep is steady at 2 hours, even on the nights you ran late.", spark: [6.8, 7.2, 7.9, 6.5, 8.1, 7.7, 8.5] },
  { name: "Steps", tint: "pastel-mint", icon: Footprints, value: "11,240", unit: "today", color: "var(--color-mint)", insight: "You hit 10k on 6 of the last 7 days — a personal best week.", spark: [7, 9, 12, 8, 10, 11, 11] },
  { name: "Blood glucose", tint: "pastel-butter", icon: Droplet, value: "4.9", unit: "mmol/L fasting", color: "var(--color-amber)", insight: "In range every morning this month. Dinner timing helps.", spark: [5.2, 5.1, 5, 5.1, 4.9, 5, 4.9] },
  { name: "VO₂ max", tint: "pastel-sky", icon: Wind, value: "53.4", unit: "ml/kg/min", color: "var(--color-ocean)", insight: "Top 8% for your age, and still climbing with zone-2 volume.", spark: [49, 50, 51, 51, 52, 53, 53.4] },
  { name: "Skin temp", tint: "pastel-peach", icon: Thermometer, value: "+0.2", unit: "°C vs baseline", color: "var(--color-chart-1)", insight: "Flat. No sign of illness or a late-cycle shift.", spark: [0, 0.1, 0, 0.3, 0.1, 0.2, 0.2] },
]

function Spark({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const pts = data.map((v, i) => `${i ? "L" : "M"}${(i / (data.length - 1)) * 120} ${30 - ((v - min) / (max - min || 1)) * 26}`).join(" ")
  return <svg viewBox="0 0 120 34" className="h-9 w-full" aria-hidden="true"><path d={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function SignalCard({ s }: { s: (typeof SIGNALS)[number] }) {
  const [open, setOpen] = useState(false)
  return (
    <button onClick={() => setOpen(!open)} aria-pressed={open} className="relative flex h-[340px] w-[260px] shrink-0 flex-col justify-between overflow-hidden rounded-card p-6 text-left transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 active:scale-[0.98] data-[open=true]:shadow-card sm:w-[290px]" data-open={open} style={{ background: `linear-gradient(160deg, color-mix(in oklab, var(--color-${s.tint}) ${open ? 55 : 100}%, white), color-mix(in oklab, var(--color-${s.tint}) ${open ? 30 : 55}%, white))` }}>
      <span className="flex items-center gap-2 text-sm font-medium text-ink-2"><span className="grid size-9 place-items-center rounded-xl bg-paper shadow-chip"><s.icon className="size-4" style={{ color: s.color }} /></span>{s.name}</span>
      <span className={cn("transition-[opacity,transform] duration-300 ease-out", open ? "pointer-events-none absolute opacity-0" : "")}>
        <span className="block text-[44px] leading-none font-semibold tracking-tight tabular-nums">{s.value}</span>
        <span className="mt-1 block text-sm text-ink-3">{s.unit}</span>
        <Spark data={s.spark} color={s.color} />
      </span>
      <span className={cn("text-[17px] leading-snug font-medium tracking-tight transition-[opacity,transform] duration-300 ease-out", open ? "translate-y-0 opacity-100" : "pointer-events-none absolute translate-y-3 opacity-0")}>{s.insight}</span>
      <span className="text-xs text-ink-3">{open ? "Tap to flip back" : "Tap for what it means"}</span>
    </button>
  )
}

/** Vertical scroll drives a horizontal ribbon: the section pins, the cards slide past, every card flips on tap. */
export function Signals() {
  const ref = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [max, setMax] = useState(0)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const maxX = useMotionValue(0)
  const x = useTransform([scrollYProgress, maxX], ([p, m]: number[]) => -p * m)
  useLayoutEffect(() => {
    const measure = () => {
      const m = Math.max(0, (track.current?.scrollWidth ?? 0) - window.innerWidth + 40)
      setMax(m)
      maxX.set(m)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [maxX])
  const sticky = !reduced && max > 0

  return (
    <section ref={ref} id="signals" className="relative mt-24 sm:mt-32" style={{ height: sticky ? `${Math.max(180, 100 + max / 6)}vh` : "auto" }}>
      <div className={cn("relative flex flex-col justify-center overflow-hidden", sticky ? "sticky top-0 h-screen" : "py-8")}>
        <Aurora tone="peach" intensity={0.75} />
        <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8">
          <h2 className="display text-[clamp(2rem,5vw,3.25rem)]">Seven signals, one answer</h2>
          <p className="mt-3 max-w-md text-ink-2">Meridian reads all of these together. Tap a card to see what it tells you on its own.</p>
        </div>
        <motion.div ref={track} style={{ x: sticky ? x : 0 }} className={cn("mt-10 flex w-max gap-4 px-5 sm:px-[max(2rem,calc((100vw-1120px)/2+2rem))]", !sticky && "overflow-x-auto")}>
          {SIGNALS.map((s) => <SignalCard key={s.name} s={s} />)}
        </motion.div>
        <div className="mx-auto mt-8 h-1 w-40 overflow-hidden rounded-full bg-line" aria-hidden="true"><motion.div className="h-full origin-left rounded-full bg-ink" style={{ scaleX: scrollYProgress }} /></div>
      </div>
    </section>
  )
}
