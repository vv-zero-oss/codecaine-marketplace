import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { ProductPreview, type ProductKey } from "@/components/previews"
import { cn } from "@/lib/utils"

/** One product tile: a live preview filling the card, its name bottom-left and "Explore" bottom-right. */
export function ProductCard({
  product,
  label,
  tone = "light",
  index = 0,
  className,
}: {
  product: ProductKey
  label: string
  /** `dark` for a card whose preview is a dark surface. */
  tone?: "light" | "dark"
  index?: number
  className?: string
}) {
  return (
    <motion.a
      href="#developers"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group/card relative block h-[200px] overflow-hidden border border-line bg-surface shadow-card transition-[box-shadow,transform] duration-300 ease-out hover:shadow-pop sm:h-[222px]",
        tone === "dark" && "border-transparent bg-terminal",
        className,
      )}
    >
      <div className="absolute inset-0">
        <ProductPreview product={product} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-14"
        style={{
          background: `linear-gradient(to top, ${tone === "dark" ? "var(--terminal)" : "var(--surface)"} 25%, transparent)`,
        }}
      />
      <div className={cn("absolute inset-x-4 bottom-3 flex items-center justify-between text-[12px]", tone === "dark" ? "text-terminal-ink" : "text-ink-2")}>
        <span>{label}</span>
        <span className="inline-flex items-center gap-1 opacity-80 transition-[opacity,transform] duration-200 ease-out group-hover/card:translate-x-0.5 group-hover/card:opacity-100">
          Explore <ArrowRight className="size-3" />
        </span>
      </div>
    </motion.a>
  )
}
