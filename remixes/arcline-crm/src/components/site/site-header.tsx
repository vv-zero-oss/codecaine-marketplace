import { useEffect, useState } from "react"
import { Menu, Search } from "lucide-react"
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

type Menu = (typeof NAV.menus)[number]

/** One dropdown's panel: an optional intro on the left, then columns of links. */
function MegaPanel({ menu }: { menu: Menu }) {
  return (
    <div className="flex gap-10 p-6">
      {"intro" in menu && menu.intro && (
        <div className="w-56 shrink-0 rounded-[var(--radius-field)] bg-lift/60 p-4">
          <p className="text-[17px] text-fg">{menu.intro.title}</p>
          <p className="mt-2 text-[13px] leading-snug text-muted">{menu.intro.body}</p>
        </div>
      )}
      {menu.groups.map((group) => (
        <div key={group.title} className="min-w-36">
          <p className="type-eyebrow mb-3 text-[11px] text-subtle">{group.title}</p>
          <ul className="flex flex-col">
            {group.links.map((link) => (
              <li key={link}>
                <NavigationMenuLink
                  href={slug(link)}
                  className="rounded-md px-0 py-1 text-[15px] text-fg-soft hover:bg-transparent hover:text-fg focus:bg-transparent"
                >
                  {link}
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/** Below `lg`: the same menus in a sheet, each group behind an accordion row. */
function MobileMenu() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { on: open, group: "Header" })

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className="inline-flex size-11 items-center justify-center rounded-full border border-line-button text-fg transition-colors hover:bg-white/[0.06] lg:hidden"
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-full border-line bg-ink px-6 pt-20 pb-8 sm:max-w-md">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <Accordion type="single" collapsible className="w-full">
          {NAV.menus.map((menu) => (
            <AccordionItem key={menu.label} value={menu.label} className="border-line">
              <AccordionTrigger className="py-4 text-xl font-normal text-fg hover:no-underline">{menu.label}</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-6 pb-2">
                  {menu.groups.map((group) => (
                    <div key={group.title}>
                      <p className="type-eyebrow mb-2 text-[11px] text-subtle">{group.title}</p>
                      <ul className="flex flex-col gap-2">
                        {group.links.map((link) => (
                          <li key={link}>
                            <a href={slug(link)} onClick={() => setOpen(false)} className="text-[15px] text-fg-soft">
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <ul className="flex flex-col">
          {NAV.links.map((link) => (
            <li key={link} className="border-b border-line">
              <a href={slug(link)} onClick={() => setOpen(false)} className="block py-4 text-xl text-fg">
                {link}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto grid gap-3">
          <ButtonLink href="#pricing" onClick={() => setOpen(false)}>
            Start for free
          </ButtonLink>
          <ButtonLink href="#cta" variant="outline" onClick={() => setOpen(false)}>
            Book a demo
          </ButtonLink>
        </div>
      </SheetContent>
    </Sheet>
  )
}

/**
 * Sticky, and darkens to black once the page is scrolled — the only change it
 * makes, so the header reads as a layer above the content without a border.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300 ease-out-quint",
        scrolled ? "bg-void/95 backdrop-blur-md" : "bg-ink",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1920px] items-center gap-10 px-gutter md:h-[100px]">
        <Wordmark />

        <NavigationMenu viewport={false} className="hidden lg:flex">
          <NavigationMenuList className="gap-0">
            {NAV.menus.map((menu) => (
              <NavigationMenuItem key={menu.label}>
                <NavigationMenuTrigger className="h-10 bg-transparent px-4 text-[17px] font-normal text-fg-soft hover:bg-transparent hover:text-fg focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-fg data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent [&>svg]:ml-0.5 [&>svg]:size-3 [&>svg]:text-subtle">
                  {menu.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="!mt-4 !rounded-[var(--radius-card)] !border-line-strong !bg-raised !p-0 !shadow-(--shadow-menu)">
                  <MegaPanel menu={menu} />
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            {NAV.links.map((link) => (
              <NavigationMenuItem key={link}>
                <NavigationMenuLink
                  href={slug(link)}
                  className="h-10 justify-center px-4 text-[17px] text-fg-soft hover:bg-transparent hover:text-fg focus:bg-transparent"
                >
                  {link}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <button
                type="button"
                aria-label="Search"
                className="ml-2 inline-flex size-10 items-center justify-center rounded-full text-fg-soft transition-colors hover:bg-white/[0.06] hover:text-fg"
              >
                <Search className="size-[18px]" strokeWidth={1.5} />
              </button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2.5">
          <a href="#signin" className="mr-4 hidden text-[17px] text-fg-soft transition-colors hover:text-fg xl:inline">
            Sign in
          </a>
          <ButtonLink href="#cta" variant="outline" className="hidden md:inline-flex">
            Book a demo
          </ButtonLink>
          <ButtonLink href="#pricing" className="hidden sm:inline-flex">
            Start for free
          </ButtonLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

