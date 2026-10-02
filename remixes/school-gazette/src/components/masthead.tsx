import { cn } from "@/lib/utils"

/**
 * The giant block title. SVG text with `textLength`, so the letters are drawn
 * condensed to fill the block exactly at any width — which is what a hand-set
 * broadsheet masthead does and a CSS font-size cannot. `text` is the words;
 * `tone` is the ink the block is printed in.
 */
export function Masthead({
  text = "GAZETTE",
  tone = "ink",
  className,
}: {
  text?: string
  tone?: "ink" | "rust"
  className?: string
}) {
  const width = Math.min(1000, 150 * text.length + 40)
  return (
    <div
      role="heading"
      aria-level={1}
      aria-label={text}
      className={cn("w-full overflow-hidden px-[1.6%] py-[0.8%]", tone === "ink" ? "bg-ink text-paper" : "bg-rust text-paper-bright", className)}
    >
      <svg aria-hidden viewBox={`0 0 ${width} 250`} className="block h-auto w-full fill-current">
        <text x="10" y="226" fontFamily="var(--font-display)" fontSize="300" textLength={width - 20} lengthAdjust="spacingAndGlyphs">
          {text}
        </text>
      </svg>
    </div>
  )
}
