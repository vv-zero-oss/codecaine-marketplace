import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { PixelIcon, type PixelIconName } from "@/components/icons/pixel-icon"
import { PixelMark } from "@/components/marks/pixel-marks"
import { ButtonLink, RouteButton } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { nav } from "@/content"
import { cn } from "@/lib/utils"
import { Link } from "@/lib/router"

/**
 * The menubar: the mark on the left, the product menu and the pages in the
 * middle, sign in and the one ask on the right. Sticky, on paper, with a
 * hairline under it. Below `lg` it folds into a sheet.
 */
export function SiteHeader({ pathname }: { pathname: string }) {
  const [menu, setMenu] = useState(false)
  const [product, setProduct] = useState("")
  useCanvasAction("Mobile menu", (on) => setMenu(on ?? !menu), { on: menu, group: "Header" })
  useCanvasAction("Product menu", (on) => setProduct((on ?? product !== "product") ? "product" : ""), { on: product === "product", group: "Header" })

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/92 backdrop-blur-md">
      <div data-canvas-ignore className="mx-auto flex h-14 w-full max-w-page items-center gap-6 px-gutter">
        <Link href="/" aria-label="Cirrus home" className="flex min-h-11 items-center gap-2.5 outline-none focus-visible:outline-2 focus-visible:outline-cobalt">
          <PixelMark />
          <span className="label !tracking-[0.24em] text-ink">Cirrus</span>
        </Link>

        <NavigationMenu value={product} onValueChange={setProduct} viewport={false} className="hidden lg:flex">
          <NavigationMenuList className="gap-0">
            <NavigationMenuItem value="product">
              <NavigationMenuTrigger className={cn(TRIGGER, pathname === "/product" && "text-ink")}>Product</NavigationMenuTrigger>
              <NavigationMenuContent className="!mt-2 !rounded-none !border-hairline !shadow-float">
                <ul className="grid w-[34rem] grid-cols-2 gap-px bg-hairline p-px">
                  {nav.product.map((item) => (
                    <li key={item.title} className="bg-paper">
                      <MenuCard {...item} onPick={() => setProduct("")} />
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {nav.links.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink asChild active={pathname === link.href}>
                  <Link href={link.href} className={cn(TRIGGER, "data-[active=true]:text-ink")}>
                    {link.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2">
          <a href={nav.signIn.href} className={cn(TRIGGER, "hidden sm:inline-flex")}>
            {nav.signIn.title}
          </a>
          <RouteButton href={nav.start.href} size="sm" className="h-9 px-4 text-[0.875rem]">
            {nav.start.title}
          </RouteButton>
          <Sheet open={menu} onOpenChange={setMenu}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="notch focus-notch notch-sm flex size-11 items-center justify-center text-ink outline-none lg:hidden"
              >
                <PixelIcon name="bars" className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(88vw,24rem)] gap-0 border-l border-hairline p-0">
              <SheetTitle className="label border-b border-hairline px-5 py-4 font-normal text-mute">Menu</SheetTitle>
              <SheetDescription className="sr-only">Pages on the Cirrus site</SheetDescription>
              <MobileMenu pathname={pathname} onPick={() => setMenu(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

const TRIGGER =
  "label inline-flex h-9 items-center bg-transparent px-3 text-mute outline-none transition-colors duration-(--duration-hover) hover:bg-transparent hover:text-ink focus-visible:text-ink focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-ink"

/** One entry in the product menu: a pixel icon, a name and a line. */
export function MenuCard({
  title,
  href,
  icon,
  body,
  onPick,
}: {
  title: string
  href: string
  icon: string
  body: string
  onPick?: () => void
}) {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        onClick={onPick}
        className="group flex h-full flex-row items-start gap-3 !rounded-none p-4 transition-colors duration-(--duration-hover) hover:!bg-wash focus:!bg-wash"
      >
        <span className="notch notch-sm flex size-9 shrink-0 items-center justify-center bg-night text-lime">
          <PixelIcon name={icon as PixelIconName} className="size-4" />
        </span>
        <span>
          <span className="block text-[0.9375rem] text-ink">{title}</span>
          <span className="mt-1 block text-[0.8125rem] leading-[1.5] text-mute">{body}</span>
        </span>
      </Link>
    </NavigationMenuLink>
  )
}

/** The same places, stacked, for the sheet. */
function MobileMenu({ pathname, onPick }: { pathname: string; onPick: () => void }) {
  return (
    <nav className="flex flex-1 flex-col overflow-y-auto">
      <p className="label px-5 pt-5 pb-2 text-faint">Product</p>
      {nav.product.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          onClick={onPick}
          className="flex min-h-14 items-center gap-3 px-5 text-ink outline-none active:bg-wash focus-visible:bg-wash"
        >
          <PixelIcon name={item.icon as PixelIconName} className="size-4 text-cobalt" />
          {item.title}
        </Link>
      ))}
      <p className="label px-5 pt-6 pb-2 text-faint">Pages</p>
      {nav.links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onPick}
          aria-current={pathname === link.href ? "page" : undefined}
          className="flex min-h-14 items-center border-b border-hairline px-5 text-ink outline-none active:bg-wash aria-[current=page]:text-cobalt"
        >
          {link.title}
        </Link>
      ))}
      <div className="mt-auto flex flex-col gap-2 p-5">
        <ButtonLink href={nav.signIn.href} variant="paper" size="sm">
          {nav.signIn.title}
        </ButtonLink>
        <RouteButton href={nav.start.href} size="sm" onClick={onPick}>
          {nav.start.title}
        </RouteButton>
      </div>
    </nav>
  )
}
