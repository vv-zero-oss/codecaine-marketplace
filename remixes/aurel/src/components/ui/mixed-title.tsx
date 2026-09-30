import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The house's type trick: capitals in the display serif with the small words
 * set in its italic, lowercase — `_where_ PATTERN _meets_ PATIENCE`.
 *
 * `text` is a plain string (so the editor can change it); words between
 * underscores come out italic.
 */
export function MixedTitle({
  text,
  as: Tag = "h2",
  className,
  ...props
}: { text: string; as?: "h1" | "h2" | "h3" | "p" | "span" | "div" } & Omit<React.HTMLAttributes<HTMLElement>, "children">) {
  return (
    <Tag className={cn("font-display", className)} {...props}>
      {splitMixed(text).map((part, index) =>
        part.italic ? (
          <em key={index} className="font-display italic [font-feature-settings:'kern']">
            {part.text}
          </em>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </Tag>
  )
}

/** `_a_ B _c_` → [{a, italic}, {" B ", roman}, {c, italic}] */
export function splitMixed(text: string) {
  return text
    .split(/(_[^_]+_)/g)
    .filter(Boolean)
    .map((chunk) => (chunk.startsWith("_") && chunk.endsWith("_") ? { text: chunk.slice(1, -1), italic: true } : { text: chunk, italic: false }))
}
