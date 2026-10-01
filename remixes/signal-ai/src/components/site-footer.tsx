import { Moon, Sun } from "lucide-react"

import { Container } from "@/components/ui/container"
import { Wordmark } from "@/components/ui/wordmark"
import { Link } from "@/lib/router"
import { useTheme } from "@/lib/theme"

const COLUMNS: { title: string; links: string[] }[][] = [
  [
    { title: "Products", links: ["Chat", "Build", "Imagine", "Voice", "Bot"] },
    { title: "Download", links: ["vantage.dev", "iOS", "Android"] },
  ],
  [{ title: "Solutions", links: ["Business", "Government", "Customer Support", "Legal", "Security", "Use Cases"] }],
  [
    { title: "Developers", links: ["API Overview", "Pricing", "Models", "Console", "Changelog", "Docs", "Status"] },
    { title: "Enterprise", links: ["Contact Sales", "FAQs", "BAA", "DPA"] },
  ],
  [
    { title: "Company", links: ["About", "Careers", "News", "Contact"] },
    { title: "Trust", links: ["Safety", "Security", "Privacy Portal", "Help Center"] },
  ],
  [
    { title: "Legal", links: ["Terms", "Enterprise Terms", "Privacy", "Cookies", "AUP"] },
    { title: "Brand", links: ["Guidelines"] },
  ],
]

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="grid size-11 place-items-center rounded-full text-ink-3 transition-[color,transform] hover:text-ink active:scale-90"
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_2.6fr]">
        <div className="flex flex-row items-start justify-between gap-6 lg:flex-col lg:justify-start">
          <div>
            <Wordmark />
            <p className="mt-3 text-[10px] text-ink-3">© 2026 Vantage Labs, Inc.</p>
          </div>
          <div className="flex items-center gap-1 lg:mt-auto lg:pt-40">
            <ThemeToggle />
            <Link href="/brand" className="rounded-full border border-line px-3 py-1.5 text-[10px] text-ink-3 transition-colors hover:text-ink">
              Brand guidelines
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-l-0 sm:grid-cols-3 lg:grid-cols-5 lg:border-l lg:border-dashed lg:border-line-strong lg:pl-10">
          {COLUMNS.map((stack, i) => (
            <div key={i} className="flex flex-col gap-8">
              {stack.map((col) => (
                <nav key={col.title} aria-label={col.title}>
                  <h3 className="text-[11px] text-ink">{col.title}</h3>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {col.links.map((l) => (
                      <li key={l}>
                        <Link href={l === "Guidelines" ? "/brand" : "#top"} className="text-[11px] text-ink-3 transition-colors hover:text-ink">
                          {l}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          ))}
        </div>
      </Container>
      <Container className="pb-8 text-[10px] text-ink-3">
        Photography by Pexels contributors.
      </Container>
    </footer>
  )
}
