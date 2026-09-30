import { useCanvasAction } from "@canvas/react"
import { Menu } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { useState } from "react"

import { Button, ButtonLink } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Wordmark } from "@/components/ui/wordmark"
import { NAV } from "@/content"
import { Link } from "@/lib/router"
import { ease } from "@/lib/tokens"

const TRIGGER =
  "h-8 rounded-sm bg-transparent px-2.5 text-[13px] font-normal text-cream-2 hover:bg-cream/8 hover:text-cream focus:bg-cream/8 focus:text-cream data-[state=open]:bg-cream/8 data-[state=open]:text-cream data-[state=open]:hover:bg-cream/8 data-[state=open]:focus:bg-cream/8"

/**
 * SiteHeader — the dark pill that floats over every section: the wordmark,
 * the menu (with dropdown panels), Log in and the clay "Try it on". On phones
 * the menu folds into a sheet. It drops in after the headline has written
 * itself, as it does in the reference (0.4s, 0.6s behind the sweep).
 */
export function SiteHeader({ cta = "Try it on" }: { cta?: string }) {
  const reduced = useReducedMotion()
  return (
    <motion.header
      initial={reduced ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.85, ease: ease.out }}
      className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4"
    >
      <nav
        aria-label="Main"
        className="flex h-12 w-full max-w-[640px] items-center gap-2 rounded-md bg-espresso py-1.5 pr-1.5 pl-4 shadow-pill sm:h-11"
      >
        <Link href="/" aria-label="Drape home" className="mr-2 text-cream">
          <Wordmark />
        </Link>

        <NavigationMenu className="max-md:hidden">
          <NavigationMenuList className="gap-0">
            {NAV.map((item) =>
              "items" in item ? (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuTrigger className={TRIGGER}>{item.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[380px] gap-0.5 p-1">
                      {item.items.map((entry) => (
                        <li key={entry.title}>
                          <NavigationMenuLink
                            href={entry.href}
                            className="rounded-sm px-3 py-2.5 hover:bg-cream/6 focus:bg-cream/6"
                          >
                            <span className="text-[13px] font-medium text-cream">{entry.title}</span>
                            <span className="text-[12px] text-cream-3">{entry.body}</span>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink href={item.href} className={`${TRIGGER} flex-row items-center py-0`}>
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-1">
          <ButtonLink href="#faq" variant="ghost" size="sm" className="max-sm:hidden">
            Log in
          </ButtonLink>
          <ButtonLink href="#toolkit" size="sm">
            {cta}
          </ButtonLink>
          <MobileMenu />
        </div>
      </nav>
    </motion.header>
  )
}

/** The menu on small screens, as a sheet from the top. */
export function MobileMenu() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { on: open, group: "Header" })
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="border-line-dark bg-espresso px-4 pt-16 pb-8 text-cream">
        <SheetHeader className="sr-only">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Sections of the Drape site</SheetDescription>
        </SheetHeader>
        <ul className="divide-y divide-line-dark">
          {NAV.flatMap((item): { label: string; href: string }[] =>
            "items" in item ? item.items.map((e) => ({ label: e.title, href: e.href })) : [{ label: item.label, href: item.href }],
          ).map(
            (entry) => (
              <li key={entry.label}>
                <a
                  href={entry.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center text-[15px] text-cream-2 transition-colors hover:text-cream"
                >
                  {entry.label}
                </a>
              </li>
            ),
          )}
        </ul>
        <div className="mt-6 grid grid-cols-2 gap-2">
          <ButtonLink href="#faq" variant="outline-dark" onClick={() => setOpen(false)}>
            Log in
          </ButtonLink>
          <ButtonLink href="#toolkit" onClick={() => setOpen(false)}>
            Try it on
          </ButtonLink>
        </div>
      </SheetContent>
    </Sheet>
  )
}
