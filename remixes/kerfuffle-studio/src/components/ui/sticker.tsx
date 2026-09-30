import { cn } from "@/lib/utils"

export type StickerTone = "flame" | "green" | "red" | "lime" | "violet" | "yellow" | "emblem"

const TONES: Record<Exclude<StickerTone, "emblem">, string> = {
  flame: "bg-flame text-snow",
  green: "bg-green text-snow",
  red: "bg-red text-snow",
  lime: "bg-lime text-ink",
  violet: "bg-violet text-snow",
  yellow: "bg-yellow text-ink",
}

/**
 * A round-cornered sticker: caps on a colour, an ink outline, a soft lift.
 * `emblem` is the studio's scalloped KF badge instead.
 */
export function Sticker({
  text,
  tone = "flame",
  rotate = -6,
  className,
}: {
  text: string
  tone?: StickerTone
  rotate?: number
  className?: string
}) {
  if (tone === "emblem") return <Emblem className={className} rotate={rotate} />
  return (
    <span
      className={cn(
        "inline-block max-w-[14ch] rounded-pill border-2 border-ink px-4 py-2 text-center label text-base leading-[0.95] shadow-sticker select-none md:text-xl",
        TONES[tone],
        className,
      )}
      style={{ rotate: `${rotate}deg` }}
    >
      {text}
    </span>
  )
}

/** The badge: a scalloped lime disc with the initials in the brand face. */
export function Emblem({ className, rotate = -8, text = "kf" }: { className?: string; rotate?: number; text?: string }) {
  const points = 14
  const d =
    Array.from({ length: points * 2 }, (_, i) => {
      const r = i % 2 ? 44 : 50
      const a = (Math.PI * i) / points
      return `${i ? "L" : "M"}${(50 + r * Math.sin(a)).toFixed(2)} ${(50 - r * Math.cos(a)).toFixed(2)}`
    }).join(" ") + "Z"
  return (
    <span
      className={cn("relative inline-grid size-[1.9em] place-items-center text-5xl leading-none select-none md:text-6xl", className)}
      style={{ rotate: `${rotate}deg` }}
    >
      <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 size-full drop-shadow-[0_6px_10px_rgb(26_25_22/0.25)]">
        <path d={d} className="fill-lime stroke-ink" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
      <span className="relative -translate-y-[0.03em] font-brand text-[0.62em] text-ink">{text}</span>
    </span>
  )
}
