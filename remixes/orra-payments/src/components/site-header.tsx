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
import { NAV, PRODUCTS } from "@/content"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

const linkStyle =
  "inline-flex h-9 items-center rounded-md px-3 text-[14.5px] text-ink transition-colors duration-(--duration-fast) hover:bg-surface"

/** The sticky white bar: logo, five links, "Contact" and "Sign up". */
export function SiteHeader() {
  const contact = useContactSales()
  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-sm">
      <Container className="flex h-[54px] items-center gap-6">
        <Link href="/" aria-label="Orra home" className="shrink-0 text-ink">
          <Wordmark />
        </Link>
        <ProductNav />
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button type="button" onClick={contact} className={cn(linkStyle, "hidden sm:inline-flex")}>
            Contact
          </button>
          <ButtonLink href="#signup" size="sm">
            Sign up
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
    <NavigationMenu viewport={false} className="ml-14 hidden lg:flex">
      <NavigationMenuList className="gap-0">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-9 bg-transparent px-3 text-[14.5px] font-normal hover:bg-surface data-[state=open]:bg-surface">
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent className="rounded-xl! border-line! p-2! shadow-pop!">
            <ul className="grid w-[520px] grid-cols-2 gap-0.5">
              {PRODUCTS.map((product) => (
                <li key={product.label}>
                  <NavigationMenuLink asChild>
                    <a href={product.href} className="flex-row items-center gap-3 rounded-md px-3 py-2.5 text-[14.5px]">
                      <product.icon className="size-4 text-ink-2" strokeWidth={1.6} />
                      {product.label}
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
      <SheetContent side="right" className="w-full max-w-sm border-line bg-paper p-0">
        <SheetHeader className="border-b border-line px-5 py-4">
          <SheetTitle>
            <Wordmark />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col overflow-y-auto px-5 py-4" aria-label="Mobile">
          <p className="pb-2 font-mono text-eyebrow text-ink-3 uppercase">Products</p>
          {PRODUCTS.slice(0, 6).map((product) => (
            <a
              key={product.label}
              href={product.href}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center gap-3 text-[15px]"
            >
              <product.icon className="size-4 text-ink-2" strokeWidth={1.6} />
              {product.label}
            </a>
          ))}
          <div className="my-3 h-px bg-line" />
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
              Start for free
            </ButtonLink>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                setOpen(false)
                contact()
              }}
            >
              Talk to sales
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
