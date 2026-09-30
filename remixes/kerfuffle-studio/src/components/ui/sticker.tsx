import { cn } from "@/lib/utils"

export type StickerTone = "blue" | "green" | "red" | "pink" | "orange" | "yellow" | "emblem"

const TONES: Record<Exclude<StickerTone, "emblem">, string> = {
  blue: "bg-blue text-snow",
  green: "bg-green text-snow",
  red: "bg-red text-snow",
  pink: "bg-pink text-ink",
  orange: "bg-orange text-snow",
  yellow: "bg-yellow text-ink",
}

/**
 * A die-cut sticker: chunky caps on a colour, a white edge, a lift of shadow.
 * `emblem` is the studio's oval KF seal instead.
 */
export function Sticker({
  text,
  tone = "blue",
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
        "inline-block max-w-[11ch] border-[5px] border-card px-3 py-1.5 text-center label text-lg leading-[0.9] shadow-sticker select-none md:text-2xl",
        TONES[tone],
        className,
      )}
      style={{ rotate: `${rotate}deg` }}
    >
      {text}
    </span>
  )
}

/** The oval seal: a red ring, the initials in a heavy serif. */
export function Emblem({ className, rotate = -4, text = "KF" }: { className?: string; rotate?: number; text?: string }) {
  return (
    <span
      className={cn(
        "inline-grid h-[1.45em] w-[2.2em] place-items-center rounded-[50%] border-[0.13em] border-red bg-card font-serif text-5xl leading-none text-blue shadow-sticker select-none md:text-6xl",
        className,
      )}
      style={{ rotate: `${rotate}deg` }}
    >
      <span className="translate-y-[0.04em] font-black tracking-[-0.06em]">{text}</span>
    </span>
  )
}
