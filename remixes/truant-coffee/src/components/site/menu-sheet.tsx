import { useState } from "react"
import { ArrowUpRight, Minus, Plus, X } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { CoffeeBag } from "@/components/mock/coffee-bag"
import { Drawer } from "@/components/site/drawer"
import { Button } from "@/components/ui/button"
import { SheetClose } from "@/components/ui/sheet"
import { coffeeById, SERIES } from "@/content/coffees"
import { money } from "@/lib/photos"
import { Link } from "@/lib/router"
import { useStore, useWeight } from "@/lib/store"

const SHOP = [
  { label: "All coffees", href: "/shop" },
  ...SERIES.map((s) => ({ label: s.name, href: `/shop?series=${s.id}` })),
  { label: "Subscriptions", href: "/subscribe" },
]

const ROWS: { label: string; href?: string; children?: { label: string; href: string }[] }[] = [
  { label: "Field notes", href: "/field-notes" },
  { label: "Build a subscription", href: "/subscribe" },
  { label: "Producers", href: "/field-notes#producers" },
  {
    label: "Our series",
    children: SERIES.map((s) => ({ label: `${s.short} — ${s.line}`, href: `/shop?series=${s.id}` })),
  },
  {
    label: "Wholesale",
    children: [
      { label: "Equipment and dial-in visits", href: "mailto:wholesale@truant.coffee?subject=Dial-in%20visit" },
      { label: "Sell Truant in your shop", href: "mailto:wholesale@truant.coffee?subject=Stockist" },
      { label: "Office coffee programme", href: "mailto:wholesale@truant.coffee?subject=Office" },
    ],
  },
  { label: "Brand guidelines", href: "/brand" },
]

/** A row in the menu's lower list: a link, or a heading that opens on a
 *  plus and closes on a minus. */
function MenuRow({ row }: { row: (typeof ROWS)[number] }) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  if (!row.children)
    return (
      <SheetClose asChild>
        <Link href={row.href} className="type-eyebrow flex h-11 items-center justify-between border-b border-line text-ink transition-colors hover:text-tomato">
          {row.label}
        </Link>
      </SheetClose>
    )
  return (
    <div className="border-b border-line">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="type-eyebrow flex h-11 w-full items-center justify-between text-ink transition-colors hover:text-tomato">
        {row.label}
        {open ? <Minus className="size-4 stroke-[1.4]" /> : <Plus className="size-4 stroke-[1.4]" />}
      </button>
      <motion.ul
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={reduced ? { duration: 0 } : { duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
        className="overflow-hidden"
      >
        {row.children.map((child) => (
          <li key={child.label}>
            <SheetClose asChild>
              <Link href={child.href} className="flex items-center gap-1 py-1.5 text-[13px] text-ink-2 transition-colors hover:text-ink">
                {child.label}
                {child.href.startsWith("mailto:") && <ArrowUpRight className="size-3" />}
              </Link>
            </SheetClose>
          </li>
        ))}
        <li className="h-3" />
      </motion.ul>
    </div>
  )
}

/**
 * The menu: the shop's shelves as big links, the rest of the site as a list
 * of hairline rows (two of them open), and this week's new coffee on a shelf
 * at the foot with its own add-to-bag.
 */
export function MenuSheet() {
  const { add, setDrawer } = useStore()
  const weight = useWeight()
  const featured = coffeeById["field-trip-10"]
  const [added, setAdded] = useState(false)

  return (
    <Drawer id="menu" title="Menu" description="Shop, field notes, subscriptions and the rest of the site">
      <div className="flex h-full flex-col overflow-y-auto px-7 pt-6 pb-7" data-lenis-prevent>
        <div className="flex items-center justify-between">
          <span className="type-eyebrow text-ink-3">Shop</span>
          <SheetClose className="-mr-2 grid size-11 place-items-center transition-transform hover:rotate-90" aria-label="Close the menu">
            <X className="size-5 stroke-[1.4]" />
          </SheetClose>
        </div>
        <nav className="mt-3 flex flex-col">
          {SHOP.map((item, i) => (
            <SheetClose asChild key={item.href}>
              <Link href={item.href} className="group flex items-baseline gap-3 py-[3px] text-[20.35px] leading-[1.25] tracking-[-0.02em] text-ink">
                <motion.span initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.035, duration: 0.4, ease: [0.23, 1, 0.32, 1] }} className="transition-transform duration-200 group-hover:translate-x-1.5">
                  {item.label}
                </motion.span>
              </Link>
            </SheetClose>
          ))}
        </nav>
        <div className="mt-8 border-t border-line">
          {ROWS.map((row) => (
            <MenuRow key={row.label} row={row} />
          ))}
          <a href="mailto:hello@truant.coffee" className="type-eyebrow flex h-11 items-center border-b border-line text-ink transition-colors hover:text-tomato">
            Contact
          </a>
        </div>

        <div className="mt-auto pt-8">
          <div className="rounded-[var(--radius-card)] bg-shelf p-5">
            <div className="flex items-center justify-between">
              <span className="type-eyebrow text-tomato">New · {featured.limited} bags</span>
              <span className="text-caption text-ink-3">{featured.country}</span>
            </div>
            <div className="mx-auto w-[46%] py-3">
              <CoffeeBag coffeeId={featured.id} weight={weight("12oz")} tilt={-3} />
            </div>
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="type-display text-d1">{featured.name}</p>
                <p className="text-caption text-ink-3">{featured.notes.join(" · ")}</p>
              </div>
              <div className="text-right">
                <p className="text-[13px] tabular-nums">{money(featured.price)}</p>
                <Button
                  size="sm"
                  className="mt-1.5"
                  onClick={() => {
                    add(featured.id)
                    setAdded(true)
                    window.setTimeout(() => {
                      setAdded(false)
                      setDrawer("cart")
                    }, 650)
                  }}
                >
                  {added ? "Added ✓" : "Add"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  )
}
