import { cn } from "@/lib/utils"

/** The studio's signature — a brush script, set in type. */
export function Wordmark({ className, tone = "blue" }: { className?: string; tone?: "blue" | "snow" | "ink" }) {
  return (
    <span
      className={cn(
        "inline-block -rotate-6 font-script text-[2.6rem] leading-none whitespace-nowrap transition-colors duration-(--duration-base)",
        tone === "blue" && "text-blue",
        tone === "snow" && "text-snow",
        tone === "ink" && "text-ink",
        className,
      )}
    >
      Kerfuffle
    </span>
  )
}
