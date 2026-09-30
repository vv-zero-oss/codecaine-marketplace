import { PixelIcon, type PixelIconName } from "@/components/icons/pixel-icon"
import { SplitHeading } from "@/components/blocks/split-section"
import { Container } from "@/components/ui/container"
import { productPage } from "@/content"

/** What the machine does, in six hairline cells. */
export function Features() {
  const { features } = productPage
  return (
    <section id="features" className="py-[calc(var(--spacing-section)/2)]">
      <Container>
        <SplitHeading heading={features.heading} label={features.label} className="max-w-[30rem]" />
        <ul className="mt-14 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {features.items.map((item) => (
            <FeatureCell key={item.title} icon={item.icon as PixelIconName} title={item.title} body={item.body} />
          ))}
        </ul>
      </Container>
    </section>
  )
}

export function FeatureCell({ icon, title, body }: { icon: PixelIconName; title: string; body: string }) {
  return (
    <li className="group bg-paper p-7 transition-colors duration-(--duration-hover) [@media(hover:hover)]:hover:bg-wash/60">
      <span className="notch notch-sm flex size-10 items-center justify-center bg-night text-lime">
        <PixelIcon name={icon} className="size-5" />
      </span>
      <h3 className="mt-8 text-title text-ink">{title}</h3>
      <p className="mt-2 max-w-[20rem] text-small text-ink-soft">{body}</p>
    </li>
  )
}
