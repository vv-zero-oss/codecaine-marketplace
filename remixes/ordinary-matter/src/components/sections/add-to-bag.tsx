import { useEffect, useState } from "react"
import { Check, Plus } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { Button } from "@/components/ui/button"
import type { Cloth } from "@/content/shop"
import { money, useBag } from "@/lib/bag"
import { cn } from "@/lib/utils"

/**
 * "Add to bag" that answers: the label swaps to "Added" with a check for a
 * moment (a 180ms vertical swap), the header count nudges, and the bag
 * stays shut so the reader keeps their place.
 */
export function AddToBag({
  id,
  edition,
  price,
  qty = 1,
  variant = "ink",
  size = "default",
  openBag = false,
  className,
}: {
  id: string
  edition?: Cloth
  price: number
  qty?: number
  variant?: "ink" | "outline" | "paper"
  size?: "default" | "sm" | "lg"
  openBag?: boolean
  className?: string
}) {
  const bag = useBag()
  const [added, setAdded] = useState(false)
  useEffect(() => {
    if (!added) return
    const t = window.setTimeout(() => setAdded(false), 1600)
    return () => window.clearTimeout(t)
  }, [added])

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("overflow-hidden", className)}
      onClick={() => {
        bag.add(id, edition, qty)
        setAdded(true)
        if (openBag) bag.setOpen(true)
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={added ? "added" : "add"}
          initial={{ opacity: 0, transform: "translateY(70%)" }}
          animate={{ opacity: 1, transform: "translateY(0%)" }}
          exit={{ opacity: 0, transform: "translateY(-70%)" }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          className="inline-flex items-center gap-2"
        >
          {added ? <Check /> : <Plus />}
          {added ? "Added to bag" : `Add to bag — ${money(price * qty)}`}
        </motion.span>
      </AnimatePresence>
    </Button>
  )
}
