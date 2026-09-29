import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, Star } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

/**
 * The trial form every call to action on the page uses: a work-email field
 * with the button inside its right edge, and the rating line under it.
 *
 * Its submitted state is registered with the editor (under `name`), so the
 * confirmation can be styled without typing an address in.
 */
export function EmailCapture({
  name = "Hero",
  tone = "paper",
  placeholder = "Enter your work email",
  cta = "Get free trial",
  rating = "4.9 from 2,400+ reviews",
  ratingNote = "Loved by 18,000 teams",
  success = "You’re in. Check your inbox to finish setting up.",
  showRating = true,
  className,
}: {
  name?: string
  tone?: "paper" | "night" | "lagoon"
  placeholder?: string
  cta?: string
  rating?: string
  ratingNote?: string
  success?: string
  showRating?: boolean
  className?: string
}) {
  const [sent, setSent] = useState(false)
  useCanvasAction(`${name} form sent`, (next) => setSent(next ?? !sent), { on: sent, group: "Forms" })

  const dark = tone !== "paper"

  return (
    <div className={cn("flex w-full max-w-[420px] flex-col items-center gap-3", className)}>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          setSent(true)
        }}
        className={cn(
          "relative flex h-12 w-full items-center rounded-[var(--radius-field)] p-1 pl-4 sm:h-11",
          tone === "paper" && "bg-card shadow-(--shadow-field)",
          tone === "night" && "bg-night-raised shadow-(--shadow-night)",
          tone === "lagoon" && "bg-white/[0.08] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]",
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {sent ? (
            <motion.p
              key="sent"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={cn("flex flex-1 items-center gap-2 text-[14px]", dark ? "text-night-fg" : "text-ink")}
            >
              <span className="grid size-5 place-items-center rounded-full bg-dot-green text-white">
                <Check className="size-3" strokeWidth={3} />
              </span>
              {success}
            </motion.p>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex min-w-0 flex-1 items-center gap-2"
            >
              <Input
                type="email"
                required
                aria-label="Work email"
                placeholder={placeholder}
                className={cn(
                  "h-full min-w-0 flex-1 border-0 bg-transparent px-0 text-[15px] shadow-none focus-visible:ring-0 dark:bg-transparent",
                  dark ? "text-night-fg placeholder:text-night-muted" : "text-ink placeholder:text-ink-subtle",
                )}
              />
              <Button type="submit" variant={dark ? "light" : "default"} size="sm" className="h-10 sm:h-9">
                {cta}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
      {showRating && (
        <p className={cn("flex items-center gap-2.5 text-[12.5px] whitespace-nowrap", dark ? "text-night-muted" : "text-ink-subtle")}>
          <span className={cn("flex gap-0.5", dark ? "text-night-fg" : "text-ink")} aria-label="Five stars">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="size-3 fill-current" strokeWidth={0} />
            ))}
          </span>
          <span className={cn("font-medium", dark ? "text-night-fg" : "text-ink-soft")}>{rating}</span>
          <span className={cn("hidden h-3 w-px sm:block", dark ? "bg-night-line" : "bg-line-strong")} />
          <span className="hidden sm:inline">{ratingNote}</span>
        </p>
      )}
    </div>
  )
}
