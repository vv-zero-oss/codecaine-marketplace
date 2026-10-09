import { useEffect, useState } from "react"
import { ArrowRight, Menu as MenuIcon } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Logo } from "@/components/site/logo"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MENUS, NAV_LINKS, type Menu } from "@/content/site"
import { Link, navigate } from "@/lib/router"
import { cn } from "@/lib/utils"

/** Radix's menu links are plain anchors; route the in-site ones. */
function go(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("/") || event.metaKey || event.ctrlKey) return
  event.preventDefault()
  const [path, hash] = href.split("#")
  navigate(path || "/")
  if (hash) requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }))
}

/** One mega panel: the link groups in columns, a featured card at the end. */
function MegaPanel({ menu }: { menu: Menu }) {
  return (
    <div className="grid grid-cols-[1fr_260px] overflow-hidden rounded-b-(--radius-panel) bg-raised shadow-(--shadow-lift)">
      <div className="grid grid-cols-3 gap-x-8 gap-y-6 p-6">
        {menu.groups.map((group) => (
          <div key={group.label}>
            <p className="type-eyebrow border-b border-line pb-2 text-ink-3">{group.label}</p>
            <ul className="mt-3 flex flex-col gap-1">
              {group.links.map((link) => (
                <li key={link.title}>
                  <NavigationMenuLink
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    className="-mx-2 gap-0 rounded-(--radius-field) px-2 py-1.5 transition-colors duration-(--duration-hover) hover:bg-panel focus:bg-panel"
                  >
                    <span className="text-[15px] font-medium text-ink">{link.title}</span>
                    <span className="text-[14px] text-ink-3">{link.blurb}</span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <NavigationMenuLink
        href={menu.featured.href}
        onClick={(e) => go(e, menu.featured.href)}
        className="group/feature gap-0 rounded-none bg-panel p-6 hover:bg-panel-deep focus:bg-panel-deep"
      >
        <p className="type-eyebrow text-ink-3">Featured</p>
        <span className="mt-3 grid h-28 place-items-center rounded-(--radius-card) bg-ink text-center text-lime transition-transform duration-(--duration-swap) ease-(--ease-out-strong) group-hover/feature:scale-[1.02]">
          <span className="text-[11px] tracking-[0.08em] text-night-muted uppercase">{menu.featured.kicker}</span>
        </span>
        <span className="mt-4 text-[16px] font-medium text-ink">{menu.featured.title}</span>
        <span className="mt-1 text-[14px] leading-snug text-ink-3">{menu.featured.body}</span>
      </NavigationMenuLink>
    </div>
  )
}

/** Desktop: three mega menus and two plain links. */
function DesktopNav() {
  const [value, setValue] = useState("")
  useCanvasAction("Product menu", (next) => setValue((next ?? value !== "Product") ? "Product" : ""), { on: value === "Product", group: "Header" })

  return (
    <NavigationMenu viewport={false} value={value} onValueChange={setValue} className="static hidden max-w-none flex-none lg:flex">
      <NavigationMenuList className="gap-0.5">
        {MENUS.map((menu) => (
          <NavigationMenuItem key={menu.label} value={menu.label} className="static">
            <NavigationMenuTrigger className="h-9 bg-transparent px-3 text-[15px] font-normal text-ink hover:bg-panel data-[state=open]:bg-panel">
              {menu.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="!fixed inset-x-0 top-[58px] !mt-0 !w-full !overflow-visible !rounded-none !border-0 !bg-transparent !p-0 !shadow-none">
              <Container>
                <MegaPanel menu={menu} />
              </Container>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
        {NAV_LINKS.map((link) => (
          <NavigationMenuItem key={link.label}>
            <Link href={link.href} className="inline-flex h-9 items-center rounded-(--radius-field) px-3 text-[15px] text-ink transition-colors duration-(--duration-hover) hover:bg-panel">
              {link.label}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

/** Below `lg`: the same menus in a sheet, each as an accordion. */
function MobileMenu() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { on: open, group: "Header" })
  const follow = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false)
    go(e, href)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger aria-label="Open menu" className="inline-flex size-11 items-center justify-center rounded-(--radius-field) text-ink transition-colors hover:bg-panel lg:hidden">
        <MenuIcon className="size-5" strokeWidth={1.7} />
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm gap-0 overflow-y-auto border-l border-line bg-raised p-0">
        <SheetTitle className="flex h-14 items-center border-b border-line px-5">
          <Logo />
        </SheetTitle>
        <Accordion type="single" collapsible className="px-5">
          {MENUS.map((menu) => (
            <AccordionItem key={menu.label} value={menu.label} className="border-line">
              <AccordionTrigger className="py-4 text-[17px] font-medium hover:no-underline">{menu.label}</AccordionTrigger>
              <AccordionContent>
                {menu.groups.map((group) => (
                  <div key={group.label} className="mb-4">
                    <p className="type-eyebrow text-ink-3">{group.label}</p>
                    {group.links.map((link) => (
                      <a key={link.title} href={link.href} onClick={(e) => follow(e, link.href)} className="flex min-h-11 flex-col justify-center py-1">
                        <span className="text-[15px] text-ink">{link.title}</span>
                        <span className="text-[13px] text-ink-3">{link.blurb}</span>
                      </a>
                    ))}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="flex flex-col px-5">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} onClick={(e) => follow(e, link.href)} className="flex min-h-14 items-center border-b border-line text-[17px] font-medium">
              {link.label}
            </a>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-2 p-5">
          <ButtonLink href="/pricing" variant="outline" size="lg" onClick={() => setOpen(false)}>Sign in</ButtonLink>
          <ButtonLink href="/pricing" size="lg" onClick={() => setOpen(false)}>Book a demo <ArrowRight /></ButtonLink>
        </div>
      </SheetContent>
    </Sheet>
  )
}

/**
 * The sticky bar: logo, mega menus, sign in and the one lime button. It
 * gains a hairline once the page scrolls under it.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-page/92 backdrop-blur-md transition-[border-color] duration-(--duration-hover)",
        scrolled ? "border-line" : "border-transparent",
      )}
    >
      <Container className="relative flex h-[58px] items-center gap-6">
        <Link href="/" aria-label="Kestrel home" className="shrink-0 text-ink">
          <Logo />
        </Link>
        <DesktopNav />
        <div className="ml-auto flex items-center gap-2">
          <Link href="/pricing" className="hidden h-9 items-center rounded-(--radius-field) px-3 text-[15px] text-ink transition-colors hover:bg-panel sm:inline-flex">
            Sign in
          </Link>
          <ButtonLink href="/pricing" size="sm" className="hidden px-3.5 sm:inline-flex">Book a demo</ButtonLink>
          <MobileMenu />
        </div>
      </Container>
    </header>
  )
}
