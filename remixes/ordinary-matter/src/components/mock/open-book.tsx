import type * as React from "react"
import { motion, type MotionValue } from "motion/react"

import { CoverArt } from "@/components/mock/cover-art"
import type { Spread } from "@/content/shop"
import { photo } from "@/lib/photos"
import { cn } from "@/lib/utils"

/**
 * The book as leaves, the way a real one works: each leaf has a front (a
 * right-hand page) and a back (the left-hand page you see once it turns).
 * Leaf 0 is the cover. A turned leaf rotates −180° around the spine.
 *
 * Unturned leaves stack lowest-first on the right; turned ones stack
 * highest-first on the left; the leaf in motion rides on top of both.
 */

type Face = { kind: "cover" } | { kind: "endpaper" } | { kind: "title" } | { kind: "text"; spread: Spread } | { kind: "photo"; spread: Spread } | { kind: "colophon" }

export function leavesFor(spreads: Spread[]): { front: Face; back: Face }[] {
  const leaves: { front: Face; back: Face }[] = [{ front: { kind: "cover" }, back: { kind: "endpaper" } }]
  let front: Face = { kind: "title" }
  for (const spread of spreads) {
    leaves.push({ front, back: { kind: "text", spread } })
    front = { kind: "photo", spread }
  }
  leaves.push({ front, back: { kind: "colophon" } })
  return leaves
}

/** Page type sized by the page itself (container units). */
function PageFace({ face, side }: { face: Face; side: "left" | "right" }) {
  const gutter = side === "left" ? "shadow-[inset_-18px_0_24px_-18px_rgb(60_40_20/0.35)]" : "shadow-[inset_18px_0_24px_-18px_rgb(60_40_20/0.35)]"
  if (face.kind === "cover") return <CoverArt className="rounded-r-[0.8cqw]" />
  if (face.kind === "endpaper")
    return (
      <div className={cn("@container flex size-full flex-col justify-end bg-kraft p-[10cqw] text-ink", gutter)}>
        <p className="font-serif text-[4cqw] italic">This volume belongs to</p>
        <span className="mt-[3cqw] block h-px w-[70%] bg-ink/40" />
      </div>
    )
  if (face.kind === "title")
    return (
      <div className={cn("@container flex size-full flex-col items-center justify-center bg-raised text-center text-ink", gutter)}>
        <p className="type-label text-[2.4cqw] text-ink-3">Volume 3</p>
        <p className="mt-[4cqw] font-serif text-[10cqw] leading-[0.92] tracking-[-0.04em]">Salt &amp;<br />Timber</p>
        <p className="mt-[4cqw] font-serif text-[3.4cqw] italic text-ink-2">Twelve makers at the water's edge</p>
      </div>
    )
  if (face.kind === "text")
    return (
      <div className={cn("@container flex size-full flex-col bg-raised px-[11cqw] pt-[11cqw] pb-[8cqw] text-ink", gutter)}>
        <p className="type-label text-[2.2cqw] text-ink-3">{face.spread.kicker}</p>
        <p className="mt-[4cqw] font-serif text-[5.2cqw] leading-[1.18] tracking-[-0.015em]">{face.spread.quote}</p>
        <p className="mt-auto font-serif text-[2.9cqw] leading-[1.55] text-ink-2 [text-wrap:pretty]">{face.spread.body}</p>
        <p className="mt-[5cqw] font-sans text-[2.2cqw] text-ink-3 tabular-nums">{face.spread.folio}</p>
      </div>
    )
  if (face.kind === "photo")
    return (
      <div className={cn("@container relative size-full bg-raised", gutter)}>
        <img src={photo(face.spread.photo, 900)} alt={face.spread.caption} className="absolute inset-0 size-full object-cover" draggable={false} />
        <span className={cn("pointer-events-none absolute inset-0", gutter)} />
        <p className="absolute bottom-[4cqw] left-[6cqw] font-serif text-[2.6cqw] text-page italic drop-shadow-sm">{face.spread.caption}</p>
      </div>
    )
  return (
    <div className={cn("@container flex size-full flex-col justify-end bg-raised p-[11cqw] text-ink-3", gutter)}>
      <p className="font-serif text-[2.8cqw] leading-relaxed">Printed on uncoated recycled cotton stock, sewn and bound in cloth. Set in a bookish serif and a quiet grotesk.</p>
      <p className="type-label mt-[4cqw] text-[2.2cqw]">Ordinary Matter — 2026</p>
    </div>
  )
}

/**
 * The open book: `turned` leaves have turned. Leaf 0's rotation can be driven
 * by a motion value (the scroll), so the cover opens under the reader's thumb.
 */
export function OpenBook({
  spreads,
  turned,
  coverRotation,
  flipping,
  className,
  style,
}: {
  spreads: Spread[]
  turned: number
  coverRotation?: MotionValue<number>
  /** The leaf currently in motion, lifted above the others. */
  flipping?: number | null
  className?: string
  style?: React.CSSProperties
}) {
  const leaves = leavesFor(spreads)
  const n = leaves.length
  return (
    <div className={cn("relative aspect-[8/5] [perspective:2400px]", className)} style={style}>
      {/* back board under everything on the right, and its shadow */}
      <div className="absolute inset-y-[-1.2%] right-[-0.8%] left-1/2 rounded-r-[6px] bg-moss shadow-(--shadow-book)" />
      {turned > 0 && <div className="absolute inset-y-[-1.2%] right-1/2 left-[-0.8%] rounded-l-[6px] bg-moss shadow-(--shadow-book)" />}
      {/* page block thickness on each side */}
      <div className="absolute inset-y-[-0.4%] right-[-0.4%] left-1/2 bg-[repeating-linear-gradient(90deg,#efe7d5_0_1px,#ddd2bb_1px_2px)]" />
      {turned > 0 && <div className="absolute inset-y-[-0.4%] right-1/2 left-[-0.4%] bg-[repeating-linear-gradient(90deg,#efe7d5_0_1px,#ddd2bb_1px_2px)]" />}
      {leaves.map((leaf, i) => {
        const isTurned = i < turned
        const z = flipping === i ? 200 : isTurned ? i + 1 : n - i + 1
        const drive = i === 0 && coverRotation
        return (
          <motion.div
            key={i}
            className="absolute inset-y-0 right-0 left-1/2 origin-left [transform-style:preserve-3d]"
            style={drive ? { zIndex: z, rotateY: coverRotation } : { zIndex: z }}
            initial={false}
            animate={drive ? undefined : { rotateY: isTurned ? -180 : 0 }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="absolute inset-0 overflow-hidden [backface-visibility:hidden]">
              <PageFace face={leaf.front} side="right" />
            </div>
            <div className="absolute inset-0 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <PageFace face={leaf.back} side="left" />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
