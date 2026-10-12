import { useEffect, useRef, useState } from "react"
import { animate, useReducedMotion } from "motion/react"
import { Menu as MenuIcon, ShoppingBag } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { EqBars } from "@/components/site/now-playing"
import { Logo } from "@/components/site/logo"
import { Container } from "@/components/ui/container"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CoffeeBag } from "@/components/mock/coffee-bag"
import { NAV, SHOP_MENU } from "@/content/site"
import { cart, cartCount, useCart } from "@/lib/cart"
import { TRACKS, radio, useRadio } from "@/lib/radio"
import { Link, navigate, usePathname } from "@/lib/router"
import { cn } from "@/lib/utils"

/** Radix's menu links are plain anchors; route the in-site ones. */
function go(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("/") || event.metaKey || event.ctrlKey) return
  event.preventDefault()
  navigate(href)
}

const navLink =
  "type-label relative inline-flex h-9 items-center px-2.5 text-[11.5px] text-ink transition-colors duration-(--duration-hover) hover:text-rust after:absolute after:inset-x-2.5 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-(--duration-swap) after:ease-(--ease-out-strong) hover:after:scale-x-100 data-[active=true]:after:scale-x-100"

/** Desktop: Shop opens a panel; the rest are plain links. */
function DesktopNav() {
  const [value, setValue] = useState("")
  const pathname = usePathname()
  useCanvasAction("Shop menu", (next) => setValue((next ?? value !== "shop") ? "shop" : ""), { on: value === "shop", group: "Header" })

  return (
    <NavigationMenu viewport={false} value={value} onValueChange={setValue} className="hidden flex-none lg:flex">
      <NavigationMenuList className="gap-0">
        <NavigationMenuItem value="shop">
          <NavigationMenuTrigger className={cn(navLink, "bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-rust")}>
            Shop
          </NavigationMenuTrigger>
          <NavigationMenuContent className="!mt-2 !w-[520px] !rounded-(--radius-panel) !border-0 !bg-raised !p-0 !shadow-(--shadow-lift)">
            <div className="grid grid-cols-[1fr_180px]">
              <ul className="flex flex-col p-3">
                {SHOP_MENU.map((item) => (
                  <li key={item.label}>
                    <NavigationMenuLink href={item.href} onClick={(e) => go(e, item.href)} className="gap-0.5 rounded-(--radius-field) px-3 py-2.5 hover:bg-panel focus:bg-panel">
                      <span className="type-display text-[19px] leading-tight tracking-[-0.015em] text-ink">{item.label}</span>
                      <span className="text-[13px] text-ink-3">{item.blurb}</span>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
              <NavigationMenuLink href="/shop" onClick={(e) => go(e, "/shop")} className="group/feat flex flex-col items-center justify-center gap-3 rounded-none rounded-r-(--radius-panel) bg-panel p-5 hover:bg-panel-deep focus:bg-panel-deep">
                <div className="w-20 transition-transform duration-(--duration-swap) ease-(--ease-out-strong) group-hover/feat:-translate-y-1 group-hover/feat:-rotate-3">
                  <CoffeeBag artwork="honey" />
                </div>
                <span className="type-label text-center text-[10.5px] text-ink-2">This week: Side B Blend</span>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {NAV.slice(1).map((link) => (
          <NavigationMenuItem key={link.href}>
            <Link href={link.href} className={navLink} data-active={pathname === link.href}>
              {link.label}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

/** Below `lg`: big serif links in a sheet. */
function MobileMenu() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { on: open, group: "Header" })

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger aria-label="Open menu" className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-panel lg:hidden">
        <MenuIcon className="size-5" strokeWidth={1.7} />
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm gap-0 border-r border-line bg-page p-0">
        <SheetTitle className="flex h-16 items-center border-b border-line px-5">
          <Logo />
        </SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>
        <nav className="flex flex-col px-5 py-4">
          {[{ label: "Home", href: "/" }, ...NAV].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                setOpen(false)
                go(e, link.href)
              }}
              className="type-display flex min-h-16 items-center border-b border-line text-[41px] leading-none tracking-[-0.035em] text-ink transition-colors hover:text-rust"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="mt-auto p-5 text-[13px] text-ink-3">Two bars, one roastery. Open from 7 a.m.</p>
      </SheetContent>
    </Sheet>
  )
}

/** The cart count, which hops (a 1.25× spring) every time something lands in it. */
function CartButton() {
  const { lines, bump } = useCart()
  const count = cartCount(lines)
  const badge = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (!bump || reduced || !badge.current) return
    animate(badge.current, { transform: ["scale(1)", "scale(1.25)", "scale(1)"] }, { duration: 0.4, ease: [0.23, 1, 0.32, 1] })
  }, [bump, reduced])

  return (
    <button onClick={() => cart.setOpen(true)} className="type-label group inline-flex h-10 items-center gap-2 rounded-full px-3 text-[11.5px] text-ink transition-colors hover:bg-panel" aria-label={`Open cart, ${count} items`}>
      <ShoppingBag className="size-4 transition-transform duration-(--duration-hover) group-hover:-rotate-6" strokeWidth={1.7} />
      <span className="hidden sm:inline">Cart</span>
      <span ref={badge} className={cn("grid h-5 min-w-5 place-items-center rounded-full px-1 font-mono text-[11px] tabular transition-colors", count ? "bg-rust text-page" : "bg-panel-deep text-ink-2")}>
        {count}
      </span>
    </button>
  )
}

/** "On the stereo": the bar's radio, from the header. Live bars while it plays. */
function RadioButton() {
  const { playing, trackIndex } = useRadio()
  return (
    <button onClick={() => radio.toggle()} className="type-label hidden h-10 items-center gap-2 rounded-full px-3 text-[11px] text-ink-2 transition-colors hover:bg-panel hover:text-ink md:inline-flex" aria-label={playing ? "Pause the shop radio" : "Play the shop radio"}>
      <EqBars playing={playing} />
      <span className="max-w-[160px] truncate normal-case tracking-normal font-sans text-[13px]">{playing ? TRACKS[trackIndex].title : "On the stereo"}</span>
    </button>
  )
}

/**
 * A thin cream bar with a hairline under it: the wordmark, mono-caps nav,
 * the radio and the cart. Sticks to the top; picks up a soft shadow once
 * the page has scrolled under it.
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
    <header className={cn("sticky top-0 z-40 border-b border-line bg-page transition-shadow duration-(--duration-swap)", scrolled && "shadow-(--shadow-card)")}>
      <Container className="flex h-14 items-center gap-2 lg:h-[52px]">
        <MobileMenu />
        <Link href="/" className="mr-4 shrink-0 transition-opacity hover:opacity-80" aria-label="Side B Coffee — home">
          <Logo />
        </Link>
        <DesktopNav />
        <div className="ml-auto flex items-center gap-1">
          <RadioButton />
          <CartButton />
        </div>
      </Container>
    </header>
  )
}
