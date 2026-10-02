import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { X } from "lucide-react"
import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { buttonVariants } from "@/components/ui/button"
import { Link, usePathname } from "@/lib/router"

/**
 * A pill that appears in the corner once you have scrolled a screen down, and
 * can be dismissed for the visit. Not on the pages that already are a sign-up.
 */
export function FloatingCta({ after = 700 }: { after?: number }) {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const [past, setPast] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  useMotionValueEvent(scrollY, "change", (y) => setPast(y > after))
  useCanvasAction("Floating CTA", (next) => setDismissed(!(next ?? dismissed)), { on: !dismissed, group: "CTA" })
  const hidden = dismissed || pathname === "/get-started" || pathname === "/generator" || pathname === "/brand"
  return (
    <AnimatePresence>
      {past && !hidden ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: [0.22, 0.9, 0.24, 1] }}
          className="fixed bottom-[calc(var(--status-h)+12px)] right-3 z-40 flex items-center gap-1 bg-bg p-1.5 shadow-px-drop [--px-drop:rgba(0,0,0,0.5)] [--px-edge:var(--color-accent)] sm:right-6"
        >
          <Link href="/get-started" className={buttonVariants({ variant: "accent", size: "sm" })}>Start free</Link>
          <button aria-label="Dismiss" onClick={() => setDismissed(true)} className="grid size-11 place-items-center text-fg-muted hover:text-fg"><X className="size-4" /></button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
