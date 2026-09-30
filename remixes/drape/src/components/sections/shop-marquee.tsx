import { Marquee } from "@/components/motion/marquee"
import { SHOPS } from "@/content"
import { cn } from "@/lib/utils"

/**
 * ShopMarquee — the proof row: the shops whose product pages carry Drape's
 * try-on button, drifting past under one quiet line.
 */
export function ShopMarquee({ title = "Fitting people for the shops they love", speed = 36 }: { title?: string; speed?: number }) {
  return (
    <section id="shops" className="bg-espresso pt-20 pb-6 sm:pt-24">
      <p className="px-4 text-center text-[14px] text-cream">{title}</p>
      <Marquee speed={speed} className="mt-10">
        {SHOPS.map((shop) => (
          <ShopMark key={shop.name} name={shop.name} font={shop.font} />
        ))}
      </Marquee>
    </section>
  )
}

export function ShopMark({ name, font }: { name: string; font: string }) {
  return <span className={cn("text-lg whitespace-nowrap text-cream-2 transition-colors hover:text-cream", font)}>{name}</span>
}
