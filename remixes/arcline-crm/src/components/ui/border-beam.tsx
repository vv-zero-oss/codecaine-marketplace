import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A glow that rides around the border of whatever it wraps.
 *
 * Same props as the `border-beam` package (`size`, `colorVariant`,
 * `strength`, `active`, `theme`), so switching to it is one import. Drawn in
 * CSS — a conic gradient masked to a 1px ring, plus a blurred copy for the
 * glow — and turned by a CSS animation on an `@property` angle, so the
 * editor's Motion switch stops and reduces it like any stylesheet animation.
 *
 * Give it the same radius as its child (`className="rounded-[20px]"`): the
 * ring follows the wrapper's corners.
 */

type BeamSize = "md" | "sm" | "line" | "pulse-inner" | "pulse-outside"
type BeamColor = "colorful" | "mono" | "ocean" | "sunset"

const DARK: Record<BeamColor, string[]> = {
  colorful: ["var(--color-coral)", "var(--color-blush)", "var(--color-violet)", "var(--color-sky)", "var(--color-teal)"],
  mono: ["var(--color-fg)", "var(--color-cream)", "var(--color-muted)"],
  ocean: ["var(--color-sky)", "color-mix(in oklab, var(--color-sky) 50%, var(--color-teal))", "var(--color-teal)"],
  sunset: ["var(--color-amber)", "var(--color-coral)", "var(--color-blush)"],
}

/** On a light page the same hues, deepened so they hold up against white. */
const palette = (color: BeamColor, theme: "light" | "dark") =>
  (DARK[color] ?? DARK.colorful).map((c) =>
    theme === "light" ? `color-mix(in oklab, ${c.replace("var(--color-fg)", "var(--color-ink)")} 78%, var(--color-void))` : c,
  )

export type BorderBeamProps = {
  size?: BeamSize
  colorVariant?: BeamColor
  /** 0–1: how bright the beam and its glow are. */
  strength?: number
  /** False holds the beam where it is. */
  active?: boolean
  theme?: "light" | "dark"
  /** Seconds for one lap. */
  duration?: number
} & React.ComponentProps<"div">

export function BorderBeam({
  size = "md",
  colorVariant = "colorful",
  strength = 0.7,
  active = true,
  theme = "dark",
  duration = 6,
  className,
  style,
  children,
  ...props
}: BorderBeamProps) {
  const colors = palette(colorVariant, theme)
  const k = Math.min(1, Math.max(0, strength))
  const arc = size === "sm" ? 14 : size === "line" ? 10 : 22
  const stops = colors.map((c, i) => `${c} ${100 - arc + ((i + 1) * arc) / (colors.length + 1)}%`).join(", ")
  const beam = `conic-gradient(from var(--beam-angle), transparent 0%, transparent ${100 - arc}%, ${stops}, transparent 100%)`
  const ring = size === "sm" || size === "line" ? 1 : 1.5
  const running = { animationPlayState: active ? "running" : "paused" } as const
  const pulse = size === "pulse-inner" || size === "pulse-outside"

  return (
    <div
      data-beam={size}
      className={cn("relative isolate", className)}
      style={
        {
          "--beam-strength": k,
          "--beam-duration": `${pulse ? duration / 2 : duration}s`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}

      {pulse ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 animate-beam-pulse rounded-[inherit]"
          style={{
            ...running,
            boxShadow:
              size === "pulse-inner"
                ? `inset 0 0 ${24 * k + 8}px ${colors[0]}, inset 0 0 0 1px ${colors[1] ?? colors[0]}`
                : `0 0 ${32 * k + 8}px ${4 * k}px ${colors[0]}, 0 0 0 1px ${colors[1] ?? colors[0]}`,
          }}
        />
      ) : (
        <>
          {/* The glow: the same beam, blurred, under the ring. */}
          {size !== "line" && (
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-px -z-10 animate-beam rounded-[inherit] blur-[14px]"
              style={{ ...running, background: beam, opacity: 0.55 * k }}
            />
          )}
          {/* The ring: the beam, masked down to the border. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 animate-beam rounded-[inherit]"
            style={{
              ...running,
              padding: ring,
              background: beam,
              opacity: 0.35 + 0.65 * k,
              mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
              WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
            }}
          />
        </>
      )}
    </div>
  )
}
