import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/section-heading"
import { studio } from "@/content"

export function Field({ label, name, type = "text", textarea = false }: { label: string; name: string; type?: string; textarea?: boolean }) {
  const className =
    "mt-2 w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-base outline-none transition-colors focus:border-ink"
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.2em] text-ink-400">{label}</span>
      {textarea ? <textarea name={name} rows={5} className={className} /> : <input name={name} type={type} className={className} />}
    </label>
  )
}

/**
 * The enquiry form. It does not send anything — a template cannot know where
 * your mail goes. Point `onSubmit` at Formspree, a serverless function or a
 * `mailto:` and the rest of the page stays as it is.
 */
export function EnquiryForm() {
  const [sent, setSent] = useState(false)
  const submit = (event: FormEvent) => {
    event.preventDefault()
    setSent(true)
  }
  if (sent) {
    return (
      <div className="border border-ink/15 p-10">
        <p className="font-display text-4xl">Thank you.</p>
        <p className="mt-4 text-ink-600">I'll reply within two working days, usually sooner.</p>
      </div>
    )
  }
  return (
    <form onSubmit={submit} className="grid gap-8 md:grid-cols-2">
      <Field label="Your name" name="name" />
      <Field label="Email" name="email" type="email" />
      <Field label="Date" name="date" type="date" />
      <Field label="Location" name="location" />
      <div className="md:col-span-2">
        <Field label="Tell me about it" name="message" textarea />
      </div>
      <div className="md:col-span-2">
        <Button type="submit" size="lg">
          Send enquiry
        </Button>
      </div>
    </form>
  )
}

export function ContactPage() {
  return (
    <Container className="grid gap-16 pt-20 md:grid-cols-12">
      <div className="md:col-span-4">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-5 font-display text-6xl leading-[0.95]">Say hello.</h1>
        <dl className="mt-12 space-y-6 text-sm">
          {[
            ["Email", studio.email],
            ["Phone", studio.phone],
            ["Instagram", studio.instagram],
            ["Studio", studio.location],
          ].map(([term, value]) => (
            <div key={term}>
              <dt className="text-xs uppercase tracking-[0.2em] text-ink-400">{term}</dt>
              <dd className="mt-1">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="md:col-span-7 md:col-start-6">
        <EnquiryForm />
      </div>
    </Container>
  )
}
