import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowRight, Check, Loader2, MailCheck } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { GoogleG } from "@/components/site/logo"
import { Button, ButtonLink } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { navigate } from "@/lib/router"
import { cn } from "@/lib/utils"

type Step = "form" | "sending" | "google" | "sent"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Sign in: one field and a magic link. The address is checked as it is
 * typed (once it has been left once), the button goes loading → sent, and
 * the sent state says where the link went. Google hands straight over to
 * the studio — wire your own OAuth in `continueWithGoogle`.
 */
export function SignIn({ className, label = "Sign in with Google" }: { className?: string; label?: string }) {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>("form")
  const [email, setEmail] = useState("")
  const [touched, setTouched] = useState(false)
  useCanvasAction("Sign-in dialog", (next) => setOpen(next ?? !open), { on: open, group: "Header" })
  useCanvasAction("Sign-in: link sent", (next) => {
    setOpen(true)
    setEmail((e) => e || "rowan@studio.example")
    setStep(next === false ? "form" : "sent")
  }, { on: step === "sent", group: "Header" })

  useEffect(() => {
    if (!open) {
      const t = window.setTimeout(() => {
        setStep("form")
        setTouched(false)
      }, 200)
      return () => window.clearTimeout(t)
    }
  }, [open])

  const valid = EMAIL.test(email)
  const error = touched && email && !valid ? "That address is missing something — check the part after the @." : null

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!valid) return
    setStep("sending")
    window.setTimeout(() => setStep("sent"), 900)
  }

  const continueWithGoogle = () => {
    setStep("google")
    window.setTimeout(() => {
      setOpen(false)
      navigate("/studio")
    }, 800)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex h-10 items-center gap-2 rounded-(--radius-button) bg-raised px-3.5 text-[14.5px] font-medium text-ink-2 shadow-(--shadow-outline) transition-[background-color,color,transform] duration-(--duration-hover) ease-(--ease-out-strong) hover:bg-panel hover:text-ink active:scale-[0.97]",
            className,
          )}
        >
          <GoogleG />
          {label}
        </button>
      </DialogTrigger>
      <DialogContent>
        <AnimatePresence mode="wait" initial={false}>
          {step !== "sent" ? (
            <motion.div
              key="form"
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
              <DialogTitle>Start your first map</DialogTitle>
              <DialogDescription className="mt-2">Free for three maps. No card, no install.</DialogDescription>
              <Button type="button" variant="outline" className="mt-6 w-full" onClick={continueWithGoogle} disabled={step === "google"}>
                {step === "google" ? <Loader2 className="animate-spin" /> : <GoogleG />}
                {step === "google" ? "Opening your studio" : "Continue with Google"}
              </Button>
              <div className="my-5 flex items-center gap-3 text-[13px] text-ink-soft">
                <span className="h-px flex-1 bg-line" /> or use email <span className="h-px flex-1 bg-line" />
              </div>
              <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
                <label className="text-[13px] font-medium text-ink-2" htmlFor="signin-email">
                  Work or personal email
                </label>
                <Input
                  id="signin-email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  value={email}
                  aria-invalid={!!error}
                  aria-describedby={error ? "signin-error" : undefined}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                />
                <AnimatePresence initial={false}>
                  {error ? (
                    <motion.p
                      id="signin-error"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-[13px] text-signal-red"
                    >
                      {error}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
                <Button type="submit" className="mt-1 w-full" disabled={step === "sending"}>
                  {step === "sending" ? (
                    <>
                      <Loader2 className="animate-spin" /> Sending your link
                    </>
                  ) : (
                    <>
                      Email me a sign-in link <ArrowRight />
                    </>
                  )}
                </Button>
              </form>
              <ButtonLink href="/studio" variant="link" size="sm" className="mx-auto mt-5 flex w-fit text-[13.5px]" onClick={() => setOpen(false)}>
                Or try the studio without an account <ArrowRight />
              </ButtonLink>
            </motion.div>
          ) : (
            <motion.div
              key="sent"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              className="text-center"
            >
              <motion.span
                initial={reduced ? false : { scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 420, damping: 22, delay: 0.05 }}
                className="mx-auto grid size-14 place-items-center rounded-full bg-accent-soft text-accent-ink"
              >
                <MailCheck className="size-6" />
              </motion.span>
              <DialogTitle className="mt-5">Check your inbox</DialogTitle>
              <DialogDescription className="mt-2">
                We sent a sign-in link to <span className="font-medium text-ink">{email}</span>. It works for the next 20 minutes.
              </DialogDescription>
              <p className="mt-6 flex items-center justify-center gap-1.5 text-[13px] text-signal-green">
                <Check className="size-3.5" /> Your three free maps are waiting
              </p>
              <ButtonLink href="/studio" className="mt-6 w-full" onClick={() => setOpen(false)}>
                Start mapping now <ArrowRight />
              </ButtonLink>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
