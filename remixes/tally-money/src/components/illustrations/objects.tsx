import type * as React from "react"

/**
 * The small drawn things the hero drops: line art with flat fills, one outline
 * colour (`--color-ink-900`) at a constant weight so they read as one set.
 */
type P = React.ComponentProps<"svg">
const base = { fill: "none", stroke: "var(--color-ink-900)", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const

export function Popcorn(props: P) {
  return (
    <svg viewBox="0 0 120 150" {...props}>
      <g {...base}>
        <circle cx="38" cy="38" r="16" fill="var(--color-paper)" />
        <circle cx="62" cy="30" r="18" fill="var(--color-paper)" />
        <circle cx="86" cy="40" r="15" fill="var(--color-paper)" />
        <path d="M20 56l10 88h60l10-88z" fill="var(--color-paper)" />
        <path d="M44 56l4 88M70 56l-2 88M96 56l-8 88" stroke="var(--color-stream-red)" />
      </g>
    </svg>
  )
}

export function Pizza(props: P) {
  return (
    <svg viewBox="0 0 120 130" {...props}>
      <g {...base}>
        <path d="M14 22c30-14 62-14 92 0L64 120z" fill="var(--color-cheese)" />
        <path d="M14 22c30-14 62-14 92 0" strokeWidth="9" stroke="#e6a23c" />
        <circle cx="48" cy="44" r="7" fill="var(--color-stream-red)" />
        <circle cx="78" cy="48" r="7" fill="var(--color-stream-red)" />
        <circle cx="62" cy="78" r="7" fill="var(--color-stream-red)" />
      </g>
    </svg>
  )
}

export function PlayTile(props: P) {
  return (
    <svg viewBox="0 0 110 130" {...props}>
      <g {...base}>
        <rect x="10" y="10" width="90" height="110" rx="14" fill="var(--color-stream-red)" />
        <path d="M44 42l32 23-32 23z" fill="white" />
      </g>
    </svg>
  )
}

export function Notebook(props: P) {
  return (
    <svg viewBox="0 0 160 130" {...props}>
      <g {...base}>
        <path d="M14 30l112-20 22 90-112 22z" fill="var(--color-ink-900)" />
        <path d="M30 40l86-15" stroke="white" strokeWidth="2" opacity=".5" />
        <rect x="88" y="42" width="30" height="22" rx="4" fill="var(--color-brand-200)" transform="rotate(-8 103 53)" />
      </g>
    </svg>
  )
}

export function Cup(props: P) {
  return (
    <svg viewBox="0 0 100 160" {...props}>
      <g {...base}>
        <path d="M60 4L50 40" />
        <path d="M18 40h64l-8 108H26z" fill="white" />
        <path d="M14 40h72" strokeWidth="6" />
        <path d="M24 84h52" stroke="var(--color-brand-500)" />
        <path d="M26 108h48" stroke="var(--color-brand-500)" />
      </g>
    </svg>
  )
}

export function Ticket(props: P) {
  return (
    <svg viewBox="0 0 140 90" {...props}>
      <g {...base}>
        <path d="M10 12h120v22a10 10 0 0 0 0 22v22H10V56a10 10 0 0 0 0-22z" fill="var(--color-brand-50)" />
        <path d="M44 14v62" strokeDasharray="3 6" />
        <path d="M60 36h54M60 52h38" stroke="var(--color-brand-600)" />
      </g>
    </svg>
  )
}

export function Mango(props: P) {
  return (
    <svg viewBox="0 0 120 130" {...props}>
      <g {...base}>
        <path d="M30 50c30-26 76-10 78 30 2 34-30 46-56 44S10 80 30 50z" fill="var(--color-cheese)" />
        <path d="M62 30c2-16 18-24 36-22-2 16-14 26-36 22z" fill="var(--color-leaf-500)" />
        <path d="M62 30c8-4 16-8 22-14" />
      </g>
    </svg>
  )
}

export function Scissors(props: P) {
  return (
    <svg viewBox="0 0 70 150" {...props}>
      <g {...base}>
        <path d="M30 6l12 78M42 6L30 84" fill="white" />
        <circle cx="26" cy="112" r="14" fill="white" />
        <circle cx="48" cy="112" r="14" fill="white" />
      </g>
    </svg>
  )
}

export function Coin({ face = true, ...props }: P & { face?: boolean }) {
  return (
    <svg viewBox="0 0 120 120" {...props}>
      <g {...base}>
        <circle cx="60" cy="60" r="52" fill="var(--color-ink-200)" />
        <circle cx="60" cy="60" r="38" fill="var(--color-ink-100)" />
        {face ? <path d="M48 52h24M48 68h24M60 44v32" stroke="var(--color-ink-400)" /> : null}
      </g>
    </svg>
  )
}
