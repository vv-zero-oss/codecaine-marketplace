import { Marquee } from "@/components/motion/marquee"
import { BrandLogo } from "@/components/ui/brand-logo"
import { LOGO_ROW } from "@/content"

/** A slow, endless row of customer logos, fading out at both edges. */
export function LogoCloud({ title = "Trusted by teams who live in their inbox", speed = 45 }: { title?: string; speed?: number }) {
  return (
    <section id="customers" className="py-12 md:py-16">
      <p className="text-center text-[14px] text-ink-muted md:text-[15px]">{title}</p>
      <Marquee
        speed={speed}
        className="mx-auto mt-8 max-w-[1120px] [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
      >
        {LOGO_ROW.map((logo) => (
          <BrandLogo key={logo} logo={logo} className="mx-7 md:mx-9" />
        ))}
      </Marquee>
    </section>
  )
}
