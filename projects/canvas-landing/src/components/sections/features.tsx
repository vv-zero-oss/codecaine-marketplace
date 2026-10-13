import { useEffect, useRef, useState, type ReactNode } from "react"
import { animate, motion, useInView, useReducedMotion } from "motion/react"
import { Frame, Image as ImageIcon, MousePointer2, PenTool, Type, Square, ArrowUp, X, Layers } from "lucide-react"

import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

/** The curve every entrance on this page shares: out, strongly. */
const EASE = [0.23, 1, 0.32, 1] as const
const ACCENT = "#0099ff"

/**
 * A looping storyboard: the step number advances every `ms` while the card is
 * on screen. Reduced motion holds the last step, which is each scene's result.
 */
function useSteps(count: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" })
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (reduced) return setStep(count - 1)
    if (!inView) return
    const id = window.setInterval(() => setStep((s) => (s + 1) % count), ms)
    return () => window.clearInterval(id)
  }, [count, ms, inView, reduced])
  return { ref, step }
}

/** `text`, typed out while `on` is true and cleared when it is not. */
function useTyped(text: string, on: boolean, cps = 28) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!on) return setN(0)
    setN(0)
    const id = window.setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), 1000 / cps)
    return () => window.clearInterval(id)
  }, [on, text, cps])
  return text.slice(0, n)
}

/** A small floating panel in the editor's own look: white, hairline, soft shadow. */
function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn("rounded-2xl bg-white text-[12px] text-ink shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]", className)}
    >
      {children}
    </div>
  )
}

/* 1 — a toolbar, a frame drawn, words typed into it */
function Build() {
  const { ref, step } = useSteps(4, 1500)
  const tools = [MousePointer2, Frame, Square, Type, ImageIcon, PenTool]
  const active = step === 0 ? 0 : step === 1 ? 1 : 3
  const text = useTyped("People who make things by hand.", step >= 2, 34)
  return (
    <div ref={ref} className="flex flex-col items-center gap-6 pt-2">
      <Panel className="flex items-center gap-1 rounded-full p-1.5">
        {tools.map((Icon, i) => (
          <span
            key={i}
            className={cn(
              "grid size-8 place-items-center rounded-full transition-colors duration-200",
              i === active ? "text-white" : "text-ink-2",
            )}
            style={i === active ? { background: ACCENT } : undefined}
          >
            <Icon className="size-[15px]" strokeWidth={1.8} />
          </span>
        ))}
      </Panel>
      <div className="relative h-[170px] w-[250px]">
        <motion.div
          className="absolute inset-0 origin-top-left rounded-[10px] bg-[#f6efe0] shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
          animate={{ scaleX: step === 0 ? 0.04 : 1, scaleY: step === 0 ? 0.04 : 1, opacity: step === 0 ? 0.6 : 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ outline: step === 1 ? `1.5px solid ${ACCENT}` : "none" }}
        />
        <p className="absolute inset-0 p-5 font-serif text-[25px] leading-[1.08] tracking-[-0.01em] text-[#2a2118]">
          {text}
          {step >= 2 && <span className="ml-px inline-block h-[0.9em] w-[2px] translate-y-[2px] animate-pulse" style={{ background: ACCENT }} />}
        </p>
      </div>
    </div>
  )
}

/* 2 — the Gap field, and a row of layers that follows the number */
function Layout() {
  const { ref, step } = useSteps(4, 1400)
  const gap = [8, 8, 18, 18][step]
  const [shown, setShown] = useState(gap)
  useEffect(() => {
    const c = animate(shown, gap, { duration: 0.6, ease: EASE, onUpdate: setShown })
    return () => c.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gap])
  const items = ["Stories", "Volumes", "About", "Index", "Shop"]
  return (
    <div ref={ref} className="flex flex-col items-center gap-9 pt-2">
      <Panel className="flex items-center gap-3 px-3 py-2.5">
        <span className="text-ink-2">Gap</span>
        <span
          className="flex h-8 w-[88px] items-center rounded-lg bg-surface px-2.5 tabular-nums"
          style={{ outline: step >= 1 ? `1.5px solid ${ACCENT}` : "none" }}
        >
          {Math.round(shown)}
        </span>
        <span className="rounded-md bg-surface px-2 py-1 text-[11px] text-ink-2">⇧A</span>
      </Panel>
      <div className="flex items-center" style={{ gap: shown }}>
        {items.map((label) => (
          <span key={label} className="rounded-md bg-white px-2.5 py-1.5 text-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

/* 3 — a prompt in the bubble, the layer held, then the page turning */
function Ask() {
  const { ref, step } = useSteps(4, 1700)
  const text = useTyped("Make this a flip book on scroll", step === 0, 24)
  const open = step >= 2
  return (
    <div ref={ref} className="flex flex-col items-center gap-5 pt-2">
      <div className="flex h-11 w-[300px] items-center gap-2 rounded-full bg-[#161616] px-3 text-[12px] text-white shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
        <span className="flex items-center gap-1 rounded-full bg-white/10 py-0.5 pr-1.5 pl-2 text-[11px]">
          <Layers className="size-3" /> Volume section <X className="size-3 opacity-60" />
        </span>
        <span className="min-w-0 flex-1 truncate text-white/80">{text || (step === 0 ? "" : "Make this a flip book on scroll")}</span>
        <span className="grid size-6 place-items-center rounded-full bg-white text-ink">
          <ArrowUp className="size-3.5" />
        </span>
      </div>
      <div className="relative h-[150px] w-[210px] [perspective:900px]">
        <div
          className="absolute inset-0 rounded-[6px] bg-[#f6efe0] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
          style={{ outline: step === 1 ? `1.5px dashed ${ACCENT}` : "none", outlineOffset: 4 }}
        >
          <div className="absolute inset-y-3 right-3 left-1/2 rounded-[3px] bg-[#c9a77c]/50" />
        </div>
        <motion.div
          className="absolute inset-y-0 left-1/2 w-1/2 origin-left rounded-r-[6px] bg-[#1f3a2e] p-3 text-white [backface-visibility:hidden]"
          animate={{ rotateY: open ? -170 : 0 }}
          transition={{ duration: 1.1, ease: EASE }}
          style={{ left: "0%", width: "100%", transformOrigin: "left center" }}
        >
          <p className="mt-10 font-serif text-[18px] leading-[1.05]">
            Salt &amp;
            <br />
            Timber
          </p>
        </motion.div>
      </div>
    </div>
  )
}

/* 4 — Preview pressed, a pinned scene scrubbed by scroll */
function Scroll() {
  const { ref, step } = useSteps(2, 3600)
  const [p, setP] = useState(0)
  useEffect(() => {
    if (step === 0) return setP(0)
    const c = animate(0, 1, { duration: 2.8, ease: [0.45, 0, 0.25, 1], onUpdate: setP })
    return () => c.stop()
  }, [step])
  return (
    <div ref={ref} className="flex flex-col items-center gap-5 pt-2">
      <Panel className="flex items-center gap-2 rounded-full p-1.5 pl-4">
        <span className="text-ink-2">Volume section</span>
        <span
          className="rounded-full px-3 py-1.5 text-white transition-transform duration-150"
          style={{ background: "#161616", transform: step === 0 && p === 0 ? "scale(1)" : "scale(0.96)" }}
        >
          Preview
        </span>
      </Panel>
      <div className="relative h-[170px] w-[250px] overflow-hidden rounded-[10px] bg-[#f6efe0] shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
        <div
          className="absolute inset-y-0 left-0 w-1/2 p-4"
          style={{ transform: `translateY(${(1 - p) * 40}px)`, opacity: 0.25 + p * 0.75 }}
        >
          <p className="font-serif text-[20px] leading-[1.05] text-[#2a2118]">Volume one</p>
        </div>
        <div
          className="absolute top-3 right-3 bottom-3 overflow-hidden rounded-[6px] bg-[#8a6a4a]"
          style={{ width: `${34 + p * 14}%` }}
        />
        <div className="absolute top-3 right-1 bottom-3 w-[3px] rounded-full bg-black/10">
          <div className="w-full rounded-full bg-ink" style={{ height: `${20 + p * 50}%`, marginTop: `${p * 30}%` }} />
        </div>
      </div>
    </div>
  )
}

/* 5 — one switch, and what it does to everything that moves */
function Motion() {
  const { ref, step } = useSteps(3, 2200)
  const modes = ["Stop", "Reduced", "Playing"]
  const mode = [2, 1, 0][step]
  const labels = modes.map((m, i) => ({ m, active: i === mode }))
  return (
    <div ref={ref} className="flex flex-col items-center gap-8 pt-2">
      <Panel className="flex items-center gap-1 rounded-full p-1">
        {labels.map(({ m, active }) => (
          <span
            key={m}
            className={cn("rounded-full px-3.5 py-1.5 transition-colors duration-200", active ? "bg-surface-2 font-medium" : "text-ink-2")}
          >
            {m === "Stop" ? "Stop" : m}
          </span>
        ))}
      </Panel>
      <div className="relative h-[110px] w-[260px]">
        <div className="absolute inset-x-0 top-1/2 h-px bg-black/10" />
        <motion.span
          key={mode}
          className="absolute top-1/2 left-0 -mt-[18px] size-9 rounded-full"
          style={{ background: ACCENT }}
          initial={{ x: 0, opacity: 1 }}
          animate={
            mode === 2
              ? { x: [0, 224, 0], rotate: [0, 180, 360] }
              : mode === 1
                ? { x: 112, opacity: [1, 0.35, 1] }
                : { x: 112 }
          }
          transition={
            mode === 2
              ? { duration: 2.2, ease: "easeInOut" }
              : mode === 1
                ? { duration: 2.2, ease: "easeInOut" }
                : { duration: 0.3 }
          }
        />
        <span className="absolute inset-x-0 bottom-0 text-center text-[11px] text-ink-2">
          {mode === 2 ? "Everything moving" : mode === 1 ? "Fades only" : "Held for styling"}
        </span>
      </div>
    </div>
  )
}

/* 6 — a section arrives in someone else's styles, one toggle, and it is ours */
function Brand() {
  const { ref, step } = useSteps(4, 1500)
  const on = step >= 2
  return (
    <div ref={ref} className="flex flex-col items-center gap-6 pt-2">
      <Panel className="flex items-center gap-3 rounded-full py-2 pr-2 pl-4">
        <span>Use project styles only</span>
        <span
          className="relative h-6 w-10 rounded-full transition-colors duration-300"
          style={{ background: on ? ACCENT : "#d8d8d8" }}
        >
          <span
            className="absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-300"
            style={{ transform: on ? "translateX(16px)" : "translateX(0)" }}
          />
        </span>
      </Panel>
      <div
        className="w-[210px] rounded-[14px] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-[background-color,border-radius] duration-500"
        style={{ background: on ? "#eef7f3" : "#ffffff", borderRadius: on ? 6 : 16 }}
      >
        <p
          className="text-[20px] leading-[1.05] transition-all duration-500"
          style={{ fontFamily: on ? "Georgia, serif" : "inherit", fontWeight: on ? 400 : 700, color: on ? "#1f3a2e" : "#111" }}
        >
          Pricing
          <br />
          that scales
        </p>
        <span
          className="mt-6 inline-block px-3 py-1.5 text-[11px] text-white transition-all duration-500"
          style={{ background: on ? "#1f6b55" : "#2d5bff", borderRadius: on ? 3 : 999 }}
        >
          Get started
        </span>
      </div>
    </div>
  )
}

type Feature = { title: string; body: string; Visual: () => ReactNode }

const FEATURES: Feature[] = [
  {
    title: "Start from nothing",
    body: "Draw frames, type words, drop photographs. Every layer is real markup with a real tag, so what you build is already a page, not a picture of one.",
    Visual: Build,
  },
  {
    title: "Layout that reads your design",
    body: "Select a pile of layers, press ⇧A, and they become a row with the gap they already had. Change the number and everything follows.",
    Visual: Layout,
  },
  {
    title: "Ask from the bubble",
    body: "Select anything and say what you want. The layer is held while the assistant works, so you can see what it is touching and what it is not.",
    Visual: Ask,
  },
  {
    title: "Scroll scenes you can preview",
    body: "Open any frame as a page. Pinned sections, scrubbed motion, a cover that opens and pages that turn, played back before it ships.",
    Visual: Scroll,
  },
  {
    title: "Design it standing still",
    body: "One switch stops, reduces or plays everything that moves on the page. Stop it to style it, reduce it to check it, play it to love it.",
    Visual: Motion,
  },
  {
    title: "Stay on brand",
    body: "Bring a section into a project and keep it on that project's own styles with one toggle. Nothing arrives wearing somebody else's colours.",
    Visual: Brand,
  },
]

/** One card: a small centred label, then the control and its result on the card itself. */
function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const reduced = useReducedMotion()
  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, transform: "translateY(16px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay: 0.06 * (index % 3), ease: EASE }}
      className="flex h-[400px] flex-col overflow-hidden rounded-card bg-surface"
    >
      <h3 className="px-6 pt-6 text-center text-[14px] leading-tight font-medium tracking-[-0.005em] text-ink">{feature.title}</h3>
      <p className="sr-only">{feature.body}</p>
      <div className="flex flex-1 items-center justify-center" aria-hidden>
        <feature.Visual />
      </div>
    </motion.article>
  )
}

/** Six things the editor does, each shown as the control and what it makes, drawn live on the card. */
export function Features() {
  return (
    <section id="features" className="py-[clamp(64px,9vw,140px)]">
      <Container className="max-w-none px-[clamp(16px,4.6vw,80px)]">
        <h2 className="mx-auto max-w-[18ch] text-balance text-center text-[clamp(30px,4.2vw,64px)] leading-[1.06] font-semibold tracking-[-0.04em] text-ink">
          Everything you'd do to a page, on one canvas.
        </h2>
        <div className="mx-auto mt-[clamp(32px,5vw,72px)] grid max-w-[1180px] gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
