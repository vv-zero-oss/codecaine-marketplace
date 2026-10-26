import { Bike, Dumbbell, Flower2, Footprints, HeartPulse, Moon, Mountain, Waves, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export const PILL_ICONS = {
  run: Footprints,
  ride: Bike,
  lift: Dumbbell,
  swim: Waves,
  yoga: Flower2,
  hike: Mountain,
  sleep: Moon,
  heart: HeartPulse,
} satisfies Record<string, LucideIcon>

/** Fill and type for each pill, from the palette — dark ink on the light
 *  fills, Paper on the dark ones. */
export const PILL_COLOURS = {
  lime: "bg-candy-lime text-forest-ink",
  spruce: "bg-candy-spruce text-linen-mist",
  blue: "bg-candy-blue text-paper",
  red: "bg-candy-red text-paper",
  mist: "bg-candy-mist text-forest-ink",
  paper: "bg-candy-paper text-forest-ink",
} as const

export type PillIcon = keyof typeof PILL_ICONS
export type PillColour = keyof typeof PILL_COLOURS

/** One glossy activity pill: an icon in a disc, a label in black caps. */
export function ActivityPill({
  label,
  icon = "run",
  colour = "lime",
  className,
}: {
  label: string
  icon?: PillIcon
  colour?: PillColour
  className?: string
}) {
  const Icon = PILL_ICONS[icon]
  return (
    <div
      className={cn(
        "flex h-[clamp(38px,4.6vw,56px)] items-center gap-[0.55em] rounded-(--radius-pill) py-[0.4em] pr-[1.1em] pl-[0.45em] text-[clamp(13px,1.5vw,19px)] font-black tracking-[0.02em] whitespace-nowrap uppercase shadow-(--shadow-pill) select-none",
        PILL_COLOURS[colour],
        className,
      )}
    >
      <span className="grid aspect-square h-full place-items-center rounded-full bg-current/15 shadow-[inset_0_1px_1px_rgb(255_255_255/0.4)]">
        <Icon className="size-[55%]" strokeWidth={2.4} />
      </span>
      {label}
    </div>
  )
}
