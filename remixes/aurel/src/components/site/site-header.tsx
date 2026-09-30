import { ShoppingBag } from "lucide-react"

import { useBag } from "@/components/site/bag"
import { Button } from "@/components/ui/button"
import { ButtonLink } from "@/components/ui/button-link"
import { Wordmark } from "@/components/ui/wordmark"
import { cn } from "@/lib/utils"
import { Link } from "@/router"

/**
 * Two chips pinned to the top corners — MENU on the left, the fitting on
 * the right — and the wordmark between them. On the home page the wordmark
 * waits until the opening film has folded up into it (`data-hero`).
 */
export function SiteHeader({ onMenu, menuOpen = false }: { onMenu: () => void; menuOpen?: boolean }) {
  const bag = useBag()
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-gutter pt-4 sm:pt-6 lg:pt-8">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
        <Button variant="chip" size="chip-sm" onClick={onMenu} aria-expanded={menuOpen} className="pointer-events-auto justify-self-start lg:w-[130px]">
          MENU
        </Button>
        <Link
          href="/"
          aria-label="Aurel, home"
          className={cn(
            "pointer-events-auto transition-[opacity,transform] duration-500 ease-(--ease-out-soft)",
            "[[data-hero=on]_&]:pointer-events-none [[data-hero=on]_&]:translate-y-1 [[data-hero=on]_&]:opacity-0",
          )}
        >
          <Wordmark data-header-logo className="text-[26px] sm:text-[30px]" />
        </Link>
        <div className="flex items-center gap-2 justify-self-end sm:gap-3">
          <Button variant="chip" size="chip-sm" onClick={() => bag.setOpen(true)} aria-label={`Bag, ${bag.count} pieces`} className="pointer-events-auto gap-2 px-4 sm:px-5">
            <ShoppingBag className="size-4" strokeWidth={1.25} />
            <span className="tabular-nums">{bag.count}</span>
          </Button>
          <ButtonLink href="/appointments" label="Book _a_ FITTING" size="chip-sm" className="pointer-events-auto hidden md:inline-flex lg:px-10" />
        </div>
      </div>
    </header>
  )
}
