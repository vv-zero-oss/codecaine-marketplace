import { useId } from "react"

import type { LabelTone, Merch } from "@/content/products"
import { cn } from "@/lib/utils"

/**
 * Merch, drawn: each piece in SVG with the shop's mark printed on it, so
 * the shelf needs no product photography and a recolour is one prop.
 * Soft contact shadow under each, the way a flat-lay is lit.
 */
const FILL: Record<LabelTone, string> = {
  paper: "var(--color-canvas)",
  moss: "var(--color-moss)",
  ember: "var(--color-rust)",
  honey: "var(--color-honey)",
  sky: "var(--color-sky)",
  lilac: "var(--color-lilac)",
}

/** the sun-in-grooves mark, centred on (0,0), r≈20 */
function Mark({ ink, scale = 1 }: { ink: string; scale?: number }) {
  return (
    <g transform={`scale(${scale})`} fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round">
      <circle r="20" />
      <circle r="13" strokeDasharray="2 3" />
      <circle r="5" fill={ink} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2
        return <line key={i} x1={Math.cos(a) * 24} y1={Math.sin(a) * 24} x2={Math.cos(a) * 30} y2={Math.sin(a) * 30} />
      })}
    </g>
  )
}

export function MerchArt({ kind = "tote", tone = "paper", className }: { kind?: Merch["kind"]; tone?: LabelTone; className?: string }) {
  const id = useId().replace(/:/g, "")
  const fill = FILL[tone]
  const ink = tone === "paper" || tone === "honey" || tone === "sky" ? "var(--color-ink)" : "var(--color-page)"

  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={kind} className={cn("h-auto w-full", className)}>
      <defs>
        <radialGradient id={`floor-${id}`}>
          <stop offset="0" stopColor="var(--color-ink)" stopOpacity="0.22" />
          <stop offset="1" stopColor="var(--color-ink)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="182" rx="70" ry="8" fill={`url(#floor-${id})`} />
      {kind === "tote" && (
        <g>
          <path d="M72 64 Q72 22 100 22 Q128 22 128 64" fill="none" stroke="var(--color-canvas-line)" strokeWidth="7" />
          <path d="M50 60 L150 60 L158 176 L42 176 Z" fill={fill} stroke="var(--color-canvas-line)" strokeWidth="1.5" />
          <g transform="translate(100 112)">
            <Mark ink={ink} />
          </g>
          <text x="100" y="160" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="700" fontSize="17" fill={ink} letterSpacing="-0.4">side b coffee</text>
        </g>
      )}
      {kind === "tee" && (
        <g>
          <path d="M70 26 Q100 40 130 26 L170 46 L156 80 L140 72 L140 178 L60 178 L60 72 L44 80 L30 46 Z" fill={fill} />
          <path d="M84 28 Q100 42 116 28" fill="none" stroke="var(--color-cocoa)" strokeOpacity="0.2" strokeWidth="3" />
          <path d="M60 72 L60 100 M140 72 L140 100" stroke="var(--color-cocoa)" strokeOpacity="0.1" strokeWidth="2" />
          <g transform="translate(100 92)">
            <Mark ink="var(--color-page)" scale={0.9} />
          </g>
          <text x="100" y="140" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.6" fill="var(--color-page)">HOUSE BAND</text>
        </g>
      )}
      {kind === "mug" && (
        <g>
          <path d="M136 82 Q168 82 166 112 Q164 140 134 138" fill="none" stroke={fill} strokeWidth="12" />
          <path d="M46 56 L140 56 L136 166 Q135 176 124 176 L62 176 Q51 176 50 166 Z" fill={fill} />
          <ellipse cx="93" cy="56" rx="47" ry="8" fill="var(--color-cocoa)" fillOpacity="0.25" />
          <g transform="translate(93 112)">
            <Mark ink={ink} scale={0.95} />
          </g>
          <g stroke="var(--color-ink-4)" strokeWidth="2" fill="none" strokeLinecap="round" className="animate-steam" style={{ transformOrigin: "93px 40px" }}>
            <path d="M80 44 Q74 34 80 24" />
            <path d="M96 44 Q90 32 96 20" />
            <path d="M110 44 Q104 36 110 28" />
          </g>
        </g>
      )}
      {kind === "slipmat" && (
        <g>
          <circle cx="100" cy="98" r="78" fill="var(--color-cocoa)" />
          <circle cx="100" cy="98" r="72" fill={fill} />
          {[60, 48, 36].map((r) => (
            <circle key={r} cx="100" cy="98" r={r} fill="none" stroke={ink} strokeOpacity="0.25" strokeWidth="1" />
          ))}
          <g transform="translate(100 98)">
            <Mark ink={ink} scale={1.1} />
          </g>
          <circle cx="100" cy="98" r="3" fill="var(--color-cocoa)" />
        </g>
      )}
      {kind === "beanie" && (
        <g>
          <path d="M44 128 Q44 36 100 34 Q156 36 156 128 Z" fill={fill} />
          <g stroke="var(--color-cocoa)" strokeOpacity="0.14" strokeWidth="3">
            {Array.from({ length: 12 }, (_, i) => (
              <line key={i} x1={52 + i * 9} x2={54 + i * 8.4} y1="60" y2="126" />
            ))}
          </g>
          <rect x="38" y="122" width="124" height="44" rx="6" fill={fill} />
          <g stroke="var(--color-cocoa)" strokeOpacity="0.18" strokeWidth="3">
            {Array.from({ length: 15 }, (_, i) => (
              <line key={i} x1={44 + i * 8} x2={44 + i * 8} y1="126" y2="162" />
            ))}
          </g>
          <rect x="84" y="132" width="32" height="24" rx="2" fill="var(--color-page)" />
          <g transform="translate(100 144)">
            <Mark ink="var(--color-ink)" scale={0.32} />
          </g>
        </g>
      )}
      {kind === "pin" && (
        <g>
          <circle cx="100" cy="98" r="62" fill="var(--color-brass)" />
          <circle cx="100" cy="98" r="56" fill={fill} />
          <g transform="translate(100 98)">
            <Mark ink="var(--color-navy)" scale={1.25} />
          </g>
          <path d="M70 60 Q84 48 104 46" fill="none" stroke="var(--color-white)" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" />
        </g>
      )}
    </svg>
  )
}
