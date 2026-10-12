import { BadgePercent, Coins, Rocket, Users } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { FREE_STRIP } from "@/content/pricing"

const ICONS = [BadgePercent, Rocket, Coins, Users]

/** What every plan gets without asking — the reasons "free" isn't a trap. */
export function FreeStrip() {
  return (
    <section className="py-6">
      <Container>
        <Reveal className="grid gap-px overflow-hidden rounded-(--radius-panel) bg-line sm:grid-cols-2 lg:grid-cols-4">
          {FREE_STRIP.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <div key={item.title} className="bg-panel p-6">
                <Icon className="size-5 text-ink" strokeWidth={1.6} />
                <p className="mt-5 text-[16px] font-medium">{item.title}</p>
                <p className="mt-1 text-[14px] text-ink-3">{item.body}</p>
              </div>
            )
          })}
        </Reveal>
      </Container>
    </section>
  )
}
