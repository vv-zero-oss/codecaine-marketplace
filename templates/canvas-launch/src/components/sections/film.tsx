import { useRef } from "react"
import { AnimatePresence, motion, useTransform } from "motion/react"

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Scene } from "@/components/ui/scene"
import { SwapText } from "@/components/ui/swap-text"
import { FILM } from "@/content/photos"
import { useSceneStep } from "@/hooks/use-scene-step"
import { EASE_SWAP } from "@/lib/motion"

/**
 * A full-bleed film between the product and the ask. Scrolling moves through
 * three shots (a slow push-in on each, scrubbed, so the still reads as
 * footage); the play button opens the clip itself in a dialog.
 */
export function Film() {
  // No footage, no film: the page closes the gap rather than showing an empty frame.
  return FILM.length > 0 ? <FilmScene /> : null
}

function FilmScene() {
  const ref = useRef<HTMLElement>(null)
  const { step, progress } = useSceneStep(ref, FILM.length)
  const scale = useTransform(progress, [0, 1], [1.08, 1])
  const shot = FILM[step]

  return (
    <Scene ref={ref} beats={3} tone="dark" id="film" aria-label="Film" stageClassName="bg-night text-white">
      <motion.div className="absolute inset-0" style={{ scale }}>
        <AnimatePresence initial={false}>
          {shot && (
            <motion.img
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              className="absolute inset-0 size-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE_SWAP }}
            />
          )}
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-night/25 via-night/10 to-night/60" />

      <Dialog>
        <DialogTrigger
          aria-label="Play the film"
          className="group absolute top-1/2 left-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-pill outline-none focus-visible:ring-[3px] focus-visible:ring-white/60"
        >
          <svg viewBox="0 0 84 86" className="ml-2 w-[clamp(56px,5.8vw,84px)] fill-white transition-transform duration-200 ease-press group-hover:scale-105 group-active:scale-95">
            <path d="M0 5.2C0 1.3 4.2-1.1 7.6.9l72.6 38c3.4 1.9 3.4 6.8 0 8.7L7.6 85.1C4.2 87.1 0 84.7 0 80.8Z" />
          </svg>
        </DialogTrigger>
        <DialogContent className="max-w-[min(1200px,calc(100%-2rem))]">
          <DialogTitle className="sr-only">Codecaine — the film</DialogTitle>
          <DialogDescription className="sr-only">People designing their running apps.</DialogDescription>
          {shot && (
            <video
              src={shot.video}
              poster={shot.src}
              className="aspect-video w-full rounded-window bg-night object-cover"
              controls
              autoPlay
              playsInline
            />
          )}
        </DialogContent>
      </Dialog>

      <div className="absolute inset-x-0 bottom-[7svh] flex flex-col items-center gap-4 px-4 text-center">
        <SwapText id="film" className="text-[clamp(36px,3.9vw,56px)]">
          Design the app, not a picture of it
        </SwapText>
        <p className="max-w-[46ch] text-[clamp(15px,1.25vw,18px)] leading-snug text-white/90">
          No mockup to hand over. Point Codecaine at localhost and design what is really running.
        </p>
      </div>
    </Scene>
  )
}
