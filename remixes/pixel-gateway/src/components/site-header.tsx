import { Command, Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { CommandMenu } from "@/components/command-menu"
import { Wordmark } from "@/components/pixel/wordmark"
import { DemoDialog, LoginDialog } from "@/components/site-dialogs"
import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { MORE_PAGES, NAV } from "@/content"
import { Link, usePathname } from "@/lib/router"
import { cn } from "@/lib/utils"
import { onDialog } from "@/lib/ui-events"

export function NavLink({ href, children }: { href: string; children: string }) {
  const active = usePathname() === href
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "px-3 py-2 font-display text-[9px] uppercase tracking-wide text-fg-muted transition-colors duration-100 hover:text-fg",
        active && "text-fg underline decoration-accent decoration-4 underline-offset-8",
      )}
    >
      {children}
    </Link>
  )
}

/**
 * Fixed over the sky, translucent, with a hairline under it — the way the
 * reference's bar rides the hero and the black sections alike. The mobile menu
 * is a Sheet, and the login, demo and command dialogs live here so any button
 * on the page can open them.
 */
export function SiteHeader() {
  const [menu, setMenu] = useState(false)
  const [login, setLogin] = useState(false)
  const [demo, setDemo] = useState(false)
  const [command, setCommand] = useState(false)

  useCanvasAction("Mobile menu", (next) => setMenu(next ?? !menu), { on: menu, group: "Header" })
  useCanvasAction("Log in dialog", (next) => setLogin(next ?? !login), { on: login, group: "Header" })
  useCanvasAction("Demo dialog", (next) => setDemo(next ?? !demo), { on: demo, group: "Header" })
  useCanvasAction("Command menu", (next) => setCommand(next ?? !command), { on: command, group: "Header" })

  useEffect(
    () =>
      onDialog((name) => {
        if (name === "login") setLogin(true)
        if (name === "demo") setDemo(true)
        if (name === "command") setCommand(true)
      }),
    [],
  )

  return (
    <header
      id="nav"
      className="fixed inset-x-0 top-0 z-50 h-(--header-h) border-b-2 border-fg/15 bg-bg/60 backdrop-blur-[3px]"
    >
      <div data-canvas-ignore className="mx-auto flex h-full w-full max-w-[1600px] items-center justify-between gap-4 px-5 sm:px-6">
        <div className="flex items-center gap-6">
          <Wordmark href="/" />
          <span aria-hidden className="hidden h-(--header-h) w-0.5 bg-fg/15 lg:block" />
        </div>
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Open command menu" onClick={() => setCommand(true)}>
            <Command />
          </Button>
          <Button variant="default" size="sm" className="hidden xl:inline-flex" onClick={() => setDemo(true)}>
            Book a demo
          </Button>
          <Button variant="outline" size="sm" className="hidden md:inline-flex" onClick={() => setLogin(true)}>
            Log in
          </Button>
          <Link href="/get-started" className={buttonVariants({ variant: "accent", size: "sm" })}>
            Get started
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" onClick={() => setMenu(true)}>
            <Menu />
          </Button>
        </div>
      </div>

      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent side="right" className="w-[min(88vw,360px)] gap-0 bg-bg p-0">
          <SheetHeader className="border-b-2 border-line p-5">
            <SheetTitle className="font-display text-xs uppercase">Menu</SheetTitle>
            <SheetDescription className="sr-only">Site navigation</SheetDescription>
          </SheetHeader>
          <nav className="grid p-3" aria-label="Mobile">
            {[{ label: "Home", href: "/" }, ...NAV, ...MORE_PAGES].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenu(false)}
                className="flex min-h-14 items-center justify-between px-3 font-display text-[11px] uppercase text-fg hover:bg-surface-2"
              >
                {item.label}
                <span className="text-accent-hi">&gt;</span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto grid gap-3 p-5">
            <Link href="/get-started" onClick={() => setMenu(false)} className={buttonVariants({ variant: "accent" })}>
              Get started
            </Link>
            <Button
              variant="default"
              onClick={() => {
                setMenu(false)
                setDemo(true)
              }}
            >
              Book a demo
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setMenu(false)
                setLogin(true)
              }}
            >
              Log in
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <LoginDialog open={login} onOpenChange={setLogin} />
      <DemoDialog open={demo} onOpenChange={setDemo} />
      <CommandMenu open={command} onOpenChange={setCommand} />
    </header>
  )
}
