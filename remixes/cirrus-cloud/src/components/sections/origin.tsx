import { Prose, SplitSection } from "@/components/blocks/split-section"
import { origin } from "@/content"

export function Origin() {
  return (
    <SplitSection id="origin" heading={origin.heading} label={origin.label}>
      <Prose>
        {origin.body.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
      </Prose>
      <p className="mt-7 text-small text-mute">{origin.aside}</p>
    </SplitSection>
  )
}
