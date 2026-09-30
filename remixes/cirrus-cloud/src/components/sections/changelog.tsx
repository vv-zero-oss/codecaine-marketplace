import { PixelIcon, type PixelIconName } from "@/components/icons/pixel-icon"
import { TyperText } from "@/components/motion/typer-text"
import { Chip, type ChipTone } from "@/components/ui/chip"
import { Container } from "@/components/ui/container"
import { changelogPage } from "@/content"

/** Every release, newest first: the date on the left, the story on the right. */
export function ChangelogList() {
  return (
    <section id="entries" className="py-[calc(var(--spacing-section)/2)]">
      <Container>
        <ol className="border-t border-hairline">
          {changelogPage.entries.map((entry) => (
            <ChangelogEntry key={entry.version} {...entry} icon={entry.icon as PixelIconName} tag={{ ...entry.tag, tone: entry.tag.tone as ChipTone }} />
          ))}
        </ol>
      </Container>
    </section>
  )
}

export function ChangelogEntry({
  date,
  version,
  icon,
  tag,
  title,
  body,
}: {
  date: string
  version: string
  icon: PixelIconName
  tag: { label: string; tone: ChipTone }
  title: string
  body: string
}) {
  return (
    <li className="grid gap-4 border-b border-hairline py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,40.25rem)] lg:gap-x-16">
      <div className="flex items-start gap-4 lg:flex-col lg:gap-3">
        <time className="label text-ink">{date}</time>
        <span className="label text-faint">v{version}</span>
      </div>
      <div>
        <div className="flex items-center gap-3">
          <span className="notch notch-sm flex size-9 items-center justify-center bg-night text-lime">
            <PixelIcon name={icon} className="size-4" />
          </span>
          <Chip tone={tag.tone}>{tag.label}</Chip>
        </div>
        <TyperText as="h2" text={title} className="mt-6 text-title text-ink" />
        <p className="mt-3 text-body text-ink-soft">{body}</p>
      </div>
    </li>
  )
}
