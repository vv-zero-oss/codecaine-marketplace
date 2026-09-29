import { Bot, Brain, MessageCircle, Search, Sparkles } from "lucide-react"

import { LogoMark } from "@/components/ui/wordmark"
import { Container } from "@/components/ui/container"
import { FOOTER } from "@/content"

const slug = (s: string) => `#${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`

/** The dark footer: the mark, four columns of links, an ask-an-AI row and the legal line. */
export function SiteFooter() {
  return (
    <footer data-nav-tone="night" className="bg-night pb-10 text-night-fg">
      <Container className="max-w-[1240px]">
        <div className="grid gap-12 border-t border-night-line pt-14 md:grid-cols-[1fr_3fr] md:pt-16">
          <div className="flex flex-col justify-between gap-10">
            <LogoMark className="size-10" />
            <div className="flex flex-col gap-3">
              <p className="text-[13px] text-night-muted">{FOOTER.ask}</p>
              <div className="flex gap-2">
                {[Sparkles, Bot, MessageCircle, Brain, Search].map((Icon, i) => (
                  <a
                    key={i}
                    href="#ask"
                    aria-label={FOOTER.ask}
                    className="grid size-11 place-items-center rounded-full border border-night-line text-night-muted transition-colors duration-(--duration-hover) hover:border-night-subtle hover:text-night-fg md:size-8"
                  >
                    <Icon className="size-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {FOOTER.columns.map((col) => (
              <div key={col.title}>
                <p className="text-[16px] text-night-fg">{col.title}</p>
                <ul className="mt-5 flex flex-col gap-1">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href={slug(link)} className="inline-flex min-h-9 items-center gap-2 text-[13.5px] text-night-muted transition-colors duration-(--duration-hover) hover:text-night-fg">
                        {link}
                        {link === "Careers" && (
                          <span className="rounded-[4px] bg-night-raised px-1.5 py-0.5 text-[9.5px] tracking-wide text-night-muted uppercase">We’re hiring</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 text-[12px] text-night-subtle md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 Postwise · {FOOTER.credit}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER.legal.map((item) => (
              <li key={item}>
                <a href={slug(item)} className="transition-colors hover:text-night-fg">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
