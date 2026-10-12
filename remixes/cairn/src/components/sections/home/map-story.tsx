import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react"
import { Check, Copy, Link2, Sparkles } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { CityMap } from "@/components/map/city-map"
import { BrowserFrame, SkyPanel } from "@/components/map/frames"
import { THEMES, type MapTheme } from "@/components/map/map-base"
import { GuidePanel } from "@/components/map/map-guide"
import { Typewriter } from "@/components/motion/typewriter"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { placesById } from "@/content/places"
import { pexels, SKIES } from "@/lib/photos"
import { cn } from "@/lib/utils"

const PROMPT = "Slow mornings in the Lantern Quarter — coffee, books, a gallery"
const PLACES = placesById(["ferrol", "pilot", "second-shelf", "room-eleven", "noodle", "night-market"])
const STEP_THEME: MapTheme[] = ["paper", "paper", "harbour", "harbour"]

const STEPS = [
  { title: "Ask for it.", body: "Say what you're mapping in plain words. Cairn reads it the way a local would — the neighbourhood, the hour, the mood — and pins what fits." },
  { title: "Watch it fill in.", body: "Every place arrives with a photo, a line of description and its opening times, sorted into a guide your reader can scroll." },
  { title: "Make it yours.", body: "Pick a map style, choose photo or icon pins, rename anything. Every change shows on the map the moment you make it." },
  { title: "Send it anywhere.", body: "Share a link, or paste one line of code into your site, Notion or newsletter. Edit the map later and every copy updates." },
]

/**
 * How a map gets made, told by scrolling. On a wide screen the studio window
 * stays pinned while the four steps scroll past beside it, and each step
 * plays on the window: the prompt types itself and the pins fall, the guide
 * slides in, the style changes, the share card opens. On a phone the steps
 * stack, each with its own window.
 */
export function MapStory() {
  const track = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 55%", "end 70%"] })
  useMotionValueEvent(scrollYProgress, "change", (v) => setStep(Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length)))))

  const goTo = (i: number) => {
    const el = track.current?.querySelector<HTMLElement>(`[data-step="${i}"]`)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.3 })
    setStep(i)
  }
  STEPS.forEach((s, i) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCanvasAction(`Story: ${s.title.replace(".", "")}`, () => goTo(i), { on: step === i, group: "How it works" })
  })

  return (
    <section id="how" className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <Reveal className="mx-auto flex max-w-[1080px] flex-col gap-5">
          <p className="type-eyebrow text-accent-ink">How a map gets made</p>
          <h2 className="type-serif max-w-[13ch] text-display text-ink">From one sentence to a map.</h2>
        </Reveal>

        {/* wide: pinned window, scrolling steps */}
        <div ref={track} className="mx-auto mt-12 hidden max-w-[1080px] grid-cols-[1.35fr_1fr] gap-16 lg:grid">
          <div className="relative">
            <div className="sticky top-[104px] flex h-[calc(100svh-136px)] max-h-[680px] flex-col">
              <SkyPanel photo={pexels(SKIES.blush, 1200, 1000)} className="flex min-h-0 flex-1 items-center justify-center p-8">
                <StoryStage step={step} className="h-full max-h-[560px] w-full" />
              </SkyPanel>
              <StepRail step={step} onPick={goTo} className="mt-5" />
            </div>
          </div>
          <ol>
            {STEPS.map((s, i) => (
              <li key={s.title} data-step={i} className="flex min-h-[78svh] items-center first:min-h-[60svh] first:items-start first:pt-[12svh] last:min-h-[70svh]">
                <div className={cn("transition-opacity duration-(--duration-scene) ease-(--ease-out-strong)", step === i ? "opacity-100" : "opacity-30")}>
                  <p className="font-mono text-[13px] text-ink-3 tabular-nums">0{i + 1}</p>
                  <h3 className="type-serif mt-3 text-h2 text-ink">{s.title}</h3>
                  <p className="mt-5 max-w-[32ch] text-lead text-ink-3">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* narrow: each step with its own window */}
        <ol className="mt-10 flex flex-col gap-16 lg:hidden">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <Reveal>
                <p className="font-mono text-[13px] text-ink-3 tabular-nums">0{i + 1}</p>
                <h3 className="type-serif mt-2 text-h3 text-ink">{s.title}</h3>
                <p className="mt-3 max-w-[38ch] text-body text-ink-3">{s.body}</p>
              </Reveal>
              <Reveal delay={0.06} className="mt-6">
                <SkyPanel photo={pexels(SKIES.blush, 900, 800)} className="p-4 sm:p-6">
                  <StoryStage step={i} className="aspect-[4/3.6] w-full sm:aspect-[4/3]" />
                </SkyPanel>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

function StepRail({ step, onPick, className }: { step: number; onPick: (i: number) => void; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {STEPS.map((s, i) => (
        <button
          key={s.title}
          type="button"
          onClick={() => onPick(i)}
          aria-label={`Step ${i + 1}: ${s.title}`}
          aria-current={step === i ? "step" : undefined}
          className="group flex h-8 flex-1 items-center"
        >
          <span className="relative h-[3px] w-full overflow-hidden rounded-full bg-line-strong">
            <span
              className={cn(
                "absolute inset-0 origin-left rounded-full bg-ink transition-transform duration-(--duration-scene) ease-(--ease-out-strong)",
                i <= step ? "scale-x-100" : "scale-x-0 group-hover:scale-x-[0.18]",
              )}
            />
          </span>
        </button>
      ))}
    </div>
  )
}

/**
 * The studio window at one step of the story. `step` is a plain number, so
 * the editor can hold it on any step.
 */
export function StoryStage({ step = 0, className }: { step?: number; className?: string }) {
  const reduced = useReducedMotion()
  const [typed, setTyped] = useState(step > 0)
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (step > 0) setTyped(true)
  }, [step])
  useEffect(() => {
    if (step !== 3) return setCopied(false)
    const t = window.setTimeout(() => setCopied(true), 900)
    return () => window.clearTimeout(t)
  }, [step])

  const theme = STEP_THEME[step] ?? "paper"
  const pins = typed ? PLACES : []
  const fade = reduced ? { duration: 0 } : { type: "spring" as const, stiffness: 300, damping: 32 }

  return (
    <BrowserFrame url="cairn.page/studio" className={className} bodyClassName="overflow-hidden">
      <CityMap
        places={pins}
        theme={theme}
        pinStyle={step >= 2 ? "photo" : "dot"}
        zoom={step >= 1 ? 1.75 : 1.45}
        centerX={step >= 1 ? 520 : 590}
        centerY={290}
        interactive={false}
        controls={false}
        showCard={false}
        className="absolute inset-0"
      />

      {/* the prompt */}
      <motion.div
        layout
        transition={fade}
        className={cn(
          "absolute z-20 flex items-center gap-2 rounded-[10px] bg-raised px-3 shadow-(--shadow-float)",
          step === 0 ? "inset-x-[8%] top-[38%] h-12" : "top-3 right-3 left-[46%] h-9",
        )}
      >
        <Sparkles className="size-4 shrink-0 text-accent" />
        <p className={cn("min-w-0 truncate text-ink", step === 0 ? "text-[14px]" : "text-[11.5px] text-ink-3")}>
          {step === 0 ? <Typewriter text={PROMPT} playing onDone={() => setTyped(true)} speed={40} /> : PROMPT}
        </p>
        {step === 0 ? (
          <span className="ml-auto grid size-7 shrink-0 place-items-center rounded-[7px] bg-accent text-white">
            <Sparkles className="size-3.5" />
          </span>
        ) : null}
      </motion.div>

      {/* the guide */}
      <AnimatePresence>
        {step >= 1 ? (
          <motion.div
            key="guide"
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: -24 }}
            transition={fade}
            className="absolute top-3 bottom-3 left-3 z-20 w-[40%] max-w-[220px]"
          >
            <GuidePanel
              heading="Slow mornings, Lantern Quarter"
              intro="Coffee first, then books, then a long look at something on a wall."
              cover={39784928}
              places={PLACES}
              selectedId={step >= 2 ? "ferrol" : null}
              onSelect={() => {}}
              search={false}
              compact
              className="h-full"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* the style dock */}
      <AnimatePresence>
        {step === 2 ? (
          <motion.div
            key="dock"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            transition={fade}
            className="absolute bottom-3 left-[calc(40%+24px)] z-20 flex items-center gap-1 rounded-[12px] bg-raised p-1.5 shadow-(--shadow-float) max-sm:left-auto max-sm:right-3"
          >
            {THEMES.map((t) => (
              <span key={t.id} className="relative grid size-9 place-items-center rounded-[8px]">
                {t.id === theme ? (
                  <motion.span layoutId="story-theme" className="absolute inset-0 rounded-[8px] bg-accent-soft shadow-[inset_0_0_0_1.5px_var(--color-accent)]" transition={fade} />
                ) : null}
                <span className="relative flex size-6 overflow-hidden rounded-full shadow-(--shadow-hairline)">
                  {t.swatch.map((c) => (
                    <span key={c} className="h-full flex-1" style={{ background: c }} />
                  ))}
                </span>
              </span>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* the share card */}
      <AnimatePresence>
        {step === 3 ? (
          <motion.div
            key="share"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={fade}
            className="absolute right-3 bottom-3 z-30 w-[min(300px,52%)] rounded-[12px] bg-raised p-3.5 shadow-(--shadow-window)"
          >
            <p className="text-[13px] font-semibold text-ink">Share this map</p>
            <div className="mt-2.5 flex items-center gap-2 rounded-[8px] bg-panel px-2.5 py-2 text-[11.5px] text-ink-2">
              <Link2 className="size-3.5 shrink-0 text-ink-3" />
              <span className="truncate">cairn.page/slow-mornings</span>
            </div>
            <div className="mt-2 rounded-[8px] bg-ink px-2.5 py-2 font-mono text-[10.5px] leading-relaxed text-ink-4">
              {'<iframe src="https://cairn.page/e/slow-mornings" …>'}
            </div>
            <span
              className={cn(
                "mt-2.5 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-[7px] text-[12px] font-medium transition-[background-color,color] duration-(--duration-swap)",
                copied ? "bg-signal-green-soft text-signal-green" : "bg-accent text-white",
              )}
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? "Embed code copied" : "Copy embed code"}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </BrowserFrame>
  )
}
