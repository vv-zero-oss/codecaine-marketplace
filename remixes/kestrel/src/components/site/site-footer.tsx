import { ArrowUpRight } from "lucide-react"

import { Logo } from "@/components/site/logo"
import { Container } from "@/components/ui/container"
import { FOOTER_COLUMNS, LEGAL } from "@/content/site"
import { Link } from "@/lib/router"

/**
 * The night footer. The page above it ends on rounded corners, so the
 * footer reads as the ground the white page sits on.
 */
export function SiteFooter() {
  return (
    <footer className="-mt-8 bg-night pt-24 pb-12 text-night-fg sm:pt-28">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" aria-label="Kestrel home" className="text-night-fg">
              <Logo />
            </Link>
            <p className="mt-4 max-w-[30ch] text-[15px] leading-relaxed text-night-muted">
              Spend that closes itself. Made for finance teams with better things to do.
            </p>
          </div>
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.label} aria-label={column.label}>
              <p className="text-[15px] text-night-fg">{column.label}</p>
              <ul className="mt-3 flex flex-col">
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="inline-flex min-h-8 items-center text-[15px] text-night-muted transition-colors duration-(--duration-hover) hover:text-night-fg">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-20 grid gap-8 border-t border-night-line pt-8 text-[13px] leading-relaxed text-night-muted lg:grid-cols-[2fr_1fr_auto]">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-night-fg">
              {["Terms", "Privacy", "Cookie choices", "Disclosures"].map((item) => (
                <a key={item} href="#" className="underline decoration-night-line underline-offset-4 transition-colors hover:decoration-night-fg">{item}</a>
              ))}
            </div>
            <p>© 2026 Kestrel Financial, Inc. {LEGAL}</p>
            <p>
              Photography from <a className="underline underline-offset-4 hover:text-night-fg" href="https://www.pexels.com">Pexels</a>. Icons from{" "}
              <a className="underline underline-offset-4 hover:text-night-fg" href="https://lucide.dev">Lucide</a>.
            </p>
          </div>
          <address className="not-italic">
            Kestrel Financial, Inc.
            <br />
            214 Mercer Street, Floor 5
            <br />
            New York, NY 10012
          </address>
          <div className="flex flex-col gap-2 text-night-fg">
            {["LinkedIn", "X", "YouTube"].map((item) => (
              <a key={item} href="#" className="group inline-flex items-center gap-1 underline decoration-night-line underline-offset-4 hover:decoration-night-fg">
                {item}
                <ArrowUpRight className="size-3.5 transition-transform duration-(--duration-hover) group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
