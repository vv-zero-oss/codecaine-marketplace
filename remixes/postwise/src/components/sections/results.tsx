import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Doodle } from "@/components/blocks/doodle"
import { Reveal } from "@/components/motion/reveal"
import { TiltCard } from "@/components/motion/tilt-card"
import { BrandLogo } from "@/components/ui/brand-logo"
import { Container } from "@/components/ui/container"
import { RESULTS, type Result, type ResultTone } from "@/content"
import { avatar } from "@/lib/photos"
import { cn } from "@/lib/utils"

const TONES: Record<ResultTone, string> = {
  butter: "bg-butter",
  mint: "bg-mint",
  iris: "bg-iris",
  blossom: "bg-blossom",
}

/** The hover face of a result card: the card goes quiet and offers the story. */
function StoryOverlay({ show }: { show: boolean }) {
  return (
    <span
      className={cn(
        "absolute inset-0 grid place-items-center rounded-[var(--radius-card)] bg-paper-deep opacity-0 transition-opacity duration-(--duration-hover) ease-(--ease-out-quint)",
        "group-hover/tilt:opacity-100 group-focus-visible/tilt:opacity-100",
        show && "opacity-100",
      )}
    >
      <span className="inline-flex items-center gap-1.5 rounded-[var(--radius-field)] bg-card px-3 py-1.5 text-[13px] text-ink shadow-(--shadow-field)">
        Read story <ArrowRight className="size-3.5" />
      </span>
    </span>
  )
}

/** One card of the results grid: a big number on colour, or a quote on paper. */
export function ResultCard({ item, tilt = 2, showStory = false }: { item: Result; tilt?: number; showStory?: boolean }) {
  if (item.kind === "stat") {
    return (
      <TiltCard
        tilt={tilt}
        tabIndex={0}
        className={cn("relative flex aspect-square flex-col rounded-[var(--radius-card)] p-4 outline-none md:aspect-auto md:min-h-[200px]", TONES[item.tone])}
      >
        <p className="type-display text-[clamp(26px,2.6vw,32px)] text-ink">{item.value}</p>
        <p className="text-[13px] text-ink/70">{item.label}</p>
        <BrandLogo logo={item.logo} scale={0.8} className="mt-auto" />
        <StoryOverlay show={showStory} />
      </TiltCard>
    )
  }
  return (
    <TiltCard tilt={tilt / 2} tabIndex={0} className="relative col-span-2 flex flex-col rounded-[var(--radius-card)] bg-paper-deep p-4 outline-none md:min-h-[200px] md:p-5">
      <p className="text-[clamp(15px,1.5vw,17px)] leading-[1.4] tracking-[-0.01em] text-ink">“{item.quote}”</p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <span className="flex items-center gap-2.5">
          <img src={avatar(item.photo)} alt={item.name} className="size-8 rounded-[5px] object-cover" loading="lazy" />
          <span className="flex flex-col text-[12.5px] leading-tight">
            <span className="text-ink">{item.name}</span>
            <span className="text-ink-subtle">{item.role}</span>
          </span>
        </span>
        <BrandLogo logo={item.logo} scale={0.85} />
      </div>
    </TiltCard>
  )
}

/**
 * Results, as a bento of numbers on colour and quotes on paper. Each card
 * turns a couple of degrees under the pointer and offers its story; the
 * "Story overlay" action shows that face on every card at once.
 */
export function Results() {
  const [showStory, setShowStory] = useState(false)
  useCanvasAction("Story overlay", (next) => setShowStory(next ?? !showStory), { on: showStory, group: "Results" })

  return (
    <section id="results" className="py-section">
      <Container className="max-w-[900px]">
        <Reveal className="relative text-center">
          <Doodle text={RESULTS.hint.replace(" ", "\n")} arrow="down-right" className="absolute -top-6 left-0 hidden md:flex" />
          <h2 className="type-display text-[clamp(34px,4.4vw,52px)] text-balance">
            {RESULTS.titleStart} <em className="font-light italic">{RESULTS.titleAccent}</em> {RESULTS.titleRest}
            <br className="hidden sm:block" /> {RESULTS.titleEnd}
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {RESULTS.items.map((item, i) => (
            <Reveal key={i} delay={(i % 4) * 0.05} className={item.kind === "quote" ? "col-span-2" : undefined}>
              <ResultCard item={item} tilt={i % 2 ? -2 : 2} showStory={showStory} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
