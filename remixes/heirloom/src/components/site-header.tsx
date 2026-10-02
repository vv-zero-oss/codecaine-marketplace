import * as Dialog from "@radix-ui/react-dialog"
import { useCanvasAction } from "@canvas/react"
import { Menu, X } from "lucide-react"
import { useState } from "react"

import { ButtonLink } from "@/components/ui/button"
import { Wordmark } from "@/components/ui/wordmark"
import { NAV } from "@/content"

export function NavLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} className="text-[13px] font-medium text-fg/90 transition-colors hover:text-fg">
      {children}
    </a>
  )
}

/** Mobile menu: a sheet from the right, registered as an editor action. */
function MobileMenu() {
  const [open, setOpen] = useState(false)
  useCanvasAction("Mobile menu", (next) => setOpen(next ?? !open), { on: open, group: "Header" })
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className="inline-flex size-11 items-center justify-center rounded-pill text-fg transition-transform duration-200 active:scale-95 md:hidden"
      >
        <Menu className="size-5" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm data-[state=open]:animate-in" />
        <Dialog.Content className="fixed top-0 right-0 z-[70] flex h-full w-[min(20rem,86vw)] flex-col gap-8 border-l border-line bg-surface p-6 shadow-card">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-xs font-medium tracking-[0.14em] text-fg-subtle uppercase">Menu</Dialog.Title>
            <Dialog.Close aria-label="Close menu" className="inline-flex size-11 items-center justify-center rounded-pill text-fg">
              <X className="size-5" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-3xl tracking-[-0.03em] text-fg"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <ButtonLink href="#join" size="lg" className="mt-auto" onClick={() => setOpen(false)}>
            Build the future
          </ButtonLink>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

/** Fixed, transparent, over whatever photograph is behind it. */
export function SiteHeader() {
  return (
    <header id="nav" className="fixed inset-x-0 top-0 z-50">
      <div data-canvas-ignore className="mx-auto flex h-16 w-full max-w-[100rem] items-center justify-between px-5 sm:h-[72px] sm:px-8">
        <Wordmark href="#top" />
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {NAV.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ButtonLink href="#join" className="hidden sm:inline-flex">
            Build the future
          </ButtonLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
