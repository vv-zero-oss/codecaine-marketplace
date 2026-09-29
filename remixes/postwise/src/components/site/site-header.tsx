import { useEffect, useState } from "react"
import { ChevronRight, Menu, Play } from "lucide-react"
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
import { pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

const slug = (s: string) => `#${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`

/** The Product dropdown: the four core features with their colour dots, a demo row, then the tools. */
function ProductPanel({ night }: { night: boolean }) {
  return (
    <div className="grid w-[640px] grid-cols-[1.1fr_1fr] gap-2 p-3">
      <ul className={cn("flex flex-col rounded-[var(--radius-card)] p-1", night ? "bg-night-raised" : "bg-card-soft")}>
        {NAV.product.features.map((item) => (
          <li key={item.title}>
            <NavigationMenuLink
              href={slug(item.title)}
              className={cn(
                "group/link flex-row items-center justify-between gap-3 rounded-[var(--radius-field)] px-3 py-2.5",
                night ? "hover:bg-night-line focus:bg-night-line" : "hover:bg-paper focus:bg-paper",
              )}
            >
              <span className="flex flex-col gap-0.5">
                <span className={cn("flex items-center gap-2 text-[14px] font-medium", night ? "text-night-fg" : "text-ink")}>
                  <span className={cn("size-2 rotate-45 rounded-[2px]", item.dot)} />
                  {item.title}
                </span>
                <span className={cn("pl-4 text-[12.5px]", night ? "text-night-muted" : "text-ink-subtle")}>{item.body}</span>
              </span>
              <ChevronRight className="size-3.5 opacity-50 transition-transform duration-(--duration-hover) group-hover/link:translate-x-0.5" />
            </NavigationMenuLink>
          </li>
        ))}
        <li className={cn("mt-1 border-t pt-1", night ? "border-night-line" : "border-line")}>
          <NavigationMenuLink
            href="#copilot"
            className={cn(
              "flex-row items-center gap-3 rounded-[var(--radius-field)] px-3 py-2.5",
              night ? "hover:bg-night-line focus:bg-night-line" : "hover:bg-paper focus:bg-paper",
            )}
          >
            <span className="relative block h-10 w-14 overflow-hidden rounded-[var(--radius-chip)]">
              <img src={pexels(6763924, 160, 110)} alt="" className="size-full object-cover" />
              <span className="absolute inset-0 grid place-items-center bg-ink/25 text-white">
                <Play className="size-3.5 fill-current" />
              </span>
            </span>
            <span className="flex flex-col gap-0.5">
              <span className={cn("text-[14px] font-medium", night ? "text-night-fg" : "text-ink")}>Watch the demo</span>
              <span className={cn("text-[12.5px]", night ? "text-night-muted" : "text-ink-subtle")}>Two minutes inside Postwise</span>
            </span>
          </NavigationMenuLink>
        </li>
      </ul>
      <ul className="flex flex-col p-1">
        {NAV.product.tools.map((item) => (
          <li key={item.title}>
            <NavigationMenuLink
              href={slug(item.title)}
              className={cn(
                "gap-0.5 rounded-[var(--radius-field)] px-3 py-2",
                night ? "hover:bg-night-raised focus:bg-night-raised" : "hover:bg-paper focus:bg-paper",
              )}
            >
              <span className={cn("text-[14px] font-medium", night ? "text-night-fg" : "text-ink")}>{item.title}</span>
              <span className={cn("text-[12.5px]", night ? "text-night-muted" : "text-ink-subtle")}>{item.body}</span>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

function WhyPanel({ night }: { night: boolean }) {
  return (
    <ul className="flex w-[280px] flex-col p-2">
      {NAV.why.links.map((item) => (
        <li key={item.title}>
          <NavigationMenuLink
            href={slug(item.title)}
            className={cn(
              "gap-0.5 rounded-[var(--radius-field)] px-3 py-2",
              night ? "hover:bg-night-raised focus:bg-night-raised" : "hover:bg-paper focus:bg-paper",
            )}
          >
            <span className={cn("text-[14px] font-medium", night ? "text-night-fg" : "text-ink")}>{item.title}</span>
            <span className={cn("text-[12.5px]", night ? "text-night-muted" : "text-ink-subtle")}>{item.body}</span>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  )
}

/** Below `lg`: the same menus in a sheet, each dropdown behind an accordion row. */
function MobileMenu({ night }: { night: boolean }) {
  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { on: open, group: "Header" })
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-[var(--radius-field)] transition-colors lg:hidden",
          night ? "text-night-fg hover:bg-night-raised" : "text-ink hover:bg-paper-deep",
        )}
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-full gap-0 border-line bg-paper px-6 pt-16 pb-8 sm:max-w-md">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="product" className="border-line">
            <AccordionTrigger className="py-4 text-[20px] font-normal text-ink hover:no-underline">Product</AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-3 pb-2">
                {[...NAV.product.features, ...NAV.product.tools].map((item) => (
                  <li key={item.title}>
                    <a href={slug(item.title)} onClick={close} className="flex items-center gap-2 text-[16px] text-ink-soft">
                      {"dot" in item && <span className={cn("size-2 rotate-45 rounded-[2px]", item.dot as string)} />}
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="why" className="border-line">
            <AccordionTrigger className="py-4 text-[20px] font-normal text-ink hover:no-underline">Why us</AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-3 pb-2">
                {NAV.why.links.map((item) => (
                  <li key={item.title}>
                    <a href={slug(item.title)} onClick={close} className="text-[16px] text-ink-soft">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <ul className="flex flex-col">
          {NAV.links.map((link) => (
            <li key={link} className="border-b border-line">
              <a href={slug(link)} onClick={close} className="block py-4 text-[20px] text-ink">
                {link}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto grid gap-3">
          <ButtonLink href="#cta" size="lg" onClick={close}>
            Get free trial
          </ButtonLink>
          <ButtonLink href="#app" size="lg" variant="outline" onClick={close}>
            Open app
          </ButtonLink>
        </div>
      </SheetContent>
    </Sheet>
  )
}

/**
 * Full width at the top of the page; once the page scrolls it condenses into
 * a floating pill — the name drops to the mark, a shadow comes up — and over
 * a dark section the pill turns dark with it. Sections opt into that with
 * `data-nav-tone="night"`.
 */
export function SiteHeader({ condenseAt = 80 }: { condenseAt?: number }) {
  const [condensed, setCondensed] = useState(false)
  const [night, setNight] = useState(false)
  const [menu, setMenu] = useState("")

  useCanvasAction("Product menu", (next) => setMenu((next ?? menu !== "product") ? "product" : ""), {
    on: menu === "product",
    group: "Header",
  })
  useCanvasAction("Floating nav", (next) => setCondensed(next ?? !condensed), { on: condensed, group: "Header" })

  useEffect(() => {
    const onScroll = () => {
      setCondensed(window.scrollY > condenseAt)
      const probe = document.elementsFromPoint(window.innerWidth / 2, 40)
      setNight(probe.some((el) => el.closest("[data-nav-tone='night']") && !el.closest("header")))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [condenseAt])

  const trigger = cn(
    "h-9 bg-transparent px-3 text-[14px] font-normal hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent [&>svg]:size-3 [&>svg]:opacity-60",
    night ? "text-night-fg hover:text-white data-[state=open]:text-white" : "text-ink-soft hover:text-ink data-[state=open]:text-ink",
  )
  const panel = cn(
    "!mt-3 !rounded-[var(--radius-panel)] !p-0 !shadow-(--shadow-float)",
    night ? "!border-night-line !bg-night-card" : "!border-line !bg-card",
  )

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-3">
      <div
        className={cn(
          "pointer-events-auto flex w-full items-center gap-4 transition-[max-width,margin,padding,background-color,box-shadow,border-radius,height] duration-(--duration-nav) ease-(--ease-out-quint)",
          condensed
            ? cn(
                "mt-3 h-[52px] max-w-[760px] rounded-[var(--radius-nav)] px-2.5 pl-4 shadow-(--shadow-nav) backdrop-blur-md",
                night ? "bg-night-card/90 shadow-[0_0_0_1px_rgb(255_255_255/0.06),0_10px_30px_-10px_rgb(0_0_0/0.6)]" : "bg-card/90",
              )
            : "mt-0 h-16 max-w-[100vw] rounded-none bg-transparent px-gutter md:h-[72px]",
        )}
      >
        <span className={cn("shrink-0", night ? "text-night-fg" : "text-ink")}>
          <Wordmark compact={condensed} />
        </span>

        <NavigationMenu viewport={false} value={menu} onValueChange={setMenu} className="hidden lg:flex">
          <NavigationMenuList className="gap-0">
            <NavigationMenuItem value="product">
              <NavigationMenuTrigger className={trigger}>{NAV.product.label}</NavigationMenuTrigger>
              <NavigationMenuContent className={panel}>
                <ProductPanel night={night} />
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem value="why">
              <NavigationMenuTrigger className={trigger}>{NAV.why.label}</NavigationMenuTrigger>
              <NavigationMenuContent className={panel}>
                <WhyPanel night={night} />
              </NavigationMenuContent>
            </NavigationMenuItem>
            {NAV.links.map((link) => (
              <NavigationMenuItem key={link}>
                <NavigationMenuLink
                  href={slug(link)}
                  className={cn(
                    "h-9 justify-center px-3 text-[14px] hover:bg-transparent focus:bg-transparent",
                    night ? "text-night-fg hover:text-white" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {link}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2">
          <ButtonLink href="#app" size="sm" variant={night ? "night" : "outline"} className="hidden sm:inline-flex">
            Open app
          </ButtonLink>
          <ButtonLink href="#cta" size="sm" variant={night ? "light" : "default"}>
            Get free trial
          </ButtonLink>
          <MobileMenu night={night} />
        </div>
      </div>
    </header>
  )
}
