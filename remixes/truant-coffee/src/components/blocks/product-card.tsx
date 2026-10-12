import { useState } from "react"
import { Plus } from "lucide-react"
import { motion } from "motion/react"

import { CoffeeBag } from "@/components/mock/coffee-bag"
import { seriesById, type Coffee } from "@/content/coffees"
import { money } from "@/lib/photos"
import { useStore, useWeight } from "@/lib/store"
import { cn } from "@/lib/utils"

/**
 * A coffee on the shelf: its drawn bag on the shelf colour, which leans and
 * lifts when you point at it; the name, notes and price under it. The card
 * opens the quick view; the round + drops a 12 oz bag straight in the cart.
 */
export function ProductCard({ coffee, onOpen, className }: { coffee: Coffee; onOpen: (id: string) => void; className?: string }) {
  const { add } = useStore()
  const weight = useWeight()
  const [added, setAdded] = useState(false)
  return (
    <article className={cn("group relative", className)}>
      <button type="button" onClick={() => onOpen(coffee.id)} className="block w-full text-left" aria-label={`${coffee.name} — details`}>
        <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[var(--radius-tag)] bg-shelf transition-colors duration-300 group-hover:bg-paper-2">
          <div className="w-[52%] transition-transform duration-500 ease-[var(--ease-out-strong)] group-hover:-translate-y-2 group-hover:-rotate-3">
            <CoffeeBag coffeeId={coffee.id} weight={weight("12oz")} />
          </div>
          <div className="absolute top-3 left-3 flex gap-1.5">
            {coffee.isNew && <span className="type-display rounded-[var(--radius-tag)] bg-tomato px-1.5 pt-1 pb-0.5 text-[14px] leading-none text-paper">New</span>}
            {coffee.limited && <span className="type-display rounded-[var(--radius-tag)] bg-ink px-1.5 pt-1 pb-0.5 text-[14px] leading-none text-paper">{coffee.limited} bags</span>}
          </div>
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <p className="type-eyebrow text-ink-3">{seriesById[coffee.series].short} · {coffee.country}</p>
            <h3 className="type-display mt-1 text-d1">{coffee.name}</h3>
            <p className="mt-1 text-caption text-ink-2">{coffee.notes.join(" · ")}</p>
          </div>
          <p className="pt-4 text-[14px] tabular-nums">{money(coffee.price)}</p>
        </div>
      </button>
      <motion.button
        type="button"
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          add(coffee.id)
          setAdded(true)
          window.setTimeout(() => setAdded(false), 1300)
        }}
        aria-label={`Add ${coffee.name} to the bag`}
        className={cn(
          "absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-raised text-ink shadow-card transition-[background-color,color,opacity] duration-200 hover:bg-ink hover:text-paper md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100",
          added && "bg-ok text-paper md:opacity-100",
        )}
      >
        <motion.span key={added ? "y" : "n"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
          {added ? "✓" : <Plus className="size-4" />}
        </motion.span>
      </motion.button>
    </article>
  )
}
