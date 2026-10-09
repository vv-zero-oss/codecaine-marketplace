import { Marquee } from "@/components/motion/marquee"
import { PixelSprite } from "@/components/pixel/pixel-sprite"
import { CUSTOMER_LOGOS } from "@/content"

export function LogoStrip({ speed = 40 }: { speed?: number }) {
  return (
    <section aria-label="Customers" className="border-y-4 border-line bg-surface py-phi-3">
      <Marquee speed={speed}>
        {CUSTOMER_LOGOS.map((name) => (
          <span key={name} className="flex items-center gap-phi-4 font-display text-sm uppercase text-fg-muted">
            {name}
            <PixelSprite name="star" scale={3} className="opacity-60" />
          </span>
        ))}
      </Marquee>
    </section>
  )
}
