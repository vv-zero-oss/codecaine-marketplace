import { useEffect, useState } from "react"
import { Check, Link2 } from "lucide-react"
import { motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { FlightMap, type MapPalette } from "@/components/mock/flight-map"
import { Reveal } from "@/components/motion/reveal"
import { ContrailMark } from "@/components/site/logo"
import { Container } from "@/components/ui/container"
import { type PassportYear } from "@/lib/flights"
import { cn } from "@/lib/utils"

const THEMES: { id: MapPalette; label: string; card: string; fg: string; muted: string }[] = [
  { id: "violet", label: "Violet", card: "bg-violet-ink", fg: "text-white", muted: "text-white/60" },
  { id: "night", label: "Night", card: "bg-night", fg: "text-night-fg", muted: "text-night-muted" },
  { id: "day", label: "Daylight", card: "bg-raised", fg: "text-ink", muted: "text-ink-3" },
]
const SHAPES = [
  { id: "story", label: "Story", aspect: "aspect-[9/16] w-[260px]" },
  { id: "square", label: "Square", aspect: "aspect-square w-[340px]" },
] as const

/**
 * Share your year: pick a look and a shape, see the card change, copy the
 * link. The card is the real map and the real numbers.
 */
export function ShareCard({ data }: { data: PassportYear }) {
  const [theme, setTheme] = useState(THEMES[0])
  const [shape, setShape] = useState<(typeof SHAPES)[number]>(SHAPES[0])
  const [copied, setCopied] = useState(false)
  useCanvasAction("Share link copied", (next) => setCopied(next ?? !copied), { on: copied, group: "Passport" })
  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(id)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`https://contrail.app/passport/${data.year}/ama-k`)
    } catch {
      /* the button still confirms; the link is shown below */
    }
    setCopied(true)
  }

  return (
    <section data-theme="day" className="bg-page pb-section">
      <Container>
        <div className="grid items-center gap-12 rounded-(--radius-panel) bg-panel p-7 md:p-12 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <p className="type-eyebrow text-violet">Share</p>
            <h2 className="type-display mt-4 max-w-[14ch] text-h2 text-balance">Post your year. Brag a little.</h2>
            <p className="mt-5 max-w-[44ch] text-ink-2">Every passport makes a card for stories and feeds. Your exact flights stay private — the card shows totals and lines on a map, never dates.</p>
            <div className="mt-8 flex flex-col gap-5">
              <div>
                <p className="text-[14px] font-medium">Look</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {THEMES.map((t) => (
                    <button key={t.id} type="button" aria-pressed={theme.id === t.id} onClick={() => setTheme(t)} className={cn("h-10 rounded-full px-4 text-[14.5px] transition-[background-color,color,transform] duration-(--duration-hover) active:scale-[0.96]", theme.id === t.id ? "bg-ink text-white" : "bg-raised text-ink-2 shadow-(--shadow-field) hover:text-ink")}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[14px] font-medium">Shape</p>
                <div className="mt-2 flex gap-2">
                  {SHAPES.map((s) => (
                    <button key={s.id} type="button" aria-pressed={shape.id === s.id} onClick={() => setShape(s)} className={cn("h-10 rounded-full px-4 text-[14.5px] transition-[background-color,color,transform] duration-(--duration-hover) active:scale-[0.96]", shape.id === s.id ? "bg-ink text-white" : "bg-raised text-ink-2 shadow-(--shadow-field) hover:text-ink")}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
              <button type="button" onClick={copy} className={cn("inline-flex h-12 w-fit items-center gap-2 rounded-full px-6 text-[15.5px] font-medium transition-[background-color,transform] duration-(--duration-hover) ease-(--ease-out-strong) active:scale-[0.97]", copied ? "bg-green text-white" : "bg-amber text-amber-ink hover:bg-amber-hover")}>
                {copied ? <Check className="size-4" strokeWidth={2.6} /> : <Link2 className="size-4" />}
                {copied ? "Link copied" : "Copy share link"}
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.06} className="flex justify-center">
            <motion.div layout transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }} className={cn("relative flex max-w-full flex-col overflow-hidden rounded-[26px] p-6 shadow-(--shadow-lift) transition-colors duration-(--duration-swap)", shape.aspect, theme.card)}>
              <div className="flex items-center justify-between">
                <ContrailMark tone={theme.id === "day" ? "ink" : "light"} className="size-8" />
                <span className={cn("font-data text-[14px] font-semibold tracking-[0.14em]", theme.muted)}>{data.year}</span>
              </div>
              <div className="-mx-6 my-5 flex-1 overflow-hidden">
                <FlightMap key={`${theme.id}-${data.year}`} region="world" palette={theme.id} routes={data.routes.map((r) => r.join("-")).join(",")} labels={false} fly={false} width={400} height={240} />
              </div>
              <p className={cn("font-data text-[44px] leading-none font-medium tabular-nums", theme.fg)}>{data.km.toLocaleString("en-US")}<span className={cn("text-[18px]", theme.muted)}> km</span></p>
              <p className={cn("mt-2 text-[14px]", theme.muted)}>{data.flights} flights · {data.countries} countries · {data.airports} airports</p>
            </motion.div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
