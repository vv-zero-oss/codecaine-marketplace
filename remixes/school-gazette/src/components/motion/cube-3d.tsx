import { useCanvasDesignMode } from "@canvas/react"
import { useState } from "react"

import { cn } from "@/lib/utils"

type Face = "front" | "back" | "right" | "left" | "top" | "bottom"
const FACES: Face[] = ["front", "right", "back", "left", "top", "bottom"]

/**
 * A paper die that turns on its own: six printed faces, real CSS 3D.
 *
 * It is CSS keyframes rather than a JS loop, so the editor's Motion switch
 * stops, reduces and resumes it for free. `speed` is seconds per turn, `size`
 * is px, `labels` is a comma-separated string (a scalar, so the panel can edit
 * it), and `tone` picks which paper the faces are printed on. Hovering holds it
 * still so a face can be read; in the editor it holds on its own.
 */
export function Cube3D({
  size = 120,
  speed = 18,
  labels = "A,B,C,1,2,3",
  tone = "cream",
  paused = false,
  className,
}: {
  size?: number
  /** seconds per full turn */
  speed?: number
  labels?: string
  tone?: "cream" | "ink" | "rust"
  paused?: boolean
  className?: string
}) {
  const { designing } = useCanvasDesignMode()
  const [held, setHeld] = useState(false)
  const words = labels.split(",").map((l) => l.trim())
  const half = size / 2
  const place: Record<Face, string> = {
    front: `translateZ(${half}px)`,
    back: `rotateY(180deg) translateZ(${half}px)`,
    right: `rotateY(90deg) translateZ(${half}px)`,
    left: `rotateY(-90deg) translateZ(${half}px)`,
    top: `rotateX(90deg) translateZ(${half}px)`,
    bottom: `rotateX(-90deg) translateZ(${half}px)`,
  }
  const toneClass = {
    cream: "bg-paper-bright text-ink",
    ink: "bg-ink text-paper-light",
    rust: "bg-rust text-paper-bright",
  }[tone]

  return (
    <div
      className={cn("relative [perspective:900px]", className)}
      style={{ width: size, height: size }}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
    >
      <div
        data-canvas-ignore
        className="absolute inset-0 animate-cube [transform-style:preserve-3d]"
        style={{ animationDuration: `${speed}s`, animationPlayState: paused || held || designing ? "paused" : "running" }}
      >
        {FACES.map((face, i) => (
          <div
            key={face}
            aria-hidden
            className={cn(
              "absolute inset-0 grid place-items-center overflow-hidden border-2 border-ink font-display shadow-[inset_0_0_0_4px_rgb(28_27_24/0.08),inset_0_0_24px_rgb(28_27_24/0.18)] [backface-visibility:hidden]",
              toneClass,
            )}
            style={{ transform: place[face], fontSize: size * 0.58 }}
          >
            <span className="absolute inset-0 [background:var(--halftone)] opacity-20 mix-blend-multiply" />
            <span className="relative leading-none">{words[i % words.length]}</span>
          </div>
        ))}
      </div>
      {/* the shadow it would throw on the desk */}
      <div aria-hidden className="absolute -bottom-6 left-1/2 h-4 w-3/4 -translate-x-1/2 rounded-[50%] bg-ink/25 blur-md" />
    </div>
  )
}
