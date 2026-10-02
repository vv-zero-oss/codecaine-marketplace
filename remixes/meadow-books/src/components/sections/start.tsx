import { Reveal } from "@/components/motion/reveal"
import { Mark } from "@/components/ui/wordmark"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

const BOOKS = [
  { title: "Freelance", className: "bg-periwinkle" },
  { title: "Agency", className: "bg-apricot" },
  { title: "Retail", className: "bg-coral" },
  { title: "Software", className: "bg-lilac" },
]

/** The closing offer: a stack of starter charts of accounts, drawn as ledger spines. */
export function Start() {
  return (
    <section id="start" className="overflow-hidden bg-page pt-16 sm:pt-24">
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <SectionHeading align="center" title="Start from a chart of accounts built for you" description="Pick a ready-made chart of accounts, tax codes and skills for your kind of business and post your first entries in minutes." />
          <div className="mt-6 flex justify-center gap-2.5">
            <ButtonLink href="#start" size="lg">Browse templates</ButtonLink>
            <ButtonLink href="#footer" variant="light" size="lg">Talk to sales</ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="mt-12 flex h-[260px] items-end justify-center gap-3 sm:h-[300px]">
          <div className="relative flex h-full w-[clamp(110px,26vw,170px)] flex-col justify-between rounded-t-xl bg-teal p-3 text-left text-white shadow-lift [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
            <Mark className="size-4 border-[2.5px]" />
            <span className="font-display text-[22px] font-semibold tracking-[-0.03em]">Ledger</span>
          </div>
          {BOOKS.map((b, i) => (
            <div key={b.title} className={cn("flex w-[clamp(34px,8vw,54px)] justify-center rounded-t-xl pt-4 shadow-lift [mask-image:linear-gradient(to_bottom,black_70%,transparent)]", b.className)} style={{ height: `${100 - i * 3}%` }}>
              <span className="font-display text-[14px] font-semibold text-white [writing-mode:vertical-rl]">{b.title}</span>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
