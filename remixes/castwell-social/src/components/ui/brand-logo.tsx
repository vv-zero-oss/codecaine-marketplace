import { cn } from "@/lib/utils"

import instagram from "@/assets/brands/instagram.svg"
import tiktok from "@/assets/brands/tiktok.svg"
import tiktokDark from "@/assets/brands/tiktok-dark.svg"
import youtube from "@/assets/brands/youtube.svg"
import linkedin from "@/assets/brands/linkedin.svg"
import threads from "@/assets/brands/threads.svg"
import threadsDark from "@/assets/brands/threads-dark.svg"
import facebook from "@/assets/brands/facebook.svg"
import pinterest from "@/assets/brands/pinterest.svg"
import bluesky from "@/assets/brands/bluesky.svg"
import x from "@/assets/brands/x.svg"
import xDark from "@/assets/brands/x-dark.svg"

/** Channel logos, from SVGL. `theme` picks the variant drawn for a dark ground. */
const LOGOS = {
  instagram: { name: "Instagram", light: instagram, dark: instagram },
  tiktok: { name: "TikTok", light: tiktok, dark: tiktokDark },
  youtube: { name: "YouTube", light: youtube, dark: youtube },
  linkedin: { name: "LinkedIn", light: linkedin, dark: linkedin },
  threads: { name: "Threads", light: threads, dark: threadsDark },
  facebook: { name: "Facebook", light: facebook, dark: facebook },
  pinterest: { name: "Pinterest", light: pinterest, dark: pinterest },
  bluesky: { name: "Bluesky", light: bluesky, dark: bluesky },
  x: { name: "X", light: x, dark: xDark },
} as const

export type Channel = keyof typeof LOGOS

export const CHANNEL_NAMES = Object.fromEntries(Object.entries(LOGOS).map(([k, v]) => [k, v.name])) as Record<Channel, string>

export function BrandLogo({
  channel = "instagram",
  theme = "light",
  className,
}: {
  channel?: Channel
  theme?: "light" | "dark"
  className?: string
}) {
  const logo = LOGOS[channel]
  return <img src={logo[theme]} alt={logo.name} className={cn("size-5 object-contain", className)} draggable={false} />
}
