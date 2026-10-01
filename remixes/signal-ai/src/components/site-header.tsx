import { ChevronDown, Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { PRODUCTS, ProductPreview, type ProductKey } from "@/components/previews"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  triggerClass,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Wordmark } from "@/components/ui/wordmark"
import { cn } from "@/lib/utils"

const MENUS = [
  { label: "Solutions", items: ["Business", "Government", "Customer Support", "Legal", "Security"] },
  { label: "Developer", items: ["API Overview", "Pricing", "Models", "Console", "Docs", "Status"] },
  { label: "Company", items: ["About", "Careers", "News", "Contact"] },
]

/** The Products menu: a list on the left, a live picture of the highlighted product on the right. */
function ProductsMenu() {
  const [active, setActive] = useState<ProductKey>("chat")
  return (
    <div className="grid w-[min(560px,92vw)] grid-cols-[210px_1fr] gap-2 p-2">
      <ul className="flex flex-col">
        {PRODUCTS.map((p) => (
          <li key={p.key}>
            <NavigationMenuLink asChild>
              <a
                href="#products"
                onMouseEnter={() => setActive(p.key)}
                onFocus={() => setActive(p.key)}
                className={cn(
                  "flex flex-col gap-0.5 px-3 py-2.5 transition-colors duration-150",
                  active === p.key ? "bg-surface-2" : "hover:bg-surface",
                )}
              >
                <span className="text-[13px] font-medium text-ink">{p.name}</span>
                <span className="text-[11px] leading-snug text-ink-3">{p.blurb}</span>
              </a>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
      <div className="h-[300px] overflow-hidden bg-surface-2">
        <ProductPreview key={active} product={active} />
      </div>
    </div>
  )
}

function SimpleMenu({ items }: { items: string[] }) {
  return (
    <ul className="w-52 p-1.5">
      {items.map((item) => (
        <li key={item}>
          <NavigationMenuLink asChild>
            <a href="#top" className="block px-3 py-2 text-[13px] text-ink transition-colors hover:bg-surface">
              {item}
            </a>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  )
}

/** Below `md` the nav becomes a sheet. */
function MobileMenu() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { on: open, group: "Header" })
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button aria-label="Open menu" className="inline-flex size-11 items-center justify-center text-ink transition-colors hover:bg-surface md:hidden">
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="text-sm font-medium text-ink">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>
        <nav className="mt-4 flex flex-col">
          <p className="px-3 pb-1 text-[11px] tracking-wide text-ink-3 uppercase">Products</p>
          {PRODUCTS.map((p) => (
            <SheetClose asChild key={p.key}>
              <a href="#products" className="flex min-h-11 items-center px-3 text-[15px] text-ink hover:bg-surface">
                {p.name}
              </a>
            </SheetClose>
          ))}
          <div className="my-2 h-px bg-line" />
          {["Developer", "Pricing", "News"].map((l) => (
            <SheetClose asChild key={l}>
              <a href={l === "Pricing" ? "#start" : l === "News" ? "#news" : "#developers"} className="flex min-h-11 items-center px-3 text-[15px] text-ink hover:bg-surface">
                {l}
              </a>
            </SheetClose>
          ))}
        </nav>
        <ButtonLink href="#start" className="mt-auto" size="lg">
          Try for free
        </ButtonLink>
      </SheetContent>
    </Sheet>
  )
}

/** Sticky and see-through; a hairline appears once the page has scrolled. */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState("")
  useCanvasAction("Products menu", (next) => setMenu(next === false || menu === "products" ? "" : "products"), {
    on: menu === "products",
    group: "Header",
  })
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      id="nav"
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color] duration-200",
        scrolled ? "border-line bg-paper/80 backdrop-blur-xl" : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-[50px] items-center gap-6">
        <Wordmark href="#top" />
        <NavigationMenu value={menu} onValueChange={setMenu} className="hidden md:flex" delayDuration={80}>
          <NavigationMenuList>
            <NavigationMenuItem value="products">
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ProductsMenu />
              </NavigationMenuContent>
            </NavigationMenuItem>
            {MENUS.map((m) => (
              <NavigationMenuItem key={m.label} value={m.label}>
                <NavigationMenuTrigger>{m.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <SimpleMenu items={m.items} />
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuLink href="#start" className={triggerClass}>
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#news" className={triggerClass}>
                News
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center gap-2">
          <ButtonLink href="#start" variant="outline" className="hidden sm:inline-flex">
            Contact Sales
          </ButtonLink>
          <div className="inline-flex items-stretch overflow-hidden bg-ink shadow-button">
            <a href="#start" className="flex h-9 items-center whitespace-nowrap pr-3 pl-4 text-[11px] font-medium tracking-[0.06em] text-paper uppercase transition-colors hover:bg-paper/10 active:bg-paper/15">
              Try for free
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button aria-label="More ways to try" className="flex w-9 items-center justify-center border-l border-paper/20 text-paper transition-colors hover:bg-paper/10 data-[state=open]:bg-paper/10">
                  <ChevronDown className="size-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Chat on the web</DropdownMenuItem>
                <DropdownMenuItem>Download for iOS</DropdownMenuItem>
                <DropdownMenuItem>Download for Android</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <MobileMenu />
        </div>
      </Container>
    </header>
  )
}
