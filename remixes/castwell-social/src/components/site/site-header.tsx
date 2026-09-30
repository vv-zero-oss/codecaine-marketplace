import { useState } from "react"
import { ArrowRight, Menu } from "lucide-react"

import { useCanvasAction } from "@canvas/react"
import { ButtonLink } from "@/components/ui/button"
import { Wordmark } from "@/components/ui/logo-mark"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { NAV, type NavGroup } from "@/content/site"
import { Link, usePathname } from "@/lib/router"
import { cn } from "@/lib/utils"

/** A filled caret, as the menu triggers draw it. */
function Caret({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 6" className={cn("size-2.5 transition-transform duration-200 ease-out-strong", className)} aria-hidden>
      <path d="M0 0h10L5 6z" fill="currentColor" />
    </svg>
  )
}

function isGroup(item: (typeof NAV)[number]): item is NavGroup {
  return "items" in item
}

/** The centre menu: plain links and three dropdown groups. */
function DesktopNav() {
  const pathname = usePathname()
  return (
    <NavigationMenu viewport={false} className="hidden lg:flex">
      <NavigationMenuList className="gap-6">
        {NAV.map((item) =>
          isGroup(item) ? (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuTrigger
                className="h-auto gap-1.5 bg-transparent p-0 text-sm font-medium text-ink hover:bg-transparent hover:text-ink-soft focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent [&>svg.lucide]:hidden"
              >
                {item.label}
                <Caret className="group-data-[state=open]:rotate-180" />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="!mt-5 !w-[340px] !rounded-none !border-line !p-2 !shadow-menu">
                <ul className="flex flex-col">
                  {item.items.map((link) => (
                    <li key={link.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={link.href}
                          className="flex flex-col gap-1 rounded-none px-3 py-2.5 transition-colors duration-150 hover:bg-sage"
                        >
                          <span className="text-sm font-medium text-ink">{link.title}</span>
                          <span className="text-[13px] leading-snug text-muted">{link.description}</span>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-none p-0 text-sm font-medium text-ink transition-colors hover:bg-transparent hover:text-ink-soft focus:bg-transparent",
                    pathname === item.href && "underline decoration-1 underline-offset-[6px]",
                  )}
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

/** Below lg, the whole menu lives in a sheet from the right. */
function MobileMenu() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { on: open, group: "Header" })

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="grid size-[60px] place-items-center border-l border-line text-ink transition-colors hover:bg-sage lg:hidden md:size-[84px]"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm gap-0 border-line bg-page p-0 sm:max-w-sm">
        <div className="flex h-[60px] items-center border-b border-line px-5">
          <SheetTitle className="text-sm font-medium text-muted">Menu</SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
        </div>
        <nav className="flex flex-1 flex-col overflow-y-auto px-5 py-4">
          {NAV.map((item) =>
            isGroup(item) ? (
              <div key={item.label} className="border-b border-line py-4">
                <p className="mb-2 text-[13px] text-muted">{item.label}</p>
                {item.items.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center font-serif text-xl font-light text-ink"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-14 items-center border-b border-line font-serif text-xl font-light text-ink"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="grid grid-cols-2 border-t border-line">
          <ButtonLink href="/pricing" variant="ghost" size="lg" onClick={() => setOpen(false)}>
            Log in
          </ButtonLink>
          <ButtonLink href="/pricing" size="lg" onClick={() => setOpen(false)}>
            Start free <ArrowRight />
          </ButtonLink>
        </div>
      </SheetContent>
    </Sheet>
  )
}

/**
 * The top bar: wordmark, the menu, and two full-height cells on the right
 * divided by hairlines.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page/90 backdrop-blur-md">
      <div data-canvas-ignore className="flex h-[60px] items-center md:h-[84px]">
        <div className="flex flex-1 items-center pl-(--spacing-gutter)">
          <Wordmark />
        </div>
        <DesktopNav />
        <div className="flex flex-1 items-center justify-end self-stretch">
          <Link
            href="/pricing"
            className="hidden h-full items-center border-l border-line px-4 text-sm font-medium text-ink transition-colors hover:bg-sage sm:flex"
          >
            Log in
          </Link>
          <Link
            href="/pricing"
            className="hidden h-full items-center border-l border-line px-4 text-sm font-medium text-ink transition-colors hover:bg-sage sm:flex"
          >
            Start free
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
