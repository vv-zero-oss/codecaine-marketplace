import { cn } from "@/lib/utils"

/** One branch of leaves along an arc; mirrored for the other side. */
function Branch({ flip = false }: { flip?: boolean }) {
  const leaves = Array.from({ length: 6 }, (_, i) => {
    const t = i / 5
    const angle = (-70 + t * 120) * (Math.PI / 180)
    const x = 16 + Math.cos(angle) * 12
    const y = 22 + Math.sin(angle) * 18
    const rot = (angle * 180) / Math.PI + 90
    return <ellipse key={i} cx={x} cy={y} rx="2" ry="4.4" transform={`rotate(${rot - 35} ${x} ${y})`} fill="currentColor" />
  })
  return (
    <svg viewBox="0 0 30 44" className={cn("h-11 w-7 shrink-0", flip && "-scale-x-100")} aria-hidden>
      <path d="M16 6 Q 2 22 14 40" fill="none" stroke="currentColor" strokeWidth="1.2" />
      {leaves}
    </svg>
  )
}

/** A recognition between two laurel branches. */
export function Laurel({ title, className }: { title: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1 text-fg-2", className)}>
      <Branch />
      <span className="max-w-[12ch] text-center text-[12px] leading-tight font-medium text-fg-2">{title}</span>
      <Branch flip />
    </div>
  )
}
