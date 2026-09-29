import { motion } from "motion/react"

import { pexels, type Person } from "@/content"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * Frames from the magazine's archive, under the portrait: one wide, one narrow
 * and set to the left, each dated. They rise in as they are reached, since they
 * are the part of a profile people scroll down to find.
 */
export function ArchivePhotos({ person }: { person: Person }) {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {person.archive.map((item, index) => (
        <motion.figure
          key={item.photo}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.8, ease: ease.outQuart }}
          className={cn("m-0", index % 2 === 1 && "w-[62%]")}
        >
          <img
            src={pexels(item.photo, 900)}
            alt={`From the Overtime archive, ${item.caption}`}
            loading="lazy"
            className={cn(
              "w-full rounded-card bg-paper-soft object-cover grayscale",
              index % 2 === 0 ? "aspect-[4/3]" : "aspect-[3/4]",
            )}
          />
          <figcaption className="mt-2 flex justify-between text-caption font-mono uppercase tracking-label text-ink-muted">
            <span>From the archive</span>
            <span>{item.caption}</span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  )
}
