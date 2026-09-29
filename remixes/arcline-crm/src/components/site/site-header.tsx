import { useEffect, useState } from "react"
import { ArrowRight, Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Isocon, type IsoconName } from "@/components/icons/isocon"
import GlideMenu from "@/components/primitives/GlideMenu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ButtonLink } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Wordmark } from "@/components/ui/wordmark"
import { ANNOUNCEMENT, NAV } from "@/content/site"
import { Link, usePathname } from "@/lib/router"
import { cn } from "@/lib/utils"

type Menu = (typeof NAV.menus)[number]

/** The black strip above the header. Dismissed for the visit with its ×. */
function AnnouncementBar() {
  const [open, setOpen] = useState(true)
  useCanvasAction("Announcement", (next) => setOpen(next ?? !open), { on: open, group: "Header" })
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
          className="overflow-hidden bg-void"
        >
          <div className="relative flex h-10 items-center justify-center px-12 text-[13px] text-ink md:h-12">
            <Link href={ANNOUNCEMENT.link} className="group/link inline-flex items-center gap-1.5 truncate">
              <span className="link-draw truncate">{ANNOUNCEMENT.text}</span>
              <ArrowRight className="size-3.5 shrink-0 transition-transform duration-200 group-hover/link:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Dismiss announcement"
              className="absolute right-3 flex size-8 items-center justify-center rounded-control text-ink-2 transition-colors hover:bg-hover-2 hover:text-ink"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** A dropdown's panel: columns of icon rows under one gliding highlight, and an aside. */
function MegaPanel({ menu }: { menu: Menu }) {
  return (
    <div className="flex w-max gap-2 p-2">
      {menu.columns.map((col) => (
        <GlideMenu key={col.title} className="w-[260px]" highlightClassName="inset-x-0 rounded-card bg-hover">
          <p className="px-3 pt-2 pb-1 text-caption text-ink-3">{col.title}</p>
          {col.items.map((item) => (
            <NavigationMenuLink key={item.title} asChild>
              <Link
                href={item.href}
                data-menu-row
                className="group/iso relative z-10 flex items-start gap-3 rounded-card p-3 outline-none hover:bg-transparent focus:bg-transparent"
              >
                <span className="mt-0.5 w-7 shrink-0 text-ink-2 transition-colors duration-200 group-hover/iso:text-accent-ink">
                  <Isocon name={item.icon as IsoconName} draw />
                </span>
                <span>
                  <span className="block text-base font-medium text-ink">{item.title}</span>
                  <span className="block text-sm text-ink-2">{item.body}</span>
                </span>
              </Link>
            </NavigationMenuLink>
          ))}
        </GlideMenu>
      ))}
      {"aside" in menu && menu.aside && (
        <div className="w-[240px] rounded-card bg-inset p-3">
          <p className="pb-2 text-caption text-ink-3">{menu.aside.title}</p>
          {menu.aside.items.map((a) => (
            <NavigationMenuLink key={a.title} asChild>
              <Link href={a.href} className="group/link block rounded-control py-2 outline-none">
                <span className="link-draw text-sm text-ink">{a.title}</span>
                <span className="block text-caption text-ink-3">{a.body}</span>
              </Link>
            </NavigationMenuLink>
          ))}
        </div>
      )}
    </div>
  )
}

/** Below `lg`: the same links in a full-screen sheet, menus behind accordion rows. */
function MobileMenu() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { on: open, group: "Header" })
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className="inline-flex size-11 items-center justify-center rounded-button text-ink transition-colors hover:bg-hover-2 lg:hidden"
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="top" showCloseButton={false} className="h-dvh gap-0 border-0 bg-page p-0">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <div className="flex h-[60px] items-center justify-between border-b border-line-strong px-5">
          <Wordmark onClick={close} />
          <SheetClose aria-label="Close menu" className="flex size-11 items-center justify-center rounded-button text-ink hover:bg-hover-2">
            <X className="size-5" />
          </SheetClose>
        </div>
        <div className="flex-1 overflow-y-auto px-5">
          <Accordion type="single" collapsible>
            {NAV.menus.map((menu) => (
              <AccordionItem key={menu.label} value={menu.label} className="border-line-strong">
                <AccordionTrigger className="h-16 items-center text-lead font-medium text-ink hover:no-underline">{menu.label}</AccordionTrigger>
                <AccordionContent className="pb-4">
                  {menu.columns.flatMap((c) => c.items).map((item) => (
                    <Link key={item.title} href={item.href} onClick={close} className="flex items-center gap-3 py-2.5">
                      <span className="w-6 text-ink-2">
                        <Isocon name={item.icon as IsoconName} />
                      </span>
                      <span className="text-base text-ink-soft">{item.title}</span>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {NAV.links.map((l) => (
            <Link key={l.label} href={l.href} onClick={close} className="flex h-16 items-center border-b border-line-strong text-lead font-medium text-ink">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="grid gap-2 border-t border-line-strong p-5">
          <ButtonLink href="/pricing" variant="primary" size="lg" onClick={close}>
            Start for free
          </ButtonLink>
          <ButtonLink href="/pricing" size="lg" onClick={close}>
            Sign in
          </ButtonLink>
        </div>
      </SheetContent>
    </Sheet>
  )
}

/**
 * Sticky, frosted, and hairline-ruled. Menus open on hover; the panel's
 * rows share one highlight that glides to whatever is under the pointer.
 */
export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <AnnouncementBar />
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-line-strong backdrop-blur-[12px] transition-colors duration-[250ms]",
          scrolled ? "bg-page/95" : "bg-page",
        )}
      >
        <div className="mx-auto flex h-[60px] max-w-[1440px] items-center gap-9 px-5 md:h-[68px] md:px-8">
          <Wordmark />
          <NavigationMenu viewport={false} className="hidden lg:flex">
            <NavigationMenuList className="gap-0.5">
              {NAV.menus.map((menu) => (
                <NavigationMenuItem key={menu.label}>
                  <NavigationMenuTrigger className="h-8 rounded-button bg-transparent px-2.5 text-[15px] font-medium text-ink-soft transition-colors duration-300 hover:bg-hover-2 hover:text-ink hover:duration-[50ms] focus:bg-hover-2 data-[state=open]:bg-hover-2 data-[state=open]:text-ink data-[state=open]:hover:bg-hover-2 data-[state=open]:focus:bg-hover-2 [&>svg]:size-3 [&>svg]:text-ink-3">
                    {menu.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!mt-3 !rounded-window !border-0 !bg-surface !p-0 !shadow-overlay data-[motion^=from-]:!blur-0 data-[motion^=to-]:blur-[8px]">
                    <MegaPanel menu={menu} />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              {NAV.links.map((l) => (
                <NavigationMenuItem key={l.label}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={l.href}
                      className={cn(
                        "flex h-8 items-center rounded-button px-2.5 text-[15px] font-medium transition-colors duration-300 hover:bg-hover-2 hover:text-ink hover:duration-[50ms]",
                        pathname === l.href ? "text-ink" : "text-ink-soft",
                      )}
                    >
                      {l.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="ml-auto flex items-center gap-2">
            <ButtonLink href="/pricing" className="hidden sm:inline-flex">
              Sign in
            </ButtonLink>
            <ButtonLink href="/pricing" variant="primary" className="hidden sm:inline-flex">
              Start for free
            </ButtonLink>
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  )
}
