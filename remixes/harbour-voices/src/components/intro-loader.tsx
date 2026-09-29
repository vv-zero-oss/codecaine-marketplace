import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"

import { Bracket } from "@/components/ui/bracket"
import { ScrambleText } from "@/components/ui/scramble-text"
import { project } from "@/content"
import { ease, prefersReducedMotion } from "@/lib/motion"

const PER_CHAR = 16

/**
 * The first thing a visitor reads: one line about the archive, decoded into
 * place letter by letter, while the portraits load behind it. Then it lifts
 * away and the grid's own intro takes over. `[ SKIP ]` goes straight to the
 * grid. Shown once per visit.
 */
export function IntroLoader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(false)
      return
    }
    const reading = project.intro.length * PER_CHAR + 200 + 1600
    const id = window.setTimeout(() => setVisible(false), reading)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="intro"
          role="status"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: ease.outQuart }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-paper px-gutter"
        >
          <p className="max-w-[27rem] text-body text-ink">
            <ScrambleText text={project.intro} speed={PER_CHAR} delay={200} />
          </p>
          <div className="absolute inset-x-0 bottom-[max(4.5rem,9vh)] flex justify-center">
            <Bracket onClick={() => setVisible(false)}>Skip</Bracket>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
