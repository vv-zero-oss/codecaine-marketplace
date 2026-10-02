import { ChevronDown, Menu } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { useEffect, useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { Button, ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Mark, Wordmark } from "@/components/ui/wordmark"
import { cn } from "@/lib/utils"

const LINKS = [
  { label: "Product", href: "#overview", menu: true },
  { label: "Resources", href: "#how", menu: true },
  { label: "Pricing", href: "#pricing" },
  { label: "Careers", href: "#footer" },
]

/**
 * The header. At the top of the page it sits on the sky: wordmark left, a
 * frosted pill of links in the middle, log in and sign up right. Once the page
 * has scrolled, it condenses to one floating pill — the mark, the links and
 * sign up — so navigation stays within reach without a bar across the page.
 */
export function SiteHeader() {
  const [condensed, setCondensed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const update = () => setCondensed(window.scrollY > 120)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  useCanvasAction("Mobile menu", (next) => setMenuOpen(next ?? !menuOpen), { on: menuOpen, group: "Header" })
  useCanvasAction("Condensed header", (next) => setCondensed(next ?? !condensed), { on: condensed, group: "Header" })

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <Container className="relative flex h-16 items-center justify-between pt-1 sm:h-[72px]">
        <motion.a
          href="#top"
          aria-label="Meadow home"
          className="pointer-events-auto text-white"
          animate={{ opacity: condensed ? 0 : 1, y: condensed && !reduce ? -6 : 0 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          style={{ visibility: condensed ? "hidden" : "visible" }}
        >
          <Wordmark className="text-[24px]" />
        </motion.a>

        <motion.nav
          aria-label="Primary"
          className={cn(
            "pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-[14px] p-1 text-[13px] font-medium md:flex",
            condensed ? "bg-surface/95 text-ink-700 shadow-lift backdrop-blur" : "bg-white/25 text-ink-900/75 shadow-card backdrop-blur-md",
          )}
          layout={!reduce}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
        >
          {condensed ? (
            <>
              <a href="#top" aria-label="Back to top" className="flex size-9 items-center justify-center text-ink-900">
                <Mark />
              </a>
              <span aria-hidden="true" className="mx-0.5 h-4 w-px bg-ink-200" />
            </>
          ) : null}
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="inline-flex h-8 items-center gap-1 rounded-[10px] px-3 transition-colors duration-150 hover:bg-white/50 hover:text-ink-900"
            >
              {link.label}
              {link.menu ? <ChevronDown className="size-3 opacity-60" /> : null}
            </a>
          ))}
          {condensed ? (
            <ButtonLink href="#start" size="sm" className="ml-1">
              Sign up
            </ButtonLink>
          ) : null}
        </motion.nav>

        <div className={cn("pointer-events-auto hidden items-center gap-2 md:flex", condensed && "invisible")}>
          <a href="#start" className="px-2 text-[13px] font-medium text-white/95 hover:text-white">
            Log in
          </a>
          <ButtonLink href="#start" size="sm">
            Sign up
          </ButtonLink>
        </div>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="light"
              size="icon"
              aria-label="Open menu"
              className="pointer-events-auto ml-auto md:hidden"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle className="font-display text-2xl font-semibold tracking-[-0.03em]">Menu</SheetTitle>
            <SheetDescription className="sr-only">Site navigation</SheetDescription>
            <nav className="flex flex-col">
              {LINKS.map((link) => (
                <SheetClose asChild key={link.label}>
                  <a href={link.href} className="flex h-12 items-center border-b border-ink-100 text-base font-medium text-ink-900">
                    {link.label}
                  </a>
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2">
              <SheetClose asChild>
                <ButtonLink href="#start" size="lg">Sign up</ButtonLink>
              </SheetClose>
              <SheetClose asChild>
                <ButtonLink href="#start" variant="light" size="lg">Log in</ButtonLink>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  )
}
