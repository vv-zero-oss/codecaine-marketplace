import { PixelMarquee } from "@/components/motion/pixel-marquee"
import { RouteButton } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

/** A path no region serves. */
export function NotFoundPage() {
  return (
    <section className="py-24">
      <PixelMarquee text="404 · this page is in no region" rows={12} />
      <Container className="mt-12 flex flex-col items-center gap-8 text-center">
        <p className="max-w-[28rem] text-body text-ink-soft">We looked in all fourteen regions and the origin. Nothing lives at this address.</p>
        <RouteButton href="/">Back to the start</RouteButton>
      </Container>
    </section>
  )
}
