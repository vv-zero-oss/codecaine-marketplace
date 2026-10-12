import { Menu, ShoppingBag, UserRound } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { TruantLogo, TruantMark } from "@/components/site/logo"
import { Marquee } from "@/components/motion/marquee"
import { Link } from "@/lib/router"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

const ANNOUNCEMENT = "Free shipping over $45 · Roasted Tuesday, on your doorstep by Friday"

/** The cart's count: a tomato dot that pops when a bag goes in. */
function CartCount({ className }: { className?: string }) {
  const { count, lastAdded } = useStore()
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          key={lastAdded ? `pop-${count}` : "count"}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: [1.35, 1], opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
          className={cn("absolute -top-0.5 -right-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-tomato px-1 text-[10.5px] font-semibold leading-none text-paper tabular-nums", className)}
        >
          {count}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

/** The weight unit switch: ounces or grams, everywhere at once. */
function UnitToggle({ className }: { className?: string }) {
  const { unit, setUnit } = useStore()
  return (
    <button
      type="button"
      onClick={() => setUnit(unit === "oz" ? "g" : "oz")}
      aria-label={`Show weights in ${unit === "oz" ? "grams" : "ounces"}`}
      className={cn("type-display relative grid h-11 w-11 place-items-center overflow-hidden text-[17px] transition-colors hover:text-tomato", className)}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={unit}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="pt-[3px]"
        >
          {unit === "oz" ? "OZ" : "G"}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

function RailButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="relative grid size-11 place-items-center rounded-[var(--radius-button)] transition-[color,transform] duration-200 hover:text-tomato active:scale-95 [&_svg]:size-[22px] [&_svg]:stroke-[1.6]"
    >
      {children}
    </button>
  )
}

/**
 * The column down the right edge at desktop widths: the menu, the shipping
 * line running up the page, the bag, your subscription and the unit switch.
 */
export function SiteRail() {
  const { setDrawer } = useStore()
  return (
    <aside className="fixed inset-y-0 right-0 z-40 hidden w-[var(--spacing-rail)] flex-col items-center border-l border-line bg-rail py-5 lg:flex">
      <button
        type="button"
        onClick={() => setDrawer("menu")}
        aria-label="Open the menu"
        className="group grid size-11 place-items-center"
      >
        <span className="flex w-7 flex-col gap-[7px]">
          <span className="h-[1.5px] w-full bg-ink transition-transform duration-300 ease-[var(--ease-out-strong)] group-hover:-translate-x-1" />
          <span className="h-[1.5px] w-full bg-ink transition-transform duration-300 ease-[var(--ease-out-strong)] group-hover:translate-x-1" />
        </span>
      </button>
      <p className="mt-8 flex-1 text-[13.5px] leading-tight tracking-[-0.005em] text-ink [writing-mode:vertical-rl]">{ANNOUNCEMENT}</p>
      <div className="flex flex-col items-center gap-1.5">
        <RailButton label="Open the bag" onClick={() => setDrawer("cart")}>
          <ShoppingBag />
          <CartCount />
        </RailButton>
        <RailButton label="Your subscription" onClick={() => setDrawer("account")}>
          <UserRound />
        </RailButton>
        <UnitToggle />
      </div>
    </aside>
  )
}

/**
 * The logo, pinned top-left over everything. `mix-blend-difference` turns it
 * white over the photographs and dark over paper, with no scroll listener.
 */
export function FloatingLogo() {
  return (
    <Link href="/" aria-label="Truant Coffee Co. — home" className="fixed top-6 left-[var(--spacing-gutter)] z-40 hidden text-white mix-blend-difference transition-opacity hover:opacity-70 lg:block">
      <TruantMark className="h-7" />
    </Link>
  )
}

/** Below desktop the rail folds into a bar along the top, with the
 *  announcement drifting above it. */
export function MobileBar() {
  const { setDrawer } = useStore()
  return (
    <header className="fixed inset-x-0 top-0 z-40 lg:hidden">
      <Marquee speed={26} className="h-7 items-center bg-ink text-[12px] text-paper">
        {[0, 1].map((i) => (
          <span key={i} className="px-6 whitespace-nowrap">
            {ANNOUNCEMENT} <span className="px-4 text-tomato">✶</span>
          </span>
        ))}
      </Marquee>
      <div className="flex h-14 items-center justify-between border-b border-line bg-rail/92 px-[var(--spacing-gutter)] backdrop-blur-md">
        <Link href="/" aria-label="Truant Coffee Co. — home">
          <TruantLogo />
        </Link>
        <div className="-mr-2 flex items-center">
          <UnitToggle />
          <RailButton label="Open the bag" onClick={() => setDrawer("cart")}>
            <ShoppingBag />
            <CartCount />
          </RailButton>
          <RailButton label="Open the menu" onClick={() => setDrawer("menu")}>
            <Menu />
          </RailButton>
        </div>
      </div>
    </header>
  )
}
