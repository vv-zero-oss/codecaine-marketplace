import { motion, useTransform } from "motion/react"

import { EmailCapture } from "@/components/blocks/email-capture"
import { ClipZoomVideo } from "@/components/motion/clip-zoom-video"
import { useRange, useStageProgress } from "@/components/motion/progress"
import { Ticker } from "@/components/motion/ticker"
import { media } from "@/content"

/**
 * Full-bleed footage of someone driving, with the promise over it. Scrolling
 * holds the frame while a clip-path closes it in toward the centre and the
 * camera pushes in, then lets it go as a rounded window.
 */
export function Hero() {
  return (
    <ClipZoomVideo
      src={media.hero.src}
      poster={media.hero.poster}
      mode="close"
      pin={0.9}
      insetX={9}
      insetY={11}
      radius={44}
      zoom={1.32}
      scrim={0.3}
      label="Glovebox"
      id="top"
    >
      <HeroCopy />
    </ClipZoomVideo>
  )
}

function HeroCopy() {
  const progress = useStageProgress()
  const opacity = useRange(progress, [0, 0.45], [1, 0])
  const lift = useTransform(useRange(progress, [0, 0.45], [0, -48]), (y) => `translateY(${y}px)`)

  return (
    <>
      <motion.div
        style={{ opacity, transform: lift }}
        className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-surface"
      >
        <h1 className="font-display text-[clamp(2.875rem,5.4vw+1rem,6rem)] leading-[0.98] tracking-[-0.03em] text-balance">
          You drive the car.
          <br />
          <em>Not the paperwork.</em>
        </h1>
        <p className="mt-9 text-[15px] text-surface sm:mt-12 sm:text-[17px]">Let Glovebox run your car insurance</p>
        <Ticker className="mt-2 w-full" />
      </motion.div>
      <motion.div style={{ opacity }} className="absolute inset-x-0 bottom-4 flex justify-center px-4 sm:bottom-5">
        <EmailCapture tone="glass" group="Hero" />
      </motion.div>
    </>
  )
}
