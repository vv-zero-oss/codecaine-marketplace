import { CoffeeBag } from "@/components/mock/coffee-bag"
import { FlavorDial, RoastBar } from "@/components/blocks/flavor"
import { Sticker } from "@/components/blocks/sticker"
import { Button } from "@/components/ui/button"
import { findCoffee, money } from "@/content/products"
import { quickView } from "@/lib/quick-view"
import { cn } from "@/lib/utils"

/**
 * One coffee on the shelf: the bag on a warm panel, the name in the serif,
 * price in mono, origin, three tasting dials, notes and where it sits on
 * the roast bar, and a Quick view label.
 *
 * Hover floods the whole cell rust and turns the type cream (300ms — the
 * shelf lights up under the cursor), while the bag lifts
 * 6px and tips 2° — the gesture of taking it off the shelf. The whole card
 * is a button into quick view.
 */
export function CoffeeCard({
  coffeeId = "side-b-blend",
  accent = "rust",
  className,
}: {
  coffeeId?: string
  /** colour of the Quick view label */
  accent?: "rust" | "ember" | "sky" | "honey"
  className?: string
}) {
  const coffee = findCoffee(coffeeId)
  if (!coffee) return null
  const open = () => quickView.open(coffee.id)

  return (
    <article
      className={cn(
        "group/card relative flex cursor-pointer flex-col gap-5 p-(--spacing-gutter) text-ink outline-none transition-[background-color,color] duration-300 ease-out",
        "[@media(hover:hover)]:hover:bg-rust [@media(hover:hover)]:hover:text-page focus-visible:bg-rust focus-visible:text-page",
        className,
      )}
      onClick={open}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), open())}
      tabIndex={0}
      aria-label={`${coffee.name}, ${money(coffee.price)} — open quick view`}
    >
      <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-(--radius-card) bg-panel transition-[box-shadow] duration-(--duration-hover) group-focus-visible/card:ring-[3px] group-focus-visible/card:ring-ember/40">
        <div className="w-[64%] transition-transform duration-[260ms] ease-(--ease-out-strong) [@media(hover:hover)]:group-hover/card:-translate-y-1.5 [@media(hover:hover)]:group-hover/card:-rotate-2">
          <CoffeeBag name={coffee.name} notes={coffee.notes.join(" · ")} origin={coffee.origin} roast={coffee.roast} label={coffee.label} artwork={coffee.badge === "house" ? "honey" : "cream"} />
        </div>
        {coffee.badge === "new" && <Sticker text="new" tone={coffee.label === "moss" ? "ember" : "sky"} className="absolute top-2.5 left-2.5 size-[clamp(48px,22%,72px)]" />}
        {coffee.badge === "limited" && <Sticker text="limited" tone="rust" className="absolute top-2.5 left-2.5 size-[clamp(48px,22%,72px)]" />}
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="type-display text-h4 leading-none tracking-[-0.02em]">{coffee.name}</h3>
          <p className="shrink-0 font-mono text-[13px] text-ink-2 tabular transition-colors duration-300 group-hover/card:text-page/85">From {money(coffee.price)}</p>
        </div>
        <p className="type-label text-[11.5px] text-ink-3 transition-colors duration-300 group-hover/card:text-page/75">{coffee.origin}</p>
        <div className="flex gap-1 [&_svg]:transition-colors [&_svg]:duration-300 group-hover/card:[&_svg]:text-page group-hover/card:[&_span]:text-page/75">
          <FlavorDial label="Sweetness" value={coffee.sweetness} />
          <FlavorDial label="Acidity" value={coffee.acidity} />
          <FlavorDial label="Complexity" value={coffee.complexity} />
        </div>
        <p className="text-[13.5px] text-ink-2 transition-colors duration-300 group-hover/card:text-page/85">Notes: {coffee.notes.join(", ")}</p>
        <RoastBar level={coffee.roastLevel} roast={coffee.roast} className="group-hover/card:[&_p]:text-page/85" />
        <Button variant={accent} size="chip" tabIndex={-1} className="group-hover/card:bg-raised group-hover/card:text-rust" onClick={(e) => (e.stopPropagation(), open())}>
          Quick view
        </Button>
      </div>
    </article>
  )
}
