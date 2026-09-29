import { useState } from "react"

import { useArchive } from "@/components/archive-state"
import { CursorPreview } from "@/components/motion/cursor-preview"
import { useScrollTo } from "@/components/smooth-scroll"
import { useFinePointer } from "@/components/use-viewport"
import { Container } from "@/components/ui/container"
import { SectionHead } from "@/components/ui/section-head"
import { FRAMES, type Edit } from "@/frames"
import { photo } from "@/lib/image"
import { EDITS } from "./studio"

type Tool = { name: string; line: string; time: string; image: number; edit?: Edit }

const TOOLS: Tool[] = [
  { name: "Relight", line: "Move the sun to any hour; lamps on behind the glass.", time: "11s", image: 4933643, edit: "Relight" },
  { name: "Sky", line: "Replace a white sky with one that agrees with the light.", time: "07s", image: 12903905, edit: "Sky" },
  { name: "Season", line: "Grow the planting to the year the scheme is about.", time: "14s", image: 740587, edit: "Season" },
  { name: "Grade", line: "Match a whole set to one reference frame.", time: "04s", image: 29012619, edit: "Grade" },
  { name: "Declutter", line: "Cars, cones, bins and scaffold tags — gone, the paving rebuilt.", time: "09s", image: 20111365 },
  { name: "Stage", line: "Furnish an empty interior from your own FF&E schedule.", time: "22s", image: 38246112 },
  { name: "True verticals", line: "Correct converging lines without cropping the roof off.", time: "02s", image: 11540260 },
  { name: "Upscale", line: "Print a phone snap at A1 without it going soft.", time: "06s", image: 2747599 },
]

/**
 * Every edit Mullion makes, as a ledger. A row inverts under the pointer and
 * shows the kind of frame it is for beside the cursor; the four that run in
 * the studio above open there.
 */
export function Toolkit() {
  const { openInStudio } = useArchive()
  const scrollTo = useScrollTo()
  const fine = useFinePointer()
  const [hovered, setHovered] = useState<Tool | null>(null)

  const tryTool = (tool: Tool) => {
    if (!tool.edit) return
    const frame = FRAMES.find((f) => f.id === EDITS[tool.edit!].sample) ?? FRAMES[0]
    openInStudio(frame, tool.edit)
    scrollTo("#studio", { offset: -8 })
  }

  return (
    <section id="tools" className="pb-section" aria-labelledby="tools-title">
      <Container>
        <SectionHead index="02" label="Eight edits" aside="Time per frame, full resolution" />
        <h2 id="tools-title" className="my-12 max-w-[22ch] text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.05] font-extrabold tracking-[-0.04em]">
          The edits you used to send out, done at your desk.
        </h2>
        <ul
          onPointerLeave={() => setHovered(null)}
          className="border-t border-hairline"
        >
          {TOOLS.map((tool, i) => (
            <li key={tool.name}>
              <button
                type="button"
                onClick={() => tryTool(tool)}
                onPointerEnter={() => fine && setHovered(tool)}
                disabled={!tool.edit}
                className="group/row grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 border-b border-hairline py-4 text-left outline-none hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper disabled:cursor-default md:grid-cols-[4rem_14rem_1fr_4rem_7rem] md:py-3"
              >
                <span className="text-ui tabular-nums text-muted group-hover/row:text-paper/60">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-ui uppercase tracking-ui">{tool.name}</span>
                <span className="col-start-2 row-start-2 text-body text-muted group-hover/row:text-paper/70 md:col-start-auto md:row-start-auto">
                  {tool.line}
                </span>
                <span className="hidden text-ui tabular-nums md:block">{tool.time}</span>
                <span className="col-start-3 row-start-1 text-right text-ui uppercase tracking-ui md:col-start-auto md:row-start-auto">
                  {tool.edit ? "[ Try it ]" : <span className="text-muted group-hover/row:text-paper/60">In the app</span>}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Container>

      <CursorPreview src={hovered ? photo(hovered.image, 192, 240) : ""} />
    </section>
  )
}
