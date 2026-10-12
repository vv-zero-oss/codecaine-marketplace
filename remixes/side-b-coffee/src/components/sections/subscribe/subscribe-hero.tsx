import { CalendarCheck, Flame, Percent } from "lucide-react"

import { CoffeeBag } from "@/components/mock/coffee-bag"
import { Doodle } from "@/components/mock/doodles"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

const PROOF = [
  { icon: Percent, title: "12% off every bag", body: "Subscribers pay less than the shelf, always." },
  { icon: CalendarCheck, title: "Skip any time", body: "Skip, swap, pause or stop from one email link." },
  { icon: Flame, title: "Roasted Tuesday", body: "On your doorstep three days off the drum." },
]

/**
 * The promise, said loud: an oversized serif line with one word in rust,
 * three bags leaning on each other, and the three reasons people stay.
 * The bags lean apart a little on hover — the "pick one up" gesture.
 */
export function SubscribeHero({ before = "Never", highlight = "run out." }: { before?: string; highlight?: string }) {
  return (
    <section className="border-b border-line">
      <Container className="grid gap-12 py-(--spacing-section) lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div className="space-y-8">
          <p className="type-label text-[11.5px] text-ink-3">Coffee subscription</p>
          <h1 className="type-display text-mega">
            {before}
            <br />
            <span className="text-rust">{highlight}</span>
          </h1>
          <p className="max-w-[34ch] text-lead text-ink-2">
            Fresh bags on your doorstep every one, two or four weeks, roasted the Tuesday before. You choose the coffee, or let our roasters choose for you.
          </p>
          <ButtonLink href="/subscribe#builder" size="lg">
            Build yours
          </ButtonLink>
        </div>
        <div className="group/bags relative mx-auto grid h-[300px] w-full max-w-[360px] place-items-center sm:h-[360px]">
          {(
            [
              { label: "moss", name: "Liner Notes", r: -10, x: -96 },
              { label: "lilac", name: "Slow Fade", r: 8, x: 96 },
              { label: "honey", name: "Side B Blend", r: 0, x: 0 },
            ] as const
          ).map((bag) => (
            <div
              key={bag.name}
              className="absolute w-[36%] transition-transform duration-[520ms] ease-(--ease-out-strong) group-hover/bags:[--spread:1.25]"
              style={{ transform: `translateX(calc(${bag.x}px * var(--spread, 1))) rotate(${bag.r}deg)` }}
            >
              <CoffeeBag name={bag.name} label={bag.label} artwork={bag.label === "honey" ? "honey" : "cream"} />
            </div>
          ))}
          <Doodle name="sun" className="absolute -top-2 right-0 w-20 text-ember" />
        </div>
      </Container>
      <Container className="grid border-t border-line sm:grid-cols-3">
        {PROOF.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06} className="flex gap-4 border-line py-8 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
            <p.icon className="mt-1 size-5 shrink-0 text-ember" strokeWidth={1.6} />
            <div>
              <p className="type-display text-h4">{p.title}</p>
              <p className="mt-1 text-[14.5px] text-ink-2">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  )
}
