import london from "@/assets/cities/london.webp"
import losAngeles from "@/assets/cities/los-angeles.webp"
import manhattan from "@/assets/cities/manhattan.webp"
import miami from "@/assets/cities/miami.webp"
import montreal from "@/assets/cities/montreal.webp"
import { cn } from "@/lib/utils"

export const CITIES = {
  london: { src: london, name: "London", code: "LHR", ratio: 1920 / 534 },
  manhattan: { src: manhattan, name: "New York", code: "JFK", ratio: 1920 / 434 },
  montreal: { src: montreal, name: "Montréal", code: "YUL", ratio: 1920 / 600 },
  miami: { src: miami, name: "Miami", code: "MIA", ratio: 1920 / 584 },
  "los-angeles": { src: losAngeles, name: "Los Angeles", code: "LAX", ratio: 1920 / 470 },
} as const

export type City = keyof typeof CITIES

/**
 * A city skyline in line art, drawn in one colour.
 *
 * The drawing is only an alpha mask (a small WebP), laid over a block of
 * the `tone` colour — so it takes any token, and stays a few dozen KB.
 */
export function CityLine({ city, tone = "ink", className }: { city: City; tone?: "ink" | "cobalt" | "navy" | "mute"; className?: string }) {
  const c = CITIES[city]
  const mask = `url(${c.src})`
  return (
    <div
      role="img"
      aria-label={`A line drawing of ${c.name}`}
      className={cn(
        "w-full",
        { ink: "bg-ink", cobalt: "bg-cobalt", navy: "bg-navy", mute: "bg-mute" }[tone],
        className,
      )}
      style={{
        aspectRatio: String(c.ratio),
        maskImage: mask,
        WebkitMaskImage: mask,
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    />
  )
}
