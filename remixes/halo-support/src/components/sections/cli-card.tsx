import { animate } from "motion/react"
import { Play } from "lucide-react"
import { useEffect, useState } from "react"

import { useStill } from "@/components/motion"
import { cn } from "@/lib/utils"

const SCRIPT = ["halo --help", "halo validate", "halo ship --canary 10%"]

/** The little terminal card in the hero's corner: types a command, lets it
 *  sit, clears, types the next. */
export function CliCard({ title = "Introducing Halo CLI", length = "1:08", className }: { title?: string; length?: string; className?: string }) {
  const still = useStill()
  const [line, setLine] = useState(0)
  const [chars, setChars] = useState(still ? SCRIPT[0].length : 0)

  useEffect(() => {
    if (still) return
    const text = SCRIPT[line]
    const typing = animate(0, text.length, {
      duration: text.length * 0.07,
      ease: "linear",
      onUpdate: (v) => setChars(Math.floor(v)),
      onComplete: () => window.setTimeout(() => setLine((l) => (l + 1) % SCRIPT.length), 1700),
    })
    return () => typing.stop()
  }, [line, still])

  return (
    <div className={cn("w-full max-w-[230px] rounded-card border border-line-strong bg-surface/70 p-2 shadow-card backdrop-blur-md", className)}>
      <p className="px-1.5 pt-1 pb-2 text-[13px] text-text">{title}</p>
      <div className="h-[84px] rounded-[8px] bg-black p-3 font-mono text-[9px] leading-4 text-muted">
        <p className="text-faint">Run halo --help to get started.</p>
        <p className="mt-1.5 text-text">
          <span className="text-faint">~ % </span>
          {SCRIPT[line].slice(0, chars)}
          <span className="ml-px inline-block h-2.5 w-[5px] translate-y-px bg-text [animation:caret_1s_steps(1)_infinite]" />
        </p>
      </div>
      <button type="button" className="mt-1 flex w-full items-center gap-2 rounded-md px-1.5 py-1.5 text-[11px] text-muted transition-colors hover:text-text">
        <span className="flex size-4 items-center justify-center rounded-full bg-white/15"><Play className="size-2 fill-current" /></span>
        Watch the film
        <span className="ml-auto tabular-nums">{length}</span>
      </button>
    </div>
  )
}
