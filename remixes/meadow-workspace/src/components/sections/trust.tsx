import { Anchor, Boxes, Feather, Flower2, Layers, Orbit, Sailboat, Waves } from "lucide-react"

import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"

const TEAMS = [
  { name: "Larkfield", icon: Feather },
  { name: "Northbeam", icon: Orbit },
  { name: "Quillstone", icon: Layers },
  { name: "Harbor & Pine", icon: Anchor },
  { name: "Tallow", icon: Boxes },
  { name: "Kiln & Co.", icon: Flower2 },
  { name: "Orchard Row", icon: Sailboat },
  { name: "Brightwater", icon: Waves },
]

const FACTS = [
  ["4,200+", "teams"],
  ["1.8M", "threads filed"],
  ["4.9 / 5", "average rating"],
]

/** Proof straight under the hero: three numbers, then a slow drift of the
 *  teams behind them. The marquee is full-bleed so the strip never reads as
 *  a short row floating in space. */
export function Trust({ caption = "Built, supported and used by people at small studios, growing startups and funds." }: { caption?: string }) {
  return (
    <section aria-label="Customers" className="bg-page pt-14 pb-6 sm:pt-20">
      <Container>
        <Reveal className="flex flex-col items-center gap-8">
          <p className="max-w-[440px] text-center text-[14px] leading-snug text-ink-500">{caption}</p>
          <dl className="grid w-full max-w-[640px] grid-cols-3 divide-x divide-ink-200 rounded-[14px] bg-surface py-4 shadow-card">
            {FACTS.map(([n, label]) => (
              <div key={label} className="flex flex-col items-center gap-0.5 px-2">
                <dt className="font-display text-[22px] font-semibold tracking-[-0.035em] tabular-nums sm:text-[28px]">{n}</dt>
                <dd className="text-[12px] text-ink-500">{label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
      <Marquee className="mt-9" speed={36}>
        {TEAMS.map(({ name, icon: Icon }) => (
          <span key={name} className="flex items-center gap-2 text-[17px] font-semibold tracking-tight text-ink-700/80">
            <Icon className="size-5" strokeWidth={1.6} /> {name}
          </span>
        ))}
      </Marquee>
    </section>
  )
}
