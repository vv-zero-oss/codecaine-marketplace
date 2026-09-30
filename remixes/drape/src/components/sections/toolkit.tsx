import { useCanvasAction } from "@canvas/react"
import { Check, Eye, Layers, Ruler, Sparkles, Wand2 } from "lucide-react"
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react"
import { useRef, useState } from "react"

import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { COLOURWAYS, MODEL, STEPS, pexels, type Colourway } from "@/content"
import { recolour, sketch, useProcessed } from "@/lib/image-fx"
import { ease } from "@/lib/tokens"
import { cn } from "@/lib/utils"

const FRONT = pexels(MODEL.front, 600, 800)
const SIDE = pexels(MODEL.side, 600, 800)

/**
 * Toolkit — the product in four steps, pinned while you scroll through them:
 * Snap → Dress → Recolour → Wear it. The tabs follow the scroll and can be
 * clicked; each step is also a switch in the editor's Actions row.
 */
export function Toolkit({
  title = "Your fitting room",
  lede = "From a photo of you to a piece you're sure of — without leaving the sofa.",
}: {
  title?: string
  lede?: string
}) {
  const section = useRef<HTMLElement>(null)
  const [step, setStep] = useState(0)
  const [chosen, setChosen] = useState(COLOURWAYS[3])
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] })

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(STEPS.length - 1, Math.max(0, Math.floor(value * STEPS.length * 0.999)))
    setStep((current) => (current === next ? current : next))
  })

  const goTo = (index: number) => {
    const element = section.current
    if (!element) return
    const top = element.getBoundingClientRect().top + window.scrollY
    const range = element.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + (range * (index + 0.5)) / STEPS.length, behavior: "smooth" })
    setStep(index)
  }

  STEPS.forEach((entry, index) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCanvasAction(`Step: ${entry.label}`, (next) => (next === false ? undefined : setStep(index)), {
      on: step === index,
      group: "Toolkit",
    })
  })

  return (
    <section ref={section} id="toolkit" className="relative h-[420svh] bg-espresso">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden pt-20 pb-6 sm:pt-24">
        <Container className="flex min-h-0 flex-1 flex-col">
          <div className="text-center">
            <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-none font-medium tracking-[-0.04em] text-cream">
              {title}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[14px] text-cream-2 max-sm:hidden">{lede}</p>
            <div className="mt-5 flex justify-center gap-2 max-sm:hidden">
              <ButtonLink href="#controls">Learn more</ButtonLink>
              <ButtonLink href="#faq" variant="outline-dark">
                Get started
              </ButtonLink>
            </div>
          </div>

          <StepTabs step={step} onSelect={goTo} />

          <div className="relative mt-4 min-h-0 flex-1">
            <AnimatePresence mode="popLayout" initial={false}>
              <StepStage key={STEPS[step].id} step={step} chosen={chosen} onChoose={setChosen} />
            </AnimatePresence>
          </div>
          <p className="mt-3 text-center text-[13px] text-cream-2 sm:hidden">{STEPS[step].body}</p>
        </Container>
      </div>
    </section>
  )
}

/** The four tabs, each underlined in clay while its step is showing. */
export function StepTabs({ step, onSelect }: { step: number; onSelect: (index: number) => void }) {
  return (
    <div role="tablist" aria-label="Steps" className="mx-auto mt-6 flex gap-1 sm:mt-8 sm:gap-6">
      {STEPS.map((entry, index) => (
        <button
          key={entry.id}
          role="tab"
          aria-selected={step === index}
          onClick={() => onSelect(index)}
          className={cn(
            "relative h-11 px-3 text-[13px] transition-colors duration-200",
            step === index ? "text-cream" : "text-cream-3 hover:text-cream-2",
          )}
        >
          {entry.label}
          <span
            className={cn(
              "absolute inset-x-2 bottom-1.5 h-px origin-left bg-clay transition-transform duration-[var(--dur-reveal)] ease-(--ease-out)",
              step === index ? "scale-x-100" : "scale-x-0",
            )}
          />
          {index < step ? <span className="absolute inset-x-2 bottom-1.5 h-px bg-cream/25" /> : null}
        </button>
      ))}
    </div>
  )
}

/** One step's scene: the app's panels around what that step shows. */
export function StepStage({
  step,
  chosen,
  onChoose,
}: {
  step: number
  chosen: Colourway
  onChoose: (way: Colourway) => void
}) {
  const reduced = useReducedMotion()
  const entry = STEPS[step]
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={reduced ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
      transition={{ duration: 0.36, ease: ease.out }}
      className="absolute inset-0 flex items-stretch justify-center gap-3"
    >
      {entry.id === "recolour" ? (
        <RecolourGrid chosen={chosen} onChoose={onChoose} />
      ) : (
        <>
          <LayersPanel step={step} chosen={chosen} />
          <StepCanvas step={step} chosen={chosen} />
          <ModifyPanel step={step} chosen={chosen} />
        </>
      )}
    </motion.div>
  )
}

export function LayersPanel({ step, chosen }: { step: number; chosen: Colourway }) {
  const layers =
    step === 0
      ? [["You", "Photo · front"]]
      : [
          [`Hoodie · ${chosen.name}`, "Lowfield · M"],
          ["You", "Photo · front"],
        ]
  return (
    <aside className="hidden w-52 shrink-0 self-start rounded-md border border-line-dark bg-espresso-2 p-2 md:block">
      <p className="mb-2 flex items-center gap-1.5 px-1 text-[11px] font-medium text-cream-2">
        <Layers className="size-3.5" /> Layers
      </p>
      {layers.map(([name, meta], i) => (
        <div key={name} className={cn("flex items-center gap-2 rounded-sm px-2 py-1.5", i === 0 && "bg-cream/6")}>
          <span className="size-6 rounded-xs bg-espresso-4" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[12px] text-cream">{name}</span>
            <span className="block text-[10px] text-cream-3">{meta}</span>
          </span>
          <Eye className="size-3 text-cream-3" />
        </div>
      ))}
    </aside>
  )
}

export function StepCanvas({ step, chosen }: { step: number; chosen: Colourway }) {
  const drawn = useProcessed(() => sketch(FRONT), [])
  const worn = useProcessed(() => recolour(FRONT, MODEL.garmentHue, chosen), [chosen])
  const side = useProcessed(() => recolour(SIDE, MODEL.garmentHue, chosen), [chosen])
  const src = step === 0 ? drawn : step === 1 ? FRONT : worn
  return (
    <div className="relative flex min-w-0 flex-1 items-center justify-center gap-3 overflow-hidden rounded-md bg-paper md:max-w-xl">
      {src ? <img src={src} alt={step === 0 ? "A pencil trace of the photo" : "The hoodie, tried on"} className="h-full max-h-full w-auto object-contain" /> : null}
      {step === 3 && side ? (
        <img src={side} alt="The same hoodie from the side" className="h-full w-auto object-contain max-sm:hidden" />
      ) : null}
      {step === 0 ? (
        <span className="absolute bottom-3 left-3 rounded-xs bg-espresso px-2 py-1 font-mono text-[10px] text-cream-2">
          Tracing shape · 17 points
        </span>
      ) : null}
    </div>
  )
}

export function ModifyPanel({ step, chosen }: { step: number; chosen: Colourway }) {
  const entry = STEPS[step]
  return (
    <aside className="hidden w-60 shrink-0 self-start rounded-md border border-line-dark bg-espresso-2 p-3 md:block">
      <p className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-cream-2">
        {step === 3 ? <Ruler className="size-3.5" /> : <Wand2 className="size-3.5" />}
        {step === 3 ? "Fit check" : "Modify"}
      </p>
      <p className="text-[13px] font-medium text-cream">{entry.title}</p>
      <p className="mt-1 text-[12px] leading-relaxed text-cream-3">{entry.body}</p>
      {step === 3 ? (
        <dl className="mt-3 space-y-1.5 text-[11px]">
          {[
            ["Size", "M"],
            ["Chest", "+4 cm ease"],
            ["Length", "Hip"],
            ["Colour", chosen.name],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <dt className="text-cream-3">{k}</dt>
              <dd className="text-cream tabular-nums">{v}</dd>
            </div>
          ))}
          <div className="mt-2 flex items-center gap-1.5 rounded-sm bg-sage/20 px-2 py-1.5 text-cream">
            <Check className="size-3" /> Keeps well — 94% match
          </div>
        </dl>
      ) : (
        <div className="mt-3 flex h-7 items-center justify-center gap-1.5 rounded-sm bg-clay text-[11px] font-medium text-paper">
          <Sparkles className="size-3" /> {step === 0 ? "Use this photo" : "Try it on"}
        </div>
      )}
    </aside>
  )
}

/** Sixteen colourways of the hoodie, on the model, in one grid. */
export function RecolourGrid({ chosen, onChoose }: { chosen: Colourway; onChoose: (way: Colourway) => void }) {
  return (
    <div className="grid h-full content-center gap-2 [grid-template-columns:repeat(4,minmax(0,1fr))] sm:[grid-template-columns:repeat(8,minmax(0,1fr))]">
      {COLOURWAYS.map((way, index) => (
        <ColourwayTile key={way.name} way={way} index={index} active={way.name === chosen.name} onChoose={onChoose} />
      ))}
    </div>
  )
}

export function ColourwayTile({
  way,
  index,
  active,
  onChoose,
}: {
  way: Colourway
  index: number
  active: boolean
  onChoose: (way: Colourway) => void
}) {
  const src = useProcessed(() => recolour(pexels(MODEL.front, 240, 320), MODEL.garmentHue, way), [way])
  const reduced = useReducedMotion()
  return (
    <motion.button
      type="button"
      onClick={() => onChoose(way)}
      initial={reduced ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.025, ease: ease.out }}
      aria-pressed={active}
      aria-label={`${way.name} colourway`}
      className={cn(
        "group relative aspect-[3/4] max-h-[24svh] overflow-hidden rounded-sm bg-paper outline-offset-2 transition-[outline-color] duration-150",
        active ? "outline-2 outline-clay" : "outline-2 outline-transparent hover:outline-cream/30",
      )}
    >
      {src ? <img src={src} alt="" className="size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]" /> : null}
      <span className="absolute bottom-1 left-1 rounded-xs bg-espresso/80 px-1.5 py-0.5 text-[10px] text-cream">{way.name}</span>
    </motion.button>
  )
}
