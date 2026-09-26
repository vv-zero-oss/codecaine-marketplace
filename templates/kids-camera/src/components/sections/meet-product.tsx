import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { Play } from "lucide-react"

import { Photo } from "@/components/blocks/photo"
import { buttonVariants } from "@/components/ui/button"
import { useScrollScenes } from "@/hooks/use-media"
import { product } from "@/content"
import { cn } from "@/lib/utils"

/**
 * The product, introduced by name.
 *
 * The frame comes up the page inset and dimmed, then — held in place — opens
 * out to the gutters and brightens, the way a room's lights come up. Only
 * when it is fully open do the two words slide out from behind the camera to
 * either edge: the name is the payoff, so it waits for the picture.
 *
 * The play button is where a product film goes; it links to `#film`.
 */
export function MeetProduct() {
  const ref = useRef<HTMLElement>(null)
  const pinned = useScrollScenes()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  // Read through a function transform on purpose. A range-mapped opacity taken
  // straight off scroll progress is handed to the browser's native
  // ScrollTimeline, which placed this pinned section's range wrongly: the
  // progress value read 1 while the words sat at 0 and the dim at full. The
  // function keeps the whole scene on the JS value, which is correct.
  const p = useTransform(scrollYProgress, (v) => v)

  // Progress runs over the pin: the frame opens in the first third, the
  // words follow, and the last stretch holds the finished picture.
  const scale = useTransform(p, [0, 0.35], [0.875, 1])
  const transform = useTransform(scale, (s) => `scale(${s})`)
  const dim = useTransform(p, [0, 0.35], [0.45, 0])
  const words = useTransform(p, [0.38, 0.52], [0, 1])
  const wordsLate = useTransform(p, [0.42, 0.56], [0, 1])
  const meetX = useTransform(words, (v) => `translateX(${(1 - v) * 40}px)`)
  const nameX = useTransform(wordsLate, (v) => `translateX(${(v - 1) * 40}px)`)

  const word = "absolute top-1/2 -translate-y-1/2 text-product font-normal tracking-tight text-ink"
  return (
    <section ref={ref} data-tone="dark" aria-label={`${product.before} ${product.after}`} className={cn("relative bg-night", pinned ? "h-[260vh]" : "")}>
      <div className={cn(pinned ? "sticky top-0 h-screen" : "px-gutter py-6")}>
        <motion.div
          className={cn("overflow-hidden", pinned ? "absolute inset-x-gutter top-[58px] bottom-gutter" : "relative aspect-[4/3]")}
          style={pinned ? { transform } : undefined}
        >
          <Photo photo={product.photo} width={2400} className="absolute inset-0" />
          {pinned && <motion.div aria-hidden className="absolute inset-0 bg-night" style={{ opacity: dim }} />}
          <motion.span className={cn(word, "left-[clamp(12px,1.6vw,20px)]")} style={pinned ? { opacity: words, transform: meetX } : undefined}>
            {product.before}
          </motion.span>
          <motion.span className={cn(word, "right-[clamp(12px,1.4vw,18px)]")} style={pinned ? { opacity: wordsLate, transform: nameX } : undefined}>
            {product.after}
          </motion.span>
          <a
            href="#film"
            aria-label={product.play}
            className={cn(
              buttonVariants({ variant: "cream", size: "none" }),
              "absolute top-1/2 left-1/2 size-[clamp(44px,4.8vw,58px)] -translate-x-1/2 -translate-y-1/2 bg-cream shadow-play [@media(hover:hover)]:hover:scale-105",
            )}
          >
            <Play className="size-[40%] fill-ink" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
