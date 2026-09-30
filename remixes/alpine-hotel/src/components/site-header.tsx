import { useState } from "react"
import { Menu } from "lucide-react"
import { useCanvasAction } from "@canvas/react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Wordmark } from "@/components/ui/wordmark"
import { useScrollTo } from "@/components/motion/smooth-scroll"
import { hotel, nav } from "@/content"

/**
 * The masthead: the house's name, the chapters of the page, and one red
 * button. It sits on its own strip of paper with a double rule under it, the
 * way a printed guide carries its running head.
 */
export function SiteHeader({ cta = "Reserve" }: { cta?: string }) {
  const [menu, setMenu] = useState(false)
  const scrollTo = useScrollTo()
  useCanvasAction("Mobile menu", (next) => setMenu(next ?? !menu), { on: menu, group: "Header" })

  const go = (href: string) => {
    setMenu(false)
    scrollTo(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-paper">
      <div className="mx-auto flex h-16 max-w-[84rem] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            go("#top")
          }}
          aria-label={`${hotel.full}, back to top`}
        >
          <Wordmark />
        </a>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    go(item.href)
                  }}
                  className="text-[13px] text-ink-soft underline decoration-transparent underline-offset-[6px] transition-[color,text-decoration-color] duration-150 hover:text-ink hover:decoration-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <span className="label hidden text-ink-faint xl:inline">{hotel.phone}</span>
          <Button variant="signal" size="sm" className="xl:ml-4" onClick={() => go("#reserve")}>
            {cta}
          </Button>
          <Sheet open={menu} onOpenChange={setMenu}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm border-l border-rule bg-paper text-ink">
              <SheetHeader>
                <SheetTitle>
                  <Wordmark />
                </SheetTitle>
              </SheetHeader>
              <ol className="flex flex-col px-4">
                {nav.map((item, i) => (
                  <li key={item.href} className="border-t border-rule">
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        go(item.href)
                      }}
                      className="flex min-h-14 items-baseline gap-4"
                    >
                      <span className="label text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-serif text-2xl">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
              <div className="mt-auto flex flex-col gap-3 p-4">
                <Button variant="signal" size="lg" onClick={() => go("#reserve")}>
                  {cta}
                </Button>
                <p className="label text-ink-faint">
                  {hotel.phone} · {hotel.email}
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div aria-hidden className="h-[5px] border-y border-ink/80" />
    </header>
  )
}
