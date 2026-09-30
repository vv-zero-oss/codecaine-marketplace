import { FadeUp } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button-link"
import { home } from "@/content"

/** The last word on every page: an invitation to the workroom. */
export function ClosingCall({ title = home.closing.title, body = home.closing.body, cta = home.closing.cta, href = "/appointments" }: { title?: string; body?: string; cta?: string; href?: string }) {
  return (
    <section id="closing" className="px-gutter py-section">
      <FadeUp className="mx-auto flex max-w-[420px] flex-col items-center gap-4 text-center">
        <h2 className="font-sans text-[clamp(24px,1.8vw,32px)] font-medium leading-[1.1] tracking-[-0.02em] text-balance text-ink">{title}</h2>
        <p className="font-serif text-[17px] text-ink-soft">{body}</p>
        <ButtonLink href={href} label={cta} className="mt-6" />
      </FadeUp>
    </section>
  )
}
