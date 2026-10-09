import { CornerDownLeft, Dices, FlaskConical, LogIn, Palette, Presentation, Rocket } from "lucide-react"
import { useEffect } from "react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { MORE_PAGES, NAV } from "@/content"
import { navigate } from "@/lib/router"
import { applyTheme } from "@/lib/theme"
import { openDialog } from "@/lib/ui-events"

/** ⌘K / Ctrl+K: jump to a page, roll a template, open a dialog. */
export function CommandMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener("keydown", down)
    return () => window.removeEventListener("keydown", down)
  }, [open, onOpenChange])

  const run = (action: () => void) => {
    onOpenChange(false)
    setTimeout(action, 80)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Command menu" description="Jump to a page or run an action">
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results. Try “pricing”.</CommandEmpty>
        <CommandGroup heading="Go to">
          <CommandItem onSelect={() => run(() => navigate("/"))}>
            Home <CommandShortcut>H</CommandShortcut>
          </CommandItem>
          {[...NAV, ...MORE_PAGES].map((item) => (
            <CommandItem key={item.href} onSelect={() => run(() => navigate(item.href))}>
              {item.label}
              <CommandShortcut>
                <CornerDownLeft className="size-3" />
              </CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => run(() => navigate("/generator?roll=1"))}>
            <Dices /> Roll a random template
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate("/get-started"))}>
            <Rocket /> Get started free
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate("/how-it-works#try"))}>
            <FlaskConical /> Try the request simulator
          </CommandItem>
          <CommandItem onSelect={() => run(() => openDialog("demo"))}>
            <Presentation /> Book a demo
          </CommandItem>
          <CommandItem onSelect={() => run(() => openDialog("login"))}>
            <LogIn /> Log in
          </CommandItem>
          <CommandItem onSelect={() => run(() => applyTheme(null))}>
            <Palette /> Reset theme
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
