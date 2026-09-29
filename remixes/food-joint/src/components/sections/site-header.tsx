import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react"

import { Wordmark } from "@/components/blocks/wordmark"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { brand, cta, nav } from "@/content"
import { EASE_OUT } from "@/lib/motion"
import { cn } from "@/lib/utils"

/** The line the header reads the tone under, from the top of the window. */
const HEADER_LINE = 28

/**
 * Whether the header is over a dark section. Dark sections say so with
 * `data-tone="dark"`; the header checks which one its own line is inside, so
 * it switches exactly as it crosses the edge.
 */
function useTone() {
  const [tone, setTone] = useState<"light" | "dark">("light")
  useEffect(() => {
    let frame = 0
    const read = () => {
      frame = 0
      let next: "light" | "dark" = "light"
      for (const el of document.querySelectorAll<HTMLElement>("[data-tone=dark]")) {
        const box = el.getBoundingClientRect()
        if (box.top <= HEADER_LINE && box.bottom >= HEADER_LINE) next = "dark"
      }
      setTone(next)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }
    read()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
  return tone
}

/**
 * The header: the name on the left, the links on the right in the condensed
 * face. It steps out of the way while you read down the page and comes back
 * the moment you scroll up — a slide by its own height, ease-out, 300ms.
 */
export function SiteHeader() {
  const tone = useTone()
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setHidden(y > 240 && y > previous + 2 ? true : y < previous - 2 ? false : hidden)
  })

  const link =
    "inline-flex min-h-11 items-center font-condensed text-label uppercase underline-offset-[6px] decoration-2 [@media(hover:hover)]:hover:underline"
  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-40 flex items-center justify-between px-gutter pt-1 transition-colors duration-(--duration-hover)",
        tone === "dark" ? "text-cream" : "text-forest",
      )}
      animate={{ transform: hidden && !reduced ? "translateY(-110%)" : "translateY(0%)" }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
    >
      <Wordmark />

      <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
        {nav.map((item) => (
          <a key={item.label} href={item.href} className={link}>
            {item.label}
          </a>
        ))}
        <a href={cta.href} className={cn(link, "underline")}>
          Reservations
        </a>
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu" className="-mr-2 text-current md:hidden">
            <Menu className="size-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-lime pt-16">
          <SheetHeader className="px-6">
            <SheetTitle className="font-heavy text-[22px] leading-none">{brand.name}</SheetTitle>
          </SheetHeader>
          <nav aria-label="Mobile" className="flex flex-col px-6">
            {[...nav, { label: "Reservations", href: cta.href }].map((item) => (
              <SheetClose asChild key={item.label}>
                <a href={item.href} className="flex min-h-16 items-center border-b border-hairline font-heavy text-[40px] leading-none">
                  {item.label}
                </a>
              </SheetClose>
            ))}
          </nav>
          <p className="mt-auto px-6 pb-8 font-condensed text-label uppercase">
            {brand.address.join(", ")} · {brand.phone}
          </p>
        </SheetContent>
      </Sheet>
    </motion.header>
  )
}
