import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { Button, ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Logo } from "@/components/ui/logo"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { BRAND, HERO, NAV } from "@/content"
import { cn } from "@/lib/utils"

/** A top-level link; the current page carries a short underline. */
export function NavLink({ href, label, active = false }: { href: string; label: string; active?: boolean }) {
  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative py-1 text-[0.8125rem] transition-colors duration-(--duration-hover) ease-out",
        active ? "text-ink after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-ink" : "text-muted hover:text-ink",
      )}
    >
      {label}
    </a>
  )
}

/** The mark and links on the left, the sign-up pill on the right; a sheet menu below `md`. */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setMenuOpen(next ?? !menuOpen), { on: menuOpen, group: "Header" })

  return (
    <header id="nav" className="relative z-40">
      <Container className="flex h-[4.5rem] items-center justify-between">
        <div className="flex items-center gap-10">
          <Logo name={BRAND} />
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
            {NAV.map((item, i) => (
              <NavLink key={item.href} href={item.href} label={item.label} active={i === 0} />
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ButtonLink href="#get-started" size="sm" className="hidden sm:inline-flex">
            {HERO.cta}
          </ButtonLink>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="size-11 px-0 md:hidden" aria-label="Open menu">
                <Menu className="size-5!" />
              </Button>
            </SheetTrigger>
            <SheetContent className="rounded-b-[28px] px-4 pb-8 shadow-widget">
              <div className="flex h-[4.5rem] items-center justify-between">
                <SheetTitle asChild>
                  <span>
                    <Logo name={BRAND} />
                  </span>
                </SheetTitle>
                <SheetClose asChild>
                  <Button variant="ghost" className="size-11 px-0" aria-label="Close menu">
                    <X className="size-5!" />
                  </Button>
                </SheetClose>
              </div>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              <nav className="flex flex-col" aria-label="Mobile">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-12 items-center border-b border-hairline font-serif text-2xl text-ink"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <ButtonLink href="#get-started" size="lg" onClick={() => setMenuOpen(false)}>
                {HERO.cta}
              </ButtonLink>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}
