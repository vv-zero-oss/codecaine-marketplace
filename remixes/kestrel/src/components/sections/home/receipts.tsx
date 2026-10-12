import { useState } from "react"
import { Feather, Hexagon, Leaf, Mountain, Package, Sparkle, Square, Triangle, Waves, type LucideIcon } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { Marquee } from "@/components/motion/marquee"
import { Container } from "@/components/ui/container"
import { RECEIPTS, TESTIMONIALS, type Testimonial } from "@/content/home-end"
import { cn } from "@/lib/utils"

const GLYPHS: LucideIcon[] = [Triangle, Waves, Leaf, Hexagon, Feather, Mountain, Square, Package, Sparkle]
const STYLES = [
  "font-semibold tracking-[-0.04em] lowercase",
  "font-medium tracking-[0.12em] uppercase text-[8px]",
  "font-mono uppercase text-[8.5px]",
  "font-semibold italic tracking-[-0.02em]",
  "font-normal tracking-[0.04em] uppercase text-[8px]",
]

/** An invented company's wordmark, set small on a white tile. */
function CompanyTile({ name, index }: { name: string; index: number }) {
  const Glyph = GLYPHS[index % GLYPHS.length]
  return (
    <span className="flex size-11 shrink-0 flex-col items-center justify-center gap-0.5 rounded-(--radius-field) bg-raised text-ink shadow-(--shadow-field)">
      <Glyph className="size-3" strokeWidth={2} />
      <span className={cn("max-w-[40px] truncate text-[9px] leading-none", STYLES[index % STYLES.length])}>{name}</span>
    </span>
  )
}

/** One receipt: who, where, and what they said. */
function ReceiptCard({ t, index }: { t: Testimonial; index: number }) {
  return (
    <figure className="mx-2 flex w-[300px] shrink-0 flex-col rounded-(--radius-card) border border-line bg-raised p-5 shadow-(--shadow-xs) transition-[transform,box-shadow] duration-(--duration-swap) ease-(--ease-out-strong) hover:-translate-y-1 hover:shadow-(--shadow-float) sm:w-[340px] sm:p-6">
      <figcaption className="flex items-center gap-3">
        <CompanyTile name={t.company} index={index} />
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-[15px] text-ink">{t.name}</span>
          <span className="truncate text-[14px] text-ink-3">{t.title}</span>
        </span>
      </figcaption>
      <blockquote className="mt-5 text-[15px] leading-relaxed text-ink-2">{t.quote}</blockquote>
    </figure>
  )
}

const ROWS = [
  { speed: 75, direction: "left" as const, offset: "-ml-24" },
  { speed: 90, direction: "right" as const, offset: "-ml-48" },
  { speed: 65, direction: "left" as const, offset: "-ml-8" },
]

/**
 * The receipts wall: three rows of customers drifting past at different
 * speeds. Hovering a row stops it so a quote can be read.
 */
export function Receipts() {
  const [paused, setPaused] = useState(false)
  useCanvasAction("Pause receipts", (next) => setPaused(next ?? !paused), { on: paused, group: "Receipts" })
  const per = Math.ceil(TESTIMONIALS.length / ROWS.length)

  return (
    <section id="receipts" className="py-(--spacing-section)">
      <Container>
        <SectionHeading align="center" size="display" kicker={RECEIPTS.kicker} title={RECEIPTS.title} />
      </Container>
      <div
        className={cn(
          "mt-14 flex flex-col gap-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] lg:mt-20",
          paused && "[&_.animate-marquee]:[animation-play-state:paused]",
        )}
      >
        {ROWS.map((row, r) => (
          <Marquee key={r} speed={row.speed} direction={row.direction} className={row.offset}>
            {TESTIMONIALS.slice(r * per, r * per + per).map((t, i) => (
              <ReceiptCard key={t.name} t={t} index={r * per + i} />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  )
}
