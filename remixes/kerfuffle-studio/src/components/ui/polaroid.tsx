import { cn } from "@/lib/utils"

/** A photo in a thick white border, tipped at an angle. */
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
      className={cn("bg-card p-2.5 shadow-polaroid transition-transform duration-(--duration-slow) ease-out hover:rotate-0 md:p-3.5", className)}
      style={{ rotate: `${rotate}deg` }}
    >
      <img src={src} alt={alt} loading="lazy" className="block size-full object-cover" />
    </figure>
  )
}
