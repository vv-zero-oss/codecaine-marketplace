import { useEffect, useState } from "react"
import { ArrowUpRight, CreditCard, Landmark, Menu, Plug, Receipt, ShieldCheck, TrendingUp, type LucideIcon } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

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
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Wordmark } from "@/components/ui/wordmark"
import { NAV } from "@/content"
import { cn } from "@/lib/utils"

const slug = (s: string) => `#${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`

const ICONS: Record<string, LucideIcon> = {
  landmark: Landmark,
  card: CreditCard,
  trend: TrendingUp,
  receipt: Receipt,
  shield: ShieldCheck,
  plug: Plug,
}

/** The Product dropdown: six products in two columns, each with its icon on a paper tile. */
function ProductPanel() {
  return (
    <div className="grid w-[600px] grid-cols-2 gap-1 p-3">
      {NAV.product.items.map((item) => {
        const Icon = ICONS[item.icon] ?? Landmark
        return (
          <NavigationMenuLink
            key={item.title}
            href={slug(item.title)}
            className="group/link flex-row items-start gap-3 rounded-none p-3 hover:bg-paper-deep focus:bg-paper-deep"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-none bg-paper-deep text-ink transition-colors duration-(--duration-hover) group-hover/link:bg-ink group-hover/link:text-pink">
              <Icon className="size-4" strokeWidth={1.7} />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-[14px] font-medium text-ink">{item.title}</span>
              <span className="text-[12.5px] leading-snug text-ink-muted">{item.body}</span>
            </span>
          </NavigationMenuLink>
        )
      })}
    </div>
  )
}

function CompanyPanel() {
  return (
    <ul className="flex w-[260px] flex-col p-2">
      {NAV.company.items.map((item) => (
        <li key={item.title}>
          <NavigationMenuLink href={slug(item.title)} className="gap-0.5 rounded-none px-3 py-2 hover:bg-paper-deep focus:bg-paper-deep">
            <span className="text-[14px] font-medium text-ink">{item.title}</span>
            <span className="text-[12.5px] text-ink-muted">{item.body}</span>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  )
}

/** Below `lg`: the same menus in a sheet. */
function MobileMenu() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { on: open, group: "Header" })
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger aria-label="Open menu" className="inline-flex size-11 items-center justify-center rounded-none text-pink transition-colors hover:bg-night-card lg:hidden">
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-full gap-0 border-0 bg-night px-6 pt-16 pb-8 text-pink sm:max-w-md [&>button]:text-pink">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <Accordion type="single" collapsible className="w-full">
          {[NAV.product, NAV.company].map((menu) => (
            <AccordionItem key={menu.label} value={menu.label} className="border-night-line">
              <AccordionTrigger className="type-caps py-4 text-[24px] text-pink hover:no-underline [&>svg]:text-pink">{menu.label}</AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-3 pb-2">
                  {menu.items.map((item) => (
                    <li key={item.title}>
                      <a href={slug(item.title)} onClick={close} className="text-[16px] text-night-fg">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <ul className="flex flex-col">
          {NAV.links.map((link) => (
            <li key={link} className="border-b border-night-line">
              <a href={slug(link)} onClick={close} className="type-caps block py-4 text-[24px] text-pink">
                {link}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto grid gap-3">
          <ButtonLink href="#start" size="lg" variant="pink" onClick={close}>
            {NAV.cta}
          </ButtonLink>
          <ButtonLink href="#login" size="lg" variant="ghostNight" onClick={close}>
            {NAV.login}
          </ButtonLink>
        </div>
      </SheetContent>
    </Sheet>
  )
}

/**
 * Oxblood, sticky, the name and every link in pink wide caps; a hairline
 * comes up under it once the page scrolls.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState("")
  useCanvasAction("Product menu", (next) => setMenu((next ?? menu !== "product") ? "product" : ""), { on: menu === "product", group: "Header" })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const trigger =
    "type-caps h-9 bg-transparent px-2.5 text-[15px] text-pink hover:bg-transparent hover:text-pink-hover focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-pink-hover data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent [&>svg]:size-3 [&>svg]:opacity-70"
  const panel = "!mt-3 !rounded-none !border-0 !bg-paper !p-0 !shadow-(--shadow-float)"

  return (
    <header className={cn("sticky top-0 z-40 bg-night transition-[box-shadow] duration-(--duration-swap)", scrolled && "shadow-[0_1px_0_var(--color-night-line)]")}>
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center gap-3 px-gutter md:h-[76px] md:gap-6">
        <span className="text-pink">
          <Wordmark />
        </span>
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <NavigationMenu viewport={false} value={menu} onValueChange={setMenu} className="hidden lg:flex">
            <NavigationMenuList className="gap-0">
              <NavigationMenuItem value="product">
                <NavigationMenuTrigger className={trigger}>{NAV.product.label}</NavigationMenuTrigger>
                <NavigationMenuContent className={panel}>
                  <ProductPanel />
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem value="company">
                <NavigationMenuTrigger className={trigger}>{NAV.company.label}</NavigationMenuTrigger>
                <NavigationMenuContent className={panel}>
                  <CompanyPanel />
                </NavigationMenuContent>
              </NavigationMenuItem>
              {NAV.links.map((link) => (
                <NavigationMenuItem key={link}>
                  <NavigationMenuLink href={slug(link)} className="type-caps h-9 justify-center px-2.5 text-[15px] text-pink hover:bg-transparent hover:text-pink-hover focus:bg-transparent">
                    {link}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuLink href="#login" className="type-caps h-9 flex-row items-center gap-1 px-2.5 text-[15px] text-pink hover:bg-transparent hover:text-pink-hover focus:bg-transparent">
                  {NAV.login} <ArrowUpRight className="size-3.5 text-pink" />
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ButtonLink href="#start" variant="pink" size="sm" className="ml-1 h-10 px-3 sm:ml-2 sm:px-4">
            <span className="sm:hidden">Open account</span>
            <span className="hidden sm:inline">{NAV.cta}</span>
          </ButtonLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
