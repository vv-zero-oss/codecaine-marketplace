import type * as React from "react"

/**
 * The drawn things the hero drops. Inked line art: one ink colour at a steady
 * weight, flat fills from the tokens, a second tone for form, and a few hatch
 * lines on the shadow side so each reads as an object, not an icon.
 */
type P = React.ComponentProps<"svg">
const ink = "var(--color-ink-900)"
const line = { fill: "none", stroke: ink, strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const
const hatch = { fill: "none", stroke: ink, strokeWidth: 1.6, strokeLinecap: "round", opacity: 0.55 } as const
const shine = { fill: "none", stroke: "white", strokeWidth: 3, strokeLinecap: "round", opacity: 0.8 } as const

export function Popcorn(props: P) {
  return (
    <svg viewBox="0 0 130 170" {...props}>
      <g {...line}>
        <circle cx="34" cy="44" r="17" fill="var(--color-paper)" />
        <circle cx="58" cy="30" r="19" fill="var(--color-paper)" />
        <circle cx="86" cy="36" r="18" fill="var(--color-paper)" />
        <circle cx="104" cy="56" r="14" fill="var(--color-paper)" />
        <circle cx="50" cy="56" r="15" fill="var(--color-cheese)" />
        <path d="M18 62h96l-10 100H28z" fill="white" />
        <path d="M38 62l5 100M60 62l2 100M82 62l-1 100M101 62l-5 100" stroke="var(--color-stream-red)" strokeWidth="9" />
        <path d="M14 62h104" strokeWidth="6" />
      </g>
      <path d="M96 78l-3 62M104 90l-2 44" {...hatch} />
      <path d="M26 44a10 10 0 0 1 8-8M52 22a12 12 0 0 1 8-3" {...shine} strokeWidth="2.5" />
    </svg>
  )
}

export function Pizza(props: P) {
  return (
    <svg viewBox="0 0 130 140" {...props}>
      <g {...line}>
        <path d="M12 26c34-18 72-18 106 0L66 130z" fill="var(--color-cheese)" />
        <path d="M12 26c34-18 72-18 106 0l-5 9c-32-15-64-15-96 0z" fill="var(--color-crust)" />
        <circle cx="46" cy="52" r="8.5" fill="var(--color-stream-red)" />
        <circle cx="80" cy="54" r="8.5" fill="var(--color-stream-red)" />
        <circle cx="64" cy="86" r="8.5" fill="var(--color-stream-red)" />
        <path d="M58 118c-1 8 3 12 6 12" />
      </g>
      <path d="M72 100l-10 24M84 78l-14 34" {...hatch} />
      <path d="M44 49a5 5 0 0 1 4-3M78 51a5 5 0 0 1 4-3" {...shine} strokeWidth="2" />
    </svg>
  )
}

export function PlayTile(props: P) {
  return (
    <svg viewBox="0 0 120 140" {...props}>
      <g {...line}>
        <rect x="10" y="10" width="100" height="120" rx="18" fill="var(--color-stream-red)" />
        <path d="M46 44l36 26-36 26z" fill="white" />
      </g>
      <path d="M96 40v70M88 90v22" {...hatch} stroke="white" opacity="0.3" />
      <path d="M20 26a8 8 0 0 1 8-8" {...shine} />
    </svg>
  )
}

export function Notebook(props: P) {
  return (
    <svg viewBox="0 0 180 140" {...props}>
      <g {...line}>
        <path d="M14 34l116-24 36 98-116 24z" fill="var(--color-ink-900)" />
        <path d="M130 10l36 98" stroke="white" strokeWidth="2" opacity="0.4" />
        <path d="M126 14l34 92M120 18l32 84" stroke="white" strokeWidth="1.5" opacity="0.25" />
        <path d="M118 6l34 98" stroke="var(--color-stream-red)" strokeWidth="6" />
        <rect x="62" y="38" width="46" height="30" rx="5" fill="var(--color-brand-200)" transform="rotate(-12 85 53)" />
        <path d="M70 52l30-6M72 60l22-4" transform="rotate(-0 85 53)" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function Cup(props: P) {
  return (
    <svg viewBox="0 0 110 180" {...props}>
      <g {...line}>
        <path d="M68 4L54 46" />
        <path d="M18 44h74l-9 124H27z" fill="white" />
        <path d="M14 44h82" strokeWidth="8" />
        <path d="M22 96h66l-1.5 22H23.5z" fill="var(--color-brand-500)" />
        <path d="M30 128c8-8 14 8 22 0s14 8 22 0" stroke="white" />
      </g>
      <path d="M78 56l-6 100M86 60l-5 70" {...hatch} />
      <path d="M26 56l-3 28" {...shine} />
    </svg>
  )
}

export function Ticket(props: P) {
  return (
    <svg viewBox="0 0 150 100" {...props}>
      <g {...line}>
        <path d="M10 14h130v26a11 11 0 0 0 0 22v26H10V62a11 11 0 0 0 0-22z" fill="var(--color-brand-50)" />
        <path d="M46 16v68" strokeDasharray="2 7" />
        <path d="M62 38h58M62 52h40M62 66h26" stroke="var(--color-brand-600)" strokeWidth="3.5" />
        <path d="M22 34v32M27 34v32M32 34v32M37 34v32" strokeWidth="2.2" />
      </g>
    </svg>
  )
}

export function Mango(props: P) {
  return (
    <svg viewBox="0 0 130 140" {...props}>
      <g {...line}>
        <path d="M32 54c32-28 82-10 86 34 3 36-32 50-60 46S8 86 32 54z" fill="var(--color-mango)" />
        <path d="M66 32c3-18 20-26 40-24-2 18-16 28-40 24z" fill="var(--color-leaf-500)" />
        <path d="M66 32c9-4 18-9 24-16" />
      </g>
      <path d="M92 76c6 16 2 36-12 46M100 70c4 10 4 22-2 34" {...hatch} />
      <path d="M30 70a30 30 0 0 1 14-18" {...shine} />
    </svg>
  )
}

export function Scissors(props: P) {
  return (
    <svg viewBox="0 0 80 170" {...props}>
      <g {...line}>
        <path d="M34 6l8 84M46 6l-8 84" fill="white" />
        <path d="M34 6c-2 20 2 50 8 84l4-84z" fill="var(--color-ink-200)" />
        <circle cx="28" cy="124" r="17" fill="var(--color-stream-red)" />
        <circle cx="54" cy="124" r="17" fill="var(--color-stream-red)" />
        <circle cx="28" cy="124" r="8" fill="var(--color-paper)" />
        <circle cx="54" cy="124" r="8" fill="var(--color-paper)" />
      </g>
    </svg>
  )
}

export function Sneaker(props: P) {
  return (
    <svg viewBox="0 0 170 100" {...props}>
      <g {...line}>
        <path d="M10 70c0-16 6-30 16-38l22 4c10 8 22 12 40 12 22 0 44 10 56 24 4 5 2 10-4 12H20c-8 0-10-6-10-14z" fill="var(--color-ink-900)" />
        <path d="M8 76h150c4 0 6 4 4 8-2 6-6 8-14 8H24c-10 0-16-6-16-16z" fill="white" />
        <path d="M54 44l12 8M64 40l12 8M74 38l12 8" stroke="white" strokeWidth="2.5" />
        <path d="M30 62c26 2 52 8 80 24" stroke="var(--color-stream-red)" strokeWidth="5" />
      </g>
      <path d="M20 92h130" {...hatch} />
    </svg>
  )
}

export function Coin({ face = true, ...props }: P & { face?: boolean }) {
  return (
    <svg viewBox="0 0 120 120" {...props}>
      <g {...line}>
        <circle cx="60" cy="60" r="54" fill="var(--color-ink-200)" />
        <circle cx="60" cy="60" r="42" fill="var(--color-ink-100)" />
        {face ? <path d="M70 46c-3-4-8-6-13-5-8 1-10 8-4 12l12 7c6 4 4 12-4 13-5 1-10-1-13-5M60 36v6M60 78v6" stroke="var(--color-ink-400)" strokeWidth="3.5" /> : null}
      </g>
      <path d="M22 50a40 40 0 0 1 14-18" {...shine} />
      <path d="M104 70a46 46 0 0 1-18 26" {...hatch} />
    </svg>
  )
}
