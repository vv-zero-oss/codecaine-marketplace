import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

/**
 * The one piece of navigation: a mono link pinned to the top right, which
 * arrives once the masthead has scrolled away.
 */
export function CornerLink({ label, href, after = 240 }: { label: string; href: string; after?: number }) {
  const [shown, setShown] = useState(false)
  const [forced, setForced] = useState<boolean | null>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const update = () => setShown(window.scrollY > after)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [after])

  const visible = forced ?? shown
  useCanvasAction("Corner link", (on) => setForced(on ?? !visible), { on: visible, group: "Header" })

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={href}
          initial={{ opacity: 0, transform: reduce ? "none" : "translateY(-6px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          exit={{ opacity: 0, transform: reduce ? "none" : "translateY(-6px)" }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="label group fixed top-3 right-3 z-40 inline-flex min-h-11 items-center gap-1.5 bg-paper/90 px-3 text-ink backdrop-blur-sm sm:top-4 sm:right-4"
        >
          {label}
          <ArrowUpRight className="size-3 transition-transform duration-(--duration-hover) ease-(--ease-out) [@media(hover:hover)]:group-hover:translate-x-0.5 [@media(hover:hover)]:group-hover:-translate-y-0.5" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
