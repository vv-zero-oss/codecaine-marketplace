import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { ChevronDown } from "lucide-react"
import type * as React from "react"

import { cn } from "@/lib/utils"

function NavigationMenu({ className, children, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root
      data-canvas-ignore
      className={cn("relative flex max-w-max flex-1 items-center justify-center", className)}
      {...props}
    >
      {children}
      <div className="absolute top-full left-0 flex justify-start">
        <NavigationMenuPrimitive.Viewport
          className={cn(
            "relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-top-left overflow-hidden bg-paper shadow-pop",
            "transition-[width,height,opacity,transform] duration-200 ease-out data-[state=closed]:scale-[0.97] data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100",
          )}
        />
      </div>
    </NavigationMenuPrimitive.Root>
  )
}

const NavigationMenuList = ({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) => (
  <NavigationMenuPrimitive.List className={cn("flex flex-1 list-none items-center gap-0.5", className)} {...props} />
)
const NavigationMenuItem = NavigationMenuPrimitive.Item

const triggerClass =
  "group inline-flex h-9 items-center gap-1 px-3 text-[13px] text-ink-2 transition-colors duration-150 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 data-[state=open]:text-ink"

function NavigationMenuTrigger({ className, children, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger className={cn(triggerClass, className)} {...props}>
      {children}
      <ChevronDown className="size-3 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" aria-hidden />
    </NavigationMenuPrimitive.Trigger>
  )
}

const NavigationMenuContent = ({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) => (
  <NavigationMenuPrimitive.Content className={cn("w-full", className)} {...props} />
)

const NavigationMenuLink = ({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) => (
  <NavigationMenuPrimitive.Link className={cn(triggerClass, className)} {...props} />
)

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  triggerClass,
}
