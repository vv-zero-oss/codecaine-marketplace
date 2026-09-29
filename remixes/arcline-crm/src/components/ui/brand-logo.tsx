import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Logos from SVGL (`public/logos/`), drawn in one flat colour through a mask
 * so every brand sits in the page's cream, the way a logo wall should read.
 *
 * Wordmarks draw on their own; the brands SVGL only has a symbol for are set
 * beside their name.
 */
const LOGOS = {
  stripe: { ratio: 512 / 214, height: 30 },
  vercel: { ratio: 262 / 52, height: 22 },
  shopify: { ratio: 608 / 173.7, height: 30 },
  supabase: { ratio: 581 / 113, height: 24 },
  airbnb: { ratio: 320.4 / 100, height: 30 },
  spotify: { ratio: 559 / 168, height: 30 },
  webflow: { ratio: 1080 / 181, height: 20 },
  slack: { ratio: 2500 / 632.6, height: 28 },
  linear: { ratio: 1, height: 24, name: "Linear" },
  figma: { ratio: 54 / 80, height: 26, name: "Figma" },
  discord: { ratio: 256 / 199, height: 22, name: "Discord" },
  loom: { ratio: 1, height: 24, name: "Loom" },
  gmail: { ratio: 512 / 399.4, height: 22, name: "Gmail" },
  "slack-mark": { ratio: 1, height: 24, name: "Slack" },
  linkedin: { ratio: 1, height: 20 },
  x: { ratio: 1200 / 1227, height: 18 },
} as const

export type Brand = keyof typeof LOGOS

export const BRANDS = Object.keys(LOGOS) as Brand[]

export function BrandLogo({
  brand,
  scale = 1,
  className,
  ...props
}: { brand: Brand; scale?: number } & React.ComponentProps<"span">) {
  const logo = LOGOS[brand] ?? LOGOS.stripe
  const height = logo.height * scale
  const name = "name" in logo ? logo.name : undefined
  return (
    <span
      role="img"
      aria-label={name ?? brand[0].toUpperCase() + brand.slice(1)}
      className={cn("inline-flex items-center gap-2 text-fg", className)}
      {...props}
    >
      <span
        aria-hidden
        className="logo-mask block shrink-0"
        style={{
          height,
          width: height * logo.ratio,
          maskImage: `url(${import.meta.env.BASE_URL}logos/${brand}.svg)`,
        }}
      />
      {name && (
        <span aria-hidden className="font-medium tracking-[-0.02em]" style={{ fontSize: height * 0.95 }}>
          {name}
        </span>
      )}
    </span>
  )
}
