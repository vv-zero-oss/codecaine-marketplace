import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Check, X } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type State = "idle" | "error" | "sent"
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * The work-email field with the lime button inside it. It validates as you
 * submit, says how to fix a bad address, and turns into a confirmation once
 * sent. Its three states are switches in the editor.
 */
export function EmailCapture({
  placeholder = "What’s your work email?",
  cta = "Start for free",
  sentMessage = "Check your inbox — your workspace is ready.",
  name = "Hero signup",
  className,
}: {
  placeholder?: string
  cta?: string
  sentMessage?: string
  /** The label its states get in the editor's Actions row. */
  name?: string
  className?: string
}) {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<State>("idle")
  useCanvasAction(`${name}: error`, (next) => setState((next ?? state !== "error") ? "error" : "idle"), { on: state === "error", group: "Forms" })
  useCanvasAction(`${name}: sent`, (next) => setState((next ?? state !== "sent") ? "sent" : "idle"), { on: state === "sent", group: "Forms" })

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    setState(EMAIL.test(email.trim()) ? "sent" : "error")
  }

  return (
    <div className={cn("w-full max-w-[430px]", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        {state === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="flex h-[58px] items-center gap-3 rounded-(--radius-card) bg-lime-soft px-4 text-[15px] text-ink shadow-(--shadow-field)"
          >
            <span className="grid size-6 place-items-center rounded-full bg-lime"><Check className="size-3.5" strokeWidth={2.5} /></span>
            <span className="flex-1">{sentMessage}</span>
            <button type="button" aria-label="Use another email" onClick={() => { setState("idle"); setEmail("") }} className="grid size-8 place-items-center rounded-full text-ink-3 transition-colors hover:bg-white hover:text-ink">
              <X className="size-4" />
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={submit}
            initial={{ opacity: 0 }}
            animate={state === "error" ? { opacity: 1, x: [0, -6, 5, -3, 0] } : { opacity: 1, x: 0 }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
            className={cn(
              "flex h-[58px] items-center gap-1 rounded-(--radius-card) bg-panel p-1 pl-4 shadow-(--shadow-field) transition-shadow duration-(--duration-hover) focus-within:shadow-[0_0_0_1px_var(--color-ink-3),var(--shadow-xs)]",
              state === "error" && "shadow-[0_0_0_1px_var(--color-signal-red)]",
            )}
          >
            <label className="sr-only" htmlFor={`${name}-email`}>Work email</label>
            <input
              id={`${name}-email`}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle") }}
              placeholder={placeholder}
              aria-invalid={state === "error"}
              className="h-full min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-ink-3"
            />
            <Button type="submit" className="h-full rounded-[9px] px-4 text-[16px]">
              {cta}
              <ArrowRight className="hidden sm:block" />
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
      <p className={cn("mt-2 h-5 text-[13px] text-signal-red transition-opacity duration-(--duration-hover)", state === "error" ? "opacity-100" : "opacity-0")} role="alert">
        {state === "error" ? "That doesn’t look like an email — try name@company.com." : ""}
      </p>
    </div>
  )
}
