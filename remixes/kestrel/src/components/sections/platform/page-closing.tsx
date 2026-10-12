import { EmailCapture } from "@/components/blocks/email-capture"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

/**
 * The last ask on an inner page: a big two-tone line, the email field and a
 * quiet reassurance, centred on a dot grid that fades out at the edges.
 */
export function PageClosing({
  id,
  title = "Spend less time on spend.",
  continuation = "Start free today.",
  note = "Free for every seat on Start. No card fees, no setup cost.",
  formName = "Page signup",
  className,
}: {
  id?: string
  title?: string
  continuation?: string
  note?: string
  /** The label the form's states get in the editor's Actions row. */
  formName?: string
  className?: string
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-24 py-(--spacing-section)", className)}>
      <div aria-hidden className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <Container className="relative flex flex-col items-center text-center">
        <Reveal>
          <h2 className="type-head text-display text-balance">
            {title}
            <br />
            <span className="text-ink-soft">{continuation}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="mt-8 flex w-full flex-col items-center">
          <EmailCapture name={formName} />
          <p className="text-[13px] text-ink-3">{note}</p>
        </Reveal>
      </Container>
    </section>
  )
}
