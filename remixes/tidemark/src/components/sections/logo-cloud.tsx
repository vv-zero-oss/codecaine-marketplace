import { Marquee } from "@/components/motion/marquee"
import { BrandLogo } from "@/components/ui/brand-logo"
import { LOGO_ROW } from "@/content"

/** The companies that bank here, drifting past slowly under a hairline. */
export function LogoCloud({ title = "The operating account behind 9,000+ companies", speed = 50 }: { title?: string; speed?: number }) {
  return (
    <section id="customers" className="border-y border-line py-10">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-8 px-gutter md:flex-row md:gap-10">
        <p className="shrink-0 text-center text-[14px] text-ink-muted md:max-w-[200px] md:text-left">{title}</p>
        <Marquee speed={speed} className="w-full [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          {LOGO_ROW.map((logo) => (
            <BrandLogo key={logo} logo={logo} className="mx-7 opacity-80 md:mx-9" />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
