import { ArrowDown } from "lucide-react"

import { ClosingCta } from "@/components/blocks/closing-cta"
import { PageHero } from "@/components/blocks/page-hero"
import { SectionHeading, SectionLabel } from "@/components/blocks/section-label"
import { DragStrip } from "@/components/motion/drag-strip"
import { Reveal } from "@/components/motion/reveal"
import { scrollToY } from "@/components/motion/smooth-scroll"
import { Roles } from "@/components/sections/careers/roles"
import { Button } from "@/components/ui/button"
import { LIFE_PHOTOS, PERKS, ROLES } from "@/data/studio"
import { pexels } from "@/lib/photos"

const HIRING = [
  { step: "A chat", body: "Thirty minutes with someone you'd work with. No trick questions." },
  { step: "Your work", body: "You walk us through one thing you made, and what you'd change." },
  { step: "A make-day", body: "A paid day in the studio, making something small with the team." },
  { step: "An answer", body: "Within a week of the make-day, yes or no, with reasons." },
]

/**
 * Careers: the invitation → what a week here looks like (the strip you
 * drag) → the open roles, filterable, each one applied to in a sheet →
 * what you get → how hiring goes → and the open door.
 */
export function CareersPage() {
  const jump = () => {
    const el = document.getElementById("roles")
    if (el) scrollToY(el.getBoundingClientRect().top + window.scrollY - 80)
  }
  return (
    <>
      <PageHero label="Careers" lines={["Make the thing", "nobody's made", "yet."]} muted={2} lead="We're a small studio on purpose. When we hire, it's because there's a seat at the table and a kind of work we can't do yet without you.">
        <Button size="lg" variant="outline" className="w-fit md:justify-self-end" onClick={jump}>
          {ROLES.length} open roles <ArrowDown />
        </Button>
      </PageHero>

      <section aria-label="A week at Kiln" className="pb-(--spacing-section)">
        <div className="flex items-end justify-between px-(--spacing-gutter)">
          <SectionLabel index="01">A week at Kiln</SectionLabel>
          <p className="type-label text-ink-4">Drag →</p>
        </div>
        <DragStrip className="mt-8 pl-(--spacing-gutter)" gap={16}>
          {LIFE_PHOTOS.map((p, i) => (
            <figure key={p.id} className="w-[min(78vw,440px)] shrink-0 select-none">
              <div className="aspect-[4/5] overflow-hidden rounded-(--radius-cell) bg-panel shadow-(--shadow-card)">
                <img src={pexels(p.id, 900, 1125)} alt={p.alt} draggable={false} loading="lazy" className="size-full object-cover" />
              </div>
              <figcaption className="type-label mt-3 text-ink-3">
                {["Monday, set build", "Tuesday, lighting", "Wednesday, on camera", "Thursday, the shoot", "Friday, the wall", "Kiln Friday"][i]}
              </figcaption>
            </figure>
          ))}
          <span className="w-[calc(var(--spacing-gutter)-16px)] shrink-0" aria-hidden />
        </DragStrip>
      </section>

      <Roles />

      <section aria-label="What you get" className="px-(--spacing-gutter) pb-(--spacing-section)">
        <SectionHeading index="03" label="What you get" title="Time, tools, and the other city." continuation="The rest is the work." />
        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PERKS.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 3) * 0.05} className="group/perk rounded-(--radius-card) bg-panel p-6 shadow-(--shadow-card) transition-[background-color,transform] duration-(--duration-hover) ease-(--ease-out-strong) hover:-translate-y-0.5 hover:bg-panel-2">
              <span className="type-label text-ink-5 tabular-nums">0{i + 1}</span>
              <h3 className="type-head mt-10 text-h4 text-ink">{p.title}</h3>
              <p className="mt-2 text-[16px] text-ink-3">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-label="How hiring goes" className="px-(--spacing-gutter) pb-(--spacing-section)">
        <SectionHeading index="04" label="How hiring goes" title="Four steps, about three weeks." continuation="You'll always know which one you're on." />
        <ol className="mt-14 grid border-t border-line-2 md:grid-cols-4">
          {HIRING.map((h, i) => (
            <Reveal as="li" key={h.step} delay={i * 0.06} className="relative border-b border-line-2 py-8 md:border-r md:border-b-0 md:pr-8 md:[&:not(:first-child)]:pl-8 md:last:border-r-0">
              <span aria-hidden className="absolute -top-[5px] left-0 size-[9px] rounded-full bg-ember" />
              <p className="type-head text-mega text-ink-5 tabular-nums">{i + 1}</p>
              <h3 className="type-head mt-6 text-h4 text-ink">{h.step}</h3>
              <p className="mt-2 text-[16px] text-ink-3">{h.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <ClosingCta title="Don't see your role?" continuation="Tell us what you'd make here." cta="Let's Talk" />
    </>
  )
}
