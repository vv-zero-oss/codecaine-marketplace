import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { fieldNotes } from "@/content"

/**
 * The sign-up, where the story has earned it.
 *
 * The field arrives as a small pill with the
 * arrow already in it, which opens leftward into the full field (~500ms,
 * decelerating), then the placeholder settles in. It is clip-path on the
 * fill — the form itself is full width from the start, so nothing reflows —
 * and it runs once, when it scrolls into view.
 */
function SubscribeForm() {
  const reduce = useReducedMotion()
  const [sent, setSent] = useState(false)
  return (
    <motion.form
      onSubmit={(event) => {
        event.preventDefault()
        setSent(true)
      }}
      className="relative flex h-[clamp(60px,6.3vw,76px)] w-full items-center"
      initial="closed"
      whileInView="open"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-pill bg-cream"
        variants={{
          closed: { clipPath: reduce ? "inset(0% 0% 0% 0% round 9999px)" : "inset(0% 0% 0% calc(100% - 76px) round 9999px)" },
          open: { clipPath: "inset(0% 0% 0% 0% round 9999px)" },
        }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      />
      <motion.div
        className="relative flex-1 pl-3 sm:pl-[10px]"
        variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
        transition={{ duration: 0.3, delay: reduce ? 0 : 0.35 }}
      >
        <label htmlFor="field-notes-email" className="sr-only">
          Email address
        </label>
        {sent ? (
          <p role="status" className="px-3 text-ui text-ink">
            {fieldNotes.done}
          </p>
        ) : (
          <Input id="field-notes-email" type="email" required placeholder={fieldNotes.placeholder} className="h-14 text-[13px]" />
        )}
      </motion.div>
      <Button type="submit" size="icon-lg" aria-label={fieldNotes.submit} className="relative mr-[7px] size-[clamp(48px,5.2vw,62px)] ring-2 ring-cream" disabled={sent}>
        {sent ? <Check className="size-5" /> : <ArrowRight className="size-5" />}
      </Button>
    </motion.form>
  )
}

export function FieldNotes() {
  const [first, second] = fieldNotes.lines
  return (
    <section id="field-notes" data-tone="dark" aria-labelledby="field-notes-title" className="relative bg-night pb-[clamp(56px,6vw,70px)]">
      <Container className="relative">
        <h2 id="field-notes-title" className="text-display font-normal tracking-display text-on-night">
          <span className="block">{first}</span>
          <span className="mt-[clamp(88px,9vw,120px)] block text-right md:mt-[clamp(20px,9vw,130px)] md:pr-[7.9%]">{second}</span>
        </h2>
        <div className="absolute top-[calc(var(--text-display)*1.05+12px)] right-gutter left-gutter md:right-auto md:left-[33%] md:w-[34%] md:top-[calc(var(--text-display)*1.05+20px)]">
          <SubscribeForm />
        </div>
        <p className="mt-10 max-w-[215px] text-caption text-on-night md:absolute md:bottom-[calc(var(--text-display)*0.2)] md:mt-0">
          {fieldNotes.body}
        </p>
      </Container>
    </section>
  )
}
