import { X } from "lucide-react"
import { useState } from "react"

/** A deterministic, QR-looking pattern — a decorative stand-in until a real store link exists. */
function Pattern() {
  const cells = Array.from({ length: 169 }, (_, i) => (Math.imul(i + 11, 2654435761) >>> 13) % 7 < 3)
  return (
    <svg viewBox="0 0 13 13" className="size-14 rounded bg-paper p-1 text-ink" aria-hidden="true">
      {cells.map((on, i) => on && <rect key={i} x={i % 13} y={Math.floor(i / 13)} width="1" height="1" fill="currentColor" />)}
      {[[0, 0], [10, 0], [0, 10]].map(([x, y]) => (
        <g key={`${x}${y}`}><rect x={x} y={y} width="3" height="3" fill="#fff" /><rect x={x + 0.3} y={y + 0.3} width="2.4" height="2.4" fill="currentColor" /><rect x={x + 0.9} y={y + 0.9} width="1.2" height="1.2" fill="#fff" /></g>
      ))}
    </svg>
  )
}

/** The "Download for iOS" card pinned to the bottom-right corner on wide screens. It can be dismissed. */
export function QrCard() {
  const [hidden, setHidden] = useState(false)
  if (hidden) return null
  return (
    <aside id="download" className="fixed right-4 bottom-4 z-30 hidden items-center gap-3 rounded-2xl bg-night p-2.5 pr-4 text-paper shadow-pop lg:flex">
      <Pattern />
      <div className="text-sm">
        <div className="font-medium">Download for iOS</div>
        <div className="text-xs leading-snug text-white/55">Scan to get Meridian<br />free on your phone.</div>
      </div>
      <button onClick={() => setHidden(true)} aria-label="Dismiss" className="-mr-1 grid size-6 place-items-center rounded-full text-white/50 transition-colors hover:text-white"><X className="size-3.5" /></button>
    </aside>
  )
}
