import type * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check } from "lucide-react"

import { EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"

export type Status = {
  title: string
  tag: string
  done?: string
  doing?: string
  finished?: boolean
}

/**
 * The card that narrates what the editor is doing beside the zoomed panel.
 * Its rows change in place (a short blur swap) rather than the card being
 * replaced, so it reads as one job moving along.
 */
export function StatusCard({ status, className }: { status: Status; className?: string }) {
  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.45, ease: EASE_SWAP } }}
      className={cn("overflow-hidden rounded-card bg-surface shadow-card", className)}
    >
      <motion.div layout="position" className="flex items-start gap-3 px-[clamp(18px,2.2vw,32px)] py-[clamp(16px,1.9vw,28px)]">
        <span className="mt-[3px] grid size-5 shrink-0 place-items-center">
          {status.finished ? (
            <span className="size-2.5 rounded-full bg-mint shadow-live" />
          ) : (
            <span className="size-[18px] animate-spin-fast rounded-full border-2 border-ink/15 border-t-ink" />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <Swap id={status.title} className="text-[clamp(15px,1.25vw,18px)] leading-6 font-medium tracking-[-0.01em]">
            {status.title}
          </Swap>
          <AnimatePresence initial={false}>
            {!status.finished && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: EASE_SWAP }}
                className="font-mono text-[clamp(12px,1vw,14.5px)] leading-[27px]"
              >
                <Swap id={status.done ?? ""} className="flex items-center gap-2 text-ink-faint">
                  <Check className="size-4" strokeWidth={2} /> {status.done}
                </Swap>
                <Swap id={status.doing ?? ""} className="truncate text-ink">
                  {status.doing}
                </Swap>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Swap id={status.tag} className="font-mono text-[clamp(12px,1vw,14.5px)] leading-6 text-ink">
          {status.tag}
        </Swap>
      </motion.div>
    </motion.div>
  )
}

function Swap({ id, className, children }: { id: string; className?: string; children: React.ReactNode }) {
  return (
    <div className="grid">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={id}
          className={cn("[grid-area:1/1]", className)}
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: EASE_SWAP }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
