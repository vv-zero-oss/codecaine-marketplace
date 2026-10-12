import { useId } from "react"

import { cn } from "@/lib/utils"

/**
 * The Kestrel metal card, drawn in SVG: a near-black face, fine concentric
 * lines that catch the light, a chip, and the mark. Portrait (as it leaves
 * the slot) or landscape (as it sits in a wallet).
 */
export function MetalCard({
  orientation = "portrait",
  className,
}: {
  orientation?: "portrait" | "landscape"
  className?: string
}) {
  const id = useId().replace(/:/g, "")
  const portrait = orientation === "portrait"
  const w = portrait ? 200 : 316
  const h = portrait ? 316 : 200
  const rings = Array.from({ length: 46 }, (_, i) => 18 + i * 7.5)
  const cx = portrait ? w * 1.05 : w * 0.95
  const cy = portrait ? h * 0.95 : h * 1.15

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("block rounded-(--radius-metal) shadow-(--shadow-metal)", className)}
      role="img"
      aria-label="Kestrel corporate card"
    >
      <defs>
        <clipPath id={`clip-${id}`}>
          <rect width={w} height={h} rx="12" />
        </clipPath>
        <linearGradient id={`sheen-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-night-fg)" stopOpacity="0.1" />
          <stop offset="0.45" stopColor="var(--color-night-fg)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--color-night-fg)" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id={`chip-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-line)" />
          <stop offset="0.5" stopColor="var(--color-ink-4)" />
          <stop offset="1" stopColor="var(--color-line-strong)" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#clip-${id})`}>
        <rect width={w} height={h} fill="var(--color-metal)" />
        <g fill="none" stroke="var(--color-metal-line)" strokeWidth="0.7">
          {rings.map((r) => (
            <circle key={r} cx={cx} cy={cy} r={r} />
          ))}
        </g>
        <rect width={w} height={h} fill={`url(#sheen-${id})`} />
      </g>
      {/* chip */}
      <g transform={portrait ? `translate(${w - 66} 26)` : `translate(${w - 78} ${h - 70})`}>
        <rect width="38" height="30" rx="6" fill={`url(#chip-${id})`} />
        <path d="M0 10h12M0 20h12M26 10h12M26 20h12M12 0v30M26 0v30" stroke="var(--color-ink-3)" strokeWidth="0.8" fill="none" opacity="0.7" />
      </g>
      {/* mark + wordmark */}
      {portrait ? (
        <g transform={`translate(28 ${h - 22}) rotate(-90)`} fill="var(--color-night-fg)" opacity="0.85">
          <text x="0" y="0" fontSize="20" fontWeight="600" letterSpacing="-0.9" fontFamily="var(--font-sans)">kestrel</text>
          <g transform="translate(70 -16) scale(0.75)">
            <path d="M2 9.5 11.2 13 9 21.5 6.6 14.4Z" />
            <path d="M22 4.5 13 13.2 10.6 11.9Z" />
            <circle cx="13.6" cy="8.2" r="1.6" />
          </g>
        </g>
      ) : (
        <g transform="translate(24 44)" fill="var(--color-night-fg)" opacity="0.88">
          <text x="0" y="0" fontSize="26" fontWeight="600" letterSpacing="-1.2" fontFamily="var(--font-sans)">kestrel</text>
          <g transform="translate(90 -21) scale(0.95)">
            <path d="M2 9.5 11.2 13 9 21.5 6.6 14.4Z" />
            <path d="M22 4.5 13 13.2 10.6 11.9Z" />
            <circle cx="13.6" cy="8.2" r="1.6" />
          </g>
        </g>
      )}
    </svg>
  )
}
