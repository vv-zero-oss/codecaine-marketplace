import { useEffect, useState } from "react"
import { ArrowRight, Menu as MenuIcon } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { CairnLogo } from "@/components/site/logo"
import { SignIn } from "@/components/site/sign-in"
import { ButtonLink } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Link, usePathname } from "@/lib/router"
import { cn } from "@/lib/utils"

export const NAV = [
  { href: "/templates", label: "Templates" },
  { href: "/studio", label: "Studio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/brand", label: "Brand" },
]

/**
 * A white bar with the mark on the left and quiet grey links on the right.
 * What scrolls under it goes soft through a progressive blur — four
 * backdrop layers, each blurring more and masked higher — so the page
 * melts into the header rather than meeting a hard edge.
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
    <header className="fixed inset-x-0 top-0 z-50">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[104px]">
        <div className="progressive-blur absolute inset-0">
          <div />
          <div />
          <div />
          <div />
        </div>
        <div className="absolute inset-x-0 top-0 h-[68px] bg-page/72" />
        <div
          className={cn(
            "absolute inset-x-0 top-[68px] h-px bg-line transition-opacity duration-(--duration-swap)",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
      <div className="relative flex h-[68px] items-center justify-between gap-4 px-4 sm:px-7">
        <Link href="/" aria-label="Cairn home" className="group -m-1 rounded-[10px] p-1">
          <CairnLogo className="[&_svg]:transition-transform [&_svg]:duration-(--duration-swap) [&_svg]:ease-(--ease-out-strong) group-hover:[&_svg]:-rotate-6" />
        </Link>

        <div className="flex items-center gap-2 md:gap-6">
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {NAV.map((item) => {
                const on = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={on ? "page" : undefined}
                      className={cn(
                        "relative inline-flex h-10 items-center text-[15.5px] tracking-[-0.01em] transition-colors duration-(--duration-hover)",
                        on ? "text-ink" : "text-ink-soft hover:text-ink",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-0 bottom-1.5 h-px origin-left bg-ink transition-transform duration-(--duration-swap) ease-(--ease-out-strong)",
                          on ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <SignIn className="hidden sm:inline-flex" />
          <Sheet open={menu} onOpenChange={setMenu}>
            <SheetTrigger
              className="-mr-1.5 flex size-11 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-panel md:hidden"
              aria-label="Open menu"
            >
              <MenuIcon className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(88vw,380px)] gap-0 border-l-0 bg-page p-0">
              <SheetTitle className="flex h-[68px] items-center px-5">
                <CairnLogo />
              </SheetTitle>
              <ul className="flex flex-col px-3 pt-4">
                {[{ href: "/", label: "Home" }, ...NAV].map((item, i) => (
                  <li
                    key={item.href}
                    className="animate-in fade-in-0 slide-in-from-right-4 fill-mode-both"
                    style={{ animationDelay: `${80 + i * 40}ms`, animationDuration: "420ms" }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "type-serif flex min-h-14 items-center justify-between rounded-(--radius-card) px-3 text-h3 transition-colors",
                        pathname === item.href ? "text-ink" : "text-ink-3 hover:text-ink",
                      )}
                    >
                      {item.label}
                      <ArrowRight className="size-5 opacity-40" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3 p-5">
                <SignIn className="h-12 w-full justify-center" />
                <ButtonLink href="/studio" size="lg" className="w-full">
                  Make a map for free
                </ButtonLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
