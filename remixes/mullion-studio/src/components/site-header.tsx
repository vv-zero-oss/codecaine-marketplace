import { useCanvasAction } from "@canvas/react"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { useState } from "react"

import { useArchive, type View } from "@/components/archive-state"
import { useScrollTo } from "@/components/smooth-scroll"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

const VIEWS: View[] = ["grid", "list", "gallery"]
const LINKS = [
  { href: "#studio", label: "Studio" },
  { href: "#workflow", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
]

/**
 * The bar across the top: the name and how many frames are showing, the three
 * ways to look at the archive in the middle, and the page's sections on the
 * right. It floats over the archive with no fill of its own, and takes the
 * paper once the page has scrolled past it.
 */
export function SiteHeader() {
  const { view, setView, visibleCount, introDone } = useArchive()
  const scrollTo = useScrollTo()
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useCanvasAction("Mobile menu", (next) => setMenuOpen(next ?? !menuOpen), { group: "Header", on: menuOpen })

  useMotionValueEvent(scrollY, "change", (y) => {
    const archive = document.getElementById("archive")
    setSolid(!!archive && y > archive.offsetHeight - 60)
  })

  const choose = (next: View) => {
    setView(next)
    scrollTo(0, { immediate: true })
  }

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-300",
        solid || view === "gallery" ? "border-b border-hairline bg-paper/92 backdrop-blur-md" : "border-b border-transparent",
      )}
      initial={false}
      animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : -8 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid grid-cols-[1fr_auto] items-center gap-4 px-gutter py-2 text-ui uppercase tracking-ui md:grid-cols-[1fr_auto_1fr] md:py-4">
        <a
          href="#archive"
          onClick={(e) => {
            e.preventDefault()
            choose("grid")
          }}
          className="flex min-h-11 items-center gap-3 md:min-h-0"
        >
          <span className="font-extrabold tracking-[0.02em]">Mullion</span>
          <span className="text-muted">/</span>
          <span>
            <span className="tabular-nums">{visibleCount}</span> <span className="hidden sm:inline">edited frames</span>
          </span>
        </a>

        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(v) => v && choose(v as View)}
          className="hidden gap-5 md:flex"
          aria-label="Archive view"
        >
          {VIEWS.map((v) => (
            <ToggleGroupItem
              key={v}
              value={v}
              className="group/view h-auto min-w-0 gap-[0.9em] rounded-none bg-transparent px-0 text-ui font-normal uppercase tracking-ui text-ink hover:bg-transparent hover:text-ink data-[state=on]:bg-transparent data-[state=on]:text-ink"
            >
              <span className="font-light text-muted">[</span>
              <span className="decoration-1 underline-offset-[5px] group-hover/view:underline group-data-[state=on]/view:underline">{v}</span>
              <span className="font-light text-muted">]</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <nav className="hidden justify-end gap-6 md:flex" aria-label="Sections">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(link.href)
              }}
              className="decoration-1 underline-offset-[5px] hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger className="min-h-11 uppercase tracking-ui md:hidden">
            <span className="text-muted">[</span> Menu <span className="text-muted">]</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm gap-0 border-l border-hairline bg-paper p-gutter pt-16 font-mono">
            <SheetTitle className="mb-6 text-ui font-normal uppercase tracking-ui text-muted">Archive view</SheetTitle>
            <div className="flex flex-col border-t border-hairline">
              {VIEWS.map((v) => (
                <SheetClose key={v} asChild>
                  <button
                    type="button"
                    onClick={() => choose(v)}
                    className={cn(
                      "flex min-h-12 items-center justify-between border-b border-hairline text-left text-ui uppercase tracking-ui",
                      view === v && "underline underline-offset-[5px]",
                    )}
                  >
                    {v}
                    <span className="text-muted">{view === v ? "●" : ""}</span>
                  </button>
                </SheetClose>
              ))}
            </div>
            <p className="mt-10 mb-6 text-ui uppercase tracking-ui text-muted">Sections</p>
            <div className="flex flex-col border-t border-hairline">
              {LINKS.map((link) => (
                <SheetClose key={link.href} asChild>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      setTimeout(() => scrollTo(link.href), 250)
                    }}
                    className="flex min-h-12 items-center border-b border-hairline text-2xl font-extrabold tracking-tight"
                  >
                    {link.label}
                  </a>
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}
