import { motion, useTransform } from "motion/react"

import { EmailCapture } from "@/components/blocks/email-capture"
import { ClipZoomVideo } from "@/components/motion/clip-zoom-video"
import { useRange, useStageProgress } from "@/components/motion/progress"
import { LogoMark } from "@/components/ui/logo-mark"
import { media } from "@/content"

/**
 * The last ask, on bright footage: the window opens out from the middle as it
 * arrives and the camera settles back, the reverse of the hero's move.
 */
export function Closing() {
  return (
    <ClipZoomVideo
      src={media.closing.src}
      poster={media.closing.poster}
      mode="open"
      pin={0}
      insetX={14}
      insetY={16}
      radius={80}
      openRadius={40}
      zoom={1.35}
      scrim={0.22}
      label="Get started"
      id="cta"
      className="h-[86svh] px-2 sm:h-[92svh] sm:px-8"
    >
      <ClosingCopy />
    </ClipZoomVideo>
  )
}

function ClosingCopy() {
  const progress = useStageProgress()
  const opacity = useRange(progress, [0.45, 0.9], [0, 1])
  const lift = useTransform(useRange(progress, [0.45, 0.9], [20, 0]), (y) => `translateY(${y}px)`)
  return (
    <motion.div
      style={{ opacity, transform: lift }}
      className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-surface"
    >
      <LogoMark className="size-14 sm:size-20" />
      <h2 className="mt-5 font-display text-[clamp(2.25rem,3.4vw+1rem,4.5rem)] leading-[1.02] tracking-[-0.025em] text-balance">
        Every policy,
        <br />
        one quiet place
      </h2>
      <EmailCapture tone="glass" group="Closing" className="mt-8" />
    </motion.div>
  )
}
