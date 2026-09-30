import { CreditCard, Flame, Globe2 } from "lucide-react"

import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/motion/reveal"
import { PERKS, PERKS_NOTE } from "@/content"

const ICONS = { cards: CreditCard, globe: Globe2, flame: Flame }

/** A small icon on a soft glow, over a two-line serif promise. */
export function Perk({ icon, title }: { icon: keyof typeof ICONS; title: string }) {
  const Icon = ICONS[icon]
  return (
    <div className="flex flex-col items-center text-center">
      <span className="relative grid size-9 place-items-center rounded-full bg-surface text-ink shadow-item before:absolute before:-inset-2 before:-z-10 before:rounded-full before:bg-accent/15 before:blur-md">
        <Icon className="size-4" strokeWidth={1.8} />
      </span>
      <p className="mt-4 font-serif text-title whitespace-pre-line text-ink">{title}</p>
    </div>
  )
}

/** The three headline promises, straight under the phones. */
export function Perks({ note = PERKS_NOTE }: { note?: string }) {
  return (
    <section id="cards" className="pt-6 pb-20 sm:pb-28">
      <Container>
        <div className="mx-auto grid max-w-[1000px] gap-10 sm:grid-cols-3 sm:gap-6">
          {PERKS.map((perk, i) => (
            <Reveal key={perk.title} delay={i * 0.08}>
              <Perk icon={perk.icon} title={perk.title} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.24}>
          <p className="mt-8 text-center text-[0.6875rem] text-subtle sm:mt-6">{note}</p>
        </Reveal>
      </Container>
    </section>
  )
}
