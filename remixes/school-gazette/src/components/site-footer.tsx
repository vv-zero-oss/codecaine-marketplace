import { Container } from "@/components/ui/container"
import { CREDITS } from "@/data/photos"
import { Link } from "@/lib/router"

/** The colophon: who made it, what it is set in, and where the pictures came from. */
export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper-light">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <p className="font-display text-3xl leading-none">The Marlowe Gazette</p>
          <p className="max-w-xs text-[0.95rem] leading-snug text-paper-light/75">Made by pupils, between lessons. Printed on recycled paper and refreshed on recycled screens.</p>
          <span aria-hidden className="mt-2 h-10 w-40 bg-[repeating-linear-gradient(90deg,var(--paper-light)_0_2px,transparent_2px_5px,var(--paper-light)_5px_8px,transparent_8px_10px)]" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="kicker text-brass">Set in</p>
          <p className="text-[0.95rem] leading-snug text-paper-light/75">Abril Fatface, Instrument Serif, Newsreader and Special Elite, all from Google Fonts. Icons from Lucide.</p>
          <Link href="/brand" className="kicker mt-2 underline decoration-rust decoration-2 underline-offset-4">Brand guidelines →</Link>
        </div>
        <div className="flex flex-col gap-2">
          <p className="kicker text-brass">Photography</p>
          <p className="text-[0.82rem] leading-snug text-paper-light/75">
            Photographs from <a className="underline decoration-rust underline-offset-2" href="https://www.pexels.com">Pexels</a>: {CREDITS.map(([who]) => who).join(", ")}.
          </p>
        </div>
      </Container>
      <div className="border-t border-paper-light/20">
        <Container className="flex flex-wrap items-center justify-between gap-2 py-4 kicker text-paper-light/60">
          <span>© 2026 Marlowe Academy</span>
          <span>Vol. XLII · No. 3 · Price: one smile</span>
        </Container>
      </div>
    </footer>
  )
}
