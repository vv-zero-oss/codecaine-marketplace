import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react"
import { useEffect } from "react"

import { useFinePointer } from "@/components/use-viewport"
import { EASE_OUT_QUINT } from "@/lib/motion"

/**
 * A small frame that trails the pointer while a row is hovered, so a ledger
 * can be read fast and still show what each line is. Only on devices with a
 * real hover; `src` empty hides it.
 */
export function CursorPreview({
  src = "",
  width = 176,
  offsetX = 26,
  offsetY = -64,
  stiffness = 500,
}: {
  src?: string
  width?: number
  offsetX?: number
  offsetY?: number
  stiffness?: number
}) {
  const fine = useFinePointer()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const x = useSpring(px, { stiffness, damping: 40, mass: 0.5 })
  const y = useSpring(py, { stiffness, damping: 40, mass: 0.5 })

  useEffect(() => {
    if (!fine) return
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX + offsetX)
      py.set(e.clientY + offsetY)
    }
    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [fine, offsetX, offsetY, px, py])

  return (
    <AnimatePresence>
      {fine && src && (
        <motion.div
          key="preview"
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-30"
          style={{ x, y, width }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.18, ease: EASE_OUT_QUINT }}
        >
          <img src={src} alt="" className="aspect-[4/5] w-full object-cover" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
