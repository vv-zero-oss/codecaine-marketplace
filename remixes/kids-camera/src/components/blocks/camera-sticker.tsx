import type * as React from "react"

/**
 * The product, drawn as a flat sticker: a rounded body, two shutter buttons,
 * a strap lug either side and two ringed lenses. Ink on a speckled black, the
 * way a vinyl sticker prints.
 */
export function CameraSticker(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 260 190" role="img" aria-label="Lumo camera sticker" {...props}>
      <defs>
        <filter id="sticker-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="4" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.3  0 0 0 0 0.3  0 0 0 0 0.28  0 0 0 0.14 0" result="speck" />
          <feComposite in="speck" in2="SourceGraphic" operator="in" result="grain" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="grain" />
          </feMerge>
        </filter>
      </defs>
      <g fill="var(--ink)" filter="url(#sticker-grain)">
        {/* shutter buttons */}
        <rect x="56" y="10" width="40" height="26" rx="9" />
        <rect x="100" y="22" width="20" height="16" rx="6" />
        <rect x="178" y="14" width="42" height="24" rx="9" />
        {/* lugs */}
        <rect x="6" y="80" width="26" height="30" rx="10" />
        <rect x="228" y="80" width="26" height="30" rx="10" />
        {/* body */}
        <rect x="22" y="30" width="216" height="150" rx="22" />
      </g>
      <g fill="var(--paper)">
        <circle cx="72" cy="36" r="7" />
        <circle cx="198" cy="37" r="6" />
        <circle cx="16" cy="95" r="5" />
        <circle cx="244" cy="95" r="5" />
        {/* the goggle-shaped lens plate */}
        <path d="M40 112c0-30 22-48 48-48 16 0 28 6 42 18 14-12 26-18 42-18 26 0 48 18 48 48s-22 48-48 48c-18 0-30-8-42-22-12 14-24 22-42 22-26 0-48-18-48-48Z" />
        <rect x="112" y="46" width="36" height="9" rx="3" />
      </g>
      <g fill="none" stroke="var(--ink)" strokeWidth="6">
        <circle cx="88" cy="112" r="30" />
        <circle cx="88" cy="112" r="18" />
        <circle cx="172" cy="112" r="30" />
        <circle cx="172" cy="112" r="18" />
      </g>
      <g fill="var(--ink)">
        <circle cx="88" cy="112" r="7" />
        <circle cx="172" cy="112" r="7" />
      </g>
    </svg>
  )
}
