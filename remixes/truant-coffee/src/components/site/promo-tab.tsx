import { useEffect, useState } from "react"
import { Check, Copy, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { PROMO_CODE } from "@/content/coffees"
import { photo } from "@/lib/photos"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * The tab on the left edge: "15% off your first bag". It opens a dialog that
 * trades an email for the code, copies it, and can put it straight on the
 * bag. Its × hides the tab for good (remembered).
 */
export function PromoTab() {
  const { applyPromo, promo } = useStore()
  const [hidden, setHidden] = useState(() => {
    try {
      return localStorage.getItem("truant.promo-tab") === "hidden"
    } catch {
      return false
    }
  })
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [state, setState] = useState<"form" | "error" | "code">("form")
  const [copied, setCopied] = useState(false)

  useCanvasAction("Discount dialog", (next) => setOpen(next ?? !open), { on: open, group: "Discount" })
  useCanvasAction("Discount code revealed", (next) => {
    setOpen(true)
    setState((next ?? state !== "code") ? "code" : "form")
  }, { on: state === "code", group: "Discount" })

  useEffect(() => {
    try {
      if (hidden) localStorage.setItem("truant.promo-tab", "hidden")
    } catch {
      /* fine */
    }
  }, [hidden])

  return (
    <>
      <AnimatePresence>
        {!hidden && !promo && (
          <motion.div
            initial={{ x: -48 }}
            animate={{ x: 0 }}
            exit={{ x: -60 }}
            transition={{ delay: 0.8, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-1/2 left-0 z-30 hidden -translate-y-1/2 md:block"
          >
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group flex h-36 w-10 items-center justify-center rounded-r-[var(--radius-button)] bg-ink text-paper shadow-float transition-[width] duration-200 ease-[var(--ease-out-strong)] hover:w-12"
            >
              <span className="text-[13px] font-medium tracking-[-0.01em] whitespace-nowrap [writing-mode:vertical-rl]">15% off your first bag</span>
            </button>
            <button
              type="button"
              aria-label="Hide the discount tab"
              onClick={() => setHidden(true)}
              className="absolute -top-2.5 -right-2.5 grid size-6 place-items-center rounded-full bg-paper text-ink shadow-card transition-transform hover:scale-110 before:absolute before:-inset-2.5 before:content-['']"
            >
              <X className="size-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[calc(100%-2rem)] overflow-hidden border-0 bg-raised p-0 shadow-float sm:max-w-[640px]" showCloseButton>
          <div className="grid sm:grid-cols-[0.9fr_1fr]">
            <img src={photo("mugSmile", 640, 760)} alt="Someone laughing over a mug of coffee" className="hidden h-full w-full object-cover sm:block" />
            <div className="p-7 sm:p-8">
              <DialogTitle className="type-display text-d3 font-normal">Your first bag, 15% lighter.</DialogTitle>
              <DialogDescription className="mt-3 text-ink-2">One email when a Field Trip lot lands, one when the roast schedule changes. Never more than two a month.</DialogDescription>
              {state === "code" ? (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                  <p className="type-eyebrow text-ink-3">Your code</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="type-display flex h-12 flex-1 items-center rounded-[var(--radius-field)] bg-paper px-4 pt-1 text-[28px] tracking-[0.04em] shadow-[inset_0_0_0_1.5px_var(--color-ink)]">{PROMO_CODE}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Copy the code"
                      className="size-12"
                      onClick={() => {
                        navigator.clipboard?.writeText(PROMO_CODE).catch(() => undefined)
                        setCopied(true)
                        window.setTimeout(() => setCopied(false), 1600)
                      }}
                    >
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span key={copied ? "y" : "n"} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.16 }}>
                          {copied ? <Check className="text-ok" /> : <Copy />}
                        </motion.span>
                      </AnimatePresence>
                    </Button>
                  </div>
                  <Button
                    variant="tomato"
                    size="lg"
                    className="mt-4 w-full"
                    onClick={() => {
                      applyPromo(PROMO_CODE)
                      setOpen(false)
                    }}
                  >
                    Put it on my bag
                  </Button>
                </motion.div>
              ) : (
                <form
                  noValidate
                  className="mt-6"
                  onSubmit={(e) => {
                    e.preventDefault()
                    setState(EMAIL.test(email) ? "code" : "error")
                  }}
                >
                  <label htmlFor="promo-email" className="type-eyebrow text-ink-3">
                    Email
                  </label>
                  <input
                    id="promo-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (state === "error") setState("form")
                    }}
                    aria-invalid={state === "error"}
                    placeholder="you@somewhere.else"
                    className={cn(
                      "mt-2 h-12 w-full rounded-[var(--radius-field)] bg-paper px-4 text-[16px] shadow-[inset_0_0_0_1px_var(--color-line-strong)] outline-none placeholder:text-ink-4 focus:shadow-[inset_0_0_0_1.5px_var(--color-ink)]",
                      state === "error" && "shake shadow-[inset_0_0_0_1.5px_var(--color-tomato)]",
                    )}
                  />
                  <p className={cn("mt-2 h-5 text-[13px] text-tomato transition-opacity", state === "error" ? "opacity-100" : "opacity-0")}>That address is missing something — check the @ and the ending.</p>
                  <Button type="submit" size="lg" className="mt-2 w-full">
                    Send me the code
                  </Button>
                </form>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
