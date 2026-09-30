import { Reveal } from "@/components/motion/reveal"
import { scrollToTop } from "@/components/motion/smooth-scroll"
import { Container } from "@/components/ui/container"
import { NAV, STUDIO } from "@/content"
import { isActive, Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/** Where every page ends: one question and the address to answer it at. */
export function CtaBand({
  label = "New projects",
  title = "Have something that should move?",
  body = "Tell us what you are working on. We reply within a working day, usually with a question or two.",
}: {
  label?: string
  title?: string
  body?: string
}) {
  return (
    <section data-tone="dark" className="bg-night pt-section text-snow">
      <Container>
        <div className="grid gap-y-8 border-t border-line-dark pt-5 md:grid-cols-12 md:gap-x-6">
          <p className="label text-snow-mute md:col-span-3">{label}</p>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="display max-w-[16ch] text-[clamp(2.5rem,6vw,6rem)]">{title}</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[44ch] text-lg leading-snug text-snow-mute">{body}</p>
            </Reveal>
            <Reveal delay={0.14}>
              <a
                href={`mailto:${STUDIO.email}`}
                className="group/mail mt-10 inline-block display text-[clamp(1.75rem,4.4vw,4rem)] text-accent"
              >
                {STUDIO.email}
                <span className="block h-[0.06em] origin-left scale-x-0 bg-current transition-transform duration-(--duration-slow) ease-out group-hover/mail:scale-x-100" />
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="label text-snow-mute">{title}</h3>
      <div className="mt-4 flex flex-col gap-1.5 text-sm">{children}</div>
    </div>
  )
}

export function SiteFooter({ pathname }: { pathname: string }) {
  const links = [...NAV, { label: "Contact", href: "/contact" }, { label: "Style guide", href: "/brand" }]
  return (
    <footer data-tone="dark" className="bg-night pt-section pb-8 text-snow">
      <Container>
        <div className="grid grid-cols-2 gap-10 border-t border-line-dark pt-8 md:grid-cols-12 md:gap-6">
          <Column title="Pages">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn("w-fit transition-opacity hover:opacity-60", isActive(pathname, item.href) && "text-accent")}
              >
                {item.label}
              </Link>
            ))}
          </Column>
          <div className="md:col-span-3 md:col-start-4">
            <Column title="Studio">
              <address className="not-italic">
                {STUDIO.street}
                <br />
                {STUDIO.postcode} {STUDIO.city}
              </address>
              <a href={STUDIO.phoneHref} className="mt-2 w-fit transition-opacity hover:opacity-60">
                {STUDIO.phone}
              </a>
            </Column>
          </div>
          <div className="md:col-span-3">
            <Column title="Elsewhere">
              {STUDIO.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="w-fit transition-opacity hover:opacity-60">
                  {s.label}
                </a>
              ))}
            </Column>
          </div>
          <div className="flex items-start justify-end md:col-span-3">
            <button type="button" onClick={() => scrollToTop(false)} className="text-sm transition-opacity hover:opacity-60">
              Back to top ↑
            </button>
          </div>
        </div>
        <p aria-hidden className="mt-20 display text-[clamp(4rem,19vw,19rem)] leading-[0.8] tracking-[-0.06em] select-none">
          Kerfuffle<span className="text-accent">.</span>
        </p>
        <div className="mt-8 flex flex-col gap-2 border-t border-line-dark pt-5 label text-snow-mute md:flex-row md:justify-between">
          <span>© 2026 Kerfuffle Studio B.V.</span>
          <span>
            Photography:{" "}
            <a href="https://www.pexels.com" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-snow">
              Pexels
            </a>
          </span>
        </div>
      </Container>
    </footer>
  )
}
