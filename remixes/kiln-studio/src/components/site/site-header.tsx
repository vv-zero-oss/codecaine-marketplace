import { KilnMark } from "@/components/site/logo"
import { useContact } from "@/components/site/contact-sheet"
import { Button } from "@/components/ui/button"
import { STUDIOS } from "@/data/studio"
import { useClock } from "@/lib/clock"
import { Link } from "@/lib/router"
import { play, setSound, useSound } from "@/lib/sound"
import { cn } from "@/lib/utils"

/** One studio's local time — the first one live, with a pulsing ember dot. */
export function StudioClock({ city, country, timeZone, live = false, className }: { city: string; country: string; timeZone: string; live?: boolean; className?: string }) {
  const { time, offset } = useClock(timeZone)
  return (
    <span className={cn("type-label flex items-center gap-2 tabular-nums", live ? "text-ink" : "text-ink-4", className)}>
      <span aria-hidden className={cn("size-[5px] rounded-full", live ? "animate-pulse-dot bg-ember" : "bg-ink-5")} />
      <span className="w-[9.5em]">
        {city}, {country}
      </span>
      <span>{time}</span>
      <span className="text-ink-4">{offset}</span>
    </span>
  )
}

/** The header's sound switch: `Sound [off]`, a real toggle. */
export function SoundToggle({ className }: { className?: string }) {
  const on = useSound()
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setSound(!on)}
      className={cn("type-label group/sound flex items-center gap-2 text-ink transition-colors duration-(--duration-hover) hover:text-ember", className)}
    >
      {/* Three bars that stand up and move while the sound is on. */}
      <span aria-hidden className="flex h-2.5 items-end gap-[2px]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn("w-[2px] origin-bottom rounded-full bg-current transition-transform duration-(--duration-hover) ease-(--ease-out-strong)", on ? "" : "scale-y-[0.3]")}
            style={on ? { height: "100%", animation: `sound-bar 900ms ${i * 140}ms ease-in-out infinite alternate` } : { height: "100%" }}
          />
        ))}
      </span>
      Sound [{on ? "on" : "off"}]
    </button>
  )
}

/**
 * The header, fixed over everything, as the reference sets it: the mark on
 * the left, then sound, the studio in one sentence, the two studios' clocks,
 * and the one button that matters. No background — a soft fade behind it
 * keeps it legible over the wall.
 */
export function SiteHeader({ tagline = "Kiln is a technology-led creative studio firing ideas into experiences for brands." }: { tagline?: string }) {
  const { setOpen } = useContact()
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-page/80 via-page/40 to-transparent" />
      <div className="relative grid grid-cols-[auto_1fr_auto] items-start gap-6 px-(--spacing-gutter) pt-[clamp(14px,1.6vw,26px)] lg:grid-cols-[1fr_1fr_1.4fr_1.2fr_auto]">
        <Link href="/" aria-label="Kiln Studio, home" className="pointer-events-auto block w-fit text-ink transition-opacity duration-(--duration-hover) hover:opacity-80" onClick={() => play("press")}>
          <KilnMark className="w-[clamp(26px,2.3vw,36px)]" />
        </Link>
        <SoundToggle className="pointer-events-auto mt-1 hidden w-fit md:flex" />
        <p className="type-label mt-1 hidden max-w-[34ch] text-ink lg:block">{tagline}</p>
        <div className="pointer-events-auto mt-1 hidden flex-col gap-1 lg:flex">
          {STUDIOS.map((s, i) => (
            <StudioClock key={s.city} {...s} live={i === 0} />
          ))}
        </div>
        <Button
          size="default"
          className="pointer-events-auto col-start-3 h-[clamp(40px,3.4vw,52px)] px-[clamp(16px,1.6vw,26px)] text-[clamp(14px,1.05vw,17px)] lg:col-start-auto"
          onClick={() => {
            play("open")
            setOpen(true)
          }}
        >
          Let's Talk
        </Button>
      </div>
    </header>
  )
}
