import { motion } from "motion/react"
import { useState } from "react"

import { useArchive } from "@/components/archive-state"
import { CursorPreview } from "@/components/motion/cursor-preview"
import { useFinePointer } from "@/components/use-viewport"
import { Container } from "@/components/ui/container"
import { FRAMES, type Frame } from "@/frames"
import { photo } from "@/lib/image"

/**
 * The archive as a ledger: one row per frame. A row inverts to ink under the
 * pointer, and the frame itself follows the pointer beside it — so the list
 * can be read fast and still show what each line is.
 */
export function ArchiveList({ onOpen }: { onOpen: (frame: Frame) => void }) {
  const { matches } = useArchive()
  const fine = useFinePointer()
  const rows = FRAMES.filter(matches)
  const [hovered, setHovered] = useState<Frame | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.1 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      onPointerLeave={() => setHovered(null)}
    >
      <Container className="pb-24">
        <div className="hidden grid-cols-[4rem_1.4fr_1fr_1fr_1fr_auto] gap-4 border-b border-hairline pb-2 text-ui uppercase tracking-ui text-muted md:grid">
          <span>No.</span>
          <span>Project</span>
          <span>Location</span>
          <span>Type</span>
          <span>Edit</span>
          <span className="w-20" />
        </div>
        <ul>
          {rows.map((frame) => (
            <li key={frame.id}>
              <button
                type="button"
                onClick={() => onOpen(frame)}
                onPointerEnter={() => fine && setHovered(frame)}
                className="group/row grid min-h-11 w-full grid-cols-[3rem_1fr_auto] items-center gap-x-4 py-2 text-left text-body text-ink outline-none hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper md:min-h-0 md:grid-cols-[4rem_1.4fr_1fr_1fr_1fr_auto] md:py-[5px]"
              >
                <span className="tabular-nums">{String(frame.n).padStart(3, "0")}</span>
                <span className="truncate">{frame.name}</span>
                <span className="hidden text-muted group-hover/row:text-paper/70 truncate md:block">{frame.place}</span>
                <span className="hidden text-muted group-hover/row:text-paper/70 md:block">{frame.category}</span>
                <span className="hidden text-muted group-hover/row:text-paper/70 md:block">{frame.edit}</span>
                <span className="w-20 text-right text-ui uppercase tracking-ui">[ Open ]</span>
              </button>
            </li>
          ))}
        </ul>
        {rows.length === 0 && <p className="py-16 text-center text-muted">Nothing matches. Clear the filter to see every frame.</p>}
      </Container>

      <CursorPreview src={hovered ? photo(hovered.id, 176, 220) : ""} />
    </motion.div>
  )
}
