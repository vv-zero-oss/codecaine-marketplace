import { cn } from "@/lib/utils"

/** The studio's name, set fat and italic, with a small spark after it. */
export function Wordmark({ className, tone = "ink" }: { className?: string; tone?: "flame" | "snow" | "ink" }) {
  return (
    <span
      className={cn(
        "inline-flex items-start font-brand text-[1.9rem] leading-none tracking-tight whitespace-nowrap lowercase transition-colors duration-(--duration-base)",
        tone === "flame" && "text-flame",
        tone === "snow" && "text-snow",
        tone === "ink" && "text-ink",
        className,
      )}
    >
      kerfuffle
      <svg aria-hidden viewBox="0 0 20 20" className="ml-0.5 size-[0.42em] shrink-0 text-flame">
        <path d="M10 0l2.2 7.8L20 10l-7.8 2.2L10 20l-2.2-7.8L0 10l7.8-2.2z" fill="currentColor" />
      </svg>
    </span>
  )
}
