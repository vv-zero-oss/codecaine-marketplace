import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type EmailCaptureProps = {
  /** Where it sits: "glass" on footage, "paper" on the page. */
  tone?: "glass" | "paper"
  placeholder?: string
  cta?: string
  success?: string
  /** Names the editor's switch for the sent state, e.g. "Hero". */
  group?: string
  className?: string
}

/**
 * The sign-up: an email field and a button in one frosted tray. Sending swaps
 * the tray for a confirmation in place, so the page does not jump.
 */
export function EmailCapture({
  tone = "glass",
  placeholder = "Your email",
  cta = "Get started",
  success = "You're on the list. Check your inbox.",
  group = "Hero",
  className,
}: EmailCaptureProps) {
  const [sent, setSent] = useState(false)
  useCanvasAction("Sign-up sent", (next) => setSent(next ?? !sent), { on: sent, group })

  const glass = tone === "glass"
  return (
    <div
      className={cn(
        "relative flex h-[3.25rem] w-full max-w-[20rem] items-center rounded-[0.875rem] p-1 sm:h-12",
        glass
          ? "bg-glass shadow-[inset_0_0_0_1px_var(--color-glass-edge)] backdrop-blur-md"
          : "bg-sand-deep shadow-hairline",
        className,
      )}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {sent ? (
          <motion.p
            key="sent"
            initial={{ opacity: 0, transform: "translateY(6px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className={cn(
              "flex w-full items-center justify-center gap-2 px-3 text-[15px]",
              glass ? "text-surface" : "text-ink",
            )}
          >
            <Check className="size-4" strokeWidth={2} />
            {success}
          </motion.p>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, transform: "translateY(-6px)" }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="flex w-full items-center gap-1"
            onSubmit={(event) => {
              event.preventDefault()
              setSent(true)
            }}
          >
            <label className="sr-only" htmlFor={`email-${group}`}>
              Email address
            </label>
            <input
              id={`email-${group}`}
              type="email"
              required
              autoComplete="email"
              placeholder={placeholder}
              className={cn(
                "h-full min-w-0 flex-1 bg-transparent px-3 text-base outline-none sm:text-[15px]",
                glass ? "text-surface placeholder:text-surface/70" : "text-ink placeholder:text-muted",
              )}
            />
            <Button type="submit" variant={glass ? "white" : "ink"} className="h-full sm:h-10">
              {cta}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
