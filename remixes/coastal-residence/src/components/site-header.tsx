import { motion, useReducedMotion, useScroll, useTransform, useVelocity, useSpring } from "motion/react"
import { Menu } from "lucide-react"

import { useLenis, scrollToTarget } from "@/components/motion"
import { Emblem } from "@/components/ui/emblem"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useToneAt } from "@/components/use-tone"
import { brand, nav } from "@/content"
import { cn } from "@/lib/utils"

/**
 * The circular badge: the name set round a ring, turning with the scroll —
 * a little faster the harder the page is thrown.
 */
function Badge({ tone }: { tone: "light" | "dark" }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { stiffness: 60, damping: 30 })
  const base = useTransform(scrollY, (v) => v * 0.06)
  const boost = useTransform(velocity, (v) => v * 0.004)
  const rotate = useTransform(() => (reduce ? 0 : base.get() + boost.get()))
  const ring = `${brand.word[0]} · ${brand.word[1]} · ${brand.word[0]} · ${brand.word[1]} · `.toUpperCase()
  const lenis = useLenis()

  return (
    <a
      href="#top"
      aria-label={`${brand.name}, back to top`}
      onClick={(e) => {
        e.preventDefault()
        scrollToTarget(lenis, 0)
      }}
      className={cn(
        "relative grid size-[88px] place-items-center transition-colors duration-500 sm:size-[128px]",
        tone === "light" ? "text-paper" : "text-ink",
      )}
    >
      <motion.svg viewBox="0 0 128 128" className="absolute inset-0 size-full" style={{ rotate }} aria-hidden="true">
        <defs>
          <path id="badge-ring" d="M 64,64 m -52,0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0" />
        </defs>
        <text className="fill-current font-sans text-[9.5px] font-semibold" style={{ letterSpacing: "0.32em" }}>
          <textPath href="#badge-ring">{ring}</textPath>
        </text>
      </motion.svg>
      <Emblem className="size-10 sm:size-14" />
    </a>
  )
}

/** Fixed chrome: the badge on the left, the two ways in on the right. */
export function SiteHeader() {
  const tone = useToneAt(80)
  const lenis = useLenis()
  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    scrollToTarget(lenis, href)
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-start justify-between px-4 pt-4 sm:px-14 sm:pt-12">
      <div className="pointer-events-auto">
        <Badge tone={tone} />
      </div>

      <nav
        aria-label="Primary"
        className={cn(
          "pointer-events-auto hidden flex-col items-end gap-7 text-right transition-colors duration-500 md:flex",
          tone === "light" ? "text-paper" : "text-ink",
        )}
      >
        <a
          href={nav.primary.href}
          onClick={go(nav.primary.href)}
          className="group font-condensed text-[1.75rem] leading-[1.05]"
        >
          {nav.primary.label.map((line) => (
            <span key={line} className="relative block w-fit ml-auto">
              {line}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-right bg-current transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-x-0" />
            </span>
          ))}
        </a>
        <ul className="flex flex-col items-end gap-1">
          {nav.secondary.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={go(item.href)}
                className="label inline-block tracking-[0.3em] opacity-90 transition-opacity hover:opacity-60"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Sheet>
        <SheetTrigger
          aria-label="Open menu"
          className={cn(
            "pointer-events-auto grid size-11 place-items-center rounded-full border border-current/30 backdrop-blur-sm transition-colors duration-500 md:hidden",
            tone === "light" ? "text-paper" : "text-ink",
          )}
        >
          <Menu className="size-5" strokeWidth={1.5} />
        </SheetTrigger>
        <SheetContent side="right" className="w-full border-none bg-deep text-shell sm:max-w-sm [&>button]:text-shell">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="flex h-full flex-col justify-center gap-10 px-8">
            <Emblem className="size-12" />
            <SheetClose asChild>
              <a href={nav.primary.href} onClick={go(nav.primary.href)} className="font-condensed text-5xl">
                {nav.primary.label.join(" ")}
              </a>
            </SheetClose>
            {nav.secondary.map((item) => (
              <SheetClose asChild key={item.label}>
                <a href={item.href} onClick={go(item.href)} className="label text-sm tracking-[0.3em]">
                  {item.label}
                </a>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
