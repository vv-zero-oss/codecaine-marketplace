import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Logo } from "@/components/site/logo"
import { StripeMenu } from "@/components/site/stripe-menu"
import { Link, usePathname } from "@/lib/router"
import { cn } from "@/lib/utils"

/** The pages, in the order the story goes. */
export const NAV = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/aircraft", label: "Aircraft" },
  { href: "/routes", label: "Routes" },
  { href: "/brand", label: "Brand" },
]

type Tone = "light" | "dark"

/**
 * Which colour the header should be: the tone of the section under its
 * middle. Sections say what they are with `data-header-tone="light"` (light
 * type over a photo or the sky) or `"dark"` (ink on cream).
 */
function useToneUnderHeader(): Tone {
  const [tone, setTone] = useState<Tone>("light")
  useEffect(() => {
    const update = () => {
      const stack = document.elementsFromPoint(window.innerWidth / 2, 30)
      const section = stack.map((el) => el.closest<HTMLElement>("[data-header-tone]")).find(Boolean)
      setTone((section?.dataset.headerTone as Tone) ?? "dark")
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])
  return tone
}

/** Hidden while reading downward, back as soon as the reader scrolls up. */
function useTucked() {
  const [tucked, setTucked] = useState(false)
  useEffect(() => {
    let last = window.scrollY
    const update = () => {
      const y = window.scrollY
      if (Math.abs(y - last) < 6) return
      setTucked(y > last && y > 160)
      last = y
    }
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])
  return tucked
}

/**
 * The header the reference uses: a menu toggle on the left, the mark in the
 * middle, one link out on the right. No ground of its own — it takes the
 * tone of whatever it floats over, and steps out of the way on the way down.
 */
export function SiteHeader() {
  const pathname = usePathname()
  const [menu, setMenu] = useState(false)
  const tone = useToneUnderHeader()
  const tucked = useTucked()
  useCanvasAction("Menu", (next) => setMenu(next ?? !menu), { on: menu, group: "Header" })

  useEffect(() => setMenu(false), [pathname])

  const light = tone === "light" || menu
  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-60 transition-[transform,color] duration-(--duration-menu) ease-(--ease-out-strong)",
          light ? "text-on-sky" : "text-ink",
          tucked && !menu ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-(--spacing-gutter)">
          <button
            type="button"
            onClick={() => setMenu((open) => !open)}
            aria-expanded={menu}
            aria-controls="site-menu"
            className="group -ml-2 flex h-11 items-center gap-3 justify-self-start rounded-full px-2 text-micro"
          >
            <span aria-hidden className="relative block h-2.5 w-5">
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-[1.5px] rounded-full bg-current transition-transform duration-(--duration-swap) ease-(--ease-out-strong)",
                  menu ? "translate-y-[4.25px] scale-x-100" : "group-hover:scale-x-75",
                )}
                style={{ transformOrigin: "left" }}
              />
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-[1.5px] rounded-full bg-current transition-transform duration-(--duration-swap) ease-(--ease-out-strong)",
                  menu && "-translate-y-[4.25px]",
                )}
              />
            </span>
            <span className={cn("transition-opacity duration-(--duration-swap)", menu ? "opacity-100" : "opacity-0 sm:opacity-100")}>{menu ? "Close" : "Menu"}</span>
          </button>

          <Link href="/" aria-label="Aerie home" className="flex h-11 items-center">
            <Logo className="text-[22px] sm:text-[25.89px] xl:text-[32.94px]" />
          </Link>

          <Link
            href="/experience#book"
            className="group flex h-11 items-center gap-1 justify-self-end text-micro"
          >
            <span className="hidden sm:inline">Book a seat</span>
            <span className="sm:hidden">Book</span>
            <ArrowUpRight className="size-3.5 transition-transform duration-(--duration-hover) ease-(--ease-out-strong) group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </header>
      <StripeMenu open={menu} onOpenChange={setMenu} />
    </>
  )
}
