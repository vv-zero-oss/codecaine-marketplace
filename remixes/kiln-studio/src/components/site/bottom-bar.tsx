import { LayoutGrid, List } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { useWork, type WorkView } from "@/components/work/work-state"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Link, usePathname } from "@/lib/router"
import { play } from "@/lib/sound"
import { cn } from "@/lib/utils"

const NAV = [
  { href: "/", label: "Work", match: (p: string) => p === "/" || p.startsWith("/work") },
  { href: "/studio", label: "Studio", match: (p: string) => p === "/studio" },
  { href: "/careers", label: "Careers", match: (p: string) => p === "/careers" },
]

/** The pill in the middle: three places, a white pill gliding under the one you're in. */
export function PillNav({ className }: { className?: string }) {
  const pathname = usePathname()
  const reduced = useReducedMotion()
  return (
    <nav aria-label="Main" className={cn("pointer-events-auto rounded-full bg-bone-2/88 p-1 shadow-(--shadow-pill) backdrop-blur-xl", className)}>
      <ul className="flex">
        {NAV.map((item) => {
          const on = item.match(pathname)
          return (
            <li key={item.href} className="relative">
              {on && (
                <motion.span
                  layoutId="pill-nav"
                  className="absolute inset-0 rounded-full bg-white shadow-[0_1px_2px_rgb(0_0_0/0.12)]"
                  transition={reduced ? { duration: 0 } : { type: "spring", duration: 0.45, bounce: 0.18 }}
                />
              )}
              <Link
                href={item.href}
                aria-current={on ? "page" : undefined}
                onClick={() => play("press")}
                className={cn(
                  "relative flex h-[clamp(44px,3.4vw,52px)] items-center px-[clamp(16px,2vw,30px)] text-[clamp(14px,1.05vw,17px)] font-medium tracking-[-0.02em] transition-colors duration-(--duration-hover)",
                  on ? "text-bone-ink" : "text-bone-ink/70 hover:text-bone-ink",
                )}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/** Wall or list: a dark pill with a white disc behind the one that's on. */
export function ViewSwitch({ className }: { className?: string }) {
  const { view, setView } = useWork()
  return (
    <ToggleGroup
      type="single"
      value={view}
      onValueChange={(v) => {
        if (!v) return
        play("press")
        setView(v as WorkView)
        window.scrollTo({ top: 0 })
      }}
      aria-label="View"
      className={cn("pointer-events-auto gap-0 rounded-full bg-raised/90 p-1 shadow-(--shadow-pill) backdrop-blur-xl", className)}
    >
      {(
        [
          ["grid", LayoutGrid, "Wall"],
          ["list", List, "List"],
        ] as const
      ).map(([value, Icon, label]) => (
        <ToggleGroupItem
          key={value}
          value={value}
          aria-label={label}
          className="size-[clamp(40px,3.1vw,48px)] rounded-full! px-0 text-ink-3 transition-[background-color,color] duration-(--duration-hover) ease-(--ease-out-strong) hover:bg-transparent hover:text-ink data-[state=on]:bg-bone data-[state=on]:text-bone-ink"
        >
          <Icon className="size-[18px]" strokeWidth={1.75} />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

/**
 * The bar along the bottom, fixed, as the reference has it: the view switch
 * on the left and Filter on the right while there is work on screen, and the
 * pill nav in the middle always.
 */
export function BottomBar() {
  const pathname = usePathname()
  const { onScreen, setFilterOpen, filterOpen, active } = useWork()
  const showWork = pathname === "/" && onScreen
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_auto] items-end justify-between gap-x-2 gap-y-2 px-(--spacing-gutter) pb-[max(clamp(14px,1.8vw,28px),env(safe-area-inset-bottom))] sm:flex">
      <div className={cn("transition-[opacity,transform] duration-(--duration-fade) ease-(--ease-out-strong)", showWork ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0")} inert={!showWork}>
        <ViewSwitch />
      </div>
      <PillNav className="order-last col-span-2 justify-self-center sm:order-none" />
      <div className={cn("transition-[opacity,transform] duration-(--duration-fade) ease-(--ease-out-strong)", showWork && !filterOpen ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0")} inert={!showWork || filterOpen}>
        <Button
          variant="glass"
          className="pointer-events-auto h-[clamp(44px,3.4vw,52px)] px-[clamp(16px,1.6vw,26px)] text-[clamp(14px,1.05vw,17px)]"
          onClick={() => {
            play("open")
            setFilterOpen(true)
          }}
        >
          Filter
          {active > 0 && <span className="grid size-5 place-items-center rounded-full bg-ember font-mono text-[11px] text-bone-ink tabular-nums">{active}</span>}
        </Button>
      </div>
    </div>
  )
}
