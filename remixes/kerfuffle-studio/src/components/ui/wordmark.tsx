import { cn } from "@/lib/utils"

/** The studio's name: the house face, set a little heavier, with a full stop. */
export function Wordmark({ className, tone = "ink" }: { className?: string; tone?: "ink" | "snow" }) {
  return (
    <span
      className={cn(
        "inline-block font-sans text-xl leading-none font-semibold tracking-[-0.04em] whitespace-nowrap transition-colors duration-(--duration-base)",
        tone === "snow" ? "text-snow" : "text-ink",
        className,
      )}
    >
      Kerfuffle<span className="text-accent">.</span>
    </span>
  )
}
