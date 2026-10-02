import { Container } from "@/components/ui/container"
import { Wordmark } from "@/components/ui/wordmark"
import { Link } from "@/lib/router"

/** Photography credit lives here, as the Pexels licence asks. */
export function SiteFooter() {
  return (
    <footer className="bg-[linear-gradient(var(--color-paper),color-mix(in_oklab,var(--color-pastel-lilac)_45%,white))] py-12">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Wordmark />
          <p className="mt-3 max-w-xs text-sm text-ink-2">A health coach that reads everything you track and says what to do about it.</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
          <Link href="/#about" className="py-1 text-ink-2 hover:text-ink">About</Link>
          <Link href="/#intelligence" className="py-1 text-ink-2 hover:text-ink">Intelligence</Link>
          <Link href="/#privacy" className="py-1 text-ink-2 hover:text-ink">Privacy</Link>
          <Link href="/brand" className="py-1 text-ink-2 hover:text-ink">Brand guidelines</Link>
        </nav>
      </Container>
      <Container className="mt-10 flex flex-col gap-1 text-xs text-ink-3 sm:flex-row sm:justify-between">
        <span>© 2026 Meridian Health, Inc. Not medical advice.</span>
        <span>Photography by <a className="underline underline-offset-2 hover:text-ink" href="https://www.pexels.com">Pexels</a> contributors.</span>
      </Container>
    </footer>
  )
}
