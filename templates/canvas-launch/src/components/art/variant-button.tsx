import type * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"

export type Variant = "default" | "purple" | "game"

/**
 * The button a project installed, rendered in whichever variant its prop says
 * — the plain default, a purple pill, or a chunky 3D game button that presses
 * down onto its own edge. Switching variants cross-fades the look, the way a
 * prop change re-renders a running component.
 */
export function VariantButton({ variant, children }: { variant: Variant; children: React.ReactNode }) {
  return (
    <div className="relative grid place-items-center [perspective:600px]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.button
          key={variant}
          type="button"
          initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
          transition={{ duration: 0.4, ease: EASE_SWAP }}
          className={cn(
            "cursor-pointer font-semibold whitespace-nowrap transition-[transform,box-shadow] duration-100",
            variant === "default" && "h-11 rounded-[8px] bg-site-feature px-6 text-[15px] text-site-on-feature",
            variant === "purple" &&
              "h-12 rounded-pill bg-[linear-gradient(135deg,var(--color-art-violet),var(--color-art-game))] px-7 text-[16px] text-on-accent shadow-[0_10px_30px_-8px_var(--color-art-game)]",
            variant === "game" &&
              "h-14 translate-y-0 rounded-[14px] bg-art-game px-9 text-[18px] tracking-[0.08em] text-on-accent uppercase shadow-[0_8px_0_var(--color-art-game-edge),0_14px_30px_-6px_var(--color-art-game-glow)] [text-shadow:0_2px_0_var(--color-art-game-edge)] active:translate-y-[6px] active:shadow-[0_2px_0_var(--color-art-game-edge),0_6px_16px_-6px_var(--color-art-game-glow)]",
          )}
        >
          {children}
        </motion.button>
      </AnimatePresence>
    </div>
  )
}
