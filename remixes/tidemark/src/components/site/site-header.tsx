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
            className="group/link flex-row items-start gap-3 rounded-[var(--radius-field)] p-3 hover:bg-paper focus:bg-paper"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-[8px] bg-paper-deep text-forest transition-colors duration-(--duration-hover) group-hover/link:bg-forest group-hover/link:text-lime">
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
          <NavigationMenuLink href={slug(item.title)} className="gap-0.5 rounded-[var(--radius-field)] px-3 py-2 hover:bg-paper focus:bg-paper">
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
      <SheetTrigger aria-label="Open menu" className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-paper-deep lg:hidden">
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-full gap-0 border-line bg-paper px-6 pt-16 pb-8 sm:max-w-md">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <Accordion type="single" collapsible className="w-full">
          {[NAV.product, NAV.company].map((menu) => (
            <AccordionItem key={menu.label} value={menu.label} className="border-line">
              <AccordionTrigger className="py-4 font-serif text-[26px] font-normal text-ink hover:no-underline">{menu.label}</AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-3 pb-2">
                  {menu.items.map((item) => (
                    <li key={item.title}>
                      <a href={slug(item.title)} onClick={close} className="text-[16px] text-ink-soft">
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
            <li key={link} className="border-b border-line">
              <a href={slug(link)} onClick={close} className="block py-4 font-serif text-[26px] text-ink">
                {link}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto grid gap-3">
          <ButtonLink href="#start" size="lg" onClick={close}>
            {NAV.cta}
          </ButtonLink>
          <ButtonLink href="#login" size="lg" variant="outline" onClick={close}>
            {NAV.login}
          </ButtonLink>
        </div>
      </SheetContent>
    </Sheet>
  )
}

/**
 * Sticky; once the page scrolls, a hairline and a frosted paper come up
 * under it so it reads as a layer without shouting.
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
    "h-9 bg-transparent px-3 text-[14.5px] font-normal text-ink-soft hover:bg-transparent hover:text-ink focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-ink data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent [&>svg]:size-3 [&>svg]:opacity-60"
  const panel = "!mt-3 !rounded-[var(--radius-card)] !border-line !bg-card !p-0 !shadow-(--shadow-float)"

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color] duration-(--duration-swap) ease-(--ease-out-strong)",
        scrolled ? "border-line bg-paper/85 backdrop-blur-md" : "border-transparent bg-paper",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center gap-8 px-gutter md:h-[72px]">
        <span className="text-ink">
          <Wordmark />
        </span>
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
                <NavigationMenuLink href={slug(link)} className="h-9 justify-center px-3 text-[14.5px] text-ink-soft hover:bg-transparent hover:text-ink focus:bg-transparent">
                  {link}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
          <a href="#login" className="hidden items-center gap-1 px-2 text-[14.5px] text-ink-soft transition-colors hover:text-ink sm:inline-flex">
            {NAV.login} <ArrowUpRight className="size-3.5" />
          </a>
          <ButtonLink href="#start" size="sm" className="h-10 px-4">
            {NAV.cta}
          </ButtonLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
