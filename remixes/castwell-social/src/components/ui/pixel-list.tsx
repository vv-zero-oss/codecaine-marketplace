import { cn } from "@/lib/utils"

/** A list with the notched-square bullet, optionally ruled between rows. */
export function PixelList({
  items,
  ruled = false,
  accent = "ink",
  className,
}: {
  items: string[]
  ruled?: boolean
  accent?: "ink" | "mint" | "coral" | "butter" | "periwinkle"
  className?: string
}) {
  const color = {
    ink: "text-ink",
    mint: "text-mint",
    coral: "text-coral",
    butter: "text-butter",
    periwinkle: "text-periwinkle",
  }[accent]
  return (
    <ul className={cn("flex flex-col", ruled ? "" : "gap-2.5", className)}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "flex items-center gap-2.5 text-[15px] leading-snug",
            ruled && "border-b border-current/10 py-2.5 last:border-b-0",
          )}
        >
          <span className={cn("pixel-bullet", color)} aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
