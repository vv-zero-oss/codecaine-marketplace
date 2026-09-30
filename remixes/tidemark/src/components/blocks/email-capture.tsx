import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Check } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

/**
 * The account form every call to action uses: a work-email field in a pill
 * with the button inside it. Its sent state is an editor action (under
 * `name`), so the confirmation can be styled without typing an address.
 */
export function EmailCapture({
  name = "Hero",
  tone = "paper",
  placeholder = "Work email",
  cta = "Open an account",
  success = "Check your inbox — your application is waiting.",
  className,
}: {
  name?: string
  tone?: "paper" | "night"
  placeholder?: string
  cta?: string
  success?: string
  className?: string
}) {
  const [sent, setSent] = useState(false)
  useCanvasAction(`${name} form sent`, (next) => setSent(next ?? !sent), { on: sent, group: "Forms" })
  const night = tone === "night"

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
      className={cn(
        "flex h-14 w-full max-w-[460px] items-center rounded-none p-1.5 pl-5",
        night ? "bg-night-card shadow-(--shadow-night)" : "bg-card shadow-(--shadow-field)",
        className,
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {sent ? (
          <motion.p
            key="sent"
            initial={{ opacity: 0, y: 6, filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className={cn("flex flex-1 items-center gap-2 text-[14.5px]", night ? "text-night-fg" : "text-ink")}
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-none bg-pink text-night-deep">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            {success}
          </motion.p>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="flex min-w-0 flex-1 items-center gap-2"
          >
            <Input
              type="email"
              required
              aria-label="Work email"
              placeholder={placeholder}
              className={cn(
                "h-full min-w-0 flex-1 border-0 bg-transparent px-0 text-[16px] shadow-none focus-visible:ring-0 dark:bg-transparent",
                night ? "text-night-fg placeholder:text-night-muted" : "text-ink placeholder:text-ink-subtle",
              )}
            />
            <Button type="submit" variant={night ? "pink" : "default"} className="group h-11 px-5">
              {cta}
              <ArrowRight className="transition-transform duration-(--duration-hover) ease-(--ease-out-strong) group-hover:translate-x-0.5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}
