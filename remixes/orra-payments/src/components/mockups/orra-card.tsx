import { cn } from "@/lib/utils"
import { OrraMark } from "@/components/ui/wordmark"

const FINISH = {
  tan: "bg-card-tan text-ink/45",
  black: "bg-night text-ink-inverse",
  cream: "bg-card-cream text-ink",
  ember: "bg-ember text-ink",
  iris: "text-cocoa",
} as const

/** A payment card in one of Orra's five finishes, with the name running up its edge. */
export function OrraCard({ finish = "black", className }: { finish?: keyof typeof FINISH; className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[1.586] w-[200px] overflow-hidden rounded-[16px] shadow-pop sm:w-[230px]",
        FINISH[finish],
        className,
      )}
      style={finish === "iris" ? { background: "var(--card-iris)" } : undefined}
    >
      <span className="absolute top-4 left-4 flex origin-top-left rotate-90 translate-x-6 items-center gap-1 text-[26px] font-semibold tracking-[-0.06em]">
        <OrraMark className="size-5" />
        orra
      </span>
      <span className="absolute right-4 bottom-4 h-6 w-8 rounded-md bg-gradient-to-br from-white/60 to-white/10" />
    </div>
  )
}
