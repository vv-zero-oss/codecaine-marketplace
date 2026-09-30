import { useCanvasAction } from "@canvas/react"
import { Check } from "lucide-react"
import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { Wordmark } from "@/components/ui/wordmark"
import { FOOTER } from "@/content"
import { Link } from "@/lib/router"

/**
 * SiteFooter — the clay band: the wordmark, the link columns, a newsletter
 * sign-up that validates, and the headline once more, cut off by the page's
 * last line.
 */
export function SiteFooter({ script = "Wear", rest = "it first" }: { script?: string; rest?: string }) {
  return (
    <footer className="overflow-hidden bg-clay-deep text-paper">
      <Container className="grid gap-12 pt-16 pb-10 sm:pt-20 lg:grid-cols-[1fr_auto_auto]">
        <div>
          <Link href="/" aria-label="Drape home" className="inline-block text-paper [&_span.text-clay]:text-paper">
            <Wordmark className="text-[20px]" />
          </Link>
          <p className="mt-3 max-w-[16rem] text-[13px] text-paper/75">The fitting room that comes to you.</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4 lg:border-r lg:border-paper/15 lg:pr-12">
          {FOOTER.map((column) => (
            <FooterColumn key={column.title} title={column.title} links={column.links} />
          ))}
        </nav>
        <Newsletter />
      </Container>

      <div className="border-t border-paper/15">
        <p
          aria-hidden
          className="translate-y-[0.06em] px-4 pt-6 text-center font-display text-[clamp(4rem,19vw,19rem)] leading-[0.9] font-semibold tracking-[-0.05em] whitespace-nowrap text-paper sm:px-6"
        >
          <span className="mr-[0.2em] font-script font-normal tracking-normal">{script}</span>
          {rest}
        </p>
      </div>
      <div className="relative bg-clay-deep">
        <Container className="flex flex-col gap-2 border-t border-paper/15 py-4 text-[12px] text-paper/70 sm:flex-row sm:justify-between">
          <span>© 2026 Drape</span>
          <span>
            Photography from{" "}
            <a href="https://www.pexels.com" className="underline-offset-2 hover:underline">
              Pexels
            </a>{" "}
            · <Link href="/brand" className="underline-offset-2 hover:underline">Brand guidelines</Link>
          </span>
        </Container>
      </div>
    </footer>
  )
}

export function FooterColumn({ title, links }: { title: string; links: readonly string[] }) {
  return (
    <div>
      <h3 className="text-[14px] font-medium">{title}</h3>
      <ul className="mt-3 space-y-1.5">
        {links.map((label) => (
          <li key={label}>
            <a href="#top" className="inline-flex min-h-7 items-center text-[13px] text-paper/75 transition-colors hover:text-paper">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Email sign-up: checks the address as you submit, and says thanks. */
export function Newsletter() {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<"idle" | "error" | "done">("idle")
  useCanvasAction("Newsletter: error", (next) => setState((next ?? state !== "error") ? "error" : "idle"), {
    on: state === "error",
    group: "Footer",
  })
  useCanvasAction("Newsletter: subscribed", (next) => setState((next ?? state !== "done") ? "done" : "idle"), {
    on: state === "done",
    group: "Footer",
  })
  const submit = (event: FormEvent) => {
    event.preventDefault()
    setState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "done" : "error")
  }
  return (
    <form onSubmit={submit} noValidate className="max-w-xs">
      <label htmlFor="newsletter" className="text-[14px] font-medium">
        New colourways, monthly
      </label>
      {state === "done" ? (
        <p className="mt-3 flex items-center gap-2 text-[13px]">
          <Check className="size-4" /> Subscribed — see you next month.
        </p>
      ) : (
        <>
          <Input
            id="newsletter"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              if (state === "error") setState("idle")
            }}
            aria-invalid={state === "error"}
            aria-describedby={state === "error" ? "newsletter-error" : undefined}
            className="mt-3 h-10 rounded-sm border-paper/30 bg-paper text-[13px] text-ink placeholder:text-ink-3 focus-visible:ring-paper/60"
          />
          {state === "error" ? (
            <p id="newsletter-error" className="mt-1.5 text-[12px] text-paper">
              That address is missing an @ or a domain.
            </p>
          ) : null}
          <Button type="submit" variant="secondary" size="sm" className="mt-3">
            Subscribe
          </Button>
        </>
      )}
    </form>
  )
}
