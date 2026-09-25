import { Menu } from "lucide-react"
import { useEffect, useState } from "react"

import { Wordmark } from "@/components/blocks/wordmark"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { brand, nav } from "@/content"
import { cn } from "@/lib/utils"

const linkClass =
  "inline-flex h-8 flex-row items-center rounded-full px-3 py-0 text-[13px] font-medium text-ink-2 transition-colors duration-150 hover:bg-stone hover:text-ink"

/** The top bar: wordmark, a product menu, three links, and the three actions. */
export function Navbar() {
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
        "sticky top-0 z-40 transition-[background-color,box-shadow] duration-200",
        scrolled ? "bg-surface/85 shadow-[0_1px_0_var(--line)] backdrop-blur-md" : "bg-surface",
      )}
    >
      <div className="mx-auto flex h-16 max-w-(--spacing-frame) items-center justify-between gap-6 px-(--spacing-gutter) lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <a href="#" className="rounded-md" aria-label={`${brand.name} home`}>
          <Wordmark name={brand.name} />
        </a>

        <NavigationMenu className="hidden lg:flex" viewport={false}>
          <NavigationMenuList className="gap-0.5">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-8 rounded-full bg-transparent px-3 text-[13px] font-medium text-ink-2 hover:bg-stone data-[state=open]:bg-stone">
                Product
              </NavigationMenuTrigger>
              <NavigationMenuContent className="origin-top rounded-panel! border-line! shadow-float!">
                <ul className="grid w-[26rem] grid-cols-2 gap-1 p-1">
                  {nav.product.map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink href={item.href} className="rounded-md p-3 hover:bg-stone-2">
                        <span className="text-[13px] font-medium text-ink">{item.title}</span>
                        <span className="text-[12px] leading-snug text-ink-soft">{item.description}</span>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {nav.links.map((link) => (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink href={link.href} className={linkClass}>
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center justify-end gap-1.5">
          <a href="#" className={cn(linkClass, "hidden sm:inline-flex")}>
            {nav.login}
          </a>
          <Button asChild variant="pill-outline" size="nav" className="hidden sm:inline-flex">
            <a href="#">{nav.demo}</a>
          </Button>
          <Button asChild variant="pill" size="nav">
            <a href="#">{nav.signup}</a>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

function MobileMenu() {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="pill-ghost" size="icon" className="size-11 lg:hidden" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(22rem,88vw)] gap-0 bg-canvas p-0">
        <SheetTitle className="flex h-16 items-center px-5">
          <Wordmark name={brand.name} />
        </SheetTitle>
        <nav className="flex flex-col px-3 pb-6">
          <p className="px-2 pt-2 pb-1 text-[11px] font-medium tracking-[0.08em] text-ink-faint uppercase">Product</p>
          {nav.product.map((item) => (
            <a
              key={item.title}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex min-h-11 flex-col justify-center rounded-md px-2 py-2 hover:bg-stone"
            >
              <span className="text-[15px] font-medium">{item.title}</span>
              <span className="text-[13px] text-ink-soft">{item.description}</span>
            </a>
          ))}
          <div className="my-3 h-px bg-line" />
          {[...nav.links, { label: nav.login, href: "#" }].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center rounded-md px-2 text-[15px] font-medium hover:bg-stone"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 grid gap-2 px-2">
            <Button asChild variant="pill-outline" size="cta">
              <a href="#">{nav.demo}</a>
            </Button>
            <Button asChild variant="pill" size="cta">
              <a href="#">{nav.signup}</a>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
