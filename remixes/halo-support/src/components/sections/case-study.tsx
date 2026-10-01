import { ChevronRight } from "lucide-react"

import { ScrambleText } from "@/components/motion/scramble-text"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { CASE_STUDY } from "@/content"
import photo from "@/assets/pexels-13443810.jpg"
import portrait from "@/assets/pexels-11091115.jpg"

export function CaseStudy() {
  return (
    <section id="customers" className="relative py-16 sm:py-24">
      <Container>
        <Eyebrow>{CASE_STUDY.eyebrow}</Eyebrow>
        <h2 className="scanline mt-5 max-w-[900px] text-[clamp(26px,3.6vw,48px)] leading-[1.15] tracking-[-0.02em] text-balance">
          <ScrambleText text={CASE_STUDY.heading} duration={1} scanlines={false} />
        </h2>

        <article className="mt-8 grid gap-6 rounded-[18px] border border-line bg-surface p-3 shadow-card sm:mt-12 sm:p-5 lg:grid-cols-[minmax(0,710px)_1fr] lg:gap-[52px]">
          <div className="relative min-h-[420px] overflow-hidden rounded-xl sm:min-h-[560px]">
            <img src={photo} alt={CASE_STUDY.photoAlt} className="absolute inset-0 size-full object-cover object-[50%_58%]" loading="lazy" />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-glow-violet)_0%,rgb(106_76_255/0.55)_26%,transparent_58%)]" />
            <div aria-hidden className="absolute top-[48%] left-[44%] size-[14%] min-h-20 min-w-20 border border-white/60">
              <span className="absolute -top-1.5 left-1/2 h-3 w-px bg-white/80" />
              <span className="absolute -bottom-1.5 left-1/2 h-3 w-px bg-white/80" />
            </div>
            <ul className="absolute bottom-[27%] left-[32%] font-mono text-[10px] tracking-wider text-white/80 uppercase">
              {CASE_STUDY.tags.map((t, i) => (
                <li key={t} className={i ? "opacity-60" : ""}>{t}</li>
              ))}
            </ul>
            <div className="absolute right-5 bottom-5 text-right text-white sm:right-7 sm:bottom-6">
              <p className="font-mono text-[10px] tracking-wider uppercase">{CASE_STUDY.statLabel}</p>
              <p className="text-[clamp(44px,6vw,72px)] leading-none tracking-[-0.04em]">{CASE_STUDY.stat}</p>
            </div>
          </div>

          <div className="flex flex-col py-2 pr-2 sm:py-5 sm:pr-5">
            <p className="flex items-center gap-2 text-[22px] font-semibold tracking-[0.14em] text-iris">
              <span className="inline-block size-5 rounded-[5px] bg-iris [clip-path:polygon(0_20%,100%_0,70%_100%,0_70%)]" aria-hidden />
              {CASE_STUDY.company}
            </p>
            <h3 className="mt-6 max-w-[440px] text-[clamp(22px,2.2vw,28px)] leading-[1.5] font-normal tracking-[-0.01em]">{CASE_STUDY.title}</h3>
            <ButtonLink href="#cta" variant="accent" size="sm" className="mt-5 w-fit">
              {CASE_STUDY.cta} <ChevronRight />
            </ButtonLink>
            <blockquote className="mt-10 text-[15px] leading-[1.75] text-muted">{CASE_STUDY.quote}</blockquote>
            <div className="mt-8 flex items-center gap-4">
              <img src={portrait} alt={CASE_STUDY.avatarAlt} className="size-12 rounded-[4px] object-cover grayscale" loading="lazy" />
              <p className="font-mono text-[12px] leading-5 tracking-wider text-muted uppercase">{CASE_STUDY.person}</p>
            </div>
            <p className="mt-auto pt-8 text-[11px] leading-5 text-faint">{CASE_STUDY.footnote}</p>
          </div>
        </article>
      </Container>
    </section>
  )
}
