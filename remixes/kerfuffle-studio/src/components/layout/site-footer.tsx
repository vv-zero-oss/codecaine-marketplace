import { ArrowUp } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { scrollToTop } from "@/components/motion/smooth-scroll"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { DisplayHeading } from "@/components/ui/heading"
import { Wordmark } from "@/components/ui/wordmark"
import { NAV, STUDIO } from "@/content"
import { isActive, Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/** The dark band every page ends on: one invitation, one lime button. */
export function CtaBand({
  bold = "Let's cause",
  serif = "a kerfuffle",
  body = "Bring the half-baked idea. We'll bring the coffee and the keyframes.",
  cta = "Start a project",
}: {
  bold?: string
  serif?: string
  body?: string
  cta?: string
}) {
  return (
    <section data-tone="dark" className="bg-night px-gutter pt-section pb-24 text-snow md:pb-32">
      <div className="mx-auto flex max-w-[90rem] flex-col items-center rounded-card bg-night-raised px-6 py-16 text-center md:py-24" data-canvas-ignore>
        <Reveal>
          <DisplayHeading bold={bold} serif={serif} size="lg" as="h2" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-md text-base md:text-lg">{body}</p>
        </Reveal>
        <Reveal delay={0.18} className="mt-7">
          <ButtonLink href="/contact" tone="lime" size="lg" label={cta} />
        </Reveal>
      </div>
    </section>
  )
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="label text-xs text-lime">{title}</h3>
      <div className="mt-3 flex flex-col gap-1.5 font-serif text-xl leading-tight text-snow-mute">{children}</div>
    </div>
  )
}

export function SiteFooter({ pathname }: { pathname: string }) {
  const links = [...NAV, { label: "Contact", href: "/contact" }, { label: "Style guide", href: "/brand" }]
  return (
    <footer data-tone="dark" className="bg-night text-snow">
      <Container className="border-t border-line-dark pt-14 pb-6 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_2fr] md:gap-8">
          <Link href="/" aria-label={`${STUDIO.name} home`} className="self-center justify-self-start md:justify-self-center">
            <Wordmark tone="snow" className="text-[4rem] md:text-[6.5rem]" />
          </Link>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-[1fr_1.3fr_1fr_auto]">
            <Column title="Navigation">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "w-fit decoration-lime decoration-2 underline-offset-4 transition-colors hover:text-snow",
                    isActive(pathname, item.href) && "text-snow underline",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </Column>
            <Column title="Contact">
              <address className="not-italic">
                {STUDIO.street}
                <br />
                {STUDIO.postcode}
                <br />
                {STUDIO.city}
              </address>
              <a href={`mailto:${STUDIO.email}`} className="mt-3 w-fit transition-colors hover:text-snow">
                {STUDIO.email}
              </a>
              <a href={STUDIO.phoneHref} className="w-fit transition-colors hover:text-snow">
                {STUDIO.phone}
              </a>
            </Column>
            <Column title="Socials">
              {STUDIO.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="w-fit transition-colors hover:text-snow">
                  {s.label}
                </a>
              ))}
            </Column>
            <button
              type="button"
              onClick={() => scrollToTop(false)}
              aria-label="Back to top"
              className="col-span-2 inline-flex size-12 items-center justify-center justify-self-end rounded-full bg-lime text-ink transition-transform duration-(--duration-base) ease-(--ease-pop) hover:-translate-y-1 sm:col-span-1"
            >
              <ArrowUp className="size-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-2 border-t border-line-dark pt-5 font-serif text-base text-snow-mute md:flex-row md:items-center md:justify-between">
          <span>© 2026 {STUDIO.name} Studio</span>
          <span className="flex gap-5">
            <a href="#" className="hover:text-snow">Privacy</a>
            <a href="#" className="hover:text-snow">Terms</a>
          </span>
          <span>
            Photography via{" "}
            <a href="https://www.pexels.com" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-snow">
              Pexels
            </a>
          </span>
        </div>
      </Container>
    </footer>
  )
}
