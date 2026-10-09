import type { Cloth } from "@/content/shop"
import { cn } from "@/lib/utils"

/** Each cloth → its token. Text on cloth is paper; on kraft it is ink. */
export const CLOTH: Record<Cloth, { bg: string; fg: string; label: string }> = {
  cloth: { bg: "var(--color-cloth)", fg: "var(--color-sheet)", label: "Charcoal cloth" },
  moss: { bg: "var(--color-moss)", fg: "var(--color-sheet)", label: "Moss cloth" },
  clay: { bg: "var(--color-clay)", fg: "var(--color-sheet)", label: "Clay cloth" },
  kraft: { bg: "var(--color-kraft)", fg: "var(--color-ink)", label: "Kraft board" },
}

/** The weave: two hairline gradients at right angles, barely there. */
export const WEAVE =
  "repeating-linear-gradient(0deg, rgb(255 255 255 / 0.035) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgb(0 0 0 / 0.05) 0 1px, transparent 1px 3px)"

/**
 * A volume's front cover, drawn rather than photographed so it can change
 * cloth, number and title live. Sized by its container: every length is in
 * container units, so the same cover reads at 120px in the bag and 600px on
 * the open-book stage.
 */
export function CoverArt({
  volume = 3,
  title = "Salt & Timber",
  subtitle = "On making at the water's edge",
  cloth = "moss",
  variant = "volume",
  className,
}: {
  volume?: number
  title?: string
  subtitle?: string
  cloth?: Cloth
  /** A volume's cover, or the plainer notebook with its elastic band. */
  variant?: "volume" | "notebook"
  className?: string
}) {
  const c = CLOTH[cloth]
  if (variant === "notebook")
    return (
      <div
        className={cn("@container relative size-full overflow-hidden select-none", className)}
        style={{ background: c.bg, color: c.fg, backgroundImage: WEAVE }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="font-sans text-[2.6cqw] font-medium tracking-[0.14em] uppercase opacity-75">Ordinary Matter</p>
          <p className="mt-[3cqw] font-serif text-[9cqw] leading-[0.95] tracking-[-0.03em] italic">{title}</p>
        </div>
        {/* the elastic band */}
        <span aria-hidden className="absolute inset-y-0 right-[13cqw] w-[2.6cqw] bg-ink/85 shadow-[1px_0_2px_rgb(0_0_0/0.3)]" />
      </div>
    )
  return (
    <div
      className={cn("@container relative size-full overflow-hidden select-none", className)}
      style={{ background: c.bg, color: c.fg, backgroundImage: WEAVE }}
    >
      {/* the hinge, where the board meets the spine */}
      <span aria-hidden className="absolute inset-y-0 left-[5cqw] w-px bg-black/20 shadow-[1px_0_0_rgb(255_255_255/0.08)]" />
      <div className="absolute inset-0 flex flex-col px-[11cqw] pt-[10cqw] pb-[9cqw]">
        <p className="font-serif text-[6.4cqw] leading-[0.95] tracking-[-0.02em]">
          Ordinary
          <br />
          Matter
        </p>
        <div className="mt-auto flex items-end justify-between gap-[4cqw]">
          <div className="min-w-0">
            <p className="font-sans text-[2.6cqw] font-medium tracking-[0.12em] uppercase opacity-80">Volume {volume}</p>
            <p className="mt-[2cqw] font-serif text-[8.4cqw] leading-[0.95] tracking-[-0.03em]">{title}</p>
            <p className="mt-[2.4cqw] font-serif text-[3.2cqw] italic opacity-75">{subtitle}</p>
          </div>
          {/* the numeral, debossed: a shadow above and a highlight below */}
          <p
            aria-hidden
            className="font-serif text-[34cqw] leading-[0.72] tracking-[-0.06em]"
            style={{ color: c.bg, textShadow: "0 -1px 0 rgb(0 0 0 / 0.28), 0 1px 0 rgb(255 255 255 / 0.12)" }}
          >
            {volume}
          </p>
        </div>
      </div>
    </div>
  )
}
