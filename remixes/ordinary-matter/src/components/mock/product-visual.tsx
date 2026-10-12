import { BookObject } from "@/components/mock/book-object"
import { CLOTH, CoverArt, WEAVE } from "@/components/mock/cover-art"
import { VOLUMES, type Cloth, type Product } from "@/content/shop"
import { PHOTOS, photo } from "@/lib/photos"
import { cn } from "@/lib/utils"

/**
 * Every product, drawn live rather than photographed: the books in CSS 3D,
 * the slipcase in timber, the prints as a fanned stack, the membership as
 * an envelope with the letter half out. Hover them — each one does what the
 * real thing would.
 */

/** Three spines standing in an oak slipcase; hovering pulls Volume 3 out. */
export function Slipcase({ className }: { className?: string }) {
  return (
    <div className={cn("group/case @container relative aspect-[4/5] w-full", className)}>
      <span aria-hidden className="absolute inset-x-[8%] bottom-[2%] h-[8%] rounded-[50%] bg-black/30 blur-xl" />
      <div className="absolute inset-x-[16%] top-[8%] bottom-[6%] flex items-end gap-[0.6%]">
        {VOLUMES.map((v, i) => (
          <div
            key={v.number}
            className={cn(
              "relative h-[92%] flex-1 transition-[translate] duration-500 ease-(--ease-out-strong)",
              i === 2 && "group-hover/case:-translate-y-[14%]",
            )}
            style={{ background: CLOTH[v.cloth].bg, backgroundImage: `linear-gradient(90deg, rgb(0 0 0 / 0.25), rgb(255 255 255 / 0.06) 45%, rgb(0 0 0 / 0.2)), ${WEAVE}`, color: CLOTH[v.cloth].fg }}
          >
            <span className="absolute inset-x-0 top-[8%] text-center font-serif text-[5cqw]">{v.number}</span>
            <span className="absolute inset-x-0 top-[22%] mx-auto block w-fit font-serif text-[2.6cqw] whitespace-nowrap [writing-mode:vertical-rl]">{v.title}</span>
          </div>
        ))}
      </div>
      {/* the case: oak, open at the top, taller at the back */}
      <div
        className="absolute inset-x-[12%] top-[54%] bottom-[6%] shadow-(--shadow-book)"
        style={{ backgroundImage: `linear-gradient(180deg, rgb(255 255 255 / 0.12), transparent 30%), url(${photo(PHOTOS.timber, 800)})`, backgroundSize: "cover" }}
      >
        <span className="absolute top-[16%] left-1/2 -translate-x-1/2 font-serif text-[4.2cqw] whitespace-nowrap text-ink/75">Ordinary Matter · 1–3</span>
        <span className="absolute right-[6%] bottom-[6%] font-sans text-[2.4cqw] tracking-[0.12em] text-ink/60 tabular-nums">No. 118 / 400</span>
      </div>
    </div>
  )
}

/** Four prints, fanned; hover spreads the fan. */
export function PrintStack({ photos, className }: { photos: number[]; className?: string }) {
  // Written out whole so Tailwind can see every class.
  const fan = [
    "-rotate-[9deg] group-hover/prints:-translate-x-[30%] group-hover/prints:-rotate-[14deg]",
    "-rotate-[3deg] group-hover/prints:-translate-x-[10%] group-hover/prints:-rotate-[5deg]",
    "rotate-[3deg] group-hover/prints:translate-x-[10%] group-hover/prints:rotate-[4deg]",
    "rotate-[8deg] group-hover/prints:translate-x-[30%] group-hover/prints:rotate-[12deg]",
  ]
  return (
    <div className={cn("group/prints relative aspect-[4/5] w-full", className)}>
      {photos.map((id, i) => (
        <div
          key={id}
          className={cn(
            "absolute inset-x-[22%] top-[16%] bottom-[18%] bg-raised p-[3%] pb-[9%] shadow-(--shadow-float) transition-[translate,rotate] duration-500 ease-(--ease-out-strong)",
            fan[i],
          )}
        >
          <img src={photo(id, 600)} alt="" className="size-full object-cover" loading="lazy" draggable={false} />
        </div>
      ))}
    </div>
  )
}

/** The membership: an envelope with a letter that rises out of it on hover. */
export function Envelope({ className }: { className?: string }) {
  return (
    <div className={cn("group/env @container relative aspect-[4/5] w-full", className)}>
      <span aria-hidden className="absolute inset-x-[10%] bottom-[18%] h-[8%] rounded-[50%] bg-black/25 blur-xl" />
      <div className="absolute inset-x-[10%] top-[34%] bottom-[22%]">
        {/* the letter */}
        <div className="absolute inset-x-[6%] top-[4%] h-[86%] bg-raised p-[6%] shadow-(--shadow-soft) transition-[translate] duration-500 ease-(--ease-out-strong) group-hover/env:-translate-y-[46%]">
          <p className="font-sans text-[2.2cqw] tracking-[0.12em] text-ink-3 uppercase">Letter from the field · No. 14</p>
          <p className="mt-[3cqw] font-serif text-[4cqw] leading-snug text-ink">Dear reader, the weaver in Bergen has finished the blanket you saw on page 118…</p>
        </div>
        {/* the envelope's back, then its flap */}
        <div className="absolute inset-0 bg-kraft" style={{ clipPath: "polygon(0 0, 50% 46%, 100% 0, 100% 100%, 0 100%)" }} />
        <div className="absolute inset-0 bg-kraft-deep" style={{ clipPath: "polygon(0 100%, 50% 42%, 100% 100%)" }} />
        <div className="absolute inset-x-0 bottom-[10%] flex items-center justify-between px-[7%]">
          <span className="font-serif text-[3.4cqw] text-ink/80 italic">For the members</span>
          {/* the stamp */}
          <span className="grid size-[13cqw] place-items-center border border-dashed border-ink/40 bg-moss font-serif text-[4cqw] text-page">O</span>
        </div>
      </div>
    </div>
  )
}

/** The large, interactive picture of a product. */
export function ProductVisual({
  product,
  edition,
  draggable = false,
  className,
}: {
  product: Product
  edition?: Cloth
  draggable?: boolean
  className?: string
}) {
  const cloth = edition ?? product.editions?.[0]
  if (product.kind === "book") {
    const v = VOLUMES.find((x) => x.number === product.volume)!
    return (
      <div className={cn("px-[16%] pt-[8%] pb-[10%]", className)}>
        <BookObject volume={v.number} title={v.title} subtitle={v.subtitle} cloth={cloth ?? v.cloth} draggable={draggable} />
      </div>
    )
  }
  if (product.kind === "notebook")
    return (
      <div className={cn("px-[22%] pt-[8%] pb-[10%]", className)}>
        <BookObject variant="notebook" title="Visit Notebook" cloth={cloth ?? "kraft"} thickness={4} draggable={draggable} />
      </div>
    )
  if (product.kind === "set") return <Slipcase className={className} />
  if (product.kind === "prints") return <PrintStack photos={product.photos ?? []} className={className} />
  return <Envelope className={className} />
}

/** A flat, small picture for the bag and lists. */
export function ProductThumb({ product, edition, className }: { product: Product; edition?: Cloth; className?: string }) {
  const cloth = edition ?? product.editions?.[0]
  const box = cn("aspect-[4/5] overflow-hidden bg-sheet", className)
  if (product.kind === "book") {
    const v = VOLUMES.find((x) => x.number === product.volume)!
    return (
      <div className={box}>
        <CoverArt volume={v.number} title={v.title} subtitle={v.subtitle} cloth={cloth ?? v.cloth} />
      </div>
    )
  }
  if (product.kind === "notebook")
    return (
      <div className={box}>
        <CoverArt variant="notebook" title="Visit Notebook" cloth={cloth ?? "kraft"} />
      </div>
    )
  if (product.kind === "prints")
    return (
      <div className={box}>
        <img src={photo(product.photos![0], 300)} alt="" className="size-full object-cover" />
      </div>
    )
  if (product.kind === "set")
    return (
      <div className={cn(box, "flex items-end gap-[3%] bg-stone p-[14%] pb-[10%]")}>
        {VOLUMES.map((v) => (
          <span key={v.number} className="h-[86%] flex-1" style={{ background: CLOTH[v.cloth].bg }} />
        ))}
      </div>
    )
  return (
    <div className={cn(box, "grid place-items-center bg-kraft")}>
      <span className="grid size-8 place-items-center bg-moss font-serif text-page">O</span>
    </div>
  )
}
