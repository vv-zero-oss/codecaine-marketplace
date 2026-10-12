import { AtSign, Camera, Mail } from "lucide-react"

import { Logo } from "@/components/site/logo"
import { Container } from "@/components/ui/container"
import { Link } from "@/lib/router"

const LINKS = [
  { href: "/discover", label: "Discover" },
  { href: "/create", label: "Host" },
  { href: "/pricing", label: "Pricing" },
  { href: "/brand", label: "Brand" },
]

const LEGAL = ["Terms", "Privacy", "Safety", "Cookies"]

/** The footer, as quiet as the reference's: the wordmark and a row of
 *  links over a hairline, legal underneath, credits at the end. */
export function SiteFooter() {
  return (
    <footer className="relative pb-10">
      <Container className="max-w-[960px]">
        <div className="flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="/" aria-label="Fête home" className="text-ink">
              <Logo className="text-[20px]" />
            </Link>
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[15px] text-ink-3 transition-colors duration-(--duration-hover) hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <ul className="-ml-2.5 flex gap-1 sm:ml-0">
            {[
              { label: "Photo journal", Icon: Camera },
              { label: "Community updates", Icon: AtSign },
              { label: "Email", Icon: Mail },
            ].map(({ label, Icon }) => (
              <li key={label}>
                <a href="#" aria-label={label} className="flex size-11 items-center justify-center rounded-full text-ink-3 transition-colors duration-(--duration-hover) hover:bg-panel hover:text-ink">
                  <Icon className="size-[18px]" strokeWidth={1.7} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 flex flex-col gap-2 text-[13px] text-ink-3 sm:flex-row sm:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {LEGAL.map((l) => (
              <li key={l}>
                <a href="#" className="transition-colors hover:text-ink">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <p>
            Photography from{" "}
            <a href="https://www.pexels.com" className="underline decoration-line-strong underline-offset-2 hover:text-ink">
              Pexels
            </a>
            . © 2026 Fête.
          </p>
        </div>
      </Container>
    </footer>
  )
}
