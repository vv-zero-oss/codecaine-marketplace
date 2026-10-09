import { CoffeeBag } from "@/components/mock/coffee-bag"
import { Reveal } from "@/components/motion/reveal"
import { Doodle } from "@/components/mock/doodles"
import { ButtonLink } from "@/components/ui/button"
import { Link } from "@/lib/router"
import { photo, PHOTOS } from "@/lib/photos"
import type { LabelTone } from "@/content/products"

const PLANS: { id: string; name: string; price: string; kicker: string; body: string; bags: { name: string; label: LabelTone }[] }[] = [
  {
    id: "rotation",
    name: "The Rotation",
    price: "From $17 / bag",
    kicker: "Year-round favourites",
    body: "The coffees we always have on. Pick one and stick with it, or let us flip between them.",
    bags: [
      { name: "Side B Blend", label: "honey" },
      { name: "Feedback Loop", label: "ember" },
    ],
  },
  {
    id: "roasters-pick",
    name: "Roaster's Pick",
    price: "From $22 / bag",
    kicker: "A new single origin, every time",
    body: "Whatever we're most excited about this fortnight, with tasting notes and a record to put on while you brew.",
    bags: [
      { name: "Liner Notes", label: "moss" },
      { name: "Slow Fade", label: "lilac" },
    ],
  },
]

/**
 * The subscription, sold over a photograph of green coffee being scooped:
 * a dark band, the pitch on the left, two plan cards to choose between.
 * A card's bags fan apart on hover, like pulling two records from a crate.
 */
export function SubscriptionBand() {
  return (
    <section className="relative isolate overflow-hidden text-page">
      <img src={photo(PHOTOS.greenScoop, 2000)} alt="" className="absolute inset-0 -z-10 size-full object-cover" loading="lazy" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,color-mix(in_oklab,var(--color-cocoa)_88%,transparent)_10%,color-mix(in_oklab,var(--color-cocoa)_35%,transparent)_70%)]" />
      <div className="grid gap-10 p-(--spacing-gutter) py-(--spacing-section) lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-end">
        <Reveal className="max-w-[460px] space-y-5">
          <p className="type-label text-[11.5px] text-page/75">Coffee subscription</p>
          <h2 className="type-display flex items-end gap-3 text-h1">
            Never hear the last track.
            <Doodle name="sun" className="hidden w-20 shrink-0 text-page sm:block" />
          </h2>
          <p className="text-lead text-page/85">
            Fresh bags on your doorstep every one, two or four weeks, roasted the Tuesday before. Skip, swap or stop whenever — and save 12% on every bag.
          </p>
          <ButtonLink href="/subscribe" variant="paper" size="sm">
            Build your subscription
          </ButtonLink>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08}>
              <Link href={`/subscribe?plan=${plan.id}`} className="group/plan block h-full rounded-(--radius-card) bg-raised p-3 text-ink shadow-(--shadow-float) transition-transform duration-(--duration-swap) ease-(--ease-out-strong) hover:-translate-y-1">
                <div className="relative grid h-52 place-items-center overflow-hidden rounded-(--radius-field) bg-panel">
                  {plan.bags.map((bag, b) => (
                    <div
                      key={bag.name}
                      className="absolute w-24 transition-transform duration-[420ms] ease-(--ease-out-strong)"
                      style={{ transform: `translateX(${b ? 22 : -22}px) rotate(${b ? 6 : -6}deg)` }}
                    >
                      <div className={b ? "group-hover/plan:translate-x-5 group-hover/plan:rotate-3 transition-transform duration-[420ms] ease-(--ease-out-strong)" : "group-hover/plan:-translate-x-5 group-hover/plan:-rotate-3 transition-transform duration-[420ms] ease-(--ease-out-strong)"}>
                        <CoffeeBag name={bag.name} label={bag.label} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 px-2 pt-4 pb-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="type-display text-h4">{plan.name}</h3>
                    <span className="font-mono text-[12.5px] text-ink-2">{plan.price}</span>
                  </div>
                  <p className="type-label text-[10.5px] text-ink-3">{plan.kicker}</p>
                  <p className="text-[14.5px] text-ink-2">{plan.body}</p>
                  <span className="type-label mt-2 inline-flex h-7 items-center rounded-(--radius-button) bg-ember px-2 text-[11.5px] text-page transition-colors group-hover/plan:bg-rust">
                    Choose this
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
