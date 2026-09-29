import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

import { CaptionBlock } from "@/components/blocks/caption-block"
import { Photo } from "@/components/blocks/photo"
import { Starburst } from "@/components/blocks/starburst"
import { Container } from "@/components/ui/container"
import { useScrollScenes } from "@/hooks/use-media"
import { throughTheirEyes as copy } from "@/content"

/** The thumbnail each photograph shrinks to: 0.194 of the full frame. */
const THUMB = 0.194

/**
 * Two photographs of the same walk: what an adult sees, then what the child
 * saw. Pinned while the reader scrolls — the first grows out of a thumbnail
 * at the foot of the window, the second waits beside it as a thumbnail, then
 * takes its place while the first shrinks away into the top corner.
 *
 * Every move is transform or clip-path on one fixed box (the full frame), so
 * nothing re-lays out while it runs. Scroll-linked, so the reader sets the
 * pace and can scrub it back.
 */
function PinnedScene() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  // Through a function transform, so the opacities below stay on the JS value
  // rather than a native ScrollTimeline (see `meet-product.tsx`).
  const p = useTransform(scrollYProgress, (v) => v)

  // First photo: grows from the thumbnail at the bottom centre, then leaves
  // for the top-left corner, cropped narrower on the way.
  const aScale = useTransform(p, [0, 0.24, 0.46, 0.7], [THUMB, 1, 1, THUMB])
  const aOrigin = useTransform(p, (v) => (v < 0.46 ? "50% 100%" : "100% 0%"))
  const aShift = useTransform(p, [0.46, 0.7], [0, -16])
  const aTransform = useTransform([aScale, aShift], ([s, dx]) => `translateX(${dx}px) scale(${s})`)
  const aClip = useTransform(p, [0.46, 0.7], ["inset(0% 0% 0% 0% round 6px)", "inset(0% 0% 0% 44% round 30px)"])

  // Second photo: waits as a thumbnail to the right, then grows into the frame.
  const bOpacity = useTransform(p, [0.2, 0.28], [0, 1])
  const bScale = useTransform(p, [0.46, 0.7], [THUMB, 1])
  const bShift = useTransform(p, [0.46, 0.7], [1, 0])
  const bTransform = useTransform(
    [bScale, bShift],
    ([s, t]) => `translateX(calc(${t as number} * (100% + 16px))) scale(${s})`,
  )

  const aCaption = useTransform(p, [0.18, 0.26, 0.42, 0.48], [0, 1, 1, 0])
  const bCaption = useTransform(p, [0.66, 0.74], [0, 1])

  const frame = "absolute top-4 left-1/2 h-[calc(100vh-32px)] aspect-[500/720] -translate-x-1/2"
  return (
    <div ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <p className="absolute top-4 left-gutter text-label text-ink">{copy.label}</p>
        <div className={frame}>
          <motion.div className="absolute inset-0 rounded-photo" style={{ opacity: bOpacity, transform: bTransform, transformOrigin: "0% 100%" }}>
            <Photo photo={copy.after.photo} width={1400} className="size-full rounded-photo" />
          </motion.div>
          <motion.div className="absolute inset-0" style={{ transform: aTransform, transformOrigin: aOrigin, clipPath: aClip }}>
            <Photo photo={copy.before.photo} width={1400} className="size-full rounded-photo" />
          </motion.div>
          <motion.div className="absolute top-[34%] left-[calc(100%+16px)] w-[210px]" style={{ opacity: aCaption }}>
            <CaptionBlock label={copy.before.caption}>{copy.before.body}</CaptionBlock>
          </motion.div>
          <motion.div className="absolute top-[34%] left-[calc(100%+16px)] w-[210px]" style={{ opacity: bCaption }}>
            <CaptionBlock label={copy.after.caption}>{copy.after.body}</CaptionBlock>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/** Phones and reduced motion: the same two pictures, one after the other. */
function StackedScene() {
  return (
    <Container className="flex flex-col gap-10 pt-6">
      <p className="text-label text-ink">{copy.label}</p>
      {[copy.before, copy.after].map((part) => (
        <div key={part.caption} className="grid gap-4 sm:grid-cols-[1fr_210px] sm:items-center">
          <Photo photo={part.photo} width={1200} className="aspect-[500/720] w-full rounded-photo" />
          <CaptionBlock label={part.caption}>{part.body}</CaptionBlock>
        </div>
      ))}
    </Container>
  )
}

export function ThroughTheirEyes() {
  const pinned = useScrollScenes()
  return (
    <section id="through-their-eyes" aria-label={copy.label} className="relative">
      <div className="mx-gutter border-t border-hairline" />
      {pinned ? <PinnedScene /> : <StackedScene />}
      <div className="relative px-gutter pt-12 pb-[clamp(56px,6vw,60px)] md:pl-[calc(50%-((100vh-32px)*500/720)/2)]">
        <p className="max-w-[620px] font-serif text-serif font-normal tracking-[-0.02em] text-ink">{copy.closing}</p>
      </div>
      {/* Stuck across the edge where the page turns dark. */}
      <Starburst className="pointer-events-none absolute bottom-0 left-[clamp(24px,15.4%,190px)] z-10 w-[clamp(100px,14.2vw,170px)] translate-y-1/2" />
    </section>
  )
}
