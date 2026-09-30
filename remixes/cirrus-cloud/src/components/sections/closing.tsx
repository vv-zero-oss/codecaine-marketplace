import { useEffect, useState } from "react"

import { PixelMarquee } from "@/components/motion/pixel-marquee"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { brand, closing } from "@/content"

/** The answer in lights, then the one ask, then where to find us. */
export function Closing({
  marquee = closing.marquee,
  cta = closing.cta,
  href = `mailto:${brand.email}`,
}: {
  marquee?: string
  cta?: string
  href?: string
}) {
  const small = useMedia("(max-width: 640px)")
  return (
    <section id="start" className="pt-[calc(var(--spacing-section)/2)] pb-24">
      <PixelMarquee text={marquee} cell={small ? 6 : 9} rows={small ? 12 : 13} />
      <Container className="mt-14 flex flex-col items-center text-center">
        <ButtonLink href={href}>{cta}</ButtonLink>
        <div className="mt-12 max-w-[32rem] space-y-6 text-[clamp(1.0625rem,1rem+0.3vw,1.3125rem)] leading-[1.6] text-mute">
          {closing.body.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
        <p className="mt-9 text-[clamp(1.0625rem,1rem+0.3vw,1.3125rem)] text-mute">
          <a href={`mailto:${brand.email}`} className="text-ink underline-offset-4 hover:underline">
            {brand.email}
          </a>{" "}
          · {closing.address}
        </p>
      </Container>
    </section>
  )
}

function useMedia(query: string) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const list = window.matchMedia(query)
    const update = () => setMatch(list.matches)
    list.addEventListener("change", update)
    return () => list.removeEventListener("change", update)
  }, [query])
  return match
}
