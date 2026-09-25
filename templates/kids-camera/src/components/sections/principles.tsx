import { Container } from "@/components/ui/container"
import { principles } from "@/content"

/** A row of the dark section: a small label on the left, a statement from the
 *  middle of the page. Used for each principle. */
function PrincipleRow({ label, title, body }: { label: string | string[]; title: string; body: string }) {
  const lines = Array.isArray(label) ? label : [label]
  return (
    <article className="grid gap-6 py-[clamp(56px,8vw,96px)] md:grid-cols-2">
      <p className="text-[10.5px] leading-[1.35] text-on-night">
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
      <div className="max-w-[410px] text-statement text-on-night">
        <h2 className="font-normal">{title}</h2>
        <p className="mt-[1.25em]">{body}</p>
      </div>
    </article>
  )
}

/**
 * Why this is a thing you hold. The page turns dark here and stays dark
 * through the product, what it does and the sign-up — the pill in the header
 * turns cream to match (`data-tone`).
 */
export function Principles() {
  return (
    <section data-tone="dark" aria-label="Why a device" className="bg-night pt-6">
      <Container className="divide-y divide-hairline-night md:px-[21px]">
        {principles.map((row) => (
          <PrincipleRow key={row.title} {...row} />
        ))}
      </Container>
    </section>
  )
}
