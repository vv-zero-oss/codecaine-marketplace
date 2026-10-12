import { useEffect, useState } from "react"
import { ArrowRight, Menu as MenuIcon } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { FeteMark, Logo } from "@/components/site/logo"
import { ButtonLink } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Link, usePathname } from "@/lib/router"
import { cn } from "@/lib/utils"

export const NAV = [
  { href: "/discover", label: "Discover" },
  { href: "/create", label: "Host" },
  { href: "/pricing", label: "Pricing" },
]

/**
 * The header stays out of the way, as the reference's does: the mark on the
 * left, a few quiet links, a soft "Sign in" pill. It gains a frosted ground
 * only once the page has moved under it.
 */
export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  useCanvasAction("Mobile menu", (next) => setMenu(next ?? !menu), { on: menu, group: "Header" })

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  useEffect(() => setMenu(false), [pathname])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-(--duration-swap) ease-(--ease-out-strong)",
        scrolled ? "bg-page/80 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-5">
        <Link href="/" aria-label="Fête home" className="group -m-2 flex size-11 items-center justify-center rounded-full text-ink-4 transition-colors duration-(--duration-hover) hover:text-ink">
          <FeteMark className="size-5 transition-transform duration-(--duration-scene) ease-(--ease-out-strong) group-hover:rotate-60" />
        </Link>

        <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const on = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={on ? "page" : undefined}
                    className={cn(
                      "inline-flex h-9 items-center rounded-full px-3.5 text-[15px] transition-colors duration-(--duration-hover)",
                      on ? "bg-panel text-ink" : "text-ink-3 hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/create" variant="soft" size="sm" className="hidden px-3.5 sm:inline-flex">
            Sign in
          </ButtonLink>
          <Sheet open={menu} onOpenChange={setMenu}>
            <SheetTrigger className="-mr-1.5 flex size-11 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-panel md:hidden" aria-label="Open menu">
              <MenuIcon className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(88vw,380px)] gap-0 border-l-0 bg-page p-0">
              <SheetTitle className="flex h-14 items-center px-5">
                <Logo className="text-[24px]" />
              </SheetTitle>
              <ul className="flex flex-col px-3 pt-4">
                {[{ href: "/", label: "Home" }, ...NAV, { href: "/brand", label: "Brand guidelines" }].map((item, i) => (
                  <li key={item.href} className="animate-in fade-in-0 slide-in-from-right-4 fill-mode-both" style={{ animationDelay: `${80 + i * 40}ms`, animationDuration: "420ms" }}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex min-h-14 items-center justify-between rounded-(--radius-card) px-3 text-[26px] font-semibold tracking-[-0.03em] transition-colors",
                        pathname === item.href ? "text-ink" : "text-ink-3 hover:text-ink",
                      )}
                    >
                      {item.label}
                      <ArrowRight className="size-5 opacity-40" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto p-5">
                <ButtonLink href="/create" size="lg" className="w-full">
                  Host an event
                </ButtonLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
