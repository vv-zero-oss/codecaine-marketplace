import { Prose, SplitSection } from "@/components/blocks/split-section"
import { levels } from "@/content"

/** Where a team is on the way off local machines, and the next rung. */
export function Levels() {
  return (
    <SplitSection id="levels" heading={levels.heading} label={levels.label}>
      <Prose>
        {levels.body.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
      </Prose>
      <ol className="my-9 border-t border-hairline">
        {levels.rungs.map((rung) => (
          <LevelRung key={rung.level} {...rung} />
        ))}
      </ol>
      <Prose>
        <p>{levels.closing}</p>
      </Prose>
    </SplitSection>
  )
}

export function LevelRung({ level, title, body }: { level: string; title: string; body: string }) {
  return (
    <li className="flex items-baseline gap-4 border-b border-hairline py-4 text-small">
      <span className="label w-6 shrink-0 text-mute">{level}</span>
      <p className="text-ink-soft">
        <span className="font-medium text-ink">{title}</span> {body}
      </p>
    </li>
  )
}
