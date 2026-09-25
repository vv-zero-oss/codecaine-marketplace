import { useEffect, useState } from "react"

import { LiveDot } from "@/components/blocks/live-dot"
import { stats } from "@/content"

const format = new Intl.NumberFormat("en-US")

/**
 * The live ticker under the hero. The counts creep up every few seconds —
 * state, not decoration: it says the agents are working while you read. On
 * phones the row drifts sideways as a marquee instead of wrapping into a
 * block of numbers.
 */
export function StatsBand() {
  const values = useTicking()
  const items = stats.map((s, i) => (
    <li key={s.label} className="flex shrink-0 items-center gap-3 px-5 lg:px-0">
      {s.value === null && <LiveDot />}
      <span className="text-[10px] font-medium tracking-[0.08em] text-ink-soft uppercase">{s.label}</span>
      {s.value !== null && (
        <span className="text-[12px] font-semibold tabular-nums">
          {s.prefix}
          {format.format(values[i] ?? s.value)}
          {s.suffix}
        </span>
      )}
    </li>
  ))

  return (
    <div className="border-y border-line bg-canvas" aria-label="Live platform numbers">
      <div className="mx-auto hidden h-14 max-w-(--spacing-frame) items-center justify-between px-(--spacing-gutter) lg:flex">
        <ul className="flex w-full items-center justify-between">{items}</ul>
      </div>
      <div className="flex h-12 overflow-hidden lg:hidden">
        <ul className="flex w-max animate-marquee items-center motion-reduce:animate-none">
          {items}
          {items.map((el) => (
            <el.type {...el.props} key={`${el.key}-copy`} aria-hidden />
          ))}
        </ul>
      </div>
    </div>
  )
}

function useTicking() {
  const [values, setValues] = useState(() => stats.map((s) => s.value ?? 0))
  useEffect(() => {
    const id = window.setInterval(() => {
      setValues((prev) =>
        prev.map((v, i) => {
          const s = stats[i]
          if (s.value === null || s.suffix) return v
          return Math.random() < 0.5 ? v + 1 + Math.floor(Math.random() * 3) : v
        }),
      )
    }, 2400)
    return () => window.clearInterval(id)
  }, [])
  return values
}
