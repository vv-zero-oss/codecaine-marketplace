import { Cursor } from "@/components/motion/cursor"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

/**
 * Friends — "Better with friends": shared looks, with the collaborators'
 * cursors drifting round the headline the way they would on a shared board.
 */
export function Friends({
  script = "Better",
  title = "with friends",
  lede = "Share a look, collect votes, and buy the one everyone agrees on.",
}: {
  script?: string
  title?: string
  lede?: string
}) {
  return (
    <section id="friends" className="bg-espresso grid-paper-dark py-28 sm:py-40">
      <Container className="text-center">
        <div className="relative mx-auto inline-block px-6 py-8">
          <h2 className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-none font-semibold tracking-[-0.045em] text-cream">
            <span className="mr-[0.14em] font-script font-normal tracking-normal">{script}</span>
            {title}
          </h2>
          <Cursor name="Jordan" color="var(--clay)" x={4} y={70} dx={30} dy={-14} duration={3.4} />
          <Cursor name="Maya" color="var(--mustard)" x={82} y={-6} dx={-26} dy={18} duration={4.2} delay={0.6} />
          <Cursor name="Sam" color="var(--sage)" x={48} y={96} dx={-36} dy={-10} duration={3.8} delay={1.1} />
          <Cursor name="Priya" color="var(--plum)" x={96} y={78} dx={-20} dy={-24} duration={4.6} delay={0.3} className="max-sm:hidden" />
        </div>
        <p className="mx-auto mt-6 max-w-sm text-[15px] text-cream-2">{lede}</p>
        <div className="mt-6 flex justify-center gap-2">
          <ButtonLink href="#faq">Invite a friend</ButtonLink>
          <ButtonLink href="#toolkit" variant="outline-dark">
            Get started
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
