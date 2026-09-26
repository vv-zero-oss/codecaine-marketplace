import type * as React from "react"

/** The soft flourish behind the drawing area: eight fat S-strokes turned
 *  around a centre, in a tone a shade darker than the paper. */
export function Swirl(props: React.ComponentProps<"svg">) {
  const arms = Array.from({ length: 8 }, (_, i) => i * 45)
  return (
    <svg viewBox="-160 -170 320 340" aria-hidden {...props}>
      <g fill="none" stroke="var(--swirl)" strokeWidth="26" strokeLinecap="round">
        {arms.map((deg) => (
          <path key={deg} transform={`rotate(${deg})`} d="M0 -20c10 -40 50 -40 60 -80c8 -30 -14 -54 -36 -44" />
        ))}
        <circle r="18" />
      </g>
    </svg>
  )
}
