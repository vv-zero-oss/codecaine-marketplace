import { Menu } from "lucide-react"
import { useState } from "react"

import { useCanvasAction } from "@canvas/react"
import { useContactSales } from "@/components/contact-sales"
import { Button, ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Wordmark } from "@/components/ui/wordmark"
import { FEATURES, NAV } from "@/content"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

const linkStyle =
  "inline-flex h-8 items-center rounded-pill px-3.5 text-[14px] text-snow/85 transition-colors duration-(--duration-fast) hover:bg-glass hover:text-snow"

/**
 * The floating frosted nav: a graphite bar with a hairline edge and a light
 * blur, detached from the viewport by 16px — logo, links, "Contact" as a
 * ghost pill and "Sign up" as the one white pill.
 */
export function SiteHeader() {
  const contact = useContactSales()
  return (
    <header data-canvas-ignore className="pointer-events-none sticky top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <Container
        data-canvas-ignore={false}
        className="pointer-events-auto flex h-14 max-w-[1200px] items-center gap-6 rounded-nav border border-hairline-strong bg-graphite/80 px-4! shadow-float backdrop-blur-[4px] sm:px-5!"
      >
        <Link href="/" aria-label="Orra home" className="shrink-0 text-bone">
          <Wordmark />
        </Link>
        <ProductNav />
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button type="button" onClick={contact} className={cn(linkStyle, "hidden border border-hairline-strong sm:inline-flex")}>
            Contact
          </button>
          <ButtonLink href="#signup" size="sm">
            Try it free
          </ButtonLink>
          <MobileMenu />
        </div>
      </Container>
    </header>
  )
}

/** The desktop links. "Products" opens shadcn's navigation menu with the full list. */
export function ProductNav() {
  return (
    <NavigationMenu viewport={false} className="ml-6 hidden lg:flex">
      <NavigationMenuList className="gap-0">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-8 rounded-pill bg-transparent px-3.5 text-[14px] font-normal text-snow/85 hover:bg-glass hover:text-snow data-[state=open]:bg-glass">
            Product
          </NavigationMenuTrigger>
          <NavigationMenuContent className="rounded-card! border-hairline-strong! bg-graphite! p-2! shadow-float!">
            <ul className="grid w-[520px] grid-cols-2 gap-0.5">
              {FEATURES.map((feature) => (
                <li key={feature.label}>
                  <NavigationMenuLink asChild>
                    <a href={feature.href} className="flex-row items-center gap-3 rounded-ui px-3 py-2.5 text-[14px] text-bone hover:bg-glass">
                      <feature.icon className="size-4 text-ash" strokeWidth={1.6} />
                      {feature.label}
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {NAV.slice(1).map((item) => (
          <NavigationMenuItem key={item.label}>
            <Link href={item.href} className={linkStyle}>
              {item.label}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

/** Below `lg`, the links move into a sheet from the right. */
export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const contact = useContactSales()
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { on: open, group: "Header" })
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="size-11 lg:hidden" aria-label="Open menu">
          <Menu className="size-5" strokeWidth={1.6} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm border-hairline-strong bg-graphite p-0">
        <SheetHeader className="border-b border-hairline px-5 py-4">
          <SheetTitle>
            <Wordmark />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col overflow-y-auto px-5 py-4" aria-label="Mobile">
          <p className="pb-2 text-caption tracking-[0.08em] text-mist uppercase">Product</p>
          {FEATURES.slice(0, 6).map((feature) => (
            <a
              key={feature.label}
              href={feature.href}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center gap-3 text-[15px]"
            >
              <feature.icon className="size-4 text-ash" strokeWidth={1.6} />
              {feature.label}
            </a>
          ))}
          <div className="my-3 h-px bg-hairline" />
          {NAV.slice(1).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center text-[15px]"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-6 grid gap-2">
            <ButtonLink href="#signup" size="lg" onClick={() => setOpen(false)}>
              Try it free
            </ButtonLink>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                setOpen(false)
                contact()
              }}
            >
              Book a demo
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
