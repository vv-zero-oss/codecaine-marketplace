import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Doodle } from "@/components/mock/doodles"
import { WordReveal } from "@/components/motion/word-reveal"
import { Container } from "@/components/ui/container"

/**
 * What we believe, in one breath: a long serif sentence with its key
 * phrases in brand colours, inking in as it's read. In the corner, the
 * kettle doodle — touch it and it says hello.
 */
export function Manifesto({ bubble = "Psst — the kettle's on." }: { bubble?: string }) {
  const [hello, setHello] = useState(false)
  useCanvasAction("Doodle says hello", (next) => setHello(next ?? !hello), { on: hello, group: "Manifesto" })

  return (
    <section id="manifesto" className="scroll-mt-16 border-b border-line">
      <Container className="grid gap-10 py-[clamp(48px,6vw,96px)] md:grid-cols-[1fr_auto] md:items-end">
        <WordReveal
          className="max-w-[30ch] text-h2 leading-[1.02]"
          phrases={[
            { text: "At" },
            { text: "Side B Coffee", tone: "rust" },
            { text: "we believe the best song is usually on the flip side, so we go looking for it —" },
            { text: "roasting and pouring", tone: "sky" },
            { text: "the" },
            { text: "small-lot coffees", tone: "ember" },
            { text: "nobody else has heard of yet, and playing them loud for" },
            { text: "the neighbourhood", tone: "rust" },
            { text: "and yours." },
          ]}
        />
        <button
          className="relative mx-auto block w-fit md:mx-0"
          onMouseEnter={() => setHello(true)}
          onMouseLeave={() => setHello(false)}
          onClick={() => setHello((h) => !h)}
          aria-label="Say hello"
        >
          <AnimatePresence>
            {hello && (
              <motion.span
                className="type-label absolute -top-14 right-10 z-10 rounded-[50%] bg-cocoa px-5 py-3 text-[10.5px] whitespace-nowrap text-page"
                style={{ transformOrigin: "80% 100%" }}
                initial={{ opacity: 0, transform: "scale(0.9) translateY(6px)" }}
                animate={{ opacity: 1, transform: "scale(1) translateY(0px)" }}
                exit={{ opacity: 0, transform: "scale(0.95) translateY(4px)" }}
                transition={{ type: "spring", duration: 0.35, bounce: 0.25 }}
              >
                {bubble}
              </motion.span>
            )}
          </AnimatePresence>
          <Doodle name="kettle" className="w-28 sm:w-36" />
        </button>
      </Container>
    </section>
  )
}
