import { cn } from "@/lib/utils"

/** A snapshot: a rounded photo with a thin ink edge, tipped at an angle. */
export function Polaroid({
  src,
  alt,
  rotate = -3,
  className,
}: {
  src: string
  alt: string
  rotate?: number
  className?: string
}) {
  return (
    <figure
      className={cn("overflow-hidden rounded-card border-2 border-ink bg-card shadow-polaroid transition-transform duration-(--duration-slow) ease-out hover:rotate-0", className)}
      style={{ rotate: `${rotate}deg` }}
    >
      <img src={src} alt={alt} loading="lazy" className="block size-full object-cover" />
    </figure>
  )
}
