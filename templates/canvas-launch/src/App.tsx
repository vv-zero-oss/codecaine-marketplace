import { useCallback, useState } from "react"
import { motion } from "motion/react"

import { Access } from "@/components/access"
import { Film } from "@/components/film/film"
import { Button } from "@/components/ui/button"
import { Wordmark } from "@/components/ui/mark"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"
import { EASE_SWAP } from "@/lib/motion"

/**
 * Codecaine's launch page: the film, scrolled through beat by beat, then the
 * ask. The editor in the film is Codecaine's own UI drawn in code
 * (`components/mockup`, `components/canvas`).
 *
 * `data-canvas-ignore` on the page wrapper and `<main>`: structural, nothing of
 * their own to design, so the canvas editor looks through them (they stay in
 * its layers panel). See CLAUDE.md.
 */
export default function App() {
  useSmoothScroll()
  const [opened, setOpened] = useState(false)
  const onOpen = useCallback(() => setOpened(true), [])

  return (
    <div className="bg-paper text-ink" data-canvas-ignore>
      <motion.header
        className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 pt-4 sm:px-8 sm:pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE_SWAP }}
      >
        <a href="#film" className="pointer-events-auto text-[20px]" aria-label="Codecaine">
          <Wordmark />
        </a>
        <Button asChild size="sm" className="pointer-events-auto h-11 sm:h-9">
          <a href="#access">Request access</a>
        </Button>
      </motion.header>
      <main data-canvas-ignore>
        <Film onOpen={onOpen} />
        <Access />
      </main>
    </div>
  )
}
