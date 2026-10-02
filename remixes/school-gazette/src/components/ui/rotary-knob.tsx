import { useRef, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * A bakelite rotary knob. Drag it in a circle (or up and down), or use the
 * arrow keys; it sweeps 270°. Controlled with `value`/`onValueChange`, or
 * uncontrolled with `defaultValue`. The ridges are a conic gradient, the
 * highlight a radial one, and the pointer line is the only moving part.
 */
export function RotaryKnob({
  value,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  size = 76,
  label,
  onValueChange,
  className,
}: {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  size?: number
  label?: string
  onValueChange?: (value: number) => void
  className?: string
}) {
  const [inner, setInner] = useState(defaultValue)
  const current = value ?? inner
  const drag = useRef<{ y: number; start: number } | null>(null)
  const range = max - min
  const angle = -135 + ((current - min) / range) * 270

  const set = (next: number) => {
    const clamped = Math.min(max, Math.max(min, Math.round(next / step) * step))
    if (value === undefined) setInner(clamped)
    onValueChange?.(clamped)
  }

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: size + 28, height: size + 28 }}>
        {/* tick ring */}
        <svg aria-hidden viewBox="-50 -50 100 100" className="absolute inset-0 size-full text-paper-light/70">
          {Array.from({ length: 11 }, (_, i) => {
            const a = ((-135 + i * 27) * Math.PI) / 180
            return <line key={i} x1={Math.sin(a) * 42} y1={-Math.cos(a) * 42} x2={Math.sin(a) * 48} y2={-Math.cos(a) * 48} stroke="currentColor" strokeWidth={i % 5 === 0 ? 2.4 : 1.2} strokeLinecap="round" />
          })}
        </svg>
        <div
          role="slider"
          tabIndex={0}
          aria-label={label ?? "Knob"}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={current}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none rounded-full border-2 border-black shadow-knob outline-offset-4 focus-visible:outline-2 focus-visible:outline-rust active:cursor-grabbing"
          style={{
            width: size,
            height: size,
            background: "conic-gradient(from 0deg, #1a1210, #4a362c 6%, #1a1210 12%, #4a362c 18%, #1a1210 25%, #4a362c 31%, #1a1210 37%, #4a362c 43%, #1a1210 50%, #4a362c 56%, #1a1210 62%, #4a362c 68%, #1a1210 75%, #4a362c 81%, #1a1210 87%, #4a362c 93%, #1a1210)",
          }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId)
            drag.current = { y: e.clientY, start: current }
          }}
          onPointerMove={(e) => {
            if (!drag.current) return
            // 200px of travel is the whole sweep, so a short flick is a short turn.
            set(drag.current.start + ((drag.current.y - e.clientY) / 200) * range)
          }}
          onPointerUp={() => (drag.current = null)}
          onPointerCancel={() => (drag.current = null)}
          onKeyDown={(e) => {
            const big = range / 10
            if (e.key === "ArrowRight" || e.key === "ArrowUp") set(current + (e.shiftKey ? big : step))
            else if (e.key === "ArrowLeft" || e.key === "ArrowDown") set(current - (e.shiftKey ? big : step))
            else if (e.key === "Home") set(min)
            else if (e.key === "End") set(max)
            else return
            e.preventDefault()
          }}
        >
          <div className="absolute inset-[14%] rounded-full bg-[radial-gradient(circle_at_34%_28%,var(--bakelite-light),var(--bakelite)_70%)] shadow-[inset_0_2px_3px_rgb(255_255_255/0.2),inset_0_-3px_5px_rgb(0_0_0/0.6)]" />
          <div aria-hidden className="absolute inset-0 transition-transform duration-75 ease-out" style={{ transform: `rotate(${angle}deg)` }}>
            <span className="absolute top-[10%] left-1/2 h-[26%] w-[3px] -translate-x-1/2 rounded-full bg-paper-light shadow-[0_0_0_1px_rgb(0_0_0/0.5)]" />
          </div>
        </div>
      </div>
      {label ? <span className="kicker text-paper-light/80">{label}</span> : null}
    </div>
  )
}
