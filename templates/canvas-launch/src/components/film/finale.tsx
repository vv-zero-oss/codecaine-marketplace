import { AnimatePresence, motion } from "motion/react"

import { Mark } from "@/components/ui/mark"
import { CAPTION_FROM, CAPTION_IN, CAPTION_OUT, EASE_FILM, EASE_SWAP, MOVE } from "@/lib/motion"
import { cn } from "@/lib/utils"

/*
 * The last beats: "bring it", "shape it", "ship it" on the bare paper, each
 * with the one piece of selection chrome that word earns — a guide, a box, a
 * box round the word — and then the mark, and the name typed out beside it.
 */

export type FinaleBeat = "bring" | "shape" | "ship" | "logo"

const WORDS: Record<Exclude<FinaleBeat, "logo">, string> = { bring: "bring it", shape: "shape it", ship: "ship it" }

export function Finale({ beat }: { beat: FinaleBeat | null }) {
  return (
    <div aria-hidden={beat === null} className="pointer-events-none absolute inset-0">
      <AnimatePresence>
        {beat !== null && beat !== "logo" && (
          <motion.div key="words" className="absolute inset-0" exit={{ opacity: 0, transition: { duration: CAPTION_OUT } }}>
            <Guides beat={beat} />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={beat}
                className="caption absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(32px,4.4vw,76px)] whitespace-nowrap text-ink"
                initial={{ opacity: CAPTION_FROM }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: CAPTION_OUT } }}
                transition={{ duration: CAPTION_IN, ease: EASE_SWAP }}
              >
                {WORDS[beat]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>{beat === "logo" && <Logo key="logo" />}</AnimatePresence>
    </div>
  )
}

/** A guide for "bring", a small box for "shape", the box round the word for "ship". */
function Guides({ beat }: { beat: Exclude<FinaleBeat, "logo"> }) {
  const box =
    beat === "bring"
      ? { w: 0, h: 0, x: 0, y: 0 }
      : beat === "shape"
        ? { w: 64, h: 64, x: -150, y: -70 }
        : { w: 260, h: 180, x: -130, y: -90 }
  return (
    <div className="absolute top-1/2 left-1/2">
      {/* The guides cross where the word sits and stay while the box grows */}
      <motion.span
        className="absolute top-[-50svh] left-0 h-[100svh] w-px bg-mark/70"
        initial={false}
        animate={{ x: beat === "bring" ? 90 : box.x, opacity: 1 }}
        transition={{ duration: MOVE, ease: EASE_FILM }}
      />
      <motion.span
        className="absolute top-0 left-[-50vw] h-px w-[100vw] bg-mark/70"
        initial={false}
        animate={{ y: beat === "bring" ? 30 : box.y + box.h, opacity: 1 }}
        transition={{ duration: MOVE, ease: EASE_FILM }}
      />
      <motion.span
        className="absolute border border-mark"
        initial={false}
        animate={{ width: box.w, height: box.h, x: box.x, y: box.y, opacity: beat === "bring" ? 0 : 1 }}
        transition={{ duration: MOVE, ease: EASE_FILM }}
      >
        {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((p) => (
          <span key={p} className={cn("absolute size-[7px] border border-mark bg-paper", p)} />
        ))}
      </motion.span>
    </div>
  )
}

/** The mark lands, then the name types out beside it, a letter at a time. */
function Logo() {
  const name = "Codecaine"
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[0.3em] text-[clamp(44px,5.6vw,96px)] text-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: CAPTION_OUT } }}
      transition={{ duration: CAPTION_IN }}
    >
      <motion.span initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: EASE_SWAP }}>
        <Mark className="size-[0.9em]" />
      </motion.span>
      <span className="flex font-semibold tracking-[-0.04em]" aria-label={name}>
        {name.split("").map((ch, i) => (
          <motion.span
            key={i}
            aria-hidden
            initial={{ opacity: 0, display: "none" }}
            animate={{ opacity: 1, display: "inline" }}
            transition={{ duration: 0.01, delay: 0.45 + i * 0.07 }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </motion.div>
  )
}
