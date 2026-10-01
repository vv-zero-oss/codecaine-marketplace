import { cn } from "@/lib/utils"

const base = import.meta.env.BASE_URL

/** The image product's mosaic: three generated frames, one large and two stacked. */
export function ImaginePreview({ className }: { className?: string }) {
  const tile = "overflow-hidden rounded-lg bg-surface-2"
  const img = "size-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.03]"
  return (
    <div className={cn("grid h-full grid-cols-[1.8fr_1fr] gap-0.5 p-0.5", className)}>
      <div className={tile}>
        <img src={`${base}img/merch.jpg`} alt="Black apparel laid flat on a grey surface" className={img} loading="lazy" />
      </div>
      <div className="grid grid-rows-2 gap-0.5">
        <div className={tile}>
          <img src={`${base}img/athlete.jpg`} alt="Portrait of an athlete against a red backdrop" className={img} loading="lazy" />
        </div>
        <div className={tile}>
          <img src={`${base}img/skincare.jpg`} alt="A skincare bottle on a blue backdrop" className={img} loading="lazy" />
        </div>
      </div>
    </div>
  )
}
