import { Filmstrip } from "@/components/motion/filmstrip"
import { RiseText } from "@/components/motion/rise-text"
import { useScrollTo } from "@/components/smooth-scroll"
import { BracketButton } from "@/components/ui/bracket-button"
import { Container } from "@/components/ui/container"

const COLUMNS = [
  { title: "Product", links: ["Studio", "Edits", "Pricing", "Changelog"] },
  { title: "Practice", links: ["Case studies", "Awards preset", "Security", "Contact"] },
]

/**
 * A strip of recent frames, the columns, and the name at full width — its
 * letters rising in as the page reaches its end.
 */
export function SiteFooter() {
  const scrollTo = useScrollTo()
  return (
    <footer className="border-t border-hairline pt-10">
      <Filmstrip start={30} count={16} className="mb-16" />
      <Container className="grid gap-10 text-ui uppercase tracking-ui sm:grid-cols-2 lg:grid-cols-4">
        <p className="max-w-[30ch] normal-case tracking-normal text-body text-muted">
          Mullion is image editing made for architects: relight, re-sky, re-season and grade a project's photography in
          minutes.
        </p>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="mb-3 text-muted">{col.title}</p>
            <ul className="flex flex-col gap-1">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="inline-flex min-h-11 items-center decoration-1 underline-offset-[5px] hover:underline md:min-h-7">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="lg:text-right">
          <BracketButton onClick={() => scrollTo(0)}>Back to top</BracketButton>
        </div>
      </Container>
      <div className="mt-16 overflow-hidden px-gutter">
        <RiseText text="MULLION" className="w-full justify-between text-[24.5vw] leading-[0.8] font-extrabold tracking-[-0.07em]" />
      </div>
      <Container className="flex flex-wrap justify-between gap-4 border-t border-hairline py-4 text-label uppercase tracking-ui text-muted">
        <span>© 2026 Mullion Studio — All rights reserved</span>
        <span>
          Photography:{" "}
          <a href="https://www.pexels.com" className="underline underline-offset-2 hover:text-ink">
            Pexels
          </a>
        </span>
      </Container>
    </footer>
  )
}
