import { motion, useReducedMotion } from "motion/react"

import { Photo } from "@/components/blocks/photo"
import { Container } from "@/components/ui/container"
import { uses } from "@/content"
import { cn } from "@/lib/utils"

/** How wide each picture is inside its column: three deliberately unequal
 *  frames (432, 174 and 352px across 1168). */
const WIDTH = { large: "w-full", small: "w-full md:w-[47%]", medium: "w-full" } as const

/**
 * What happens to the pictures: three things a family does with them. Laid
 * out as three unequal columns so the page keeps the loose, pinned-up feel of
 * the scatter above rather than turning into a feature grid.
 */
export function Uses() {
  const reduce = useReducedMotion()
  return (
    <section data-tone="dark" aria-label="What you do with it" className="bg-night pt-[clamp(40px,4.6vw,56px)] pb-[clamp(80px,12vw,150px)]">
      <Container className="grid gap-12 md:grid-cols-[37fr_31.6fr_30.1fr] md:gap-4">
        {uses.map((use, i) => (
          <motion.figure
            key={use.label}
            className="m-0"
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(16px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: i * 0.06 }}
          >
            <p className="mb-4 text-ui text-on-night">{use.label}</p>
            <Photo photo={use.photo} width={1000} className={cn("aspect-square", WIDTH[use.size], use.size === "large" && "aspect-[432/430]")} />
            <figcaption className="mt-4 max-w-[340px] text-caption text-on-night">{use.caption}</figcaption>
          </motion.figure>
        ))}
      </Container>
    </section>
  )
}
