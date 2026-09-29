import { ScrollMarquee } from "@/components/motion/scroll-marquee"
import { BracketButton } from "@/components/ui/bracket-button"
import { Container } from "@/components/ui/container"

/** The last ask, in oversize type: stop reshooting, start editing. */
export function Closing() {
  return (
    <section id="start" className="overflow-hidden border-t border-hairline pt-[clamp(3rem,8vw,7rem)]" aria-labelledby="start-title">
      <h2 id="start-title" className="sr-only">
        Stop reshooting. Start editing.
      </h2>
      <ScrollMarquee text="Stop reshooting —" direction="left" outline distance={24} />
      <ScrollMarquee text="Start editing —" direction="right" distance={24} className="-mt-[0.06em]" />
      <Container className="flex flex-wrap items-center justify-between gap-6 py-12">
        <p className="max-w-[46ch] text-body text-muted">
          Twenty edits a month free, on your own frames. No card, and nothing you upload trains anything.
        </p>
        <div className="flex flex-wrap gap-5">
          <BracketButton solid>Start free</BracketButton>
          <BracketButton>Book a walkthrough</BracketButton>
        </div>
      </Container>
    </section>
  )
}
