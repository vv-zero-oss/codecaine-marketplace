import { useEffect, useState } from "react"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { Wordmark } from "@/components/ui/mark"
import { EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Tone = "light" | "dark" | "bare"

/**
 * Reads the tone of whichever scene is under the header — a `data-tone` on the
 * section — so the bar turns white over the film and drops its pill over the
 * closing gradient, as the page it copies does.
 */
function useToneUnderHeader(): Tone {
  const [tone, setTone] = useState<Tone>("light")
  useEffect(() => {
    let frame = 0
    const read = () => {
      frame = 0
      const hits = document.elementsFromPoint(window.innerWidth / 2, 56)
      const scene = hits.map((el) => el.closest<HTMLElement>("[data-tone]")).find(Boolean)
      setTone((scene?.dataset.tone as Tone) ?? "light")
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }
    read()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
  return tone
}

export function SiteHeader({ visible }: { visible: boolean }) {
  const tone = useToneUnderHeader()
  return (
    <motion.header
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: EASE_SWAP }}
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 pt-4 transition-colors duration-300 sm:px-gutter sm:pt-gutter",
        tone === "dark" ? "text-white" : "text-ink",
        !visible && "invisible",
      )}
    >
      <a href="#top" className="pointer-events-auto rounded-md text-[22px] sm:text-[29px]" aria-label="Codecaine home">
        <Wordmark />
      </a>
      <Button
        asChild
        variant={tone === "dark" ? "light" : tone === "bare" ? "ghost" : "default"}
        className={cn("pointer-events-auto h-11 sm:h-[38px]", tone === "bare" && "text-white")}
      >
        <a href="#access">Request access</a>
      </Button>
    </motion.header>
  )
}
