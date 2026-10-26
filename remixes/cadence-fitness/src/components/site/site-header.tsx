import { useEffect, useState } from "react"
import { LayoutGroup, motion, useReducedMotion } from "motion/react"
import { Menu } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { CadenceLogo, CadenceMark } from "@/components/site/logo"
import { NAV_LINKS } from "@/components/site/nav"
import { Button, ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

function useScrolled(threshold: number) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [threshold])
  return scrolled
}

function NavLinks({ className }: { className?: string }) {
  return (
    <nav aria-label="Main" className={cn("flex items-center gap-1", className)}>
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-(--radius-button) px-2.5 py-1.5 text-[15px] text-fg-2 transition-colors duration-(--duration-hover) hover:bg-white/6 hover:text-fg"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

/**
 * The header, in two states.
 *
 * At the top of the page it is one open row: the logo with its name, the
 * links centred, sign-in on the right. Once the page moves it splits into two
 * floating glass pills — the mark and the links on the left, sign-in on the
 * right — and the links glide from the centre into the left pill (a shared
 * layout transition), so the change reads as the same links moving rather than
 * as a different header.
 *
 * Below md, the links go into a sheet behind a menu button.
 */
export function SiteHeader({ docked = false }: { docked?: boolean }) {
  const scrolled = useScrolled(24) || docked
  const reduced = useReducedMotion()
  const [menu, setMenu] = useState(false)
  useCanvasAction("Mobile menu", (next) => setMenu(next ?? !menu), { on: menu, group: "Header" })

  const glide = reduced ? { duration: 0 } : { type: "spring" as const, duration: 0.5, bounce: 0.12 }
  const pill = "rounded-[16px] p-1.5 transition-[background-color,box-shadow,backdrop-filter] duration-(--duration-swap) ease-(--ease-out-strong)"
  const on = "bg-surface/72 shadow-(--shadow-glass) backdrop-blur-xl"

  return (
    <header className="fixed inset-x-0 top-(--banner-offset) z-40 pt-2.5 transition-[top] duration-(--duration-swap) ease-(--ease-out-strong)">
      <Container className="relative flex items-center justify-between">
        <LayoutGroup>
          <div className={cn("flex items-center gap-1", pill, scrolled && on)}>
            <Link href="/" aria-label="Cadence home" className="flex items-center rounded-(--radius-button) px-1 py-0.5">
              <CadenceMark />
              <motion.span
                initial={false}
                animate={{ opacity: scrolled ? 0 : 1, width: scrolled ? 0 : "auto", marginLeft: scrolled ? 0 : 10 }}
                transition={glide}
                className="overflow-hidden font-display text-[17px] font-semibold tracking-[-0.01em] whitespace-nowrap text-fg max-md:!w-auto max-md:!opacity-100 max-md:!ml-2.5"
              >
                Cadence
              </motion.span>
            </Link>
            {scrolled ? (
              <motion.div layoutId="nav-links" transition={glide} className="hidden md:block">
                <NavLinks />
              </motion.div>
            ) : null}
          </div>
          {!scrolled ? (
            <motion.div layoutId="nav-links" transition={glide} className="absolute left-1/2 hidden -translate-x-1/2 md:block">
              <NavLinks />
            </motion.div>
          ) : null}
        </LayoutGroup>

        <div className={cn("flex items-center gap-1.5", pill, scrolled && on)}>
          <ButtonLink href="#" variant="ghost" size="sm" className="hidden px-3 text-[15px] sm:inline-flex">
            Log in
          </ButtonLink>
          <ButtonLink href="#pricing" variant="light" size="sm" className="text-[15px]">
            Get started
          </ButtonLink>
          <Button variant="ghost" size="icon" className="size-11 md:hidden" aria-label="Open menu" onClick={() => setMenu(true)}>
            <Menu />
          </Button>
        </div>
      </Container>

      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent side="top" className="rounded-b-(--radius-card) px-(--spacing-gutter) pt-4 pb-6">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">Pages on this site</SheetDescription>
          <CadenceLogo className="h-11" />
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenu(false)}
                className="flex h-12 items-center border-b border-line font-display text-[22px] font-medium text-fg"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-2 pt-2">
            <ButtonLink href="#" variant="glass" size="lg" className="flex-1">
              Log in
            </ButtonLink>
            <ButtonLink href="#pricing" variant="primary" size="lg" className="flex-1" onClick={() => setMenu(false)}>
              Get started
            </ButtonLink>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
