import { CheckCircle2, Mail } from "lucide-react"
import { useState } from "react"

import { PixelSprite } from "@/components/pixel/pixel-sprite"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const field =
  "h-12 w-full bg-bg px-phi-2 text-base text-fg shadow-px-sm [--px-edge:var(--color-line-strong)] outline-none placeholder:text-fg-subtle focus:[--px-edge:var(--color-accent)]"

/** Log in: asks for an email and answers with a sent state, so the dialog
 *  has a success state the editor can reach. */
export function LoginDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState("")
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next)
        if (!next) setTimeout(() => setSent(false), 200)
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-phi-2 font-display text-sm uppercase">
            <PixelSprite name="key" scale={3} /> Player login
          </DialogTitle>
          <DialogDescription className="text-base">We will mail you a one-time link. No password to remember.</DialogDescription>
        </DialogHeader>
        {sent ? (
          <div className="flex items-start gap-phi-2 bg-surface-2 p-phi-2 text-base shadow-px-sm [--px-edge:var(--color-good)]" role="status">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-good" />
            <p>Link sent to <b>{email}</b>. Check your inbox — it works for ten minutes.</p>
          </div>
        ) : (
          <form
            className="grid gap-phi-2"
            onSubmit={(event) => {
              event.preventDefault()
              setSent(true)
            }}
          >
            <label className="grid gap-phi-1 text-base text-fg-muted">
              Work email
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className={field} />
            </label>
            <Button type="submit" variant="primary" size="lg">
              <Mail /> Send magic link
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

/** Book a demo: three fields and a confirmation. */
export function DemoDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [sent, setSent] = useState(false)
  const [name, setName] = useState("")
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next)
        if (!next) setTimeout(() => setSent(false), 200)
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-phi-2 font-display text-sm uppercase">
            <PixelSprite name="coin" scale={3} /> Book a demo
          </DialogTitle>
          <DialogDescription className="text-base">Twenty minutes with an engineer, on your own traffic.</DialogDescription>
        </DialogHeader>
        {sent ? (
          <div className="flex items-start gap-phi-2 bg-surface-2 p-phi-2 text-base shadow-px-sm [--px-edge:var(--color-good)]" role="status">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-good" />
            <p>Thanks {name || "player"} — we will reply within one working day with three times to pick from.</p>
          </div>
        ) : (
          <form
            className="grid gap-phi-2"
            onSubmit={(event) => {
              event.preventDefault()
              setSent(true)
            }}
          >
            <label className="grid gap-phi-1 text-base text-fg-muted">
              Name
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada Lovelace" className={field} />
            </label>
            <label className="grid gap-phi-1 text-base text-fg-muted">
              Work email
              <input type="email" required placeholder="ada@company.com" className={field} />
            </label>
            <label className="grid gap-phi-1 text-base text-fg-muted">
              Team size
              <select defaultValue="50-250" className={field}>
                <option value="1-50">1 – 50</option>
                <option value="50-250">50 – 250</option>
                <option value="250+">250 +</option>
              </select>
            </label>
            <Button type="submit" variant="accent" size="lg">
              Request my demo
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
