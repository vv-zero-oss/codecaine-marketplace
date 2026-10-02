import { Anchor, Boxes, Feather, Layers, Orbit } from "lucide-react"

import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/motion/reveal"

const TEAMS = [
  { name: "Larkfield", icon: Feather },
  { name: "Northbeam", icon: Orbit },
  { name: "Quillstone", icon: Layers },
  { name: "Harbor & Pine", icon: Anchor },
  { name: "Tallow", icon: Boxes },
]

/** One line of proof straight under the hero, before the first claim. */
export function Trust({ caption = "Built, supported and used by people at small studios, growing startups and funds." }: { caption?: string }) {
  return (
    <section aria-label="Customers" className="bg-page py-12 sm:py-16">
      <Container>
        <Reveal className="flex flex-col items-center gap-7">
          <p className="max-w-[420px] text-center text-[13px] leading-snug text-ink-500">{caption}</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-ink-700 sm:gap-x-12">
            {TEAMS.map(({ name, icon: Icon }) => (
              <li key={name} className="flex items-center gap-2 text-[14px] font-semibold tracking-tight opacity-80">
                <Icon className="size-4" /> {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
