import { CadenceMark } from "@/components/site/logo"
import { Container } from "@/components/ui/container"
import { Link } from "@/lib/router"

const COLUMNS = [
  { title: "Product", links: [["Overview", "/#top"], ["Features", "/#features"], ["Pricing", "/#pricing"], ["Changelog", "#"]] },
  { title: "Company", links: [["About", "#"], ["Careers", "#"], ["Press kit", "#"], ["Brand guidelines", "/brand"]] },
  { title: "Resources", links: [["Help centre", "#"], ["Privacy & security", "#"], ["System status", "#"], ["Contact", "#"]] },
  { title: "Social", links: [["Instagram", "#"], ["Threads", "#"], ["YouTube", "#"], ["Strava club", "#"]] },
]

/** The mark on its own, four short columns, and the small print. */
export function SiteFooter() {
  return (
    <footer className="relative z-10 bg-night pt-16 pb-10 md:pt-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_auto]">
          <Link href="/" aria-label="Cadence home" className="self-start">
            <CadenceMark className="size-11 rounded-full bg-action text-forest-ink" />
          </Link>
          <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-4 md:gap-x-16">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="font-sans text-[14px] font-medium text-fg">{column.title}</h3>
                <ul className="mt-3 flex flex-col gap-1">
                  {column.links.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="inline-flex min-h-8 items-center text-[14px] text-fg-3 transition-colors duration-(--duration-hover) hover:text-fg">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-6 text-[13px] text-fg-4 sm:flex-row sm:justify-between">
          <p>© 2026 Cadence Health, Inc. Cadence is not a medical device and does not diagnose or treat any condition.</p>
          <p>
            Photography from{" "}
            <a href="https://www.pexels.com" className="underline-offset-2 hover:text-fg-2 hover:underline">
              Pexels
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}
