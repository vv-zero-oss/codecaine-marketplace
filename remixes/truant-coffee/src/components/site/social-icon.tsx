import instagram from "@/assets/logos/instagram.svg"
import spotify from "@/assets/logos/spotify.svg"
import strava from "@/assets/logos/strava.svg"
import { cn } from "@/lib/utils"

const LOGOS = { instagram, spotify, strava }

/**
 * A brand logo (Simple Icons, via Iconify), painted in `currentColor` with a
 * CSS mask so it takes the footer's colour and its hover.
 */
export function SocialIcon({ name, className }: { name: keyof typeof LOGOS; className?: string }) {
  const url = `url("${LOGOS[name]}")`
  return <span aria-hidden className={cn("inline-block size-4 bg-current", className)} style={{ maskImage: url, WebkitMaskImage: url, maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center" }} />
}
