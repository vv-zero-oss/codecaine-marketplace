import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { CUSTOMER_LOGOS } from "@/content/customers"
import { cn } from "@/lib/utils"

/** The wall: a hairline grid of the names, each set in its own type. */
export function LogoWall() {
  return (
    <section className="pb-8">
      <Container>
        <Reveal>
          <p className="mb-6 text-center text-[15px] text-ink-3">And the 40,000 others, a few of them here</p>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-(--radius-panel) bg-line sm:grid-cols-3 lg:grid-cols-6">
            {CUSTOMER_LOGOS.map((logo) => (
              <li key={logo.name} className="group grid h-24 place-items-center bg-page px-3 text-center transition-colors duration-(--duration-hover) hover:bg-panel">
                <span className={cn("text-[19px] text-ink-3 transition-colors duration-(--duration-hover) group-hover:text-ink", logo.style)}>{logo.name}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
