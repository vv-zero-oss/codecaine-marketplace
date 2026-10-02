import { BlurWords } from "@/components/motion/blur-words"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/** The centred block every section opens with: a blurred-in heading, a line of
 *  support and an optional button. Appears four times, so it is one component. */
export function SectionIntro({
  before,
  accent,
  after,
  body,
  cta,
  href = "#",
  className,
}: {
  before: string
  accent: string
  after?: string
  body?: string
  cta?: string
  href?: string
  className?: string
}) {
  return (
    <div className={cn("mx-auto flex max-w-2xl flex-col items-center gap-5 text-center", className)}>
      <BlurWords
        before={before}
        accent={accent}
        after={after}
        className="text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.035em]"
      />
      {body && (
        <Reveal delay={0.25}>
          <p className="max-w-md text-[15px] leading-relaxed text-fg-muted">{body}</p>
        </Reveal>
      )}
      {cta && (
        <Reveal delay={0.35}>
          <ButtonLink href={href} size="sm">
            {cta}
          </ButtonLink>
        </Reveal>
      )}
    </div>
  )
}
