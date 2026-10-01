import { ChevronDown, Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { Button, ButtonLink } from "@/components/ui/button"
import { IconByName } from "@/components/ui/icon-by-name"
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Wordmark } from "@/components/ui/wordmark"
import { NAV } from "@/content"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

function MenuPanel({ group }: { group: (typeof NAV)[number] }) {
  const wide = group.items.length > 4
  return (
    <ul className={cn("grid gap-1 p-2", wide ? "w-[560px] grid-cols-2" : "w-[420px]")}>
      {group.items.map((item) => (
        <li key={item.title}>
          <a
            href="#top"
            className="group/item flex gap-3 rounded-lg p-3 transition-colors hover:bg-white/6"
          >
            <IconByName name={item.icon} className="mt-0.5 size-4 shrink-0 text-muted transition-colors group-hover/item:text-ember" />
            <span className="flex flex-col gap-0.5">
              <span className="text-[13px] font-medium text-text">{item.title}</span>
              {"body" in item ? <span className="text-xs leading-snug text-faint">{item.body}</span> : null}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function SiteHeader() {
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useCanvasAction("Mobile menu", (next) => setMenu(next ?? !menu), { on: menu, group: "Header" })
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 -mb-20 h-20 transition-[background-color,backdrop-filter] duration-300 ease-out-expo",
        scrolled ? "bg-bg/55 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div data-canvas-ignore className="mx-auto grid h-full w-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 lg:px-[42px]">
        <Link href="/" aria-label="Halo home" className="justify-self-start">
          <Wordmark />
        </Link>

        <NavigationMenu className="hidden lg:flex" viewport={false}>
          <NavigationMenuList className="gap-1">
            {NAV.map((group) => (
              <NavigationMenuItem key={group.label}>
                <NavigationMenuTrigger className="h-10 bg-transparent px-3.5 text-[14px] font-normal text-text hover:bg-white/6 focus:bg-white/6 data-[state=open]:bg-white/6">
                  {group.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-card border border-line-strong bg-surface/95 p-0 shadow-panel backdrop-blur-xl">
                  <MenuPanel group={group} />
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center col-start-3 justify-self-end gap-1.5 sm:gap-3">
          <Button variant="ghost" size="sm" className="hidden px-3 sm:inline-flex">
            Sign in
          </Button>
          <ButtonLink href="#cta" size="sm" className="px-5">
            See a demo
          </ButtonLink>
          <Sheet open={menu} onOpenChange={setMenu}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(88vw,360px)] overflow-y-auto border-line bg-bg text-text">
              <SheetHeader>
                <SheetTitle className="text-text">
                  <Wordmark />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-6 px-4 pb-8">
                {NAV.map((group) => (
                  <div key={group.label}>
                    <p className="mb-2 flex items-center gap-1 font-mono text-[11px] tracking-wider text-faint uppercase">
                      {group.label} <ChevronDown className="size-3" />
                    </p>
                    <ul className="flex flex-col">
                      {group.items.map((item) => (
                        <li key={item.title}>
                          <a href="#top" onClick={() => setMenu(false)} className="flex min-h-11 items-center gap-3 rounded-lg px-2 text-[15px] text-text hover:bg-white/6">
                            <IconByName name={item.icon} className="size-4 text-muted" />
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Button variant="outline" className="w-full">Sign in</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
