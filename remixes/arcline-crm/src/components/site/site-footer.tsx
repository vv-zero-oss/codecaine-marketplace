import { Container } from "@/components/ui/container"
import { BrandLogo } from "@/components/ui/brand-logo"
import { ButtonLink } from "@/components/ui/button"
import { ArclineMark } from "@/components/ui/wordmark"
import { FOOTER } from "@/content"
import { PHOTOGRAPHERS } from "@/photos"

const slug = (s: string) => `#${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`

/** Link columns, each hung off a hairline, then the name set as large as the page allows. */
export function SiteFooter() {
  return (
    <footer className="pt-24 pb-10 md:pt-[100px]">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-[repeat(5,1fr)_minmax(180px,0.8fr)]">
          {FOOTER.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="type-eyebrow mb-4 text-[13px] text-subtle">{column.title}</p>
              <ul className="flex flex-col gap-1 border-l border-line pl-4">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href={slug(link)}
                      className="inline-block py-0.5 text-lg leading-snug text-fg-soft transition-colors hover:text-fg md:text-[26px] md:leading-[1.55] md:tracking-[-0.02em]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 flex flex-col gap-8 sm:col-span-3 lg:col-span-1 lg:border-l lg:border-line lg:pl-4">
            <div className="flex flex-wrap gap-3 lg:mt-[300px] lg:flex-col lg:items-start">
              <ButtonLink href="#pricing" size="sm" className="h-11 px-6 text-[15px]">
                Start for free
              </ButtonLink>
              <ButtonLink href="#cta" size="sm" variant="soft" className="h-11 px-6 text-[15px]">
                Book a demo
              </ButtonLink>
            </div>
            <ul className="flex gap-2">
              {(["linkedin", "x"] as const).map((brand) => (
                <li key={brand}>
                  <a
                    href={`#${brand}`}
                    aria-label={brand === "x" ? "Arcline on X" : "Arcline on LinkedIn"}
                    className="flex size-11 items-center justify-center rounded-full text-fg-soft transition-colors hover:bg-white/[0.06] hover:text-fg"
                  >
                    <BrandLogo brand={brand} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 lg:flex-col">
              {FOOTER.legal.map((item) => (
                <li key={item}>
                  <a href={slug(item)} className="type-eyebrow text-[12px] text-muted transition-colors hover:text-fg">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <p className="type-eyebrow text-[12px] text-muted">{FOOTER.copyright}</p>
          </div>
        </div>

        <div className="mt-20 flex items-end gap-[3vw] text-cream md:mt-10" aria-label="Arcline">
          <ArclineMark className="h-[14vw] w-auto lg:h-[12vw]" />
          <span className="translate-y-[4%] text-[24vw] leading-[0.75] font-normal tracking-[-0.06em] lg:text-[17vw]">
            Arcline
          </span>
        </div>

        <p className="mt-10 max-w-3xl text-[13px] leading-relaxed text-subtle">
          Photography from{" "}
          <a href="https://www.pexels.com" className="underline underline-offset-4 hover:text-muted">
            Pexels
          </a>{" "}
          by {PHOTOGRAPHERS.join(", ")}. Logos from SVGL.
        </p>
      </Container>
    </footer>
  )
}
