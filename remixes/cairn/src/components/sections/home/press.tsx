import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

/** Made-up mastheads, each set in its own voice from the page's three
 *  families — never a real publication's logo. */
const MASTHEADS = [
  { name: "The Wayfarer", className: "type-serif text-[34px] italic tracking-[-0.03em]" },
  { name: "FIELD/NOTES", className: "font-sans text-[22px] font-semibold tracking-[0.08em]" },
  { name: "Pinpoint", className: "type-serif text-[38px] font-semibold tracking-[-0.05em]" },
  { name: "small places", className: "font-mono text-[19px] font-medium tracking-[-0.02em] lowercase" },
]

/**
 * Proof, quietly: a grey serif line and the places Cairn maps have been
 * written up, in ink at rest and fading back as you pass over the others.
 */
export function Press({ title = "Passed around the internet." }: { title?: string }) {
  return (
    <section className="py-14 md:py-20">
      <Container className="flex flex-col items-center gap-10 md:gap-14">
        <Reveal>
          <p className="type-serif text-center text-h4 text-ink-soft">{title}</p>
        </Reveal>
        <Reveal delay={0.06} className="w-full">
          <ul className="group/press mx-auto flex max-w-[1000px] flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16">
            {MASTHEADS.map((m) => (
              <li
                key={m.name}
                className={cn(
                  "leading-none text-ink transition-opacity duration-(--duration-swap) ease-(--ease-out-strong) group-hover/press:opacity-35 hover:opacity-100!",
                  m.className,
                )}
              >
                {m.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
