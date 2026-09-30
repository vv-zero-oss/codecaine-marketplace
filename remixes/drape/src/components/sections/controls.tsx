import { useCanvasAction } from "@canvas/react"
import { Rotate3d, Ruler, Sparkles } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useState, type ReactNode } from "react"

import { FadeIn } from "@/components/motion/fade-in"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { COLOURWAYS, MODEL, pexels, type Colourway } from "@/content"
import { recolour, useProcessed } from "@/lib/image-fx"
import { ease } from "@/lib/tokens"
import { cn } from "@/lib/utils"

const PROMPTS: { text: string; way: string }[] = [
  { text: "Same hoodie, but in a deep plum", way: "Plum" },
  { text: "Something warmer — a clay or rust", way: "Clay" },
  { text: "A quiet navy that goes with jeans", way: "Ink" },
  { text: "Brighter, like a summer sky", way: "Sky" },
  { text: "Mustard, for autumn", way: "Mustard" },
]

const SWATCHES = ["Mint", "Clay", "Mustard", "Plum", "Sky", "Ink", "Olive", "Rose"]
const SIZES = ["S", "M", "L", "XL"] as const
const SIZE_NOTE: Record<(typeof SIZES)[number], string> = {
  S: "Snug at the chest; sleeves end above the wrist.",
  M: "Fits you best — 94% of people your shape keep it.",
  L: "Relaxed: 6 cm roomier, drops past the hip.",
  XL: "Oversized. Shoulders sit 4 cm down the arm.",
}
const byName = (name: string) => COLOURWAYS.find((way) => way.name === name)!

/**
 * Controls — "try more, return less": the tried-on piece in the middle and
 * the controls you'd use on it floating round it. Every card works: a prompt
 * that recolours, swatches, a fit toggle, sizes with advice, and a second
 * angle.
 */
export function Controls({
  title = "Try more,",
  script = "return less",
  lede = "Change the colour, the size and the fit, and see each one on you before you choose.",
}: {
  title?: string
  script?: string
  lede?: string
}) {
  const [way, setWay] = useState<Colourway>(byName("Clay"))
  const [angle, setAngle] = useState<"front" | "side">("front")
  const [fit, setFit] = useState("regular")
  const [size, setSize] = useState<(typeof SIZES)[number]>("M")
  const [prompt, setPrompt] = useState(0)
  const [generating, setGenerating] = useState(false)

  useCanvasAction("Generating", (next) => setGenerating(next ?? !generating), { on: generating, group: "Controls" })
  useCanvasAction("Side angle", (next) => setAngle((next ?? angle === "front") ? "side" : "front"), {
    on: angle === "side",
    group: "Controls",
  })

  const generate = () => {
    if (generating) return
    setGenerating(true)
    window.setTimeout(() => {
      setWay(byName(PROMPTS[prompt].way))
      setPrompt((p) => (p + 1) % PROMPTS.length)
      setGenerating(false)
    }, 900)
  }

  return (
    <section id="controls" className="bg-espresso py-24 sm:py-32">
      <Container>
        <SectionHeading title={title} script={script} lede={lede} align="center" />

        <div className="relative mx-auto mt-14 grid max-w-5xl gap-3 sm:grid-cols-2 lg:mt-20 lg:block lg:h-[600px]">
          <TriedOn way={way} angle={angle} fit={fit} generating={generating} />

          <FloatCard title="Describe" className="lg:absolute lg:top-10 lg:left-0 lg:w-60" delay={0}>
            <p className="min-h-10 rounded-sm bg-espresso-3 p-2 text-[12px] leading-snug text-cream-2">
              {PROMPTS[prompt].text}
            </p>
            <Button size="sm" className="mt-2 w-full" onClick={generate} disabled={generating}>
              <Sparkles className={cn(generating && "animate-pulse")} />
              {generating ? "Trying it on…" : "Generate"}
            </Button>
          </FloatCard>

          <FloatCard title="Colour" className="lg:absolute lg:top-0 lg:right-4 lg:w-64" delay={80}>
            <div className="flex flex-wrap gap-1.5">
              {SWATCHES.map((name) => {
                const entry = byName(name)
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setWay(entry)}
                    aria-label={name}
                    aria-pressed={way.name === name}
                    className={cn(
                      "size-8 rounded-xs ring-offset-2 ring-offset-espresso-2 transition-[box-shadow,transform] duration-150 active:scale-90 max-sm:size-10",
                      way.name === name ? "ring-2 ring-cream" : "hover:ring-1 hover:ring-cream/40",
                    )}
                    style={{ background: swatch(entry) }}
                  />
                )
              })}
            </div>
            <p className="mt-2 text-[11px] text-cream-3">
              Now: <span className="text-cream">{way.name}</span>
            </p>
          </FloatCard>

          <FloatCard title="Fit" icon={<Ruler className="size-3.5" />} className="lg:absolute lg:bottom-24 lg:left-6 lg:w-60" delay={160}>
            <ToggleGroup
              type="single"
              value={fit}
              onValueChange={(value) => value && setFit(value)}
              className="w-full rounded-sm bg-espresso-3 p-0.5"
            >
              {["slim", "regular", "relaxed"].map((value) => (
                <ToggleGroupItem
                  key={value}
                  value={value}
                  className="h-8 flex-1 rounded-xs text-[12px] text-cream-3 capitalize hover:bg-transparent hover:text-cream data-[state=on]:bg-espresso-4 data-[state=on]:text-cream max-sm:h-10"
                >
                  {value}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </FloatCard>

          <FloatCard title="Size" className="lg:absolute lg:right-0 lg:bottom-10 lg:w-64" delay={240}>
            <div className="grid grid-cols-4 gap-1">
              {SIZES.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSize(value)}
                  aria-pressed={size === value}
                  className={cn(
                    "h-8 rounded-xs text-[12px] tabular-nums transition-colors duration-150 max-sm:h-10",
                    size === value ? "bg-clay text-paper" : "bg-espresso-3 text-cream-2 hover:text-cream",
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
            <p className="mt-2 min-h-8 text-[11px] leading-snug text-cream-3">{SIZE_NOTE[size]}</p>
          </FloatCard>

          <FloatCard title="New angle" icon={<Rotate3d className="size-3.5" />} className="lg:absolute lg:top-[46%] lg:right-[-2rem] lg:w-44" delay={320}>
            <div className="grid grid-cols-2 gap-1">
              {(["front", "side"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAngle(value)}
                  aria-pressed={angle === value}
                  className={cn(
                    "h-8 rounded-xs text-[12px] capitalize transition-colors duration-150 max-sm:h-10",
                    angle === value ? "bg-espresso-4 text-cream" : "bg-espresso-3 text-cream-3 hover:text-cream",
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          </FloatCard>
        </div>
      </Container>
    </section>
  )
}

/** A colourway's own colour, for its swatch: the garment's mid-tone moved. */
function swatch(way: Colourway) {
  return `hsl(${way.hue} ${Math.min(100, 38 * way.sat)}% ${Math.min(88, 72 * way.light)}%)`
}

export function TriedOn({
  way,
  angle,
  fit,
  generating,
}: {
  way: Colourway
  angle: "front" | "side"
  fit: string
  generating: boolean
}) {
  const reduced = useReducedMotion()
  const source = pexels(angle === "front" ? MODEL.front : MODEL.side, 700, 900)
  const src = useProcessed(() => recolour(source, MODEL.garmentHue, way), [source, way])
  const stretch = fit === "slim" ? 0.95 : fit === "relaxed" ? 1.05 : 1
  return (
    <div className="relative mx-auto aspect-[7/9] w-full max-w-[380px] overflow-hidden rounded-lg bg-paper sm:col-span-2 lg:absolute lg:top-1/2 lg:left-1/2 lg:w-[360px] lg:-translate-x-1/2 lg:-translate-y-1/2">
      <AnimatePresence initial={false}>
        {src ? (
          <motion.img
            key={src}
            src={src}
            alt={`The hoodie in ${way.name}, from the ${angle}`}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1, scaleX: stretch }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: ease.out }}
            className="absolute inset-0 size-full object-cover"
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {generating ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-paper/40 backdrop-blur-[2px]"
          >
            <motion.div
              className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-clay/25 to-transparent"
              initial={{ top: "-20%" }}
              animate={reduced ? { top: "40%" } : { top: "110%" }}
              transition={{ duration: 0.9, ease: ease.inOut }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export function FloatCard({
  title,
  icon,
  delay = 0,
  className,
  children,
}: {
  title: string
  icon?: ReactNode
  delay?: number
  className?: string
  children: ReactNode
}) {
  return (
    <FadeIn delay={delay} className={cn("z-10", className)}>
      <div className="rounded-md border border-line-dark bg-espresso-2 p-3 shadow-float">
        <p className="mb-2.5 flex items-center gap-1.5 text-[11px] font-medium text-cream-2">
          {icon}
          {title}
        </p>
        {children}
      </div>
    </FadeIn>
  )
}
