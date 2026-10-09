import { cn } from "@/lib/utils"
import { Link } from "@/lib/router"
import { PixelSprite } from "./pixel-sprite"

/**
 * The logo: the shield sprite and the name set in the 8-bit face. A link in
 * the header, plain text in the footer.
 */
export function Wordmark({ href, className }: { href?: string; className?: string }) {
  const content = (
    <>
      <PixelSprite name="shield" scale={2} />
      <span className="font-display text-label uppercase leading-none">
        Pixel<span className="text-accent-hi">keep</span>
      </span>
    </>
  )
  const shared = cn("flex items-center gap-2.5", className)
  if (href) {
    return (
      <Link href={href} className={shared} aria-label="Pixelkeep home">
        {content}
      </Link>
    )
  }
  return <span className={shared}>{content}</span>
}
