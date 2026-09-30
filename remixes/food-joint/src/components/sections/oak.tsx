import { useId, useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

import { ClipShape } from "@/components/blocks/clip-shape"
import { Eyebrow } from "@/components/blocks/eyebrow"
import { Film } from "@/components/blocks/film"
import { Container } from "@/components/ui/container"
import { films, oak } from "@/content"
import { useMedia } from "@/hooks/use-media"
import { DURATION, EASE_OUT, STAGGER } from "@/lib/motion"

/**
 * The word, cut out of a forest-green sheet (an SVG mask), with the embers
 * film burning behind it. Pinned while you scroll: the sheet zooms towards
 * you until you pass through the letters, it falls away, and the film fills
 * the screen with the reason we cook over wood set over it.
 */
function ZoomThrough() {
  const id = `oak-${useId().replace(/[^a-zA-Z0-9]/g, "")}`
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const scale = useTransform(p, [0, 0.62], [1, 16], { ease: (t) => t * t * t })
  const sheet = useTransform(p, [0.42, 0.6], [1, 0])
  const shade = useTransform(p, [0.55, 0.8], [0, 0.7])
  const copy = useTransform(p, [0.66, 0.84], [0, 1])
  const copyY = useTransform(p, [0.66, 0.84], ["24px", "0px"])

  return (
    <div ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <Film film={films.embers} />
        <motion.div aria-hidden className="absolute inset-0 bg-forest-deep" style={{ opacity: shade }} />
        <motion.svg
          aria-hidden
          className="absolute -inset-1 h-[calc(100%+8px)] w-[calc(100%+8px)] will-change-transform"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
          style={{ scale, opacity: sheet }}
        >
          <defs>
            <mask id={id}>
              <rect width="1000" height="1000" fill="white" />
              <text
                x="500"
                y="500"
                textAnchor="middle"
                dominantBaseline="central"
                fill="black"
                style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontStretch: "125%", fontSize: 330, letterSpacing: "-0.03em" }}
              >
                {oak.word.toUpperCase()}
              </text>
            </mask>
          </defs>
          <rect width="1000" height="1000" className="fill-forest" mask={`url(#${id})`} />
        </motion.svg>

        <motion.div className="absolute inset-x-0 bottom-0 px-gutter pb-row" style={{ opacity: copy, y: copyY }}>
          <Eyebrow className="text-lime">{oak.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-[12ch] font-heavy text-title text-cream">{oak.title}</h2>
          <p className="mt-6 max-w-[48ch] text-body text-on-forest">{oak.body}</p>
        </motion.div>
      </div>
    </div>
  )
}

/** Small screens and reduced motion: the same idea without the pin — the
 *  film seen through the word, and the copy under it. */
export function StillCutout() {
  const id = `oak-still-${useId().replace(/[^a-zA-Z0-9]/g, "")}`
  return (
    <div className="px-gutter pt-section">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Film film={films.embers} />
        {/* A touch larger than its box, so no sliver of film shows at the edge. */}
        <svg aria-hidden className="absolute -inset-1 h-[calc(100%+8px)] w-[calc(100%+8px)]" viewBox="0 0 1000 750" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id={id}>
              <rect width="1000" height="750" fill="white" />
              <text x="500" y="375" textAnchor="middle" dominantBaseline="central" textLength="880" lengthAdjust="spacingAndGlyphs" fill="black" style={{ fontFamily: "Archivo, sans-serif", fontWeight: 900, fontStretch: "125%", fontSize: 400 }}>
                {oak.word.toUpperCase()}
              </text>
            </mask>
          </defs>
          <rect width="1000" height="750" className="fill-forest" mask={`url(#${id})`} />
        </svg>
      </div>
      <Eyebrow className="mt-row text-lime">{oak.eyebrow}</Eyebrow>
      <h2 className="mt-4 font-heavy text-title text-cream">{oak.title}</h2>
      <p className="mt-6 max-w-[48ch] text-body text-on-forest">{oak.body}</p>
    </div>
  )
}

/**
 * The difference, told with fire: the zoom through the word, then three
 * short films — the wood split, burned, and the bird fried — each in its own
 * shape. The films open upward out of a clip as they come into view, one
 * after another.
 */
export function Oak() {
  const pin = useMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)")
  return (
    <section id="oak" data-tone="dark" className="bg-forest text-cream">
      {pin ? <ZoomThrough /> : <StillCutout />}

      <Container className="grid gap-x-6 gap-y-row py-section md:grid-cols-3">
        {oak.scenes.map((scene, i) => (
          <motion.article
            key={scene.title}
            className={i === 1 ? "md:mt-24" : undefined}
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: DURATION.reveal + 0.2, ease: EASE_OUT, delay: i * STAGGER * 3 }}
          >
            <ClipShape shape={scene.shape} className="aspect-[4/5] w-full bg-forest-deep">
              <Film film={scene.film} />
            </ClipShape>
            <h3 className="mt-6 font-heavy text-[clamp(26px,2.6vw,40px)] leading-none text-lime">{scene.title}</h3>
            <p className="mt-3 text-body text-on-forest-muted">{scene.note}</p>
          </motion.article>
        ))}
      </Container>
    </section>
  )
}
