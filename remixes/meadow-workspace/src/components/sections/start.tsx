import { Reveal } from "@/components/motion/reveal"
import { Mark } from "@/components/ui/wordmark"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

const BOOKS = [
  { title: "Fundraising", className: "bg-periwinkle" },
  { title: "Sales", className: "bg-apricot" },
  { title: "Hiring", className: "bg-coral" },
  { title: "Content", className: "bg-lilac" },
]

/** The closing offer: a stack of starter kits, drawn as book spines. */
export function Start() {
  return (
    <section id="start" className="overflow-hidden bg-page pt-16 sm:pt-24">
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <SectionHeading align="center" title="Try Meadow's starter kits free" description="Take the skills, agents and templates for fundraising, sales and more for a test drive in the AI tool you already use." />
          <div className="mt-6 flex justify-center gap-2.5">
            <ButtonLink href="#start" size="lg">Get the kits</ButtonLink>
            <ButtonLink href="#footer" variant="light" size="lg">Talk to sales</ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="mt-12 flex h-[260px] items-end justify-center gap-3 sm:h-[300px]">
          <div className="relative flex h-full w-[clamp(110px,26vw,170px)] flex-col justify-between rounded-t-md bg-teal p-3 text-left text-white shadow-lift [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
            <Mark className="size-4 border-[2.5px]" />
            <span className="font-serif text-[22px] font-semibold tracking-[-0.03em]">Starter</span>
          </div>
          {BOOKS.map((b, i) => (
            <div key={b.title} className={cn("flex w-[clamp(34px,8vw,54px)] justify-center rounded-t-md pt-4 shadow-lift [mask-image:linear-gradient(to_bottom,black_70%,transparent)]", b.className)} style={{ height: `${100 - i * 3}%` }}>
              <span className="font-serif text-[14px] font-semibold text-white [writing-mode:vertical-rl]">Starter · {b.title}</span>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
